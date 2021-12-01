const fs = require("fs");

/**
 * Load the file
 * __dirname means relative to script. Use "./data.txt" if you want it relative to execution path.
 */
fs.readFile(__dirname + "/input.txt", (error, data) => {
  if(error) {
    throw error;
  }
  const input = data.toString();
  const result = main(input);

  console.log(result);
});

/**
 * Main function for the challenge
 */
const main = (input) => {
  const depths = input.split(/\r?\n/);
  let prevDepth = Number.MAX_SAFE_INTEGER;
  let numIncreases = 0;

  for (let depth of depths) {
    depth = parseInt(depth);

    if (depth > prevDepth) {
      numIncreases++;
    }
    prevDepth = depth;
  }

  return numIncreases;
}
