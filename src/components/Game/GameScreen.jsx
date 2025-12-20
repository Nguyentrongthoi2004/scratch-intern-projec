import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import confetti from 'canvas-confetti';

import { levels } from '../../data/levels';
import ResultModal from '../UI/ResultModal';
import SettingsModal from '../UI/SettingsModal';
import GameControls from './GameControls';
import GamePanel from './GamePanel';
import GameMonitor from './GameMonitor';
import TutorialScreen from '../Tutorial/TutorialScreen';

// ================== THEME DECORATIONS ==================
const ThemeDecorationsComponent = ({ theme, lowEffects, fxDensity }) => {
  const isDark = theme === 'dark';
  const density = Math.max(0, Math.min(100, fxDensity ?? 60));
  const fx = lowEffects ? 0 : density / 100;

  if (fx === 0) {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: isDark ? 'radial-gradient(circle at top, #020617 0, #020617 40%, #020617 100%)' : 'linear-gradient(to bottom, #e0f2fe 0%, #bfdbfe 40%, #fef3c7 100%)' }} />
        <div className="absolute bottom-0 left-1/2 w-[900px] h-[200px] -translate-x-1/2 rounded-full" style={{ background: isDark ? 'radial-gradient(circle at top, rgba(15,118,110,0.5), transparent 70%)' : 'radial-gradient(circle at top, rgba(56,189,248,0.6), transparent 70%)', filter: 'blur(40px)', opacity: 0.25 }} />
      </div>
    );
  }

  if (lowEffects) {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: isDark ? 'radial-gradient(circle at top, #020617 0, #020617 40%, #020617 100%)' : 'linear-gradient(to bottom, #e0f2fe 0%, #bfdbfe 40%, #fef3c7 100%)' }} />
      </div>
    );
  }

  const lightStarCount = Math.round(4 + fx * 32);
  const darkStarCount = Math.round(5 + fx * 35);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0" style={{ background: isDark ? 'radial-gradient(circle at top, #020617 0, #020617 40%, #020617 100%)' : 'linear-gradient(to bottom, #e0f2fe 0%, #bfdbfe 40%, #fef3c7 100%)' }} />
      {!isDark && (
        <>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at top, #e0f2fe 0%, #bae6fd 45%, #93c5fd 75%, #60a5fa 100%)', opacity: 0.2 + fx * 0.8 }} />
          <div className="absolute inset-x-[-20%] bottom-[-30%] h-[120%]" style={{ opacity: fx * 0.7, backgroundImage: 'linear-gradient(rgba(56,189,248,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.6) 1px, transparent 1px)', backgroundSize: '90px 90px', transform: 'perspective(700px) rotateX(67deg) translateY(-40px) scale(1.35)' }} />
          <div className="absolute bottom-0 left-1/2 w-[1300px] h-[260px] -translate-x-1/2" style={{ background: 'radial-gradient(circle at top, rgba(125,211,252,1), transparent 70%)', opacity: fx * 0.9, filter: `blur(${20 + fx * 60}px)` }} />
          <motion.div className="absolute rounded-full top-12 right-16 w-28 h-28 will-change-transform" style={{ background: 'radial-gradient(circle at 30% 30%, #fef9c3, #fde047, #fb923c)', boxShadow: '0 0 60px rgba(253,224,71,0.9), 0 0 140px rgba(251,191,36,0.7)', opacity: 0.4 + fx * 0.6 }} animate={{ y: [0, -6, 0], scale: [1, 1.03, 1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
          {Array.from({ length: lightStarCount }).map((_, i) => (
            <motion.div key={i} className="absolute bg-white rounded-full" style={{ width: Math.random() * 2 + 1, height: Math.random() * 2 + 1, top: `${Math.random() * 65}%`, left: `${Math.random() * 100}%`, opacity: 0.1 + fx * 0.9 }} animate={{ opacity: [0.1, 0.8, 0.1] }} transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }} />
          ))}
          {[0, 1].map((i) => (
            <motion.div key={i} className="absolute -top-10 left-[-30%] w-[70vw] h-10 bg-gradient-to-r from-cyan-300/60 via-sky-400/70 to-transparent skew-y-[-10deg] will-change-transform" style={{ opacity: 0.1 + fx * 0.8 }} animate={{ x: ['-30vw', '120vw'] }} transition={{ duration: 26 + i * 6, repeat: Infinity, delay: i * 4, ease: 'linear' }} />
          ))}
        </>
      )}
      {isDark && (
        <>
          <motion.div className="absolute left-[-10%] top-[12%] w-[120%] h-[150px] will-change-transform" style={{ background: `radial-gradient(circle at 20% 50%, rgba(249,115,22,0.55), transparent 60%), radial-gradient(circle at 50% 40%, rgba(217,70,239,0.55), transparent 65%), radial-gradient(circle at 80% 60%, rgba(56,189,248,0.55), transparent 65%)`, filter: `blur(${40 + fx * 40}px)`, opacity: 0.15 + fx * 0.6 }} animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.04, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
          <div className="absolute inset-x-[-20%] bottom-[-35%] h-[120%]" style={{ opacity: fx * 0.55, backgroundImage: 'linear-gradient(rgba(8,145,178,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(8,145,178,0.6) 1px, transparent 1px)', backgroundSize: '80px 80px', transform: 'perspective(650px) rotateX(68deg) translateY(-40px) scale(1.4)' }} />
          <div className="absolute bottom-0 left-1/2 w-[1300px] h-[320px] -translate-x-1/2" style={{ background: 'radial-gradient(circle at top, rgba(56,189,248,0.95), transparent 65%)', filter: `blur(${40 + fx * 50}px)`, opacity: fx * 0.85 }} />
          <motion.div className="absolute rounded-full top-10 right-16 w-28 h-28 will-change-transform" style={{ background: 'radial-gradient(circle at 25% 30%, #e2e8f0, #94a3b8, #64748b)', boxShadow: 'inset -6px -6px 18px rgba(15,23,42,0.95), 0 0 40px rgba(168,85,247,0.9)', opacity: 0.35 + fx * 0.65 }} animate={{ y: [0, -6, 0], scale: [1, 1.02, 1] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
            <div className="absolute w-5 h-5 rounded-full top-4 left-6 bg-slate-500/25" />
            <div className="absolute rounded-full bottom-6 right-7 w-7 h-7 bg-slate-500/25" />
          </motion.div>
          {Array.from({ length: darkStarCount }).map((_, i) => (
            <motion.div key={i} className="absolute rounded-full bg-cyan-100" style={{ width: Math.random() * 2 + 1, height: Math.random() * 2 + 1, top: `${Math.random() * 60}%`, left: `${Math.random() * 100}%` }} animate={{ opacity: [0, 0.7 + fx * 0.3, 0] }} transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }} />
          ))}
          {[0, 1].map((i) => (
            <motion.div key={i} className="absolute -top-8 left-[-25%] w-[70vw] h-9 bg-gradient-to-r from-purple-500/50 via-cyan-400/50 to-transparent skew-y-[-10deg] will-change-transform" style={{ opacity: 0.15 + fx * 0.7 }} animate={{ x: ['-30vw', '120vw'] }} transition={{ duration: 26 + i * 6, repeat: Infinity, delay: 2 + i * 4, ease: 'linear' }} />
          ))}
        </>
      )}
    </div>
  );
};

