import { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { Bot, Sparkles, Volume2, VolumeX, User, ArrowRight, Briefcase, MessageSquare, UserCircle, Mic, MicOff } from 'lucide-react';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

const API_URL = import.meta.env.VITE_API_URL || "https://project-seller.onrender.com/api/chat";

function Chat() {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: '👋 Привет! Я — **WorkWork AI**.' },
    { role: 'ai', text: 'Я умею слушать голосовые. Нажми на **микрофон** внизу.' }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false); // 🔥 Состояние слушания
  const bottomRef = useRef<HTMLDivElement>(null);

  // --- 🔊 ОЗВУЧКА ОТВЕТОВ ---
  const speakText = (text: string) => {
    if (!voiceEnabled) return;
    window.speechSynthesis.cancel(); // Остановка предыдущей речи
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU';
    utterance.rate = 1.1;
    window.speechSynthesis.speak(utterance);
  };

  // --- 🎙 ГОЛОСОВОЙ ВВОД (Speech Recognition) ---
  const toggleListening = () => {
    if (isListening) {
      // Остановка вручную не всегда нужна, браузер сам стопнет, но для UI полезно
      setIsListening(false);
      return;
    }

    // Проверка поддержки браузером
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Ваш браузер не поддерживает голосовой ввод. Попробуйте Chrome или Safari.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ru-RU'; // Понимаем русский
    recognition.interimResults = false; // Ждем финальную фразу
    recognition.maxAlternatives = 1;

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript); // Вставляем текст в поле
      setIsListening(false);
      // Если хочешь, чтобы сразу отправлялось — раскомментируй строку ниже:
      // sendMessage(transcript); 
    };

    recognition.onerror = (event: any) => {
      console.error("Speech error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    const newMsg = { role: 'user' as const, text };
    setMessages(prev => [...prev, newMsg]);
    setInput("");
    setLoading(true);

    try {
      const userId = "client_" + Math.floor(Math.random() * 10000);
      const res = await axios.post(API_URL, { 
        message: text, 
        userId, 
        voiceMode: voiceEnabled 
      });

      const replies = Array.isArray(res.data.reply) ? res.data.reply : [res.data.reply];

      setLoading(false);
      
      for (const reply of replies) {
        if (!reply) continue;
        await new Promise(r => setTimeout(r, 600));
        setMessages(prev => [...prev, { role: 'ai', text: reply }]);
        if (voiceEnabled) speakText(reply);
      }

    } catch (e) {
      setLoading(false);
      setMessages(prev => [...prev, { role: 'ai', text: "⚠️ Ошибка связи." }]);
    }
  };

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  const quickReplies = [
    "📱 Мобильное приложение",
    "💻 Веб-сервис",
    "💰 Цены",
    "🔥 Почему без предоплаты?"
  ];

  return (
    <div className="flex flex-col h-full relative pb-20">
      
      {/* Header */}
      <div className="glass z-20 px-6 py-4 flex items-center justify-between shrink-0 shadow-lg border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center">
            <Bot size={18} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-sm text-white">WorkWork <span className="text-purple-400">AI</span></h1>
            <p className="text-[10px] text-slate-400 font-medium">Online</p>
          </div>
        </div>

        <button 
          onClick={() => setVoiceEnabled(!voiceEnabled)}
          className={`p-2 rounded-full transition-colors ${voiceEnabled ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-slate-500'}`}
        >
          {voiceEnabled ? <Volume2 size={18}/> : <VolumeX size={18}/>}
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 z-10 scrollbar-hide">
        {messages.map((m, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-auto ${
                m.role === 'ai' ? 'bg-[#1a1a1f] border border-white/10' : 'bg-white'
              }`}>
                {m.role === 'ai' ? <Sparkles size={14} className="text-purple-400"/> : <User size={14} className="text-black"/>}
              </div>
              <div className={`
                max-w-[75%] px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed shadow-sm
                ${m.role === 'ai' 
                    ? 'glass text-slate-200 rounded-bl-none' 
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none'}
              `}>
                <ReactMarkdown>{m.text}</ReactMarkdown>
              </div>
            </motion.div>
        ))}
        {loading && <div className="text-xs text-slate-500 ml-12 animate-pulse">Печатает...</div>}
        <div ref={bottomRef} />
      </div>

      {/* Footer Area */}
      <div className="absolute bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/90 to-transparent z-20">
        
        {/* Quick Replies */}
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide mb-1">
          {quickReplies.map((qr, idx) => (
            <button 
              key={idx} 
              onClick={() => sendMessage(qr)}
              className="px-3 py-1.5 rounded-full bg-[#1a1a1f] border border-white/10 text-xs text-indigo-300 whitespace-nowrap active:scale-95 transition hover:bg-white/10"
            >
              {qr}
            </button>
          ))}
        </div>

        {/* Input & Voice */}
        <div className={`relative flex items-center bg-[#111] rounded-2xl border transition-colors ${isListening ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-white/10 focus-within:border-purple-500/50'}`}>
            
            {/* 🔥 КНОПКА МИКРОФОНА */}
            <button 
                onClick={toggleListening}
                className={`p-3 ml-1 rounded-xl transition-all ${isListening ? 'text-red-500 animate-pulse' : 'text-slate-400 hover:text-white'}`}
            >
                {isListening ? <MicOff size={20}/> : <Mic size={20}/>}
            </button>

            <input 
              value={input} 
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder={isListening ? "Говорите..." : "Сообщение..."}
              className="w-full bg-transparent text-white py-3.5 pl-2 pr-12 text-sm focus:outline-none placeholder:text-slate-600"
            />
            
            <button onClick={() => sendMessage(input)} className="absolute right-2 p-1.5 bg-indigo-600 text-white rounded-xl active:scale-90 transition">
              <ArrowRight size={18} />
            </button>
        </div>
      </div>
    </div>
  );
}

// ... (TabBar и export default App оставляем как были)
function TabBar() {
  const location = useLocation();
  const tabs = [
    { path: "/", icon: <MessageSquare size={20}/>, label: "Чат" },
    { path: "/projects", icon: <Briefcase size={20}/>, label: "Кейсы" },
    { path: "/contact", icon: <UserCircle size={20}/>, label: "Связь" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0c]/90 backdrop-blur-xl border-t border-white/5 h-16 flex items-center justify-around z-50 pb-2">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <Link to={tab.path} key={tab.path} className="relative flex flex-col items-center gap-1 p-2 w-16">
            <div className={`transition-colors duration-300 ${isActive ? 'text-purple-400' : 'text-slate-500'}`}>
              {tab.icon}
            </div>
            <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-white' : 'text-slate-600'}`}>
              {tab.label}
            </span>
            {isActive && (
              <motion.div layoutId="tab-indicator" className="absolute top-0 w-8 h-0.5 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
            )}
          </Link>
        );
      })}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="flex flex-col h-full bg-[#030304] text-slate-200 overflow-hidden font-sans">
        <div className="flex-1 overflow-hidden relative">
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <TabBar />
      </div>
    </Router>
  );
}