import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, X, ArrowRight, Image as ImageIcon, Zap } from 'lucide-react';

// --- ВИЗУАЛЬНЫЕ КОМПОНЕНТЫ (АНИМАЦИИ) ---

// 1. Финтех (Карта)
const FintechVisual = () => (
  <div className="relative w-full h-32 bg-gradient-to-br from-indigo-900 to-slate-900 rounded-xl p-4 shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-500 border border-white/10">
    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>
    <div className="flex justify-between items-start mb-6">
      <div className="w-8 h-5 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded flex items-center justify-center gap-1 shadow-sm">
        <div className="w-2 h-2 border border-black/20 rounded-full"></div>
      </div>
      <span className="text-white/60 font-mono text-[10px]">PLATINUM</span>
    </div>
    <div className="font-mono text-white text-lg tracking-widest mb-1 drop-shadow-md">•••• 8842</div>
    <div className="flex justify-between text-[10px] text-white/50 font-mono uppercase">
      <span>WorkWork Client</span>
      <span>09/29</span>
    </div>
  </div>
);

// 2. AI / Vision (Сканер)
const AiVisual = () => (
  <div className="w-full h-32 bg-[#0a0a0a] rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center">
    <div className="absolute inset-0 bg-[radial-gradient(#ffffff1a_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
    <motion.div 
      className="absolute left-0 right-0 h-[2px] bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)] z-10"
      animate={{ top: ['10%', '90%', '10%'] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
    />
    <div className="w-16 h-16 border border-green-500/50 rounded-lg flex items-center justify-center bg-green-500/5 backdrop-blur-sm">
      <ImageIcon size={24} className="text-green-500"/>
    </div>
    <div className="absolute bottom-2 right-2 text-[8px] font-mono text-green-400 bg-green-900/30 px-1.5 rounded border border-green-500/20">
      AI DETECTED
    </div>
  </div>
);

// 3. Аналитика / Крипта (График)
const CryptoVisual = () => (
  <div className="w-full h-32 bg-[#0f0f12] rounded-xl border border-white/10 p-3 relative overflow-hidden flex items-end justify-between gap-1">
    {[30, 50, 45, 80, 60, 95, 70, 100].map((h, i) => (
      <motion.div
        key={i}
        initial={{ height: "10%" }}
        animate={{ height: `${h}%` }}
        transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity, repeatType: "reverse" }}
        className="w-full bg-gradient-to-t from-cyan-600/80 to-cyan-400 rounded-sm"
      />
    ))}
    <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded bg-cyan-900/30 border border-cyan-500/20">
      <TrendingUp size={10} className="text-cyan-400"/>
      <span className="text-[10px] font-bold text-cyan-300">+24.5%</span>
    </div>
  </div>
);

// --- СПИСОК ПРОЕКТОВ ---
const projects = [
  {
    id: 1,
    title: "NeoBank SuperApp",
    type: "fintech",
    desc: "Мобильный банкинг с P2P переводами, оплатой QR и крипто-кошельком.",
    stats: ["iOS & Android", "High-Security", "0% Bugs"],
    tech: ["Flutter", "Go", "PostgreSQL"],
    visual: <FintechVisual />,
    color: "indigo"
  },
  {
    id: 2,
    title: "Vision AI Scanner",
    type: "ai",
    desc: "Система распознавания документов и дефектов на производстве.",
    stats: ["99.8% Точность", "Real-time", "On-Device"],
    tech: ["Python", "TensorFlow", "React"],
    visual: <AiVisual />,
    color: "green"
  },
  {
    id: 3,
    title: "Arbitrage Terminal",
    type: "crypto",
    desc: "Платформа для арбитража криптовалют между 15 биржами в реальном времени.",
    stats: ["$100M Volume", "WebSockets", "<50ms Ping"],
    tech: ["Next.js", "Node.js", "Redis"],
    visual: <CryptoVisual />,
    color: "cyan"
  },
  {
    id: 4,
    title: "Delivery Network",
    type: "fintech", // Используем стиль карты для логистики
    desc: "Убер-подобное приложение для грузоперевозок и логистики.",
    stats: ["Live Map", "Auto-Dispatch", "Billing"],
    tech: ["React Native", "NestJS", "Google Maps"],
    visual: <FintechVisual />, // Переиспользуем визуал
    color: "orange"
  },
  {
    id: 5,
    title: "Auto-Sales Agent",
    type: "ai",
    desc: "Голосовой бот, который сам звонит клиентам и продает услуги.",
    stats: ["Voice API", "NLP Core", "CRM Sync"],
    tech: ["n8n", "OpenAI", "Asterisk"],
    visual: <AiVisual />,
    color: "purple"
  },
  {
    id: 6,
    title: "Corporate CRM",
    type: "crypto", // Используем стиль графика
    desc: "ERP система для управления строительной компанией с аналитикой.",
    stats: ["Dashboard", "Reports", "Role Model"],
    tech: ["React", "C# .NET", "MSSQL"],
    visual: <CryptoVisual />,
    color: "blue"
  }
];

