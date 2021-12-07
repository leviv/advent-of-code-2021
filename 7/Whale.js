const fs = require("fs");

/**
 * Load the file
 * __dirname means relative to script. Use "./data.txt" if you want it relative to execution path.
 */
fs.readFile(__dirname + "/input.txt", (error, data) => {
  if (error) {
    throw error;
  }
  const input = data.toString();
  const result = part2(input);

  console.log(result);
});

const getMedian = (values) => {
  values.sort((a, b) => {
    return a - b;
  });

  const half = Math.floor(values.length / 2);

  if (values.length % 2) {
    return values[half];
  } else {
    return (values[half - 1] + values[half]) / 2.0;
  }
};

/**
 * Main function for the challenge
 */
const part1 = (input) => {
  const crabPositions = input.split(",").map(Number);
  const median = getMedian(crabPositions);

  let totalMovement = 0;
  for (const crabPosition of crabPositions) {
    totalMovement += Math.abs(crabPosition - median);
  }

  return totalMovement;
};

const getMean = (input) => {
  let sum = input.reduce((sum, current) => sum + current, 0);
  // honestly not sure why this works? I thought it should be round
  return Math.floor(sum / input.length);
};

/**
 * Main function for the challenge
 */
const part2 = (input) => {
  const crabPositions = input.split(",").map(Number);
  const mean = getMean(crabPositions);

  let totalMovement = 0;
  for (const crabPosition of crabPositions) {
    const moveDistance = Math.abs(crabPosition - mean);
    totalMovement += (Math.pow(moveDistance, 2) + moveDistance) / 2;
  }

  return totalMovement;
};
