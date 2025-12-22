// src/components/UI/SettingsModal.jsx
import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconSettings, IconEye, IconHome, IconBook, IconLightning } from './Icons';

// ==========================================
// 0. VISUAL ASSETS (DECORATIONS)
// ==========================================

// Trang trí góc (Tech Corners)
const CornerDecor = ({ className, color = "cyan" }) => (
  <div className={`absolute w-6 h-6 pointer-events-none ${className}`}>
    <div className={`absolute inset-0 border-t-2 border-l-2 border-${color}-400/60 rounded-tl-sm shadow-[0_0_10px_rgba(34,211,238,0.5)]`} />
  </div>
);

// Nền lưới động (Animated Grid)
const CyberGridBg = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    {/* Lưới Hexagon mờ */}
    <div 
      className="absolute inset-0 opacity-[0.03]" 
      style={{ 
        backgroundImage: `radial-gradient(circle at center, #22d3ee 1px, transparent 1px)`,
        backgroundSize: '24px 24px'
      }} 
    />
    {/* Hiệu ứng Gradient tối dần */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/95 via-[#0b1120]/98 to-[#020617]/95" />
    {/* Scanline chạy dọc (Optional) */}
    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />
  </div>
);

// ==========================================
// 1. UI COMPONENTS (KEEP LOGIC, UPGRADE UI)
// ==========================================

const CyberToggle = ({ label, subLabel, active, onToggle, color = 'cyan' }) => {
  const themes = {
    cyan: { thumb: 'bg-cyan-400 shadow-[0_0_15px_#22d3ee]', track: 'bg-cyan-950/50 border-cyan-500/50' },
    emerald: { thumb: 'bg-emerald-400 shadow-[0_0_15px_#34d399]', track: 'bg-emerald-950/50 border-emerald-500/50' },
    fuchsia: { thumb: 'bg-fuchsia-400 shadow-[0_0_15px_#e879f9]', track: 'bg-fuchsia-950/50 border-fuchsia-500/50' },
  };
  const theme = themes[color] || themes.cyan;

  return (
    <div 
      onClick={onToggle}
      className={`group relative flex items-center justify-between p-4 mb-3 border rounded-xl transition-all duration-300 cursor-pointer overflow-hidden select-none
        ${active ? `${theme.track} shadow-[inset_0_0_20px_rgba(0,0,0,0.3)]` : 'border-white/5 bg-slate-900/40 hover:bg-slate-800/60 hover:border-white/10'}`}
    >
      <div className="relative z-10 flex-1 pr-6">
        <h4 className={`text-xs font-black tracking-[0.1em] uppercase transition-colors duration-300 ${active ? 'text-white text-shadow-sm' : 'text-slate-400 group-hover:text-slate-200'}`}>
          {label}
        </h4>
        {subLabel && <p className={`text-[10px] font-medium mt-1 tracking-wide ${active ? `text-${color}-200/80` : 'text-slate-600'}`}>{subLabel}</p>}
      </div>
      
      {/* Switch Track */}
      <div className={`relative w-12 h-6 rounded-full border transition-all duration-300 ${active ? 'border-transparent bg-black/40' : 'bg-slate-950 border-slate-700'}`}>
        <motion.div
          layout transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`absolute top-[2px] w-[18px] h-[18px] rounded-full z-10 ${active ? `${theme.thumb} left-[26px]` : 'left-[2px] bg-slate-500'}`}
        />
      </div>
    </div>
  );
};

