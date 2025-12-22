import { createLevel } from '../../utils/levelFactory';

export const hardLevels = [
  // --- GROUP 1: MESSAGING (101-110) ---
  createLevel(101, 'hard', "Send Mail", "Send a message to another character?", {type:'events', text:'[Send Message]'}, {type:'events', text:'[Receive Message]'}, {type:'looks', text:'[Say Hi]'}, "Phong thư đóng."),
  createLevel(102, 'hard', "Get Mail", "Action when receiving mail?", {type:'events', text:'[Receive Message]'}, {type:'events', text:'[Send Message]'}, {type:'events', text:'[Tap]'}, "Phong thư mở."),
  createLevel(103, 'hard', "Orange Mail", "Send an Orange message?", {type:'events', text:'[Send Orange]'}, {type:'events', text:'[Send Red]'}, {type:'events', text:'[Receive Orange]'}, "Thư đóng màu cam."),
  createLevel(104, 'hard', "Red Only", "Only receive Red messages?", {type:'events', text:'[Receive Red]'}, {type:'events', text:'[Receive Blue]'}, {type:'events', text:'[Send Red]'}, "Thư mở màu đỏ."),
  createLevel(105, 'hard', "Send & Wait", "Send message then wait a bit?", {type:'sequence', text:'[Send] -> [Wait]'}, {type:'sequence', text:'[Receive] -> [Wait]'}, {type:'sequence', text:'[Tap] -> [Wait]'}, "Thư đóng rồi Đồng hồ."),
  createLevel(106, 'hard', "Receive & Go", "Move after receiving mail?", {type:'sequence', text:'[Receive] -> [Move]'}, {type:'sequence', text:'[Send] -> [Move]'}, {type:'sequence', text:'[Flag] -> [Move]'}, "Thư mở rồi Mũi tên."),
  createLevel(107, 'hard', "Receive & Show", "Appear after receiving mail?", {type:'sequence', text:'[Receive] -> [Show]'}, {type:'sequence', text:'[Receive] -> [Hide]'}, {type:'sequence', text:'[Send] -> [Show]'}, "Thư mở rồi Người rõ."),
  createLevel(108, 'hard', "Tap & Send", "Tap character to send mail?", {type:'sequence', text:'[Tap] -> [Send]'}, {type:'sequence', text:'[Flag] -> [Send]'}, {type:'sequence', text:'[Bump] -> [Send]'}, "Ngón tay rồi Thư đóng."),
  createLevel(109, 'hard', "Bump & Send", "Send mail on collision?", {type:'sequence', text:'[Bump] -> [Send]'}, {type:'sequence', text:'[Tap] -> [Send]'}, {type:'sequence', text:'[Receive] -> [Send]'}, "Hai người rồi Thư đóng."),
  createLevel(110, 'hard', "Forward", "Receive Orange, then Send Red?", {type:'sequence', text:'[Recv Orange] -> [Send Red]'}, {type:'sequence', text:'[Send Orange] -> [Recv Red]'}, {type:'sequence', text:'[Recv Red] -> [Send Orange]'}, "Mở Cam rồi Đóng Đỏ."),

  // --- GROUP 2: PAGE & GAME MANAGEMENT (111-120) ---
  createLevel(111, 'hard', "Change Page", "Go to Page 2?", {type:'control', text:'[Go Page 2]'}, {type:'control', text:'[End]'}, {type:'motion', text:'[Go Home]'}, "Tờ giấy số 2."),
  createLevel(112, 'hard', "Page 3", "Go to Page 3?", {type:'control', text:'[Go Page 3]'}, {type:'control', text:'[Go Page 1]'}, {type:'control', text:'[Stop]'}, "Tờ giấy số 3."),
  createLevel(113, 'hard', "Forever", "Repeat actions endlessly?", {type:'control', text:'[Forever]'}, {type:'control', text:'[Repeat]'}, {type:'control', text:'[End]'}, "Vòng tròn kín."),
  createLevel(114, 'hard', "Game Over", "Stop the entire program?", {type:'control', text:'[End Game]'}, {type:'control', text:'[Stop]'}, {type:'control', text:'[Wait]'}, "Khối đỏ phẳng."),
  createLevel(115, 'hard', "Pause", "Stop this character only?", {type:'control', text:'[Stop]'}, {type:'control', text:'[End]'}, {type:'control', text:'[Wait]'}, "Bàn tay đỏ."),
  createLevel(116, 'hard', "Bump & Page", "Go to Page 2 on collision?", {type:'sequence', text:'[Bump] -> [Page 2]'}, {type:'sequence', text:'[Tap] -> [Page 2]'}, {type:'sequence', text:'[Flag] -> [Page 2]'}, "Đụng rồi Giấy."),
  createLevel(117, 'hard', "Go Back", "Return to Page 1?", {type:'control', text:'[Go Page 1]'}, {type:'control', text:'[Go Page 2]'}, {type:'control', text:'[Reset]'}, "Tờ giấy số 1."),
  createLevel(118, 'hard', "Spin Forever", "Turn around forever?", {type:'sequence', text:'[Forever] { [Turn] }'}, {type:'sequence', text:'[Repeat] { [Turn] }'}, {type:'motion', text:'[Turn Forever]'}, "Vòng lặp chứa Xoay."),
  createLevel(119, 'hard', "Walk Forever", "Walk back and forth forever?", {type:'sequence', text:'[Forever] { [Move] }'}, {type:'sequence', text:'[Repeat] { [Move] }'}, {type:'motion', text:'[Move Forever]'}, "Vòng lặp chứa Đi."),
  createLevel(120, 'hard', "Hop Forever", "Hop continuously?", {type:'sequence', text:'[Forever] { [Hop] }'}, {type:'sequence', text:'[Repeat] { [Hop] }'}, {type:'motion', text:'[Hop Forever]'}, "Vòng lặp chứa Nhảy."),

  // --- GROUP 3: COMPLEX LOGIC (121-130) ---
  createLevel(121, 'hard', "Wait & Send", "Wait 2s then send mail?", {type:'sequence', text:'[Wait 2] -> [Send]'}, {type:'sequence', text:'[Wait 2] -> [Receive]'}, {type:'sequence', text:'[Stop] -> [Send]'}, "Đồng hồ rồi Thư."),
  createLevel(122, 'hard', "Repeat Send", "Send message 3 times?", {type:'sequence', text:'[Repeat 3] { [Send] }'}, {type:'sequence', text:'[Forever] { [Send] }'}, {type:'events', text:'[Send 3]'}, "Lặp chứa Thư."),
  createLevel(123, 'hard', "Recv & Hop", "Receive mail then Hop 4 times?", {type:'sequence', text:'[Recv] -> [Repeat 4] { [Hop] }'}, {type:'sequence', text:'[Recv] -> [Hop]'}, {type:'sequence', text:'[Send] -> [Repeat]'}, "Mở rồi Lặp Nhảy."),
  createLevel(124, 'hard', "Run Forever", "Run fast forever?", {type:'sequence', text:'[Forever] { [Speed Fast] }'}, {type:'sequence', text:'[Repeat] { [Speed Fast] }'}, {type:'motion', text:'[Fast Forever]'}, "Lặp chứa Chạy."),
  createLevel(125, 'hard', "Grow Forever", "Keep growing bigger?", {type:'sequence', text:'[Forever] { [Grow] }'}, {type:'sequence', text:'[Forever] { [Shrink] }'}, {type:'looks', text:'[Grow Forever]'}, "Lặp chứa To."),
  createLevel(126, 'hard', "Blink", "Hide and Show repeatedly?", {type:'sequence', text:'[Forever] { [Hide] -> [Show] }'}, {type:'sequence', text:'[Repeat] { [Hide] -> [Show] }'}, {type:'looks', text:'[Hide Show]'}, "Lặp chứa Ẩn Hiện."),
  createLevel(127, 'hard', "BGM", "Play sound forever?", {type:'sequence', text:'[Forever] { [Play Sound] }'}, {type:'sound', text:'[Play Forever]'}, {type:'sequence', text:'[Repeat] { [Sound] }'}, "Lặp chứa Loa."),
  createLevel(128, 'hard', "Notice", "Say 'Hi' then change page?", {type:'sequence', text:'[Say Hi] -> [Page 2]'}, {type:'sequence', text:'[Say Hi] -> [Stop]'}, {type:'sequence', text:'[End] -> [Page 2]'}, "Bóng nói rồi Giấy."),
  createLevel(129, 'hard', "Arrive & Send", "Move to target then send mail?", {type:'sequence', text:'[Move] -> [Send]'}, {type:'sequence', text:'[Move] -> [Receive]'}, {type:'sequence', text:'[Move] -> [Stop]'}, "Đi rồi Thư đóng."),
  createLevel(130, 'hard', "Trigger", "Send mail to call a friend?", {type:'sequence', text:'[Send] -> [Wait]'}, {type:'sequence', text:'[Receive] -> [Wait]'}, {type:'sequence', text:'[Tap] -> [Wait]'}, "Thư đóng rồi Chờ."),

  // --- GROUP 4: LONG SEQUENCES (131-140) ---
  createLevel(131, 'hard', "Combo 1", "Right -> Hop -> Send?", {type:'sequence', text:'[Right] -> [Hop] -> [Send]'}, {type:'sequence', text:'[Left] -> [Hop] -> [Send]'}, {type:'sequence', text:'[Right] -> [Hop] -> [Recv]'}, "Phải, Nhảy, Đóng."),
  createLevel(132, 'hard', "Combo 2", "Receive -> Grow -> Hide?", {type:'sequence', text:'[Recv] -> [Grow] -> [Hide]'}, {type:'sequence', text:'[Send] -> [Grow] -> [Hide]'}, {type:'sequence', text:'[Recv] -> [Shrink] -> [Hide]'}, "Mở, To, Mờ."),
  createLevel(133, 'hard', "Combo 3", "Flag -> Wait -> Move?", {type:'sequence', text:'[Flag] -> [Wait] -> [Move]'}, {type:'sequence', text:'[Tap] -> [Wait] -> [Move]'}, {type:'sequence', text:'[Flag] -> [Stop] -> [Move]'}, "Cờ, Đồng hồ, Đi."),
  createLevel(134, 'hard', "Combo 4", "Bump -> Pop -> Stop?", {type:'sequence', text:'[Bump] -> [Pop] -> [Stop]'}, {type:'sequence', text:'[Bump] -> [Pop] -> [End]'}, {type:'sequence', text:'[Tap] -> [Pop] -> [Stop]'}, "Đụng, Loa, Tay."),
  createLevel(135, 'hard', "Cycle", "Right then Home forever?", {type:'sequence', text:'[Forever] { [Right] -> [Home] }'}, {type:'sequence', text:'[Repeat] { [Right] -> [Home] }'}, {type:'motion', text:'[Right] -> [Home]'}, "Lặp chứa Phải Nhà."),
  createLevel(136, 'hard', "Colors", "Send Blue then Send Red?", {type:'sequence', text:'[Send Blue] -> [Send Red]'}, {type:'sequence', text:'[Send Red] -> [Send Blue]'}, {type:'sequence', text:'[Recv Blue] -> [Recv Red]'}, "Đóng Xanh, Đóng Đỏ."),
  createLevel(137, 'hard', "React", "Receive -> Turn Right?", {type:'sequence', text:'[Recv] -> [Turn Right]'}, {type:'sequence', text:'[Recv] -> [Turn Left]'}, {type:'sequence', text:'[Send] -> [Turn Right]'}, "Mở rồi Xoay."),
  createLevel(138, 'hard', "Chat", "Receive -> Say 'Hi'?", {type:'sequence', text:'[Recv] -> [Say Hi]'}, {type:'sequence', text:'[Send] -> [Say Hi]'}, {type:'sequence', text:'[Tap] -> [Say Hi]'}, "Mở rồi Nói."),
  createLevel(139, 'hard', "Vanish", "Receive -> Disappear?", {type:'sequence', text:'[Recv] -> [Hide]'}, {type:'sequence', text:'[Send] -> [Hide]'}, {type:'sequence', text:'[Tap] -> [Hide]'}, "Mở rồi Mờ."),
  createLevel(140, 'hard', "Appear", "Receive -> Show up?", {type:'sequence', text:'[Recv] -> [Show]'}, {type:'sequence', text:'[Send] -> [Show]'}, {type:'sequence', text:'[Tap] -> [Show]'}, "Mở rồi Rõ."),

  // --- GROUP 5: MASTER CHALLENGES (141-150) ---
  createLevel(141, 'hard', "Master 1", "Loop 4: Move + Hop?", {type:'sequence', text:'[Repeat 4] { [Move] -> [Hop] }'}, {type:'sequence', text:'[Forever] { [Move] -> [Hop] }'}, {type:'motion', text:'[Move] -> [Hop]'}, "Lặp, Đi, Nhảy."),
  createLevel(142, 'hard', "Master 2", "Tap -> Send -> Page 2?", {type:'sequence', text:'[Tap] -> [Send] -> [Page 2]'}, {type:'sequence', text:'[Flag] -> [Send] -> [Page 2]'}, {type:'sequence', text:'[Tap] -> [Recv] -> [Page 2]'}, "Tay, Đóng, Giấy."),
  createLevel(143, 'hard', "Master 3", "Forever: Turn + Pop?", {type:'sequence', text:'[Forever] { [Turn] -> [Pop] }'}, {type:'sequence', text:'[Repeat] { [Turn] -> [Pop] }'}, {type:'motion', text:'[Turn] -> [Pop]'}, "Lặp, Xoay, Loa."),
  createLevel(144, 'hard', "Master 4", "Wait 5s -> Pop -> End?", {type:'sequence', text:'[Wait 5] -> [Pop] -> [End]'}, {type:'sequence', text:'[Wait 1] -> [Pop] -> [End]'}, {type:'sequence', text:'[Wait 5] -> [Pop] -> [Stop]'}, "ĐH5, Loa, Đỏ."),
  createLevel(145, 'hard', "Master 5", "Receive -> Loop 3 Hops?", {type:'sequence', text:'[Recv] -> [Repeat 3] { [Hop] }'}, {type:'sequence', text:'[Send] -> [Repeat 3] { [Hop] }'}, {type:'sequence', text:'[Recv] -> [Hop 3]'}, "Mở, Lặp 3, Nhảy."),
  createLevel(146, 'hard', "Logic A", "If Bump -> Turn 6?", {type:'sequence', text:'[Bump] -> [Turn 6]'}, {type:'sequence', text:'[Bump] -> [Stop]'}, {type:'sequence', text:'[Tap] -> [Turn 6]'}, "Đụng rồi Quay."),
  createLevel(147, 'hard', "Logic B", "If Flag -> Reset?", {type:'sequence', text:'[Flag] -> [Reset]'}, {type:'sequence', text:'[Tap] -> [Reset]'}, {type:'sequence', text:'[Flag] -> [Stop]'}, "Cờ rồi Reset."),
  createLevel(148, 'hard', "Logic C", "Go Home then Send?", {type:'sequence', text:'[Go Home] -> [Send]'}, {type:'sequence', text:'[Go Home] -> [Recv]'}, {type:'sequence', text:'[Move] -> [Send]'}, "Nhà rồi Đóng."),
  createLevel(149, 'hard', "Logic D", "Receive to start Moving?", {type:'sequence', text:'[Recv] -> [Move Right]'}, {type:'sequence', text:'[Send] -> [Move Right]'}, {type:'sequence', text:'[Tap] -> [Move Right]'}, "Mở rồi Đi."),
  createLevel(150, 'hard', "Final", "Stop script forever?", {type:'control', text:'[End]'}, {type:'control', text:'[Stop]'}, {type:'control', text:'[Wait]'}, "Khối đỏ trơn.")
];