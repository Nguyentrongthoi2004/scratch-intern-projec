import { useState, useRef, useEffect, useCallback } from 'react';
import { GRID_SIZE, MAX_X, MAX_Y, MIN_X, MIN_Y } from '../utils/gameConstants';

// Helper for sleep
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

export const useCharacter = (initialId, playSfx) => {
  const [activeCharacterId, setActiveCharacterId] = useState(initialId || 'pink');

  const [characterState, setCharacterState] = useState({
    x: 0, y: 0, rotation: 90, status: 'idle', visible: true, scale: 1,
    speechText: null, speed: 1, waitTimer: null, isWaiting: false,
    friend: null, messageColor: null, tapEffect: false
  });

  const [activeLoopType, setActiveLoopType] = useState(null);
  const [repeatProgress, setRepeatProgress] = useState(null);
  const [isFrozen, setIsFrozen] = useState(false);

  const timeoutsRef = useRef([]);

  // Dùng useCallback từ Code 1 để tối ưu
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

  const resetCharacter = useCallback((resetId = null) => {
    clearAllTimeouts();
    setCharacterState({
      x: 0, y: 0, rotation: 90, status: 'idle', visible: true, scale: 1, 
      speechText: null, speed: 1, waitTimer: null, isWaiting: false, 
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

  // Logic xử lý lệnh lấy từ Code 2 (đầy đủ tính năng hơn) nhưng bọc trong useCallback
  const processSingleCommand = useCallback((cmd) => {
    const command = cmd.trim();
    let actionStatus = 'idle';

    const moveMatch = command.match(/(?:Move )?(Right|Left|Up|Down|Forward|Backward)(?: (\d+))?/i);
    const turnMatch = command.match(/Turn (Right|Left)(?: (\d+))?/i);
    const hopMatch  = command.match(/Hop(?: (\d+))?/i);
    const colorMatch = command.match(/Color|Change/i);
    const friendMatch = command.match(/Friend|Message|Send|Receive/i);
    const stopMatch = command.match(/Stop/i);
    const pageMatch = command.match(/Page|Go To Page/i);
    const tapMatch = command.match(/Tap|Start on Tap/i);

    setCharacterState((prev) => {
      let next = { ...prev };

      if (command.match(/Fast/i))       next.speed = 3;
      else if (command.match(/Slow/i)) next.speed = 0.5;
      else if (command.match(/Reset Speed/i)) next.speed = 1;

      if (moveMatch) {
        const dir = moveMatch[1].toLowerCase();
        const steps = parseInt(moveMatch[2] || '1');
        const px = steps * GRID_SIZE;

        if (dir === 'right') { next.x += px; next.rotation = 90; }
        if (dir === 'left')  { next.x -= px; next.rotation = -90; }
        if (dir === 'up')    { next.y += px; }
        if (dir === 'down')  { next.y -= px; }
        if (dir === 'go' && command.match(/Home/i)) { next.x = 0; next.y = 0; }

        next.x = Math.max(MIN_X, Math.min(MAX_X, next.x));
        next.y = Math.max(MIN_Y, Math.min(MAX_Y, next.y));
      }
      else if (turnMatch) {
        const dir = turnMatch[1].toLowerCase();
        const steps = parseInt(turnMatch[2] || '1');
        const deg = steps * 45;
        if (dir === 'right') next.rotation += deg;
        if (dir === 'left') next.rotation -= deg;
      }
      else if (command.match(/Go Home/i)) { next.x = 0; next.y = 0; }
      else if (hopMatch) {
        const steps = parseInt(hopMatch[1] || '1');
        const px = steps * GRID_SIZE;
        const rad = (prev.rotation - 90) * (Math.PI / 180);
        next.x += Math.round(Math.cos(rad)) * px;
        next.y -= Math.round(Math.sin(rad)) * px;
        next.x = Math.max(MIN_X, Math.min(MAX_X, next.x));
        next.y = Math.max(MIN_Y, Math.min(MAX_Y, next.y));
      }
      else if (command.match(/Hide/i))   next.visible = false;
      else if (command.match(/Show/i))   next.visible = true;
      else if (command.match(/Grow/i)) { next.scale = Math.min(2, prev.scale + 0.5); if (next.scale > prev.scale) next.speechText = 'Grrr'; }
      else if (command.match(/Shrink/i)) next.scale = Math.max(0.5, prev.scale - 0.3);
      else if (command.match(/Reset/i))  { next.scale = 1; next.x = 0; next.y = 0; next.visible = true; next.speed = 1; next.friend = null; setActiveCharacterId(initialId || 'pink'); }
      else if (colorMatch) {
        next.rotation += 360;
        const newChar = getRandomCharacter(activeCharacterId);
        setActiveCharacterId(newChar);
      }
      
      if (tapMatch) { next.tapEffect = true; }

      return next;
    });

    if (moveMatch) {
      const dir = moveMatch[1].toLowerCase();
      if (dir === 'up') { actionStatus = 'jump'; playSfx('jump.mp3'); }
      else if (dir === 'down') { actionStatus = 'climb'; playSfx('climb.mp3'); }
      else { actionStatus = 'move'; playSfx('move.mp3'); }
    }
    else if (hopMatch) { actionStatus = 'jump'; playSfx('jump.mp3'); }
    else if (command.match(/Say|Think/i)) { actionStatus = 'say'; playSfx('pop.mp3'); }
    else if (friendMatch) {
       let msgColor = 'white';
       if (command.match(/Red/i)) msgColor = 'red';
       if (command.match(/Blue/i)) msgColor = 'blue';
       if (command.match(/Green/i)) msgColor = 'green';
       if (command.match(/Yellow/i)) msgColor = 'yellow';
       
       setCharacterState(prev => ({ ...prev, messageColor: msgColor }));
       actionStatus = 'throw';
       playSfx('send.mp3');

       safeSetTimeout(() => {
          setCharacterState(prev => {
             const rad = (prev.rotation - 90) * (Math.PI / 180);
             const friendX = prev.x + Math.round(Math.cos(rad)) * 80;
             const friendY = prev.y - Math.round(Math.sin(rad)) * 80;
             return {
               ...prev,
               friend: {
                 id: getRandomCharacter(activeCharacterId),
                 x: friendX, y: friendY, visible: true,
                 isAttacking: command.match(/Bump/i)
               }
             };
          });
          playSfx('send.mp3');
       }, 500);
    }
    else if (command.match(/Bump/i)) { 
        actionStatus = 'say'; 
        playSfx('bump.mp3');
        safeSetTimeout(() => {
           setCharacterState(prev => {
             const rad = (prev.rotation - 90) * (Math.PI / 180);
             const friendX = prev.x + Math.round(Math.cos(rad)) * 60;
             const friendY = prev.y - Math.round(Math.sin(rad)) * 60;
             return {
               ...prev,
               friend: {
                 id: getRandomCharacter(activeCharacterId),
                 x: friendX, y: friendY, visible: true, isAttacking: true 
               }
             };
           });
        }, 200);
    }
    else if (command.match(/Flag/i)) { actionStatus = 'flag'; playSfx('flag.mp3'); }
    else if (command.match(/Pop/i))  { playSfx('pop.mp3'); }
    else if (pageMatch) { actionStatus = 'flag'; playSfx('page.mp3'); }
    else if (stopMatch) { playSfx('stop.mp3'); }

    if (command.match(/Say|Think/i)) {
       const text = command.replace(/Say|Think/i, '').trim() || 'Hi!';
       setCharacterState(prev => ({ ...prev, speechText: text }));
       safeSetTimeout(() => setCharacterState(p => ({...p, speechText: null})), 1000);
    }

    if (command.match(/Fast|Slow|Hide|Show|Grow|Shrink|Reset|Color|Change/i)) return 'current';
    return actionStatus;
  }, [initialId, playSfx, activeCharacterId, getRandomCharacter, safeSetTimeout]);

  // --- SỬA LỖI REPEAT VÀ DÙNG USECALLBACK ---
  const executeBlockAction = useCallback(async (fullBlockText, setTimeLeft) => {
    const actions = fullBlockText.split(/\s*->\s*|\n/).filter(s => s.trim() !== '');

    const repeatMatch = fullBlockText.match(/Repeat (\d+)/i);
    const isForever = fullBlockText.match(/Forever/i);
    const isEnd = fullBlockText.match(/End/i);

    if (isEnd) { setIsFrozen(true); return; }

    if (isForever) {
       setActiveLoopType('forever');
       safeSetTimeout(() => setActiveLoopType(null), 4000);
    }

    let loopCount = 1;
    if (repeatMatch) {
       loopCount = parseInt(repeatMatch[1]);
       setActiveLoopType('repeat');
       setRepeatProgress({ current: 0, total: loopCount });
    }

    // === VÒNG LẶP CHÍNH (ĐÃ SỬA) ===
    for (let i = 0; i < loopCount; i++) {
        // Cập nhật thanh tiến trình
        if (repeatMatch) {
            setRepeatProgress({ current: i + 1, total: loopCount });
        }

        // Thực hiện từng lệnh trong chuỗi
        for (const cmd of actions) {
            let duration = 600;
            const waitMatch = cmd.match(/Wait(?: (\d+))?/i);

            if (cmd.match(/Repeat|Forever|End/i)) continue;

            if (waitMatch) {
                const secsToWait = parseInt(waitMatch[1] || '1');
                duration = 1000;
                setCharacterState(prev => ({ ...prev, isWaiting: true, status: 'idle' }));
                
                if (setTimeLeft) {
                    const stepInterval = 100;
                    const steps = (secsToWait * 1000) / stepInterval;
                    const timePerStep = secsToWait / steps;
                    for(let k=0; k<steps; k++) {
                        await sleep(stepInterval);
                        setTimeLeft(prev => Math.max(0, prev - timePerStep));
                    }
                } else {
                    await sleep(secsToWait * 1000);
                }
                setCharacterState(prev => ({ ...prev, isWaiting: false }));
            } else {
                if (cmd.match(/Hop|Jump/i)) duration = 700;
                if (cmd.match(/Say|Think/i)) duration = 1200;
                if (cmd.match(/Pop|Hide|Show|Fast|Slow/i)) duration = 400;
                if (cmd.match(/Friend|Message|Send|Receive/i)) duration = 1000;
                if (cmd.match(/Bump/i)) duration = 1000;
                if (cmd.match(/Color|Change/i)) duration = 800;
                if (cmd.match(/Turn/i)) duration = 500;
                if (cmd.match(/Go Home/i)) duration = 800;
                if (cmd.match(/Page/i)) duration = 1000;
                if (cmd.match(/Tap/i)) duration = 500;
                if (cmd.match(/Stop/i)) duration = 500;

                const newStatus = processSingleCommand(cmd);
                if (newStatus !== 'current') {
                    setCharacterState(prev => ({ ...prev, status: newStatus }));
                }
                await sleep(duration);
                
                // Clean up temporary effects
                setCharacterState(prev => ({ ...prev, tapEffect: false }));
            }
        }
        // Nghỉ một chút giữa các vòng lặp (nếu lặp)
        if (loopCount > 1) await sleep(500);
    }

    // Cleanup sau khi chạy xong hết
    setActiveLoopType(null);
    setRepeatProgress(null);
    setCharacterState(prev => ({ ...prev, status: 'idle', speechText: null, messageColor: null }));
  }, [processSingleCommand, safeSetTimeout]);

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