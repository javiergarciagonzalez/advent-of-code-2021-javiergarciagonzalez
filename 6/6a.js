const { getDataFromTxtFile } = require('./dataGetter.js');

(async () => {
  const data = await getDataFromTxtFile();

  for (let index = 0; index < 80; index++) {
    data.forEach((fish, index) => {
      data[index] = fish === 0 ? 6 : fish - 1;
      if (!fish) {
        data.push(8);
      }
    });
  }
  console.log('Result: ' + data.length);
})();
