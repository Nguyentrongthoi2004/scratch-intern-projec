// src/components/Game/GameScreen.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import confetti from 'canvas-confetti';

import { levels } from '../../data/levels';
import ResultModal from '../UI/ResultModal';
import SettingsModal from '../UI/SettingsModal';
import GameControls from './GameControls';
import GamePanel from './GamePanel';
import GameMonitor from './GameMonitor';
import TutorialScreen from '../Tutorial/TutorialScreen'; // Import TutorialScreen

// ================== CYBER GAMING BACKGROUND DECOR ==================
const ThemeDecorations = ({ theme, lowEffects, fxDensity }) => {
  const isDark = theme === 'dark';
  const density = Math.max(0, Math.min(100, fxDensity ?? 60));
  const fx = lowEffects ? 0 : density / 100;

  if (fx === 0) {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? 'radial-gradient(circle at top, #020617 0, #020617 40%, #020617 100%)'
              : 'linear-gradient(to bottom, #e0f2fe 0%, #bfdbfe 40%, #fef3c7 100%)',
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 w-[900px] h-[200px] -translate-x-1/2 rounded-full"
          style={{
            background: isDark
              ? 'radial-gradient(circle at top, rgba(15,118,110,0.5), transparent 70%)'
              : 'radial-gradient(circle at top, rgba(56,189,248,0.6), transparent 70%)',
            filter: 'blur(40px)',
            opacity: 0.25,
          }}
        />
      </div>
    );
  }

  if (lowEffects) {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? 'radial-gradient(circle at top, #020617 0, #020617 40%, #020617 100%)'
              : 'linear-gradient(to bottom, #e0f2fe 0%, #bfdbfe 40%, #fef3c7 100%)',
          }}
        />
      </div>
    );
  }

  const lightStarCount = Math.round(4 + fx * 32);
  const darkStarCount = Math.round(5 + fx * 35);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'radial-gradient(circle at top, #020617 0, #020617 40%, #020617 100%)'
            : 'linear-gradient(to bottom, #e0f2fe 0%, #bfdbfe 40%, #fef3c7 100%)',
        }}
      />

      {!isDark && (
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at top, #e0f2fe 0%, #bae6fd 45%, #93c5fd 75%, #60a5fa 100%)',
              opacity: 0.2 + fx * 0.8,
            }}
          />
          <div
            className="absolute inset-x-[-20%] bottom-[-30%] h-[120%]"
            style={{
              opacity: fx * 0.7,
              backgroundImage:
                'linear-gradient(rgba(56,189,248,0.6) 1px, transparent 1px), ' +
                'linear-gradient(90deg, rgba(56,189,248,0.6) 1px, transparent 1px)',
              backgroundSize: '90px 90px',
              transform:
                'perspective(700px) rotateX(67deg) translateY(-40px) scale(1.35)',
            }}
          />
          <div
            className="absolute bottom-0 left-1/2 w-[1300px] h-[260px] -translate-x-1/2"
            style={{
              background:
                'radial-gradient(circle at top, rgba(125,211,252,1), transparent 70%)',
              opacity: fx * 0.9,
              filter: `blur(${20 + fx * 60}px)`,
            }}
          />
          <motion.div
            className="absolute rounded-full top-12 right-16 w-28 h-28"
            style={{
              background:
                'radial-gradient(circle at 30% 30%, #fef9c3, #fde047, #fb923c)',
              boxShadow:
                '0 0 60px rgba(253,224,71,0.9), 0 0 140px rgba(251,191,36,0.7)',
              opacity: 0.4 + fx * 0.6,
            }}
            animate={{ y: [0, -6, 0], scale: [1, 1.03, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          {Array.from({ length: lightStarCount }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 2 + 1,
                height: Math.random() * 2 + 1,
                top: `${Math.random() * 65}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.1 + fx * 0.9,
              }}
              animate={{ opacity: [0.1, 0.8, 0.1] }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className="absolute -top-10 left-[-30%] w-[70vw] h-10 bg-gradient-to-r from-cyan-300/60 via-sky-400/70 to-transparent skew-y-[-10deg]"
              style={{ opacity: 0.1 + fx * 0.8 }}
              animate={{ x: ['-30vw', '120vw'] }}
              transition={{
                duration: 26 + i * 6,
                repeat: Infinity,
                delay: i * 4,
                ease: 'linear',
              }}
            />
          ))}
        </>
      )}

      {isDark && (
        <>
          <motion.div
            className="absolute left-[-10%] top-[12%] w-[120%] h-[150px]"
            style={{
              background: `
                radial-gradient(circle at 20% 50%, rgba(249,115,22,0.55), transparent 60%),
                radial-gradient(circle at 50% 40%, rgba(217,70,239,0.55), transparent 65%),
                radial-gradient(circle at 80% 60%, rgba(56,189,248,0.55), transparent 65%)
              `,
              filter: `blur(${40 + fx * 40}px)`,
              opacity: 0.15 + fx * 0.6,
            }}
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <div
            className="absolute inset-x-[-20%] bottom-[-35%] h-[120%]"
            style={{
              opacity: fx * 0.55,
              backgroundImage:
                'linear-gradient(rgba(8,145,178,0.6) 1px, transparent 1px), ' +
                'linear-gradient(90deg, rgba(8,145,178,0.6) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
              transform:
                'perspective(650px) rotateX(68deg) translateY(-40px) scale(1.4)',
            }}
          />
          <div
            className="absolute bottom-0 left-1/2 w-[1300px] h-[320px] -translate-x-1/2"
            style={{
              background:
                'radial-gradient(circle at top, rgba(56,189,248,0.95), transparent 65%)',
              filter: `blur(${40 + fx * 50}px)`,
              opacity: fx * 0.85,
            }}
          />
          <motion.div
            className="absolute rounded-full top-10 right-16 w-28 h-28"
            style={{
              background:
                'radial-gradient(circle at 25% 30%, #e2e8f0, #94a3b8, #64748b)',
              boxShadow:
                'inset -6px -6px 18px rgba(15,23,42,0.95), 0 0 40px rgba(168,85,247,0.9)',
              opacity: 0.35 + fx * 0.65,
            }}
            animate={{ y: [0, -6, 0], scale: [1, 1.02, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="absolute w-5 h-5 rounded-full top-4 left-6 bg-slate-500/25" />
            <div className="absolute rounded-full bottom-6 right-7 w-7 h-7 bg-slate-500/25" />
          </motion.div>
          {Array.from({ length: darkStarCount }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-cyan-100"
              style={{
                width: Math.random() * 2 + 1,
                height: Math.random() * 2 + 1,
                top: `${Math.random() * 60}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{ opacity: [0, 0.7 + fx * 0.3, 0] }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className="absolute -top-8 left-[-25%] w-[70vw] h-9 bg-gradient-to-r from-purple-500/50 via-cyan-400/50 to-transparent skew-y-[-10deg]"
              style={{ opacity: 0.15 + fx * 0.7 }}
              animate={{ x: ['-30vw', '120vw'] }}
              transition={{
                duration: 26 + i * 6,
                repeat: Infinity,
                delay: 2 + i * 4,
                ease: 'linear',
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};

// ================== GAME SCREEN ==================
const GameScreen = ({ difficulty, onBack, characterId, onGoGuide }) => {
  const gameLevels = levels.filter((lvl) => lvl.difficulty === difficulty);

  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [lives, setLives] = useState(5);
  const [modal, setModal] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [hideUI, setHideUI] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // State mới để điều khiển Overlay Hướng dẫn
  const [showGuide, setShowGuide] = useState(false);

  const [enableBlur, setEnableBlur] = useState(true);
  const [enableSound, setEnableSound] = useState(true);
  const [lowEffects, setLowEffects] = useState(false);
  const [fxDensity, setFxDensity] = useState(60);

  const [characterState, setCharacterState] = useState({
    x: 0,
    y: 0,
    rotation: 90,
    status: 'idle',
  });

  const [stats, setStats] = useState({
    correct: 0,
    wrong: 0,
    total: gameLevels.length,
  });

  const [answerFeedback, setAnswerFeedback] = useState(null);
  const feedbackTimeoutRef = useRef(null);
  const containerControls = useAnimation();
  const currentLevel = gameLevels[currentLevelIndex];

  useEffect(() => {
    setCurrentLevelIndex(0);
    setLives(5);
    resetCharacter();
    setModal(null);
    setStats({ correct: 0, wrong: 0, total: gameLevels.length });
    setAnswerFeedback(null);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
  }, [difficulty, gameLevels.length]);

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  // Xử lý mở Guide: Thay vì gọi prop onGoGuide (chuyển trang), ta bật Overlay
  const handleOpenGuide = () => {
    setShowSettings(false); 
    setShowGuide(true);
  };

  const resetCharacter = () => {
    setCharacterState({ x: 0, y: 0, rotation: 90, status: 'idle' });
  };

  const restartGame = () => {
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
      feedbackTimeoutRef.current = null;
    }
    setCurrentLevelIndex(0);
    setLives(5);
    resetCharacter();
    setModal(null);
    setStats({ correct: 0, wrong: 0, total: gameLevels.length });
    setAnswerFeedback(null);
  };

  const executeBlockAction = (blockText) => {
    setCharacterState((prev) => ({ ...prev, status: 'move' }));
    if (blockText.includes('Move')) {
      const steps = parseInt(blockText.match(/-?\d+/)?.[0]) || 10;
      setCharacterState((prev) => {
        const rad = (prev.rotation - 90) * (Math.PI / 180);
        return {
          ...prev,
          x: prev.x + Math.cos(rad) * steps * 5,
          y: prev.y + Math.sin(rad) * steps * 5,
        };
      });
    } else if (blockText.includes('Turn right')) {
      const degrees = parseInt(blockText.match(/\d+/)?.[0]) || 15;
      setCharacterState((prev) => ({ ...prev, rotation: prev.rotation + degrees }));
    } else if (blockText.includes('Turn left')) {
      const degrees = parseInt(blockText.match(/\d+/)?.[0]) || 15;
      setCharacterState((prev) => ({ ...prev, rotation: prev.rotation - degrees }));
    } else if (blockText.includes('Go to x: 0 y: 0')) {
      setCharacterState((prev) => ({ ...prev, x: 0, y: 0 }));
    }
    setTimeout(() => {
      setCharacterState((prev) => ({ ...prev, status: 'idle' }));
    }, 500);
  };

  const buildSummaryMessage = (isWin) => {
    const totalAnswered = stats.correct + stats.wrong;
    return `${isWin ? 'Bạn đã hoàn thành tất cả câu hỏi!' : 'Bạn đã hết mạng!'}\n\nTổng kết:\n- Đúng: ${stats.correct}\n- Sai: ${stats.wrong}\n- Trả lời: ${totalAnswered}/${gameLevels.length}`;
  };

  const goToNextLevel = () => {
    setAnswerFeedback(null);
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
      feedbackTimeoutRef.current = null;
    }
    if (currentLevelIndex < gameLevels.length - 1) {
      setCurrentLevelIndex((prev) => prev + 1);
      resetCharacter();
    } else {
      const fx = lowEffects ? 0 : fxDensity / 100;
      const particleCount = Math.round(20 + fx * 220);
      confetti({ particleCount, spread: 90, origin: { y: 0.6 } });
      setModal({ type: 'win', message: buildSummaryMessage(true) });
    }
  };

  const handleBlockClick = (blockId) => {
    // Thêm điều kiện: Không nhận click khi đang mở Guide
    if (lives <= 0 || modal || showSettings || showGuide) return;
    const selectedBlock = currentLevel.options.find((opt) => opt.id === blockId);
    if (!selectedBlock) return;
    const isCorrect = blockId === currentLevel.correctBlockId;

    if (isCorrect) {
      setStats((prev) => ({ ...prev, correct: prev.correct + 1 }));
      executeBlockAction(selectedBlock.text);
      setAnswerFeedback({
        status: 'correct',
        selectedId: blockId,
        correctId: currentLevel.correctBlockId,
      });
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      feedbackTimeoutRef.current = setTimeout(() => { goToNextLevel(); }, 2500);
    } else {
      setStats((prev) => ({ ...prev, wrong: prev.wrong + 1 }));
      const newLives = lives - 1;
      setLives(newLives);
      containerControls.start({ x: [-5, 5, -5, 5, 0], transition: { duration: 0.3 } });
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
        feedbackTimeoutRef.current = null;
      }
      setAnswerFeedback(null);
      if (newLives <= 0) {
        setTimeout(() => {
          setModal({ type: 'gameover', message: buildSummaryMessage(false) });
        }, 500);
      } else {
        setTimeout(() => { goToNextLevel(); }, 400);
      }
    }
  };

  const isDark = theme === 'dark';
  const mainBgClass = isDark ? 'bg-slate-950' : 'bg-sky-100';
  const currentTheme = isDark
    ? {
        panel: 'bg-[#020617]/90 backdrop-blur-xl border-cyan-500/30 shadow-[0_0_40px_rgba(34,211,238,0.4)]',
        textTitle: 'text-cyan-300 font-extrabold',
        textSub: 'text-slate-300 font-semibold',
        blockTextMain: 'text-slate-50',
        blockTextSub: 'text-cyan-300',
        boxTask: 'bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-900/90 border-l-4 border-cyan-400 text-slate-100',
        blockWrapper: 'bg-slate-900/80 border-slate-700 hover:border-cyan-400 hover:bg-slate-900',
      }
    : {
        panel: 'bg-[#020617]/90 backdrop-blur-xl border-sky-400/40 shadow-[0_0_40px_rgba(56,189,248,0.5)]',
        textTitle: 'text-sky-300 font-extrabold',
        textSub: 'text-slate-200 font-semibold',
        blockTextMain: 'text-slate-50',
        blockTextSub: 'text-sky-300',
        boxTask: 'bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-900/90 border-l-4 border-sky-400 text-slate-100',
        blockWrapper: 'bg-slate-900/80 border-slate-700 hover:border-sky-400 hover:bg-slate-900',
      };

  if (!currentLevel) {
    return <div className="flex items-center justify-center h-screen text-white bg-black">Loading...</div>;
  }

  return (
    <motion.div className={`relative w-full h-screen overflow-hidden flex flex-col ${mainBgClass}`} animate={containerControls}>
      <ThemeDecorations theme={theme} lowEffects={lowEffects} fxDensity={fxDensity} />
      <div className="absolute top-0 left-0 z-50 p-4">
        <GameControls
          onBack={onBack}
          setShowSettings={setShowSettings}
          toggleTheme={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
          theme={theme}
          setHideUI={setHideUI}
          hideUI={hideUI}
        />
      </div>

      <AnimatePresence>
        {!hideUI && (
          <motion.div className="z-10 flex items-center justify-center flex-1 w-full min-h-0 px-8 pt-24 pb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex w-full h-full max-w-[1800px] items-center justify-between gap-12">
              <motion.div className="w-[28%] min-w-[350px] max-w-[450px] h-full flex-none flex flex-col" initial={{ x: -50 }} animate={{ x: 0 }} transition={{ delay: 0.2 }}>
                <GamePanel
                  theme={theme} currentTheme={currentTheme} currentLevelIndex={currentLevelIndex} totalLevels={gameLevels.length}
                  lives={lives} currentLevel={currentLevel} handleBlockClick={handleBlockClick} answerFeedback={answerFeedback} onSkipFeedback={goToNextLevel}
                />
              </motion.div>
              <motion.div className="relative flex items-center justify-end flex-1 h-full" initial={{ x: 50 }} animate={{ x: 0 }} transition={{ delay: 0.3 }}>
                {!lowEffects && (
                  <div className="absolute right-32 top-1/2 -translate-y-1/2 w-[680px] h-[480px] rounded-[50%] pointer-events-none"
                    style={{ background: isDark ? '#22d3ee' : '#38bdf8', opacity: 0.05 + (fxDensity / 100) * 0.45, filter: `blur(${50 + (fxDensity / 100) * 40}px)` }}
                  />
                )}
                <GameMonitor isDark={isDark} difficulty={difficulty} currentLevelIndex={currentLevelIndex} characterState={characterState} characterId={characterId} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {/* OVERLAY HƯỚNG DẪN */}
        {showGuide && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center">
            {/* Backdrop tối mờ */}
            <motion.div
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="absolute inset-0 bg-black/80 backdrop-blur-sm"
               onClick={() => setShowGuide(false)}
            />
            {/* Nội dung Guide */}
            <div className="relative z-10 w-full h-full pointer-events-none">
              {/* Truyền prop isOverlay vào TutorialScreen để ẩn nút Home nếu cần */}
              <div className="flex items-center justify-center w-full h-full pointer-events-auto p-4">
                 <div className="w-full max-w-[90vw] h-[90vh]">
                     <TutorialScreen onBack={() => setShowGuide(false)} isOverlay={true} />
                 </div>
              </div>
            </div>
          </div>
        )}

        {showSettings && (
          <SettingsModal
            onClose={() => setShowSettings(false)}
            onHome={onBack}
            onOpenGuide={handleOpenGuide} // Sử dụng hàm local để mở overlay
            isBlur={enableBlur} toggleBlur={() => setEnableBlur((v) => !v)}
            isSound={enableSound} toggleSound={() => setEnableSound((v) => !v)}
            isLowEffects={lowEffects} toggleLowEffects={() => setLowEffects((v) => !v)}
            fxDensity={fxDensity} onChangeFxDensity={setFxDensity}
          />
        )}
        {modal && (
          <ResultModal
            type={modal.type} message={modal.message} theme={theme} stats={stats}
            onHome={onBack} onReplay={restartGame}
            onOpenSettings={() => { setShowSettings(true); }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GameScreen;