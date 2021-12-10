const { getDataFromTxtFile } = require('./dataGetter.js');

(async () => {
  const data = await getDataFromTxtFile();

  const uniqueSegmentsLength = [2, 3, 4, 7]; // length - number: 2-1, 3-7, 4-4, 7-8

  console.log(
    'Result: ',
    data.reduce(
      (total, row) =>
        total +
        row.filter((segment) =>
          uniqueSegmentsLength.some(
            (segmentLength) => segment.length === segmentLength
          )
        ).length,
      0
    )
  );
})();
