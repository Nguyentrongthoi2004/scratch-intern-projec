// useSmoothMotion.js (hoặc để chung trong file useCharacter)
import { useState, useRef, useEffect } from 'react';

// Hàm nội suy tuyến tính (Linear Interpolation)
const lerp = (start, end, factor) => start + (end - start) * factor;

export const useSmoothMotion = (targetX, targetY, speed = 5) => {
  const [visualPos, setVisualPos] = useState({ x: targetX, y: targetY });
  const reqRef = useRef();
  const lastTimeRef = useRef();

  useEffect(() => {
    const animate = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      lastTimeRef.current = time;

      setVisualPos(prev => {
        // Nếu đã rất gần đích thì gán luôn để đỡ tốn tài nguyên
        if (Math.abs(targetX - prev.x) < 0.5 && Math.abs(targetY - prev.y) < 0.5) {
          return { x: targetX, y: targetY };
        }

        // Dùng Lerp để tạo cảm giác trượt mượt mà (Ease-out)
        // Lưu ý: speed ở đây được dùng trong dependency để trigger effect,
        // nhưng logic lerp hiện tại dùng hằng số 0.15 cho độ mượt.
        
        return {
          x: lerp(prev.x, targetX, 0.15), // 0.15 là độ mượt (càng nhỏ càng trượt)
          y: lerp(prev.y, targetY, 0.15)
        };
      });

      reqRef.current = requestAnimationFrame(animate);
    };

    reqRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(reqRef.current);
  }, [targetX, targetY, speed]);

  return visualPos; // Trả về tọa độ dùng để Render
};
