import { createLevel } from '../../utils/levelFactory';

export const easyLevels = [
  // --- GROUP 1: BASICS (1-10) ---
  createLevel(1, 'easy', "Start", "Which block runs the script when the Green Flag is clicked?", {type:'events', text:'When Flag'}, {type:'control', text:'Wait'}, {type:'motion', text:'Move Right'}, "Tìm khối Lá cờ xanh!"),
  createLevel(2, 'easy', "Move Right", "How to make the character go RIGHT?", {type:'motion', text:'Move Right'}, {type:'motion', text:'Move Left'}, {type:'motion', text:'Move Up'}, "Mũi tên chỉ sang phải."),
  createLevel(3, 'easy', "Move Up", "Want the character to fly straight UP?", {type:'motion', text:'Move Up'}, {type:'motion', text:'Move Down'}, {type:'motion', text:'Hop'}, "Mũi tên hướng lên."),
  createLevel(4, 'easy', "Say Hi", "Show a speech bubble saying 'Hi'?", {type:'looks', text:'Say Hi'}, {type:'looks', text:'Show'}, {type:'sound', text:'Pop'}, "Biểu tượng bong bóng lời nói."),
  createLevel(5, 'easy', "Sound", "Play a 'Pop' sound?", {type:'sound', text:'Pop'}, {type:'sound', text:'Play Sound'}, {type:'control', text:'Wait'}, "Biểu tượng loa màu xanh."),
  createLevel(6, 'easy', "Hop", "Character jumps in an arc?", {type:'motion', text:'Hop'}, {type:'motion', text:'Move Up'}, {type:'motion', text:'Move Down'}, "Mũi tên nhảy cong."),
  createLevel(7, 'easy', "Go Home", "Return to the starting position?", {type:'motion', text:'Go Home'}, {type:'motion', text:'Move Left'}, {type:'control', text:'Stop'}, "Biểu tượng ngôi nhà."),
  createLevel(8, 'easy', "Wait", "Pause for a moment before continuing?", {type:'control', text:'Wait'}, {type:'control', text:'Stop'}, {type:'control', text:'End'}, "Biểu tượng đồng hồ."),
  createLevel(9, 'easy', "Move Left", "Move the character to the LEFT?", {type:'motion', text:'Move Left'}, {type:'motion', text:'Move Right'}, {type:'motion', text:'Move Down'}, "Mũi tên hướng trái."),
  createLevel(10, 'easy', "Move Down", "Go straight DOWN?", {type:'motion', text:'Move Down'}, {type:'motion', text:'Move Up'}, {type:'motion', text:'Hop'}, "Mũi tên hướng xuống."),

  // --- GROUP 2: VARIATIONS (11-20) ---
  createLevel(11, 'easy', "Hide", "Make the character disappear?", {type:'looks', text:'Hide'}, {type:'looks', text:'Show'}, {type:'motion', text:'Go Home'}, "Hình bóng người mờ."),
  createLevel(12, 'easy', "Show", "Make the character appear again?", {type:'looks', text:'Show'}, {type:'looks', text:'Hide'}, {type:'looks', text:'Reset'}, "Hình người rõ nét."),
  createLevel(13, 'easy', "Tap Event", "Run program when tapping the character?", {type:'events', text:'Start on Tap'}, {type:'events', text:'When Flag'}, {type:'control', text:'Wait'}, "Ngón tay chạm vào nhân vật."),
  createLevel(14, 'easy', "Move Far", "Move 5 steps to the right?", {type:'motion', text:'Move Right 5'}, {type:'motion', text:'Move Left 5'}, {type:'motion', text:'Move Up 5'}, "Mũi tên phải kèm số 5."),
  createLevel(15, 'easy', "High Hop", "Jump higher (2 units)?", {type:'motion', text:'Hop 2'}, {type:'motion', text:'Hop 1'}, {type:'motion', text:'Move Up 2'}, "Khối Hop kèm số 2."),
  createLevel(16, 'easy', "Stop", "Stop all scripts?", {type:'control', text:'Stop'}, {type:'control', text:'End'}, {type:'control', text:'Wait'}, "Biểu tượng bàn tay."),
  createLevel(17, 'easy', "Intro", "Character shows speech bubble?", {type:'looks', text:'Say Hi'}, {type:'sound', text:'Pop'}, {type:'motion', text:'Right'}, "Khối Say Hi."),
  createLevel(18, 'easy', "Reset Pos", "Far away, need to reset to start?", {type:'motion', text:'Go Home'}, {type:'motion', text:'Move Down'}, {type:'motion', text:'Left'}, "Ngôi nhà màu xanh."),
  createLevel(19, 'easy', "Waiting", "Which block makes character wait?", {type:'control', text:'Wait'}, {type:'control', text:'End'}, {type:'control', text:'Stop'}, "Đồng hồ."),
  createLevel(20, 'easy', "Noise", "Which block makes a Pop sound?", {type:'sound', text:'Pop'}, {type:'looks', text:'Show'}, {type:'looks', text:'Say Hi'}, "Loa màu xanh."),

  // --- GROUP 3: SPECIFIC MOVES (21-30) ---
  createLevel(21, 'easy', "Tiny Step", "Move Right just 1 small step?", {type:'motion', text:'Move Right 1'}, {type:'motion', text:'Move Right 10'}, {type:'motion', text:'Move Left 1'}, "Số 1 nhỏ."),
  createLevel(22, 'easy', "Long Run", "Move Right a long way (10)?", {type:'motion', text:'Move Right 10'}, {type:'motion', text:'Move Right 1'}, {type:'motion', text:'Move Up 10'}, "Số 10 lớn."),
  createLevel(23, 'easy', "Back Up", "Move back Left 3 steps?", {type:'motion', text:'Move Left 3'}, {type:'motion', text:'Move Right 3'}, {type:'motion', text:'Move Down 3'}, "Trái và số 3."),
  createLevel(24, 'easy', "Sky High", "Fly Up 8 steps?", {type:'motion', text:'Move Up 8'}, {type:'motion', text:'Move Down 8'}, {type:'motion', text:'Hop 8'}, "Lên và số 8."),
  createLevel(25, 'easy', "Landing", "Go Down 5 steps?", {type:'motion', text:'Move Down 5'}, {type:'motion', text:'Move Up 5'}, {type:'motion', text:'Move Right 5'}, "Xuống và số 5."),
  createLevel(26, 'easy', "Super Hop", "Hop very high (6)?", {type:'motion', text:'Hop 6'}, {type:'motion', text:'Hop 1'}, {type:'motion', text:'Move Up 6'}, "Hop và số 6."),
  createLevel(27, 'easy', "Turn Right", "Rotate Right 4 units?", {type:'motion', text:'Turn Right 4'}, {type:'motion', text:'Turn Left 4'}, {type:'motion', text:'Move Right 4'}, "Mũi tên cong phải."),
  createLevel(28, 'easy', "Turn Left", "Rotate Left 2 units?", {type:'motion', text:'Turn Left 2'}, {type:'motion', text:'Turn Right 2'}, {type:'motion', text:'Move Left 2'}, "Mũi tên cong trái."),
  createLevel(29, 'easy', "Speed Up", "Set speed to Fast?", {type:'motion', text:'Speed Fast'}, {type:'motion', text:'Speed Slow'}, {type:'motion', text:'Wait'}, "Hình người chạy."),
  createLevel(30, 'easy', "Slow Down", "Set speed to Slow?", {type:'motion', text:'Speed Slow'}, {type:'motion', text:'Speed Fast'}, {type:'motion', text:'Stop'}, "Hình người đi bộ."),

  // --- GROUP 4: ACTIONS & EVENTS (31-40) ---
  createLevel(31, 'easy', "Bump Event", "Run when characters touch?", {type:'events', text:'Start on Bump'}, {type:'events', text:'When Flag'}, {type:'events', text:'Start on Tap'}, "Hai người chạm nhau."),
  createLevel(32, 'easy', "Red Mail", "Send a RED message?", {type:'events', text:'Send Red Message'}, {type:'events', text:'Send Message'}, {type:'events', text:'Receive Message'}, "Phong thư đóng màu đỏ."),
  createLevel(33, 'easy', "Get Mail", "Trigger when receiving a message?", {type:'events', text:'Receive Message'}, {type:'events', text:'Send Message'}, {type:'control', text:'Wait'}, "Phong thư đã mở."),
  createLevel(34, 'easy', "Grow", "Make character bigger?", {type:'looks', text:'Grow'}, {type:'looks', text:'Shrink'}, {type:'looks', text:'Reset Size'}, "Người nhỏ thành to."),
  createLevel(35, 'easy', "Shrink", "Make character smaller?", {type:'looks', text:'Shrink'}, {type:'looks', text:'Grow'}, {type:'looks', text:'Show'}, "Người to thành nhỏ."),
  createLevel(36, 'easy', "Normal Size", "Reset to default size?", {type:'looks', text:'Reset Size'}, {type:'looks', text:'Grow'}, {type:'looks', text:'Shrink'}, "Hai người bằng nhau."),
  createLevel(37, 'easy', "Long Wait", "Wait for 10 seconds?", {type:'control', text:'Wait 10'}, {type:'control', text:'Wait 1'}, {type:'control', text:'Stop'}, "Đồng hồ số 10."),
  createLevel(38, 'easy', "Repeat", "Repeat actions 4 times?", {type:'control', text:'Repeat 4'}, {type:'control', text:'Forever'}, {type:'control', text:'End'}, "Vòng lặp số 4."),
  createLevel(39, 'easy', "Forever", "Repeat actions forever?", {type:'control', text:'Forever'}, {type:'control', text:'Repeat'}, {type:'control', text:'End'}, "Vòng lặp kín."),
  createLevel(40, 'easy', "End", "Red block to stop script?", {type:'control', text:'End'}, {type:'control', text:'Stop'}, {type:'control', text:'Forever'}, "Khối đỏ trơn."),

  // --- GROUP 5: COMBINATION & REVIEW (41-50) ---
  createLevel(41, 'easy', "Up 10", "Go Up 10 steps?", {type:'motion', text:'Move Up 10'}, {type:'motion', text:'Move Down 10'}, {type:'motion', text:'Move Up 1'}, "Lên và số 10."),
  createLevel(42, 'easy', "Low Hop", "Hop low (2)?", {type:'motion', text:'Hop 2'}, {type:'motion', text:'Hop 10'}, {type:'motion', text:'Move Up 2'}, "Hop và số 2."),
  createLevel(43, 'easy', "Invisible", "Command to hide?", {type:'looks', text:'Hide'}, {type:'looks', text:'Show'}, {type:'motion', text:'Go Home'}, "Hình bóng mờ."),
  createLevel(44, 'easy', "Visible", "Command to show?", {type:'looks', text:'Show'}, {type:'looks', text:'Hide'}, {type:'looks', text:'Say Hi'}, "Hình người rõ."),
  createLevel(45, 'easy', "Play Sound", "Play recorded sound?", {type:'sound', text:'Play Sound'}, {type:'motion', text:'Hop'}, {type:'control', text:'Wait'}, "Biểu tượng loa."),
  createLevel(46, 'easy', "Reset", "Return to origin?", {type:'motion', text:'Go Home'}, {type:'motion', text:'Stop'}, {type:'control', text:'End'}, "Ngôi nhà."),
  createLevel(47, 'easy', "Spin Right", "Turn Right 12 units (full circle)?", {type:'motion', text:'Turn Right 12'}, {type:'motion', text:'Turn Left 12'}, {type:'motion', text:'Move Right 12'}, "Xoay phải số 12."),
  createLevel(48, 'easy', "Pause", "Stop script temporarily?", {type:'control', text:'Stop'}, {type:'control', text:'Wait'}, {type:'control', text:'End'}, "Bàn tay."),
  createLevel(49, 'easy', "New Page", "Go to Page 2?", {type:'control', text:'Go To Page 2'}, {type:'control', text:'Go To Page 1'}, {type:'control', text:'End'}, "Biểu tượng trang giấy."),
  createLevel(50, 'easy', "Finish", "End the script completely?", {type:'control', text:'End'}, {type:'looks', text:'Hide'}, {type:'sound', text:'Pop'}, "Khối màu đỏ.")
];
