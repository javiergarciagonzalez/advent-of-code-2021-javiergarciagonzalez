const { getDataFromTxtFile } = require('./dataGetter.js');

const checkColumns = (board) =>
  board.some((row, rowIndex) =>
    row.every((number, index) => typeof board[index][rowIndex] === 'object')
  );
const checkRow = (row) => row.every((element) => typeof element === 'object');

const checkWinner = (number, boards) => {
  const winners = new Set();

  boards.forEach((board) => {
    board.forEach((row) => {
      const foundIndex = row.findIndex(
        (numberInRow) =>
          typeof numberInRow !== 'object' && numberInRow === number
      );
      if (foundIndex !== -1) {
        row[foundIndex] = {
          checked: true,
          value: row[foundIndex],
        };
      }

      if (checkRow(row)) {
        winners.add(board);
        boards.delete(board);
      }
    });

    if (checkColumns(board)) {
      winners.add(board);
      boards.delete(board);
    }
  });

  return { winner: winners.size > 0 ? [...winners].pop() : null };
};

const INITIAL_SUM_COUNT = 0;
const getUncheckedNumbersSum = (board) =>
  board.reduce(
    (prevRowTotal, currentRow) =>
      prevRowTotal +
      currentRow.reduce(
        (prevNumber, currentNumber) =>
          typeof currentNumber !== 'object'
            ? prevNumber + parseInt(currentNumber)
            : prevNumber,
        INITIAL_SUM_COUNT
      ),
    INITIAL_SUM_COUNT
  );

(async () => {
  const { inputNumbers, boards } = await getDataFromTxtFile();

  let winnerNumber;
  const winners = new Set();
  const boardsSet = new Set();

  boards.forEach((board) => boardsSet.add(board));

  inputNumbers.forEach((number, index) => {
    const { winner } = checkWinner(number, boardsSet);

    if (winner) {
      winnerNumber = number;

      winners.add(winner);
      return { foo: 42 };
    }
  });
  const board = [...winners].pop();

  const result = winnerNumber
    ? `And the winner is: ${getUncheckedNumbersSum(board) * winnerNumber}!!!`
    : "There's no lucky bingo today :(";

  console.log(result);
})();
