const { getDataFromTxtFile } = require('./dataGetter.js');

const DIRECTIONS = {
  FORWARD: 'forward',
  UP: 'up',
  DOWN: 'down',
};

const INITIAL_COUNT_VALUE = {
  horizontalPos: 0,
  depth: 0,
  aim: 0,
};

(async () => {
  const data = await getDataFromTxtFile();

  const result = data.reduce((accumulator, { direction, value: newValue }) => {
    switch (direction) {
      case DIRECTIONS.FORWARD:
        return {
          ...accumulator,
          horizontalPos: accumulator.horizontalPos + newValue,
          depth: accumulator.aim
            ? accumulator.depth + newValue * accumulator.aim
            : 0,
        };
      case DIRECTIONS.DOWN:
        return {
          ...accumulator,
          aim: accumulator.aim + newValue,
        };
      case DIRECTIONS.UP:
        return {
          ...accumulator,
          aim: accumulator.aim - newValue,
        };
    }
  }, INITIAL_COUNT_VALUE);

  console.log(
    'Final horizontal pos * final depth: ',
    result.horizontalPos * result.depth
  );
})();
