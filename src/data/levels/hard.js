import { createLevel } from '../../utils/levelFactory';

export const hardLevels = [
  // --- NHÓM 1: GỬI NHẬN TIN NHẮN (101-110) ---
  createLevel(101, 'hard', "Gửi tin", "Gửi 'Thư' cho nhân vật khác?", {type:'events', text:'Send Message'}, {type:'events', text:'Receive Message'}, {type:'looks', text:'Say'}, "Phong thư đóng."),
  createLevel(102, 'hard', "Nhận tin", "Hành động khi nhận được thư?", {type:'events', text:'Receive Message'}, {type:'events', text:'Send Message'}, {type:'events', text:'Tap'}, "Phong thư mở."),
  createLevel(103, 'hard', "Tin màu cam", "Gửi tin nhắn màu cam?", {type:'events', text:'Send Orange Msg'}, {type:'events', text:'Send Red Msg'}, {type:'events', text:'Receive Orange'}, "Thư đóng màu cam."),
  createLevel(104, 'hard', "Nhận màu đỏ", "Chỉ nhận tin nhắn màu đỏ?", {type:'events', text:'Receive Red Msg'}, {type:'events', text:'Receive Blue Msg'}, {type:'events', text:'Send Red Msg'}, "Thư mở màu đỏ."),
  createLevel(105, 'hard', "Gửi rồi đợi", "Gửi tin xong chờ 1 chút?", {type:'events', text:'Send -> Wait'}, {type:'events', text:'Receive -> Wait'}, {type:'events', text:'Tap -> Wait'}, "Thư đóng + Đồng hồ."),
  createLevel(106, 'hard', "Nhận rồi đi", "Nhận thư xong thì di chuyển?", {type:'events', text:'Receive -> Move'}, {type:'events', text:'Send -> Move'}, {type:'events', text:'Flag -> Move'}, "Thư mở + Mũi tên."),
  createLevel(107, 'hard', "Nhận rồi hiện", "Nhận thư xong thì hiện ra?", {type:'events', text:'Receive -> Show'}, {type:'events', text:'Receive -> Hide'}, {type:'events', text:'Send -> Show'}, "Thư mở + Người rõ."),
  createLevel(108, 'hard', "Bấm gửi", "Nhấn vào nhân vật để gửi tin?", {type:'events', text:'Tap -> Send'}, {type:'events', text:'Flag -> Send'}, {type:'events', text:'Bump -> Send'}, "Tay + Thư đóng."),
  createLevel(109, 'hard', "Đụng gửi", "Va chạm thì gửi tin?", {type:'events', text:'Bump -> Send'}, {type:'events', text:'Tap -> Send'}, {type:'events', text:'Receive -> Send'}, "Hai người + Thư."),
  createLevel(110, 'hard', "Chuỗi tin", "Nhận tin A rồi gửi tin B?", {type:'events', text:'Receive A -> Send B'}, {type:'events', text:'Send A -> Receive B'}, {type:'events', text:'Tap -> Send'}, "Mở A Đóng B."),

  // --- NHÓM 2: QUẢN LÝ TRANG & GAME (111-120) ---
  createLevel(111, 'hard', "Đổi trang", "Chuyển sang màn chơi số 2?", {type:'control', text:'Go to Page 2'}, {type:'control', text:'End'}, {type:'motion', text:'Go Home'}, "Tờ giấy số 2."),
  createLevel(112, 'hard', "Trang 3", "Đi tới trang số 3?", {type:'control', text:'Go to Page 3'}, {type:'control', text:'Go to Page 1'}, {type:'control', text:'Stop'}, "Tờ giấy số 3."),
  createLevel(113, 'hard', "Mãi mãi", "Lặp lại hành động vô tận?", {type:'control', text:'Forever'}, {type:'control', text:'Repeat'}, {type:'control', text:'End'}, "Vòng tròn kín."),
  createLevel(114, 'hard', "Kết thúc", "Dừng toàn bộ chương trình?", {type:'control', text:'End Game'}, {type:'control', text:'Stop'}, {type:'control', text:'Wait'}, "Khối đỏ phẳng."),
  createLevel(115, 'hard', "Dừng lại", "Tạm dừng nhân vật này?", {type:'control', text:'Stop'}, {type:'control', text:'End'}, {type:'control', text:'Wait'}, "Bàn tay đỏ."),
  createLevel(116, 'hard', "Đụng đổi trang", "Va chạm thì sang màn mới?", {type:'events', text:'Bump -> Page 2'}, {type:'events', text:'Tap -> Page 2'}, {type:'events', text:'Flag -> Page 2'}, "Đụng + Giấy."),
  createLevel(117, 'hard', "Về trang 1", "Quay lại màn chơi đầu tiên?", {type:'control', text:'Go to Page 1'}, {type:'control', text:'Go to Page 2'}, {type:'control', text:'Reset'}, "Tờ giấy số 1."),
  createLevel(118, 'hard', "Xoay mãi mãi", "Xoay tròn không bao giờ dừng?", {type:'control', text:'Forever [Turn]'}, {type:'control', text:'Repeat [Turn]'}, {type:'motion', text:'Turn Forever'}, "Vòng tròn + Cong."),
  createLevel(119, 'hard', "Đi mãi mãi", "Đi tới đi lui liên tục?", {type:'control', text:'Forever [Move]'}, {type:'control', text:'Repeat [Move]'}, {type:'motion', text:'Move Forever'}, "Vòng tròn + Ngang."),
  createLevel(120, 'hard', "Nhảy mãi", "Nhảy liên tục không nghỉ?", {type:'control', text:'Forever [Hop]'}, {type:'control', text:'Repeat [Hop]'}, {type:'motion', text:'Hop Forever'}, "Vòng tròn + Hop."),

  // --- NHÓM 3: LOGIC PHỨC TẠP (121-130) ---
  createLevel(121, 'hard', "Đợi gửi", "Chờ 2 giây rồi gửi tin?", {type:'control', text:'Wait 2 -> Send'}, {type:'control', text:'Wait 2 -> Receive'}, {type:'control', text:'Stop -> Send'}, "Đồng hồ + Thư."),
  createLevel(122, 'hard', "Lặp gửi", "Gửi tin nhắn 3 lần?", {type:'control', text:'Repeat 3 [Send]'}, {type:'control', text:'Forever [Send]'}, {type:'events', text:'Send 3'}, "Lặp + Thư."),
  createLevel(123, 'hard', "Nhận lặp", "Nhận tin thì nhảy 4 lần?", {type:'events', text:'Receive -> Repeat 4 Hop'}, {type:'events', text:'Receive -> Hop'}, {type:'events', text:'Send -> Repeat'}, "Mở + Lặp Hop."),
  createLevel(124, 'hard', "Tốc độ lặp", "Chạy nhanh mãi mãi?", {type:'control', text:'Forever [Fast]'}, {type:'control', text:'Repeat [Fast]'}, {type:'motion', text:'Fast Forever'}, "Vòng tròn + Chạy."),
  createLevel(125, 'hard', "Lớn mãi", "Cứ to lên mãi mãi?", {type:'control', text:'Forever [Grow]'}, {type:'control', text:'Forever [Shrink]'}, {type:'looks', text:'Grow Forever'}, "Vòng tròn + To."),
  createLevel(126, 'hard', "Nhấp nháy", "Ẩn rồi hiện lặp lại?", {type:'control', text:'Forever [Hide/Show]'}, {type:'control', text:'Repeat [Hide/Show]'}, {type:'looks', text:'Hide Show'}, "Vòng tròn + Người."),
  createLevel(127, 'hard', "Âm nhạc", "Phát nhạc nền mãi mãi?", {type:'control', text:'Forever [Play Sound]'}, {type:'sound', text:'Play Forever'}, {type:'control', text:'Repeat [Sound]'}, "Vòng tròn + Loa."),
  createLevel(128, 'hard', "Thông báo", "Hiện chữ rồi chuyển trang?", {type:'looks', text:'Say -> Page 2'}, {type:'looks', text:'Say -> Stop'}, {type:'control', text:'End -> Page 2'}, "Bóng nói + Giấy."),
  createLevel(129, 'hard', "Dẫn đường", "Đi đến đích rồi gửi tin?", {type:'motion', text:'Move -> Send'}, {type:'motion', text:'Move -> Receive'}, {type:'motion', text:'Move -> Stop'}, "Đi + Thư đóng."),
  createLevel(130, 'hard', "Kích hoạt", "Gửi tin để kích hoạt bạn?", {type:'events', text:'Send -> Friend Move'}, {type:'events', text:'Receive -> Friend'}, {type:'events', text:'Tap -> Friend'}, "Thư + Bạn."),

  // --- NHÓM 4: CHUỖI SỰ KIỆN DÀI (131-140) ---
  createLevel(131, 'hard', "Combo 1", "Đi phải -> Nhảy -> Gửi tin?", {type:'motion', text:'Right -> Hop -> Send'}, {type:'motion', text:'Left -> Hop -> Send'}, {type:'motion', text:'Right -> Hop -> Receive'}, "Phải Hop Đóng."),
  createLevel(132, 'hard', "Combo 2", "Nhận tin -> To lên -> Ẩn?", {type:'events', text:'Recv -> Grow -> Hide'}, {type:'events', text:'Send -> Grow -> Hide'}, {type:'events', text:'Recv -> Shrink -> Hide'}, "Mở To Mờ."),
  createLevel(133, 'hard', "Combo 3", "Bấm cờ -> Đợi -> Đi?", {type:'events', text:'Flag -> Wait -> Move'}, {type:'events', text:'Tap -> Wait -> Move'}, {type:'events', text:'Flag -> Stop -> Move'}, "Cờ Đồng hồ Đi."),
  createLevel(134, 'hard', "Combo 4", "Va chạm -> Kêu -> Dừng?", {type:'events', text:'Bump -> Pop -> Stop'}, {type:'events', text:'Bump -> Pop -> End'}, {type:'events', text:'Tap -> Pop -> Stop'}, "Đụng Loa Tay."),
  createLevel(135, 'hard', "Tuần hoàn", "Sang phải rồi về nhà mãi mãi?", {type:'control', text:'Forever [Right -> Home]'}, {type:'control', text:'Repeat [Right -> Home]'}, {type:'motion', text:'Right Home'}, "Vòng tròn Phải Nhà."),
  createLevel(136, 'hard', "Đổi màu", "Gửi tin Xanh rồi tin Đỏ?", {type:'events', text:'Send Blue -> Send Red'}, {type:'events', text:'Send Red -> Send Blue'}, {type:'events', text:'Recv Blue -> Recv Red'}, "Đóng Xanh Đóng Đỏ."),
  createLevel(137, 'hard', "Phản xạ", "Nhận tin -> Xoay phải?", {type:'events', text:'Receive -> Turn Right'}, {type:'events', text:'Receive -> Turn Left'}, {type:'events', text:'Send -> Turn Right'}, "Mở + Xoay."),
  createLevel(138, 'hard', "Hội thoại", "Nhận tin -> Nói 'Hi'?", {type:'events', text:'Receive -> Say Hi'}, {type:'events', text:'Send -> Say Hi'}, {type:'events', text:'Tap -> Say Hi'}, "Mở + Bóng nói."),
  createLevel(139, 'hard', "Biến mất", "Nhận tin -> Biến mất?", {type:'events', text:'Receive -> Hide'}, {type:'events', text:'Send -> Hide'}, {type:'events', text:'Tap -> Hide'}, "Mở + Người mờ."),
  createLevel(140, 'hard', "Xuất hiện", "Nhận tin -> Hiện ra?", {type:'events', text:'Receive -> Show'}, {type:'events', text:'Send -> Show'}, {type:'events', text:'Tap -> Show'}, "Mở + Người rõ."),

  // --- NHÓM 5: THỬ THÁCH TỔNG HỢP (141-150) ---
  createLevel(141, 'hard', "Master 1", "Lặp 4 lần: Đi + Nhảy?", {type:'control', text:'Repeat 4 [Move+Hop]'}, {type:'control', text:'Forever [Move+Hop]'}, {type:'motion', text:'Move Hop 4'}, "Lặp Đi Nhảy."),
  createLevel(142, 'hard', "Master 2", "Chạm tay -> Gửi -> Chuyển trang?", {type:'events', text:'Tap -> Send -> Page 2'}, {type:'events', text:'Flag -> Send -> Page 2'}, {type:'events', text:'Tap -> Recv -> Page 2'}, "Tay Đóng Giấy."),
  createLevel(143, 'hard', "Master 3", "Mãi mãi: Xoay + Đổi màu?", {type:'control', text:'Forever [Turn+Color]'}, {type:'control', text:'Repeat [Turn+Color]'}, {type:'motion', text:'Turn Color'}, "Vòng tròn Xoay."),
  createLevel(144, 'hard', "Master 4", "Đợi 5s -> Kêu Pop -> Hết?", {type:'control', text:'Wait 5 -> Pop -> End'}, {type:'control', text:'Wait 1 -> Pop -> End'}, {type:'control', text:'Wait 5 -> Pop -> Stop'}, "ĐH5 Loa Đỏ."),
  createLevel(145, 'hard', "Master 5", "Nhận tin -> Lặp 3 lần Hop?", {type:'events', text:'Recv -> Rep 3 Hop'}, {type:'events', text:'Send -> Rep 3 Hop'}, {type:'events', text:'Recv -> Hop 3'}, "Mở Lặp Hop."),
  createLevel(146, 'hard', "Logic A", "Nếu đụng thì quay đầu?", {type:'events', text:'Bump -> Turn 180'}, {type:'events', text:'Bump -> Stop'}, {type:'events', text:'Tap -> Turn 180'}, "Đụng + Quay."),
  createLevel(147, 'hard', "Logic B", "Nếu bấm cờ thì Reset?", {type:'events', text:'Flag -> Reset All'}, {type:'events', text:'Tap -> Reset All'}, {type:'events', text:'Flag -> Stop'}, "Cờ + Reset."),
  createLevel(148, 'hard', "Logic C", "Gửi tin khi về đến nhà?", {type:'motion', text:'Go Home -> Send'}, {type:'motion', text:'Go Home -> Receive'}, {type:'motion', text:'Move -> Send'}, "Nhà + Đóng."),
  createLevel(149, 'hard', "Logic D", "Nhận tin để bắt đầu đi?", {type:'events', text:'Receive -> Start Move'}, {type:'events', text:'Send -> Start Move'}, {type:'events', text:'Tap -> Start Move'}, "Mở + Đi."),
  createLevel(150, 'hard', "Final", "Kết thúc trò chơi?", {type:'control', text:'End Game Forever'}, {type:'control', text:'Stop Script'}, {type:'control', text:'Wait Forever'}, "Khối đỏ tròn.")
];