// src/App.jsx
import { useState, useEffect } from 'react';
import GameScreen from './components/Game/GameScreen';
import MainMenu from './components/Menu/MainMenu';
import DifficultySelection from './components/Menu/DifficultySelection';
import CharacterSelection from './components/Menu/CharacterSelection';
import TutorialScreen from './components/Tutorial/TutorialScreen';
import LeaderboardScreen from './components/Menu/LeaderboardScreen';
import AboutScreen from './components/Menu/AboutScreen';
import MouseTrail from './components/UI/MouseTrail';

function App() {
  const [currentScreen, setCurrentScreen] = useState('menu');
  const [difficulty, setDifficulty] = useState('easy');
  const [character, setCharacter] = useState('pink'); 
  const [loadGame, setLoadGame] = useState(false);
  
  // GLOBAL UI & AUDIO STATE
  const [uiScale, setUiScale] = useState(100);
  const [bgmVolume, setBgmVolume] = useState(30);
  const [sfxVolume, setSfxVolume] = useState(90);
  const [enableSound, setEnableSound] = useState(true);

  // --- GLOBAL AUDIO CONTROLLER ---
  // Use a persistent Audio object
  const [audioObj] = useState(new Audio('/assets/sounds/bg.mp3'));

  useEffect(() => {
    audioObj.loop = true;
    return () => {
        audioObj.pause();
    }
  }, [audioObj]);

  useEffect(() => {
      audioObj.volume = Math.max(0, Math.min(1, bgmVolume / 100));
      if (enableSound) {
          audioObj.play().catch(e => console.log("Audio play failed (interaction needed):", e));
      } else {
          audioObj.pause();
      }
  }, [bgmVolume, enableSound, audioObj]);


  // Navigation Handlers
  const goHome = () => setCurrentScreen('menu');
  const goGuide = () => setCurrentScreen('tutorial');
  const goLeaderboard = () => setCurrentScreen('leaderboard');
  const goAbout = () => setCurrentScreen('about');

  const handleContinue = () => {
    try {
      const save = JSON.parse(localStorage.getItem('scratch_game_save'));
      if (save) {
        setDifficulty(save.difficulty || 'easy');
        setCharacter(save.characterId || 'pink');
        setLoadGame(true);
        setCurrentScreen('game');
      }
    } catch (e) {
      console.error("Failed to load game", e);
    }
  };

  const handleStartNew = () => {
    setLoadGame(false);
    localStorage.removeItem('scratch_game_save');
    setCurrentScreen('character');
  };

  const handleNextLevel = () => {
    if (difficulty === 'easy') setDifficulty('normal');
    else if (difficulty === 'normal') setDifficulty('hard');
    setTimeout(() => setCurrentScreen('game'), 0);
  };

  return (
    <div 
      className="h-screen overflow-hidden font-sans select-none App"
      style={{ zoom: uiScale / 100 }}
    >
      <MouseTrail />

      {/* 2. MENU CHÍNH */}
      {currentScreen === 'menu' && (
        <MainMenu 
          onStart={handleStartNew}
          onContinue={handleContinue}
          onTutorial={goGuide} 
          onLeaderboard={goLeaderboard}
          onAbout={goAbout}
          onGoHome={goHome} 
          onGoGuide={goGuide}
          
          // Props for Global State
          uiScale={uiScale} setUiScale={setUiScale}
          bgmVolume={bgmVolume} setBgmVolume={setBgmVolume}
          sfxVolume={sfxVolume} setSfxVolume={setSfxVolume}
          enableSound={enableSound} setEnableSound={setEnableSound}
        />
      )}

      {/* 3. CHỌN NHÂN VẬT */}
      {currentScreen === 'character' && (
        <CharacterSelection 
          onSelectCharacter={(charId) => {
            setCharacter(charId); 
            setCurrentScreen('difficulty');
          }}
          onBack={goHome} 
        />
      )}

      {/* 4. CHỌN ĐỘ KHÓ */}
      {currentScreen === 'difficulty' && (
        <DifficultySelection 
          onSelectDifficulty={(diff) => {
            setDifficulty(diff);
            setCurrentScreen('game');
          }}
          onBack={() => setCurrentScreen('character')}
        />
      )}

      {/* 5. MÀN HÌNH GAME */}
      {currentScreen === 'game' && (
        <div className="relative h-full">
          <GameScreen 
            key={`${difficulty}-${character}-${loadGame ? 'load' : 'new'}`}
            difficulty={difficulty} 
            characterId={character}
            loadGame={loadGame}
            onBack={goHome} 
            onGoGuide={goGuide}
            onNextLevel={handleNextLevel}
            
            // Props for Global State
            uiScale={uiScale} setUiScale={setUiScale}
            bgmVolume={bgmVolume} setBgmVolume={setBgmVolume}
            sfxVolume={sfxVolume} setSfxVolume={setSfxVolume}
            enableSound={enableSound} setEnableSound={setEnableSound}
          />
        </div>
      )}

      {/* 6. MÀN HÌNH HƯỚNG DẪN */}
      {currentScreen === 'tutorial' && (
        <TutorialScreen 
          onBack={goHome} 
          onGoHome={goHome} 
          onGoGuide={goGuide}
          setUiScale={setUiScale}
        />
      )}

      {/* 7. BẢNG XẾP HẠNG */}
      {currentScreen === 'leaderboard' && (
        <LeaderboardScreen onBack={goHome} />
      )}

      {/* 8. GIỚI THIỆU */}
      {currentScreen === 'about' && (
        <AboutScreen onBack={goHome} />
      )}

    </div>
  );
}

export default App;