const CyberSlider = ({ value, min, max, step, onChange, label, valueLabel, color = 'cyan' }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  return (
    <div className="relative p-5 mb-4 transition-all border select-none rounded-2xl bg-slate-900/40 border-white/5 hover:border-white/10 group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full bg-${color}-400 shadow-[0_0_8px_currentColor] animate-pulse`} />
          <span className="text-xs font-bold tracking-[0.15em] text-slate-300 uppercase group-hover:text-white transition-colors">{label}</span>
        </div>
        <div className={`flex items-center justify-center min-w-[50px] px-2 py-1 rounded bg-black/40 border border-${color}-500/20`}>
          <span className={`text-[10px] font-mono font-bold text-${color}-300`}>{valueLabel || value}</span>
        </div>
      </div>
      <div className="relative flex items-center h-6 cursor-pointer group/slider">
        {/* Track Background */}
        <div className="absolute w-full h-1 overflow-hidden rounded-full bg-slate-800">
             {/* Fill Track */}
            <div className={`h-full bg-gradient-to-r from-${color}-900 via-${color}-500 to-white/80 opacity-90 shadow-[0_0_10px_currentColor]`} style={{ width: `${percentage}%` }} />
        </div>
        
        <input type="range" min={min} max={max} step={step} value={value} onChange={onChange} className="absolute z-30 w-full h-full opacity-0 cursor-pointer" />
        
        {/* Thumb Handle */}
        <div 
            className="absolute h-4 w-4 bg-[#0b1120] border-2 rounded-full z-20 pointer-events-none flex items-center justify-center shadow-lg transition-transform group-hover/slider:scale-110" 
            style={{ left: `calc(${percentage}% - 8px)`, borderColor: `var(--color-${color}-400)` }}
        >
          <div className={`w-1.5 h-1.5 rounded-full bg-${color}-400`} />
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. MAIN MODAL (THE OVERHAUL)
// ==========================================

const SettingsModal = ({
  onClose,
  isBlur, toggleBlur,
  isSound, toggleSound,
  isLowEffects, toggleLowEffects,
  fxDensity, onChangeFxDensity,
  onHome,
  onOpenGuide,
  bgmVolume = 50, setBgmVolume = () => {}, 
  sfxVolume = 50, setSfxVolume = () => {},
  onSaveGame // New Prop
}) => {
  const [activeTab, setActiveTab] = useState('general');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const tabs = [
    { id: 'general', label: 'SYSTEM', icon: <IconLightning className="w-4 h-4" /> },
    { id: 'visual', label: 'GRAPHICS', icon: <IconEye className="w-4 h-4" /> },
    { id: 'audio', label: 'AUDIO', icon: '🔊' },
  ];

  const density = Math.max(0, Math.min(100, fxDensity ?? 60));

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 font-sans text-slate-200">
        
        {/* --- 1. CINEMATIC BACKDROP --- */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-0 bg-slate-950/80 backdrop-blur-xl"
          onClick={onClose}
        >
             {/* Hiệu ứng Vignette (tối góc) */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
             {/* Lưới Backdrop mờ */}
             <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </motion.div>

        {/* --- 2. MODAL CONTENT (HUD STYLE) --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
          className="relative z-10 w-[1000px] max-w-[95vw] h-[600px] flex rounded-[24px] overflow-hidden shadow-[0_0_50px_-10px_rgba(6,182,212,0.3)] ring-1 ring-white/10 bg-[#0b1120]"
        >
          <CyberGridBg />

          {/* --- LEFT SIDEBAR (Glass Panel) --- */}
          <div className="w-[240px] relative z-20 flex flex-col bg-slate-950/50 backdrop-blur-sm border-r border-white/5">
            {/* Logo Area */}
            <div className="p-6 pb-4 border-b border-white/5 bg-gradient-to-b from-cyan-950/20 to-transparent">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                  <IconSettings className="w-5 h-5 animate-spin-slow" />
                </div>
                <div>
                    <h2 className="text-sm font-black text-white tracking-[0.2em] uppercase">SETTINGS</h2>
                    <p className="text-[9px] text-cyan-400 font-mono">v2.5.0 STABLE</p>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`relative w-full p-3 rounded-lg text-left transition-all duration-200 group flex items-center gap-3 border 
                    ${activeTab === tab.id 
                        ? 'bg-cyan-950/40 border-cyan-500/30 text-white shadow-[inset_0_0_10px_rgba(34,211,238,0.1)]' 
                        : 'bg-transparent border-transparent text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}
                >
                  {activeTab === tab.id && <div className="absolute left-0 top-2 bottom-2 w-1 bg-cyan-400 rounded-r-full shadow-[0_0_10px_cyan]" />}
                  <span className={`text-lg transition-transform ${activeTab === tab.id ? 'scale-110 text-cyan-300' : 'grayscale opacity-70'}`}>{tab.icon}</span>
                  <span className="text-[10px] font-black tracking-widest uppercase">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Quick Actions Footer */}
            <div className="p-4 border-t border-white/5 bg-black/20">
               <div className="grid grid-cols-2 gap-2">
                  <button onClick={onHome} className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg bg-slate-900/50 hover:bg-cyan-950/30 border border-slate-800 hover:border-cyan-500/30 transition-all group">
                    <IconHome className="w-4 h-4 transition-colors text-slate-500 group-hover:text-cyan-300" />
                    <span className="text-[8px] font-bold text-slate-500 group-hover:text-cyan-200 uppercase tracking-wider">Home</span>
                  </button>
                  <button onClick={onOpenGuide} className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg bg-slate-900/50 hover:bg-purple-950/30 border border-slate-800 hover:border-purple-500/30 transition-all group">
                    <IconBook className="w-4 h-4 transition-colors text-slate-500 group-hover:text-purple-300" />
                    <span className="text-[8px] font-bold text-slate-500 group-hover:text-purple-200 uppercase tracking-wider">Guide</span>
                  </button>
               </div>
            </div>
          </div>

          {/* --- RIGHT CONTENT (Main Panel) --- */}
          <div className="relative z-20 flex flex-col flex-1">
            {/* Header Bar */}
            <div className="h-16 px-8 flex items-center justify-between border-b border-white/5 bg-white/[0.02]">
               <h3 className="text-xl font-black tracking-widest text-transparent uppercase bg-clip-text bg-gradient-to-r from-white to-slate-500">
                   {tabs.find(t => t.id === activeTab)?.label}
               </h3>
               {/* Close Button - Styled */}
               <button onClick={onClose} className="relative flex items-center justify-center w-8 h-8 transition-all border rounded-lg group bg-slate-800/50 hover:bg-red-500/20 border-white/10 hover:border-red-500/50">
                    <span className="text-xs font-bold text-slate-400 group-hover:text-red-400">✕</span>
               </button>
            </div>

            {/* Content Area */}
            <div className="relative flex-1 p-8 overflow-y-auto custom-scrollbar">
               <div className="max-w-xl mx-auto space-y-8">
                 <AnimatePresence mode="wait">
                   
                   {/* TAB: GENERAL */}
                   {activeTab === 'general' && (
                     <motion.div key="general" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
                       <div className="relative p-6 overflow-hidden border rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-900/10 border-cyan-500/20 group">
                         <div className="absolute top-0 right-0 w-32 h-32 transition-all rounded-full bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/20" />
                         <div className="relative z-10">
                           <h4 className="pb-2 mb-4 text-xs font-bold tracking-widest uppercase border-b text-cyan-300 border-cyan-500/30">Hệ Thống</h4>
                           <p className="text-sm leading-relaxed text-slate-300">
                             Chào mừng bạn đến với <span className="font-bold text-cyan-200">Scratch Logic Master</span>.
                             <br/>
                             Phiên bản ổn định với hiệu năng được tối ưu hóa.
                           </p>
                           <div className="p-3 mt-4 border rounded bg-black/30 border-white/5">
                                <p className="text-[10px] text-yellow-500/80 font-mono">⚠ Note: Zoom feature disabled for UI consistency.</p>
                           </div>

                           {/* MANUAL SAVE BUTTON */}
                           {onSaveGame && (
                             <div className="mt-6">
                                <button
                                  onClick={onSaveGame}
                                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 text-white font-bold uppercase tracking-[0.15em] shadow-lg shadow-emerald-900/40 border border-emerald-500/30 flex items-center justify-center gap-2 transition-all active:scale-95"
                                >
                                    <span>💾</span> SAVE GAME PROGRESS
                                </button>
                                <p className="mt-2 text-[9px] text-center text-slate-500">
                                    Dữ liệu game sẽ được lưu vào trình duyệt.
                                </p>
                             </div>
                           )}

                         </div>
                       </div>
                     </motion.div>
                   )}

                   {/* TAB: VISUAL */}
                   {activeTab === 'visual' && (
                     <motion.div key="visual" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }} className="space-y-6">
                        <div>
                           <CyberToggle label="Blur Effects" subLabel="Làm mờ hậu cảnh (Khuyên dùng)" active={isBlur} onToggle={toggleBlur} color="cyan" />
                           <CyberToggle label="Performance Mode" subLabel="Tắt hiệu ứng nặng cho máy yếu" active={isLowEffects} onToggle={toggleLowEffects} color="emerald" />
                        </div>
                        <div className={`p-5 rounded-xl bg-fuchsia-950/10 border border-fuchsia-500/10 ${isLowEffects ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                           <h4 className="mb-4 text-[10px] font-black tracking-widest uppercase text-fuchsia-300/70">Advanced Graphics</h4>
                           <CyberSlider label="Particle Density" value={density} min={0} max={100} step={10} onChange={(e) => onChangeFxDensity(parseInt(e.target.value))} valueLabel={`${density}%`} color="fuchsia" />
                        </div>
                     </motion.div>
                   )}

                   {/* TAB: AUDIO */}
                   {activeTab === 'audio' && (
                     <motion.div key="audio" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
                        <div className="mb-8"><CyberToggle label="Master Audio" subLabel="Bật/Tắt toàn bộ âm thanh" active={isSound} onToggle={toggleSound} color="cyan" /></div>
                        <div className={`space-y-6 pl-2 ${!isSound ? 'opacity-30 pointer-events-none' : ''}`}>
                             <CyberSlider label="Background Music" value={bgmVolume} min={0} max={100} step={5} onChange={(e) => setBgmVolume(parseInt(e.target.value))} valueLabel={`${bgmVolume}%`} color="fuchsia" />
                             <CyberSlider label="Sound Effects (SFX)" value={sfxVolume} min={0} max={100} step={5} onChange={(e) => setSfxVolume(parseInt(e.target.value))} valueLabel={`${sfxVolume}%`} color="emerald" />
                        </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
            </div>

            {/* Footer Buttons */}
            <div className="h-20 px-8 flex items-center justify-end gap-4 border-t border-white/5 bg-[#080d1a]">
               <button onClick={onClose} className="px-6 py-2.5 rounded-lg border border-white/10 text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all">
                  Cancel
               </button>
               <button onClick={onClose} className="px-8 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] font-black tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0">
                  Save Changes
               </button>
            </div>
          </div>

          {/* Decorative Corners */}
          <CornerDecor className="top-0 left-0" color="cyan" />
          <CornerDecor className="top-0 right-0 rotate-90" color="cyan" />
          <CornerDecor className="bottom-0 right-0 rotate-180" color="cyan" />
          <CornerDecor className="bottom-0 left-0 -rotate-90" color="cyan" />
        </motion.div>
    </div>,
    document.body
  );
};

export default SettingsModal;