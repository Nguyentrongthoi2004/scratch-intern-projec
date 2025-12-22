import { createLevel } from '../../utils/levelFactory';

export const hardLevels = [
  // --- NHÓM 1: GỬI NHẬN TIN NHẮN (MESSAGING) (101-110) ---
  createLevel(101, 'hard', "Gửi tin", "Gửi 'Thư' cho nhân vật khác?", {type:'events', text:'[Send Message]'}, {type:'events', text:'[Receive Message]'}, {type:'looks', text:'[Say Hi]'}, "Phong thư đóng."),
  createLevel(102, 'hard', "Nhận tin", "Hành động khi nhận được thư?", {type:'events', text:'[Receive Message]'}, {type:'events', text:'[Send Message]'}, {type:'events', text:'[Tap]'}, "Phong thư mở."),
  createLevel(103, 'hard', "Tin Cam", "Gửi tin nhắn màu cam?", {type:'events', text:'[Send Orange]'}, {type:'events', text:'[Send Red]'}, {type:'events', text:'[Receive Orange]'}, "Thư đóng màu cam."),
  createLevel(104, 'hard', "Nhận Đỏ", "Chỉ nhận tin nhắn màu đỏ?", {type:'events', text:'[Receive Red]'}, {type:'events', text:'[Receive Blue]'}, {type:'events', text:'[Send Red]'}, "Thư mở màu đỏ."),
  createLevel(105, 'hard', "Gửi Đợi", "Gửi tin xong chờ 1 chút?", {type:'sequence', text:'[Send] -> [Wait]'}, {type:'sequence', text:'[Receive] -> [Wait]'}, {type:'sequence', text:'[Tap] -> [Wait]'}, "Thư đóng rồi Đồng hồ."),
  createLevel(106, 'hard', "Nhận Đi", "Nhận thư xong thì di chuyển?", {type:'sequence', text:'[Receive] -> [Move]'}, {type:'sequence', text:'[Send] -> [Move]'}, {type:'sequence', text:'[Flag] -> [Move]'}, "Thư mở rồi Mũi tên."),
  createLevel(107, 'hard', "Nhận Hiện", "Nhận thư xong thì hiện ra?", {type:'sequence', text:'[Receive] -> [Show]'}, {type:'sequence', text:'[Receive] -> [Hide]'}, {type:'sequence', text:'[Send] -> [Show]'}, "Thư mở rồi Người rõ."),
  createLevel(108, 'hard', "Bấm Gửi", "Nhấn vào nhân vật để gửi tin?", {type:'sequence', text:'[Tap] -> [Send]'}, {type:'sequence', text:'[Flag] -> [Send]'}, {type:'sequence', text:'[Bump] -> [Send]'}, "Ngón tay rồi Thư đóng."),
  createLevel(109, 'hard', "Đụng Gửi", "Va chạm thì gửi tin?", {type:'sequence', text:'[Bump] -> [Send]'}, {type:'sequence', text:'[Tap] -> [Send]'}, {type:'sequence', text:'[Receive] -> [Send]'}, "Hai người rồi Thư đóng."),
  createLevel(110, 'hard', "Chuyển tiếp", "Nhận tin Cam rồi gửi tin Đỏ?", {type:'sequence', text:'[Recv Orange] -> [Send Red]'}, {type:'sequence', text:'[Send Orange] -> [Recv Red]'}, {type:'sequence', text:'[Recv Red] -> [Send Orange]'}, "Mở Cam rồi Đóng Đỏ."),

  // --- NHÓM 2: QUẢN LÝ TRANG & GAME (111-120) ---
  createLevel(111, 'hard', "Đổi trang", "Chuyển sang màn chơi số 2?", {type:'control', text:'[Go Page 2]'}, {type:'control', text:'[End]'}, {type:'motion', text:'[Go Home]'}, "Tờ giấy số 2."),
  createLevel(112, 'hard', "Trang 3", "Đi tới trang số 3?", {type:'control', text:'[Go Page 3]'}, {type:'control', text:'[Go Page 1]'}, {type:'control', text:'[Stop]'}, "Tờ giấy số 3."),
  createLevel(113, 'hard', "Mãi mãi", "Lặp lại hành động vô tận?", {type:'control', text:'[Forever]'}, {type:'control', text:'[Repeat]'}, {type:'control', text:'[End]'}, "Vòng tròn kín."),
  createLevel(114, 'hard', "Game Over", "Dừng toàn bộ chương trình?", {type:'control', text:'[End Game]'}, {type:'control', text:'[Stop]'}, {type:'control', text:'[Wait]'}, "Khối đỏ phẳng."),
  createLevel(115, 'hard', "Tạm dừng", "Dừng riêng nhân vật này?", {type:'control', text:'[Stop]'}, {type:'control', text:'[End]'}, {type:'control', text:'[Wait]'}, "Bàn tay đỏ."),
  createLevel(116, 'hard', "Đụng Đổi", "Va chạm thì sang màn 2?", {type:'sequence', text:'[Bump] -> [Page 2]'}, {type:'sequence', text:'[Tap] -> [Page 2]'}, {type:'sequence', text:'[Flag] -> [Page 2]'}, "Đụng rồi Giấy."),
  createLevel(117, 'hard', "Quay lại", "Quay lại màn chơi 1?", {type:'control', text:'[Go Page 1]'}, {type:'control', text:'[Go Page 2]'}, {type:'control', text:'[Reset]'}, "Tờ giấy số 1."),
  createLevel(118, 'hard', "Xoay Mãi", "Xoay tròn không bao giờ dừng?", {type:'sequence', text:'[Forever] { [Turn] }'}, {type:'sequence', text:'[Repeat] { [Turn] }'}, {type:'motion', text:'[Turn Forever]'}, "Vòng lặp chứa Xoay."),
  createLevel(119, 'hard', "Đi Mãi", "Đi tới đi lui liên tục?", {type:'sequence', text:'[Forever] { [Move] }'}, {type:'sequence', text:'[Repeat] { [Move] }'}, {type:'motion', text:'[Move Forever]'}, "Vòng lặp chứa Đi."),
  createLevel(120, 'hard', "Nhảy Mãi", "Nhảy liên tục không nghỉ?", {type:'sequence', text:'[Forever] { [Hop] }'}, {type:'sequence', text:'[Repeat] { [Hop] }'}, {type:'motion', text:'[Hop Forever]'}, "Vòng lặp chứa Nhảy."),

  // --- NHÓM 3: LOGIC PHỨC TẠP (121-130) ---
  createLevel(121, 'hard', "Đợi Gửi", "Chờ 2 giây rồi gửi tin?", {type:'sequence', text:'[Wait 2] -> [Send]'}, {type:'sequence', text:'[Wait 2] -> [Receive]'}, {type:'sequence', text:'[Stop] -> [Send]'}, "Đồng hồ rồi Thư."),
  createLevel(122, 'hard', "Lặp Gửi", "Gửi tin nhắn 3 lần?", {type:'sequence', text:'[Repeat 3] { [Send] }'}, {type:'sequence', text:'[Forever] { [Send] }'}, {type:'events', text:'[Send 3]'}, "Lặp chứa Thư."),
  createLevel(123, 'hard', "Nhận Nhảy", "Nhận tin thì nhảy 4 lần?", {type:'sequence', text:'[Recv] -> [Repeat 4] { [Hop] }'}, {type:'sequence', text:'[Recv] -> [Hop]'}, {type:'sequence', text:'[Send] -> [Repeat]'}, "Mở rồi Lặp Nhảy."),
  createLevel(124, 'hard', "Chạy Mãi", "Chạy nhanh vĩnh viễn?", {type:'sequence', text:'[Forever] { [Speed Fast] }'}, {type:'sequence', text:'[Repeat] { [Speed Fast] }'}, {type:'motion', text:'[Fast Forever]'}, "Lặp chứa Chạy."),
  createLevel(125, 'hard', "Lớn Mãi", "Cứ to lên mãi mãi?", {type:'sequence', text:'[Forever] { [Grow] }'}, {type:'sequence', text:'[Forever] { [Shrink] }'}, {type:'looks', text:'[Grow Forever]'}, "Lặp chứa To."),
  createLevel(126, 'hard', "Nhấp nháy", "Ẩn hiện liên tục?", {type:'sequence', text:'[Forever] { [Hide] -> [Show] }'}, {type:'sequence', text:'[Repeat] { [Hide] -> [Show] }'}, {type:'looks', text:'[Hide Show]'}, "Lặp chứa Ẩn Hiện."),
  createLevel(127, 'hard', "Nhạc nền", "Phát nhạc lặp lại mãi?", {type:'sequence', text:'[Forever] { [Play Sound] }'}, {type:'sound', text:'[Play Forever]'}, {type:'sequence', text:'[Repeat] { [Sound] }'}, "Lặp chứa Loa."),
  createLevel(128, 'hard', "Thông báo", "Hiện chữ rồi chuyển trang?", {type:'sequence', text:'[Say Hi] -> [Page 2]'}, {type:'sequence', text:'[Say Hi] -> [Stop]'}, {type:'sequence', text:'[End] -> [Page 2]'}, "Bóng nói rồi Giấy."),
  createLevel(129, 'hard', "Đến Gửi", "Đi đến đích rồi gửi tin?", {type:'sequence', text:'[Move] -> [Send]'}, {type:'sequence', text:'[Move] -> [Receive]'}, {type:'sequence', text:'[Move] -> [Stop]'}, "Đi rồi Thư đóng."),
  createLevel(130, 'hard', "Kích hoạt", "Gửi tin để gọi bạn?", {type:'sequence', text:'[Send] -> [Wait]'}, {type:'sequence', text:'[Receive] -> [Wait]'}, {type:'sequence', text:'[Tap] -> [Wait]'}, "Thư đóng rồi Chờ."),

  // --- NHÓM 4: CHUỖI SỰ KIỆN DÀI (131-140) ---
  createLevel(131, 'hard', "Combo 1", "Đi phải -> Nhảy -> Gửi tin?", {type:'sequence', text:'[Right] -> [Hop] -> [Send]'}, {type:'sequence', text:'[Left] -> [Hop] -> [Send]'}, {type:'sequence', text:'[Right] -> [Hop] -> [Recv]'}, "Phải, Nhảy, Đóng."),
  createLevel(132, 'hard', "Combo 2", "Nhận tin -> To lên -> Ẩn?", {type:'sequence', text:'[Recv] -> [Grow] -> [Hide]'}, {type:'sequence', text:'[Send] -> [Grow] -> [Hide]'}, {type:'sequence', text:'[Recv] -> [Shrink] -> [Hide]'}, "Mở, To, Mờ."),
  createLevel(133, 'hard', "Combo 3", "Bấm cờ -> Đợi -> Đi?", {type:'sequence', text:'[Flag] -> [Wait] -> [Move]'}, {type:'sequence', text:'[Tap] -> [Wait] -> [Move]'}, {type:'sequence', text:'[Flag] -> [Stop] -> [Move]'}, "Cờ, Đồng hồ, Đi."),
  createLevel(134, 'hard', "Combo 4", "Va chạm -> Kêu -> Dừng?", {type:'sequence', text:'[Bump] -> [Pop] -> [Stop]'}, {type:'sequence', text:'[Bump] -> [Pop] -> [End]'}, {type:'sequence', text:'[Tap] -> [Pop] -> [Stop]'}, "Đụng, Loa, Tay."),
  createLevel(135, 'hard', "Tuần hoàn", "Sang phải rồi về nhà mãi mãi?", {type:'sequence', text:'[Forever] { [Right] -> [Home] }'}, {type:'sequence', text:'[Repeat] { [Right] -> [Home] }'}, {type:'motion', text:'[Right] -> [Home]'}, "Lặp chứa Phải Nhà."),
  createLevel(136, 'hard', "Đổi màu", "Gửi tin Xanh rồi tin Đỏ?", {type:'sequence', text:'[Send Blue] -> [Send Red]'}, {type:'sequence', text:'[Send Red] -> [Send Blue]'}, {type:'sequence', text:'[Recv Blue] -> [Recv Red]'}, "Đóng Xanh, Đóng Đỏ."),
  createLevel(137, 'hard', "Phản xạ", "Nhận tin -> Xoay phải?", {type:'sequence', text:'[Recv] -> [Turn Right]'}, {type:'sequence', text:'[Recv] -> [Turn Left]'}, {type:'sequence', text:'[Send] -> [Turn Right]'}, "Mở rồi Xoay."),
  createLevel(138, 'hard', "Hội thoại", "Nhận tin -> Nói 'Hi'?", {type:'sequence', text:'[Recv] -> [Say Hi]'}, {type:'sequence', text:'[Send] -> [Say Hi]'}, {type:'sequence', text:'[Tap] -> [Say Hi]'}, "Mở rồi Nói."),
  createLevel(139, 'hard', "Biến mất", "Nhận tin -> Biến mất?", {type:'sequence', text:'[Recv] -> [Hide]'}, {type:'sequence', text:'[Send] -> [Hide]'}, {type:'sequence', text:'[Tap] -> [Hide]'}, "Mở rồi Mờ."),
  createLevel(140, 'hard', "Xuất hiện", "Nhận tin -> Hiện ra?", {type:'sequence', text:'[Recv] -> [Show]'}, {type:'sequence', text:'[Send] -> [Show]'}, {type:'sequence', text:'[Tap] -> [Show]'}, "Mở rồi Rõ."),

  // --- NHÓM 5: THỬ THÁCH TỔNG HỢP (141-150) ---
  createLevel(141, 'hard', "Master 1", "Lặp 4 lần: Đi + Nhảy?", {type:'sequence', text:'[Repeat 4] { [Move] -> [Hop] }'}, {type:'sequence', text:'[Forever] { [Move] -> [Hop] }'}, {type:'motion', text:'[Move] -> [Hop]'}, "Lặp, Đi, Nhảy."),
  createLevel(142, 'hard', "Master 2", "Chạm -> Gửi -> Đổi trang?", {type:'sequence', text:'[Tap] -> [Send] -> [Page 2]'}, {type:'sequence', text:'[Flag] -> [Send] -> [Page 2]'}, {type:'sequence', text:'[Tap] -> [Recv] -> [Page 2]'}, "Tay, Đóng, Giấy."),
  createLevel(143, 'hard', "Master 3", "Mãi mãi: Xoay + Kêu?", {type:'sequence', text:'[Forever] { [Turn] -> [Pop] }'}, {type:'sequence', text:'[Repeat] { [Turn] -> [Pop] }'}, {type:'motion', text:'[Turn] -> [Pop]'}, "Lặp, Xoay, Loa."),
  createLevel(144, 'hard', "Master 4", "Đợi 5s -> Kêu -> Hết?", {type:'sequence', text:'[Wait 5] -> [Pop] -> [End]'}, {type:'sequence', text:'[Wait 1] -> [Pop] -> [End]'}, {type:'sequence', text:'[Wait 5] -> [Pop] -> [Stop]'}, "ĐH5, Loa, Đỏ."),
  createLevel(145, 'hard', "Master 5", "Nhận -> Lặp 3 lần Hop?", {type:'sequence', text:'[Recv] -> [Repeat 3] { [Hop] }'}, {type:'sequence', text:'[Send] -> [Repeat 3] { [Hop] }'}, {type:'sequence', text:'[Recv] -> [Hop 3]'}, "Mở, Lặp 3, Nhảy."),
  createLevel(146, 'hard', "Logic A", "Nếu đụng thì quay đầu?", {type:'sequence', text:'[Bump] -> [Turn 6]'}, {type:'sequence', text:'[Bump] -> [Stop]'}, {type:'sequence', text:'[Tap] -> [Turn 6]'}, "Đụng rồi Quay."),
  createLevel(147, 'hard', "Logic B", "Nếu bấm cờ thì Reset?", {type:'sequence', text:'[Flag] -> [Reset]'}, {type:'sequence', text:'[Tap] -> [Reset]'}, {type:'sequence', text:'[Flag] -> [Stop]'}, "Cờ rồi Reset."),
  createLevel(148, 'hard', "Logic C", "Về nhà rồi gửi tin?", {type:'sequence', text:'[Go Home] -> [Send]'}, {type:'sequence', text:'[Go Home] -> [Recv]'}, {type:'sequence', text:'[Move] -> [Send]'}, "Nhà rồi Đóng."),
  createLevel(149, 'hard', "Logic D", "Nhận tin để bắt đầu đi?", {type:'sequence', text:'[Recv] -> [Move Right]'}, {type:'sequence', text:'[Send] -> [Move Right]'}, {type:'sequence', text:'[Tap] -> [Move Right]'}, "Mở rồi Đi."),
  createLevel(150, 'hard', "Final", "Dừng kịch bản mãi mãi?", {type:'control', text:'[End]'}, {type:'control', text:'[Stop]'}, {type:'control', text:'[Wait]'}, "Khối đỏ trơn.")
];