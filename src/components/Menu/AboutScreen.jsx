// src/components/Menu/AboutScreen.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager } from '../../utils/audioManager';
import { IconUser, IconMusic, IconImage, IconGrid, IconVolume2, IconPlay } from '../UI/Icons';
import Block from '../Block/Block';
import ResultModal from '../UI/ResultModal';

// --- DATA DEFINITIONS ---

const CHARACTERS = [
  { id: 'pink', name: 'Pink Monster', file: 'Pink_Monster_Idle_4.png' },
  { id: 'owlet', name: 'Owlet Monster', file: 'Owlet_Monster_Idle_4.png' },
  { id: 'dude', name: 'Dude Monster', file: 'Dude_Monster_Idle_4.png' },
];

const SOUNDS = [
  { name: 'Background Music', file: 'bg.mp3' },
  { name: 'Pop', file: 'pop.mp3' },
  { name: 'Win', file: 'win.mp3' },
  { name: 'Lose', file: 'lose.mp3' },
  { name: 'Jump', file: 'jump.mp3' },
  { name: 'Climb', file: 'climb.mp3' },
  { name: 'Hurt', file: 'hurt.mp3' },
  { name: 'Move', file: 'move.mp3' },
];

const BLOCKS = [
  { type: 'motion', text: 'Move Right 1' },
  { type: 'motion', text: 'Move Left 1' },
  { type: 'motion', text: 'Move Up 1' },
  { type: 'motion', text: 'Move Down 1' },
  { type: 'motion', text: 'Turn Left' },
  { type: 'motion', text: 'Turn Right' },
  { type: 'motion', text: 'Jump' },
  { type: 'motion', text: 'Go Home' },
  { type: 'events', text: 'On Flag' },
  { type: 'events', text: 'On Click' },
  { type: 'events', text: 'On Bump' },
  { type: 'looks', text: 'Say Hello' },
  { type: 'looks', text: 'Hide' },
  { type: 'looks', text: 'Show' },
  { type: 'sound', text: 'Play Pop' },
  { type: 'control', text: 'Wait 1s' },
  { type: 'control', text: 'Repeat 3' },
  { type: 'control', text: 'Stop' },
];

const BACKGROUNDS = [
    { name: 'Noise Texture', file: 'ui/noise.svg' }
]

