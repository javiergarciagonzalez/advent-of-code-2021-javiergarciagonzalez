const fs = require('fs/promises');

const isDiagonal = (oX, dX, oY, dY) => {
  const dx = dX - oX;
  const dy = dY - oY;
  return dx == 0 || dy == 0 || dx == dy || dx == -dy;
};
// (oX === dX && oY === dY) ||
// (oX === dY && oY === dY) ||
// (oX === oY && dX === dY) ||
// Math.abs(oX - dX) === Math.abs(oY - dY);

const formatData = (data, getDiagonals) => {
  const result = {
    vertical: [],
    horizontal: [],
  };

  if (getDiagonals) {
    result['diagonal'] = [];
  }

  data.split('\n').forEach((row) => {
    const [origin, destination] = row.split(' -> ');

    const originX = parseInt(origin.split(',')[0]);
    const originY = parseInt(origin.split(',')[1]);
    const destinationX = parseInt(destination.split(',')[0]);
    const destinationY = parseInt(destination.split(',')[1]);

    if (originX === destinationX) {
      result.vertical.push({
        x: originX,
        originY,
        destinationY,
      });
      return;
    }

    if (originY === destinationY) {
      result.horizontal.push({
        y: originY,
        originX,
        destinationX,
      });
      return;
    }

    if (getDiagonals) {
      result.diagonal.push({
        originX,
        destinationX,
        originY,
        destinationY,
      });
    }
  });

  return result;
};

const getDataFromTxtFile = async (getDiagonals = false) => {
  const data = await fs.readFile('./inputData.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    return data;
  });

  return formatData(data, getDiagonals);
};

module.exports = {
  getDataFromTxtFile,
};
