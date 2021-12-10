const { getDataFromTxtFileForPart2 } = require('./dataGetter.js');

const getSortedString = (str) =>
  str.split('').sort().join().replaceAll(',', '');

const uniqueLengthNumbers = {
  2: 1,
  3: 7,
  4: 4,
  7: 8,
};

const everyLetterMatches = (stringToMatch, stringToCheck) =>
  stringToMatch.split('').every((letter) => stringToCheck.includes(letter));

const someLettersMatch = (stringToMatch, stringToCheck, amountOfLetters) =>
  stringToMatch.split('').filter((letter) => stringToCheck.includes(letter))
    .length === amountOfLetters;

const getDecodedNumbers = (patterns) => {
  const decodedNumbersTable = {};

  // Get unique length patterns
  Object.keys(uniqueLengthNumbers).forEach((knownLength) => {
    const pattern = patterns.find(
      (pattern) => pattern.length === parseInt(knownLength)
    );
    decodedNumbersTable[uniqueLengthNumbers[knownLength]] = pattern;
  });

  // Get tricky patterns
  patterns.forEach((pattern) => {
    const groupLength = pattern.length;

    if (groupLength === 5) {
      if (everyLetterMatches(decodedNumbersTable['7'], pattern)) {
        decodedNumbersTable['3'] = pattern;
      } else if (
        someLettersMatch(decodedNumbersTable['4'], pattern, 3) &&
        pattern !== decodedNumbersTable['3']
      ) {
        decodedNumbersTable['5'] = pattern;
      } else {
        decodedNumbersTable['2'] = pattern;
      }
    }

    if (groupLength === 6) {
      if (everyLetterMatches(decodedNumbersTable['4'], pattern)) {
        decodedNumbersTable['9'] = pattern;
      } else if (
        everyLetterMatches(decodedNumbersTable['7'], pattern) &&
        pattern !== decodedNumbersTable['9']
      ) {
        decodedNumbersTable['0'] = pattern;
      } else {
        decodedNumbersTable['6'] = pattern;
      }
    }
  });

  return decodedNumbersTable;
};

const getDecodedOutput = (inputPatterns, outputPatterns) => {
  const decodedNumbersTable = getDecodedNumbers(inputPatterns);
  let finalOutputNumber = '';

  outputPatterns.forEach((output) => {
    finalOutputNumber += Object.keys(decodedNumbersTable).find((key) =>
      decodedNumbersTable[key] === output ? key : null
    );
  });

  return parseInt(finalOutputNumber);
};

(async () => {
  const data = await getDataFromTxtFileForPart2();

  const result = data.reduce((total, row, index) => {
    const [input, output] = row.split(' | ');

    const inputPatterns = input.split(' ').map((str) => getSortedString(str));
    const outputPatterns = output.split(' ').map((str) => getSortedString(str));

    const outputt = getDecodedOutput(inputPatterns, outputPatterns);

    return total + outputt;
  }, 0);

  console.log('Result', result);
})();
