// src/App.jsx
import { useState, useEffect } from 'react';
import GameScreen from './components/Game/GameScreen';
import MainMenu from './components/Menu/MainMenu';
import DifficultySelection from './components/Menu/DifficultySelection';
import CharacterSelection from './components/Menu/CharacterSelection';
import TutorialScreen from './components/Tutorial/TutorialScreen';
import LeaderboardScreen from './components/Menu/LeaderboardScreen';
import AboutScreen from './components/Menu/AboutScreen';
import ShopScreen from './components/Menu/ShopScreen';
import MouseTrail from './components/UI/MouseTrail';
import { audioManager } from './utils/audioManager';

function App() {
  const [currentScreen, setCurrentScreen] = useState('menu');
  const [difficulty, setDifficulty] = useState('easy');
  const [character, setCharacter] = useState('pink'); 
  const [loadGame, setLoadGame] = useState(false);
  
  // GLOBAL ECONOMY & INVENTORY STATE
  const [totalPoints, setTotalPoints] = useState(() => {
    try {
      const saved = localStorage.getItem('scratch_game_userdata');
      if (saved) return JSON.parse(saved).totalPoints || 0;
    } catch (e) {
      // ignore
    }
    return 0;
  });

  const [inventory, setInventory] = useState(() => {
    try {
      const saved = localStorage.getItem('scratch_game_userdata');
      if (saved) return JSON.parse(saved).inventory || { hint: 1, skip: 1, heal: 1 };
    } catch (e) {
      // ignore
    }
    return { hint: 1, skip: 1, heal: 1 };
  });

  // Persist User Data
  useEffect(() => {
    localStorage.setItem('scratch_game_userdata', JSON.stringify({
      totalPoints,
      inventory
    }));
  }, [totalPoints, inventory]);

  // GLOBAL UI & AUDIO STATE
  const [uiScale, setUiScale] = useState(100);
  const [bgmVolume, setBgmVolume] = useState(30);
  const [sfxVolume, setSfxVolume] = useState(90);
  const [enableSound, setEnableSound] = useState(true);

  // --- GLOBAL AUDIO CONTROLLER ---
  // Using audioManager to handle autoplay and preloading
  useEffect(() => {
    audioManager.initBgm('assets/sounds/bg.mp3');
    // Preload common SFX
    audioManager.preloadSfx([
      'bg.mp3', 'climb.mp3', 'hurt.mp3', 'jump.mp3',
      'lose.mp3', 'move.mp3', 'pop.mp3', 'win.mp3',
      'page.mp3', 'stop.mp3'
    ]);

    // Handle Autoplay Policy: Retry playing on first interaction
    const unlockAudio = () => {
      audioManager.unlockAudio();
    };

    window.addEventListener('click', unlockAudio);
    window.addEventListener('keydown', unlockAudio);

    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      audioManager.pauseBgm();
    };
  }, []); // Run once on mount

  // Sync state with manager
  useEffect(() => {
    audioManager.setBgmVolume(bgmVolume);
    audioManager.setSfxVolume(sfxVolume);
    audioManager.setEnabled(enableSound);
  }, [bgmVolume, sfxVolume, enableSound]);


  // Navigation Handlers
  const goHome = () => setCurrentScreen('menu');
  const goGuide = () => setCurrentScreen('tutorial');
  const goLeaderboard = () => setCurrentScreen('leaderboard');
  const goAbout = () => setCurrentScreen('about');
  const goShop = () => setCurrentScreen('shop');

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
          onShop={goShop}
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
            
            // Economy & Inventory
            totalPoints={totalPoints}
            setTotalPoints={setTotalPoints}
            inventory={inventory}
            setInventory={setInventory}

            // Props for Global State
            uiScale={uiScale} setUiScale={setUiScale}
            bgmVolume={bgmVolume} setBgmVolume={setBgmVolume}
            sfxVolume={sfxVolume} setSfxVolume={setSfxVolume}
            enableSound={enableSound} setEnableSound={setEnableSound}
          />
        </div>
      )}

      {/* SHOP SCREEN */}
      {currentScreen === 'shop' && (
        <ShopScreen
          onBack={goHome}
          totalPoints={totalPoints}
          setTotalPoints={setTotalPoints}
          inventory={inventory}
          setInventory={setInventory}
        />
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