import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, TrendingUp, X, ArrowRight, Image as ImageIcon } from 'lucide-react';

// --- ДЕМО-КОМПОНЕНТЫ ---

// 1. Анимированная Банковская Карта (Оставляем, она топ)
const CreditCardDemo = () => (
  <div className="relative w-full h-32 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-4 shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-500">
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
    <div className="flex justify-between items-start mb-6">
      <div className="w-8 h-5 bg-yellow-400/80 rounded flex items-center justify-center gap-1">
        <div className="w-2 h-2 border border-black/20 rounded-full"></div>
      </div>
      <span className="text-white/80 font-mono text-xs">NEOBANK</span>
    </div>
    <div className="font-mono text-white text-lg tracking-widest mb-1">•••• 4290</div>
    <div className="flex justify-between text-[10px] text-white/60 font-mono uppercase">
      <span>Holder Name</span>
      <span>12/28</span>
    </div>
  </div>
);

// 2. 🔥 НОВОЕ: AI Vision Scanner (Вместо логистики)
const VisionDemo = () => (
  <div className="w-full h-32 bg-[#0f0f12] rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center">
    {/* Имитация картинки */}
    <div className="w-20 h-20 rounded-lg border-2 border-dashed border-white/20 flex items-center justify-center">
      <ImageIcon size={30} className="text-white/20"/>
    </div>
    
    {/* Сканирующий луч */}
    <motion.div 
      className="absolute left-0 right-0 h-0.5 bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.8)] z-10"
      animate={{ top: ['10%', '90%', '10%'] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    />

    {/* Рамки детекции */}
    <motion.div 
      className="absolute w-16 h-16 border-2 border-green-500 rounded-lg opacity-0"
      animate={{ opacity: [0, 1, 0], scale: [1.2, 1, 1.1] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
    />
    
    <div className="absolute top-2 right-2 text-[10px] font-mono text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
      PROCESSING
    </div>
  </div>
);

// 3. Живой График (Оставляем)
const ChartDemo = () => (
  <div className="w-full h-32 bg-[#0f0f12] rounded-xl border border-white/10 p-3 relative overflow-hidden flex items-end justify-between gap-1">
    {[40, 70, 50, 90, 60, 80, 100].map((h, i) => (
      <motion.div
        key={i}
        initial={{ height: 0 }}
        animate={{ height: `${h}%` }}
        transition={{ duration: 1, delay: i * 0.1, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
        className="w-full bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-sm opacity-80"
      />
    ))}
    <div className="absolute top-3 left-3 text-xs font-bold text-cyan-400 flex items-center gap-1">
      <TrendingUp size={12}/> +142% Growth
    </div>
  </div>
);

// --- ДАННЫЕ ПРОЕКТОВ ---
const projects = [
  {
    id: 1,
    title: "NeoBank Mobile",
    category: "FinTech App",
    desc: "Мобильный банк нового поколения. Биометрия, P2P переводы, аналитика трат.",
    stats: ["1M+ Пользователей", "0.05s Задержка", "PCI DSS Level 1"],
    tech: ["React Native", "Node.js", "PostgreSQL"],
    visual: <CreditCardDemo />,
    color: "indigo"
  },
  {
    id: 2,
    title: "Vision AI Editor",
    category: "AI Media App",
    desc: "Приложение для обработки фото/видео нейросетями. Удаление фона, апскейл, генерация.",
    stats: ["4k Rendering", "GPU Cluster", "FaceID Auth"],
    tech: ["Flutter", "Python (Torch)", "AWS S3"],
    visual: <VisionDemo />, // Новая демка
    color: "green"
  },
  {
    id: 3,
    title: "CryptoTrader Pro",
    category: "Web3 Platform",
    desc: "Терминал для арбитража криптовалют. Подключение к 15 биржам.",
    stats: ["$50M Оборот", "High-Load", "Instant Exec"],
    tech: ["Next.js", "Go", "Redis"],
    visual: <ChartDemo />,
    color: "cyan"
  }
];

export default function Projects() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-full px-4 pt-8 pb-24 overflow-y-auto scrollbar-hide">
      
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
          Наши <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Кейсы</span>
        </h2>
        <p className="text-slate-400 text-sm">Реальные решения для бизнеса.</p>
      </div>

      <div className="space-y-6">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            onClick={() => setSelectedId(p.id)}
            className="group relative bg-[#111] border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-white/20 transition-all active:scale-95"
          >
            {/* Градиент подсветки */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-${p.color}-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500`}/>
            
            <div className="relative p-4 z-10">
              <div className="mb-4">
                {p.visual}
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-white">{p.title}</h3>
                    <ArrowRight size={14} className="text-slate-500 -rotate-45 group-hover:rotate-0 group-hover:text-white transition-all"/>
                  </div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{p.category}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* МОДАЛЬНОЕ ОКНО */}
      <AnimatePresence>
        {selectedId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedId(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="w-full max-w-sm bg-[#15151a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {(() => {
                const p = projects.find(item => item.id === selectedId)!;
                return (
                  <>
                    <div className="relative h-40 bg-[#0a0a0c] flex items-center justify-center p-6 border-b border-white/5">
                        {p.visual}
                        <button 
                          onClick={() => setSelectedId(null)} 
                          className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-white/20 transition"
                        >
                          <X size={18}/>
                        </button>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{p.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6">{p.desc}</p>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex flex-wrap gap-2">
                          {p.tech.map(t => (
                            <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-300 font-mono">
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {p.stats.map((s, idx) => (
                            <div key={idx} className="bg-[#0a0a0c] p-2 rounded-lg text-center border border-white/5">
                              <p className="text-[10px] text-slate-500 font-bold uppercase">{s.split(' ')[1]}</p>
                              <p className={`text-xs font-bold text-${p.color}-400`}>{s.split(' ')[0]}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition active:scale-95 flex items-center justify-center gap-2">
                        Хочу такой проект
                        <ExternalLink size={16} className="text-black"/>
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