import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {  X ,  Smartphone, Table, Terminal, Activity } from 'lucide-react';

// --- НОВЫЕ ВИЗУАЛЫ ---

// 1. Мобильное приложение (Экран телефона)
const MobileVisual = () => (
  <div className="w-full h-32 bg-gray-900 rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center">
    <div className="w-20 h-28 border-2 border-white/20 rounded-xl bg-black relative top-4 flex flex-col items-center pt-2 shadow-2xl">
        <div className="w-8 h-1 bg-white/20 rounded-full mb-2"></div>
        <div className="w-16 h-10 bg-indigo-600/50 rounded flex items-center justify-center">
            <Smartphone size={16} className="text-white"/>
        </div>
        <div className="w-16 h-2 bg-white/10 rounded mt-2"></div>
        <div className="w-12 h-2 bg-white/10 rounded mt-1"></div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent pointer-events-none"></div>
  </div>
);

// 2. CRM Система (Таблица)
const CrmVisual = () => (
  <div className="w-full h-32 bg-[#0e0e11] rounded-xl border border-white/10 p-4 relative overflow-hidden">
    <div className="flex gap-2 mb-3">
        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
    </div>
    <div className="space-y-2">
        <div className="flex gap-2"><div className="w-8 h-2 bg-white/20 rounded"></div><div className="w-full h-2 bg-white/5 rounded"></div></div>
        <div className="flex gap-2"><div className="w-8 h-2 bg-white/20 rounded"></div><div className="w-full h-2 bg-white/5 rounded"></div></div>
        <div className="flex gap-2"><div className="w-8 h-2 bg-white/20 rounded"></div><div className="w-full h-2 bg-white/5 rounded"></div></div>
    </div>
    <div className="absolute right-4 bottom-4 text-white/10"><Table size={40}/></div>
  </div>
);

// 3. Терминал (Код)
const CodeVisual = () => (
  <div className="w-full h-32 bg-[#050505] rounded-xl border border-white/10 p-3 font-mono text-[8px] text-green-400 overflow-hidden relative">
    <div className="opacity-70">
        <p>{"> git clone repo"}</p>
        <p className="text-white">{"> cloning..."}</p>
        <p>{"> npm install"}</p>
        <p className="text-yellow-400">{"> added 142 packages"}</p>
        <p>{"> npm run dev"}</p>
        <p className="text-green-300 animate-pulse">{"> SERVER RUNNING ON PORT 3000..."}</p>
    </div>
    <Terminal size={30} className="absolute right-2 bottom-2 text-white/10"/>
  </div>
);

// 4. Финтех (Карта) - уже был, но обновленный
const FintechVisual = () => (
  <div className="relative w-full h-32 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-xl p-4 shadow-lg overflow-hidden border border-white/10">
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
    <div className="flex justify-between items-start mb-6">
      <div className="w-8 h-5 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded flex items-center justify-center gap-1 shadow-sm">
        <div className="w-2 h-2 border border-black/20 rounded-full"></div>
      </div>
    </div>
    <div className="font-mono text-white text-lg tracking-widest mb-1">•••• 8842</div>
  </div>
);

// 5. График (Аналитика)
const ChartVisual = () => (
  <div className="w-full h-32 bg-[#0f0f12] rounded-xl border border-white/10 p-3 relative overflow-hidden flex items-end justify-between gap-1">
    {[30, 50, 45, 80, 60, 95, 70, 100].map((h, i) => (
      <motion.div key={i} initial={{ height: "10%" }} animate={{ height: `${h}%` }} transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity, repeatType: "reverse" }} className="w-full bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-sm"/>
    ))}
  </div>
);

// 6. AI Scanner (Глаз)
const AiVisual = () => (
  <div className="w-full h-32 bg-[#0a0a0a] rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center">
    <motion.div className="absolute left-0 right-0 h-[2px] bg-red-500 shadow-[0_0_15px_red] z-10" animate={{ top: ['10%', '90%', '10%'] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
    <div className="w-16 h-16 border border-white/10 rounded-lg flex items-center justify-center bg-white/5 backdrop-blur-sm">
      <Activity size={24} className="text-red-500"/>
    </div>
  </div>
);

// --- СПИСОК ПРОЕКТОВ ---
const projects = [
  { id: 1, title: "NeoBank SuperApp", desc: "Мобильный банкинг.", tech: ["Flutter"], visual: <FintechVisual /> },
  { id: 2, title: "Logistics CRM", desc: "Управление складом.", tech: ["React"], visual: <CrmVisual /> },
  { id: 3, title: "Delivery App", desc: "Доставка еды.", tech: ["React Native"], visual: <MobileVisual /> },
  { id: 4, title: "Crypto Arbitrage", desc: "Трейдинг бот.", tech: ["Node.js"], visual: <ChartVisual /> },
  { id: 5, title: "AI Security", desc: "Распознавание лиц.", tech: ["Python"], visual: <AiVisual /> },
  { id: 6, title: "Backend Core", desc: "API для High-load.", tech: ["NestJS"], visual: <CodeVisual /> }
];

export default function Projects() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-full px-4 pt-8 pb-24 overflow-y-auto scrollbar-hide">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">Наши Кейсы</h2>
        <p className="text-xs text-slate-400">Свайпай, чтобы увидеть уровень.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelectedId(p.id)}
            className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden cursor-pointer active:scale-95 transition-all"
          >
            <div className="h-24">{p.visual}</div>
            <div className="p-3">
                <h3 className="text-xs font-bold text-white truncate">{p.title}</h3>
                <p className="text-[10px] text-slate-500 mt-1">{p.tech[0]}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* МОДАЛКА */}
      <AnimatePresence>
        {selectedId && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedId(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }}
              className="w-full max-w-sm bg-[#15151a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
                <div className="h-40 bg-[#050505] flex items-center justify-center border-b border-white/5 relative">
                    <div className="scale-125">{projects.find(p => p.id === selectedId)?.visual}</div>
                    <button onClick={() => setSelectedId(null)} className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white"><X size={18}/></button>
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{projects.find(p => p.id === selectedId)?.title}</h3>
                    <p className="text-slate-400 text-sm">{projects.find(p => p.id === selectedId)?.desc}</p>
                    <button className="w-full mt-6 py-3 bg-white text-black font-bold rounded-xl active:scale-95 transition">Хочу такой проект</button>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}