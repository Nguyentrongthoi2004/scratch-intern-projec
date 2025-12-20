// src/components/Block/Block.jsx
import React from 'react';

const Block = ({ type, text, onClick, theme = 'light' }) => {
  
  // Trích xuất số để hiển thị badge (ví dụ: "Move Right 5" -> lấy số 5)
  const valMatch = text.match(/-?\d+/);
  const rawVal = valMatch ? parseInt(valMatch[0]) : null;
  const displayVal = rawVal !== null ? Math.abs(rawVal) : null;

  const getIconImage = () => {
    // CHUYỂN TẤT CẢ VỀ CHỮ THƯỜNG ĐỂ SO SÁNH CHÍNH XÁC
    const t = text.toLowerCase();

    // KIỂM TRA THEO TỪ KHÓA (Ưu tiên từ khóa dài trước)
    if (t.includes("turn left")) return "turnleft.png";
    if (t.includes("turn right")) return "turnright.png";
    
    // Di chuyển
    if (t.includes("right")) return "right.png";
    if (t.includes("left")) return "left.png";
    if (t.includes("up")) return "up.png";
    if (t.includes("down")) return "down.png";
    if (t.includes("hop")) return "hop.png";
    if (t.includes("home") || t.includes("go to")) return "gohome.png";
    
    // Sự kiện
    if (t.includes("flag")) return "onflag.png";
    if (t.includes("clicked") || t.includes("tap")) return "ontap.png";
    if (t.includes("bump") || t.includes("touch")) return "onbump.png";
    if (t.includes("send")) return "messagesend.png";
    if (t.includes("receive")) return "messagereceive.png";
    
    // Hình ảnh & Âm thanh
    if (t.includes("say")) return "say.png";
    if (t.includes("hide")) return "hide.png";
    if (t.includes("show")) return "show.png";
    if (t.includes("grow")) return "grow.png";
    if (t.includes("shrink")) return "shrink.png";
    if (t.includes("reset")) return "reset.png";
    if (t.includes("pop")) return "pop.png";
    if (t.includes("play")) return "playsound.png";
    
    // Điều khiển
    if (t.includes("wait")) return "wait.png";
    if (t.includes("repeat")) return "repeat.png";
    if (t.includes("stop")) return "stop.png";
    if (t.includes("speed")) return "speed.png";
    if (t.includes("forever")) return "forever.png";
    if (t.includes("page")) return "page.png";
    if (t.includes("end")) return "end.png";
    
    return null;
  };

  const imageName = getIconImage();

  // Màu Neon dựa trên type
  const getThemeColor = () => {
    switch(type) {
        case 'motion':  return '#3b82f6';
        case 'events':  return '#fbbf24';
        case 'looks':   return '#d946ef';
        case 'sound':   return '#22c55e';
        case 'control': return '#f97316';
        case 'end':     return '#ef4444';
        default:        return '#ffffff';
    }
  };
  const neonColor = getThemeColor();

  return (
    <div 
      onClick={onClick}
      className="relative z-10 transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 group"
    >
      {imageName ? (
        <div className="relative flex flex-col items-center">
            <img 
                src={`/assets/images/ui/${imageName}`} 
                alt={text}
                className="relative z-10 object-contain w-20 h-auto pixelated"
                style={{ filter: `drop-shadow(0 0 5px ${neonColor})` }} 
                // Xử lý nếu file ảnh bị lỗi đường dẫn
                onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.classList.add('fallback-active'); }}
            />
            
            {/* Badge hiển thị số lượng (nếu có) */}
            {displayVal !== null && (
                <div className="absolute bottom-[4px] left-[45%] -translate-x-1/2 z-20 flex items-center justify-center min-w-[36px] h-[22px] rounded-[12px] bg-white border border-slate-200 shadow-sm">
                    <span className="text-sm font-black text-slate-800">{displayVal}</span>
                </div>
            )}
        </div>
      ) : (
        /* KHỐI DỰ PHÒNG KHI KHÔNG TÌM THẤY ẢNH */
        <div className="flex items-center justify-center w-16 h-16 p-2 text-[10px] font-bold text-center text-white bg-slate-600 border-2 border-slate-400 rounded-xl shadow-inner">
            {text.toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default Block;