const ThemeDecorations = React.memo(ThemeDecorationsComponent);
ThemeDecorations.displayName = 'ThemeDecorations';

// ================== GAME SCREEN ==================
const GameScreen = ({ difficulty, onBack, characterId, setUiScale, uiScale }) => {
  
  // State mới: Refresh Key dùng để ép buộc random lại level
  const [refreshKey, setRefreshKey] = useState(0);

  // LOGIC CHỌN LEVEL (ĐÃ SỬA: Thêm refreshKey vào dependency để random lại khi replay)
  const gameLevels = useMemo(() => {
    const allForDifficulty = levels.filter((lvl) => lvl.difficulty === difficulty);
    // Xáo trộn mảng câu hỏi thật sự
    const shuffled = [...allForDifficulty].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  }, [difficulty, refreshKey]); // <-- QUAN TRỌNG: refreshKey thay đổi sẽ kích hoạt shuffle lại

  // --- STATE QUẢN LÝ ---
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [lives, setLives] = useState(5);
  const [modal, setModal] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [hideUI, setHideUI] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const [enableBlur, setEnableBlur] = useState(true);
  const [enableSound, setEnableSound] = useState(true);
  const [lowEffects, setLowEffects] = useState(false);
  const [fxDensity, setFxDensity] = useState(60);

  // State Thời gian giới hạn (30s)
  const INITIAL_TIME = 30;
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);

  // State Nhân vật (Khai báo Friend và Active ID mới)
  const [activeCharacterId, setActiveCharacterId] = useState(characterId || 'pink');
  
  const [characterState, setCharacterState] = useState({
    x: 0,
    y: 0,
    rotation: 90,
    status: 'idle',
    visible: true,
    scale: 1,
    speechText: null,
    speed: 1,       // Tốc độ animation
    waitTimer: null, // Số giây đang đếm ngược của lệnh Wait
    isWaiting: false, // Cờ báo hiệu đang trong trạng thái Wait
    friend: null    // Thông tin nhân vật bạn bè (random xuất hiện)
  });

  const [stats, setStats] = useState({
    correct: 0,
    wrong: 0,
    total: gameLevels.length,
  });

  // AUDIO VOLUME STATE
  const [bgmVolume, setBgmVolume] = useState(30); // 0-100
  const [sfxVolume, setSfxVolume] = useState(90); // 0-100

  const [answerFeedback, setAnswerFeedback] = useState(null);
  const feedbackTimeoutRef = useRef(null);
  // Ref để quản lý timeouts, tránh leak memory và lỗi khi unmount
  const timeoutsRef = useRef([]);

  const containerControls = useAnimation();
  const currentLevel = gameLevels[currentLevelIndex];

  // Helper an toàn để set timeout và tự động track
  const safeSetTimeout = (callback, delay) => {
    const id = setTimeout(() => {
      // Xóa id khỏi danh sách khi chạy xong
      timeoutsRef.current = timeoutsRef.current.filter(tId => tId !== id);
      callback();
    }, delay);
    timeoutsRef.current.push(id);
    return id;
  };

  // Helper an toàn để set interval (dùng cho wait command)
  const safeSetInterval = (callback, delay) => {
    const id = setInterval(callback, delay);
    // Interval cần được clear thủ công, nhưng ta lưu vào đây để clear all khi cần
    timeoutsRef.current.push(id); // Lưu chung vào mảng ref
    return id;
  };

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(id => {
      clearTimeout(id);
      clearInterval(id);
    });
    timeoutsRef.current = [];
  };

  // Cleanup khi unmount
  useEffect(() => {
    return () => clearAllTimeouts();
  }, []);

  // --- 1. HELPER ÂM THANH ---
  const playSfx = (filename) => {
    if (!enableSound) return;
    const audio = new Audio(`/assets/sounds/${filename}`);
    audio.volume = Math.max(0, Math.min(1, sfxVolume / 100));
    audio.play().catch((err) => {});
  };

  // --- 2. NHẠC NỀN ---
  useEffect(() => {
    const bgMusic = new Audio('/assets/sounds/bg.mp3');
    bgMusic.loop = true;
    bgMusic.volume = Math.max(0, Math.min(1, bgmVolume / 100));

    // Logic: Nếu đang bật sound VÀ không mở settings thì mới hát
    if (enableSound && !showSettings) {
      bgMusic.play().catch(() => {});
    } else {
      bgMusic.pause();
    }

    return () => {
      bgMusic.pause();
      bgMusic.currentTime = 0;
    };
  }, [enableSound, showSettings, bgmVolume]);

  // --- 3. ĐỒNG HỒ ĐẾM NGƯỢC (GAME TIMER) ---
  useEffect(() => {
    let timer;
    // Chỉ đếm khi còn mạng, chưa hiện bảng kết quả, và còn thời gian
    // Fix: Nếu showSettings bật lên thì KHÔNG đếm, nhưng cũng KHÔNG xét thua nếu timeLeft <= 0 (vì đang pause)
    if (showSettings) {
       return;
    }

    if (lives > 0 && !modal && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft <= 0 && !modal) {
      // Hết giờ -> Thua
      setTimeLeft(0);
      playSfx('lose.mp3');
      setModal({ type: 'gameover', message: 'Hết thời gian!\nBạn đã không hoàn thành nhiệm vụ kịp lúc.' });
    }
    return () => clearInterval(timer);
  }, [lives, modal, showSettings, timeLeft]);

  // --- 4. KHỞI TẠO / RESET ---
  useEffect(() => {
    setCurrentLevelIndex(0);
    setLives(5);
    resetCharacter();
    setModal(null);
    setStats({ correct: 0, wrong: 0, total: gameLevels.length });
    setTimeLeft(INITIAL_TIME); // Reset 30s
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
  }, [difficulty, gameLevels.length]);

  const handleOpenGuide = () => { setShowSettings(false); setShowGuide(true); };

  const resetCharacter = () => {
    // Clear các animation đang chạy dở
    clearAllTimeouts();
    setCharacterState({
      x: 0, y: 0, rotation: 90, status: 'idle', visible: true, scale: 1, speechText: null, speed: 1, waitTimer: null, isWaiting: false, friend: null
    });
    // Reset nhân vật về ban đầu
    setActiveCharacterId(characterId || 'pink');
  };

  const restartGame = () => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    // Clear mọi timeout cũ
    clearAllTimeouts();

    // Kích hoạt random lại câu hỏi
    setRefreshKey(prev => prev + 1);
    
    setCurrentLevelIndex(0);
    setLives(5);
    resetCharacter();
    setModal(null);
    setStats({ correct: 0, wrong: 0, total: gameLevels.length });
    setAnswerFeedback(null);
    setTimeLeft(INITIAL_TIME);
  };

  // --- HELPER: LẤY NHÂN VẬT NGẪU NHIÊN ---
  const getRandomCharacter = (excludeId) => {
    const chars = ['pink', 'dude', 'owlet'];
    const available = chars.filter(c => c !== excludeId);
    return available[Math.floor(Math.random() * available.length)];
  };

  // =========================================================================
  // LOGIC XỬ LÝ COMBO CHUỖI HÀNH ĐỘNG
  // =========================================================================

  // A. Xử lý 1 lệnh đơn lẻ
  const processSingleCommand = (cmd) => {
    const GRID_SIZE = 40; 
    const command = cmd.trim();
    let actionStatus = 'idle';
    
    // Regex nhận diện lệnh
    const moveMatch = command.match(/(?:Move )?(Right|Left|Up|Down|Forward|Backward)(?: (\d+))?/i);
    const hopMatch  = command.match(/Hop(?: (\d+))?/i);
    // Regex cho Color và Friend
    const colorMatch = command.match(/Color|Change/i);
    const friendMatch = command.match(/Friend|Message/i);
    
    setCharacterState((prev) => {
      let next = { ...prev };
      
      // 1. TỐC ĐỘ
      if (command.match(/Fast/i))      next.speed = 3; // Siêu nhanh
      else if (command.match(/Slow/i)) next.speed = 0.5; // Slow motion
      else if (command.match(/Reset Speed/i)) next.speed = 1;

      // 2. DI CHUYỂN
      if (moveMatch) {
        const dir = moveMatch[1].toLowerCase();
        const steps = parseInt(moveMatch[2] || '1');
        const px = steps * GRID_SIZE;

        if (dir === 'right') { next.x += px; next.rotation = 90; }
        if (dir === 'left')  { next.x -= px; next.rotation = -90; }
        if (dir === 'up')    { next.y += px; next.rotation = 0; }
        if (dir === 'down')  { next.y -= px; next.rotation = 180; }
        
        next.x = Math.max(-460, Math.min(460, next.x));
        next.y = Math.max(-240, Math.min(240, next.y));
      }
      // 3. NHẢY (HOP)
      else if (hopMatch) {
        const steps = parseInt(hopMatch[1] || '0');
        const px = steps * GRID_SIZE;
        const rad = (prev.rotation - 90) * (Math.PI / 180);
        next.x += Math.round(Math.cos(rad)) * px;
        next.y -= Math.round(Math.sin(rad)) * px;
        next.x = Math.max(-460, Math.min(460, next.x));
        next.y = Math.max(-240, Math.min(240, next.y));
      }
      // 4. NGOẠI HÌNH & LOGIC MỚI
      else if (command.match(/Hide/i))   next.visible = false;
      else if (command.match(/Show/i))   next.visible = true;
      else if (command.match(/Grow/i))   next.scale = Math.min(2, prev.scale + 0.5);
      else if (command.match(/Shrink/i)) next.scale = Math.max(0.5, prev.scale - 0.3);
      else if (command.match(/Reset/i))  { next.scale = 1; next.x = 0; next.y = 0; next.visible = true; next.speed = 1; next.friend = null; setActiveCharacterId(characterId || 'pink'); }
      
      // LOGIC MỚI: XOAY & ĐỔI MÀU (Change Character)
      else if (colorMatch) {
        // Xoay 1 vòng (360 độ)
        next.rotation += 360; 
        // Đổi nhân vật sang ID khác ngẫu nhiên
        const newChar = getRandomCharacter(activeCharacterId);
        setActiveCharacterId(newChar);
      }

      return next;
    });

    // Âm thanh & Animation Status
    if (moveMatch) {
      const dir = moveMatch[1].toLowerCase();
      if (dir === 'up') { actionStatus = 'jump'; playSfx('jump.mp3'); }
      else if (dir === 'down') { actionStatus = 'climb'; playSfx('climb.mp3'); }
      else { actionStatus = 'move'; playSfx('pop.mp3'); }
    }
    else if (hopMatch) { actionStatus = 'jump'; playSfx('jump.mp3'); }
    else if (command.match(/Say|Think/i)) { actionStatus = 'say'; playSfx('pop.mp3'); }
    
    // LOGIC MỚI: KÍCH HOẠT BẠN (FRIEND)
    else if (friendMatch) {
       actionStatus = 'throw'; // Diễn hoạt ném tin nhắn
       playSfx('pop.mp3'); // SỬA LỖI: Dùng pop.mp3 thay vì win.mp3
       
       // Sau khi ném xong, bạn sẽ xuất hiện
       safeSetTimeout(() => {
          setCharacterState(prev => {
             const rad = (prev.rotation - 90) * (Math.PI / 180);
             // Tính vị trí bạn xuất hiện (cách 2 ô về phía trước)
             const friendX = prev.x + Math.round(Math.cos(rad)) * 80;
             const friendY = prev.y - Math.round(Math.sin(rad)) * 80;
             
             return {
               ...prev,
               friend: { 
                 id: getRandomCharacter(activeCharacterId), 
                 x: friendX, 
                 y: friendY,
                 visible: true 
               }
             };
          });
          playSfx('pop.mp3'); // SỬA LỖI: Không phát nhạc chiến thắng ở đây nữa
       }, 500);
    }
    
    else if (command.match(/Send|Broadcast/i)) { actionStatus = 'throw'; playSfx('pop.mp3'); }
    else if (command.match(/Flag/i)) { actionStatus = 'flag'; playSfx('pop.mp3'); }
    else if (command.match(/Bump/i)) { actionStatus = 'push'; playSfx('pop.mp3'); }
    else if (command.match(/Pop/i))  { playSfx('pop.mp3'); }

    // Xử lý Text
    if (command.match(/Say|Think/i)) {
       const text = command.replace(/Say|Think/i, '').trim() || 'Hi!';
       setCharacterState(prev => ({ ...prev, speechText: text }));
       safeSetTimeout(() => setCharacterState(p => ({...p, speechText: null})), 1000);
    }

    // Các lệnh không cần animation move/jump thì giữ nguyên status hiện tại
    if (command.match(/Fast|Slow|Hide|Show|Grow|Shrink|Reset|Color|Change/i)) return 'current';
    return actionStatus;
  };

  // B. Điều phối chuỗi lệnh (Sequence Executor)
  const executeBlockAction = (fullBlockText) => {
    // Tách chuỗi: "Right 2 -> Hop -> Wait 3"
    const actions = fullBlockText.split(/\s*->\s*|\n/).filter(s => s.trim() !== '');
    let accumulatedDelay = 0;

    actions.forEach((cmd) => {
      let duration = 600; 
      
      // --- XỬ LÝ LỆNH WAIT (TUA NHANH THỜI GIAN) ---
      const waitMatch = cmd.match(/Wait(?: (\d+))?/i);
      
      if (waitMatch) {
        const secsToWait = parseInt(waitMatch[1] || '1');
        
        // Thời gian thực tế để tua nhanh đồng hồ (1s)
        duration = 1000; 

        // Lên lịch thực hiện việc tua đồng hồ
        safeSetTimeout(() => {
          // 1. Nhân vật vào trạng thái Waiting (đứng yên)
          setCharacterState(prev => ({ ...prev, isWaiting: true, status: 'idle' }));
          
          // 2. Trừ thẳng thời gian (Tua nhanh)
          const stepInterval = 50; // Cập nhật mỗi 50ms
          const totalSteps = duration / stepInterval; // 20 bước
          const timePerStep = secsToWait / totalSteps; // Mỗi bước trừ bao nhiêu giây game

          let stepCount = 0;
          const intervalId = safeSetInterval(() => {
            stepCount++;
            setTimeLeft(prev => {
                const newValue = prev - timePerStep;
                return newValue > 0 ? newValue : 0;
            });
            
            if (stepCount >= totalSteps) {
              clearInterval(intervalId);
              // Xóa khỏi ref nếu cần, nhưng safeSetInterval lưu chung nên ok
            }
          }, stepInterval);

        }, accumulatedDelay);

        // Sau khi tua xong (hết duration) -> Tắt trạng thái Waiting
        safeSetTimeout(() => {
          setCharacterState(prev => ({ ...prev, isWaiting: false }));
        }, accumulatedDelay + duration);
      }
      else {
        // --- CÁC LỆNH KHÁC ---
        if (cmd.match(/Hop|Jump/i)) duration = 700;
        if (cmd.match(/Say|Think/i)) duration = 1200;
        if (cmd.match(/Pop|Hide|Show|Fast|Slow/i)) duration = 400;
        // Friend và Color cần thời gian diễn hoạt lâu hơn chút
        if (cmd.match(/Friend|Message/i)) duration = 1000; 
        if (cmd.match(/Color|Change/i)) duration = 800;

        safeSetTimeout(() => {
           const newStatus = processSingleCommand(cmd);
           if (newStatus !== 'current') {
             setCharacterState(prev => ({ ...prev, status: newStatus }));
           }
        }, accumulatedDelay);
      }

      // Cộng dồn thời gian để lệnh sau chờ lệnh trước
      accumulatedDelay += duration;
    });

    // Reset về Idle sau cùng
    safeSetTimeout(() => {
      setCharacterState(prev => ({ ...prev, status: 'idle', speechText: null }));
    }, accumulatedDelay + 100);
  };

  const buildSummaryMessage = (isWin) => {
    return `${isWin ? 'Hoàn thành!' : 'Thất bại!'}\nĐúng: ${stats.correct} | Sai: ${stats.wrong}`;
  };

  const goToNextLevel = () => {
    setAnswerFeedback(null);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    
    if (currentLevelIndex < gameLevels.length - 1) {
      setCurrentLevelIndex(prev => prev + 1);
      resetCharacter();
      setTimeLeft(INITIAL_TIME); // Reset 30s cho màn mới
    } else {
      playSfx('win.mp3');
      confetti({ particleCount: 200, spread: 70, origin: { y: 0.6 } });
      setModal({ type: 'win', message: buildSummaryMessage(true) });
    }
  };

  const handleBlockClick = (blockId) => {
    if (lives <= 0 || modal || showSettings || showGuide) return;
    const selectedBlock = currentLevel.options.find(opt => opt.id === blockId);
    if (!selectedBlock) return;
    
    const isCorrect = blockId === currentLevel.correctBlockId;

    if (isCorrect) {
      setStats(prev => ({ ...prev, correct: prev.correct + 1 }));
      setAnswerFeedback({ status: 'correct', selectedId: blockId, correctId: currentLevel.correctBlockId });
      
      // Thực thi chuỗi lệnh
      executeBlockAction(selectedBlock.text);
      
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      
      // Tính thời gian chờ (ước lượng dựa trên số lệnh)
      const actionCount = selectedBlock.text.split('->').length;
      const waitCount = (selectedBlock.text.match(/Wait/g) || []).length;
      const friendCount = (selectedBlock.text.match(/Friend/g) || []).length;
      
      // Cộng thêm thời gian nếu có Friend/Wait
      const waitTime = Math.max(2500, (actionCount * 900) + (waitCount * 200) + (friendCount * 500));
      
      feedbackTimeoutRef.current = setTimeout(goToNextLevel, waitTime);
    } else {
      setStats(prev => ({ ...prev, wrong: prev.wrong + 1 }));
      const newLives = lives - 1;
      setLives(newLives);
      setAnswerFeedback(null);

      // Phạt trừ thời gian khi sai
      setTimeLeft(prev => Math.max(0, prev - 5));

      if (newLives <= 0) {
        playSfx('lose.mp3');
        setCharacterState(prev => ({ ...prev, status: 'death' }));
        safeSetTimeout(() => setModal({ type: 'gameover', message: buildSummaryMessage(false) }), 1500);
      } else {
        playSfx('hurt.mp3');
        setCharacterState(prev => ({ ...prev, status: 'hurt' }));
        containerControls.start({ x: [-5, 5, -5, 5, 0], transition: { duration: 0.3 } });
        safeSetTimeout(goToNextLevel, 800);
      }
    }
  };

  // --- RENDER UI ---
  const isDark = theme === 'dark';
  const mainBgClass = isDark ? 'bg-slate-950' : 'bg-sky-100';
  const currentTheme = isDark
    ? {
        panel: 'bg-[#020617]/90 backdrop-blur-xl border-cyan-500/30 shadow-[0_0_40px_rgba(34,211,238,0.4)]',
        textTitle: 'text-cyan-300 font-extrabold', textSub: 'text-slate-300 font-semibold',
        blockTextMain: 'text-slate-50', blockTextSub: 'text-cyan-300',
        boxTask: 'bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-900/90 border-l-4 border-cyan-400 text-slate-100',
        blockWrapper: 'bg-slate-900/80 border-slate-700 hover:border-cyan-400 hover:bg-slate-900',
      }
    : {
        panel: 'bg-[#020617]/90 backdrop-blur-xl border-sky-400/40 shadow-[0_0_40px_rgba(56,189,248,0.5)]',
        textTitle: 'text-sky-300 font-extrabold', textSub: 'text-slate-200 font-semibold',
        blockTextMain: 'text-slate-50', blockTextSub: 'text-sky-300',
        boxTask: 'bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-900/90 border-l-4 border-sky-400 text-slate-100',
        blockWrapper: 'bg-slate-900/80 border-slate-700 hover:border-sky-400 hover:bg-slate-900',
      };

  if (!currentLevel) return <div className="flex items-center justify-center h-screen text-white bg-black">Loading...</div>;

  return (
    <motion.div className={`relative w-full h-screen overflow-hidden flex flex-col ${mainBgClass}`} animate={containerControls}>
      <ThemeDecorations theme={theme} lowEffects={lowEffects} fxDensity={fxDensity} />
      
      <div className="absolute top-0 left-0 z-50 p-4">
        <GameControls onBack={onBack} setShowSettings={setShowSettings} toggleTheme={() => setTheme(p => p==='light'?'dark':'light')} theme={theme} setHideUI={setHideUI} hideUI={hideUI} />
      </div>

      <AnimatePresence>
        {!hideUI && (
          <motion.div className="z-10 flex items-center justify-center flex-1 w-full min-h-0 px-8 pt-24 pb-8" initial={{opacity:0}} animate={{opacity:1}}>
            <div className="flex w-full h-full max-w-[1800px] items-center justify-between gap-12">
              <motion.div className="w-[28%] min-w-[350px] max-w-[450px] h-full flex-none flex flex-col will-change-transform" initial={{x:-50}} animate={{x:0}} transition={{delay:0.2}}>
                <GamePanel theme={theme} currentTheme={currentTheme} currentLevelIndex={currentLevelIndex} totalLevels={gameLevels.length} lives={lives} currentLevel={currentLevel} handleBlockClick={handleBlockClick} answerFeedback={answerFeedback} onSkipFeedback={goToNextLevel} />
              </motion.div>
              <motion.div className="relative flex items-center justify-end flex-1 h-full" initial={{x:50}} animate={{x:0}} transition={{delay:0.3}}>
                {!lowEffects && (
                  <div className="absolute right-32 top-1/2 -translate-y-1/2 w-[680px] h-[480px] rounded-[50%] pointer-events-none"
                    style={{ background: isDark ? '#22d3ee' : '#38bdf8', opacity: 0.05 + (fxDensity/100)*0.45, filter: `blur(${50+(fxDensity/100)*40}px)` }} />
                )}
                
                {/* TRUYỀN DỮ LIỆU XUỐNG GAME MONITOR */}
                <GameMonitor 
                    isDark={isDark} 
                    difficulty={difficulty} 
                    currentLevelIndex={currentLevelIndex} 
                    characterState={characterState} 
                    characterId={activeCharacterId} // Dùng ID động đã đổi màu
                    timeLeft={timeLeft} // Thời gian còn lại
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showGuide && <div className="fixed inset-0 z-[200] flex items-center justify-center"><motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={()=>setShowGuide(false)}/><div className="relative z-10 w-full h-full pointer-events-none"><div className="flex items-center justify-center w-full h-full p-4 pointer-events-auto"><div className="w-full max-w-[90vw] h-[90vh]"><TutorialScreen onBack={()=>setShowGuide(false)} isOverlay={true}/></div></div></div></div>}
        {showSettings && (
          <SettingsModal
            onClose={()=>setShowSettings(false)}
            onHome={onBack}
            onOpenGuide={handleOpenGuide}
            isBlur={enableBlur}
            toggleBlur={()=>setEnableBlur(v=>!v)}
            isSound={enableSound}
            toggleSound={()=>setEnableSound(v=>!v)}
            isLowEffects={lowEffects}
            toggleLowEffects={()=>setLowEffects(v=>!v)}
            fxDensity={fxDensity}
            onChangeFxDensity={setFxDensity}
            setUiScale={setUiScale}
            uiScale={uiScale}
            // Props âm thanh
            bgmVolume={bgmVolume}
            setBgmVolume={setBgmVolume}
            sfxVolume={sfxVolume}
            setSfxVolume={setSfxVolume}
          />
        )}
        {modal && !showSettings && <ResultModal type={modal.type} message={modal.message} theme={theme} stats={stats} onHome={onBack} onReplay={restartGame} onOpenSettings={()=>setShowSettings(true)} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default GameScreen;