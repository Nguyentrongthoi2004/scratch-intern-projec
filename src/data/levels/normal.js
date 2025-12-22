import { createLevel } from '../../utils/levelFactory';

export const normalLevels = [
  // --- NHÓM 1: THAM SỐ CHUYỂN ĐỘNG (51-60) ---
  createLevel(51, 'normal', "Xoay phải", "Khối nào làm nhân vật quay theo chiều kim đồng hồ?", {type:'motion', text:'Turn Right'}, {type:'motion', text:'Turn Left'}, {type:'motion', text:'Move Right'}, "Mũi tên cong sang phải."),
  createLevel(52, 'normal', "Xoay trái", "Khối nào làm nhân vật quay ngược chiều kim đồng hồ?", {type:'motion', text:'Turn Left'}, {type:'motion', text:'Turn Right'}, {type:'motion', text:'Move Left'}, "Mũi tên cong sang trái."),
  createLevel(53, 'normal', "To lên", "Muốn nhân vật to lên (Grow)?", {type:'looks', text:'Grow'}, {type:'looks', text:'Shrink'}, {type:'looks', text:'Reset'}, "Hình người nhỏ thành lớn."),
  createLevel(54, 'normal', "Nhỏ đi", "Muốn nhân vật bé lại (Shrink)?", {type:'looks', text:'Shrink'}, {type:'looks', text:'Grow'}, {type:'looks', text:'Show'}, "Hình người lớn thành nhỏ."),
  createLevel(55, 'normal', "Cỡ chuẩn", "Đưa nhân vật về kích thước ban đầu?", {type:'looks', text:'Reset Size'}, {type:'looks', text:'Grow'}, {type:'looks', text:'Shrink'}, "Hai người bằng nhau."),
  createLevel(56, 'normal', "Tốc độ", "Muốn nhân vật chạy nhanh như gió?", {type:'motion', text:'Speed Fast'}, {type:'motion', text:'Speed Slow'}, {type:'motion', text:'Move'}, "Hình người đang chạy."),
  createLevel(57, 'normal', "Vòng lặp", "Khối nào lặp lại hành động 4 lần?", {type:'control', text:'Repeat 4'}, {type:'control', text:'Forever'}, {type:'control', text:'Wait'}, "Khối màu cam có số 4."),
  createLevel(58, 'normal', "Va chạm", "Kích hoạt khi nhân vật đụng trúng vật khác?", {type:'events', text:'When Bumped'}, {type:'events', text:'When Tapped'}, {type:'events', text:'When Flag'}, "Hai người đâm nhau."),
  createLevel(59, 'normal', "Chạm tay", "Kích hoạt khi người chơi nhấn vào nhân vật?", {type:'events', text:'When Tapped'}, {type:'events', text:'When Bumped'}, {type:'control', text:'Wait'}, "Bàn tay chạm vào người."),
  createLevel(60, 'normal', "Nhảy 5", "Muốn nhân vật nhảy 5 lần liên tiếp?", {type:'motion', text:'Hop 5'}, {type:'motion', text:'Hop 1'}, {type:'motion', text:'Move Up 5'}, "Khối Hop có số 5."),

  // --- NHÓM 2: BIẾN THỂ NÂNG CAO (61-70) ---
  createLevel(61, 'normal', "Xoay nhiều", "Xoay phải một vòng lớn (12 nấc)?", {type:'motion', text:'Turn Right 12'}, {type:'motion', text:'Turn Left 12'}, {type:'motion', text:'Move Right 10'}, "Xoay phải số 12."),
  createLevel(62, 'normal', "Lớn gấp đôi", "Phóng to nhân vật thêm 2 mức?", {type:'looks', text:'Grow 2'}, {type:'looks', text:'Shrink 2'}, {type:'looks', text:'Grow 10'}, "Người to số 2."),
  createLevel(63, 'normal', "Siêu nhỏ", "Thu nhỏ nhân vật đi 5 mức?", {type:'looks', text:'Shrink 5'}, {type:'looks', text:'Grow 5'}, {type:'looks', text:'Reset'}, "Người nhỏ số 5."),
  createLevel(64, 'normal', "Đi chậm", "Chỉnh tốc độ đi bộ chậm rãi?", {type:'motion', text:'Speed Slow'}, {type:'motion', text:'Speed Fast'}, {type:'control', text:'Wait'}, "Hình người đi bộ."),
  createLevel(65, 'normal', "Tốc độ tb", "Chỉnh tốc độ bình thường (Medium)?", {type:'motion', text:'Speed Medium'}, {type:'motion', text:'Speed Fast'}, {type:'motion', text:'Stop'}, "Hình người đi vừa."),
  createLevel(66, 'normal', "Nhảy cao", "Nhảy vòng cung thật cao (8 nấc)?", {type:'motion', text:'Hop 8'}, {type:'motion', text:'Hop 2'}, {type:'motion', text:'Up 8'}, "Hop số 8."),
  createLevel(67, 'normal', "Xoay ít", "Chỉ xoay trái một chút xíu (1 nấc)?", {type:'motion', text:'Turn Left 1'}, {type:'motion', text:'Turn Right 1'}, {type:'motion', text:'Move Left 1'}, "Xoay trái số 1."),
  createLevel(68, 'normal', "Lặp mãi", "Khối nào lặp lại vĩnh viễn (Forever)?", {type:'control', text:'Forever'}, {type:'control', text:'Repeat'}, {type:'control', text:'End'}, "Vòng lặp kín."),
  createLevel(69, 'normal', "Dừng lại", "Tạm dừng chương trình một lúc (Wait)?", {type:'control', text:'Wait'}, {type:'control', text:'Stop'}, {type:'control', text:'End'}, "Đồng hồ."),
  createLevel(70, 'normal', "Kết thúc", "Dừng hẳn mọi hoạt động (End)?", {type:'control', text:'End'}, {type:'control', text:'Stop'}, {type:'looks', text:'Hide'}, "Khối đỏ trơn."),

  // --- NHÓM 3: SỰ KIỆN & THÔNG ĐIỆP (71-80) ---
  createLevel(71, 'normal', "Gửi thư 1", "Gửi đi thông điệp màu Cam?", {type:'events', text:'Send Orange'}, {type:'events', text:'Send Red'}, {type:'events', text:'Receive Orange'}, "Phong thư màu cam."),
  createLevel(72, 'normal', "Nhận thư 1", "Nhận được thông điệp màu Cam?", {type:'events', text:'Receive Orange'}, {type:'events', text:'Send Orange'}, {type:'events', text:'Receive Red'}, "Phong thư mở màu cam."),
  createLevel(73, 'normal', "Gửi thư 2", "Gửi đi thông điệp màu Đỏ?", {type:'events', text:'Send Red'}, {type:'events', text:'Send Green'}, {type:'events', text:'Receive Red'}, "Phong thư màu đỏ."),
  createLevel(74, 'normal', "Nhận thư 2", "Nhận được thông điệp màu Đỏ?", {type:'events', text:'Receive Red'}, {type:'events', text:'Send Red'}, {type:'events', text:'Receive Green'}, "Phong thư mở màu đỏ."),
  createLevel(75, 'normal', "Gửi thư 3", "Gửi đi thông điệp màu Xanh lá?", {type:'events', text:'Send Green'}, {type:'events', text:'Send Red'}, {type:'events', text:'Receive Green'}, "Phong thư màu xanh lá."),
  createLevel(76, 'normal', "Nhận thư 3", "Nhận được thông điệp màu Xanh lá?", {type:'events', text:'Receive Green'}, {type:'events', text:'Send Green'}, {type:'events', text:'Receive Orange'}, "Phong thư mở màu xanh."),
  createLevel(77, 'normal', "Ẩn mình", "Khối nào làm nhân vật tàng hình?", {type:'looks', text:'Hide'}, {type:'looks', text:'Show'}, {type:'events', text:'When Flag'}, "Hình bóng mờ."),
  createLevel(78, 'normal', "Hiện ra", "Khối nào làm nhân vật hiện hình?", {type:'looks', text:'Show'}, {type:'looks', text:'Hide'}, {type:'control', text:'Wait'}, "Hình người rõ."),
  createLevel(79, 'normal', "Bấm cờ", "Sự kiện chạy khi bấm Cờ Xanh?", {type:'events', text:'When Flag'}, {type:'events', text:'When Tapped'}, {type:'events', text:'When Bumped'}, "Lá cờ xanh."),
  createLevel(80, 'normal', "Về nhà", "Đưa nhân vật về vị trí xuất phát?", {type:'motion', text:'Go Home'}, {type:'motion', text:'Stop'}, {type:'control', text:'End'}, "Ngôi nhà xanh."),

  // --- NHÓM 4: KỸ NĂNG NÂNG CAO (81-90) ---
  createLevel(81, 'normal', "Lặp 10", "Muốn lặp lại hành động 10 lần?", {type:'control', text:'Repeat 10'}, {type:'control', text:'Repeat 4'}, {type:'control', text:'Forever'}, "Vòng lặp số 10."),
  
  // 🔥 LEVEL 82: SỬA THÀNH 'WAIT 10' (MAX)
  createLevel(82, 'normal', "Chờ 10", "Dừng lại chờ thật lâu (10)?", {type:'control', text:'Wait 10'}, {type:'control', text:'Wait 1'}, {type:'control', text:'Stop'}, "Đồng hồ số 10."),
  
  createLevel(83, 'normal', "Lùi 5", "Đi lùi sang trái 5 bước?", {type:'motion', text:'Move Left 5'}, {type:'motion', text:'Move Right 5'}, {type:'motion', text:'Move Down 5'}, "Trái và số 5."),
  createLevel(84, 'normal', "Lên 8", "Bay lên trời 8 bước?", {type:'motion', text:'Move Up 8'}, {type:'motion', text:'Move Down 8'}, {type:'motion', text:'Hop 8'}, "Lên và số 8."),
  createLevel(85, 'normal', "Xuống 3", "Đi xuống dưới 3 bước?", {type:'motion', text:'Move Down 3'}, {type:'motion', text:'Move Up 3'}, {type:'motion', text:'Hop 3'}, "Xuống và số 3."),
  createLevel(86, 'normal', "Nhảy thấp", "Nhảy một cái thật thấp (1 nấc)?", {type:'motion', text:'Hop 1'}, {type:'motion', text:'Hop 10'}, {type:'motion', text:'Move Up 1'}, "Hop và số 1."),
  createLevel(87, 'normal', "Reset", "Khối nào làm nhân vật hết xoay/lớn?", {type:'looks', text:'Reset Size'}, {type:'motion', text:'Go Home'}, {type:'control', text:'Stop'}, "Hai người bằng nhau."),
  createLevel(88, 'normal', "Tiếng Pop", "Khối nào phát ra âm thanh?", {type:'sound', text:'Pop'}, {type:'looks', text:'Say Hi'}, {type:'motion', text:'Hop'}, "Khối loa."),
  createLevel(89, 'normal', "Nói chuyện", "Khối nào hiện bóng hội thoại?", {type:'looks', text:'Say Hi'}, {type:'sound', text:'Pop'}, {type:'events', text:'Send Message'}, "Bong bóng lời nói."),
  createLevel(90, 'normal', "Kết thúc", "Khối nào dừng kịch bản mãi mãi?", {type:'control', text:'End'}, {type:'control', text:'Stop'}, {type:'control', text:'Forever'}, "Khối đỏ."),

  // --- NHÓM 5: THAM SỐ KHÓ (91-100) ---
  createLevel(91, 'normal', "Đi 10", "Đi sang phải 10 bước (Max)?", {type:'motion', text:'Move Right 10'}, {type:'motion', text:'Move Right 1'}, {type:'motion', text:'Move Left 10'}, "Phải và số 10."),
  createLevel(92, 'normal', "Xoay 6", "Xoay phải nửa vòng (6 nấc)?", {type:'motion', text:'Turn Right 6'}, {type:'motion', text:'Turn Left 6'}, {type:'motion', text:'Move Right 6'}, "Xoay phải số 6."),
  createLevel(93, 'normal', "Lớn 4", "Phóng to nhân vật 4 mức?", {type:'looks', text:'Grow 4'}, {type:'looks', text:'Shrink 4'}, {type:'looks', text:'Reset'}, "Người to số 4."),
  createLevel(94, 'normal', "Nhỏ 3", "Thu nhỏ nhân vật 3 mức?", {type:'looks', text:'Shrink 3'}, {type:'looks', text:'Grow 3'}, {type:'looks', text:'Show'}, "Người nhỏ số 3."),
  createLevel(95, 'normal', "Chờ 1", "Chờ rất nhanh (1 tích tắc)?", {type:'control', text:'Wait 1'}, {type:'control', text:'Wait 10'}, {type:'control', text:'Stop'}, "Đồng hồ số 1."),
  createLevel(96, 'normal', "Gửi Vàng", "Gửi đi thông điệp màu Vàng?", {type:'events', text:'Send Yellow'}, {type:'events', text:'Send Red'}, {type:'events', text:'Receive Yellow'}, "Phong thư màu vàng."),
  createLevel(97, 'normal', "Nhận Vàng", "Nhận được thông điệp màu Vàng?", {type:'events', text:'Receive Yellow'}, {type:'events', text:'Send Yellow'}, {type:'events', text:'Receive Red'}, "Phong thư mở màu vàng."),
  createLevel(98, 'normal', "Gửi Tím", "Gửi đi thông điệp màu Tím?", {type:'events', text:'Send Purple'}, {type:'events', text:'Send Blue'}, {type:'events', text:'Receive Purple'}, "Phong thư màu tím."),
  createLevel(99, 'normal', "Nhận Tím", "Nhận được thông điệp màu Tím?", {type:'events', text:'Receive Purple'}, {type:'events', text:'Send Purple'}, {type:'events', text:'Receive Blue'}, "Phong thư mở màu tím."),
  createLevel(100, 'normal', "Tổng kết", "Khối nào để bắt đầu chương trình?", {type:'events', text:'When Flag'}, {type:'control', text:'End'}, {type:'motion', text:'Go Home'}, "Lá cờ xanh.")
];