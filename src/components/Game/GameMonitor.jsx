// src/components/Game/GameMonitor.jsx
import React, { useRef, useState, useEffect, useMemo, memo } from 'react';
import Stage from './Stage';

// 1. TÁCH ĐỒNG HỒ RA RIÊNG (Để khi giây nhảy, không render lại cả máy Switch)
const GameDashboard = memo(({ status, isDark }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSeconds(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mt-8 ml-12 flex items-center gap-8 px-10 py-3 bg-[#0f172a]/90 rounded-full border border-white/10 shadow-lg backdrop-blur-sm">
      {/* Thời gian */}
      <div className="flex items-center gap-4 pr-8 border-r border-white/10">
        <span className="text-2xl animate-pulse">⏳</span>
        <div className="flex flex-col">
          <span className="text-[9px] text-slate-400 font-bold uppercase">Time</span>
          <span className="font-mono text-xl font-black text-cyan-400">{formatTime(seconds)}</span>
        </div>
      </div>

      {/* Trạng thái */}
      <div className="flex items-center gap-4">
        <div className="relative flex w-3 h-3">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status === 'idle' ? 'bg-green-400' : 'bg-yellow-400'}`} />
          <span className={`relative inline-flex rounded-full h-3 w-3 ${status === 'idle' ? 'bg-green-500' : 'bg-yellow-500'}`} />
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] text-slate-400 font-bold uppercase">Status</span>
          <span className={`text-sm font-bold uppercase ${status === 'idle' ? 'text-green-400' : 'text-yellow-400'}`}>
            {status === 'idle' ? 'READY' : 'RUNNING'}
          </span>
        </div>
      </div>
      
      {/* Led Bar - Giảm số lượng div để nhẹ hơn */}
      <div className="flex gap-1 pl-4 ml-2 border-l border-white/10">
         <div className="w-1.5 h-6 rounded-full bg-cyan-500 animate-pulse"></div>
         <div className="w-1.5 h-6 rounded-full bg-cyan-600 animate-pulse delay-75"></div>
         <div className="w-1.5 h-6 rounded-full bg-slate-700"></div>
      </div>
    </div>
  );
});

// 2. MEMO JOY-CON (Để nó không bị vẽ lại liên tục)
const JoyConLeft = memo(() => {
  const btnBase = "relative w-10 h-10 rounded-full bg-[#2a2a2a] shadow-[0_4px_0_#151515] flex items-center justify-center border-b border-white/5 active:translate-y-[4px] active:shadow-none transition-all";
  const arrowStyle = "text-[#555] text-[10px] font-black group-hover:text-cyan-400";

  return (
    <div className="w-44 h-[660px] bg-[#00c3e3] rounded-l-[5rem] border-y-4 border-l-4 border-[#00a3c3] flex flex-col items-center justify-center gap-12 relative z-10 shadow-lg overflow-hidden will-change-transform">
      <div className="absolute inset-0 rounded-l-[5rem] bg-gradient-to-r from-white/20 to-transparent pointer-events-none"></div>
      <div className="absolute top-14 right-12 w-10 h-2.5 bg-[#333] shadow-sm rounded-sm"></div>
      
      {/* Analog Stick - Dùng CSS thuần thay vì div lồng quá nhiều */}
      <div className="w-24 h-24 rounded-full bg-[#1a1a1a] shadow-[inset_0_5px_10px_rgba(255,255,255,0.05)] flex items-center justify-center border-b-8 border-[#111]">
        <div className="w-16 h-16 rounded-full bg-[#111] border-2 border-[#333]"></div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4 scale-110">
        <div />
        <div className={`${btnBase} group`}><span className={arrowStyle}>▲</span></div>
        <div />
        <div className={`${btnBase} group`}><span className={arrowStyle}>◀</span></div>
        <div />
        <div className={`${btnBase} group`}><span className={arrowStyle}>▶</span></div>
        <div />
        <div className={`${btnBase} group`}><span className={arrowStyle}>▼</span></div>
        <div />
      </div>
      <div className="absolute bottom-16 right-12 w-9 h-9 bg-[#222] rounded-lg border-2 border-[#333] shadow-inner"></div>
    </div>
  );
});

const JoyConRight = memo(() => {
  const btnBase = "relative w-10 h-10 rounded-full bg-[#2a2a2a] shadow-[0_4px_0_#151515] flex items-center justify-center border-b border-white/5 active:translate-y-[4px] active:shadow-none transition-all";
  const textStyle = "text-[#555] text-xs font-black group-hover:text-yellow-400";

  return (
    <div className="w-44 h-[660px] bg-[#ff4554] rounded-r-[5rem] border-y-4 border-r-4 border-[#d63a46] flex flex-col items-center justify-center gap-12 relative z-10 shadow-lg overflow-hidden will-change-transform">
      <div className="absolute inset-0 rounded-r-[5rem] bg-gradient-to-l from-white/20 to-transparent pointer-events-none"></div>
      <div className="absolute flex items-center justify-center w-10 h-10 top-14 left-12">
        <div className="absolute w-10 h-2.5 bg-[#333] rounded-sm"></div>
        <div className="absolute w-2.5 h-10 bg-[#333] rounded-sm"></div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4 scale-110">
        <div />
        <div className={`${btnBase} group`}><span className={textStyle}>X</span></div>
        <div />
        <div className={`${btnBase} group`}><span className={textStyle}>Y</span></div>
        <div />
        <div className={`${btnBase} group`}><span className={textStyle}>A</span></div>
        <div />
        <div className={`${btnBase} group`}><span className={textStyle}>B</span></div>
        <div />
      </div>

      <div className="w-24 h-24 rounded-full bg-[#1a1a1a] shadow-[inset_0_5px_10px_rgba(255,255,255,0.05)] flex items-center justify-center border-b-4 border-[#111]">
        <div className="w-16 h-16 rounded-full bg-[#111] border-2 border-[#333]"></div>
      </div>
      <div className="absolute bottom-16 left-12 w-11 h-11 rounded-full border-[4px] border-[#333] bg-[#222] shadow-inner"></div>
    </div>
  );
});

// 3. COMPONENT CHÍNH ĐÃ ĐƯỢC TỐI ƯU
const GameMonitor = ({ isDark, difficulty, currentLevelIndex, characterState, characterId }) => {
  const isRunning = characterState.status !== 'idle';

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {/* KHUNG MÁY SWITCH */}
      {/* will-change-transform giúp trình duyệt tối ưu render */}
      <div className="relative flex items-center justify-center ml-12 transition-transform duration-300 filter drop-shadow-2xl hover:scale-[1.005] will-change-transform">
        
        <JoyConLeft />

        {/* MÀN HÌNH GIỮA */}
        <div className={`relative bg-[#1a1a1a] border-y-[24px] border-x-[24px] border-[#222] w-[1025px] h-[680px] rounded-[2.5rem] shadow-2xl z-20 flex flex-col`}>
          
          {/* Badge Level - Tĩnh */}
          <div className="absolute z-50 -top-4 -right-4">
             <div className="px-6 py-2 bg-[#222] text-cyan-400 text-xs font-black rounded-bl-2xl rounded-tr-2xl border-2 border-cyan-500/50 uppercase tracking-[0.25em] shadow-lg flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-cyan-400' : 'bg-yellow-400'}`}></div>
                {difficulty}
             </div>
          </div>

          {/* Khu vực hiển thị Game */}
          <div className="relative flex-1 overflow-hidden bg-black border rounded-lg shadow-inner border-white/5">
            {/* Grid nền tĩnh, bỏ animation nếu không cần thiết */}
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
            
            <div className="flex items-center justify-center w-full h-full bg-black">
              {/* STAGE CONTAINER - Đây là phần duy nhất thay đổi nặng */}
              <div style={{ width: '1024px', height: '576px' }} className="relative overflow-hidden bg-black rounded-md shadow-2xl">
                <Stage 
                    key={currentLevelIndex} 
                    x={characterState.x} 
                    y={characterState.y} 
                    rotation={characterState.rotation} 
                    status={characterState.status} 
                    characterId={characterId} 
                />
              </div>
            </div>
          </div>

          {/* Bottom Bezel */}
          <div className="h-10 bg-[#1a1a1a] flex items-center justify-center relative">
            <div className="flex items-center gap-2 opacity-40">
              <div className="w-3 h-6 border-2 border-[#ccc] rounded-l-[5px]" />
              <div className="w-3 h-6 bg-[#ccc] rounded-r-[5px]" />
            </div>
            <div className="absolute right-12 w-2 h-2 bg-[#080808] rounded-full border border-[#333]" />
          </div>
        </div>

        <JoyConRight />
      </div>

      {/* DASHBOARD ĐÃ TÁCH RIÊNG */}
      <GameDashboard status={characterState.status} isDark={isDark} />
    </div>
  );
};

// Sử dụng React.memo để chặn render lại nếu props không đổi
export default memo(GameMonitor);