import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Send, Bot, Mic, MicOff, Sparkles, Terminal, Cpu, Zap, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import 'regenerator-runtime/runtime'; // Нужен для речевого API в некоторых браузерах

// Ссылка на бэк
const API_URL = import.meta.env.VITE_API_URL || "https://project-seller.onrender.com/api/chat";

export default function App() {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: '🌌 **Система онлайн.** \n\nЯ — Демонстрационный AI-Агент. \nЯ показываю, как технологии могут продавать за вас. \n\nНапишите или **скажите** что-нибудь.' }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // --- ЛОГИКА ГОЛОСОВОГО ВВОДА ---
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Ваш браузер не поддерживает голосовой ввод (попробуйте Chrome/Safari)");
      return;
    }
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'ru-RU';
    recognition.start();
    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      sendMessage(transcript); // Сразу отправляем
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const newMsg = { role: 'user' as const, text };
    setMessages(prev => [...prev, newMsg]);
    setInput("");
    setLoading(true);

    try {
      const userId = "demo_user_" + Math.floor(Math.random() * 1000);
      const res = await axios.post(API_URL, { message: text, userId });
      setMessages(prev => [...prev, { role: 'ai', text: res.data.reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', text: "🔴 Ошибка связи с нейроядром." }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  return (
    <div className="flex flex-col h-screen relative font-sans">
      
      {/* 1. ЖИВОЙ ФОН (Aurora) */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* 2. HEADER */}
      <div className="relative z-10 bg-white/5 backdrop-blur-xl border-b border-white/10 p-4 pt-6 shadow-2xl">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                        <Bot size={22} className="text-white"/>
                    </div>
                    <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-black"></span>
                    </span>
                </div>
                <div>
                    <h1 className="font-bold text-lg text-white leading-tight">NeuroSales <span className="text-purple-400">AI</span></h1>
                    <div className="flex items-center gap-1.5">
                        <Activity size={10} className="text-green-400"/>
                        <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">System Operational</p>
                    </div>
                </div>
            </div>
            
            {/* Кнопка сброса (если затупил) */}
            <button onClick={() => window.location.reload()} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition">
                <Sparkles size={18} className="text-yellow-400"/>
            </button>
        </div>
      </div>

      {/* 3. CHAT AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide z-10">
        <AnimatePresence>
            {messages.map((m, i) => (
                <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg ${m.role === 'ai' ? 'bg-gradient-to-br from-indigo-600 to-purple-700' : 'bg-slate-700'}`}>
                        {m.role === 'ai' ? <Cpu size={14} className="text-white"/> : <Bot size={14} className="text-white"/>}
                    </div>
                    
                    <div className={`
                        max-w-[85%] p-4 rounded-2xl text-[14px] leading-relaxed shadow-lg backdrop-blur-sm border
                        ${m.role === 'ai' 
                            ? 'bg-[#15151a]/90 border-white/10 text-slate-200 rounded-tl-none' 
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 border-transparent text-white rounded-tr-none'}
                    `}>
                        <ReactMarkdown components={{
                            strong: ({node, ...props}) => <span className="font-bold text-purple-400" {...props} />,
                            code: ({node, ...props}) => <code className="bg-black/30 px-1 py-0.5 rounded text-xs font-mono text-yellow-300" {...props} />
                        }}>
                            {m.text}
                        </ReactMarkdown>
                    </div>
                </motion.div>
            ))}
        </AnimatePresence>
        
        {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 ml-12 items-center">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{animationDelay: '0ms'}}/>
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{animationDelay: '150ms'}}/>
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{animationDelay: '300ms'}}/>
            </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* 4. INPUT AREA & ACTIONS */}
      <div className="p-4 bg-black/40 backdrop-blur-xl border-t border-white/10 shrink-0 z-20 pb-8">
        
        {/* Быстрые команды (Tags) */}
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide mb-2">
            {[
                { icon: <Terminal size={14}/>, text: "Стек технологий" },
                { icon: <Zap size={14}/>, text: "Возможности" },
                { icon: <Cpu size={14}/>, text: "Как это работает?" }
            ].map((btn, idx) => (
                <button 
                    key={idx}
                    onClick={() => sendMessage(btn.text)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:border-purple-500/50 hover:bg-white/10 transition active:scale-95 whitespace-nowrap"
                >
                    <span className="text-purple-400">{btn.icon}</span>
                    <span className="text-xs text-slate-300 font-medium">{btn.text}</span>
                </button>
            ))}
        </div>

        {/* Поле ввода */}
        <div className="relative flex items-center bg-[#111] rounded-2xl border border-white/10 focus-within:border-purple-500/50 focus-within:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all duration-300">
            <button 
                onClick={startListening}
                className={`p-3 ml-1 rounded-xl transition-all ${isListening ? 'text-red-500 animate-pulse' : 'text-slate-400 hover:text-white'}`}
            >
                {isListening ? <MicOff size={20}/> : <Mic size={20}/>}
            </button>
            
            <input 
                value={input} 
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                placeholder={isListening ? "Слушаю..." : "Спроси нейросеть..."}
                className="w-full bg-transparent text-white py-4 pl-2 pr-12 text-sm focus:outline-none placeholder:text-slate-600"
            />
            
            <button 
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="absolute right-2 p-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:opacity-90 disabled:opacity-50 disabled:grayscale transition-all shadow-lg"
            >
                <Send size={18} />
            </button>
        </div>
      </div>
    </div>
  );
}