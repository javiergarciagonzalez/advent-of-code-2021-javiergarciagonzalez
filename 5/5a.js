const { getDataFromTxtFile } = require('./dataGetter.js');
const getResult = (matrix, overlap) =>
  matrix.reduce(
    (total, row) =>
      total +
      row.reduce(
        (rowCount, number) => (number >= overlap ? rowCount + 1 : rowCount),
        0
      ),
    0
  );

(async () => {
  const data = await getDataFromTxtFile();

  const matrix = [];

  const { vertical, horizontal } = data;

  horizontal.forEach(({ y: rowLevel, originX, destinationX }) => {
    matrix[rowLevel] =
      typeof matrix[rowLevel] === 'undefined' ? [] : matrix[rowLevel];

    const min = Math.min(originX, destinationX);
    const max = Math.max(originX, destinationX);

    for (let index = min; index <= max; index++) {
      matrix[rowLevel][index] =
        typeof matrix[rowLevel][index] !== 'number'
          ? 1
          : matrix[rowLevel][index] + 1;
    }
  });

  vertical.forEach(({ x: columnLevel, originY, destinationY }) => {
    const min = Math.min(originY, destinationY);
    const max = Math.max(originY, destinationY);

    for (let index = min; index <= max; index++) {
      matrix[index] = typeof matrix[index] === 'undefined' ? [] : matrix[index];

      matrix[index][columnLevel] =
        typeof matrix[index][columnLevel] !== 'number'
          ? 1
          : matrix[index][columnLevel] + 1;
    }
  });

  console.log('Result: ', getResult(matrix, 2));
})();
