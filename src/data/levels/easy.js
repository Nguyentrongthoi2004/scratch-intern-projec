import { createLevel } from '../../utils/levelFactory';

export const easyLevels = [
  // --- NHÓM 1: CƠ BẢN (1-10) ---
  createLevel(1, 'easy', "Bắt đầu", "Khối nào dùng để chạy lệnh khi nhấn Cờ xanh?", {type:'events', text:'When Flag'}, {type:'control', text:'Wait'}, {type:'motion', text:'Move Right'}, "Tìm lá cờ xanh!"),
  createLevel(2, 'easy', "Sang phải", "Làm sao để nhân vật đi sang bên PHẢI?", {type:'motion', text:'Move Right'}, {type:'motion', text:'Move Left'}, {type:'motion', text:'Move Up'}, "Mũi tên chỉ sang phải."),
  createLevel(3, 'easy', "Đi lên", "Muốn nhân vật bay thẳng lên trời?", {type:'motion', text:'Move Up'}, {type:'motion', text:'Move Down'}, {type:'motion', text:'Hop'}, "Mũi tên hướng lên."),
  createLevel(4, 'easy', "Chào hỏi", "Hiện khung hội thoại nói 'Hi'?", {type:'looks', text:'Say Hi'}, {type:'looks', text:'Show'}, {type:'sound', text:'Pop'}, "Biểu tượng bong bóng lời nói."),
  createLevel(5, 'easy', "Âm thanh", "Phát tiếng kêu 'Pop'?", {type:'sound', text:'Pop'}, {type:'sound', text:'Play Sound'}, {type:'control', text:'Wait'}, "Chữ Pop màu xanh lá."),
  createLevel(6, 'easy', "Nhảy cóc", "Nhân vật bật nhảy theo đường vòng cung?", {type:'motion', text:'Hop'}, {type:'motion', text:'Move Up'}, {type:'motion', text:'Move Down'}, "Mũi tên hình chữ U ngược."),
  createLevel(7, 'easy', "Về nhà", "Quay lại vị trí xuất phát ban đầu?", {type:'motion', text:'Go Home'}, {type:'motion', text:'Move Left'}, {type:'control', text:'Stop'}, "Khối hình ngôi nhà."),
  createLevel(8, 'easy', "Chờ đợi", "Tạm dừng 1 lát rồi mới làm tiếp (Wait)?", {type:'control', text:'Wait'}, {type:'control', text:'Stop'}, {type:'control', text:'End'}, "Hình chiếc đồng hồ."),
  createLevel(9, 'easy', "Sang trái", "Điều khiển nhân vật lùi sang bên trái?", {type:'motion', text:'Move Left'}, {type:'motion', text:'Move Right'}, {type:'motion', text:'Move Down'}, "Mũi tên hướng sang trái."),
  createLevel(10, 'easy', "Đi xuống", "Đi thẳng xuống phía dưới sân khấu?", {type:'motion', text:'Move Down'}, {type:'motion', text:'Move Up'}, {type:'motion', text:'Hop'}, "Mũi tên hướng xuống."),

  // --- NHÓM 2: BIẾN THỂ (11-20) ---
  createLevel(11, 'easy', "Trốn tìm", "Làm nhân vật biến mất hoàn toàn?", {type:'looks', text:'Hide'}, {type:'looks', text:'Show'}, {type:'motion', text:'Go Home'}, "Hình bóng người mờ."),
  createLevel(12, 'easy', "Xuất hiện", "Làm nhân vật hiện ra rõ nét?", {type:'looks', text:'Show'}, {type:'looks', text:'Hide'}, {type:'looks', text:'Reset'}, "Hình người có màu."),
  createLevel(13, 'easy', "Chạm vào", "Chương trình chạy khi dùng ngón tay nhấn vào nhân vật?", {type:'events', text:'When Tapped'}, {type:'events', text:'When Flag'}, {type:'control', text:'Wait'}, "Bàn tay chạm vào người."),
  createLevel(14, 'easy', "Đi xa", "Tiến 5 bước sang phải?", {type:'motion', text:'Move Right 5'}, {type:'motion', text:'Move Left 5'}, {type:'motion', text:'Move Up 5'}, "Mũi tên phải + số 5."),
  createLevel(15, 'easy', "Nhảy cao", "Nhảy vòng cung cao hơn (2 nấc)?", {type:'motion', text:'Hop 2'}, {type:'motion', text:'Hop 1'}, {type:'motion', text:'Move Up 2'}, "Khối Hop + số 2."),
  createLevel(16, 'easy', "Tạm dừng", "Dừng kịch bản lại (Stop)?", {type:'control', text:'Stop'}, {type:'control', text:'End'}, {type:'control', text:'Wait'}, "Hình bàn tay giơ lên."),
  createLevel(17, 'easy', "Giới thiệu", "Nhân vật nói bong bóng hội thoại?", {type:'looks', text:'Say Hi'}, {type:'sound', text:'Pop'}, {type:'motion', text:'Right'}, "Dùng khối Say Hi."),
  createLevel(18, 'easy', "Về chỗ", "Đang ở xa, muốn reset về gốc?", {type:'motion', text:'Go Home'}, {type:'motion', text:'Move Down'}, {type:'motion', text:'Left'}, "Ngôi nhà xanh."),
  createLevel(19, 'easy', "Đợi chờ", "Khối nào giúp nhân vật chờ đợi?", {type:'control', text:'Wait'}, {type:'control', text:'End'}, {type:'control', text:'Stop'}, "Chiếc đồng hồ."),
  createLevel(20, 'easy', "Tiếng động", "Khối nào tạo ra tiếng nổ nhẹ (Pop)?", {type:'sound', text:'Pop'}, {type:'looks', text:'Show'}, {type:'looks', text:'Say Hi'}, "Khối loa màu xanh lá."),

  // --- NHÓM 3: DI CHUYỂN CỤ THỂ (21-30) ---
  createLevel(21, 'easy', "Nhích nhẹ", "Đi sang phải chỉ 1 bước nhỏ?", {type:'motion', text:'Move Right 1'}, {type:'motion', text:'Move Right 10'}, {type:'motion', text:'Move Left 1'}, "Số 1 nhỏ."),
  createLevel(22, 'easy', "Chạy dài", "Đi sang phải một quãng thật dài (10)?", {type:'motion', text:'Move Right 10'}, {type:'motion', text:'Move Right 1'}, {type:'motion', text:'Move Up 10'}, "Số 10 lớn."),
  createLevel(23, 'easy', "Lùi lại", "Lùi sang trái 3 bước?", {type:'motion', text:'Move Left 3'}, {type:'motion', text:'Move Right 3'}, {type:'motion', text:'Move Down 3'}, "Trái và số 3."),
  createLevel(24, 'easy', "Bay cao", "Bay thẳng lên trời 8 bước?", {type:'motion', text:'Move Up 8'}, {type:'motion', text:'Move Down 8'}, {type:'motion', text:'Hop 8'}, "Lên và số 8."),
  createLevel(25, 'easy', "Hạ cánh", "Đáp thẳng xuống đất 5 bước?", {type:'motion', text:'Move Down 5'}, {type:'motion', text:'Move Up 5'}, {type:'motion', text:'Move Right 5'}, "Xuống và số 5."),
  createLevel(26, 'easy', "Siêu nhảy", "Bật nhảy vòng cung thật cao (6)?", {type:'motion', text:'Hop 6'}, {type:'motion', text:'Hop 1'}, {type:'motion', text:'Move Up 6'}, "Hop và số 6."),
  createLevel(27, 'easy', "Xoay phải", "Xoay tròn sang phải 4 nấc?", {type:'motion', text:'Turn Right 4'}, {type:'motion', text:'Turn Left 4'}, {type:'motion', text:'Move Right 4'}, "Mũi tên cong phải."),
  createLevel(28, 'easy', "Xoay trái", "Xoay ngược sang trái 2 nấc?", {type:'motion', text:'Turn Left 2'}, {type:'motion', text:'Turn Right 2'}, {type:'motion', text:'Move Left 2'}, "Mũi tên cong trái."),
  createLevel(29, 'easy', "Tốc độ", "Đặt tốc độ chạy nhanh nhất?", {type:'motion', text:'Speed Fast'}, {type:'motion', text:'Speed Slow'}, {type:'motion', text:'Wait'}, "Người chạy."),
  createLevel(30, 'easy', "Đi chậm", "Đặt tốc độ đi bộ chậm rãi?", {type:'motion', text:'Speed Slow'}, {type:'motion', text:'Speed Fast'}, {type:'motion', text:'Stop'}, "Người đi bộ."),

  // --- NHÓM 4: HÀNH ĐỘNG & SỰ KIỆN (31-40) ---
  createLevel(31, 'easy', "Va chạm", "Chạy lệnh khi nhân vật chạm vào nhau?", {type:'events', text:'When Bumped'}, {type:'events', text:'When Flag'}, {type:'events', text:'When Tapped'}, "Hai người chạm nhau."),
  createLevel(32, 'easy', "Gửi thư", "Gửi đi một tin nhắn (bức thư)?", {type:'events', text:'Send Message'}, {type:'events', text:'When Bumped'}, {type:'events', text:'Receive Message'}, "Phong thư đóng kín."),
  createLevel(33, 'easy', "Nhận thư", "Khối kích hoạt khi NHẬN được thư?", {type:'events', text:'Receive Message'}, {type:'events', text:'Send Message'}, {type:'control', text:'Wait'}, "Phong thư đã mở."),
  createLevel(34, 'easy', "Phóng to", "Làm nhân vật to lên?", {type:'looks', text:'Grow'}, {type:'looks', text:'Shrink'}, {type:'looks', text:'Reset Size'}, "Người nhỏ thành to."),
  createLevel(35, 'easy', "Thu nhỏ", "Làm nhân vật bé lại?", {type:'looks', text:'Shrink'}, {type:'looks', text:'Grow'}, {type:'looks', text:'Show'}, "Người to thành nhỏ."),
  createLevel(36, 'easy', "Cỡ chuẩn", "Trả lại kích thước bình thường?", {type:'looks', text:'Reset Size'}, {type:'looks', text:'Grow'}, {type:'looks', text:'Shrink'}, "Hai người bằng nhau."),
  createLevel(37, 'easy', "Đợi lâu", "Dừng lại chờ 10 đơn vị thời gian?", {type:'control', text:'Wait 10'}, {type:'control', text:'Wait 1'}, {type:'control', text:'Stop'}, "Đồng hồ số 10."),
  createLevel(38, 'easy', "Lặp lại", "Lặp lại hành động 4 lần (Repeat)?", {type:'control', text:'Repeat 4'}, {type:'control', text:'Forever'}, {type:'control', text:'End'}, "Vòng lặp có số 4."),
  createLevel(39, 'easy', "Vĩnh viễn", "Lặp lại hành động vĩnh viễn (Forever)?", {type:'control', text:'Forever'}, {type:'control', text:'Repeat'}, {type:'control', text:'End'}, "Vòng lặp kín."),
  createLevel(40, 'easy', "Kết thúc", "Khối đỏ dùng để kết thúc hoàn toàn (End)?", {type:'control', text:'End'}, {type:'control', text:'Stop'}, {type:'control', text:'Forever'}, "Khối đỏ trơn."),

  // --- NHÓM 5: ÔN TẬP TỔNG HỢP (41-50) ---
  createLevel(41, 'easy', "Lên 10", "Bay thẳng lên phía trên 10 bước?", {type:'motion', text:'Move Up 10'}, {type:'motion', text:'Move Down 10'}, {type:'motion', text:'Move Up 1'}, "Lên và số 10."),
  createLevel(42, 'easy', "Nhảy thấp", "Nhảy vòng cung thấp (chỉ 2 nấc)?", {type:'motion', text:'Hop 2'}, {type:'motion', text:'Hop 10'}, {type:'motion', text:'Move Up 2'}, "Hop và số 2."),
  createLevel(43, 'easy', "Tàng hình", "Lệnh làm nhân vật ẩn thân?", {type:'looks', text:'Hide'}, {type:'looks', text:'Show'}, {type:'motion', text:'Go Home'}, "Hình bóng mờ."),
  createLevel(44, 'easy', "Hiện hình", "Lệnh làm nhân vật hiện ra?", {type:'looks', text:'Show'}, {type:'looks', text:'Hide'}, {type:'looks', text:'Say Hi'}, "Hình người rõ."),
  createLevel(45, 'easy', "Phát âm thanh", "Phát âm thanh (Play Sound)?", {type:'sound', text:'Play Sound'}, {type:'motion', text:'Hop'}, {type:'control', text:'Wait'}, "Khối loa."),
  createLevel(46, 'easy', "Về nhà", "Khối nào đưa nhân vật về toạ độ gốc?", {type:'motion', text:'Go Home'}, {type:'motion', text:'Stop'}, {type:'control', text:'End'}, "Ngôi nhà."),
  createLevel(47, 'easy', "Quay 12", "Xoay phải 1 vòng (12 nấc)?", {type:'motion', text:'Turn Right 12'}, {type:'motion', text:'Turn Left 12'}, {type:'motion', text:'Move Right 12'}, "Xoay phải số 12."),
  createLevel(48, 'easy', "Dừng tay", "Tạm dừng kịch bản (Stop)?", {type:'control', text:'Stop'}, {type:'control', text:'Wait'}, {type:'control', text:'End'}, "Bàn tay."),
  createLevel(49, 'easy', "Chờ 5s", "Chờ đợi trong 5 nhịp?", {type:'control', text:'Wait 5'}, {type:'control', text:'Repeat 5'}, {type:'control', text:'Stop'}, "Đồng hồ số 5."),
  createLevel(50, 'easy', "Hoàn tất", "Khối đỏ kết thúc hoàn toàn kịch bản (End)?", {type:'control', text:'End'}, {type:'looks', text:'Hide'}, {type:'sound', text:'Pop'}, "Khối đỏ.")
];