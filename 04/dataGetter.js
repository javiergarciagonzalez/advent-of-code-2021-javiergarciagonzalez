const fs = require('fs/promises');

const formatData = (data) => {
  const dataArray = data.split('\n');
  const inputNumbers = dataArray.shift().split(',');
  const rows = dataArray.filter((el) => el !== '');
  const boards = [];
  let boardsCounter = 0;
  rows.forEach((row, index) => {
    if (index % 5 === 0 && index !== 0) {
      boardsCounter++;
    }
    const formattedRow = row.split(' ').filter((number) => number !== '');
    if (!boards[boardsCounter]) {
      boards[boardsCounter] = [formattedRow];
    } else {
      boards[boardsCounter].push(formattedRow);
    }
  });

  return {
    inputNumbers,
    boards,
  };
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
