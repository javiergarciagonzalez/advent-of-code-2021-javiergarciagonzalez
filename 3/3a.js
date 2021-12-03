const { parse } = require('path/posix');
const { getDataFromTxtFile } = require('./dataGetter.js');

(async () => {
  const data = await getDataFromTxtFile();

  const digitsPerPosition = {};
  data.forEach((sequence) => {
    sequence.split('').forEach((digit, index) => {
      if (!digitsPerPosition[index]) {
        digitsPerPosition[index] = '';
      }
      digitsPerPosition[index] = digitsPerPosition[index] + digit;
    });
  });

  const binnaryGamma = Object.keys(digitsPerPosition)
    .map((key) =>
      Number(
        digitsPerPosition[key].match(/0/g).length >
          digitsPerPosition[key].match(/1/g).length
      )
    )
    .join()
    .replaceAll(',', '');
  const gamma = parseInt(binnaryGamma, 2);

  const binnaryEpsilon = binnaryGamma
    .replaceAll('0', 'x')
    .replaceAll('1', '0')
    .replaceAll('x', '1');
  const epislon = parseInt(binnaryEpsilon, 2);
  console.log('Result: ', gamma * epislon);
})();
