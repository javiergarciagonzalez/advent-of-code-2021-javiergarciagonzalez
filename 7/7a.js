const { getDataFromTxtFile } = require('./dataGetter.js');

// https://stackoverflow.com/questions/45309447/calculating-median-javascript/53660837
const getMedian = (data) => {
  const sorted = data.sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
};

const getFuelCost = (crabPositions, median) =>
  crabPositions.reduce(
    (total, currentCrab) => (total += Math.abs(median - currentCrab)),
    0
  );

const isOptimalCost = (cost, compareCost1, compareCost2) =>
  cost < compareCost1 && cost < compareCost2;

(async () => {
  const data = await getDataFromTxtFile();

  const median = getMedian(data);

  const costs = {};

  costs[median] = getFuelCost(data, median);
  costs[median - 1] = getFuelCost(data, median - 1);
  costs[median + 1] = getFuelCost(data, median + 1);

  let result = null;

  if (isOptimalCost(costs[median], costs[median - 1], costs[median + 1])) {
    result = costs[median];
  }

  if (!result) {
    let medianToCheck =
      costs[median - 1] < costs[median + 1] ? median - 1 : median + 1;

    let incr = Math.sign(medianToCheck - (median - 1)); // +1 or -1
    let prev = median;

    while (costs[medianToCheck] < costs[prev]) {
      prev = medianToCheck;
      medianToCheck += incr;
      costs[medianToCheck] = getFuelCost(data, medianToCheck);
    }

    result = costs[medianToCheck];
  }

  console.log('Result: ', result);
})();
