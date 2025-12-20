// src/components/Tutorial/TutorialScreen.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion'; 
import { tutorialData } from '../../data/tutorialData';
import { IconHome, IconLightning, IconRun, IconLook, IconSound, IconControl, IconStop } from '../UI/Icons';

// Nền lưới (giữ nguyên cho khung ngoài)
const CyberGridBg = React.memo(() => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#020617]">
    <div 
      className="absolute inset-0 opacity-[0.03]" 
      style={{ 
        backgroundImage: `linear-gradient(to right, #22d3ee 1px, transparent 1px), linear-gradient(to bottom, #22d3ee 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} 
    />
    <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#020617]/80" />
  </div>
));

const TutorialScreen = ({ onBack, isOverlay = false }) => {
  const [activeTab, setActiveTab] = useState(tutorialData[0]?.id || 'motion');
  const currentCategory = tutorialData.find(cat => cat.id === activeTab);

  // Nếu là overlay thì chỉnh lại style cho phù hợp (full width/height của container cha)
  const containerClass = isOverlay
    ? "relative flex w-full h-full rounded-2xl overflow-hidden bg-[#020617] text-slate-200 border border-slate-700 shadow-2xl"
    : "relative flex h-screen p-4 md:p-6 pt-16 font-sans bg-[#020617] overflow-hidden select-none text-slate-200";

  const innerClass = isOverlay
    ? "relative z-10 flex w-full h-full mx-auto bg-[#0b1120] border-slate-800"
    : "relative z-10 flex w-full max-w-7xl mx-auto overflow-hidden bg-[#0b1120] border border-slate-800 shadow-2xl h-[90vh] rounded-2xl";

  return (
    <div className={isOverlay ? "w-full h-full font-sans select-none" : "relative w-full h-full"}>
       {!isOverlay && (
         <div className="absolute inset-0 w-full h-full bg-[#020617]">
            <CyberGridBg />
         </div>
       )}

       <div className={isOverlay ? "relative w-full h-full flex items-center justify-center" : "relative flex h-screen p-4 md:p-6 pt-16 font-sans overflow-hidden select-none text-slate-200"}>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`flex w-full overflow-hidden bg-[#0b1120] border-slate-800 ${isOverlay ? 'h-full rounded-2xl border' : 'max-w-7xl mx-auto border shadow-2xl h-[90vh] rounded-2xl z-10'}`}
          >
            
            {/* Nút Đóng (X) */}
            <button
                onClick={onBack}
                className="absolute z-50 p-2 transition-colors rounded-lg top-4 right-4 text-slate-400 hover:bg-red-100 hover:text-red-600 active:scale-95"
                title="Đóng"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* === SIDEBAR (CỘT TRÁI - Giữ nguyên tối) === */}
            <div className="flex flex-col w-1/4 min-w-[240px] border-r border-slate-800 bg-[#050b1a]">
                <div className="p-6 border-b border-slate-800">
                    <h1 className="flex items-center gap-3 text-xl font-bold tracking-wider uppercase text-cyan-400">
                        <IconLightning className="w-6 h-6 text-yellow-500" /> DATABASE
                    </h1>
                </div>

                <div className="flex-1 p-3 space-y-1 overflow-y-auto custom-scrollbar">
                    {tutorialData.map((cat) => {
                        const isActive = activeTab === cat.id;
                        // Map string icon to Component
                        let IconComp = IconRun;
                        if (cat.id === 'trigger') IconComp = IconLightning;
                        if (cat.id === 'looks') IconComp = IconLook;
                        if (cat.id === 'sound') IconComp = IconSound;
                        if (cat.id === 'control') IconComp = IconControl;
                        if (cat.id === 'end') IconComp = IconStop;

                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={`
                                    w-full p-3 rounded-lg flex items-center gap-3 transition-all duration-200 border border-transparent
                                    ${isActive
                                        ? 'bg-cyan-950/30 border-cyan-500/30 text-cyan-300 shadow-[inset_2px_0_0_0_#22d3ee]'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}
                                `}
                            >
                                <span className={`text-xl ${isActive ? 'scale-110' : ''}`}>
                                    <IconComp className="w-5 h-5" />
                                </span>
                                <span className="text-xs font-bold tracking-wide uppercase">{cat.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Chỉ hiện nút "Quay về Menu" nếu KHÔNG phải là Overlay (để tránh nhầm lẫn) */}
                {!isOverlay && (
                    <div className="p-4 border-t border-slate-800">
                        <button
                            onClick={onBack}
                            className="flex items-center justify-center w-full gap-2 p-3 text-xs font-bold transition-all border rounded-lg text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-white active:scale-95"
                        >
                            <IconHome className="w-4 h-4" /> QUAY VỀ MENU
                        </button>
                    </div>
                )}
            </div>

            {/* === CONTENT (CỘT PHẢI - CHUYỂN SANG MÀU SÁNG) === */}
            <div className="flex flex-col flex-1 h-full bg-slate-50 text-slate-800">

                {/* Header Content - Nền trắng */}
                <div className="flex items-center gap-4 p-8 pr-16 bg-white border-b border-slate-200">
                     <div className={`p-4 rounded-xl bg-slate-100 border border-slate-200 shadow-sm text-slate-700`}>
                        <span className="text-3xl">
                            {(() => {
                                let IconComp = IconRun;
                                if (currentCategory.id === 'trigger') IconComp = IconLightning;
                                if (currentCategory.id === 'looks') IconComp = IconLook;
                                if (currentCategory.id === 'sound') IconComp = IconSound;
                                if (currentCategory.id === 'control') IconComp = IconControl;
                                if (currentCategory.id === 'end') IconComp = IconStop;
                                return <IconComp className="w-8 h-8" />;
                            })()}
                        </span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-wide uppercase text-slate-800">
                            {currentCategory.label}
                        </h2>
                        <p className="mt-1 font-mono text-xs uppercase text-slate-500">
                        </p>
                    </div>
                </div>

                {/* Danh sách Block */}
                <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-slate-50">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-1 gap-4 pb-10"
                    >
                        {currentCategory.blocks.map((block, idx) => (
                            <div
                                key={`${currentCategory.id}-${idx}`}
                                className="flex items-start gap-5 p-4 transition-all duration-200 bg-white border group rounded-xl border-slate-200 hover:border-cyan-400 hover:shadow-md"
                            >
                                <div className="flex items-center justify-center w-20 h-16 p-2 transition-colors border rounded-lg bg-slate-100 border-slate-200 shrink-0 group-hover:border-cyan-200">
                                    <img
                                        src={`/assets/images/ui/${block.img}`}
                                        alt={block.text}
                                        className="object-contain w-full h-full pixelated"
                                        loading="lazy"
                                    />
                                </div>

                                <div className="flex-1 pt-1">
                                    <h3 className="mb-1 text-base font-bold transition-colors text-slate-800 group-hover:text-cyan-700">
                                        {block.text}
                                    </h3>
                                    <p className="text-sm font-medium leading-relaxed text-slate-600">
                                        {block.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

          </motion.div>
       </div>
    </div>
  );
};

export default TutorialScreen;