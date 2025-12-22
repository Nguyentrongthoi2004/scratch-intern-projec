
const actionsList = [
  { text: '[Send] -> [Show]', expected: false },
  { text: '[Receive] -> [Show]', expected: false },
  { text: 'End', expected: true },
  { text: '[End]', expected: true },
  { text: '[End Game]', expected: true },
  { text: 'End Game', expected: true },
  { text: 'Send', expected: false },
  { text: 'Stop', expected: false }, // Stop does not trigger isEnd, it triggers isFrozen=false but stops loop
  { text: '[Stop] -> [End]', expected: true },
  { text: '[Move] -> [Send]', expected: false }
];

console.log("Testing Logic: actions.some(action => match 'End' or 'End Game')");

let failed = false;

actionsList.forEach(({ text, expected }) => {
    const actions = text.split(/\s*->\s*|\n/).filter(s => s.trim() !== '');
    const isEnd = actions.some(action => {
       const clean = action.replace(/[\[\]]/g, '').trim();
       return clean.match(/^(End|End Game)$/i);
    });

    if (isEnd !== expected) {
        console.error(`FAIL: '${text}' -> Got ${isEnd}, Expected ${expected}`);
        failed = true;
    } else {
        console.log(`PASS: '${text}' -> ${isEnd}`);
    }
});

if (failed) process.exit(1);
else console.log("All parsing tests passed.");
