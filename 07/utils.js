// https://stackoverflow.com/questions/45309447/calculating-median-javascript/53660837
const getMedian = (data) => {
  const sorted = data.sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
};

const getFuelCost = (crabPositions, median, part) => {
  return crabPositions.reduce(
    (total, currentCrab) =>
      (total +=
        part === 'a'
          ? Math.abs(median - currentCrab) // part a
          : (Math.abs(median - currentCrab) * // part b
              (Math.abs(median - currentCrab) + 1)) /
            2),
    0
  );
};

const isOptimalCost = (cost, compareCost1, compareCost2) =>
  cost < compareCost1 && cost < compareCost2;

const getResult = (data, part = 'a') => {
  const median = getMedian(data);
  const costs = {};

  costs[median] = getFuelCost(data, median, part);
  costs[median - 1] = getFuelCost(data, median - 1, part);
  costs[median + 1] = getFuelCost(data, median + 1, part);

  if (isOptimalCost(costs[median], costs[median - 1], costs[median + 1])) {
    return costs[median];
  }

  let medianToCheck =
    costs[median - 1] < costs[median + 1] ? median - 1 : median + 1;

  const incr = medianToCheck === median - 1 ? -1 : 1;
  let prev = median;

  while (costs[medianToCheck] < costs[prev]) {
    prev = medianToCheck;
    medianToCheck += incr;
    costs[medianToCheck] = getFuelCost(data, medianToCheck, part);
  }

  return costs[prev];
};

module.exports = {
  getMedian,
  getFuelCost,
  isOptimalCost,
  getResult,
};
