// src/components/Menu/AboutScreen.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { IconUser } from '../UI/Icons';

const CyberBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden bg-[#020617]">
    <div
      className="absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage: `linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}
    />
    <div className="absolute inset-0 bg-[url('assets/images/ui/noise.svg')] opacity-5 pointer-events-none" />
  </div>
);

const TabButton = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
      active
        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
        : 'text-slate-400 hover:text-white hover:bg-slate-800'
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="text-sm font-bold tracking-wider uppercase">{label}</span>
  </button>
);

const SectionContainer = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="w-full h-full pr-2 overflow-y-auto custom-scrollbar"
  >
    {children}
  </motion.div>
);

const AboutScreen = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('author');
  const [playingAudio, setPlayingAudio] = useState(null);

  const playSound = (file) => {
    if (playingAudio) {
        playingAudio.pause();
        playingAudio.currentTime = 0;
    }
    const audio = new Audio(`assets/sounds/${file}`);
    audio.play().catch(e => console.error(e));
    setPlayingAudio(audio);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden font-sans text-white select-none">
      <CyberBackground />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 max-w-2xl px-6 py-12 text-center border shadow-2xl bg-slate-900/80 backdrop-blur-md rounded-3xl border-white/10"
      >
        {/* HEADER */}
        <div className="flex flex-col items-center justify-between px-8 py-6 border-b md:flex-row border-white/5 bg-slate-950/50">
          <h1 className="text-3xl font-black tracking-tighter text-transparent uppercase bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Game Report
          </h1>

        <div className="space-y-4 text-slate-300">
          <p className="text-lg leading-relaxed">
            Chào mừng bạn đến với <strong className="text-cyan-300">Scratch Logic Master</strong>!
          </p>
          <p>
            Đây là dự án thực tập năm 2025, được xây dựng với mục tiêu giúp người chơi rèn luyện tư duy lập trình thông qua các khối lệnh Scratch quen thuộc.
          </p>

          <div className="my-8 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="flex flex-col items-center gap-2">
            <IconUser className="w-12 h-12 text-cyan-300" />
            <h3 className="text-xl font-bold text-white">Developer</h3>
            <p className="font-mono text-sm text-cyan-400">Internship 2025</p>
          </div>
        </div>

        <button
          onClick={onBack}
          className="px-8 py-3 mt-10 text-xs font-bold tracking-widest uppercase transition-all border rounded-full bg-slate-800 hover:bg-slate-700 border-slate-600 hover:border-cyan-500"
        >
          Quay lại
        </button>
      </motion.div>
    </div>
  );
};

export default AboutScreen;
