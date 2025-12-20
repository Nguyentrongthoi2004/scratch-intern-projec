// src/utils/levelFactory.js

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const createLevel = (
  id, 
  difficulty, 
  title, 
  instruction, 
  correctBlock, 
  wrong1, 
  wrong2, 
  hint = "Hãy quan sát kỹ các biểu tượng trên khối lệnh nhé!"
) => {
  const rawOptions = [
    { ...correctBlock, id: `opt_${id}_correct`, isCorrect: true },
    { ...wrong1, id: `opt_${id}_wrong1`, isCorrect: false },
    { ...wrong2, id: `opt_${id}_wrong2`, isCorrect: false },
  ];

  const shuffledOptions = shuffleArray(rawOptions);

  return {
    id,
    difficulty,
    title,
    instruction,
    hint,
    correctBlockId: rawOptions.find(opt => opt.isCorrect).id, 
    options: shuffledOptions
  };
};