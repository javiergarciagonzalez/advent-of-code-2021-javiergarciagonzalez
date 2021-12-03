const { getDataFromTxtFile } = require('./dataGetter.js');

const getMostCommonSequences = ({ sortedBy1, sortedBy0 }) =>
  sortedBy1.length >= sortedBy0.length ? sortedBy1 : sortedBy0;

const getLeastCommonSequences = ({ sortedBy1, sortedBy0 }) =>
  sortedBy0.length <= sortedBy1.length ? sortedBy0 : sortedBy1;

const sortSequences = (data, index, getNewData) => {
  const count = { sortedBy1: [], sortedBy0: [] };

  data.forEach((sequence) => {
    sequence[index] === '0'
      ? count.sortedBy0.push(sequence)
      : count.sortedBy1.push(sequence);
  });

  const newData = getNewData(count);

  index++;

  if (index > data[0].length || newData.length === 1) {
    return newData.pop();
  }

  return sortSequences(newData, index, getNewData);
};

(async () => {
  const data = await getDataFromTxtFile();

  const resultO2 = sortSequences(data, 0, getMostCommonSequences);
  const resultCO2 = sortSequences(data, 0, getLeastCommonSequences);

  const o2 = parseInt(resultO2, 2);
  const co2 = parseInt(resultCO2, 2);

  console.log('Result is: ', o2 * co2);
})();
