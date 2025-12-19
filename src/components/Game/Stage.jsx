import React from 'react';

const Stage = ({ x, y, rotation, status, characterId, speechText, visible = true, scale = 1 }) => {
  
  const CHAR_CONFIG = {
    pink: { idle: { fileName: 'Pink_Monster_Idle_4.png', frames: 4 }, move: { fileName: 'Pink_Monster_Run_6.png', frames: 6 }, hurt: { fileName: 'Pink_Monster_Hurt_4.png', frames: 4 }, death: { fileName: 'Pink_Monster_Death_8.png', frames: 8 } },
    owlet: { idle: { fileName: 'Owlet_Monster_Idle_4.png', frames: 4 }, move: { fileName: 'Owlet_Monster_Run_6.png', frames: 6 }, hurt: { fileName: 'Owlet_Monster_Hurt_4.png', frames: 4 }, death: { fileName: 'Owlet_Monster_Death_8.png', frames: 8 } },
    dude: { idle: { fileName: 'Dude_Monster_Idle_4.png', frames: 4 }, move: { fileName: 'Dude_Monster_Run_6.png', frames: 6 }, hurt: { fileName: 'Dude_Monster_Hurt_4.png', frames: 4 }, death: { fileName: 'Dude_Monster_Death_8.png', frames: 8 } }
  };

  const safeId = characterId || 'pink';
  const currentConfig = CHAR_CONFIG[safeId] || CHAR_CONFIG.pink;
  const animData = currentConfig[status] || currentConfig.idle;
  const imageUrl = `/assets/images/characters/${safeId}/${animData.fileName}`;
  const animSpeed = status === 'death' ? '1s' : '0.6s'; // Tăng tốc độ chạy lên 0.6s cho mượt
  const isMoving = status === 'move';

  return (
    <div className="relative w-full h-full overflow-hidden font-mono border-4 border-gray-700 shadow-inner bg-sky-200 rounded-xl group">
      
      {/* --- 1. ẢNH NỀN (TỐI ƯU HÓA) --- */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
            backgroundImage: "url('/assets/images/bg-stage1.png')", 
            imageRendering: 'pixelated',
            // SỬA: Dùng 'cover' để ảnh luôn lấp đầy khung mà không bị méo tỷ lệ
            backgroundSize: 'cover', 
            backgroundPosition: 'left bottom', 
            backgroundRepeat: 'repeat-x',      
            animation: `bg-scroll 8s linear infinite`, // Tốc độ cuộn nhanh hơn xíu
            animationPlayState: isMoving ? 'running' : 'paused'
        }}
      ></div>

      {/* --- 2. CONTAINER NHÂN VẬT --- */}
      <div
        className="absolute z-10 w-32 h-32 transition-all duration-300 ease-out will-change-transform" // Giảm duration xuống 300ms để phản hồi nhanh hơn
        style={{
          bottom: '18%', 
          left: '50%',
          // Thêm độ nảy (scale) khi di chuyển
          transform: `translate(calc(-50% + ${x}px), calc(0% + ${y * -1}px)) rotate(${rotation - 90}deg) ${isMoving ? 'scale(1.1)' : 'scale(1)'}`,
          opacity: status === 'death' ? 0.8 : 1,
          filter: status === 'death' ? 'grayscale(100%)' : 'none'
        }}
      >
        <div className="relative w-full h-full overflow-hidden">
            <img 
                src={imageUrl}
                alt="Character"
                className="absolute top-0 left-0 h-full max-w-none"
                style={{
                    imageRendering: 'pixelated',
                    width: `${animData.frames * 100}%`,
                    animation: `sprite-slide ${animSpeed} steps(${animData.frames}) infinite`
                }}
                onError={(e) => {
                  const idleFileName = CHAR_CONFIG[safeId]?.idle?.fileName || CHAR_CONFIG.pink.idle.fileName;
                  const pinkIdle = CHAR_CONFIG.pink.idle.fileName;

                  // Check if we are already trying to load the current char idle
                  if (e.target.src.includes(idleFileName)) {
                      // If current char idle fails, try Pink monster idle (absolute path)
                      if (!e.target.src.includes('pink/' + pinkIdle)) {
                          e.target.src = `/assets/images/characters/pink/${pinkIdle}`;
                      }
                  } else {
                      // If some other animation failed, try current char idle
                      e.target.src = `/assets/images/characters/${safeId}/${idleFileName}`;
                  }
                }}
            />
        </div>

        {/* HIỆU ỨNG BỤI (DUST PARTICLES) KHI CHẠY */}
        {isMoving && (
            <div className="absolute w-16 h-4 -translate-x-1/2 opacity-50 bottom-2 left-1/2">
                <div className="absolute w-4 h-4 bg-white rounded-full animate-ping" style={{left: '0', animationDuration: '0.6s'}}></div>
                <div className="absolute w-3 h-3 bg-white rounded-full animate-ping" style={{left: '20px', animationDelay: '0.2s'}}></div>
            </div>
        )}

        {/* Bong bóng hội thoại */}
        {speechText && (
            <div className="absolute z-20 -translate-x-1/2 -top-16 left-1/2 animate-bounce">
                <div className="bg-white border-2 border-black px-3 py-2 rounded-lg shadow-md min-w-[80px] text-center font-bold text-xs text-black relative">
                    {speechText}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-black"></div>
                    <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-white"></div>
                </div>
            </div>
        )}
      </div>

      <style>{`
        @keyframes bg-scroll {
          from { background-position-x: 0; }
          to { background-position-x: -100%; }
        }
      `}</style>
    </div>
  );
};

export default Stage;