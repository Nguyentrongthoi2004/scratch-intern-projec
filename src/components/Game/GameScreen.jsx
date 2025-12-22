import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import confetti from 'canvas-confetti';
import anime from 'animejs';

import { useGameLogic } from '../../hooks/useGameLogic';
import { useCharacter } from '../../hooks/useCharacter';
import { useGameAudio } from '../../hooks/useGameAudio';
import { INITIAL_TIME, POINTS_PER_CORRECT } from '../../utils/gameConstants';

import ResultModal from '../UI/ResultModal';
import SettingsModal from '../UI/SettingsModal';
import GameControls from './GameControls';
import GamePanel from './GamePanel';
import GameMonitor from './GameMonitor';
import TutorialScreen from '../Tutorial/TutorialScreen';
import ThemeDecorations from './ThemeDecorations';

const GameScreen = ({
  difficulty, onBack, characterId,
  setUiScale, uiScale, onNextLevel, loadGame,
  bgmVolume, setBgmVolume, sfxVolume, setSfxVolume, enableSound, setEnableSound,
  setTotalPoints, inventory, setInventory
}) => {
  
  const { playSfx } = useGameAudio(enableSound, bgmVolume, sfxVolume);

  const {
    activeCharacterId,
    characterState, setCharacterState,
    activeLoopType,
    repeatProgress,
    isFrozen,
    resetCharacter,
    executeBlockAction
  } = useCharacter(characterId, playSfx);

  const {
    currentLevelIndex, setCurrentLevelIndex,
    lives, setLives,
    scoreDetails, setScoreDetails,
    isGoldenWin, setIsGoldenWin,
    wrongAnswers, setWrongAnswers,
    isReviewMode, setIsReviewMode,
    stats, setStats,
    modal, setModal,
    timeLeft, setTimeLeft,
    gameLevels,
    activeLevelData,
    restartGame: restartLogic,
    saveGame
  } = useGameLogic(difficulty, loadGame, activeCharacterId);

  const [theme, setTheme] = useState('dark');
  const [hideUI, setHideUI] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [enableBlur, setEnableBlur] = useState(true);
  const [lowEffects, setLowEffects] = useState(false);
  const [fxDensity, setFxDensity] = useState(60);
  
  const [disabledOptions, setDisabledOptions] = useState([]);
  const [answerFeedback, setAnswerFeedback] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // --- [LOGIC MỚI] ---
  const [isTimerRunning, setIsTimerRunning] = useState(true); 
  const [isWaitingNextLevel, setIsWaitingNextLevel] = useState(false); 
  const [autoNextCountdown, setAutoNextCountdown] = useState(15);
  
  // Dùng Ref để chặn double-click hoặc race condition
  const isWaitingRef = useRef(false);
  // -------------------

  const timeoutsRef = useRef([]);
  const containerControls = useAnimation();

  const safeSetTimeout = useCallback((callback, delay) => {
    const id = setTimeout(() => {
      timeoutsRef.current = timeoutsRef.current.filter(tId => tId !== id);
      callback();
    }, delay);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(id => {
      clearTimeout(id);
      clearInterval(id);
    });
    timeoutsRef.current = [];
  }, []);

  useEffect(() => {
    return () => clearAllTimeouts();
  }, [clearAllTimeouts]);

  // Đồng bộ ref với state để dùng trong các hàm async
  useEffect(() => {
      isWaitingRef.current = isWaitingNextLevel;
  }, [isWaitingNextLevel]);

  // --- TIMER CHÍNH ---
  useEffect(() => {
    let timer;
    if (showSettings || showGuide) return;

    if (lives > 0 && !modal && timeLeft > 0 && isTimerRunning && !isWaitingNextLevel) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft <= 0 && !modal && isTimerRunning && !isWaitingNextLevel) {
      setTimeLeft(0);
      playSfx('lose.mp3');
      setModal({ type: 'gameover', message: 'Hết thời gian!\nBạn đã không hoàn thành nhiệm vụ kịp lúc.' });
    }
    return () => clearInterval(timer);
  }, [lives, modal, showSettings, showGuide, timeLeft, isTimerRunning, isWaitingNextLevel, setTimeLeft, playSfx, setModal]);

  // --- TIMER NGHỈ 15S ---
  useEffect(() => {
    let timer;
    if (isWaitingNextLevel) {
      timer = setInterval(() => {
        setAutoNextCountdown((prev) => {
          if (prev <= 1) {
            // Hết 15s thì tự động chuyển
            // Phải dùng ref hoặc hàm callback để đảm bảo gọi đúng
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isWaitingNextLevel]);

  // Effect riêng để trigger chuyển màn khi countdown về 0
  useEffect(() => {
      if (isWaitingNextLevel && autoNextCountdown === 0) {
          handleManualNextLevel();
      }
  }, [autoNextCountdown, isWaitingNextLevel]);


  const handleOpenGuide = useCallback(() => { setShowSettings(false); setShowGuide(true); }, []);

  const restartGame = useCallback(() => {
    clearAllTimeouts();
    restartLogic();
    resetCharacter(characterId);
    setAnswerFeedback(null);
    setDisabledOptions([]);
    setIsTimerRunning(true);
    setIsWaitingNextLevel(false);
    isWaitingRef.current = false;
  }, [clearAllTimeouts, restartLogic, resetCharacter, characterId]);

  const handleManualSave = useCallback(() => {
    if (saveGame()) {
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
  }, [saveGame, playSfx]);

  const buildSummaryMessage = (isWin, currentStats) => {
    return `${isWin ? 'Hoàn thành!' : 'Thất bại!'}\nĐúng: ${currentStats.correct} | Sai: ${currentStats.wrong}`;
  };

  const finishGame = useCallback((currentStats) => {
      playSfx('win.mp3');
      confetti({ particleCount: 200, spread: 70, origin: { y: 0.6 } });

      let isGolden = false;
      const { easy, normal, hard } = scoreDetails;
      if (difficulty === 'hard' && easy >= 10 && normal >= 10 && hard >= 9) {
          isGolden = true;
      }
      setIsGoldenWin(isGolden);
      setModal({ type: 'win', message: buildSummaryMessage(true, currentStats) });
      localStorage.removeItem('scratch_game_save');
  }, [difficulty, scoreDetails, playSfx, setModal, setIsGoldenWin]);

  const goToNextLevel = useCallback((currentStats = stats, currentWrongAnswers = wrongAnswers) => {
    setAnswerFeedback(null);
    if (!isReviewMode) {
       if (currentLevelIndex < gameLevels.length - 1) {
         setCurrentLevelIndex(prev => prev + 1);
         resetCharacter();
         setTimeLeft(INITIAL_TIME); 
         setIsTimerRunning(true);   
       } else {
         if (currentWrongAnswers.length > 0) {
            setIsReviewMode(true);
            setModal({ type: 'review_start', message: "Hãy sửa lại các lỗi sai để đạt điểm tuyệt đối!" });
         } else {
            finishGame(currentStats);
         }
       }
    } else {
       if (currentWrongAnswers.length === 0) {
          finishGame(currentStats);
       } else {
          resetCharacter();
          setTimeLeft(INITIAL_TIME);
          setIsTimerRunning(true);
       }
    }
  }, [isReviewMode, currentLevelIndex, gameLevels.length, stats, wrongAnswers, finishGame, resetCharacter, setCurrentLevelIndex, setTimeLeft, setIsReviewMode, setModal]);

  const handleManualNextLevel = useCallback(() => {
      setIsWaitingNextLevel(false);
      isWaitingRef.current = false;
      setAutoNextCountdown(15);
      goToNextLevel();
  }, [goToNextLevel]);

  const handleBlockClick = useCallback(async (blockId) => {
    // Check kỹ: Nếu đang chờ (isWaitingRef) thì CHẶN LUÔN
    if (lives <= 0 || modal || showSettings || showGuide || isProcessing || isWaitingRef.current) return;
    
    const selectedBlock = activeLevelData.options.find(opt => opt.id === blockId);
    if (!selectedBlock) return;
    
    setIsProcessing(true);
    const isCorrect = blockId === activeLevelData.correctBlockId;

    if (isCorrect) {
      // 1. DỪNG GIỜ
      setIsTimerRunning(false);

      const newCorrect = stats.correct + 1;
      const newStats = { ...stats, correct: newCorrect };
      setStats(newStats);
      setTotalPoints(prev => prev + POINTS_PER_CORRECT);
      
      // Animation điểm
      const pointEl = document.createElement('div');
      pointEl.innerText = `+${POINTS_PER_CORRECT} Điểm`;
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

      // Lưu điểm
      let currentWrongAnswers = wrongAnswers;
      if (isReviewMode) {
         currentWrongAnswers = wrongAnswers.filter(w => w.id !== activeLevelData.id);
         setWrongAnswers(currentWrongAnswers);
         // update storage...
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

      setAnswerFeedback({ status: 'correct', selectedId: blockId, correctId: activeLevelData.correctBlockId });

      // 2. CHỜ DIỄN (Await quan trọng)
      await executeBlockAction(selectedBlock.text, setTimeLeft);
      
      if (selectedBlock.text.match(/\bEnd\b/i)) {
          await new Promise(r => setTimeout(r, 2000));
      }
      
      // 3. BẬT CHỜ 15S (Quan trọng: set Ref ngay để chặn click liên tiếp)
      setIsProcessing(false);
      setIsWaitingNextLevel(true);
      isWaitingRef.current = true; // Khóa interaction
      setAutoNextCountdown(15);

      // TUYỆT ĐỐI KHÔNG GỌI goToNextLevel() Ở ĐÂY

    } else {
      // --- TRẢ LỜI SAI ---
      const newWrong = stats.wrong + 1;
      const newStats = { ...stats, wrong: newWrong };
      setStats(newStats);

      let currentWrongAnswers = wrongAnswers;
      if (!isReviewMode) {
         setWrongAnswers(prev => {
            if (prev.some(w => w.id === activeLevelData.id)) return prev;
            return [...prev, { id: activeLevelData.id }];
         });
      }

      const newLives = lives - 1;
      setLives(newLives);
      setAnswerFeedback(null);
      setTimeLeft(prev => Math.max(0, prev - 5));

      if (newLives <= 0) {
        setIsTimerRunning(false);
        localStorage.removeItem('scratch_game_save');
        playSfx('lose.mp3');
        setCharacterState(prev => ({ ...prev, status: 'death' }));
        safeSetTimeout(() => setModal({ type: 'gameover', message: buildSummaryMessage(false, newStats) }), 1500);
      } else {
        playSfx('hurt.mp3');
        setCharacterState(prev => ({ ...prev, status: 'hurt' }));
        containerControls.start({ x: [-5, 5, -5, 5, 0], transition: { duration: 0.3 } });
        
        // Sai thì chuyển màn luôn sau 0.8s
        safeSetTimeout(() => {
            setIsProcessing(false);
            goToNextLevel(newStats, currentWrongAnswers); // Sai thì không cần chờ 15s
        }, 800);
      }
    }
  }, [lives, modal, showSettings, showGuide, isProcessing, activeLevelData, stats, setTotalPoints, isReviewMode, difficulty, scoreDetails, setScoreDetails, wrongAnswers, setWrongAnswers, setLives, setAnswerFeedback, setTimeLeft, playSfx, setCharacterState, containerControls, safeSetTimeout, executeBlockAction, goToNextLevel, setModal, setStats]);

  const handleUsePowerUpReal = useCallback((type) => {
    if (inventory[type] <= 0) return;
    if (lives <= 0 || modal || isProcessing || isWaitingRef.current) return; // Chặn nếu đang chờ

    const btnId = `#btn-powerup-${type}`;
    anime({
      targets: btnId,
      scale: [1, 1.5, 1],
      duration: 300,
      easing: 'easeInOutQuad'
    });

    if (type === 'hint') {
      const wrongOptions = activeLevelData.options.filter(
          opt => opt.id !== activeLevelData.correctBlockId && !disabledOptions.includes(opt.id)
      );
      if (wrongOptions.length > 0) {
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
          // Heart effect logic...
       }
    } else if (type === 'skip') {
       setInventory(prev => ({ ...prev, skip: prev.skip - 1 }));
       handleBlockClick(activeLevelData.correctBlockId); 
    }
  }, [inventory, lives, modal, isProcessing, activeLevelData, disabledOptions, setInventory, playSfx, setLives, handleBlockClick]);

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

  if (!activeLevelData) return <div className="flex items-center justify-center h-screen text-white bg-black">Loading...</div>;

  return (
    <motion.div className={`relative w-full h-screen overflow-hidden flex flex-col ${mainBgClass}`} animate={containerControls}>
      <ThemeDecorations theme={theme} lowEffects={lowEffects} fxDensity={fxDensity} />
      
      <div className="absolute top-0 left-0 z-50 p-4">
        <GameControls onBack={onBack} setShowSettings={setShowSettings} toggleTheme={() => setTheme(p => p==='light'?'dark':'light')} theme={theme} setHideUI={setHideUI} hideUI={hideUI} />
      </div>

      <AnimatePresence>
        {isWaitingNextLevel && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-10 left-0 right-0 z-[100] flex flex-col items-center justify-center pointer-events-none"
          >
             <div className="flex flex-col items-center gap-2 pointer-events-auto">
                <div className="text-sm font-bold text-white drop-shadow-md animate-pulse">
                   Tự động chuyển sau {autoNextCountdown}s...
                </div>
                
                <button 
                  onClick={handleManualNextLevel}
                  className="group relative px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.6)] hover:shadow-[0_0_40px_rgba(34,197,94,1)] hover:scale-110 transition-all duration-300 active:scale-95"
                >
                    <div className="absolute inset-0 transition-opacity bg-white rounded-full opacity-0 group-hover:opacity-20"></div>
                    <span className="flex items-center gap-2 text-xl font-black tracking-wider text-white uppercase">
                       Tiếp tục <span className="text-2xl">➔</span>
                    </span>
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                  currentLevel={activeLevelData}
                  handleBlockClick={handleBlockClick}
                  answerFeedback={answerFeedback}
                  onSkipFeedback={goToNextLevel}
                  powerUps={inventory}
                  handleUsePowerUp={handleUsePowerUpReal}
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
                    characterState={characterState} 
                    characterId={activeCharacterId}
                    timeLeft={timeLeft}
                    activeLoopType={activeLoopType}
                    repeatProgress={repeatProgress}
                    isFrozen={isFrozen}
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
            bgmVolume={bgmVolume}
            setBgmVolume={setBgmVolume}
            sfxVolume={sfxVolume}
            setSfxVolume={setSfxVolume}
            onSaveGame={handleManualSave}
            onResetGame={restartGame}
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