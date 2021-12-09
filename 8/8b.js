const { getDataFromTxtFileForPart2 } = require('./dataGetter.js');

const getSortedString = (str) =>
  str.split('').sort().join().replaceAll(',', '');

const getDecodedNumbers = (digits) => {
  const decodedNumbersTable = {};

  decodedNumbersTable['1'] = digits.find(
    (digitGroup) => digitGroup.length === 2
  );
  decodedNumbersTable['4'] = digits.find(
    (digitGroup) => digitGroup.length === 4
  );
  decodedNumbersTable['7'] = digits.find(
    (digitGroup) => digitGroup.length === 3
  );
  decodedNumbersTable['8'] = digits.find(
    (digitGroup) => digitGroup.length === 7
  );

  decodedNumbersTable['9'] = digits.find(
    (digitGroup) =>
      digitGroup.length === 6 &&
      decodedNumbersTable['4']
        .split('')
        .every((letter) => digitGroup.includes(letter))
  );
  decodedNumbersTable['0'] = digits.find(
    (digitGroup) =>
      digitGroup.length === 6 &&
      decodedNumbersTable['7']
        .split('')
        .every((letter) => digitGroup.includes(letter)) &&
      digitGroup !== decodedNumbersTable['9']
  );

  decodedNumbersTable['6'] = digits.find(
    (digitGroup) =>
      digitGroup.length === 6 &&
      digitGroup !== decodedNumbersTable['0'] &&
      digitGroup !== decodedNumbersTable['9']
  );

  decodedNumbersTable['3'] = digits.find(
    (digitGroup) =>
      digitGroup.length === 5 &&
      decodedNumbersTable['7']
        .split('')
        .every((letter) => digitGroup.includes(letter))
  );

  decodedNumbersTable['5'] = digits.find(
    (digitGroup) =>
      digitGroup.length === 5 &&
      decodedNumbersTable['4']
        .split('')
        .filter((letter) => digitGroup.includes(letter)).length === 3 &&
      digitGroup !== decodedNumbersTable['3']
  );

  decodedNumbersTable['2'] = digits.find(
    (digitGroup) =>
      digitGroup.length === 5 &&
      digitGroup !== decodedNumbersTable['5'] &&
      digitGroup !== decodedNumbersTable['3']
  );

  return decodedNumbersTable;
};

const getDecodedOutput = (inputDigits, outputDigits) => {
  const decodedNumbersTable = getDecodedNumbers(inputDigits);
  let finalOutputNumber = '';

  outputDigits.forEach((output) => {
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

    const inputDigits = input.split(' ').map((str) => getSortedString(str));
    const outputDigits = output.split(' ').map((str) => getSortedString(str));

    const outputt = getDecodedOutput(inputDigits, outputDigits);

    return total + outputt;
  }, 0);

  console.log('Result', result);
})();
