import React from 'react';

const Heart = ({ active }) => {
  return (
    <div 
      className="relative w-8 h-8 pixelated"
      style={{
        backgroundImage: "url('assets/images/BasicUI/Sprout Lands - UI Pack - Basic pack/emojis-free/emoji style ui/Inventory_Herat_Spritesheet.png')",
        backgroundRepeat: 'no-repeat',
        // Tinh chỉnh tọa độ để lấy đúng hình trái tim trong tấm ảnh lớn
        // Giả sử trái tim đỏ nằm ở cột 4, hàng 10 (ước lượng từ ảnh bạn gửi)
        // Bạn có thể cần chỉnh lại số px này cho khớp
        backgroundPosition: active ? '-48px -144px' : '-64px -144px', 
        backgroundSize: '256px auto', // Phóng to sheet lên chút cho dễ cắt
        filter: active ? 'none' : 'grayscale(100%) opacity(0.5)' // Nếu mất máu thì xám đi
      }}
    />
  );
};

export default Heart;