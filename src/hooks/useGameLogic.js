import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { levels } from '../data/levels';
import { INITIAL_TIME } from '../utils/gameConstants';

export const useGameLogic = (difficulty, loadGame, activeCharacterId) => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [lives, setLives] = useState(5);
  const [scoreDetails, setScoreDetails] = useState({ easy: 0, normal: 0, hard: 0 });
  const [isGoldenWin, setIsGoldenWin] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [stats, setStats] = useState({ correct: 0, wrong: 0, total: 10 });
  const [levelOrder, setLevelOrder] = useState(null);
  const [modal, setModal] = useState(null);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [refreshKey, setRefreshKey] = useState(0);

  // Load levels
  const gameLevels = useMemo(() => {
    const allForDifficulty = levels.filter((lvl) => lvl.difficulty === difficulty);
    if (loadGame && levelOrder && levelOrder.length > 0) {
       const orderedLevels = levelOrder.map(id => allForDifficulty.find(l => l.id === id)).filter(Boolean);
       if (orderedLevels.length === levelOrder.length) return orderedLevels;
    }
    const shuffled = [...allForDifficulty].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  }, [difficulty, refreshKey, levelOrder, loadGame]);

  const activeLevelData = useMemo(() => {
     if (isReviewMode && wrongAnswers.length > 0) {
        const wId = wrongAnswers[0].id || wrongAnswers[0];
        return levels.find(l => l.id === wId) || gameLevels[0];
     }
     return gameLevels[currentLevelIndex];
  }, [isReviewMode, wrongAnswers, gameLevels, currentLevelIndex]);

  // Load Game / Init
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
        }
      } catch (e) {
        console.error("Load failed", e);
        // Fallback reset
        setCurrentLevelIndex(0);
        setLives(5);
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

    setModal(null);
    setTimeLeft(INITIAL_TIME);
  }, [difficulty, loadGame, refreshKey]);

  // Optimized Save Logic (Debounce)
  const saveTimeoutRef = useRef(null);

  useEffect(() => {
     if (lives <= 0 || modal) return;
     // Only save if meaningful progress
     if (gameLevels.length > 0 && (stats.correct > 0 || stats.wrong > 0 || currentLevelIndex > 0)) {

        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

        saveTimeoutRef.current = setTimeout(() => {
            const saveData = {
              difficulty,
              characterId: activeCharacterId,
              levelIndex: currentLevelIndex,
              lives,
              scoreDetails,
              wrongAnswers,
              stats,
              levelOrder: levelOrder || gameLevels.map(l => l.id),
            };
            localStorage.setItem('scratch_game_save', JSON.stringify(saveData));
        }, 1000); // 1 second debounce
     }

     return () => {
         if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
     };
  }, [currentLevelIndex, lives, scoreDetails, wrongAnswers, difficulty, activeCharacterId, stats, gameLevels, levelOrder, modal]);

  const saveGame = useCallback(() => {
      if (gameLevels.length > 0) {
        const saveData = {
              difficulty,
              characterId: activeCharacterId,
              levelIndex: currentLevelIndex,
              lives,
              scoreDetails,
              wrongAnswers,
              stats,
              levelOrder: levelOrder || gameLevels.map(l => l.id),
        };
        localStorage.setItem('scratch_game_save', JSON.stringify(saveData));
        return true;
      }
      return false;
  }, [gameLevels, difficulty, activeCharacterId, currentLevelIndex, lives, scoreDetails, wrongAnswers, stats, levelOrder]);

  const restartGame = useCallback(() => {
    setRefreshKey(prev => prev + 1);
    setCurrentLevelIndex(0);
    setLives(5);
    setModal(null);
    setStats({ correct: 0, wrong: 0, total: gameLevels.length });
    setTimeLeft(INITIAL_TIME);
    setIsReviewMode(false);
  }, [gameLevels.length]);

  return {
    currentLevelIndex, setCurrentLevelIndex,
    lives, setLives,
    scoreDetails, setScoreDetails,
    isGoldenWin, setIsGoldenWin,
    wrongAnswers, setWrongAnswers,
    isReviewMode, setIsReviewMode,
    stats, setStats,
    levelOrder, setLevelOrder,
    modal, setModal,
    timeLeft, setTimeLeft,
    gameLevels,
    activeLevelData,
    restartGame,
    saveGame
  };
};
