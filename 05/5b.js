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
  const getDiagonals = true;
  const data = await getDataFromTxtFile(getDiagonals);

  const matrix = [];

  const { vertical, horizontal, diagonal } = data;

  console.log(diagonal.length);

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

  diagonal.forEach(({ originX, destinationX, originY, destinationY }) => {
    const directionX = Math.sign(destinationX - originX);
    const directionY = destinationY - originY;
    let counter = Math.abs(originX - destinationX);
    let currentX = originX;
    let currentY = originY;

    // for(let index = Math.min(originX,destinationX); index < Math.abs(originX - destinationX); index + directionX) {}
    while (counter >= 0) {
      matrix[currentY] =
        typeof matrix[currentY] === 'undefined' ? [] : matrix[currentY];

      matrix[currentY][currentX] =
        typeof matrix[currentY][currentX] === 'undefined'
          ? 0
          : matrix[currentY][currentX];

      matrix[currentY][currentX] += 1;
      currentX = directionX < 0 ? currentX - 1 : currentX + 1;
      currentY = directionY < 0 ? currentY - 1 : currentY + 1;
      counter--;
    }
  });

  console.log('Result:', getResult(matrix, 2));
})();
function iterate(value, direction) {
  return;
}
// - 1 2 3 4 5 6
// 0 - 2 3 4 5 6
// 0 1 - 3 4 - 6
// x 1 2 3 - 5 6
// 0 x 2 - 4 5 6
// 0 1 x 3 4 5 6
