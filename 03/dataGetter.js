const fs = require('fs/promises');

const formatData = (data) => data.split('\n').map(String);

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
