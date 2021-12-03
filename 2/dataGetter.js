const fs = require('fs/promises');

const getDataFromTxtFile = () => {
  return fs.readFile('./inputData.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    return data;
  });
};

module.exports = {
  getDataFromTxtFile,
};
