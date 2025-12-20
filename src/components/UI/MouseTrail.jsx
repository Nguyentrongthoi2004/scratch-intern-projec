// src/components/UI/MouseTrail.jsx
import React, { useEffect, useRef } from 'react';

const MouseTrail = () => {
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // CẤU HÌNH ĐỘ MƯỢT
    const lineWidth = 3;    // Độ dày dây
    const maxAge = 600;     // Thời gian tồn tại của một điểm (ms). Tăng lên thì dây dài và lâu tan hơn.

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // --- HÀM VẼ LOOP ---
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();
      const points = pointsRef.current;

      // 1. LỌC BỎ ĐIỂM CŨ
      // Loại bỏ các điểm ở đầu mảng (đuôi dây) nếu nó đã tồn tại quá lâu
      while (points.length > 0 && now - points[0].created > maxAge) {
        points.shift();
      }

      if (points.length > 1) {
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = lineWidth;
        ctx.shadowBlur = 10;

        for (let i = 0; i < points.length - 1; i++) {
          const point = points[i];
          const nextPoint = points[i + 1];
          
          // Tính tuổi của điểm này
          const age = now - point.created;
          // Tính % sự sống còn lại (1 là mới sinh, 0 là sắp chết)
          let lifePercent = 1 - (age / maxAge);
          // Két hợp với vị trí trong mảng để tạo hiệu ứng đuôi mờ dần
          const indexPercent = i / points.length; 

          // Alpha cuối cùng là sự kết hợp của cả hai yếu tố trên để cực mượt
          const alpha = lifePercent * indexPercent;

          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(nextPoint.x, nextPoint.y);

          // Màu cầu vồng xoay theo thời gian
          const hue = (i * 2 + now / 10) % 360; 
          const color = `hsla(${hue}, 100%, 50%, ${alpha})`;
          
          ctx.strokeStyle = color;
          ctx.shadowColor = color;
          ctx.stroke();
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // --- XỬ LÝ DI CHUỘT ---
    const handleMouseMove = (e) => {
      // Chỉ cần thêm điểm mới kèm thời gian tạo
      // Không cần giới hạn độ dài cứng hay setTimeout nữa
      pointsRef.current.push({ 
        x: e.clientX, 
        y: e.clientY, 
        created: Date.now() // Lưu lại thời điểm điểm này được sinh ra
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default MouseTrail;