// src/components/Menu/AboutScreen.jsx
import { motion } from 'framer-motion';
import { audioManager } from '../../utils/audioManager';
import { 
  IconUser, IconMusic, IconImage, IconGrid, IconPlay, 
  IconArrowLeft, IconLightning, IconRun, IconLook, IconSound, IconControl 
} from '../UI/Icons';
import Block from '../Block/Block';
import ResultModal from '../UI/ResultModal';

// --- DATA DEFINITIONS ---

const FULL_BLOCK_LIST = [
  // MOTION
  { type: 'motion', text: 'Move Right', desc: 'Di chuyển phải' },
  { type: 'motion', text: 'Move Left', desc: 'Di chuyển trái' },
  { type: 'motion', text: 'Move Up', desc: 'Đi lên trên' },
  { type: 'motion', text: 'Move Down', desc: 'Đi xuống dưới' },
  { type: 'motion', text: 'Turn Left', desc: 'Xoay trái 90°' },
  { type: 'motion', text: 'Turn Right', desc: 'Xoay phải 90°' },
  { type: 'motion', text: 'Hope', desc: 'Nhảy lên cao' },
  { type: 'motion', text: 'Go Home', desc: 'Về đích' },
  // EVENTS
  { type: 'events', text: 'On Flag', desc: 'Khi bấm cờ' },
  { type: 'events', text: 'On Tap', desc: 'Khi click' },
  { type: 'events', text: 'On Bump', desc: 'Khi va chạm' },
  { type: 'events', text: 'Message Receive', desc: 'Nhận tin' },
  // LOOKS
  { type: 'looks', text: 'Say Hello', desc: 'Nói Hello' },
  { type: 'looks', text: 'Shrink', desc: 'Thu Nhỏ' },
  { type: 'looks', text: 'Show', desc: 'Hiện' },
  { type: 'looks', text: 'Hide', desc: 'Ẩn' },
  { type: 'looks', text: 'Grow', desc: 'Mở rộng' },
  { type: 'looks', text: 'Reset', desc: 'Trả về ban đầu' },
  // SOUND
  { type: 'sound', text: 'Play Pop', desc: 'Tiếng Pop' },
  { type: 'sound', text: 'Play Coin', desc: 'Tiếng Xu' },
  { type: 'sound', text: 'Stop Sound', desc: 'Tắt tiếng' },
  // CONTROL
  { type: 'control', text: 'Wait 1s', desc: 'Chờ 1s' },
  { type: 'control', text: 'Repeat 3', desc: 'Lặp 3 lần' },
  { type: 'control', text: 'Forever', desc: 'Mãi mãi' },
  { type: 'control', text: 'Wait Until', desc: 'Chờ đến khi' },
  { type: 'control', text: 'End', desc: 'Dừng lại' },
  { type: 'control', text: 'Stop All', desc: 'Dừng hết' },
];

const CHARACTERS = [
  { id: 'pink', name: 'Pink Monster', file: 'Pink_Monster_Idle_4.png', type: 'Player' },
  { id: 'owlet', name: 'Owlet Monster', file: 'Owlet_Monster_Idle_4.png', type: 'NPC' },
  { id: 'dude', name: 'Dude Monster', file: 'Dude_Monster_Idle_4.png', type: 'Enemy' },
];

const SOUNDS = [
  { name: 'Pop Sound', file: 'pop.mp3', type: 'SFX' },
  { name: 'Win Jingle', file: 'win.mp3', type: 'SFX' },
  { name: 'Lose Jingle', file: 'lose.mp3', type: 'SFX' },
  { name: 'Jump Action', file: 'jump.mp3', type: 'SFX' },
  { name: 'Hurt', file: 'hurt.mp3', type: 'SFX' },
  { name: 'Climb', file: 'climb.mp3', type: 'SFX' },
  { name: 'Move', file: 'move.mp3', type: 'SFX' },
];

const BACKGROUNDS = [
    { name: 'Dark Noise', file: 'ui/noise.svg' },
    { name: 'Grid Pattern', file: 'css-gradient' }
];

// --- COMPONENTS ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const ReportSection = ({ title, icon: Icon, children }) => (
  <motion.div 
    variants={itemVariants}
    className="mb-16 last:mb-0"
  >
    <div className="flex items-center gap-4 pb-4 mb-8 border-b border-white/10">
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
        <Icon className="w-6 h-6" />
      </div>
      <h2 className="text-3xl font-black tracking-tighter text-white uppercase">{title}</h2>
    </div>
    {children}
  </motion.div>
);

const BlockGridItem = ({ block }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex flex-col items-center gap-3 p-4 transition-all border bg-slate-900/40 border-white/5 rounded-xl hover:bg-slate-800 hover:border-cyan-500/50 hover:shadow-lg group"
    >
        <div className="transition-transform origin-center transform scale-90 group-hover:scale-105">
             <Block type={block.type} text={block.text} onClick={() => {}} />
        </div>
        <div className="text-center">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{block.type}</div>
            <div className="text-xs text-slate-400 group-hover:text-cyan-300 truncate max-w-[120px]">{block.desc}</div>
        </div>
    </motion.div>
);

