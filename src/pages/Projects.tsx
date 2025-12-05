import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {  TrendingUp, X, ArrowRight, Image as ImageIcon, Zap, MapPin } from 'lucide-react';

// --- ВИЗУАЛЬНЫЕ КОМПОНЕНТЫ (С динамическими цветами) ---

// 1. Финтех / Карты (Принимает цвет)
const FintechVisual = ({ color }: { color: string }) => {
  // Карта цветов для градиентов
  const gradients: any = {
    indigo: "from-indigo-900 to-purple-900",
    orange: "from-orange-800 to-red-900",
    blue: "from-blue-900 to-cyan-900",
  };
  const bgClass = gradients[color] || gradients.indigo;

  return (
    <div className={`relative w-full h-32 bg-gradient-to-br ${bgClass} rounded-xl p-4 shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-500 border border-white/10`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      <div className="flex justify-between items-start mb-6">
        {color === 'orange' ? (
           <MapPin className="text-white/80" size={24} />
        ) : (
           <div className="w-8 h-5 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded flex items-center justify-center gap-1 shadow-sm">
             <div className="w-2 h-2 border border-black/20 rounded-full"></div>
           </div>
        )}
        <span className="text-white/60 font-mono text-[10px]">PREMIUM</span>
      </div>
      <div className="font-mono text-white text-lg tracking-widest mb-1 drop-shadow-md">
        {color === 'orange' ? 'DELIVERY' : '•••• 8842'}
      </div>
      <div className="flex justify-between text-[10px] text-white/50 font-mono uppercase">
        <span>WorkWork Client</span>
        <span>ACTIVE</span>
      </div>
    </div>
  );
};

// 2. AI / Vision (Зеленый или Фиолетовый)
const AiVisual = ({ color }: { color: string }) => {
  const isPurple = color === 'purple';
  const beamColor = isPurple ? 'bg-purple-500 shadow-purple-500/50' : 'bg-green-500 shadow-green-500/50';
  const textColor = isPurple ? 'text-purple-400' : 'text-green-400';

  return (
    <div className="w-full h-32 bg-[#0a0a0a] rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff1a_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
      <motion.div 
        className={`absolute left-0 right-0 h-[2px] ${beamColor} z-10 shadow-[0_0_15px_currentColor]`}
        animate={{ top: ['10%', '90%', '10%'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
      />
      <div className={`w-16 h-16 border border-white/10 rounded-lg flex items-center justify-center bg-white/5 backdrop-blur-sm`}>
        {isPurple ? <Zap size={24} className={textColor}/> : <ImageIcon size={24} className={textColor}/>}
      </div>
      <div className={`absolute bottom-2 right-2 text-[8px] font-mono ${textColor} bg-white/5 px-1.5 rounded border border-white/10`}>
        AI PROCESSING
      </div>
    </div>
  );
};

// 3. Графики (Разные цвета)
const ChartVisual = ({ color }: { color: string }) => {
  // Хак для Tailwind цветов в JS
  const barColors: any = {
    cyan: "from-cyan-600/80 to-cyan-400",
    blue: "from-blue-600/80 to-blue-400",
    green: "from-emerald-600/80 to-emerald-400",
  };
  const barClass = barColors[color] || barColors.cyan;

  return (
    <div className="w-full h-32 bg-[#0f0f12] rounded-xl border border-white/10 p-3 relative overflow-hidden flex items-end justify-between gap-1">
      {[30, 50, 45, 80, 60, 95, 70, 100].map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: "10%" }}
          animate={{ height: `${h}%` }}
          transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity, repeatType: "reverse" }}
          className={`w-full bg-gradient-to-t ${barClass} rounded-sm`}
        />
      ))}
      <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/10">
        <TrendingUp size={10} className="text-white"/>
        <span className="text-[10px] font-bold text-white">+24.5%</span>
      </div>
    </div>
  );
};

// --- СПИСОК ПРОЕКТОВ ---
const projects = [
  {
    id: 1,
    title: "NeoBank SuperApp",
    desc: "Мобильный банкинг. Биометрия, переводы, оплата QR.",
    stats: ["iOS & Android", "High-Security"],
    tech: ["Flutter", "Go", "PostgreSQL"],
    visual: <FintechVisual color="indigo" />, // 🔵 Синяя карта
    color: "indigo"
  },
  {
    id: 2,
    title: "Vision AI Scanner",
    desc: "Распознавание документов и дефектов на производстве.",
    stats: ["99.8% Точность", "On-Device"],
    tech: ["Python", "TensorFlow", "React"],
    visual: <AiVisual color="green" />, // 🟢 Зеленый сканер
    color: "green"
  },
  {
    id: 3,
    title: "Arbitrage Terminal",
    desc: "Платформа для арбитража крипты. 15 бирж, <50ms пинг.",
    stats: ["$100M Volume", "WebSockets"],
    tech: ["Next.js", "Node.js", "Redis"],
    visual: <ChartVisual color="cyan" />, // 🔵 Голубой график
    color: "cyan"
  },
  {
    id: 4,
    title: "Logistics Network",
    desc: "Приложение для грузоперевозок. Живая карта, авто-распределение.",
    stats: ["Live Map", "Billing"],
    tech: ["React Native", "NestJS"],
    visual: <FintechVisual color="orange" />, // 🟠 Оранжевая карта (под доставку)
    color: "orange"
  },
  {
    id: 5,
    title: "Auto-Sales Voice Bot",
    desc: "AI, который звонит клиентам и продает услуги голосом.",
    stats: ["Voice API", "CRM Sync"],
    tech: ["n8n", "OpenAI", "Asterisk"],
    visual: <AiVisual color="purple" />, // 🟣 Фиолетовый AI
    color: "purple"
  },
  {
    id: 6,
    title: "Enterprise CRM",
    desc: "ERP система для строительной компании с аналитикой.",
    stats: ["Dashboard", "Reports"],
    tech: ["React", "C# .NET"],
    visual: <ChartVisual color="blue" />, // 🔵 Синий график
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
        <p className="text-xs text-slate-400">Свайпай, чтобы увидеть уровень.</p>
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
            <div className="p-4 flex gap-4 items-center">
              <div className="w-24 h-20 shrink-0 rounded-lg overflow-hidden border border-white/5">
                 <div className="scale-75 origin-top-left w-[130%] h-[130%]">
                    {p.visual}
                 </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-white truncate">{p.title}</h3>
                <p className="text-[10px] text-slate-400 line-clamp-2 leading-tight mt-1">{p.desc}</p>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-[9px] px-1.5 py-0.5 rounded border border-white/10 text-slate-300 bg-white/5 uppercase font-bold">
                        {p.tech[0]}
                    </span>
                </div>
              </div>
              <ArrowRight size={16} className="text-white/20"/>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Модальное окно (То же самое, что было, просто скопируй старое или оставь) */}
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