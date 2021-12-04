const { getDataFromTxtFile } = require('./dataGetter.js');

const checkColumns = (board) =>
  board.some((row, rowIndex) =>
    row.every((number, index) => typeof board[index][rowIndex] === 'object')
  );
const checkRow = (row) => row.every((element) => typeof element === 'object');

const checkWinner = (number, boards) => {
  let winnerBoard = null;
  let isWinner = false;

  boards.some((board) => {
    board.some((row) => {
      const foundIndex = row.findIndex((numberInRow) => numberInRow === number);
      if (foundIndex !== -1) {
        row[foundIndex] = {
          checked: true,
          value: row[foundIndex],
        };
      }

      if (checkRow(row)) {
        isWinner = true;
        winnerBoard = board;
        return true;
      }

      return false;
    });

    if (checkColumns(board) || isWinner) {
      isWinner = true;
      winnerBoard = board;
      return true;
    }
    return false;
  });

  return { isWinner, winnerBoard };
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

  let board;
  let winnerNumber;

  inputNumbers.some((number) => {
    const { isWinner, winnerBoard } = checkWinner(number, boards);

    if (isWinner) {
      board = winnerBoard;
      winnerNumber = number;
      return { foo: 42 };
    }
  });

  const result = winnerNumber
    ? `And the winner is: ${getUncheckedNumbersSum(board) * winnerNumber}!!!`
    : "There's no lucky bingo today :(";

  console.log(result);
})();
