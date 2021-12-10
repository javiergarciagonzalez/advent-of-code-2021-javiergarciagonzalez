const { getDataFromTxtFile } = require('./dataGetter.js');

(async () => {
  const data = await getDataFromTxtFile();

  let lanternfishCount = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  data.forEach((current) => {
    lanternfishCount[current]++;
  });

  for (let days = 0; days < 256; days++) {
    const fish0 = lanternfishCount[0];
    const newCount = lanternfishCount.map(
      (n, index) => lanternfishCount[index + 1] || 0
    );

    newCount[6] += fish0;
    newCount[8] += fish0;
    lanternfishCount = newCount;
  }

  console.log(
    'Result: ',
    lanternfishCount.reduce((total, current) => {
      return total + current;
    }, 0)
  );
})();
