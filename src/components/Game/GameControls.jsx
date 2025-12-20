import React from 'react';
import { IconHome, IconSettings, IconMoon, IconSun, IconEye, IconEyeOff } from '../UI/Icons';

const GameControls = ({ onBack, setShowSettings, toggleTheme, theme, setHideUI, hideUI }) => {
  const isDark = theme === 'dark';

  // Style chung cho nút
  const btnClass = `w-12 h-12 rounded-xl border-2 flex items-center justify-center shadow-[4px_4px_0_rgba(15,23,42,0.4)] transition-all active:scale-95 hover:-translate-y-0.5`;

  return (
    <div className="absolute z-50 flex gap-3 top-6 left-6">
      {/* HOME */}
      <button
        onClick={() => onBack && onBack()}
        className={`${btnClass} ${isDark ? 'bg-red-900/80 border-red-500 text-red-100 hover:bg-red-700/80' : 'bg-red-500 border-red-600 text-white hover:bg-red-600'}`}
        title="Về trang chủ"
      >
        <IconHome className="w-6 h-6" />
      </button>

      {/* SETTINGS */}
      <button
        onClick={() => setShowSettings(true)}
        className={`${btnClass} ${isDark ? 'bg-slate-900/80 border-slate-600 text-cyan-400 hover:border-cyan-400' : 'bg-white/90 border-slate-200 text-slate-700 hover:border-indigo-300'}`}
        title="Cài đặt"
      >
        <IconSettings className="w-6 h-6 animate-spin-slow" />
      </button>

      {/* THEME */}
      <button
        onClick={toggleTheme}
        className={`${btnClass} ${isDark ? 'bg-yellow-500/90 border-yellow-300 text-yellow-50' : 'bg-indigo-500 border-indigo-600 text-white'}`}
        title="Đổi giao diện"
      >
        {theme === 'light' ? <IconMoon className="w-6 h-6" /> : <IconSun className="w-6 h-6" />}
      </button>

      {/* HIDE UI */}
      <button
        onClick={() => setHideUI(prev => !prev)}
        className={`${btnClass} ${isDark ? 'bg-slate-800/90 border-slate-500 text-white' : 'bg-slate-100 border-slate-300 text-slate-700'}`}
        title="Ẩn giao diện"
      >
        {hideUI ? <IconEyeOff className="w-6 h-6" /> : <IconEye className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default GameControls;