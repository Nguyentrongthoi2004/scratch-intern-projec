// src/components/Menu/MainMenu.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SettingsModal from '../UI/SettingsModal';
import { IconRocket, IconBook, IconTrophy, IconSettings, IconUser, IconArrowRight } from '../UI/Icons';

// --- Background Component ---
const CyberBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden bg-[#020617]">
    {/* Grid nền */}
    <div 
      className="absolute inset-0 opacity-[0.05]" 
      style={{ 
        backgroundImage: `linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} 
    />
    {/* Glow spots */}
    <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px]" />
    <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]" />
    
    {/* Scanline effect */}
    <div className="absolute inset-0 bg-[url('assets/images/ui/noise.svg')] opacity-5 pointer-events-none" />
  </div>
);

const MainMenu = ({
  onStart, onContinue, onTutorial, onLeaderboard, onAbout, onShop, onGoHome, onGoGuide,
  uiScale, setUiScale, bgmVolume, setBgmVolume, sfxVolume, setSfxVolume, enableSound, setEnableSound
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [hasSaveFile, setHasSaveFile] = useState(false);

  React.useEffect(() => {
    const save = localStorage.getItem('scratch_game_save');
    if (save) {
      try {
        const parsed = JSON.parse(save);
        // Simple validation
        if (parsed && parsed.lives > 0) {
          setHasSaveFile(true);
        }
      } catch (e) {
        console.error("Save file corrupted");
      }
    }
  }, []);

  // Visual settings (still local to Menu for now, or can be global if needed)
  const [localSettings, setLocalSettings] = useState({
    isBlur: true,
    isLowEffects: false,
    fxDensity: 60,
  });

  const updateLocalSetting = (key, value) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleOpenGuideFromSettings = () => {
    setShowSettings(false);
    if (onGoGuide) {
        onGoGuide();
    } else if (onTutorial) {
        onTutorial();
    }
  };

  const handleGoHomeFromSettings = () => {
      setShowSettings(false);
      if (onGoHome) onGoHome();
  };

  // Nút bấm Cyberpunk
  const MenuButton = ({ label, icon, onClick, color = 'cyan', delay = 0 }) => {
    const colorClasses = {
      cyan: 'border-cyan-500/30 hover:border-cyan-400 text-cyan-50 hover:bg-cyan-950/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]',
      green: 'border-emerald-500/30 hover:border-emerald-400 text-emerald-50 hover:bg-emerald-950/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]',
      yellow: 'border-yellow-500/30 hover:border-yellow-400 text-yellow-50 hover:bg-yellow-950/40 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]',
      red: 'border-red-500/30 hover:border-red-400 text-red-50 hover:bg-red-950/40 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]',
    };

    return (
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: delay, duration: 0.3 }}
        onClick={onClick}
        className={`
          group relative w-full py-4 px-6 mb-3 
          border bg-[#0f172a]/60 backdrop-blur-sm 
          flex items-center justify-between overflow-hidden
          transition-all duration-300
          ${colorClasses[color] || colorClasses.cyan}
        `}
        style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
      >
        {/* Decor Lines */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${color}-500/50 group-hover:bg-${color}-400 transition-colors`} />
        
        <span className="flex items-center gap-4 text-lg font-bold tracking-widest uppercase">
          <span className="text-xl filter drop-shadow-md">{icon}</span>
          {label}
        </span>

        {/* Arrow Icon on Hover */}
        <span className="transition-all duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0">
          ➤
        </span>
      </motion.button>
    );
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden font-sans text-white select-none">
      
      <CyberBackground />

      {/* --- LOGO AREA --- */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="relative z-10 mb-12 text-center"
      >
        <h1 className="text-7xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-blue-600 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
          SCRATCH
        </h1>
        <div className="flex items-center justify-center gap-3 mt-2">
            <div className="h-[2px] w-12 bg-cyan-500/50"></div>
            <h2 className="text-xl font-mono font-bold tracking-[0.3em] text-cyan-100/80 uppercase">
            Logic Master
            </h2>
            <div className="h-[2px] w-12 bg-cyan-500/50"></div>
        </div>
      </motion.div>

      {/* --- MENU BUTTONS --- */}
      <div className="relative z-10 w-full max-w-sm px-6">
        
        {hasSaveFile && (
          <MenuButton
            label="Tiếp tục"
            icon={<IconRocket className="w-6 h-6" />}
            color="yellow"
            onClick={onContinue}
            delay={0.05}
          />
        )}

        <MenuButton 
          label="Bắt đầu mới"
          icon={<IconRocket className="w-6 h-6" />}
          color="green" 
          onClick={onStart} 
          delay={0.1}
        />

        <MenuButton 
          label="Hướng dẫn" 
          icon={<IconBook className="w-6 h-6" />}
          color="cyan" 
          onClick={onTutorial} 
          delay={0.2}
        />

        <MenuButton 
          label="Cửa Hàng"
          icon={<span className="text-xl">🛒</span>}
          color="yellow" 
          onClick={onShop}
          delay={0.3}
        />

        <MenuButton
          label="Bảng xếp hạng"
          icon={<IconTrophy className="w-6 h-6" />}
          color="cyan"
          onClick={onLeaderboard}
          delay={0.4}
        />

        <MenuButton 
          label="Cài đặt" 
          icon={<IconSettings className="w-6 h-6" />}
          color="cyan" 
          onClick={() => setShowSettings(true)} 
          delay={0.5}
        />

        <MenuButton 
          label="Tác giả" 
          icon={<IconUser className="w-6 h-6" />}
          color="red" 
          onClick={onAbout}
          delay={0.6}
        />

      </div>

      {/* Footer Info */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute z-10 bottom-6 text-[10px] font-mono text-slate-500 uppercase tracking-widest"
      >
        System v1.0.0 // Ready to execute
      </motion.div>

      {/* --- SETTINGS MODAL --- */}
      {showSettings && (
        <SettingsModal 
            onClose={() => setShowSettings(false)}
            onHome={handleGoHomeFromSettings}
            onOpenGuide={handleOpenGuideFromSettings}
            
            // Visuals
            isBlur={localSettings.isBlur}
            toggleBlur={() => updateLocalSetting('isBlur', !localSettings.isBlur)}
            isLowEffects={localSettings.isLowEffects}
            toggleLowEffects={() => updateLocalSetting('isLowEffects', !localSettings.isLowEffects)}
            fxDensity={localSettings.fxDensity}
            onChangeFxDensity={(val) => updateLocalSetting('fxDensity', val)}

            // Global State passed down
            uiScale={uiScale}
            setUiScale={setUiScale}
            bgmVolume={bgmVolume}
            setBgmVolume={setBgmVolume}
            sfxVolume={sfxVolume}
            setSfxVolume={setSfxVolume}
            isSound={enableSound}
            toggleSound={() => setEnableSound(!enableSound)}
        />
      )}

    </div>
  );
};

export default MainMenu;