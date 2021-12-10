const { getDataFromTxtFile } = require('./dataGetter.js');

const DIRECTIONS = {
  FORWARD: 'forward',
  UP: 'up',
  DOWN: 'down',
};

const INITIAL_COUNT_VALUE = {
  forward: 0,
  up: 0,
  down: 0,
};

(async () => {
  const data = await getDataFromTxtFile();

  const { forward, up, down } = data.reduce(
    (accumulator, { direction, value: newValue }) => {
      switch (direction) {
        case DIRECTIONS.FORWARD:
          return {
            ...accumulator,
            forward: accumulator.forward + newValue,
          };
        case DIRECTIONS.DOWN:
          return {
            ...accumulator,
            down: accumulator.down + newValue,
          };
        case DIRECTIONS.UP:
          return {
            ...accumulator,
            up: accumulator.up + newValue,
          };
      }
    },
    INITIAL_COUNT_VALUE
  );

  console.log('Result: ', forward * (down - up));
})();
