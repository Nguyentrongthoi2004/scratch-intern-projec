import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import confetti from 'canvas-confetti';
import anime from 'animejs';

import { levels } from '../../data/levels';
import { audioManager } from '../../utils/audioManager';
import { useCharacter } from '../../hooks/useCharacter';
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
const GameScreen = ({
  difficulty, onBack, characterId,
  setUiScale, uiScale, onNextLevel, loadGame,
  bgmVolume, setBgmVolume, sfxVolume, setSfxVolume, enableSound, setEnableSound,
  totalPoints, setTotalPoints, inventory, setInventory
}) => {
  
  const [refreshKey, setRefreshKey] = useState(0);
  const [levelOrder, setLevelOrder] = useState(null);

  const gameLevels = useMemo(() => {
    const allForDifficulty = levels.filter((lvl) => lvl.difficulty === difficulty);
    if (loadGame && levelOrder && levelOrder.length > 0) {
       const orderedLevels = levelOrder.map(id => allForDifficulty.find(l => l.id === id)).filter(Boolean);
       if (orderedLevels.length === levelOrder.length) return orderedLevels;
    }
    const shuffled = [...allForDifficulty].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  }, [difficulty, refreshKey, levelOrder, loadGame]);

  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [lives, setLives] = useState(5);
  const [modal, setModal] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [hideUI, setHideUI] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const [scoreDetails, setScoreDetails] = useState({ easy: 0, normal: 0, hard: 0 });
  const [isGoldenWin, setIsGoldenWin] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [isReviewMode, setIsReviewMode] = useState(false);

  const [enableBlur, setEnableBlur] = useState(true);
  const [lowEffects, setLowEffects] = useState(false);
  const [fxDensity, setFxDensity] = useState(60);

  const INITIAL_TIME = 60;
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [activeCharacterId, setActiveCharacterId] = useState(characterId || 'pink');
  
  const [characterState, setCharacterState] = useState({
    x: 0,
    y: 0,
    rotation: 90,
    status: 'idle',
    visible: true,
    scale: 1,
    speechText: null,
    speed: 1,
    waitTimer: null,
    isWaiting: false,
    friend: null
  });

  // Visual Effects State
  const [activeLoopType, setActiveLoopType] = useState(null); // 'forever' | 'repeat' | null
  const [repeatProgress, setRepeatProgress] = useState(null); // { current: 1, total: 4 }
  const [isFrozen, setIsFrozen] = useState(false);

  const [stats, setStats] = useState({
    correct: 0,
    wrong: 0,
    total: gameLevels.length,
  });

  const [disabledOptions, setDisabledOptions] = useState([]);

  const [answerFeedback, setAnswerFeedback] = useState(null);
  const feedbackTimeoutRef = useRef(null);
  const timeoutsRef = useRef([]);

  const containerControls = useAnimation();

  // USE CHARACTER HOOK
  const playSfx = (filename) => {
    audioManager.playSfx(filename);
  };

  const {
    activeCharacterId: hookCharacterId, setActiveCharacterId: setHookCharacterId,
    characterState: hookCharacterState, setCharacterState: setHookCharacterState,
    activeLoopType: hookLoopType,
    repeatProgress: hookRepeatProgress,
    isFrozen: hookIsFrozen,
    resetCharacter,
    executeBlockAction,
    clearAllTimeouts
  } = useCharacter(characterId || 'pink', playSfx);

  // Sync hook state to local state or use hook state directly
  // Here we use hook state directly in GameMonitor, but we need to pass it down
  // Note: activeCharacterId from hook should be used

  const activeLevelData = useMemo(() => {
     if (isReviewMode && wrongAnswers.length > 0) {
        const wId = wrongAnswers[0].id || wrongAnswers[0];
        return levels.find(l => l.id === wId) || gameLevels[0];
     }
     return gameLevels[currentLevelIndex];
  }, [isReviewMode, wrongAnswers, gameLevels, currentLevelIndex]);

  const currentLevel = activeLevelData;

  // Clear disabled options on level change
  useEffect(() => {
    setDisabledOptions([]);
  }, [currentLevel]);

  useEffect(() => {
    return () => {
        timeoutsRef.current.forEach(id => clearTimeout(id));
        clearAllTimeouts(); // Ensure hook timeouts are also cleared
    };
  }, []);


  // Timer logic
  useEffect(() => {
    let timer;
    if (showSettings) return;

    if (lives > 0 && !modal && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft <= 0 && !modal) {
      setTimeLeft(0);
      playSfx('lose.mp3');
      setModal({ type: 'gameover', message: 'Time Up!\nYou did not complete the task.' });
    }
    return () => clearInterval(timer);
  }, [lives, modal, showSettings, timeLeft]);

  // Init
  useEffect(() => {
    if (loadGame) {
      try {
        const save = JSON.parse(localStorage.getItem('scratch_game_save'));
        if (save) {
           setScoreDetails(save.scoreDetails || { easy: 0, normal: 0, hard: 0 });
           setLives(save.lives || 5);
           setCurrentLevelIndex(save.levelIndex || 0);
           setWrongAnswers(save.wrongAnswers || []);
           setStats(save.stats || { correct: 0, wrong: 0, total: 10 });
           setLevelOrder(save.levelOrder || []);
           if (save.characterId) setHookCharacterId(save.characterId);
        }
      } catch (e) {
        console.error("Load failed", e);
        setCurrentLevelIndex(0);
        setLives(5);
        setStats({ correct: 0, wrong: 0, total: gameLevels.length });
      }
    } else {
      const defaultScores = JSON.parse(localStorage.getItem('scratch_game_scores') || '{"easy":0, "normal":0, "hard":0}');
      setScoreDetails(defaultScores);

      setCurrentLevelIndex(0);
      setLives(5);
      setWrongAnswers([]);
      setStats({ correct: 0, wrong: 0, total: gameLevels.length });
      setIsReviewMode(false);
    }

    resetCharacter();
    setModal(null);
    setTimeLeft(INITIAL_TIME);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
  }, [difficulty]);

  useEffect(() => {
     if (lives <= 0 || modal) return;
     // Only save if the user has actually played (answered correct/wrong) or progressed beyond level 1
     if (gameLevels.length > 0 && (stats.correct > 0 || stats.wrong > 0 || currentLevelIndex > 0)) {
        const saveData = {
          difficulty,
          characterId: hookCharacterId,
          levelIndex: currentLevelIndex,
          lives,
          scoreDetails,
          wrongAnswers,
          stats,
          levelOrder: levelOrder || gameLevels.map(l => l.id),
        };
        localStorage.setItem('scratch_game_save', JSON.stringify(saveData));
        if (!levelOrder && !loadGame) {
           setLevelOrder(gameLevels.map(l => l.id));
        }
     }
  }, [currentLevelIndex, lives, scoreDetails, wrongAnswers, difficulty, hookCharacterId, stats, gameLevels, levelOrder, loadGame, modal]);

  const handleOpenGuide = () => { setShowSettings(false); setShowGuide(true); };

  const restartGame = () => {
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    clearAllTimeouts();
    setRefreshKey(prev => prev + 1);
    setCurrentLevelIndex(0);
    setLives(5);
    resetCharacter(characterId || 'pink'); // Reset and force back to initial if needed, or keep current
    setModal(null);
    setStats({ correct: 0, wrong: 0, total: gameLevels.length });
    setAnswerFeedback(null);
    setTimeLeft(INITIAL_TIME);
    setIsReviewMode(false);
  };

  const handleManualSave = () => {
    if (gameLevels.length > 0) {
        const saveData = {
          difficulty,
          characterId: hookCharacterId,
          levelIndex: currentLevelIndex,
          lives,
          scoreDetails,
          wrongAnswers,
          stats,
          levelOrder: levelOrder || gameLevels.map(l => l.id),
        };
        localStorage.setItem('scratch_game_save', JSON.stringify(saveData));

        // Visual Feedback
        const saveEl = document.createElement('div');
        saveEl.innerText = "GAME SAVED!";
        saveEl.style.position = 'absolute';
        saveEl.style.left = '50%';
        saveEl.style.top = '20%';
        saveEl.style.transform = 'translate(-50%, -50%)';
        saveEl.style.color = '#4ade80';
        saveEl.style.fontWeight = 'black';
        saveEl.style.fontSize = '2rem';
        saveEl.style.zIndex = 99999;
        saveEl.style.textShadow = '0 0 20px rgba(0,0,0,0.8)';
        document.body.appendChild(saveEl);

        anime({
            targets: saveEl,
            translateY: -50,
            opacity: [1, 0],
            duration: 2000,
            easing: 'easeOutExpo',
            complete: () => document.body.removeChild(saveEl)
        });

        playSfx('save.mp3');
    }
  };

  const handleResetGame = () => {
      restartGame();
  };

  // --- POWER UP HANDLER ---
  const handleUsePowerUp = (type) => {
    if (inventory[type] <= 0) return;
    if (lives <= 0 || modal) return;

    // Use animejs for visual feedback
    const btnId = `#btn-powerup-${type}`;
    anime({
      targets: btnId,
      scale: [1, 1.5, 1],
      duration: 300,
      easing: 'easeInOutQuad'
    });

    if (type === 'hint') {
      const wrongOptions = currentLevel.options.filter(
         opt => opt.id !== currentLevel.correctBlockId && !disabledOptions.includes(opt.id)
      );
      if (wrongOptions.length > 0) {
         // Disable 1 random wrong option
         const toDisable = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
         setDisabledOptions(prev => [...prev, toDisable.id]);
         setInventory(prev => ({ ...prev, hint: prev.hint - 1 }));
         playSfx('pop.mp3');
      }
    } else if (type === 'heal') {
       if (lives < 5) {
          setLives(prev => Math.min(5, prev + 1));
          setInventory(prev => ({ ...prev, heal: prev.heal - 1 }));
          playSfx('win.mp3');
          // Heal Animation
          const heart = document.createElement('div');
          heart.innerHTML = '❤️';
          heart.style.position = 'absolute';
          heart.style.left = '50%';
          heart.style.top = '50%';
          heart.style.fontSize = '100px';
          heart.style.zIndex = 1000;
          document.body.appendChild(heart);
          anime({
            targets: heart,
            translateY: -200,
            opacity: 0,
            duration: 1000,
            complete: () => document.body.removeChild(heart)
          });
       }
    } else if (type === 'skip') {
       setInventory(prev => ({ ...prev, skip: prev.skip - 1 }));
       handleBlockClick(currentLevel.correctBlockId);
    }
  };

  const buildSummaryMessage = (isWin) => {
    return `${isWin ? 'Completed!' : 'Failed!'}\nCorrect: ${stats.correct} | Wrong: ${stats.wrong}`;
  };

  const goToNextLevel = () => {
    setAnswerFeedback(null);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    
    if (!isReviewMode) {
       if (currentLevelIndex < gameLevels.length - 1) {
         setCurrentLevelIndex(prev => prev + 1);
         resetCharacter();
         setTimeLeft(INITIAL_TIME);
       } else {
         if (wrongAnswers.length > 0) {
            setIsReviewMode(true);
            setModal({ type: 'review_start', message: "Review Mode: Fix your mistakes for a perfect score!" });
         } else {
            finishGame();
         }
       }
    } else {
       // Review Mode Logic
       if (wrongAnswers.length === 0) {
          finishGame();
       } else {
          resetCharacter();
          setTimeLeft(INITIAL_TIME);
       }
    }
  };

  const finishGame = () => {
      playSfx('win.mp3');
      confetti({ particleCount: 200, spread: 70, origin: { y: 0.6 } });

      let isGolden = false;
      const { easy, normal, hard } = scoreDetails;
      if (difficulty === 'hard' && easy >= 10 && normal >= 10 && hard >= 9) {
          isGolden = true;
      }
      setIsGoldenWin(isGolden);
      setModal({ type: 'win', message: buildSummaryMessage(true) });
      localStorage.removeItem('scratch_game_save');
  };

  const handleBlockClick = (blockId) => {
    if (lives <= 0 || modal || showSettings || showGuide) return;
    const selectedBlock = currentLevel.options.find(opt => opt.id === blockId);
    if (!selectedBlock) return;
    
    const isCorrect = blockId === currentLevel.correctBlockId;

    if (isCorrect) {
      const newCorrect = stats.correct + 1;
      setStats(prev => ({ ...prev, correct: newCorrect }));
      
      // Points Logic
      setTotalPoints(prev => prev + 10);
      
      // Floating text for points
      const pointEl = document.createElement('div');
      pointEl.innerText = "+10 Points";
      pointEl.style.position = 'absolute';
      pointEl.style.left = '50%';
      pointEl.style.top = '40%';
      pointEl.style.transform = 'translate(-50%, -50%)';
      pointEl.style.color = '#fde047';
      pointEl.style.fontWeight = 'bold';
      pointEl.style.fontSize = '2rem';
      pointEl.style.zIndex = 9999;
      pointEl.style.pointerEvents = 'none';
      pointEl.style.textShadow = '0 0 10px rgba(0,0,0,0.5)';
      document.body.appendChild(pointEl);

      anime({
        targets: pointEl,
        translateY: -100,
        opacity: [1, 0],
        duration: 1500,
        easing: 'easeOutExpo',
        complete: () => document.body.removeChild(pointEl)
      });

      if (isReviewMode) {
         setWrongAnswers(prev => prev.filter(w => w.id !== currentLevel.id));
         const currentScore = scoreDetails[difficulty] || 0;
         const newScoreDetails = { ...scoreDetails, [difficulty]: Math.min(10, currentScore + 1) };
         setScoreDetails(newScoreDetails);
         localStorage.setItem('scratch_game_scores', JSON.stringify(newScoreDetails));
      } else {
         const currentScore = scoreDetails[difficulty] || 0;
         const newScoreDetails = { ...scoreDetails, [difficulty]: Math.min(10, currentScore + 1) };
         setScoreDetails(newScoreDetails);
         localStorage.setItem('scratch_game_scores', JSON.stringify(newScoreDetails));
      }

      setAnswerFeedback({ status: 'correct', selectedId: blockId, correctId: currentLevel.correctBlockId });

      // Execute via hook
      executeBlockAction(selectedBlock.text, setTimeLeft);

      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      
      const actionCount = selectedBlock.text.split('->').length;
      const waitCount = (selectedBlock.text.match(/Wait/g) || []).length;
      const friendCount = (selectedBlock.text.match(/Friend/g) || []).length;
      const waitTime = Math.max(2500, (actionCount * 900) + (waitCount * 200) + (friendCount * 500));
      
      feedbackTimeoutRef.current = setTimeout(goToNextLevel, waitTime + 10000); // Fixed 10s wait + anim time
    } else {
      setStats(prev => ({ ...prev, wrong: prev.wrong + 1 }));
      if (!isReviewMode) {
         setWrongAnswers(prev => {
            if (prev.some(w => w.id === currentLevel.id)) return prev;
            return [...prev, { id: currentLevel.id }];
         });
      }

      const newLives = lives - 1;
      setLives(newLives);
      setAnswerFeedback(null);
      setTimeLeft(prev => Math.max(0, prev - 5));

      if (newLives <= 0) {
        localStorage.removeItem('scratch_game_save');
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
                <GamePanel
                  theme={theme}
                  currentTheme={currentTheme}
                  currentLevelIndex={currentLevelIndex}
                  totalLevels={gameLevels.length}
                  lives={lives}
                  currentLevel={currentLevel}
                  handleBlockClick={handleBlockClick}
                  answerFeedback={answerFeedback}
                  onSkipFeedback={goToNextLevel}
                  // Pass PowerUps props
                  powerUps={inventory}
                  handleUsePowerUp={handleUsePowerUp}
                  disabledOptions={disabledOptions}
                />
              </motion.div>
              <motion.div className="relative flex items-center justify-end flex-1 h-full" initial={{x:50}} animate={{x:0}} transition={{delay:0.3}}>
                {!lowEffects && (
                  <div className="absolute right-32 top-1/2 -translate-y-1/2 w-[680px] h-[480px] rounded-[50%] pointer-events-none"
                    style={{ background: isDark ? '#22d3ee' : '#38bdf8', opacity: 0.05 + (fxDensity/100)*0.45, filter: `blur(${50+(fxDensity/100)*40}px)` }} />
                )}
                
                <GameMonitor 
                    isDark={isDark} 
                    difficulty={difficulty} 
                    currentLevelIndex={currentLevelIndex} 
                    characterState={hookCharacterState}
                    characterId={hookCharacterId}
                    timeLeft={timeLeft}
                    activeLoopType={hookLoopType}
                    repeatProgress={hookRepeatProgress}
                    isFrozen={hookIsFrozen}
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
            bgmVolume={bgmVolume}
            setBgmVolume={setBgmVolume}
            sfxVolume={sfxVolume}
            setSfxVolume={setSfxVolume}
            onSaveGame={handleManualSave}
            onResetGame={handleResetGame}
          />
        )}
        {modal && !showSettings && (
          <ResultModal
            type={modal.type}
            message={modal.message}
            theme={theme}
            stats={stats}
            scoreDetails={scoreDetails}
            isGoldenWin={isGoldenWin}
            onHome={onBack}
            onReplay={restartGame}
            onOpenSettings={()=>setShowSettings(true)}
            onNextLevel={
              (modal.type === 'win' && difficulty !== 'hard') ? onNextLevel : null
            }
            onStartReview={() => {
              setModal(null);
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GameScreen;