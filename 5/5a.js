const { getDataFromTxtFile } = require('./dataGetter.js');

(async () => {
  const data = await getDataFromTxtFile();

  const matrix = [];

  const { byX, byY } = data;

  byY.forEach(({ y: rowLevel, originX, destinationX }) => {
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

  byX.forEach(({ x: columnLevel, originY, destinationY }) => {
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

  let result = 0;
  matrix.forEach((row) =>
    row.forEach((el) => {
      result = typeof el === 'number' && el > 1 ? result + 1 : result;
    })
  );

  console.log(result);
})();
