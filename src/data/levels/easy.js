import { createLevel } from '../../utils/levelFactory';

export const easyLevels = [
  // --- NHÓM 1: CƠ BẢN (1-10) ---
  createLevel(1, 'easy', "Bắt đầu", "Khối nào dùng để chạy lệnh khi nhấn Cờ xanh?", {type:'events', text:'When flag clicked'}, {type:'control', text:'Wait'}, {type:'motion', text:'Move Right'}, "Tìm lá cờ xanh!"),
  createLevel(2, 'easy', "Sang phải", "Làm sao để nhân vật đi sang bên PHẢI?", {type:'motion', text:'Move Right'}, {type:'motion', text:'Move Left'}, {type:'motion', text:'Move Up'}, "Mũi tên chỉ sang phải."),
  createLevel(3, 'easy', "Lên trời", "Muốn nhân vật bay thẳng lên trên?", {type:'motion', text:'Move Up'}, {type:'motion', text:'Move Down'}, {type:'motion', text:'Hop'}, "Mũi tên hướng lên."),
  createLevel(4, 'easy', "Chào hỏi", "Hiện khung hội thoại nói 'Hi'?", {type:'looks', text:'Say Hi'}, {type:'looks', text:'Show'}, {type:'sound', text:'Pop'}, "Biểu tượng bong bóng lời nói."),
  createLevel(5, 'easy', "Âm thanh", "Phát tiếng kêu 'Pop'?", {type:'sound', text:'Pop'}, {type:'sound', text:'Play Sound'}, {type:'control', text:'Wait'}, "Chữ Pop màu xanh lá."),
  createLevel(6, 'easy', "Nhảy lên", "Nhân vật bật nhảy tại chỗ?", {type:'motion', text:'Hop'}, {type:'motion', text:'Move Up'}, {type:'motion', text:'Move Down'}, "Mũi tên hình chữ U ngược."),
  createLevel(7, 'easy', "Về nhà", "Quay lại vị trí xuất phát ban đầu?", {type:'motion', text:'Go Home'}, {type:'motion', text:'Move Left'}, {type:'control', text:'Stop'}, "Khối hình ngôi nhà."),
  createLevel(8, 'easy', "Nghỉ ngơi", "Dừng lại 1 lát rồi mới làm tiếp?", {type:'control', text:'Wait'}, {type:'control', text:'Stop'}, {type:'control', text:'End'}, "Hình chiếc đồng hồ."),
  createLevel(9, 'easy', "Sang trái", "Điều khiển nhân vật lùi sang bên trái?", {type:'motion', text:'Move Left'}, {type:'motion', text:'Move Right'}, {type:'motion', text:'Move Down'}, "Mũi tên hướng sang trái."),
  createLevel(10, 'easy', "Xuống đất", "Đi thẳng xuống phía dưới sân khấu?", {type:'motion', text:'Move Down'}, {type:'motion', text:'Move Up'}, {type:'motion', text:'Hop'}, "Mũi tên hướng xuống."),

  // --- NHÓM 2: BIẾN THỂ (11-20) ---
  createLevel(11, 'easy', "Trốn tìm", "Làm nhân vật biến mất hoàn toàn?", {type:'looks', text:'Hide'}, {type:'looks', text:'Show'}, {type:'motion', text:'Go Home'}, "Hình bóng người mờ."),
  createLevel(12, 'easy', "Xuất hiện", "Làm nhân vật hiện ra rõ nét?", {type:'looks', text:'Show'}, {type:'looks', text:'Hide'}, {type:'looks', text:'Reset'}, "Hình người có màu."),
  createLevel(13, 'easy', "Khởi động 2", "Chương trình chạy khi nhấn vào nhân vật?", {type:'events', text:'When tapped'}, {type:'events', text:'When flag clicked'}, {type:'control', text:'Wait'}, "Bàn tay chạm vào."),
  createLevel(14, 'easy', "Di chuyển 2", "Tiến 5 bước sang phải?", {type:'motion', text:'Move Right 5'}, {type:'motion', text:'Move Left 5'}, {type:'motion', text:'Move Up 5'}, "Mũi tên phải + số 5."),
  createLevel(15, 'easy', "Hành động 2", "Nhảy 2 cái liên tiếp?", {type:'motion', text:'Hop 2'}, {type:'motion', text:'Hop 1'}, {type:'motion', text:'Move Up 2'}, "Khối Hop + số 2."),
  createLevel(16, 'easy', "Dừng lại", "Dừng kịch bản ngay tại đây?", {type:'control', text:'Stop'}, {type:'control', text:'End'}, {type:'control', text:'Wait'}, "Hình bàn tay giơ lên."),
  createLevel(17, 'easy', "Nói 2", "Nhân vật muốn tự giới thiệu?", {type:'looks', text:'Say Hi'}, {type:'sound', text:'Pop'}, {type:'motion', text:'Right'}, "Dùng khối Say."),
  createLevel(18, 'easy', "Vị trí", "Đang ở xa, muốn về vạch xuất phát?", {type:'motion', text:'Go Home'}, {type:'motion', text:'Move Down'}, {type:'motion', text:'Left'}, "Ngôi nhà xanh."),
  createLevel(19, 'easy', "Thời gian", "Đợi nhân vật khác đi xong?", {type:'control', text:'Wait'}, {type:'control', text:'End'}, {type:'control', text:'Stop'}, "Chiếc đồng hồ."),
  createLevel(20, 'easy', "Âm thanh 2", "Nghe tiếng nổ nhỏ?", {type:'sound', text:'Pop'}, {type:'sound', text:'Play'}, {type:'looks', text:'Say'}, "Khối Pop."),

  // --- NHÓM 3: DI CHUYỂN CỤ THỂ (21-30) ---
  createLevel(21, 'easy', "Bước nhỏ", "Đi sang phải 1 bước nhỏ?", {type:'motion', text:'Move Right 1'}, {type:'motion', text:'Move Right 10'}, {type:'motion', text:'Move Left 1'}, "Số 1 nhỏ."),
  createLevel(22, 'easy', "Bước lớn", "Đi sang phải một quãng dài (10)?", {type:'motion', text:'Move Right 10'}, {type:'motion', text:'Move Right 1'}, {type:'motion', text:'Move Up 10'}, "Số 10 lớn."),
  createLevel(23, 'easy', "Lùi bước", "Lùi sang trái 3 bước?", {type:'motion', text:'Move Left 3'}, {type:'motion', text:'Move Right 3'}, {type:'motion', text:'Move Down 3'}, "Trái và số 3."),
  createLevel(24, 'easy', "Bay cao", "Bay lên trời 8 bước?", {type:'motion', text:'Move Up 8'}, {type:'motion', text:'Move Down 8'}, {type:'motion', text:'Hop 8'}, "Lên và số 8."),
  createLevel(25, 'easy', "Hạ cánh", "Đáp xuống đất 5 bước?", {type:'motion', text:'Move Down 5'}, {type:'motion', text:'Move Up 5'}, {type:'motion', text:'Move Right 5'}, "Xuống và số 5."),
  createLevel(26, 'easy', "Nhảy cao", "Bật nhảy thật cao (6)?", {type:'motion', text:'Hop 6'}, {type:'motion', text:'Hop 1'}, {type:'motion', text:'Move Up 6'}, "Hop và số 6."),
  createLevel(27, 'easy', "Xoay vòng", "Xoay phải 4 lần?", {type:'motion', text:'Turn Right 4'}, {type:'motion', text:'Turn Left 4'}, {type:'motion', text:'Move Right 4'}, "Mũi tên cong phải."),
  createLevel(28, 'easy', "Xoay ngược", "Xoay trái 2 lần?", {type:'motion', text:'Turn Left 2'}, {type:'motion', text:'Turn Right 2'}, {type:'motion', text:'Move Left 2'}, "Mũi tên cong trái."),
  createLevel(29, 'easy', "Chạy nhanh", "Đặt tốc độ chạy nhanh nhất?", {type:'motion', text:'Speed Fast'}, {type:'motion', text:'Speed Slow'}, {type:'motion', text:'Wait'}, "Người chạy."),
  createLevel(30, 'easy', "Đi bộ", "Đặt tốc độ đi chậm rãi?", {type:'motion', text:'Speed Slow'}, {type:'motion', text:'Speed Fast'}, {type:'motion', text:'Stop'}, "Người đi bộ."),

  // --- NHÓM 4: HÀNH ĐỘNG & SỰ KIỆN (31-40) ---
  createLevel(31, 'easy', "Chạm tay", "Khi chạm vào nhân vật thì nhảy?", {type:'events', text:'Tap -> Hop'}, {type:'events', text:'Flag -> Hop'}, {type:'events', text:'Bump -> Hop'}, "Bàn tay + Hop."),
  createLevel(32, 'easy', "Cờ xanh", "Khi bấm cờ thì đi phải?", {type:'events', text:'Flag -> Right'}, {type:'events', text:'Tap -> Right'}, {type:'events', text:'Bump -> Right'}, "Cờ xanh + Phải."),
  createLevel(33, 'easy', "Va phải", "Khi đụng tường thì dừng lại?", {type:'events', text:'Bump -> Stop'}, {type:'events', text:'Tap -> Stop'}, {type:'events', text:'Flag -> Stop'}, "Hai người đụng + Bàn tay."),
  createLevel(34, 'easy', "Gửi thư", "Gửi một bức thư màu cam?", {type:'events', text:'Send Message'}, {type:'events', text:'Receive Message'}, {type:'looks', text:'Say'}, "Phong thư đóng."),
  createLevel(35, 'easy', "Nhận thư", "Hành động khi nhận được thư?", {type:'events', text:'Receive Message'}, {type:'events', text:'Send Message'}, {type:'control', text:'Wait'}, "Phong thư mở."),
  createLevel(36, 'easy', "Phóng to", "Làm nhân vật to lên?", {type:'looks', text:'Grow'}, {type:'looks', text:'Shrink'}, {type:'looks', text:'Reset'}, "Người nhỏ thành to."),
  createLevel(37, 'easy', "Thu nhỏ", "Làm nhân vật bé lại?", {type:'looks', text:'Shrink'}, {type:'looks', text:'Grow'}, {type:'looks', text:'Show'}, "Người to thành nhỏ."),
  createLevel(38, 'easy', "Cỡ chuẩn", "Trả lại kích thước bình thường?", {type:'looks', text:'Reset Size'}, {type:'looks', text:'Grow'}, {type:'looks', text:'Shrink'}, "Hai người bằng nhau."),
  createLevel(39, 'easy', "Đợi chút", "Dừng lại chờ 5 giây?", {type:'control', text:'Wait 5'}, {type:'control', text:'Wait 1'}, {type:'control', text:'Stop'}, "Đồng hồ số 5."),
  createLevel(40, 'easy', "Lặp lại", "Làm lại hành động 4 lần?", {type:'control', text:'Repeat 4'}, {type:'control', text:'Forever'}, {type:'control', text:'End'}, "Vòng lặp có số."),

  // --- NHÓM 5: TƯ DUY LOGIC (41-50) ---
  createLevel(41, 'easy', "Đi zíc-zắc", "Đi lên rồi đi xuống?", {type:'motion', text:'Up -> Down'}, {type:'motion', text:'Right -> Left'}, {type:'motion', text:'Hop -> Hop'}, "Lên rồi Xuống."),
  createLevel(42, 'easy', "Nhảy xa", "Đi phải rồi nhảy lên?", {type:'motion', text:'Right -> Hop'}, {type:'motion', text:'Left -> Hop'}, {type:'motion', text:'Up -> Hop'}, "Phải rồi Hop."),
  createLevel(43, 'easy', "Hù dọa", "Ẩn đi rồi hiện lại bất ngờ?", {type:'looks', text:'Hide -> Show'}, {type:'looks', text:'Show -> Hide'}, {type:'motion', text:'Go Home'}, "Mờ rồi Rõ."),
  createLevel(44, 'easy', "Chào bạn", "Đi tới rồi nói 'Hi'?", {type:'motion', text:'Right -> Say'}, {type:'motion', text:'Left -> Say'}, {type:'motion', text:'Up -> Say'}, "Phải rồi Say."),
  createLevel(45, 'easy', "Ồn ào", "Nhảy lên và kêu Pop?", {type:'motion', text:'Hop -> Pop'}, {type:'motion', text:'Move -> Pop'}, {type:'motion', text:'Wait -> Pop'}, "Hop rồi Loa."),
  createLevel(46, 'easy', "Về đích", "Đi nhanh về nhà?", {type:'motion', text:'Fast -> Home'}, {type:'motion', text:'Slow -> Home'}, {type:'motion', text:'Wait -> Home'}, "Người chạy + Nhà."),
  createLevel(47, 'easy', "Tuần tra", "Đi phải rồi đi trái?", {type:'motion', text:'Right -> Left'}, {type:'motion', text:'Up -> Down'}, {type:'motion', text:'Hop -> Stop'}, "Phải rồi Trái."),
  createLevel(48, 'easy', "An toàn", "Dừng lại rồi ẩn đi?", {type:'control', text:'Stop -> Hide'}, {type:'control', text:'Wait -> Hide'}, {type:'control', text:'End -> Hide'}, "Tay rồi Mờ."),
  createLevel(49, 'easy', "Khởi đầu", "Chờ 1 giây rồi bắt đầu đi?", {type:'control', text:'Wait -> Right'}, {type:'control', text:'Stop -> Right'}, {type:'control', text:'End -> Right'}, "Đồng hồ + Phải."),
  createLevel(50, 'easy', "Kết thúc", "Nói 'Bye' rồi dừng lại?", {type:'looks', text:'Say Bye -> End'}, {type:'looks', text:'Say Hi -> End'}, {type:'sound', text:'Pop -> End'}, "Bóng nói + Khối đỏ.")
];