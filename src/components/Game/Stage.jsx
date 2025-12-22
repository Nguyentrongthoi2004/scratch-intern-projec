import React, { useMemo, useEffect, useRef, useState } from 'react';
import { audioManager } from '../../utils/audioManager';
import { IconMail } from '../UI/Icons'; 

// --- 1. CẤU HÌNH NHÂN VẬT ---
const CHAR_CONFIG = {
  pink: {
    idle:   { fileName: 'Pink_Monster_Idle_4.png', frames: 4 },
    move:   { fileName: 'Pink_Monster_Run_6.png', frames: 6, dust: 'Walk_Run_Push_Dust_6.png' },
    jump:   { fileName: 'Pink_Monster_Jump_8.png', frames: 8, dust: 'Double_Jump_Dust_5.png' },
    death:  { fileName: 'Pink_Monster_Death_8.png', frames: 8 },
    hurt:   { fileName: 'Pink_Monster_Hurt_4.png', frames: 4 },
    climb:  { fileName: 'Pink_Monster_Climb_4.png', frames: 4 },
    say:    { fileName: 'Pink_Monster_Attack1_4.png', frames: 4 },
    throw:  { fileName: 'Pink_Monster_Throw_4.png', frames: 4 },
    push:   { fileName: 'Pink_Monster_Push_6.png', frames: 6, dust: 'Walk_Run_Push_Dust_6.png' },
    flag:   { fileName: 'Pink_Monster_Idle_4.png', frames: 4 }
  },
  dude: {
    idle:   { fileName: 'Dude_Monster_Idle_4.png', frames: 4 },
    move:   { fileName: 'Dude_Monster_Run_6.png', frames: 6, dust: 'Walk_Run_Push_Dust_6.png' },
    jump:   { fileName: 'Dude_Monster_Jump_8.png', frames: 8, dust: 'Double_Jump_Dust_5.png' },
    death:  { fileName: 'Dude_Monster_Death_8.png', frames: 8 },
    hurt:   { fileName: 'Dude_Monster_Hurt_4.png', frames: 4 },
    climb:  { fileName: 'Dude_Monster_Climb_4.png', frames: 4 },
    say:    { fileName: 'Dude_Monster_Attack1_4.png', frames: 4 },
    throw:  { fileName: 'Dude_Monster_Throw_4.png', frames: 4 },
    push:   { fileName: 'Dude_Monster_Push_6.png', frames: 6, dust: 'Walk_Run_Push_Dust_6.png' },
    flag:   { fileName: 'Dude_Monster_Idle_4.png', frames: 4 }
  },
  owlet: {
    idle:   { fileName: 'Owlet_Monster_Idle_4.png', frames: 4 },
    move:   { fileName: 'Owlet_Monster_Run_6.png', frames: 6, dust: 'Walk_Run_Push_Dust_6.png' },
    jump:   { fileName: 'Owlet_Monster_Jump_8.png', frames: 8, dust: 'Double_Jump_Dust_5.png' },
    death:  { fileName: 'Owlet_Monster_Death_8.png', frames: 8 },
    hurt:   { fileName: 'Owlet_Monster_Hurt_4.png', frames: 4 },
    climb:  { fileName: 'Owlet_Monster_Climb_4.png', frames: 4 },
    say:    { fileName: 'Owlet_Monster_Attack1_4.png', frames: 4 },
    throw:  { fileName: 'Owlet_Monster_Throw_4.png', frames: 4 },
    push:   { fileName: 'Owlet_Monster_Push_6.png', frames: 6, dust: 'Walk_Run_Push_Dust_6.png' },
    flag:   { fileName: 'Owlet_Monster_Idle_4.png', frames: 4 }
  }
};

// --- 2. COMPONENT CON: VÒNG TRÒN TIẾN TRÌNH ---
const ProgressRing = ({ current, total }) => {
  const radius = 14;
  const stroke = 3;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (current / total) * circumference;

  return (
    <div className="relative flex items-center justify-center w-10 h-10">
        <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
            <circle stroke="rgba(255,255,255,0.2)" strokeWidth={stroke} fill="transparent" r={normalizedRadius} cx={radius} cy={radius} />
            <circle stroke="#4ade80" strokeWidth={stroke} strokeDasharray={circumference + ' ' + circumference} style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.3s ease' }} strokeLinecap="round" fill="rgba(0,0,0,0.5)" r={normalizedRadius} cx={radius} cy={radius} />
        </svg>
        <span className="absolute text-[9px] font-bold text-white font-mono tracking-tighter">{current}/{total}</span>
    </div>
  );
};

