const { getDataFromTxtFile } = require('./dataGetter.js');

(async () => {
  const data = await getDataFromTxtFile();

  const riskLevels = [];

  data.forEach((row, indexRow) => {
    const top = indexRow - 1;
    const bottom = indexRow + 1;
    row.forEach((number, index) => {
      const left = index - 1;
      const right = index + 1;
      const numbers = [];
      if (top >= 0) {
        numbers.push(data[top][index]);
      }
      if (bottom < data.length) {
        numbers.push(data[bottom][index]);
      }
      if (left >= 0) {
        numbers.push(data[indexRow][index - 1]);
      }
      if (right < row.length) {
        numbers.push(data[indexRow][index + 1]);
      }

      if (numbers.every((toCheck) => number < toCheck)) {
        riskLevels.push(number + 1);
      }
    });
  });

  console.log(
    'Result: ',
    riskLevels.reduce((total, number) => total + number, 0)
  );
})();
