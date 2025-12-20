// src/components/Menu/CharacterSelection.jsx
import React from 'react';
import { motion } from 'framer-motion';

// --- Background Component (Tái sử dụng cho đồng bộ) ---
const CyberBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden bg-[#020617]">
    {/* Lưới Grid */}
    <div 
      className="absolute inset-0 opacity-[0.05]" 
      style={{ 
        backgroundImage: `linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} 
    />
    {/* Ánh sáng nền (Glow Spots) */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/10 rounded-full blur-[120px]" />
    <div className="absolute inset-0 bg-[url('assets/images/ui/noise.svg')] opacity-5 pointer-events-none" />
  </div>
);

const CharacterSelection = ({ onSelectCharacter, onBack }) => {
  
  const characters = [
    { 
      id: 'pink', 
      name: 'Pinky', 
      role: 'Agile Runner', 
      img: 'assets/images/characters/pink/Pink_Monster.png',
      color: 'text-pink-400',
      border: 'hover:border-pink-500',
      bgHover: 'group-hover:bg-pink-500/10',
      shadow: 'hover:shadow-pink-500/40'
    },
    { 
      id: 'owlet', 
      name: 'Owlet', 
      role: 'Wise Guide',
      img: 'assets/images/characters/owlet/Owlet_Monster.png',
      color: 'text-slate-200',
      border: 'hover:border-slate-400',
      bgHover: 'group-hover:bg-slate-500/10',
      shadow: 'hover:shadow-slate-500/40'
    },
    { 
      id: 'dude', 
      name: 'Dude', 
      role: 'Heavy Hitter',
      img: 'assets/images/characters/dude/Dude_Monster.png',
      color: 'text-yellow-400',
      border: 'hover:border-yellow-500',
      bgHover: 'group-hover:bg-yellow-500/10',
      shadow: 'hover:shadow-yellow-500/40'
    }
  ];

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden font-sans text-white select-none">
      
      {/* 1. NỀN */}
      <CyberBackground />
      
      {/* --- HEADER --- */}
      <div className="relative z-10 flex flex-col items-center mb-16">
        <h1 className="text-5xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">
          Select Your Hero
        </h1>
        <div className="w-24 h-1 mt-4 rounded-full bg-cyan-500/50 shadow-[0_0_10px_cyan]" />
      </div>

      {/* --- DANH SÁCH NHÂN VẬT --- */}
      <div className="relative z-10 flex flex-wrap justify-center w-full gap-8 px-4">
        {characters.map((char) => (
          <button
            key={char.id}
            onClick={() => onSelectCharacter(char.id)}
            // Card Container
            className={`
              group relative w-64 h-80 rounded-2xl overflow-hidden
              bg-[#0f172a]/60 backdrop-blur-sm border border-white/10
              flex flex-col items-center justify-end pb-8
              transition-all duration-300 ease-out
              hover:-translate-y-3 hover:shadow-2xl ${char.border} ${char.shadow}
            `}
          >
            {/* Background Glow khi Hover */}
            <div className={`absolute inset-0 transition-opacity duration-300 opacity-0 ${char.bgHover} group-hover:opacity-100`} />
            
            {/* Vòng tròn sáng sau lưng (Luôn hiện mờ, hover sáng lên) */}
            <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity bg-white`} />

            {/* ẢNH NHÂN VẬT */}
            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 -top-8 group-hover:scale-110">
                <img 
                    src={char.img} 
                    alt={char.name} 
                    className="w-40 h-40 object-contain pixelated filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
                    onError={(e) => { e.target.style.opacity = 0.5; }} // Fallback nhẹ nhàng
                />
            </div>
            
            {/* THÔNG TIN */}
            <div className="relative z-10 text-center">
                <h3 className={`text-3xl font-black tracking-widest uppercase transition-colors duration-300 ${char.color} drop-shadow-md`}>
                    {char.name}
                </h3>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-500 mt-1 transition-colors group-hover:text-slate-300">
                    [{char.role}]
                </p>
            </div>

            {/* Decor Lines (Gạch chéo ở góc) */}
            <div className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/10 transition-colors duration-300 group-hover:border-white/40`} />
            <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/10 transition-colors duration-300 group-hover:border-white/40`} />
          </button>
        ))}
      </div>

      {/* --- NÚT QUAY LẠI --- */}
      <button 
        onClick={onBack}
        className="
          mt-16 group relative z-10 px-8 py-3 
          bg-[#0f172a]/80 border border-slate-700 rounded-full backdrop-blur-md
          hover:bg-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]
          transition-all duration-300
          flex items-center gap-3
        "
      >
        <span className="flex items-center justify-center w-8 h-8 transition-colors border rounded-full bg-slate-800 border-slate-600 group-hover:border-cyan-400 group-hover:bg-cyan-950">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-400 group-hover:text-cyan-300 transition-colors group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
        </span>
        <span className="text-xs font-bold tracking-widest uppercase transition-colors text-slate-400 group-hover:text-cyan-300">
            Back to Menu
        </span>
      </button>

    </div>
  );
};

export default CharacterSelection;