import { createLevel } from '../../utils/levelFactory';

export const normalLevels = [
  // --- NHÓM 1: CÁC KHỐI LOGIC CƠ BẢN (51-60) ---
  createLevel(51, 'normal', "Xoay phải", "Làm nhân vật quay theo chiều kim đồng hồ?", {type:'motion', text:'Turn Right'}, {type:'motion', text:'Turn Left'}, {type:'motion', text:'Move Right'}, "Xoay sang phải."),
  createLevel(52, 'normal', "Xoay trái", "Làm nhân vật quay ngược chiều kim đồng hồ?", {type:'motion', text:'Turn Left'}, {type:'motion', text:'Turn Right'}, {type:'motion', text:'Move Left'}, "Xoay sang trái."),
  createLevel(53, 'normal', "To lên", "Làm nhân vật khổng lồ?", {type:'looks', text:'Grow'}, {type:'looks', text:'Shrink'}, {type:'looks', text:'Reset'}, "Người nhỏ sang lớn."),
  createLevel(54, 'normal', "Nhỏ đi", "Làm nhân vật bé xíu?", {type:'looks', text:'Shrink'}, {type:'looks', text:'Grow'}, {type:'looks', text:'Show'}, "Người lớn sang nhỏ."),
  createLevel(55, 'normal', "Về gốc", "Reset kích thước về ban đầu?", {type:'looks', text:'Reset Size'}, {type:'looks', text:'Grow'}, {type:'looks', text:'Shrink'}, "Hai người bằng nhau."),
  createLevel(56, 'normal', "Tốc độ", "Chạy nhanh như gió?", {type:'motion', text:'Speed Fast'}, {type:'motion', text:'Speed Slow'}, {type:'motion', text:'Move'}, "Người đang chạy."),
  createLevel(57, 'normal', "Vòng lặp", "Lặp lại hành động 4 lần?", {type:'control', text:'Repeat 4'}, {type:'control', text:'Forever'}, {type:'control', text:'Wait'}, "Màu cam có số 4."),
  createLevel(58, 'normal', "Va chạm", "Khi đụng trúng nhân vật khác?", {type:'events', text:'When bumped'}, {type:'events', text:'When tapped'}, {type:'events', text:'When flag'}, "Hai người đâm nhau."),
  createLevel(59, 'normal', "Chạm tay", "Khi người chơi nhấn vào nhân vật?", {type:'events', text:'When tapped'}, {type:'events', text:'When bumped'}, {type:'control', text:'Wait'}, "Bàn tay chạm."),
  createLevel(60, 'normal', "Lặp Nhảy", "Nhảy liên tục 5 lần?", {type:'control', text:'Repeat 5 [Hop]'}, {type:'control', text:'Forever'}, {type:'motion', text:'Hop 5'}, "Repeat và Hop."),

  // --- NHÓM 2: KẾT HỢP HÀNH ĐỘNG (61-70) ---
  createLevel(61, 'normal', "Xoay nhiều", "Xoay phải 12 lần?", {type:'motion', text:'Turn Right 12'}, {type:'motion', text:'Turn Left 12'}, {type:'motion', text:'Move Right 12'}, "Phải và số 12."),
  createLevel(62, 'normal', "Lớn gấp đôi", "Phóng to nhân vật 2 mức?", {type:'looks', text:'Grow 2'}, {type:'looks', text:'Shrink 2'}, {type:'looks', text:'Grow 10'}, "Người to số 2."),
  createLevel(63, 'normal', "Siêu nhỏ", "Thu nhỏ nhân vật 5 mức?", {type:'looks', text:'Shrink 5'}, {type:'looks', text:'Grow 5'}, {type:'looks', text:'Reset'}, "Người nhỏ số 5."),
  createLevel(64, 'normal', "Đi chậm", "Đi bộ thật chậm rãi?", {type:'motion', text:'Speed Slow'}, {type:'motion', text:'Speed Fast'}, {type:'control', text:'Wait'}, "Người đi bộ."),
  createLevel(65, 'normal', "Tăng tốc", "Đang đi chậm chuyển sang nhanh?", {type:'motion', text:'Slow -> Fast'}, {type:'motion', text:'Fast -> Slow'}, {type:'motion', text:'Stop -> Fast'}, "Bộ rồi Chạy."),
  createLevel(66, 'normal', "Nhảy lò cò", "Nhảy lên 3 cái?", {type:'control', text:'Repeat 3 [Hop]'}, {type:'motion', text:'Hop 1'}, {type:'motion', text:'Up 3'}, "Lặp số 3."),
  createLevel(67, 'normal', "Xoay vòng", "Xoay trái 4 lần?", {type:'control', text:'Repeat 4 [Left]'}, {type:'motion', text:'Turn Right 4'}, {type:'motion', text:'Move Left 4'}, "Lặp và Xoay."),
  createLevel(68, 'normal', "Lắc lư", "Sang phải rồi sang trái?", {type:'motion', text:'Right -> Left'}, {type:'motion', text:'Left -> Right'}, {type:'motion', text:'Up -> Down'}, "Phải trước."),
  createLevel(69, 'normal', "Lên xuống", "Nhảy lên rồi ngồi xuống?", {type:'motion', text:'Up -> Down'}, {type:'motion', text:'Down -> Up'}, {type:'motion', text:'Hop -> Hop'}, "Lên trước."),
  createLevel(70, 'normal', "Biến hình", "To lên rồi nhỏ lại ngay?", {type:'looks', text:'Grow -> Shrink'}, {type:'looks', text:'Shrink -> Grow'}, {type:'looks', text:'Show -> Hide'}, "To trước."),

  // --- NHÓM 3: SỰ KIỆN NÂNG CAO (71-80) ---
  createLevel(71, 'normal', "Đụng dừng", "Đụng tường thì dừng lại?", {type:'events', text:'Bump -> Stop'}, {type:'events', text:'Tap -> Stop'}, {type:'events', text:'Flag -> Stop'}, "Đụng và Tay đỏ."),
  createLevel(72, 'normal', "Bấm chạy", "Nhấn vào thì chạy nhanh?", {type:'events', text:'Tap -> Fast'}, {type:'events', text:'Bump -> Fast'}, {type:'events', text:'Flag -> Fast'}, "Tay và Người chạy."),
  createLevel(73, 'normal', "Cờ nhảy", "Bấm cờ xanh thì nhảy?", {type:'events', text:'Flag -> Hop'}, {type:'events', text:'Tap -> Hop'}, {type:'events', text:'Bump -> Hop'}, "Cờ và Hop."),
  createLevel(74, 'normal', "Đụng lùi", "Đụng nhau thì đi lùi (Trái)?", {type:'events', text:'Bump -> Left'}, {type:'events', text:'Bump -> Right'}, {type:'events', text:'Tap -> Left'}, "Đụng và Trái."),
  createLevel(75, 'normal', "Bấm nói", "Nhấn vào thì nói 'Hi'?", {type:'events', text:'Tap -> Say Hi'}, {type:'events', text:'Flag -> Say Hi'}, {type:'events', text:'Bump -> Say Hi'}, "Tay và Bóng nói."),
  createLevel(76, 'normal', "Chạm kêu", "Đụng nhau phát tiếng Pop?", {type:'events', text:'Bump -> Pop'}, {type:'events', text:'Tap -> Pop'}, {type:'events', text:'Flag -> Pop'}, "Đụng và Loa."),
  createLevel(77, 'normal', "Cờ ẩn", "Bấm cờ thì trốn đi?", {type:'events', text:'Flag -> Hide'}, {type:'events', text:'Tap -> Hide'}, {type:'events', text:'Bump -> Hide'}, "Cờ và Người mờ."),
  createLevel(78, 'normal', "Bấm hiện", "Nhấn vào màn hình thì hiện ra?", {type:'events', text:'Tap -> Show'}, {type:'events', text:'Flag -> Show'}, {type:'events', text:'Bump -> Show'}, "Tay và Người rõ."),
  createLevel(79, 'normal', "Đụng xoay", "Đụng nhau thì xoay vòng?", {type:'events', text:'Bump -> Turn'}, {type:'events', text:'Tap -> Turn'}, {type:'events', text:'Flag -> Turn'}, "Đụng và Mũi tên cong."),
  createLevel(80, 'normal', "Cờ về", "Bấm cờ thì về nhà?", {type:'events', text:'Flag -> Home'}, {type:'events', text:'Tap -> Home'}, {type:'events', text:'Bump -> Home'}, "Cờ và Nhà."),

  // --- NHÓM 4: CHUỖI LOGIC (81-90) ---
  createLevel(81, 'normal', "Thể dục", "Sang phải 2 bước rồi nhảy?", {type:'motion', text:'Right 2 -> Hop'}, {type:'motion', text:'Left 2 -> Hop'}, {type:'motion', text:'Up 2 -> Hop'}, "Phải 2 và Hop."),
  createLevel(82, 'normal', "Trốn tìm 2", "Chờ 5 giây rồi ẩn?", {type:'control', text:'Wait 5 -> Hide'}, {type:'control', text:'Wait 1 -> Hide'}, {type:'control', text:'Stop -> Hide'}, "Đồng hồ 5."),
  createLevel(83, 'normal', "Phép thuật", "Hiện ra rồi to lên?", {type:'looks', text:'Show -> Grow'}, {type:'looks', text:'Hide -> Grow'}, {type:'looks', text:'Show -> Shrink'}, "Người rõ rồi To."),
  createLevel(84, 'normal', "Tức giận", "To lên rồi nói 'Grrr'?", {type:'looks', text:'Grow -> Say'}, {type:'looks', text:'Shrink -> Say'}, {type:'looks', text:'Reset -> Say'}, "To rồi Nói."),
  createLevel(85, 'normal', "Đi dạo", "Đi phải, đi trái, đi phải?", {type:'motion', text:'R -> L -> R'}, {type:'motion', text:'L -> R -> L'}, {type:'motion', text:'U -> D -> U'}, "Phải Trái Phải."),
  createLevel(86, 'normal', "Hình vuông", "Đi thẳng rồi rẽ phải?", {type:'motion', text:'Move -> Turn R'}, {type:'motion', text:'Move -> Turn L'}, {type:'motion', text:'Hop -> Turn R'}, "Thẳng rồi Cong."),
  createLevel(87, 'normal', "Nhảy dù", "Ở trên cao (Up) rồi xuống?", {type:'motion', text:'Up -> Down'}, {type:'motion', text:'Down -> Up'}, {type:'motion', text:'Left -> Right'}, "Lên rồi Xuống."),
  createLevel(88, 'normal', "Giật mình", "Nhảy lên rồi chạy nhanh?", {type:'motion', text:'Hop -> Fast'}, {type:'motion', text:'Hop -> Slow'}, {type:'motion', text:'Move -> Fast'}, "Hop và Người chạy."),
  createLevel(89, 'normal', "Ngủ", "Nói 'Zzz' rồi đợi?", {type:'looks', text:'Say -> Wait'}, {type:'looks', text:'Say -> Stop'}, {type:'looks', text:'Think -> End'}, "Nói rồi Đồng hồ."),
  createLevel(90, 'normal', "Reset", "Về nhà và về cỡ chuẩn?", {type:'motion', text:'Home -> Reset'}, {type:'motion', text:'Home -> Grow'}, {type:'motion', text:'End -> Reset'}, "Nhà và Hai người."),

  // --- NHÓM 5: TƯ DUY VÒNG LẶP (91-100) ---
  createLevel(91, 'normal', "Lặp đi", "Đi phải 4 lần liên tục?", {type:'control', text:'Repeat 4 [Right]'}, {type:'control', text:'Repeat 4 [Left]'}, {type:'motion', text:'Right 4'}, "Vòng lặp Phải."),
  createLevel(92, 'normal', "Lặp xoay", "Xoay tròn 4 lần?", {type:'control', text:'Repeat 4 [Turn]'}, {type:'control', text:'Forever [Turn]'}, {type:'motion', text:'Turn 4'}, "Vòng lặp Cong."),
  createLevel(93, 'normal', "Lặp lớn", "To lên 3 lần liên tiếp?", {type:'control', text:'Repeat 3 [Grow]'}, {type:'control', text:'Repeat 3 [Shrink]'}, {type:'looks', text:'Grow 3'}, "Vòng lặp To."),
  createLevel(94, 'normal', "Lặp nhỏ", "Nhỏ đi 3 lần liên tiếp?", {type:'control', text:'Repeat 3 [Shrink]'}, {type:'control', text:'Repeat 3 [Grow]'}, {type:'looks', text:'Shrink 3'}, "Vòng lặp Nhỏ."),
  createLevel(95, 'normal', "Lặp kêu", "Kêu Pop 5 lần?", {type:'control', text:'Repeat 5 [Pop]'}, {type:'control', text:'Forever [Pop]'}, {type:'sound', text:'Pop 5'}, "Vòng lặp Loa."),
  createLevel(96, 'normal', "Lặp ẩn hiện", "Nhấp nháy (Ẩn/Hiện) 4 lần?", {type:'control', text:'Repeat 4 [Hide/Show]'}, {type:'control', text:'Wait [Hide/Show]'}, {type:'looks', text:'Hide Show'}, "Vòng lặp Người."),
  createLevel(97, 'normal', "Lặp nhảy", "Nhảy tưng tưng 10 cái?", {type:'control', text:'Repeat 10 [Hop]'}, {type:'control', text:'Forever [Hop]'}, {type:'motion', text:'Hop 10'}, "Vòng lặp Hop."),
  createLevel(98, 'normal', "Vừa đi vừa xoay", "Lặp 4 lần (Đi + Xoay)?", {type:'control', text:'Repeat 4 [Move+Turn]'}, {type:'control', text:'Repeat 4 [Move]'}, {type:'motion', text:'Move Turn'}, "Lặp tổ hợp."),
  createLevel(99, 'normal', "Đếm ngược", "Đợi 1s lặp lại 3 lần?", {type:'control', text:'Repeat 3 [Wait 1]'}, {type:'control', text:'Wait 3'}, {type:'control', text:'Stop'}, "Lặp Đồng hồ."),
  createLevel(100, 'normal', "Chào hỏi", "Lặp lại việc nói 'Hi'?", {type:'control', text:'Repeat [Say Hi]'}, {type:'looks', text:'Say Hi'}, {type:'events', text:'Flag [Say]'}, "Lặp Bóng nói.")
];