const { getDataFromTxtFile } = require('./dataGetter.js');

const DIRECTIONS = {
  FORWARD: 'forward',
  UP: 'up',
  DOWN: 'down',
};

const INITIAL_COUNT_VALUE = 0;
(async () => {
  const data = await getDataFromTxtFile();
  const formattedData = data.split('\n').map((row) => {
    return { direction: row.split(' ')[0], value: parseInt(row.split(' ')[1]) };
  });

  const forward = formattedData
    .filter((el) => el.direction === DIRECTIONS.FORWARD)
    .reduce((total, element) => {
      return total + element.value;
    }, INITIAL_COUNT_VALUE);
  const down = formattedData
    .filter((el) => el.direction === DIRECTIONS.DOWN)
    .reduce((total, element) => {
      return total + element.value;
    }, INITIAL_COUNT_VALUE);
  const up = formattedData
    .filter((el) => el.direction === DIRECTIONS.UP)
    .reduce((total, element) => {
      return total + element.value;
    }, INITIAL_COUNT_VALUE);

  console.log('Result: ', forward * (down - up));
})();
