const input = require('./inputData');

const INITIAL_VALUE = 0;

const result = input.reduce(
  (accumulated, currentValue, index) =>
    currentValue > input[index - 3] && !!input[index - 3]
      ? ++accumulated
      : accumulated,
  INITIAL_VALUE
);

console.log(result);