// --- COMPONENTS ---

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

  const playSound = (file) => {
    audioManager.playSfx(file);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden font-sans text-white select-none">
      <CyberBackground />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 flex flex-col w-[90%] max-w-6xl h-[90vh] bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
      >
        {/* HEADER */}
        <div className="flex flex-col items-center justify-between px-8 py-6 border-b md:flex-row border-white/5 bg-slate-950/50">
          <h1 className="text-3xl font-black tracking-tighter text-transparent uppercase bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Game Report
          </h1>
          
          <div className="flex w-full gap-2 pb-2 mt-4 overflow-x-auto md:mt-0 md:w-auto md:pb-0 scrollbar-hide">
            <TabButton active={activeTab === 'author'} onClick={() => setActiveTab('author')} icon={IconUser} label="Tác giả" />
            <TabButton active={activeTab === 'ui_showcase'} onClick={() => setActiveTab('ui_showcase')} icon={IconImage} label="UI/UX" />
            <TabButton active={activeTab === 'chars'} onClick={() => setActiveTab('chars')} icon={IconUser} label="Nhân vật" />
            <TabButton active={activeTab === 'audio'} onClick={() => setActiveTab('audio')} icon={IconMusic} label="Âm thanh" />
            <TabButton active={activeTab === 'blocks'} onClick={() => setActiveTab('blocks')} icon={IconGrid} label="Blocks" />
            <TabButton active={activeTab === 'bg'} onClick={() => setActiveTab('bg')} icon={IconImage} label="Background" />
          </div>
        </div>

        {/* CONTENT */}
        <div className="relative flex-1 p-8 overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* 1. AUTHOR SECTION */}
            {activeTab === 'author' && (
              <SectionContainer key="author">
                <div className="flex flex-col items-center justify-center h-full space-y-6 text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 p-[2px] shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                      <div className="flex items-center justify-center w-full h-full rounded-full bg-slate-900">
                         <IconUser className="w-12 h-12 text-cyan-300" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold text-white">Scratch Logic Master</h2>
                      <p className="font-mono text-cyan-400">Dự án thực tập 2025</p>
                    </div>

                    <div className="max-w-2xl text-lg leading-relaxed text-slate-300">
                      <p>
                        Trò chơi được xây dựng nhằm mục đích giáo dục, giúp người chơi làm quen với tư duy lập trình logic thông qua giao diện kéo thả trực quan.
                      </p>
                      <p className="mt-4">
                        Toàn bộ assets (hình ảnh, âm thanh) và mã nguồn được tổng hợp và tối ưu hóa để chạy mượt mà trên nền tảng Web.
                      </p>
                    </div>
                </div>
              </SectionContainer>
            )}

            {/* NEW: UI SHOWCASE SECTION */}
            {activeTab === 'ui_showcase' && (
              <SectionContainer key="ui_showcase">
                <div className="grid h-full grid-cols-1 gap-12 p-8 overflow-y-auto lg:grid-cols-2">
                    <div className="flex flex-col items-center gap-4">
                        <h3 className="text-xl font-bold tracking-widest uppercase text-emerald-400">Bảng Kết Quả (Win)</h3>
                        <div className="relative flex items-center justify-center w-full overflow-hidden transform scale-90 border aspect-video border-slate-700/50 rounded-2xl bg-slate-950/50">
                            {/* Render static Preview of Win Modal */}
                            <div className="origin-center scale-75 pointer-events-none">
                                <ResultModal 
                                    type="win" 
                                    message="Chúc mừng! Bạn đã chiến thắng." 
                                    theme="dark"
                                    stats={{ correct: 8, wrong: 2, total: 10 }}
                                    scoreDetails={{ easy: 10, normal: 8, hard: 0 }}
                                    isGoldenWin={true}
                                    onHome={() => {}} 
                                    onReplay={() => {}} 
                                    onOpenSettings={() => {}} 
                                    onNextLevel={() => {}}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <h3 className="text-xl font-bold tracking-widest uppercase text-rose-400">Bảng Kết Quả (Lose)</h3>
                        <div className="relative flex items-center justify-center w-full overflow-hidden transform scale-90 border aspect-video border-slate-700/50 rounded-2xl bg-slate-950/50">
                             {/* Render static Preview of Lose Modal */}
                             <div className="origin-center scale-75 pointer-events-none">
                                <ResultModal 
                                    type="gameover" 
                                    message="Bạn đã hết mạng!" 
                                    theme="dark"
                                    stats={{ correct: 3, wrong: 5, total: 10 }}
                                    scoreDetails={{ easy: 3, normal: 0, hard: 0 }}
                                    isGoldenWin={false}
                                    onHome={() => {}} 
                                    onReplay={() => {}} 
                                    onOpenSettings={() => {}} 
                                    onNextLevel={null}
                                />
                            </div>
                        </div>
                    </div>
                </div>
              </SectionContainer>
            )}


            {/* 2. CHARACTERS SECTION */}
            {activeTab === 'chars' && (
              <SectionContainer key="chars">
                 <div className="grid h-full grid-cols-1 gap-8 md:grid-cols-3 place-items-center">
                   {CHARACTERS.map(char => (
                     <div key={char.id} className="flex flex-col items-center gap-4 group">
                       <div className="relative w-48 h-48 bg-slate-800/50 rounded-2xl border border-white/5 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                         <div className="absolute inset-0 bg-[url('assets/images/ui/noise.svg')] opacity-10" />
                         <img 
                           src={`assets/images/characters/${char.id}/${char.file}`} 
                           alt={char.name}
                           className="w-[400%] max-w-none pixelated"
                           style={{ animation: `sprite-preview 0.8s steps(4) infinite` }}
                         />
                       </div>
                       <h3 className="text-xl font-bold transition-colors text-slate-200 group-hover:text-cyan-300">{char.name}</h3>
                       <span className="px-2 py-1 font-mono text-xs border rounded text-slate-500 bg-slate-900 border-slate-800">{char.id}</span>
                     </div>
                   ))}
                 </div>
                 <style>{`
                    @keyframes sprite-preview { from { transform: translateX(0); } to { transform: translateX(-100%); } }
                 `}</style>
              </SectionContainer>
            )}

            {/* 3. AUDIO SECTION */}
            {activeTab === 'audio' && (
               <SectionContainer key="audio">
                 <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                   {SOUNDS.map((sound, idx) => (
                     <div key={idx} className="flex items-center justify-between p-4 transition-colors border bg-slate-800/40 rounded-xl border-white/5 hover:bg-slate-800/80">
                        <div className="flex items-center gap-3">
                           <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-700 text-cyan-400">
                              <IconMusic className="w-5 h-5" />
                           </div>
                           <div>
                              <div className="font-bold text-slate-200">{sound.name}</div>
                              <div className="font-mono text-xs text-slate-500">{sound.file}</div>
                           </div>
                        </div>
                        <button 
                          onClick={() => playSound(sound.file)}
                          className="flex items-center justify-center w-10 h-10 transition-all rounded-full bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-white"
                        >
                           <IconPlay className="w-4 h-4 ml-0.5" />
                        </button>
                     </div>
                   ))}
                 </div>
               </SectionContainer>
            )}

            {/* 4. BLOCKS SECTION */}
            {activeTab === 'blocks' && (
              <SectionContainer key="blocks">
                 <div className="grid grid-cols-2 gap-6 p-4 md:grid-cols-4 lg:grid-cols-6">
                   {BLOCKS.map((block, idx) => (
                     <div key={idx} className="flex flex-col items-center gap-2">
                        <div className="origin-center transform scale-75">
                           <Block type={block.type} text={block.text} onClick={() => {}} />
                        </div>
                        <span className="font-mono text-xs text-center text-slate-400">{block.text}</span>
                     </div>
                   ))}
                 </div>
              </SectionContainer>
            )}

            {/* 5. BACKGROUNDS SECTION */}
            {activeTab === 'bg' && (
               <SectionContainer key="bg">
                  <div className="grid grid-cols-1 gap-8">
                     {BACKGROUNDS.map((bg, idx) => (
                        <div key={idx} className="flex flex-col gap-4">
                           <h3 className="text-xl font-bold text-white">{bg.name}</h3>
                           <div className="relative w-full h-64 overflow-hidden border bg-slate-800 rounded-xl border-white/10">
                              {/* Preview Noise */}
                              <div className="absolute inset-0 bg-[#020617]">
                                 <div className={`absolute inset-0 bg-[url('assets/images/${bg.file}')] opacity-20`} />
                              </div>
                              <div className="absolute px-3 py-1 font-mono text-xs text-white rounded bottom-4 right-4 bg-black/50 backdrop-blur-sm">
                                 {bg.file}
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </SectionContainer>
            )}

          </AnimatePresence>
        </div>

        {/* FOOTER */}
        <div className="flex justify-center p-6 border-t border-white/5 bg-slate-950/50">
           <button
             onClick={() => {
                onBack();
             }}
             className="px-8 py-3 text-xs font-bold tracking-widest text-white uppercase transition-all border rounded-full bg-slate-800 hover:bg-slate-700 border-slate-600 hover:border-cyan-500"
           >
             Quay lại Menu
           </button>
        </div>

      </motion.div>
    </div>
  );
};

export default AboutScreen; 