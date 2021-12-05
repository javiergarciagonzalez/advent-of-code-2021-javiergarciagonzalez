const fs = require('fs/promises');

const formatData = (data) => {
  const result = {
    byX: [],
    byY: [],
  };

  data.split('\n').forEach((row) => {
    const [origin, destination] = row.split(' -> ');

    const originX = parseInt(origin.split(',')[0]);
    const originY = parseInt(origin.split(',')[1]);
    const destinationX = parseInt(destination.split(',')[0]);
    const destinationY = parseInt(destination.split(',')[1]);

    if (originX === destinationX) {
      result.byX.push({
        x: originX,
        originY,
        destinationY,
      });
    }

    if (originY === destinationY) {
      result.byY.push({
        y: originY,
        originX,
        destinationX,
      });
    }
  });

  return result;
};

const getDataFromTxtFile = async () => {
  const data = await fs.readFile('./inputData.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    return data;
  });

  return formatData(data);
};

module.exports = {
  getDataFromTxtFile,
};
