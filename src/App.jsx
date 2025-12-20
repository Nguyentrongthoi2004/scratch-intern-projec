// src/App.jsx
import { useState, useEffect } from 'react';
import GameScreen from './components/Game/GameScreen';
import MainMenu from './components/Menu/MainMenu';
import DifficultySelection from './components/Menu/DifficultySelection';
import CharacterSelection from './components/Menu/CharacterSelection';
import TutorialScreen from './components/Tutorial/TutorialScreen';
import MouseTrail from './components/UI/MouseTrail';

function App() {
  const [currentScreen, setCurrentScreen] = useState('menu');
  const [difficulty, setDifficulty] = useState('easy');
  const [character, setCharacter] = useState('pink'); 
  
  // 1. THÊM STATE UI SCALE (Mặc định 100%)
  const [uiScale, setUiScale] = useState(100);

  // Hàm "Dịch chuyển"
  const goHome = () => setCurrentScreen('menu');
  const goGuide = () => setCurrentScreen('tutorial');

  return (
    // Áp dụng scale cho toàn bộ ứng dụng (nếu bạn muốn zoom cả app)
    // Hoặc chỉ truyền setUiScale xuống để Settings chỉnh
    <div 
      className="h-screen overflow-hidden font-sans select-none App"
      style={{ zoom: uiScale / 100 }} // (Tùy chọn) Dòng này giúp UI thực sự to/nhỏ
    >
      
      <MouseTrail />

      {/* 2. MENU CHÍNH */}
      {currentScreen === 'menu' && (
        <MainMenu 
          onStart={() => setCurrentScreen('character')} 
          onTutorial={goGuide} 
          onGoHome={goHome} 
          onGoGuide={goGuide}
          
          // --- QUAN TRỌNG: Truyền setUiScale xuống ---
          setUiScale={setUiScale} 
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
            difficulty={difficulty} 
            characterId={character}
            onBack={goHome} 
            onGoGuide={goGuide}
            
            // --- QUAN TRỌNG: Truyền setUiScale xuống ---
            setUiScale={setUiScale}
          />
        </div>
      )}

      {/* 6. MÀN HÌNH HƯỚNG DẪN */}
      {currentScreen === 'tutorial' && (
        <TutorialScreen 
          onBack={goHome} 
          onGoHome={goHome} 
          onGoGuide={goGuide}
          
          // --- QUAN TRỌNG: Truyền setUiScale xuống ---
          setUiScale={setUiScale}
        />
      )}

    </div>
  );
}

export default App;