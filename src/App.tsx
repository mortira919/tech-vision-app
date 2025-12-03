import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Send, Bot, Terminal, Cpu, Zap, Activity, ArrowRight } from 'lucide-react';

// Убедись, что тут правильная ссылка на твой бэкенд!
const API_URL = import.meta.env.VITE_API_URL || "https://project-seller.onrender.com/api/chat";

export default function App() {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: '🌌 **Система онлайн.** \n\nЯ — Демонстрационный AI-Агент. \nЯ показываю, как технологии могут продавать за вас. \n\nНапишите что-нибудь.' }
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
      const userId = "demo_user_" + Math.floor(Math.random() * 1000);
      const res = await axios.post(API_URL, { message: text, userId });
      setMessages(prev => [...prev, { role: 'ai', text: res.data.reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', text: "🔴 Ошибка связи с сервером." }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  return (
    // h-full важно для растягивания
    <div className="flex flex-col h-full bg-[#050505] text-slate-200 font-sans">
      
      {/* HEADER */}
      <div className="bg-[#0a0a0a] border-b border-white/10 p-4 shrink-0 z-10 shadow-md">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
                <Bot size={20} className="text-white"/>
            </div>
            <div>
                <h1 className="font-bold text-lg text-white leading-tight">NeuroSales <span className="text-purple-400">AI</span></h1>
                <div className="flex items-center gap-1.5">
                    <Activity size={10} className="text-green-400"/>
                    <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">System Operational</p>
                </div>
            </div>
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg ${m.role === 'ai' ? 'bg-[#1f1f23]' : 'bg-purple-600'}`}>
                    {m.role === 'ai' ? <Cpu size={14} className="text-purple-400"/> : <Bot size={14} className="text-white"/>}
                </div>
                
                <div className={`
                    max-w-[85%] p-3.5 rounded-2xl text-[14px] leading-relaxed shadow-md border
                    ${m.role === 'ai' 
                        ? 'bg-[#15151a] border-white/10 text-slate-200 rounded-tl-none' 
                        : 'bg-purple-600 border-transparent text-white rounded-tr-none'}
                `}>
                    <ReactMarkdown>{m.text}</ReactMarkdown>
                </div>
            </div>
        ))}
        
        {loading && (
            <div className="flex gap-2 ml-12 items-center">
                <span className="text-xs text-slate-500 animate-pulse">Печатает...</span>
            </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* INPUT AREA */}
      <div className="p-4 bg-[#0a0a0a] border-t border-white/10 shrink-0 pb-6">
        
        {/* Теги */}
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide mb-2">
            {[ "Стек технологий", "Возможности", "Как это работает?" ].map((tag, idx) => (
                <button 
                    key={idx}
                    onClick={() => sendMessage(tag)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:border-purple-500/50 hover:bg-white/10 transition whitespace-nowrap text-xs text-slate-300"
                >
                    {tag}
                </button>
            ))}
        </div>

        {/* Инпут */}
        <div className="relative flex items-center bg-[#111] rounded-2xl border border-white/10 focus-within:border-purple-500/50 transition-all">
            <input 
                value={input} 
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                placeholder="Задай вопрос..."
                className="w-full bg-transparent text-white py-3.5 pl-4 pr-12 text-sm focus:outline-none placeholder:text-slate-600"
            />
            
            <button 
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="absolute right-2 p-2 bg-purple-600 text-white rounded-xl hover:opacity-90 disabled:opacity-50 transition-all"
            >
                <ArrowRight size={18} />
            </button>
        </div>
      </div>
    </div>
  );
}