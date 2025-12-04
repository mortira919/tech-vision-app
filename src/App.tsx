import { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, Volume2, VolumeX, ArrowRight, Briefcase, MessageSquare, UserCircle, Mic, MicOff } from 'lucide-react';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

const API_URL = import.meta.env.VITE_API_URL || "https://project-seller.onrender.com/api/chat";

// --- UX УТИЛИТА: Вибрация (Haptic Feedback) ---
const vibrate = () => {
  if (navigator.vibrate) navigator.vibrate(10); // Легкая вибрация на 10мс
};

function Chat() {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: '👋 Привет! Я — **WorkWork AI**.' },
    { role: 'ai', text: 'Расскажите о вашей задаче, а я предложу решение.' }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Печатает..."); // Динамический статус
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // --- ОЗВУЧКА ---
  const speakText = (text: string) => {
    if (!voiceEnabled) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU';
    utterance.rate = 1.2; // Чуть бодрее
    window.speechSynthesis.speak(utterance);
  };

  // --- ГОЛОСОВОЙ ВВОД ---
  const toggleListening = () => {
    vibrate();
    if (isListening) {
      setIsListening(false);
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Голосовой ввод не поддерживается вашим браузером.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'ru-RU';
    recognition.start();
    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
      vibrate();
    };
    recognition.onend = () => setIsListening(false);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    vibrate();
    
    const newMsg = { role: 'user' as const, text };
    setMessages(prev => [...prev, newMsg]);
    setInput("");
    
    setLoading(true);
    setLoadingText("Анализирую..."); // Смена статуса

    try {
      const userId = "user_" + Math.floor(Math.random() * 10000);
      const res = await axios.post(API_URL, { message: text, userId, voiceMode: voiceEnabled });

      const replies = Array.isArray(res.data.reply) ? res.data.reply : [res.data.reply];

      setLoading(false); // Убираем индикатор загрузки перед показом ответов
      
      // Эффект "печатания" каждого пузыря
      for (const reply of replies) {
        if (!reply) continue;
        setLoadingText("Печатает..."); // Показываем, что он пишет следующий кусок
        await new Promise(r => setTimeout(r, 700)); // Пауза для чтения
        setMessages(prev => [...prev, { role: 'ai', text: reply }]);
        vibrate(); // Вибрация на каждое сообщение
        if (voiceEnabled) speakText(reply);
      }

    } catch (e) {
      setLoading(false);
      setMessages(prev => [...prev, { role: 'ai', text: "⚠️ Что-то со связью..." }]);
    }
  };

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  const quickReplies = ["💰 Сколько стоит?", "📱 Нужен App", "🚀 Автоматизация", "🤔 Как вы работаете?"];

  return (
    <div className="flex flex-col h-full relative pb-20 bg-[#030304]">
      
      {/* Header */}
      <div className="glass z-20 px-6 py-4 flex items-center justify-between shrink-0 shadow-lg border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-indigo-500/20 shadow-lg">
            <Bot size={18} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-sm text-white tracking-wide">WorkWork <span className="text-purple-400">AI</span></h1>
            <div className="flex items-center gap-1.5">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
               <p className="text-[10px] text-slate-400 font-medium">Online</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => { setVoiceEnabled(!voiceEnabled); vibrate(); }}
          className={`p-2 rounded-full transition-all active:scale-90 ${voiceEnabled ? 'bg-purple-500/20 text-purple-400' : 'bg-white/5 text-slate-500'}`}
        >
          {voiceEnabled ? <Volume2 size={18}/> : <VolumeX size={18}/>}
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 z-10 scrollbar-hide">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => {
            // Проверяем: следующее сообщение от того же автора?
            const isNextSame = messages[i + 1]?.role === m.role;
            // Проверяем: предыдущее сообщение от того же автора?
            const isPrevSame = messages[i - 1]?.role === m.role;

            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''} ${isNextSame ? 'mb-1' : 'mb-4'}`}
              >
                {/* АВАТАРКА (Показываем только у ПОСЛЕДНЕГО сообщения в группе) */}
                <div className={`w-8 h-8 flex-shrink-0 flex items-end justify-center ${m.role === 'user' ? 'hidden' : ''}`}>
                   {!isNextSame ? (
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
                         <Sparkles size={14} className="text-white"/>
                      </div>
                   ) : (
                      <div className="w-8 h-8" /> /* Пустое место, чтобы текст не прыгал */
                   )}
                </div>
                
                {/* ПУЗЫРЬ СООБЩЕНИЯ */}
                <div className={`
                  max-w-[80%] px-4 py-3 text-[15px] leading-relaxed shadow-sm break-words
                  ${m.role === 'ai' 
                      ? `glass text-slate-200 border-white/5 
                         ${isPrevSame ? 'rounded-tl-lg' : 'rounded-tl-none'} 
                         ${isNextSame ? 'rounded-bl-lg' : 'rounded-bl-2xl'}
                         rounded-r-2xl` 
                      : `bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
                         ${isPrevSame ? 'rounded-tr-lg' : 'rounded-tr-none'} 
                         ${isNextSame ? 'rounded-br-lg' : 'rounded-br-2xl'}
                         rounded-l-2xl shadow-purple-900/20`}
                `}>
                  <ReactMarkdown>{m.text}</ReactMarkdown>
                </div>
              </motion.div>
            );
        })}
        </AnimatePresence>
        
        {loading && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 ml-11 mt-2">
             <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"></div>
             </div>
             <span className="text-xs text-slate-500 font-mono animate-pulse">{loadingText}</span>
           </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Footer Area */}
      <div className="absolute bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-[#030304] via-[#030304]/95 to-transparent z-20">
        
        {/* Quick Replies (С горизонтальным скроллом) */}
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide mb-1">
          {quickReplies.map((qr, idx) => (
            <button 
              key={idx} 
              onClick={() => sendMessage(qr)}
              className="px-3 py-1.5 rounded-full bg-[#1a1a1f] border border-white/10 text-xs text-slate-300 whitespace-nowrap active:scale-95 transition hover:bg-white/10 hover:border-purple-500/30 hover:text-purple-300"
            >
              {qr}
            </button>
          ))}
        </div>

        {/* Input & Voice */}
        <div className={`relative flex items-center bg-[#0a0a0c] rounded-2xl border transition-all duration-300 ${isListening ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.15)]' : 'border-white/10 focus-within:border-purple-500/50'}`}>
            
            <button 
                onClick={toggleListening}
                className={`p-3 ml-1 rounded-xl transition-all active:scale-90 ${isListening ? 'text-red-500 animate-pulse' : 'text-slate-400 hover:text-white'}`}
            >
                {isListening ? <MicOff size={20}/> : <Mic size={20}/>}
            </button>

            <input 
              value={input} 
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder={isListening ? "Говорите..." : "Сообщение..."}
              className="w-full bg-transparent text-white py-4 pl-2 pr-12 text-sm focus:outline-none placeholder:text-slate-600"
            />
            
            <button onClick={() => sendMessage(input)} className="absolute right-2 p-2 bg-indigo-600 text-white rounded-xl active:scale-90 transition shadow-lg shadow-indigo-900/20">
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
    <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0c]/90 backdrop-blur-xl border-t border-white/5 h-16 flex items-center justify-around z-50 pb-2 safe-area-bottom">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <Link to={tab.path} key={tab.path} onClick={vibrate} className="relative flex flex-col items-center gap-1 p-2 w-16 active:scale-95 transition-transform">
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