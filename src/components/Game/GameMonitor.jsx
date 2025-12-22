import { memo } from 'react';
import Stage from './Stage';
import { IconClock } from '../UI/Icons';
// Import hook xử lý chuyển động (đã sửa đường dẫn)
import { useSmoothMotion } from '../../hooks/useSmoothMotion';

// --- 1. CÁC COMPONENT TRANG TRÍ (JOY-CON) ---
const JoyConLeft = memo(() => {
  const btnBase = "relative w-10 h-10 rounded-full bg-gradient-to-b from-[#333] to-[#222] shadow-[0_3px_0_#111,inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-center border border-white/5 active:translate-y-[3px] active:shadow-[0_1px_0_#111] transition-all";
  const arrowStyle = "text-[#666] text-[10px] font-black group-hover:text-cyan-300 drop-shadow-sm";

  return (
    <div className="w-44 h-[660px] bg-gradient-to-b from-[#00dcfc] to-[#00a3c3] rounded-l-[5rem] border-t-4 border-l-4 border-[#40e0ff] border-b-4 border-r-[1px] border-b-[#008ca8] border-r-[#008ca8]/50 flex flex-col items-center justify-center gap-12 relative z-10 shadow-[inset_-5px_0_10px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.2)] overflow-hidden will-change-transform">
      <div className="absolute inset-0 rounded-l-[5rem] bg-gradient-to-r from-white/25 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute top-14 right-12 w-10 h-2.5 bg-[#333] shadow-sm rounded-sm"></div>
      
      <div className="w-24 h-24 rounded-full bg-gradient-to-b from-[#222] to-[#111] shadow-[inset_0_2px_5px_rgba(255,255,255,0.05),0_5px_10px_rgba(0,0,0,0.3)] flex items-center justify-center border-b-4 border-[#000]">
        <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-[#333] shadow-[inset_0_5px_10px_rgba(0,0,0,0.5)]"></div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4 scale-110">
        <div /><div className={`${btnBase} group`}><span className={arrowStyle}>▲</span></div><div />
        <div className={`${btnBase} group`}><span className={arrowStyle}>◀</span></div><div /><div className={`${btnBase} group`}><span className={arrowStyle}>▶</span></div>
        <div /><div className={`${btnBase} group`}><span className={arrowStyle}>▼</span></div><div />
      </div>
      <div className="absolute bottom-16 right-12 w-9 h-9 bg-[#222] rounded-lg border border-[#333] shadow-inner"></div>
    </div>
  );
});
JoyConLeft.displayName = 'JoyConLeft';

const JoyConRight = memo(() => {
  const btnBase = "relative w-10 h-10 rounded-full bg-gradient-to-b from-[#333] to-[#222] shadow-[0_3px_0_#111,inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-center border border-white/5 active:translate-y-[3px] active:shadow-[0_1px_0_#111] transition-all";
  const textStyle = "text-[#666] text-xs font-black group-hover:text-yellow-300 drop-shadow-sm";

  return (
    <div className="w-44 h-[660px] bg-gradient-to-b from-[#ff5e6c] to-[#d63a46] rounded-r-[5rem] border-t-4 border-r-4 border-[#ff8a95] border-b-4 border-l-[1px] border-b-[#b02e38] border-l-[#b02e38]/50 flex flex-col items-center justify-center gap-12 relative z-10 shadow-[inset_5px_0_10px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.2)] overflow-hidden will-change-transform">
      <div className="absolute inset-0 rounded-r-[5rem] bg-gradient-to-l from-white/25 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute flex items-center justify-center w-10 h-10 top-14 left-12">
        <div className="absolute w-10 h-2.5 bg-[#333] rounded-sm"></div>
        <div className="absolute w-2.5 h-10 bg-[#333] rounded-sm"></div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4 scale-110">
        <div /><div className={`${btnBase} group`}><span className={textStyle}>X</span></div><div />
        <div className={`${btnBase} group`}><span className={textStyle}>Y</span></div><div /><div className={`${btnBase} group`}><span className={textStyle}>A</span></div>
        <div /><div className={`${btnBase} group`}><span className={textStyle}>B</span></div><div />
      </div>

      <div className="w-24 h-24 rounded-full bg-gradient-to-b from-[#222] to-[#111] shadow-[inset_0_2px_5px_rgba(255,255,255,0.05),0_5px_10px_rgba(0,0,0,0.3)] flex items-center justify-center border-b-4 border-[#000]">
        <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-[#333] shadow-[inset_0_5px_10px_rgba(0,0,0,0.5)]"></div>
      </div>
      <div className="absolute bottom-16 left-12 w-11 h-11 rounded-full border-[3px] border-[#333] bg-[#222] shadow-inner"></div>
    </div>
  );
});
JoyConRight.displayName = 'JoyConRight';

// --- 2. COMPONENT CHÍNH ---
const GameMonitor = ({ 
  isDark, 
  difficulty, 
  currentLevelIndex, 
  characterState, 
  characterId, 
  timeLeft, 
  activeLoopType, 
  repeatProgress, 
  isFrozen 
}) => {
  
  // Hook tính toán toạ độ mượt (float)
  const smoothPos = useSmoothMotion(
    characterState.x, 
    characterState.y, 
    characterState.speed
  );

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Logic hiển thị trạng thái
  let statusText = 'READY';
  let statusColorClass = 'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]';
  let statusBgClass = 'bg-green-500 shadow-[0_0_15px_rgba(74,222,128,0.8)]';

  if (characterState.isWaiting) {
    statusText = 'WAITING...';
    statusColorClass = 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]';
    statusBgClass = 'bg-yellow-500 animate-pulse shadow-[0_0_15px_rgba(250,204,21,0.8)]';
  } else if (characterState.status === 'stop') {
    statusText = 'HALTED';
    statusColorClass = 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]';
    statusBgClass = 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]';
  } else if (characterState.status !== 'idle') {
    statusText = 'RUNNING';
    statusColorClass = 'text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.6)]';
    statusBgClass = 'bg-orange-500 animate-ping shadow-[0_0_15px_rgba(251,146,60,0.8)]';
  }

  const timeColorClass = timeLeft <= 10 
    ? 'text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse' 
    : 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]';

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {/* Removed style jsx global */}

      {/* KHUNG MÁY SWITCH */}
      <div className="relative flex items-center justify-center ml-12 transition-transform duration-300 filter drop-shadow-[0_25px_25px_rgba(0,0,0,0.3)] hover:scale-[1.005] will-change-transform">
        
        <JoyConLeft />

        {/* MÀN HÌNH GIỮA (Thân máy) */}
        <div className={`relative bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] border-t-[24px] border-x-[24px] border-b-[24px] border-[#222] w-[1025px] h-[680px] rounded-[2.5rem] shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)] z-20 flex flex-col`}>
          
          {/* Badge Level */}
          <div className="absolute z-50 -top-5 -right-6">
             <div className="px-6 py-2 bg-gradient-to-r from-[#222] to-[#111] text-cyan-300 text-xs font-black rounded-xl border-2 border-cyan-500/30 uppercase tracking-[0.25em] shadow-[0_5px_15px_rgba(0,0,0,0.3)] flex items-center gap-3 backdrop-blur-md">
                <div className={`w-2.5 h-2.5 rounded-full shadow-[0_0_10px_currentColor] ${isDark ? 'bg-cyan-400 text-cyan-400' : 'bg-yellow-400 text-yellow-400'}`}></div>
                {difficulty} <span className="text-slate-500">|</span> LVL {currentLevelIndex + 1}
             </div>
          </div>

          {/* KHUNG HIỂN THỊ GAME */}
          <div className="relative flex-1 overflow-hidden bg-black border-2 border-white/10 rounded-xl shadow-[0_0_30px_rgba(34,211,238,0.1)]">
            
            {/* STAGE CONTAINER - Thêm class pixel-art-stage và style trực tiếp */}
            <div className="relative flex items-center justify-center w-full h-full bg-slate-950 pixel-art-stage" style={{ imageRendering: 'pixelated' }}>
              <Stage 
                  key={currentLevelIndex} 
                  
                  // --- [CRITICAL FIX] LÀM TRÒN TOẠ ĐỘ ---
                  // Math.round() giúp loại bỏ số lẻ (Sub-pixel rendering)
                  // Cái này fix lỗi "như bị hình ra" hay xé hình
                  x={Math.round(smoothPos.x)} 
                  y={Math.round(smoothPos.y)} 
                  // -------------------------------------

                  rotation={characterState.rotation} 
                  status={characterState.status}
                  visible={characterState.visible} 
                  scale={characterState.scale}
                  speechText={characterState.speechText}
                  characterId={characterId} 
                  speed={characterState.speed}
                  waitTimer={characterState.waitTimer} 
                  activeLoopType={activeLoopType}
                  repeatProgress={repeatProgress}
                  isFrozen={isFrozen}
                  friend={characterState.friend}
                  messageColor={characterState.messageColor}
                  tapEffect={characterState.tapEffect}
              />

              {/* HUD (Giữ nguyên) */}
              <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-[#020617]/95 to-[#0f172a]/80 backdrop-blur-xl flex items-center justify-between px-10 border-t border-cyan-500/20 shadow-[0_-5px_20px_rgba(0,0,0,0.2)] z-40">
                  
                  {/* TIME LEFT */}
                  <div className="flex items-center gap-5">
                     <div className={`w-11 h-11 flex items-center justify-center rounded-xl bg-slate-800/50 border border-white/10 ${timeLeft <= 10 ? 'animate-pulse text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.1)]'}`}>
                        <IconClock className="w-6 h-6 drop-shadow-sm" />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase mb-1">Time Limit</span>
                        {/* Hiển thị thời gian đã được format (không còn số lẻ dài ngoằng) */}
                        <span className={`text-3xl font-mono font-black tracking-tight leading-none ${timeColorClass}`}>
                           {formatTime(timeLeft)}
                        </span>
                     </div>
                  </div>

                  {/* STATUS */}
                  <div className="flex items-center gap-5 pl-8 border-l border-white/10">
                     <div className="relative flex w-4 h-4">
                        <span className={`absolute inline-flex h-full w-full rounded-full opacity-60 ${statusBgClass}`}></span>
                        <span className={`relative inline-flex rounded-full h-4 w-4 border-2 border-white/20 ${statusBgClass.split(' ')[0]}`}></span>
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase mb-1">System Status</span>
                        <span className={`text-xl font-black uppercase leading-none ${statusColorClass}`}>
                           {statusText}
                        </span>
                     </div>
                  </div>

                  {/* LED Indicators */}
                  <div className="flex gap-2 opacity-60">
                     <div className="w-1.5 h-5 bg-cyan-400 rounded-sm animate-pulse shadow-[0_0_5px_rgba(34,211,238,0.8)]"></div>
                     <div className="w-1.5 h-5 bg-cyan-400 rounded-sm animate-pulse delay-100 shadow-[0_0_5px_rgba(34,211,238,0.8)]"></div>
                     <div className="w-1.5 h-5 bg-cyan-400 rounded-sm animate-pulse delay-200 shadow-[0_0_5px_rgba(34,211,238,0.8)]"></div>
                     <div className="w-1.5 h-5 bg-slate-700 rounded-sm"></div>
                  </div>

              </div>
            </div>
          </div>

          {/* Bottom Bezel */}
          <div className="h-14 bg-gradient-to-t from-[#111] to-[#1a1a1a] flex items-center justify-center relative rounded-b-[2rem]">
            <div className="flex items-center gap-2 transition-opacity duration-500 opacity-20 hover:opacity-50">
              <div className="w-5 h-9 border-2 border-[#ccc] rounded-l-[7px]" />
              <div className="w-5 h-9 bg-[#ccc] rounded-r-[7px]" />
            </div>
            <div className="absolute right-16 w-3 h-3 bg-[#080808] rounded-full border border-[#333] shadow-sm" />
          </div>
        </div>

        <JoyConRight />
      </div>
    </div>
  );
};

export default memo(GameMonitor);
