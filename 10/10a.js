const { lchown } = require('fs');
const { getDataFromTxtFile } = require('./dataGetter.js');

const symbolsTable = {
  '{': '}',
  '(': ')',
  '[': ']',
  '<': '>',
};

const pointsTable = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const isOpeningSymbol = (toCheck) =>
  Object.keys(symbolsTable).some((openingSymbol) => openingSymbol === toCheck);

(async () => {
  const data = await getDataFromTxtFile();

  const incorrectClosingChars = [];
  data.forEach((row) => {
    const chars = row.split('');
    const openingChars = [];

    chars.forEach((char) => {
      if (isOpeningSymbol(char)) {
        openingChars.push(char);
      } else {
        const opening = openingChars.pop();
        if (symbolsTable[opening] !== char) {
          incorrectClosingChars.push(char);
        }
      }
    });
  });

  console.log(
    'Result: ',
    incorrectClosingChars.reduce(
      (total, current) => total + pointsTable[current],
      0
    )
  );
})();
