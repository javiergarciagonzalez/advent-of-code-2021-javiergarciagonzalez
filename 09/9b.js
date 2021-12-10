const { getDataFromTxtFile } = require('./dataGetter.js');

const isLowPoint = (adjacents, number) =>
  adjacents.every((toCheck) => number < toCheck);

const isPointVisited = (checked, point) =>
  checked.find((coord) => coord.x === point.x && coord.y === point.y);

const getBasinSize = (data, x, y) => {
  let basinSize = 0;
  const checked = [];
  const toCheck = [{ x, y }];

  while (toCheck.length > 0) {
    const current = toCheck.pop();

    if (isPointVisited(checked, current)) continue;

    checked.push(current);
    basinSize++;

    getNeighbours(current.x, current.y, data.length).forEach((point) => {
      if (data[point.x][point.y] !== 9 && !isPointVisited(checked, point))
        toCheck.push(point);
    });
  }

  return basinSize;
};

const getAdjacents = (data, indexRow, indexColumn) => {
  const top = indexRow - 1;
  const bottom = indexRow + 1;
  const left = indexColumn - 1;
  const right = indexColumn + 1;
  const numbers = [];

  if (top >= 0) {
    numbers.push(data[top][indexColumn]);
  }
  if (bottom < data.length) {
    numbers.push(data[bottom][indexColumn]);
  }
  if (left >= 0) {
    numbers.push(data[indexRow][indexColumn - 1]);
  }
  if (right < data[indexRow].length) {
    numbers.push(data[indexRow][indexColumn + 1]);
  }

  return numbers;
};

const getNeighbours = (x, y, gridLength) => {
  const neighbours = [];
  if (x - 1 >= 0) neighbours.push({ x: x - 1, y });
  if (y - 1 >= 0) neighbours.push({ x, y: y - 1 });
  if (x < gridLength - 1) neighbours.push({ x: x + 1, y });
  if (y < gridLength - 1) neighbours.push({ x, y: y + 1 });

  return neighbours;
};

(async () => {
  const data = await getDataFromTxtFile();

  const basins = [];

  data.forEach((row, indexRow) => {
    row.forEach((number, indexColumn) => {
      const adjacents = getAdjacents(data, indexRow, indexColumn);

      if (isLowPoint(adjacents, number)) {
        basins.push(getBasinSize(data, indexRow, indexColumn));
      }
    });
  });

  const maxBasins = basins
    .sort((a, b) => (a < b ? 1 : a > b ? -1 : 0))
    .slice(0, 3);

  const result = maxBasins.reduce((total, number) => total * number, 1);

  console.log('Result: ', result);
})();
