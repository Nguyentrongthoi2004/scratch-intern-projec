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
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
  </div>
);

const AboutScreen = ({ onBack }) => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden font-sans text-white select-none">
      <CyberBackground />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 max-w-2xl px-6 py-12 text-center bg-slate-900/80 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl"
      >
        <h1 className="mb-6 text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase">
          Về Tác Giả
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
          className="mt-10 px-8 py-3 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-cyan-500 transition-all font-bold tracking-widest uppercase text-xs"
        >
          Quay lại
        </button>
      </motion.div>
    </div>
  );
};

export default AboutScreen;
