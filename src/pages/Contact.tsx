import { motion } from 'framer-motion';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';

export default function Contact() {
  return (
    <div className="flex flex-col h-full p-6 pt-10 justify-center pb-20 relative overflow-hidden">
      {/* Фоновый круг */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] pointer-events-none"/>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 bg-[#111]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center shadow-2xl"
      >
        <div className="w-16 h-16 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg shadow-green-900/30">
          <CheckCircle size={32} className="text-white"/>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">WorkWork Studio</h2>
        <p className="text-slate-400 text-sm mb-6">Гарантируем результат или вернем деньги (которых мы не берем вперед 😉)</p>

        <div className="space-y-3">
          <button className="w-full py-3.5 bg-white text-black rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-200 transition active:scale-95">
            <Mail size={18}/>
            Написать в Telegram
          </button>
          
          <button className="w-full py-3.5 bg-[#222] text-white border border-white/10 rounded-xl font-medium text-sm hover:bg-[#2a2a2a] transition active:scale-95">
            Посмотреть GitHub
          </button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 text-center"
      >
        <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Наши принципы</p>
        <div className="flex justify-center gap-4 text-xs text-slate-300 font-mono">
          <span>0% PREPAY</span>
          <span>•</span>
          <span>100% QUALITY</span>
        </div>
      </motion.div>
    </div>
  );
}