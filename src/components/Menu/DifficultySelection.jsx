// src/components/Menu/DifficultySelection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { IconPlant, IconLightning, IconFlame } from '../UI/Icons';

// --- Background Component (Tái sử dụng cho đồng bộ) ---
const CyberBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden bg-[#020617]">
    {/* Grid Neon */}
    <div 
      className="absolute inset-0 opacity-[0.05]" 
      style={{ 
        backgroundImage: `linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} 
    />
    {/* Glow effect */}
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px]" />
    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[120px]" />
    <div className="absolute inset-0 bg-[url('assets/images/ui/noise.svg')] opacity-5 pointer-events-none" />
  </div>
);

const DifficultySelection = ({ onSelectDifficulty, onBack }) => {
  
  const levels = [
    {
      id: 'easy',
      label: 'EASY',
      sub: 'Khởi động nhẹ nhàng',
      icon: <IconPlant className="w-12 h-12" />,
      color: 'text-emerald-400',
      border: 'hover:border-emerald-500',
      gradient: 'bg-emerald-500/10',
      shadow: 'hover:shadow-emerald-500/40'
    },
    {
      id: 'normal',
      label: 'NORMAL',
      sub: 'Thử thách tư duy',
      icon: <IconLightning className="w-12 h-12" />,
      color: 'text-yellow-400',
      border: 'hover:border-yellow-500',
      gradient: 'bg-yellow-500/10',
      shadow: 'hover:shadow-yellow-500/40'
    },
    {
      id: 'hard',
      label: 'HARD',
      sub: 'Dành cho cao thủ',
      icon: <IconFlame className="w-12 h-12" />,
      color: 'text-rose-400',
      border: 'hover:border-rose-500',
      gradient: 'bg-rose-500/10',
      shadow: 'hover:shadow-rose-500/40'
    }
  ];

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden font-sans text-white select-none">
      
      <CyberBackground />

      {/* HEADER */}
      <div className="relative z-10 mb-16 text-center">
        <h2 className="text-xl font-mono font-bold tracking-[0.5em] text-cyan-500 uppercase mb-2">
          System Level
        </h2>
        <h1 className="text-5xl font-black tracking-tighter text-white uppercase drop-shadow-lg">
          Chọn Độ Khó
        </h1>
        <div className="w-24 h-1 mx-auto mt-4 rounded-full bg-cyan-500/50 shadow-[0_0_10px_cyan]" />
      </div>

      {/* CARDS */}
      <div className="relative z-10 flex flex-wrap justify-center gap-6 px-4">
        {levels.map((lvl) => (
          <button
            key={lvl.id}
            onClick={() => onSelectDifficulty(lvl.id)}
            className={`
              group relative w-64 h-80 rounded-2xl overflow-hidden
              bg-[#0f172a]/60 backdrop-blur-md border border-white/10
              transition-all duration-300 flex flex-col items-center justify-center
              hover:-translate-y-2 hover:bg-[#1e293b]/80 hover:shadow-2xl ${lvl.border} ${lvl.shadow}
            `}
          >
            {/* Background Gradient khi hover */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${lvl.gradient}`} />
            
            {/* Icon */}
            <div className={`
              w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-6 relative z-10
              bg-slate-900/50 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-300
            `}>
              {lvl.icon}
            </div>

            {/* Text */}
            <h3 className={`text-3xl font-black tracking-widest uppercase transition-colors duration-300 relative z-10 ${lvl.color}`}>
              {lvl.label}
            </h3>
            
            <p className="relative z-10 mt-2 font-mono text-xs tracking-wider uppercase text-slate-400 group-hover:text-slate-200">
              [{lvl.sub}]
            </p>

            {/* Decor Lines */}
            <div className={`absolute bottom-0 w-full h-1 ${lvl.gradient} opacity-50`} />
          </button>
        ))}
      </div>

      {/* BACK BUTTON */}
      <button 
        onClick={onBack}
        className="
          mt-16 relative z-10 group px-8 py-3 
          bg-[#0f172a]/80 border border-slate-700 rounded-full backdrop-blur-md
          hover:bg-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]
          transition-all duration-300 flex items-center gap-3
        "
      >
        <span className="flex items-center justify-center w-8 h-8 transition-colors border rounded-full bg-slate-800 border-slate-600 group-hover:border-cyan-400 group-hover:bg-cyan-950">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-400 group-hover:text-cyan-300 transition-colors group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
        </span>
        <span className="text-xs font-bold tracking-widest uppercase transition-colors text-slate-400 group-hover:text-cyan-300">
            Chọn lại nhân vật
        </span>
      </button>

    </div>
  );
};

export default DifficultySelection;