const AboutScreen = ({ onBack }) => {
  const playSound = (file) => {
    audioManager.playSfx(file);
  };

  const blocksByCat = {
      motion: FULL_BLOCK_LIST.filter(b => b.type === 'motion'),
      events: FULL_BLOCK_LIST.filter(b => b.type === 'events'),
      looks: FULL_BLOCK_LIST.filter(b => b.type === 'looks'),
      sound: FULL_BLOCK_LIST.filter(b => b.type === 'sound'),
      control: FULL_BLOCK_LIST.filter(b => b.type === 'control'),
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30">
        
      {/* GLOBAL BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `linear-gradient(to right, #22d3ee 1px, transparent 1px), linear-gradient(to bottom, #22d3ee 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#020617]/90" />
      </div>

      {/* HEADER FIXED */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b bg-slate-950/80 backdrop-blur-md border-white/10">
        <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 transition-all rounded-full hover:bg-white/10 hover:text-white active:scale-95 text-slate-400">
                <IconArrowLeft className="w-6 h-6" />
            </button>
            <div>
                <h1 className="text-lg font-black tracking-tighter text-transparent uppercase bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    System Report
                </h1>
                <p className="text-[10px] text-slate-500 font-mono">Dự án Scratch Intern 2025</p>
            </div>
        </div>
        <div className="px-3 py-1 font-mono text-xs font-bold border rounded bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
            v2.0 STABLE
        </div>
      </div>

      {/* MAIN SCROLL CONTENT */}
      <div className="absolute inset-0 px-4 pt-24 pb-20 overflow-y-auto custom-scrollbar scroll-smooth md:px-8">
        <motion.div
            className="max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >

            {/* --- 1. UI SYSTEM --- */}
            <ReportSection title="Giao diện (UI System)" icon={IconImage}>
                <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
                    {/* Victory UI */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between px-2">
                             <span className="text-xs font-bold tracking-widest uppercase text-emerald-400">• Victory Modal</span>
                             <span className="text-[10px] text-slate-500 font-mono">type=&apos;win&apos;</span>
                        </div>
                        {/* Container có chiều cao cố định để không bị mất nội dung */}
                        <div className="relative h-[320px] overflow-hidden border rounded-xl border-emerald-500/20 bg-slate-950/50 shadow-2xl flex items-center justify-center">
                             <div className="origin-center scale-[0.7]">
                                <ResultModal 
                                    type="win" 
                                    message="Hoàn thành xuất sắc!" 
                                    stats={{ correct: 5, wrong: 0, total: 5 }} 
                                    scoreDetails={{ easy: 5, normal: 0, hard: 0 }} 
                                    isGoldenWin={true}
                                />
                             </div>
                        </div>
                    </div>

                    {/* Defeat UI */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between px-2">
                             <span className="text-xs font-bold tracking-widest uppercase text-rose-400">• Defeat Modal</span>
                             <span className="text-[10px] text-slate-500 font-mono">type=&apos;gameover&apos;</span>
                        </div>
                        <div className="relative h-[320px] overflow-hidden border rounded-xl border-rose-500/20 bg-slate-950/50 shadow-2xl flex items-center justify-center">
                             <div className="origin-center scale-[0.7]">
                                <ResultModal 
                                    type="gameover" 
                                    message="Bạn đã hết lượt đi!" 
                                    stats={{ correct: 2, wrong: 3, total: 5 }} 
                                    scoreDetails={{ easy: 2, normal: 0, hard: 0 }} 
                                    isGoldenWin={false}
                                />
                             </div>
                        </div>
                    </div>
                </div>
            </ReportSection>

            {/* --- 2. CHARACTERS --- */}
            <ReportSection title="Nhân vật (Sprites)" icon={IconUser}>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {CHARACTERS.map(char => (
                        <div key={char.id} className="relative overflow-hidden transition-all border shadow-xl group bg-slate-900 border-slate-800 rounded-2xl hover:border-cyan-500/50">
                            {/* Visual Container */}
                            <div className="h-64 relative flex items-center justify-center bg-[url('assets/images/ui/noise.svg')] bg-opacity-5 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90" />
                                
                                <div className="relative w-32 h-32 overflow-hidden">
                                    <img 
                                        src={`assets/images/characters/${char.id}/${char.file}`} 
                                        alt={char.name}
                                        className="absolute top-0 left-0 max-w-none w-[400%] h-full object-cover pixelated rendering-pixelated"
                                        style={{ animation: `sprite-preview 1s steps(4) infinite` }}
                                    />
                                </div>
                            </div>

                            {/* Info */}
                            <div className="relative z-10 p-4 border-t border-slate-800 bg-slate-900/80 backdrop-blur-sm">
                                <h3 className="text-lg font-bold text-white transition-colors group-hover:text-cyan-400">{char.name}</h3>
                                <div className="mt-2 space-y-1">
                                    <div className="flex justify-between font-mono text-xs text-slate-500">
                                        <span>ID:</span> <span className="text-slate-300">{char.id}</span>
                                    </div>
                                    <div className="flex justify-between font-mono text-xs text-slate-500">
                                        <span>File:</span> <span className="text-cyan-600 truncate max-w-[150px]">{char.file}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* CSS Animation cho Sprite */}
                <style>{`
                    @keyframes sprite-preview { 
                        from { transform: translateX(0); } 
                        to { transform: translateX(-100%); } 
                    }
                `}</style>
            </ReportSection>

            {/* --- 3. BLOCKS SYSTEM --- */}
            <ReportSection title={`Kho Blocks (${FULL_BLOCK_LIST.length})`} icon={IconGrid}>
                <div className="space-y-12">
                    {/* Motion */}
                    <div className="space-y-4">
                        <h3 className="flex items-center gap-2 pb-2 text-sm font-bold tracking-widest text-blue-400 uppercase border-b border-blue-500/20">
                            <IconRun className="w-5 h-5" /> Motion Blocks
                        </h3>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                            {blocksByCat.motion.map((b, i) => <BlockGridItem key={i} block={b} />)}
                        </div>
                    </div>

                    {/* Events & Control */}
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                         <div className="space-y-4">
                            <h3 className="flex items-center gap-2 pb-2 text-sm font-bold tracking-widest text-yellow-500 uppercase border-b border-yellow-500/20">
                                <IconLightning className="w-5 h-5" /> Events
                            </h3>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                {blocksByCat.events.map((b, i) => <BlockGridItem key={i} block={b} />)}
                            </div>
                        </div>
                         <div className="space-y-4">
                            <h3 className="flex items-center gap-2 pb-2 text-sm font-bold tracking-widest text-orange-400 uppercase border-b border-orange-500/20">
                                <IconControl className="w-5 h-5" /> Control
                            </h3>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                {blocksByCat.control.map((b, i) => <BlockGridItem key={i} block={b} />)}
                            </div>
                        </div>
                    </div>

                    {/* Looks & Sound */}
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                        <div className="space-y-4">
                            <h3 className="flex items-center gap-2 pb-2 text-sm font-bold tracking-widest text-purple-400 uppercase border-b border-purple-500/20">
                                <IconLook className="w-5 h-5" /> Looks
                            </h3>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                {blocksByCat.looks.map((b, i) => <BlockGridItem key={i} block={b} />)}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="flex items-center gap-2 pb-2 text-sm font-bold tracking-widest text-pink-400 uppercase border-b border-pink-500/20">
                                <IconSound className="w-5 h-5" /> Sound
                            </h3>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                {blocksByCat.sound.map((b, i) => <BlockGridItem key={i} block={b} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </ReportSection>

            {/* --- 4. ASSETS --- */}
            <ReportSection title="Tài nguyên (Assets)" icon={IconMusic}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="p-6 border shadow-xl bg-slate-900/50 rounded-2xl border-slate-800">
                        <h3 className="mb-4 text-xs font-bold tracking-widest uppercase text-slate-500">Sound FX & Music</h3>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {SOUNDS.map((sound, idx) => (
                                <button 
                                    key={idx} 
                                    onClick={() => playSound(sound.file)}
                                    className="flex items-center justify-between p-3 text-left transition-all border border-transparent rounded-lg bg-slate-800/50 hover:bg-cyan-900/20 hover:border-cyan-500/30 group"
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="flex items-center justify-center w-8 h-8 transition-transform rounded-full bg-slate-950 text-slate-500 group-hover:text-cyan-400 group-hover:scale-110">
                                            {sound.type === 'Music' ? <IconMusic className="w-4 h-4" /> : <IconPlay className="w-3 h-3 ml-0.5" />}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-sm font-bold truncate text-slate-300 group-hover:text-cyan-200">{sound.name}</div>
                                            <div className="text-[10px] font-mono text-slate-500 truncate">{sound.file}</div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 border shadow-xl bg-slate-900/50 rounded-2xl border-slate-800">
                        <h3 className="mb-4 text-xs font-bold tracking-widest uppercase text-slate-500">Environment</h3>
                        <div className="space-y-4">
                            {BACKGROUNDS.map((bg, idx) => (
                                <div key={idx} className="relative h-24 overflow-hidden border rounded-lg border-slate-700 group">
                                    <div className="absolute inset-0 bg-[#020617]" />
                                    <div className="absolute inset-0 bg-[url('assets/images/ui/noise.svg')] opacity-30" />
                                    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-3 bg-gradient-to-t from-black/90 to-transparent">
                                        <span className="text-sm font-bold text-white">{bg.name}</span>
                                        <span className="text-[10px] text-slate-400 font-mono">{bg.file}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </ReportSection>

            <div className="h-20" /> {/* Spacer cuối trang */}
        </motion.div>
      </div>
    </div>
  );
};

export default AboutScreen;