export default function Projects() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-full px-4 pt-8 pb-24 overflow-y-auto scrollbar-hide">
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">
          Наши <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Кейсы</span>
        </h2>
        <p className="text-xs text-slate-400">Реализованные проекты WorkWorkStudio.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelectedId(p.id)}
            className="relative bg-[#111] border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-white/20 active:scale-95 transition-all"
          >
            {/* Карточка */}
            <div className="p-4 flex gap-4 items-center">
              <div className="w-24 h-20 shrink-0 rounded-lg overflow-hidden border border-white/5">
                 {/* Уменьшенная версия визуала */}
                 <div className="scale-75 origin-top-left w-[130%] h-[130%]">
                    {p.visual}
                 </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-white truncate">{p.title}</h3>
                <p className="text-[10px] text-slate-400 line-clamp-2 leading-tight mt-1">{p.desc}</p>
                <div className="flex items-center gap-2 mt-2">
                    <span className={`text-[9px] px-1.5 py-0.5 rounded border border-${p.color}-500/30 text-${p.color}-300 bg-${p.color}-500/10 uppercase font-bold`}>
                        {p.tech[0]}
                    </span>
                    <span className="text-[9px] text-slate-500">+ ещё 2</span>
                </div>
              </div>
              
              <ArrowRight size={16} className="text-white/20"/>
            </div>
          </motion.div>
        ))}
      </div>

      {/* МОДАЛКА (ДЕТАЛИ) */}
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
              {(() => {
                const p = projects.find(item => item.id === selectedId)!;
                return (
                  <>
                    <div className="relative h-44 bg-[#050505] flex items-center justify-center p-6 border-b border-white/5">
                        <div className="w-full h-full scale-110">{p.visual}</div>
                        <button onClick={() => setSelectedId(null)} className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-white/20"><X size={18}/></button>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6">{p.desc}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                          {p.tech.map(t => (
                            <span key={t} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-slate-300 font-mono">{t}</span>
                          ))}
                      </div>

                      <div className="grid grid-cols-3 gap-2 mb-6">
                          {p.stats.map((s, idx) => (
                            <div key={idx} className="bg-[#0a0a0c] p-2 rounded-lg text-center border border-white/5">
                              <p className={`text-[10px] font-bold text-${p.color}-400 mb-0.5`}>{s.split(' ')[0]}</p>
                              <p className="text-[8px] text-slate-500 uppercase">{s.split(' ').slice(1).join(' ')}</p>
                            </div>
                          ))}
                      </div>

                      <button className="w-full py-3 bg-white text-black font-bold rounded-xl active:scale-95 transition flex items-center justify-center gap-2">
                        Хочу такой проект <Zap size={16} className="fill-black"/>
                      </button>
                    </div>
                  </>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}