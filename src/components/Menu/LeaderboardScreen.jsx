// src/components/Menu/LeaderboardScreen.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { IconTrophy, IconMedal } from '../UI/Icons';

const CyberBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden bg-[#020617]">
    <div
      className="absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage: `linear-gradient(to right, #f59e0b 1px, transparent 1px), linear-gradient(to bottom, #f59e0b 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}
    />
    <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[120px]" />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
  </div>
);

const LeaderboardScreen = ({ onBack }) => {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    // Load progress from new key 'scratch_game_scores'
    const saved = JSON.parse(localStorage.getItem('scratch_game_scores') || 'null');
    setProgress(saved);
  }, []);

  const isGoldenWin = progress && progress.easy >= 10 && progress.normal >= 10 && progress.hard >= 10;

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden font-sans text-white select-none">
      <CyberBackground />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`relative z-10 w-full max-w-2xl flex flex-col bg-[#0f172a]/80 backdrop-blur-xl rounded-3xl border shadow-2xl overflow-hidden
          ${isGoldenWin ? 'border-yellow-400/50 shadow-[0_0_50px_rgba(250,204,21,0.3)]' : 'border-amber-500/20'}
        `}
      >
        {/* Header */}
        <div className="p-8 text-center border-b border-white/10 bg-black/20">
          <h1 className={`text-4xl font-black tracking-widest text-transparent uppercase bg-clip-text drop-shadow-sm ${isGoldenWin ? 'bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500' : 'bg-gradient-to-r from-amber-300 to-orange-500'}`}>
            Bảng Xếp Hạng
          </h1>
          <p className="mt-2 text-xs font-bold tracking-[0.2em] text-amber-500/60 uppercase">
            Your Journey
          </p>
        </div>

        {/* Score Display */}
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar flex items-center justify-center">
          {!progress ? (
            <div className="flex flex-col items-center justify-center text-slate-500">
              <IconTrophy className="w-16 h-16 mb-4 opacity-50" />
              <p>Chưa có dữ liệu. Hãy chơi game ngay!</p>
            </div>
          ) : (
            <div className="w-full space-y-6">
               <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/50 border border-emerald-500/30">
                  <span className="text-emerald-400 font-black tracking-widest text-lg">EASY</span>
                  <div className="flex items-center gap-4">
                     <div className="w-32 h-3 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div initial={{width: 0}} animate={{width: `${(progress.easy/10)*100}%`}} className="h-full bg-emerald-500" />
                     </div>
                     <span className="text-white font-mono font-bold text-xl">{progress.easy}/10</span>
                  </div>
               </div>

               <div className={`flex items-center justify-between p-4 rounded-2xl bg-slate-900/50 border border-yellow-500/30 ${progress.easy < 10 ? 'opacity-50 grayscale' : ''}`}>
                  <span className="text-yellow-400 font-black tracking-widest text-lg">NORMAL</span>
                  <div className="flex items-center gap-4">
                     <div className="w-32 h-3 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div initial={{width: 0}} animate={{width: `${(progress.normal/10)*100}%`}} className="h-full bg-yellow-500" />
                     </div>
                     <span className="text-white font-mono font-bold text-xl">{progress.normal}/10</span>
                  </div>
               </div>

               <div className={`flex items-center justify-between p-4 rounded-2xl bg-slate-900/50 border border-rose-500/30 ${progress.normal < 10 ? 'opacity-50 grayscale' : ''}`}>
                  <span className="text-rose-400 font-black tracking-widest text-lg">HARD</span>
                  <div className="flex items-center gap-4">
                     <div className="w-32 h-3 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div initial={{width: 0}} animate={{width: `${(progress.hard/10)*100}%`}} className="h-full bg-rose-500" />
                     </div>
                     <span className="text-white font-mono font-bold text-xl">{progress.hard}/10</span>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-black/20 flex justify-center">
          <button
            onClick={onBack}
            className="px-8 py-3 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-amber-500 transition-all font-bold tracking-widest uppercase text-xs text-slate-300 hover:text-white"
          >
            Quay lại
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LeaderboardScreen;
