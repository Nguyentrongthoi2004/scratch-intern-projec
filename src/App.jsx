// src/App.jsx
import { useState } from 'react';
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

  // --- ĐỊNH NGHĨA 2 HÀM "DỊCH CHUYỂN" ---
  // Hàm này là cái "Link" để về nhà
  const goHome = () => setCurrentScreen('menu');
  // Hàm này là cái "Link" để sang hướng dẫn
  const goGuide = () => setCurrentScreen('tutorial');

  return (
    <div className="h-screen overflow-hidden font-sans select-none App">
      
      <MouseTrail />

      {/* 2. MENU CHÍNH */}
      {currentScreen === 'menu' && (
        <MainMenu 
          onStart={() => setCurrentScreen('character')} 
          onTutorial={goGuide} // Nút to ngoài Menu
          
          // --- QUAN TRỌNG: Truyền 2 hàm này xuống để SettingsModal dùng ---
          onGoHome={goHome}   // Để nút Home trong Setting hoạt động
          onGoGuide={goGuide} // Để nút Guide trong Setting hoạt động
        />
      )}

      {/* 3. CHỌN NHÂN VẬT */}
      {currentScreen === 'character' && (
        <CharacterSelection 
          onSelectCharacter={(charId) => {
            setCharacter(charId); 
            setCurrentScreen('difficulty');
          }}
          onBack={goHome} // Tận dụng hàm goHome
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
            onBack={goHome}     // Nút thoát game về menu
            onGoGuide={goGuide} // <--- QUAN TRỌNG: Truyền hàm này vào để nút Guide trong game hoạt động
          />
        </div>
      )}

      {/* 6. MÀN HÌNH HƯỚNG DẪN */}
      {currentScreen === 'tutorial' && (
        <TutorialScreen 
          onBack={goHome} // Nút quay lại mặc định
          
          // --- QUAN TRỌNG: Truyền 2 hàm này xuống để SettingsModal dùng ---
          onGoHome={goHome}   
          onGoGuide={goGuide}
        />
      )}

    </div>
  );
}

export default App;