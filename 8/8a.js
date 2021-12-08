const { getDataFromTxtFile } = require('./dataGetter.js');

(async () => {
  const data = await getDataFromTxtFile();

  const uniqueSegmentsLength = [2, 3, 4, 7];

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
