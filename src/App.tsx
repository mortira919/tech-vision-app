import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, Sparkles, Zap, Shield, CreditCard, User, Command } from 'lucide-react';

// Ссылка на бэкенд
const API_URL = import.meta.env.VITE_API_URL || "https://project-seller.onrender.com/api/chat";

export default function App() {
 const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
  { role: 'ai', text: '👋 Привет! Я — цифровой ассистент **WorkWorkStudio**. \n\nМы занимаемся разработкой мобильных приложений, веб-сервисов и автоматизацией на **n8n**. ' }
]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const newMsg = { role: 'user' as const, text };
    setMessages(prev => [...prev, newMsg]);
    setInput("");
    setLoading(true);

    try {
      const userId = "vip_client_" + Math.floor(Math.random() * 10000);
      const res = await axios.post(API_URL, { message: text, userId });
      setMessages(prev => [...prev, { role: 'ai', text: res.data.reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', text: "⚠️ Связь с сервером потеряна." }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  const suggestions = [
  { icon: <Zap size={14}/>, label: "Автоматизация", text: "Что вы умеете делать на n8n?" },
  { icon: <CreditCard size={14}/>, label: "Условия", text: "Как вы работаете без предоплаты?" },
  { icon: <Shield size={14}/>, label: "Разработка", text: "Какие приложения вы делаете?" },
];

  return (
    <div className="flex flex-col h-full relative overflow-hidden font-sans selection:bg-purple-500/30">
      
      {/* ФОНОВЫЕ ЭФФЕКТЫ (AURORA) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-[-10%] w-96 h-96 bg-purple-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
        <div className="absolute top-0 right-[-10%] w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
      </div>

      {/* HEADER */}
      <div className="glass z-20 px-6 py-4 flex items-center justify-between shrink-0 shadow-lg shadow-black/20">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Bot size={20} className="text-white" />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-[#030304]"></span>
            </span>
          </div>
          <div>
            <h1 className="font-bold text-base leading-none text-white tracking-wide">TechVision <span className="text-purple-400">Core</span></h1>
            <p className="text-[10px] text-slate-400 font-medium tracking-widest mt-1">AI SALES AGENT</p>
          </div>
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 z-10 scrollbar-hide">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg ${m.role === 'ai' ? 'bg-[#1a1a1f] border border-white/10' : 'bg-white'}`}>
                {m.role === 'ai' ? <Sparkles size={14} className="text-purple-400"/> : <User size={14} className="text-black"/>}
              </div>
              
              <div className={`
                max-w-[85%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed shadow-md
                ${m.role === 'ai' 
                  ? 'glass text-slate-200 rounded-tl-none' 
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-none'}
              `}>
                <ReactMarkdown components={{
                  strong: ({...props}) => <span className="font-bold text-white" {...props} />
                }}>
                  {m.text}
                </ReactMarkdown>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-1 ml-12">
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"/>
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce delay-75"/>
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce delay-150"/>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* FOOTER & INPUT */}
      <div className="glass border-t border-white/5 p-4 pb-6 shrink-0 z-20">
        
        {/* Chips */}
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide mb-1">
          {suggestions.map((s, idx) => (
            <button 
              key={idx}
              onClick={() => sendMessage(s.text)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-purple-500/30 transition active:scale-95 whitespace-nowrap group"
            >
              <span className="text-slate-400 group-hover:text-purple-400 transition-colors">{s.icon}</span>
              <span className="text-xs text-slate-300 font-medium">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Input Field */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl opacity-20 group-focus-within:opacity-50 transition duration-500 blur"></div>
          <div className="relative flex items-center bg-[#0a0a0c] rounded-xl border border-white/10">
            <div className="pl-3 text-slate-500">
              <Command size={16} />
            </div>
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Введите запрос..." 
              className="w-full bg-transparent text-white py-3.5 pl-3 pr-12 text-sm focus:outline-none placeholder:text-slate-600"
            />
            <button 
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="absolute right-1.5 p-2 bg-white/10 text-white rounded-lg hover:bg-purple-600 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}