import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Send, Bot, User, Database, Sparkles, Briefcase } from 'lucide-react';

const API_URL = "https://techvision-bot.onrender.com/api/chat";

export default function App() {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Привет! Я цифровой аватар Jakobe. Готов рассказать про архитектуру Bill Splitter бота. Что интересно?' }
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
      // Генерируем случайный ID юзера для сессии
      const userId = "demo_user_" + Math.floor(Math.random() * 1000);
      const res = await axios.post(API_URL, { message: text, userId });
      setMessages(prev => [...prev, { role: 'ai', text: res.data.reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', text: "⚠️ Ошибка связи с сервером. Убедитесь, что backend запущен." }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      
      {/* 1. HEADER & PROJECTS */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 shrink-0">
        <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center">
                <Bot size={20} className="text-white"/>
            </div>
            <div>
                <h1 className="font-bold text-sm">TechVision Hub</h1>
                <p className="text-xs text-slate-400">AI-Architect Demo</p>
            </div>
        </div>

        {/* Карусель кейсов (фейковая для вида) */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {[
                { name: "Bill Splitter", icon: <Sparkles size={14} className="text-yellow-400"/>, desc: "В разработке" },
                { name: "AI Resume", icon: <Briefcase size={14} className="text-blue-400"/>, desc: "OCR & Parsing" },
                { name: "FinTracker", icon: <Database size={14} className="text-green-400"/>, desc: "Mini App" },
            ].map((p, i) => (
                <div key={i} className="min-w-[120px] bg-slate-800 p-2 rounded-lg border border-slate-700 text-xs">
                    <div className="flex items-center gap-2 mb-1 font-bold">{p.icon} {p.name}</div>
                    <div className="text-slate-500">{p.desc}</div>
                </div>
            ))}
        </div>
      </div>

      {/* 2. CHAT AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'ai' ? 'bg-indigo-600' : 'bg-slate-700'}`}>
                    {m.role === 'ai' ? <Bot size={16}/> : <User size={16}/>}
                </div>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${m.role === 'ai' ? 'bg-slate-800 rounded-tl-none' : 'bg-blue-600 rounded-tr-none'}`}>
                    <ReactMarkdown>{m.text}</ReactMarkdown>
                </div>
            </div>
        ))}
        {loading && <div className="text-xs text-slate-500 ml-12 animate-pulse">Печатает...</div>}
        <div ref={bottomRef} />
      </div>

      {/* 3. QUICK ACTIONS & INPUT */}
      <div className="p-4 bg-slate-900 border-t border-slate-800 shrink-0">
        <div className="flex gap-2 mb-3 overflow-x-auto">
            {['🛠 Стек', '💸 Оплата', '🔗 QR-коды', '🚀 Сроки'].map(tag => (
                <button key={tag} onClick={() => sendMessage(tag)} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded-full text-xs text-blue-300 border border-slate-700 whitespace-nowrap transition">
                    {tag}
                </button>
            ))}
        </div>
        <div className="relative">
            <input 
                value={input} 
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                placeholder="Спроси про архитектуру..." 
                className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-blue-500 transition"
            />
            <button onClick={() => sendMessage(input)} className="absolute right-2 top-2 p-1.5 bg-blue-600 rounded-lg hover:bg-blue-500 transition">
                <Send size={16} />
            </button>
        </div>
      </div>
    </div>
  );
}