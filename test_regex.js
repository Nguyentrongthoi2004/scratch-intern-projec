
const texts = [
  "[Send] -> [Show]",
  "[Receive] -> [Show]",
  "[Receive] -> [Hide]",
  "End",
  "[End]",
  "Send",
  "Sender",
  "Resend",
  "Happy End",
  "The End"
];

const regex = /\bEnd\b/i;
const regex2 = /^End$/i;

console.log("Testing Regex: /\\bEnd\\b/i");
texts.forEach(text => {
  const match = text.match(regex);
  const match2 = text.match(regex2);
  const isEnd = match || match2;
  console.log(`'${text}': ${!!isEnd} (Match: ${match ? match[0] : 'null'})`);
});
