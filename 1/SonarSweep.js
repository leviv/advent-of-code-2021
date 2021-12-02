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

/**
 * Main function for the challenge
 */
const part1 = (input) => {
  const depths = input.split(/\r?\n/).map(Number);
  let prevDepth = Number.MAX_SAFE_INTEGER;
  let numIncreases = 0;

  for (let depth of depths) {
    depth = depth;

    if (depth > prevDepth) {
      numIncreases++;
    }
    prevDepth = depth;
  }

  return numIncreases;
};

/**
 * Main function for the challenge
 */
const part2 = (input) => {
  const depths = input.split(/\r?\n/).map(Number);
  let prevDepth = depths[0] + depths[1] + depths[2];
  let numIncreases = 0;

  for (let i = 3; i < depths.length; i++) {
    const curDepth = prevDepth - depths[i - 3] + depths[i];
    if (curDepth > prevDepth) {
      numIncreases++;
    }

    prevDepth = curDepth;
  }

  return numIncreases;
};
