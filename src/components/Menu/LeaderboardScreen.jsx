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
  const [scores, setScores] = useState([]);

  useEffect(() => {
    // Load scores from localStorage
    const savedScores = JSON.parse(localStorage.getItem('scratch_game_leaderboard') || '[]');
    // Sort by score desc
    const sorted = savedScores.sort((a, b) => b.score - a.score);
    setScores(sorted);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden font-sans text-white select-none">
      <CyberBackground />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 w-full max-w-3xl h-[80vh] flex flex-col bg-[#0f172a]/80 backdrop-blur-xl rounded-3xl border border-amber-500/20 shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-8 text-center border-b border-white/10 bg-black/20">
          <h1 className="text-4xl font-black tracking-widest text-transparent uppercase bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500 drop-shadow-sm">
            Bảng Xếp Hạng
          </h1>
          <p className="mt-2 text-xs font-bold tracking-[0.2em] text-amber-500/60 uppercase">
            Hall of Fame
          </p>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-8 py-4 text-xs font-bold tracking-widest text-slate-400 uppercase bg-black/30">
          <div className="col-span-2 text-center">Rank</div>
          <div className="col-span-4">Player</div>
          <div className="col-span-3 text-center">Difficulty</div>
          <div className="col-span-3 text-right">Score</div>
        </div>

        {/* List */}
        <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
          {scores.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
              <IconTrophy className="w-16 h-16 mb-4 opacity-50" />
              <p>Chưa có dữ liệu xếp hạng</p>
            </div>
          ) : (
            <div className="space-y-2">
              {scores.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`
                    grid grid-cols-12 gap-4 items-center px-4 py-3 rounded-lg border border-white/5
                    ${index === 0 ? 'bg-amber-500/20 border-amber-500/50' : ''}
                    ${index === 1 ? 'bg-slate-300/10 border-slate-300/30' : ''}
                    ${index === 2 ? 'bg-orange-700/10 border-orange-700/30' : ''}
                    ${index > 2 ? 'bg-slate-800/50 hover:bg-slate-700/50' : ''}
                  `}
                >
                  <div className="col-span-2 flex justify-center font-black text-xl text-slate-300">
                    {index < 3 ? <IconMedal className={`w-8 h-8 ${index === 0 ? 'text-amber-400' : index === 1 ? 'text-slate-300' : 'text-orange-400'}`} rank={index + 1} /> : `#${index + 1}`}
                  </div>
                  <div className="col-span-4 font-bold text-slate-200 truncate">
                    {item.name || 'Anonymous'}
                  </div>
                  <div className="col-span-3 text-center">
                    <span className={`
                      text-[10px] px-2 py-1 rounded border uppercase font-bold
                      ${item.difficulty === 'easy' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' : ''}
                      ${item.difficulty === 'normal' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10' : ''}
                      ${item.difficulty === 'hard' ? 'border-rose-500/30 text-rose-400 bg-rose-500/10' : ''}
                    `}>
                      {item.difficulty}
                    </span>
                  </div>
                  <div className="col-span-3 text-right font-mono font-bold text-amber-300 text-lg">
                    {item.score}
                  </div>
                </motion.div>
              ))}
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
