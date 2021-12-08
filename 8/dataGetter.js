const fs = require('fs/promises');

const getDataFromTxtFile = async () => {
  const data = await fs.readFile('./inputData.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    return data;
  });

  return data.split('\n').map((row) => row.split(' | ')[1].split(' '));
};

module.exports = {
  getDataFromTxtFile,
};