// --- 3. COMPONENT CHÍNH ---
const Stage = ({ 
  x, y, rotation, status, characterId, speechText, 
  visible = true, scale = 1, speed = 1, 
  waitTimer, friend,
  activeLoopType, repeatProgress, isFrozen = false
}) => {
  const safeId = characterId || 'pink';
  const lastPlayedText = useRef('');
  const currentConfig = CHAR_CONFIG[safeId] || CHAR_CONFIG.pink;
  const animData = currentConfig[status] || currentConfig.idle;
  
  const normalizedRot = ((rotation % 360) + 360) % 360;
  const isFacingLeft = normalizedRot > 90 && normalizedRot < 270;

  let cssRotation = `rotate(${rotation - 90}deg)`;
  let cssScaleX = 1;
  if (isFacingLeft) {
      cssScaleX = 1; // Rotation handles direction
  }

  const isThinking = useMemo(() => {
    if (!speechText) return false;
    return speechText.includes('...') || speechText === 'Zzz' || speechText === 'Hmm' || speechText.startsWith('(');
  }, [speechText]);

  const bubbleBorderColor = isThinking ? 'border-slate-400' : 'border-cyan-500';
  const bubbleBgColor = isThinking ? 'bg-white' : 'bg-cyan-100';

  const [showCheckmark, setShowCheckmark] = useState(false);

  useEffect(() => {
    if (speechText && typeof speechText === 'string') {
        if (lastPlayedText.current !== speechText) {
            lastPlayedText.current = speechText;
        }
    }
    if (activeLoopType === 'repeat' && repeatProgress) {
        if (repeatProgress.current === repeatProgress.total) {
            audioManager.playSfx('ding.mp3'); 
            setShowCheckmark(true);
            const timer = setTimeout(() => setShowCheckmark(false), 1000);
            return () => clearTimeout(timer);
        }
    }
  }, [speechText, activeLoopType, repeatProgress]);

  const baseAnimSpeed = status === 'death' ? 1.0 : 0.3;
  const animDuration = `${baseAnimSpeed / speed}s`;
  const moveDuration = `${0.6 / speed}s`;

  const characterStyle = useMemo(() => ({
    top: '50%', left: '50%',
    transition: isFrozen ? 'none' : `transform ${moveDuration} cubic-bezier(0.4, 0, 0.2, 1), filter 0.5s ease`,
    transform: `translate3d(-50%, -100%, 0) translate3d(${x}px, ${y * -1}px, 0) scale3d(${cssScaleX * (visible ? scale : 0)}, ${visible ? scale : 0}, 1) ${cssRotation}`,
    opacity: visible ? 1 : 0,
    filter: `drop-shadow(0 4px 6px rgba(0,0,0,0.3))`
  }), [x, y, cssScaleX, scale, visible, cssRotation, moveDuration, isFrozen]);

  const friendStyle = useMemo(() => {
    if (!friend) return {};
    return {
      top: '50%', left: '50%',
      transform: `translate3d(-50%, -100%, 0) translate3d(${friend.x}px, ${friend.y * -1}px, 0)`,
      transition: `transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.5s ease-in`,
      opacity: 1
    };
  }, [friend]);

  const freezeOverlay = isFrozen ? (
    <div className="absolute inset-0 z-[100] bg-cyan-900/40 backdrop-blur-[1px] flex flex-col items-center justify-center animate-fade-in mix-blend-hard-light">
        <div className="absolute inset-0 bg-[url('assets/images/ui/noise.svg')] opacity-20 pointer-events-none"></div>
        <div className="p-3 px-8 bg-cyan-600/90 border-4 border-white shadow-[0_0_50px_rgba(34,211,238,0.8)] rounded-xl animate-pulse transform scale-125">
             <span className="text-3xl font-black tracking-[0.2em] text-white uppercase drop-shadow-lg">❄ FROZEN ❄</span>
        </div>
    </div>
  ) : null;

  // New Effects for Page and Stop
  const pageFlash = status === 'page' ? (
     <div className="absolute inset-0 z-[60] bg-white animate-flash pointer-events-none"></div>
  ) : null;

  const stopOverlay = status === 'stop' ? (
     <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm pointer-events-none animate-fade-in">
        <div className="w-32 h-32 bg-red-600 border-4 border-white shadow-[0_0_40px_rgba(220,38,38,0.8)] flex items-center justify-center transform rotate-12">
            <span className="text-white text-4xl font-black uppercase">STOP</span>
        </div>
     </div>
  ) : null;

  // Enhance Bump Effect: Shockwave
  const bumpEffect = status === 'push' || status === 'throw' ? (
     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-4 border-white rounded-full animate-ping opacity-0 pointer-events-none z-10"></div>
  ) : null;

  return (
    <div className={`relative w-full h-full overflow-hidden border-4 border-slate-700 bg-slate-900 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] rounded-2xl font-mono 
        ${status === 'hurt' || status === 'push' ? 'animate-shake-impact' : ''}
    `}>
      {freezeOverlay}
      {pageFlash}
      {stopOverlay}
      {bumpEffect}

      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(56,189,248,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.8)] z-0"></div>
        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-cyan-400/80 shadow-[0_0_8px_rgba(34,211,238,0.8)] z-0"></div>
      </div>

      <div className="absolute z-50 px-4 py-2 border rounded-lg shadow-lg top-4 right-4 bg-slate-950/80 text-cyan-400 border-cyan-500/30 backdrop-blur-md">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Coordinates</div>
        <div className="flex gap-4 font-mono text-sm font-bold text-cyan-300/90">
          <span className="flex items-center"><span className="inline-block w-2 h-2 mr-2 bg-red-500 rounded-full opacity-70"></span>X: <span className={x !== 0 ? "text-white" : ""}>{Math.round(x)}</span></span>
          <span className="flex items-center"><span className="inline-block w-2 h-2 mr-2 rounded-full bg-cyan-400 opacity-70"></span>Y: <span className={y !== 0 ? "text-white" : ""}>{Math.round(y)}</span></span>
        </div>
      </div>

      {waitTimer !== null && waitTimer !== undefined && (
        <div className="absolute z-50 flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
           <div className="flex items-center justify-center w-24 h-24 bg-slate-900/90 border-4 border-cyan-400 rounded-full shadow-[0_0_40px_rgba(34,211,238,0.8)] animate-pulse">
              <span className="font-mono text-5xl font-bold text-white">{waitTimer}</span>
           </div>
           <div className="mt-2 text-sm font-bold tracking-widest uppercase text-cyan-300 animate-bounce">Waiting...</div>
        </div>
      )}

      {friend && friend.visible && CHAR_CONFIG[friend.id] && (
        <div className="absolute z-10 w-32 h-32 will-change-transform" style={friendStyle}>
           <img 
             src={`assets/images/characters/${friend.id}/${CHAR_CONFIG[friend.id].idle.fileName}`}
             alt="Friend"
             className="absolute top-0 left-0 w-full h-full pixelated" 
             style={{ width: '400%', animation: `sprite-slide 0.8s steps(4) infinite` }} 
           />
           <div className="absolute top-0 flex justify-center w-full -mt-8 animate-bounce">
              <span className="text-2xl filter drop-shadow-lg">💖</span>
           </div>
        </div>
      )}

      {(status === 'hurt' || status === 'push') && (
        <img src={`assets/images/characters/${safeId}/Rock1.png`} className="absolute z-0 w-12 h-12 top-1/2 left-1/2 pixelated opacity-90" style={{ transform: `translate(30px, -20px)` }} alt="Obstacle" />
      )}

      <div className="absolute z-20 w-32 h-32 will-change-transform" style={characterStyle}>
        
        {animData.dust && visible && !isFrozen && (
          <div className="absolute bottom-0 w-full -translate-x-1/2 pointer-events-none left-1/2 h-1/2 opacity-60 mix-blend-screen"
            style={{ 
              backgroundImage: `url('assets/images/characters/${safeId}/${animData.dust}')`,
              backgroundSize: `${(status === 'jump' ? 5 : 6) * 100}% 100%`, 
              animation: `sprite-slide ${animDuration} steps(${status === 'jump' ? 5 : 6}) infinite`, 
              imageRendering: 'pixelated' 
            }} />
        )}

        <div className="relative w-full h-full overflow-hidden"
             style={{ animation: status === 'jump' && !isFrozen ? `bounce-arc ${moveDuration} infinite` : 'none' }}>
          <img src={`assets/images/characters/${safeId}/${animData.fileName}`} alt="Character"
            className={`absolute relative top-0 left-0 z-10 h-full max-w-none pixelated ${isFrozen ? 'brightness-150 contrast-125 hue-rotate-180 sepia' : ''}`}
            style={{ 
              width: `${animData.frames * 100}%`, 
              animation: `sprite-slide ${animDuration} steps(${animData.frames}) infinite`,
              animationPlayState: isFrozen ? 'paused' : 'running'
            }} />
        </div>

        <div className="absolute top-0 z-40 flex flex-col items-center w-full gap-1 -translate-x-1/2 -translate-y-full left-1/2" 
             style={{ transform: `rotate(${-(rotation - 90)}deg)` }}>
            
            {activeLoopType === 'forever' && !isFrozen && (
                <div className="relative flex items-center justify-center w-16 h-16 -mt-8">
                    <div className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 font-black animate-pulse filter drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] pb-2">∞</div>
                    <div className="absolute inset-0 w-full h-full border-4 border-dotted rounded-full opacity-60 border-cyan-400/60 animate-spin-slow"></div>
                    <div className="absolute inset-0 w-full h-full border-2 border-dashed rounded-full opacity-40 border-white/40 animate-reverse-spin"></div>
                </div>
            )}

            {activeLoopType === 'repeat' && repeatProgress && !showCheckmark && !isFrozen && (
                <div className="p-1.5 mb-2 border-2 rounded-full shadow-lg bg-slate-900/90 backdrop-blur-md border-cyan-400">
                    <ProgressRing current={repeatProgress.current} total={repeatProgress.total} />
                </div>
            )}

            {showCheckmark && (
                <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-full shadow-[0_0_20px_rgba(34,197,94,1)] animate-pop-in mb-2">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
            )}
        </div>

        {status === 'flag' && (
          <div className="absolute z-30 -translate-x-1/2 -top-16 left-1/2" style={{ transform: isFacingLeft ? 'scaleX(-1)' : 'none' }}>
             <div className="flex items-center justify-center w-12 h-12 bg-white border-2 border-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.6)] animate-bounce">
                <span className="text-2xl">🚩</span>
             </div>
          </div>
        )}

        {(status === 'throw' || status === 'push') && (
          <div className="absolute flex items-center justify-center w-8 h-8 bg-slate-800 border-2 border-orange-400 rounded-full shadow-[0_0_10px_rgba(251,146,60,0.8)] -top-8 -right-8 animate-bounce z-20">
             <span>💥</span>
          </div>
        )}

        {speechText && visible && (
          <div className="absolute z-30 -translate-x-1/2 -top-16 left-1/2" style={{ transform: isFacingLeft ? 'scaleX(-1)' : 'none' }}>
            <div className={`relative px-4 py-2 text-xs font-bold text-cyan-950 ${bubbleBgColor} border-2 ${bubbleBorderColor} ${isThinking ? 'rounded-[20px]' : 'rounded-lg'} shadow-[0_0_15px_rgba(34,211,238,0.5)] min-w-[80px] text-center whitespace-nowrap animate-pop-in`}>
              {speechText === 'Grrr' ? <span className="text-lg font-black text-red-600 uppercase tracking-widest shake">GRRR!</span> : speechText}
              {isThinking ? (
                 <>
                   <div className={`absolute -bottom-2 left-6 w-2 h-2 ${bubbleBgColor} border ${bubbleBorderColor} rounded-full`}></div>
                   <div className={`absolute -bottom-4 left-4 w-1.5 h-1.5 ${bubbleBgColor} border ${bubbleBorderColor} rounded-full`}></div>
                 </>
              ) : (
                 <div className={`absolute -bottom-[8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-${isThinking ? 'white' : 'cyan-500'}`}></div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stage;
