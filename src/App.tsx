import { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, Sparkles, Zap, Shield, CreditCard, User, Command, MessageSquare, Briefcase, UserCircle } from 'lucide-react';

// Импортируем страницы (убедись, что создал их в src/pages!)
import Projects from './pages/Projects';
import Contact from './pages/Contact';

const API_URL = import.meta.env.VITE_API_URL || "https://project-seller.onrender.com/api/chat";

// --- КОМПОНЕНТ ЧАТА (Твой старый App) ---
function Chat() {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: '👋 Привет! Я — **WorkWork AI**. \n\nМы разрабатываем софт без предоплаты. Спроси про **цены**, **стек** или **условия**.' }
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
      const userId = "client_" + Math.floor(Math.random() * 10000);
      const res = await axios.post(API_URL, { message: text, userId });
      setMessages(prev => [...prev, { role: 'ai', text: res.data.reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', text: "⚠️ Ошибка связи." }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  const suggestions = [
    { icon: <Zap size={14}/>, label: "Автоматизация", text: "Что вы умеете на n8n?" },
    { icon: <Shield size={14}/>, label: "Гарантии", text: "Как работать без предоплаты?" },
    { icon: <CreditCard size={14}/>, label: "Цены", text: "Сколько стоит MVP?" },
  ];

  return (
    <div className="flex flex-col h-full font-sans relative pb-20"> {/* pb-20 для меню */}
      {/* Header */}
      <div className="glass z-20 px-6 py-4 flex items-center justify-between shrink-0 shadow-lg border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center">
            <Bot size={18} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-sm text-white">WorkWork <span className="text-purple-400">Studio</span></h1>
            <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/>
                <p className="text-[10px] text-slate-400 font-medium">Online</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 z-10 scrollbar-hide">
        {messages.map((m, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${m.role === 'ai' ? 'bg-[#1a1a1f] border border-white/10' : 'bg-white'}`}>
                {m.role === 'ai' ? <Sparkles size={14} className="text-purple-400"/> : <User size={14} className="text-black"/>}
              </div>
              <div className={`
                max-w-[85%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed shadow-md
                ${m.role === 'ai' ? 'glass text-slate-200 rounded-tl-none' : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-none'}
              `}>
                <ReactMarkdown>{m.text}</ReactMarkdown>
              </div>
            </motion.div>
        ))}
        {loading && <div className="text-xs text-slate-500 ml-12 animate-pulse">Печатает...</div>}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="absolute bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent z-20">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-2">
          {suggestions.map((s, idx) => (
            <button key={idx} onClick={() => sendMessage(s.text)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1a1a1f] border border-white/10 text-xs text-slate-300 whitespace-nowrap active:scale-95 transition">
              {s.icon} {s.label}
            </button>
          ))}
        </div>
        <div className="relative flex items-center bg-[#111] rounded-xl border border-white/10 focus-within:border-purple-500/50 transition-colors">
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Спроси нейросеть..." 
              className="w-full bg-transparent text-white py-3.5 pl-4 pr-12 text-sm focus:outline-none placeholder:text-slate-600"
            />
            <button onClick={() => sendMessage(input)} className="absolute right-2 p-1.5 bg-indigo-600 text-white rounded-lg active:scale-90 transition">
              <Send size={16} />
            </button>
        </div>
      </div>
    </div>
  );
}

// --- НИЖНЕЕ МЕНЮ (TAB BAR) ---
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

// --- ГЛАВНЫЙ КОМПОНЕНТ ---
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