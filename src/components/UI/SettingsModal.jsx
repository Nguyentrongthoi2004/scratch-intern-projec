// src/components/UI/SettingsModal.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// 0. UTILS & DECORATIONS
// ==========================================

const CornerDecor = ({ className }) => (
  <div className={`absolute w-4 h-4 border-cyan-500/50 ${className}`}>
    <div className="absolute inset-0 border-t-2 border-l-2 border-inherit" />
  </div>
);

const CyberGridBg = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-[32px]">
    <div 
      className="absolute inset-0 opacity-[0.03]" 
      style={{ 
        backgroundImage: `linear-gradient(to right, #22d3ee 1px, transparent 1px), linear-gradient(to bottom, #22d3ee 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} 
    />
    <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] opacity-90" />
  </div>
);

// ==========================================
// 1. UI COMPONENTS
// ==========================================

const CyberToggle = ({ label, subLabel, active, onToggle, color = 'cyan' }) => {
  const themes = {
    cyan: { thumb: 'bg-cyan-100 shadow-[0_0_15px_#22d3ee]', activeTrack: 'bg-cyan-900/80 border-cyan-400' },
    emerald: { thumb: 'bg-emerald-100 shadow-[0_0_15px_#34d399]', activeTrack: 'bg-emerald-900/80 border-emerald-400' },
    fuchsia: { thumb: 'bg-fuchsia-100 shadow-[0_0_15px_#e879f9]', activeTrack: 'bg-fuchsia-900/80 border-fuchsia-400' },
  };
  const theme = themes[color] || themes.cyan;

  return (
    <div 
      onClick={onToggle}
      className={`group relative flex items-center justify-between p-4 mb-3 border rounded-xl transition-all duration-300 cursor-pointer overflow-hidden
        ${active ? `border-${color}-500/30 bg-[#0f172a] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]` : 'border-white/5 bg-[#0b1120]/80 hover:border-white/10 hover:bg-[#1e293b]/40'}`}
    >
      <div className="relative z-10 flex-1 pr-6">
        <h4 className={`text-xs font-black tracking-[0.1em] uppercase transition-colors duration-300 ${active ? 'text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300' : 'text-slate-400 group-hover:text-slate-200'}`}>
          {label}
        </h4>
        {subLabel && <p className={`text-[10px] font-medium mt-1 tracking-wide ${active ? `text-${color}-400` : 'text-slate-500'}`}>{subLabel}</p>}
      </div>
      <div className={`relative w-12 h-6 rounded-full border transition-all duration-500 shadow-inner ${active ? theme.activeTrack : 'bg-slate-950 border-slate-700'}`}>
        <motion.div
          layout transition={{ type: "spring", stiffness: 600, damping: 25 }}
          className={`absolute top-[2px] w-[18px] h-[18px] rounded-full z-10 ${active ? `${theme.thumb} left-[26px]` : 'left-[2px] bg-slate-400 shadow-[0_0_2px_black]'}`}
        />
      </div>
    </div>
  );
};

const CyberSlider = ({ value, min, max, step, onChange, label, valueLabel, color = 'cyan' }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  return (
    <div className="relative p-5 mb-4 border rounded-2xl bg-[#0b1120]/60 border-white/5 hover:border-white/10 transition-all group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-1 h-1 rounded-full bg-${color}-400 shadow-[0_0_8px_currentColor] animate-pulse`} />
          <span className="text-xs font-black tracking-[0.15em] text-slate-300 uppercase group-hover:text-white transition-colors">{label}</span>
        </div>
        <div className={`flex items-center justify-center min-w-[50px] px-2 py-1 rounded-md border bg-[#020617] border-${color}-500/20`}>
          <span className={`text-[10px] font-mono font-bold text-${color}-300`}>{valueLabel || value}</span>
        </div>
      </div>
      <div className="relative flex items-center h-8 cursor-pointer">
        <div className="absolute w-full h-1.5 bg-slate-900 rounded-sm overflow-hidden border border-slate-800">
          <div className={`h-full bg-gradient-to-r from-${color}-900 via-${color}-500 to-blue-400 opacity-80`} style={{ width: `${percentage}%` }} />
        </div>
        <input type="range" min={min} max={max} step={step} value={value} onChange={onChange} className="absolute z-30 w-full h-full opacity-0 cursor-pointer" />
        <div className="absolute h-5 w-3 bg-white border border-slate-300 rounded-[2px] z-20 pointer-events-none flex items-center justify-center" style={{ left: `calc(${percentage}% - 6px)` }}>
          <div className={`w-[1px] h-3 bg-${color}-500`} />
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. MAIN MODAL COMPONENT
// ==========================================

const SettingsModal = ({
  onClose,
  isBlur, toggleBlur,
  isSound, toggleSound,
  isLowEffects, toggleLowEffects,
  fxDensity, onChangeFxDensity,
  uiScale, setUiScale,
  onHome,
  onOpenGuide,
}) => {
  const [activeTab, setActiveTab] = useState('general');
  const tabs = [
    { id: 'general', label: 'HỆ THỐNG', icon: '⚡' },
    { id: 'visual', label: 'ĐỒ HỌA', icon: '👁️' },
    { id: 'audio', label: 'ÂM THANH', icon: '🔊' },
  ];

  const density = Math.max(0, Math.min(100, fxDensity ?? 60));
  const currentZoom = Math.round((uiScale || 1) * 100);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        
        {/* Backdrop: Blur & Dark Overlay */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-[1100px] max-w-[95vw] h-[650px] flex rounded-[32px] shadow-[0_0_60px_-15px_rgba(6,182,212,0.2)] border border-slate-700/50 bg-[#020617] overflow-hidden group"
        >
          <CyberGridBg />

          {/* LEFT SIDEBAR */}
          <div className="w-[260px] relative z-10 flex flex-col bg-[#050b1a]/60 backdrop-blur-sm border-r border-white/5">
            <div className="p-8 pb-6">
              <div className="flex items-center gap-3 mb-1">
                <div className="flex items-center justify-center w-8 h-8 rounded shadow-lg bg-gradient-to-br from-cyan-400 to-blue-600"><span className="text-lg font-black text-white">S</span></div>
                <h2 className="text-xl font-black text-white tracking-[0.2em] uppercase">CÀI ĐẶT</h2>
              </div>
              <p className="text-[9px] text-slate-500 font-bold tracking-widest uppercase pl-1">Version 2.5.0</p>
            </div>

            <div className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`relative w-full p-4 rounded-xl text-left transition-all duration-300 group/btn flex items-center gap-3 border ${activeTab === tab.id ? 'bg-gradient-to-r from-cyan-950/40 to-transparent border-cyan-500/30' : 'bg-transparent border-transparent hover:bg-white/5'}`}
                >
                  {activeTab === tab.id && <motion.div layoutId="activeTabIndicator" className="absolute left-0 w-1 h-8 bg-cyan-400 rounded-r-full shadow-[0_0_10px_cyan]" />}
                  <span className={`text-base ${activeTab === tab.id ? 'scale-110' : 'grayscale opacity-70'}`}>{tab.icon}</span>
                  <span className={`text-[11px] font-black tracking-widest uppercase ${activeTab === tab.id ? 'text-cyan-100' : 'text-slate-400'}`}>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Quick Actions Footer */}
            <div className="p-4 mt-auto border-t border-white/5 bg-[#030712]/40">
               <div className="grid grid-cols-2 gap-2">
                  <button onClick={onHome} className="flex flex-col items-center justify-center gap-1 p-3 transition-all border rounded-lg border-slate-800 bg-slate-900/50 hover:bg-slate-800 hover:border-slate-600 group/act">
                    <span className="text-lg transition-all opacity-60 group-hover/act:opacity-100 group-hover/act:scale-110">🏠</span>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider group-hover/act:text-slate-300">Home</span>
                  </button>
                  
                  <button onClick={onOpenGuide} className="flex flex-col items-center justify-center gap-1 p-3 transition-all border rounded-lg border-slate-800 bg-slate-900/50 hover:bg-slate-800 hover:border-slate-600 group/act">
                    <span className="text-lg transition-all opacity-60 group-hover/act:opacity-100 group-hover/act:scale-110">📖</span>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider group-hover/act:text-slate-300">Guide</span>
                  </button>
               </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="relative z-10 flex flex-col flex-1 bg-transparent">
            <div className="h-20 px-8 border-b border-white/5 flex items-center justify-between bg-[#0b1120]/30">
               <div>
                 <h3 className="text-2xl font-black tracking-wide text-transparent uppercase bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-slate-400">{tabs.find(t => t.id === activeTab)?.label}</h3>
                 {/* Sửa lỗi comment nodes: bọc nội dung bằng dấu ngoặc nhọn */}
                 <p className="text-[10px] text-cyan-500/60 font-mono tracking-widest mt-1 uppercase">{"/// System Configuration ///"}</p>
               </div>
               <button onClick={onClose} className="flex items-center justify-center w-10 h-10 transition-all border rounded-full border-slate-700 bg-slate-900/50 text-slate-400 hover:text-white hover:border-red-500/50 hover:bg-red-950/20">✕</button>
            </div>

            <div className="relative flex-1 p-8 overflow-y-auto custom-scrollbar">
               <div className="max-w-2xl pb-10 mx-auto space-y-8">
                 <AnimatePresence mode="wait">
                   {/* General Tab */}
                   {activeTab === 'general' && (
                     <motion.div key="general" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                       <div className="p-6 rounded-2xl bg-[#0f172a]/40 border border-cyan-500/10 shadow-xl relative overflow-hidden">
                         <div className="relative z-10">
                           <h4 className="inline-block pb-2 mb-6 text-sm font-bold tracking-widest uppercase border-b text-cyan-100 border-white/5">Hiển thị & Giao diện</h4>
                           <div className="flex items-end justify-between mb-2">
                              <label className="text-xs font-bold tracking-wide uppercase text-slate-300">Độ thu phóng (Zoom)</label>
                              <span className="font-mono text-xl font-black text-cyan-400">{currentZoom}%</span>
                           </div>
                           <div className="relative flex items-center h-12 gap-4 px-4 border bg-slate-950 rounded-xl border-slate-800">
                             <button onClick={() => setUiScale(Math.max(0.8, uiScale - 0.1))} className="text-lg font-bold text-slate-500 hover:text-white">-</button>
                             <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden relative">
                                 <motion.div className="absolute h-full bg-cyan-500 shadow-[0_0_10px_cyan]" animate={{ width: `${((currentZoom - 80) / 30) * 100}%` }} />
                             </div>
                             <button onClick={() => setUiScale(Math.min(1.1, uiScale + 0.1))} className="text-lg font-bold text-slate-500 hover:text-white">+</button>
                           </div>
                         </div>
                       </div>
                     </motion.div>
                   )}

                   {/* Visual Tab */}
                   {activeTab === 'visual' && (
                     <motion.div key="visual" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="space-y-6">
                        <div className="grid grid-cols-1 gap-4">
                           <CyberToggle label="Hiệu ứng làm mờ (Blur)" subLabel="Tắt để tăng hiệu năng cho máy yếu." active={isBlur} onToggle={toggleBlur} color="cyan" />
                           <CyberToggle label="Chế độ tối ưu (Low FX)" subLabel="Giảm chi tiết, tắt hạt (noise) và bóng đổ." active={isLowEffects} onToggle={toggleLowEffects} color="emerald" />
                        </div>
                        <div className={`p-6 border border-fuchsia-500/20 rounded-2xl bg-fuchsia-950/10 ${isLowEffects ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                           <h4 className="flex items-center gap-2 mb-4 text-xs font-black tracking-widest uppercase text-fuchsia-200">Tùy chỉnh nâng cao</h4>
                           <CyberSlider label="Mật độ hiệu ứng (FX Density)" value={density} min={0} max={100} step={10} onChange={(e) => onChangeFxDensity(parseInt(e.target.value))} valueLabel={`${density}%`} color="fuchsia" />
                        </div>
                     </motion.div>
                   )}

                   {/* Audio Tab */}
                   {activeTab === 'audio' && (
                     <motion.div key="audio" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                        <div className="mb-6"><CyberToggle label="Âm thanh tổng (Master)" subLabel={isSound ? "Hệ thống âm thanh đang hoạt động" : "Tắt toàn bộ âm thanh"} active={isSound} onToggle={toggleSound} color="cyan" /></div>
                        <div className={`space-y-6 ${!isSound ? 'opacity-40 pointer-events-none filter grayscale' : ''}`}>
                           <div className="relative pl-4 border-l border-cyan-500/30">
                              <CyberSlider label="Nhạc nền (BGM)" value={75} min={0} max={100} step={5} onChange={() => {}} valueLabel="75%" color="fuchsia" />
                              <CyberSlider label="Hiệu ứng (SFX)" value={90} min={0} max={100} step={5} onChange={() => {}} valueLabel="90%" color="emerald" />
                           </div>
                        </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-white/5 bg-[#0b1120] relative z-20 flex justify-end gap-4">
               <button onClick={onClose} className="px-6 py-3 rounded-xl border border-white/5 text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all">Hủy bỏ</button>
               <button onClick={onClose} className="relative group px-8 py-3 rounded-xl bg-cyan-600 overflow-hidden flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-105 active:scale-95">
                  <span className="relative z-10 text-white text-[10px] font-black tracking-[0.2em] uppercase flex items-center gap-2"><span>💾</span> Lưu thiết lập</span>
               </button>
            </div>
          </div>
          <CornerDecor className="top-0 left-0 rounded-tl-[30px]" />
          <CornerDecor className="top-0 right-0 rotate-90 rounded-tl-[30px]" />
          <CornerDecor className="bottom-0 right-0 rotate-180 rounded-tl-[30px]" />
          <CornerDecor className="bottom-0 left-0 -rotate-90 rounded-tl-[30px]" />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SettingsModal;