import { useState, useRef, useEffect, useCallback } from 'react';
import { GRID_SIZE, MAX_X, MAX_Y, MIN_X, MIN_Y } from '../utils/gameConstants';

// Danh sách âm thanh có sẵn trong folder assets
const AVAILABLE_SOUNDS = [
  'bg', 'bump', 'climb', 'ding', 'flag', 'hurt', 'jump', 
  'lose', 'move', 'pop', 'save', 'send', 'throw', 'win'
];

// Helper: Tạm dừng (Sleep)
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

export const useCharacter = (initialId, playSfx) => {
  const [activeCharacterId, setActiveCharacterId] = useState(initialId || 'pink');

  // State quản lý toàn bộ nhân vật
  const [characterState, setCharacterState] = useState({
    x: 0, 
    y: 0, 
    rotation: 90, 
    status: 'idle', // Các status: idle, move, jump, climb, say, throw, bump, stop, page, tap, teleport, turn
    visible: true, 
    scale: 1,
    speechText: null, 
    speed: 1, 
    isWaiting: false,
    waitTimer: null, // Thêm state để hiển thị countdown
    friend: null, 
    messageColor: null, 
    tapEffect: false
  });

  const [activeLoopType, setActiveLoopType] = useState(null);
  const [repeatProgress, setRepeatProgress] = useState(null);
  const [isFrozen, setIsFrozen] = useState(false);

  const timeoutsRef = useRef([]);

  // --- QUẢN LÝ TIMER ---
  const safeSetTimeout = useCallback((callback, delay) => {
    const id = setTimeout(() => {
      timeoutsRef.current = timeoutsRef.current.filter(tId => tId !== id);
      callback();
    }, delay);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(id => clearTimeout(id));
    timeoutsRef.current = [];
  }, []);

  useEffect(() => {
    return () => clearAllTimeouts();
  }, [clearAllTimeouts]);

  // --- RESET GAME ---
  const resetCharacter = useCallback((resetId = null) => {
    clearAllTimeouts();
    setCharacterState({
      x: 0, y: 0, rotation: 90, status: 'idle', visible: true, scale: 1, 
      speechText: null, speed: 1, isWaiting: false, waitTimer: null,
      friend: null, messageColor: null, tapEffect: false
    });
    setActiveLoopType(null);
    setRepeatProgress(null);
    setIsFrozen(false);
    if (resetId) setActiveCharacterId(resetId);
  }, [clearAllTimeouts]);

  const getRandomCharacter = useCallback((excludeId) => {
    const chars = ['pink', 'dude', 'owlet'];
    const available = chars.filter(c => c !== excludeId);
    return available[Math.floor(Math.random() * available.length)];
  }, []);

  // --- XỬ LÝ LOGIC TỪNG CÂU LỆNH (CORE LOGIC) ---
  const processSingleCommand = useCallback((cmd) => {
    const command = cmd.trim();
    let actionStatus = 'idle';

    // Regex bắt lệnh và tham số
    const moveMatch = command.match(/(?:Move )?(Right|Left|Up|Down|Forward|Backward)(?: (\d+))?/i);
    const turnMatch = command.match(/Turn (Right|Left)(?: (\d+))?/i);
    const hopMatch  = command.match(/Hop(?: (\d+))?/i);
    
    // Grow/Shrink có tham số động
    const growMatch = command.match(/Grow(?: (\d+))?/i);
    const shrinkMatch = command.match(/Shrink(?: (\d+))?/i);

    const msgSendMatch = command.match(/Friend|Message|Send/i); 
    const msgReceiveMatch = command.match(/Receive/i);
    const pageMatch = command.match(/Page|Go To Page/i);
    const tapMatch = command.match(/Tap|Start on Tap/i);
    const stopMatch = command.match(/Stop/i);
    const bumpMatch = command.match(/Bump/i);
    const playSoundMatch = command.match(/Play Sound/i);
    const goHomeMatch = command.match(/Go Home/i);

    // 1. Cập nhật Biến số (Toán học)
    setCharacterState((prev) => {
      let next = { ...prev };

      // Tốc độ animation
      if (command.match(/Fast/i)) next.speed = 3;
      else if (command.match(/Slow/i)) next.speed = 0.5;
      else if (command.match(/Reset Speed/i)) next.speed = 1;

      // Di chuyển
      if (moveMatch) {
         const dir = moveMatch[1].toLowerCase();
         const steps = parseInt(moveMatch[2] || '1');
         const px = steps * GRID_SIZE; // Grid size mặc định (ví dụ 60px)

         if (dir === 'right') { 
             next.x += px; 
             next.rotation = 90; // Move Right ép góc quay sang phải
         }
         if (dir === 'left')  { 
             next.x -= px; 
             next.rotation = -90; // Move Left ép góc quay sang trái
         }
         if (dir === 'up')    { next.y += px; }
         if (dir === 'down')  { next.y -= px; }
         
         // Giới hạn khung hình
         next.x = Math.max(MIN_X, Math.min(MAX_X, next.x));
         next.y = Math.max(MIN_Y, Math.min(MAX_Y, next.y));
      }
      // --- LOGIC XOAY (TURN) ---
      else if (turnMatch) {
         const dir = turnMatch[1].toLowerCase();
         const steps = parseInt(turnMatch[2] || '1');
         const deg = steps * 45; // Turn 2 = 90 độ
         
         if (dir === 'right') next.rotation += deg;
         if (dir === 'left') next.rotation -= deg;
         // Chỉ đổi rotation, KHÔNG đổi x, y
      }
      // Teleport về nhà
      else if (goHomeMatch) { 
          next.x = 0; 
          next.y = 0; 
      }
      // Nhảy tới
      else if (hopMatch) {
         const steps = parseInt(hopMatch[1] || '1');
         const px = steps * GRID_SIZE;
         const rad = (prev.rotation - 90) * (Math.PI / 180);
         next.x += Math.round(Math.cos(rad)) * px;
         next.y -= Math.round(Math.sin(rad)) * px;
         
         next.x = Math.max(MIN_X, Math.min(MAX_X, next.x));
         next.y = Math.max(MIN_Y, Math.min(MAX_Y, next.y));
      }
      // Ẩn hiện
      else if (command.match(/Hide/i))   next.visible = false;
      else if (command.match(/Show/i))   next.visible = true;
      else if (command.match(/Reset/i))  { 
          next.scale = 1; next.x = 0; next.y = 0; 
          next.visible = true; next.speed = 1; next.friend = null; 
          setActiveCharacterId(initialId || 'pink'); 
      }
      
      // Grow/Shrink động (10 đơn vị = 1.0 scale)
      else if (growMatch) {
          const amount = parseInt(growMatch[1] || '5'); 
          next.scale = Math.min(3, prev.scale + (amount / 10)); 
          // FIX: Grow không nên trigger bong bóng thoại
          next.speechText = null;
      }
      else if (shrinkMatch) {
          const amount = parseInt(shrinkMatch[1] || '5');
          next.scale = Math.max(0.2, prev.scale - (amount / 10));
      }
      // Đổi màu (Skin)
      else if (command.match(/Color|Change/i)) {
        next.rotation += 360;
        setActiveCharacterId(getRandomCharacter(activeCharacterId));
      }

      if (tapMatch) { next.tapEffect = true; }
      return next;
    });

    // 2. Xác định Status & Hiệu ứng (Visual & Sound)
    if (moveMatch) {
      const dir = moveMatch[1].toLowerCase();
      if (dir === 'up') { actionStatus = 'jump'; playSfx('jump.mp3'); }
      else if (dir === 'down') { actionStatus = 'climb'; playSfx('climb.mp3'); }
      else { actionStatus = 'move'; playSfx('move.mp3'); }
    }
    // --- TURN: Dùng status 'turn' (để hiển thị ảnh tĩnh xoay) ---
    else if (turnMatch) {
        actionStatus = 'turn'; // Đổi từ 'idle' sang 'turn'
        // playSfx('swish.mp3'); 
    }
    else if (hopMatch) { actionStatus = 'jump'; playSfx('jump.mp3'); }
    else if (command.match(/Say|Think/i)) { actionStatus = 'say'; playSfx('pop.mp3'); }
    
    // --- STOP ---
    else if (stopMatch) {
        actionStatus = 'stop'; 
        playSfx('stop.mp3');
    }
    
    // --- BUMP (Tạo vật cản) ---
    else if (bumpMatch) {
        actionStatus = 'bump';
        playSfx('bump.mp3');
        safeSetTimeout(() => {
           setCharacterState(prev => {
             const rad = (prev.rotation - 90) * (Math.PI / 180);
             // Vật cản xuất hiện phía trước 1 ô
             const friendX = prev.x + Math.round(Math.cos(rad)) * GRID_SIZE; 
             const friendY = prev.y - Math.round(Math.sin(rad)) * GRID_SIZE;
             return {
               ...prev,
               friend: { id: 'rock', x: friendX, y: friendY, visible: true, isAttacking: false } 
             };
           });
        }, 100);
    }

    // --- PAGE ---
    else if (pageMatch) { 
        actionStatus = 'page'; 
        playSfx('page.mp3'); 
    }

    // --- TAP ---
    else if (tapMatch) {
        actionStatus = 'tap'; 
        playSfx('ding.mp3');
    }

    // --- GO HOME (Teleport Effect) ---
    else if (goHomeMatch) {
        actionStatus = 'teleport';
        playSfx('save.mp3'); 
    }
    
    // --- PLAY SOUND (Random) ---
    else if (playSoundMatch) {
        actionStatus = 'say'; // Nhân vật nhún nhảy theo nhạc
        const randomSound = AVAILABLE_SOUNDS[Math.floor(Math.random() * AVAILABLE_SOUNDS.length)];
        playSfx(`${randomSound}.mp3`);
    }

    // --- SEND / RECEIVE ---
    else if (msgSendMatch) {
       let msgColor = 'white';
       if (command.match(/Red/i)) msgColor = 'red';
       if (command.match(/Blue/i)) msgColor = 'blue';
       if (command.match(/Green/i)) msgColor = 'green';
       if (command.match(/Yellow|Orange/i)) msgColor = 'yellow';
       
       setCharacterState(prev => ({ ...prev, messageColor: msgColor }));
       actionStatus = 'throw';
       playSfx('send.mp3');
    }
    else if (msgReceiveMatch) {
        actionStatus = 'read'; // Khác với throw, đây là trạng thái đọc thư
        playSfx('page.mp3');
    }

    // --- FLAG / POP ---
    else if (command.match(/Flag/i)) { actionStatus = 'flag'; playSfx('flag.mp3'); }
    else if (command.match(/Pop/i))  { playSfx('pop.mp3'); }

    // Xử lý bong bóng thoại
    if (command.match(/Say|Think/i)) {
       const text = command.replace(/Say|Think/i, '').trim() || 'Hi!';
       setCharacterState(prev => ({ ...prev, speechText: text }));
       safeSetTimeout(() => setCharacterState(p => ({...p, speechText: null})), 1500);
    }

    if (command.match(/Fast|Slow|Hide|Show|Grow|Shrink|Reset|Color|Change/i)) return 'current';
    return actionStatus;

  }, [initialId, playSfx, activeCharacterId, getRandomCharacter, safeSetTimeout]);

  // --- HÀM CHẠY CHUỖI LỆNH (EXECUTION LOOP) ---
  const executeBlockAction = useCallback(async (fullBlockText, setTimeLeft) => {
    const actions = fullBlockText.split(/\s*->\s*|\n/).filter(s => s.trim() !== '');

    const repeatMatch = fullBlockText.match(/Repeat (\d+)/i);
    const isForever = fullBlockText.match(/Forever/i);
    // Fix Regex cho End
    const isEnd = fullBlockText.match(/\bEnd\b/i) || fullBlockText.match(/^End$/i);

    // Xử lý END (Đóng băng)
    if (isEnd) { setIsFrozen(true); return; }

    let loopCount = 1;
    if (isForever) {
       // Forever lặp lại nhiều lần (giả lập vô tận cho đến khi hết time)
       loopCount = 999;
       setActiveLoopType('forever');
    } else if (repeatMatch) {
       loopCount = parseInt(repeatMatch[1]);
       setActiveLoopType('repeat');
       setRepeatProgress({ current: 0, total: loopCount });
    }

    // VÒNG LẶP CHÍNH
    for (let i = 0; i < loopCount; i++) {
        // Nếu bị đóng băng giữa chừng (do Stop/End ở đâu đó), break
        if (isFrozen) break;

        if (repeatMatch) {
            setRepeatProgress({ current: i + 1, total: loopCount });
        }

        for (const cmd of actions) {
            let duration = 600;
            const waitMatch = cmd.match(/Wait(?: (\d+))?/i);

            // Bỏ qua các từ khóa điều khiển luồng trong vòng lặp con
            if (cmd.match(/Repeat|Forever|End/i)) continue;

            // XỬ LÝ LỆNH WAIT (FIX LỖI SỐ LẺ & HIỂN THỊ TIMER)
            if (waitMatch) {
                const secsToWait = parseInt(waitMatch[1] || '1');
                duration = 1000;
                setCharacterState(prev => ({ ...prev, isWaiting: true, status: 'idle' }));
                
                // Hiển thị countdown timer cục bộ
                for (let s = secsToWait; s > 0; s--) {
                     setCharacterState(prev => ({ ...prev, waitTimer: s }));
                     await sleep(1000); // Wait 1s
                }
                setCharacterState(prev => ({ ...prev, waitTimer: null, isWaiting: false }));
            } else {
                // XỬ LÝ CÁC LỆNH KHÁC
                if (cmd.match(/Hop|Jump/i)) duration = 700;
                if (cmd.match(/Say|Think/i)) duration = 1500;
                if (cmd.match(/Pop|Hide|Show|Fast|Slow/i)) duration = 400;

                // Tăng duration cho Send để thấy hiệu ứng
                if (cmd.match(/Friend|Message|Send/i)) duration = 1200;
                // Giảm duration cho Receive để nó chuyển qua lệnh Move nhanh hơn nếu cần
                if (cmd.match(/Receive/i)) duration = 600;

                if (cmd.match(/Bump|Stop|Page|Tap/i)) duration = 1000;
                if (cmd.match(/Go Home/i)) duration = 1000;

                const newStatus = processSingleCommand(cmd);
                
                // Cập nhật status
                if (newStatus !== 'current') {
                    setCharacterState(prev => ({ ...prev, status: newStatus }));
                }

                // Nếu là Stop, giữ trạng thái lâu hơn tí
                if (newStatus === 'stop') {
                    await sleep(1500);
                } else {
                    await sleep(duration);
                }
                
                // Sau khi xong hành động, reset về trạng thái thường
                setCharacterState(prev => ({ ...prev, tapEffect: false }));
            }
        }
        // Nghỉ một chút giữa các vòng lặp
        if (loopCount > 1 && i < loopCount - 1) await sleep(300);
    }

    // Kết thúc chuỗi lệnh
    setActiveLoopType(null);
    setRepeatProgress(null);
    // Reset status về idle nếu không phải End/Stop
    setCharacterState(prev => ({ ...prev, status: 'idle', speechText: null, messageColor: null, waitTimer: null }));
  }, [processSingleCommand, safeSetTimeout, isFrozen]);

  return {
      activeCharacterId, setActiveCharacterId,
      characterState, setCharacterState,
      activeLoopType, setActiveLoopType,
      repeatProgress, setRepeatProgress,
      isFrozen, setIsFrozen,
      resetCharacter,
      executeBlockAction,
      clearAllTimeouts
  };
};
