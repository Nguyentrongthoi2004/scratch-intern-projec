import { createLevel } from '../../utils/levelFactory';

export const normalLevels = [
  // --- GROUP 1: MOTION PARAMETERS (51-60) ---
  createLevel(51, 'normal', "Turn Right", "Which block turns the character clockwise?", {type:'motion', text:'Turn Right'}, {type:'motion', text:'Turn Left'}, {type:'motion', text:'Move Right'}, "Mũi tên cong sang phải."),
  createLevel(52, 'normal', "Turn Left", "Which block turns the character counter-clockwise?", {type:'motion', text:'Turn Left'}, {type:'motion', text:'Turn Right'}, {type:'motion', text:'Move Left'}, "Mũi tên cong sang trái."),
  createLevel(53, 'normal', "Grow", "Want to make the character bigger?", {type:'looks', text:'Grow'}, {type:'looks', text:'Shrink'}, {type:'looks', text:'Reset'}, "Hình người nhỏ thành lớn."),
  createLevel(54, 'normal', "Shrink", "Want to make the character smaller?", {type:'looks', text:'Shrink'}, {type:'looks', text:'Grow'}, {type:'looks', text:'Show'}, "Hình người lớn thành nhỏ."),
  createLevel(55, 'normal', "Reset Size", "Return character to default size?", {type:'looks', text:'Reset Size'}, {type:'looks', text:'Grow'}, {type:'looks', text:'Shrink'}, "Hai người bằng nhau."),
  createLevel(56, 'normal', "Speed", "Want the character to run fast?", {type:'motion', text:'Speed Fast'}, {type:'motion', text:'Speed Slow'}, {type:'motion', text:'Move'}, "Hình người đang chạy."),
  createLevel(57, 'normal', "Loop", "Which block repeats actions 4 times?", {type:'control', text:'Repeat 4'}, {type:'control', text:'Forever'}, {type:'control', text:'Wait'}, "Khối màu cam có số 4."),
  createLevel(58, 'normal', "Bump", "Trigger when character hits something?", {type:'events', text:'Start on Bump'}, {type:'events', text:'Start on Tap'}, {type:'events', text:'When Flag'}, "Hai người đâm nhau."),
  createLevel(59, 'normal', "Tap", "Trigger when you tap the character?", {type:'events', text:'Start on Tap'}, {type:'events', text:'Start on Bump'}, {type:'control', text:'Wait'}, "Bàn tay chạm vào người."),
  createLevel(60, 'normal', "Hop 5", "Want to jump 5 times in a row?", {type:'motion', text:'Hop 5'}, {type:'motion', text:'Hop 1'}, {type:'motion', text:'Move Up 5'}, "Khối Hop có số 5."),

  // --- GROUP 2: ADVANCED VARIATIONS (61-70) ---
  createLevel(61, 'normal', "Big Turn", "Turn Right a full circle (12 units)?", {type:'motion', text:'Turn Right 12'}, {type:'motion', text:'Turn Left 12'}, {type:'motion', text:'Move Right 10'}, "Xoay phải số 12."),
  createLevel(62, 'normal', "Grow Big", "Make character 2 times bigger?", {type:'looks', text:'Grow 2'}, {type:'looks', text:'Shrink 2'}, {type:'looks', text:'Grow 10'}, "Người to số 2."),
  createLevel(63, 'normal', "Tiny", "Shrink character by 5 units?", {type:'looks', text:'Shrink 5'}, {type:'looks', text:'Grow 5'}, {type:'looks', text:'Reset'}, "Người nhỏ số 5."),
  createLevel(64, 'normal', "Slow Walk", "Set speed to slow walking?", {type:'motion', text:'Speed Slow'}, {type:'motion', text:'Speed Fast'}, {type:'control', text:'Wait'}, "Hình người đi bộ."),
  createLevel(65, 'normal', "Medium Speed", "Set speed to normal (Medium)?", {type:'motion', text:'Speed Medium'}, {type:'motion', text:'Speed Fast'}, {type:'motion', text:'Stop'}, "Hình người đi vừa."),
  createLevel(66, 'normal', "High Jump", "Jump very high (8 units)?", {type:'motion', text:'Hop 8'}, {type:'motion', text:'Hop 2'}, {type:'motion', text:'Up 8'}, "Hop số 8."),
  createLevel(67, 'normal', "Tiny Turn", "Turn Left just a little bit (1 unit)?", {type:'motion', text:'Turn Left 1'}, {type:'motion', text:'Turn Right 1'}, {type:'motion', text:'Move Left 1'}, "Xoay trái số 1."),
  createLevel(68, 'normal', "Forever", "Which block loops forever?", {type:'control', text:'Forever'}, {type:'control', text:'Repeat'}, {type:'control', text:'End'}, "Vòng lặp kín."),
  createLevel(69, 'normal', "Pause", "Pause the program for a moment?", {type:'control', text:'Wait'}, {type:'control', text:'Stop'}, {type:'control', text:'End'}, "Đồng hồ."),
  createLevel(70, 'normal', "End", "Stop everything completely?", {type:'control', text:'End'}, {type:'control', text:'Stop'}, {type:'looks', text:'Hide'}, "Khối đỏ trơn."),

  // --- GROUP 3: EVENTS & MESSAGES (71-80) ---
  createLevel(71, 'normal', "Send 1", "Send an Orange message?", {type:'events', text:'Send Orange'}, {type:'events', text:'Send Red'}, {type:'events', text:'Receive Orange'}, "Phong thư màu cam."),
  createLevel(72, 'normal', "Receive 1", "Receive an Orange message?", {type:'events', text:'Receive Orange'}, {type:'events', text:'Send Orange'}, {type:'events', text:'Receive Red'}, "Phong thư mở màu cam."),
  createLevel(73, 'normal', "Send 2", "Send a Red message?", {type:'events', text:'Send Red'}, {type:'events', text:'Send Green'}, {type:'events', text:'Receive Red'}, "Phong thư màu đỏ."),
  createLevel(74, 'normal', "Receive 2", "Receive a Red message?", {type:'events', text:'Receive Red'}, {type:'events', text:'Send Red'}, {type:'events', text:'Receive Green'}, "Phong thư mở màu đỏ."),
  createLevel(75, 'normal', "Send 3", "Send a Green message?", {type:'events', text:'Send Green'}, {type:'events', text:'Send Red'}, {type:'events', text:'Receive Green'}, "Phong thư màu xanh lá."),
  createLevel(76, 'normal', "Receive 3", "Receive a Green message?", {type:'events', text:'Receive Green'}, {type:'events', text:'Send Green'}, {type:'events', text:'Receive Orange'}, "Phong thư mở màu xanh."),
  createLevel(77, 'normal', "Invisible", "Which block hides the character?", {type:'looks', text:'Hide'}, {type:'looks', text:'Show'}, {type:'events', text:'When Flag'}, "Hình bóng mờ."),
  createLevel(78, 'normal', "Visible", "Which block shows the character?", {type:'looks', text:'Show'}, {type:'looks', text:'Hide'}, {type:'control', text:'Wait'}, "Hình người rõ."),
  createLevel(79, 'normal', "Green Flag", "Run when Green Flag is clicked?", {type:'events', text:'When Flag'}, {type:'events', text:'Start on Tap'}, {type:'events', text:'Start on Bump'}, "Lá cờ xanh."),
  createLevel(80, 'normal', "Go Home", "Return to starting position?", {type:'motion', text:'Go Home'}, {type:'motion', text:'Stop'}, {type:'control', text:'End'}, "Ngôi nhà xanh."),

  // --- GROUP 4: ADVANCED SKILLS (81-90) ---
  createLevel(81, 'normal', "Repeat 10", "Want to repeat actions 10 times?", {type:'control', text:'Repeat 10'}, {type:'control', text:'Repeat 4'}, {type:'control', text:'Forever'}, "Vòng lặp số 10."),
  createLevel(82, 'normal', "Wait 10", "Wait for a long time (10)?", {type:'control', text:'Wait 10'}, {type:'control', text:'Wait 1'}, {type:'control', text:'Stop'}, "Đồng hồ số 10."),
  createLevel(83, 'normal', "Back 5", "Move Left 5 steps?", {type:'motion', text:'Move Left 5'}, {type:'motion', text:'Move Right 5'}, {type:'motion', text:'Move Down 5'}, "Trái và số 5."),
  createLevel(84, 'normal', "Up 8", "Fly Up 8 steps?", {type:'motion', text:'Move Up 8'}, {type:'motion', text:'Move Down 8'}, {type:'motion', text:'Hop 8'}, "Lên và số 8."),
  createLevel(85, 'normal', "Down 3", "Go Down 3 steps?", {type:'motion', text:'Move Down 3'}, {type:'motion', text:'Move Up 3'}, {type:'motion', text:'Hop 3'}, "Xuống và số 3."),
  createLevel(86, 'normal', "Low Hop", "Hop just a little (1 unit)?", {type:'motion', text:'Hop 1'}, {type:'motion', text:'Hop 10'}, {type:'motion', text:'Move Up 1'}, "Hop và số 1."),
  createLevel(87, 'normal', "Reset", "Stop effects (size/rotation)?", {type:'looks', text:'Reset Size'}, {type:'motion', text:'Go Home'}, {type:'control', text:'Stop'}, "Hai người bằng nhau."),
  createLevel(88, 'normal', "Pop Sound", "Which block makes a sound?", {type:'sound', text:'Pop'}, {type:'looks', text:'Say Hi'}, {type:'motion', text:'Hop'}, "Khối loa."),
  createLevel(89, 'normal', "Speak", "Which block shows a speech bubble?", {type:'looks', text:'Say Hi'}, {type:'sound', text:'Pop'}, {type:'events', text:'Send Message'}, "Bong bóng lời nói."),
  createLevel(90, 'normal', "Finish", "Which block stops everything forever?", {type:'control', text:'End'}, {type:'control', text:'Stop'}, {type:'control', text:'Forever'}, "Khối đỏ."),

  // --- GROUP 5: HARD PARAMETERS (91-100) ---
  createLevel(91, 'normal', "Move 10", "Move Right 10 steps (Max)?", {type:'motion', text:'Move Right 10'}, {type:'motion', text:'Move Right 1'}, {type:'motion', text:'Move Left 10'}, "Phải và số 10."),
  createLevel(92, 'normal', "Turn 6", "Turn Right half a circle (6 units)?", {type:'motion', text:'Turn Right 6'}, {type:'motion', text:'Turn Left 6'}, {type:'motion', text:'Move Right 6'}, "Xoay phải số 6."),
  createLevel(93, 'normal', "Grow 4", "Grow character by 4 units?", {type:'looks', text:'Grow 4'}, {type:'looks', text:'Shrink 4'}, {type:'looks', text:'Reset'}, "Người to số 4."),
  createLevel(94, 'normal', "Shrink 3", "Shrink character by 3 units?", {type:'looks', text:'Shrink 3'}, {type:'looks', text:'Grow 3'}, {type:'looks', text:'Show'}, "Người nhỏ số 3."),
  createLevel(95, 'normal', "Wait 1", "Wait very briefly (1 tick)?", {type:'control', text:'Wait 1'}, {type:'control', text:'Wait 10'}, {type:'control', text:'Stop'}, "Đồng hồ số 1."),
  createLevel(96, 'normal', "Send Yellow", "Send a Yellow message?", {type:'events', text:'Send Yellow'}, {type:'events', text:'Send Red'}, {type:'events', text:'Receive Yellow'}, "Phong thư màu vàng."),
  createLevel(97, 'normal', "Receive Yellow", "Receive a Yellow message?", {type:'events', text:'Receive Yellow'}, {type:'events', text:'Send Yellow'}, {type:'events', text:'Receive Red'}, "Phong thư mở màu vàng."),
  createLevel(98, 'normal', "Send Purple", "Send a Purple message?", {type:'events', text:'Send Purple'}, {type:'events', text:'Send Blue'}, {type:'events', text:'Receive Purple'}, "Phong thư màu tím."),
  createLevel(99, 'normal', "Receive Purple", "Receive a Purple message?", {type:'events', text:'Receive Purple'}, {type:'events', text:'Send Purple'}, {type:'events', text:'Receive Blue'}, "Phong thư mở màu tím."),
  createLevel(100, 'normal', "Summary", "Which block starts the program?", {type:'events', text:'When Flag'}, {type:'control', text:'End'}, {type:'motion', text:'Go Home'}, "Lá cờ xanh.")
];