const { getDataFromTxtFile } = require('./dataGetter.js');

const symbolsTable = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

const isOpeningSymbol = (toCheck) =>
  Object.keys(symbolsTable).some((openingSymbol) => openingSymbol === toCheck);

const getClosingCharWeight = (char) =>
  Object.keys(symbolsTable).findIndex((key) => symbolsTable[key] === char) + 1;

(async () => {
  const data = await getDataFromTxtFile();

  const incorrectClosingChars = [];
  const endings = [];

  data.forEach((row) => {
    const openingChars = [];
    const closingChars = [];

    for (index in row) {
      const char = row[index];
      if (isOpeningSymbol(char)) {
        openingChars.push(char);
        closingChars.push(symbolsTable[char]);
      } else {
        if (closingChars.at(-1) === char) {
          closingChars.pop();
        } else {
          incorrectClosingChars.push(char);
          break;
        }
      }
    }

    if (parseInt(index) === row.length - 1) {
      endings.push(closingChars.reverse());
    }
  });

  const scores = endings.map((ending) =>
    ending.reduce((acc, char) => acc * 5 + getClosingCharWeight(char), 0)
  );

  const result = scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)];

  console.log('Result: ', result);
})();
