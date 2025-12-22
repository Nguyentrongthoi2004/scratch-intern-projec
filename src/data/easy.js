export const level1 = {
  id: 'level-easy-1',
  title: 'Level 1: First Steps',
  instruction: 'Choose the block to move the character forward 1 step.',
  hint: 'Hãy nhìn vào hướng mặt của nhân vật. Nó đang nhìn về phía bên phải.',
  correctBlockId: 'opt-1',
  options: [
    { id: 'opt-1', type: 'motion', text: 'Move Right 1' },
    { id: 'opt-2', type: 'motion', text: 'Move Left 1' },
    { id: 'opt-3', type: 'motion', text: 'Move Up 1' }
  ]
};

export const level2 = {
  id: 'level-easy-2',
  title: 'Level 2: Turning Around',
  instruction: 'The character needs to go back. Which block turns it around?',
  hint: 'Để quay lại, nhân vật cần xoay ngược chiều kim đồng hồ hoặc cùng chiều kim đồng hồ.',
  correctBlockId: 'opt-2',
  options: [
    { id: 'opt-1', type: 'motion', text: 'Move Right 1' },
    { id: 'opt-2', type: 'motion', text: 'Turn Left 2' },
    { id: 'opt-3', type: 'motion', text: 'Hop 1' }
  ]
};

export const level3 = {
  id: 'level-easy-3',
  title: 'Level 3: Jumping High',
  instruction: 'There is an obstacle. Make the character jump over it.',
  hint: 'Dùng lệnh Hop để nhảy lên.',
  correctBlockId: 'opt-3',
  options: [
    { id: 'opt-1', type: 'motion', text: 'Move Right 1' },
    { id: 'opt-2', type: 'looks', text: 'Hide' },
    { id: 'opt-3', type: 'motion', text: 'Hop 2' }
  ]
};

export const easyLevels = [level1, level2, level3];
