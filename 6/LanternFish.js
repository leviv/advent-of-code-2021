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
  const result = part1(input);

  console.log(result);
});

const NUM_DAYS = 256;

/**
 * Main function for the challenge
 */
const part1 = (input) => {
  const initialFish = input.split(",").map(Number);
  // Internal timer to num of fishes
  let initialFishes = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  };
  let fishes = JSON.parse(JSON.stringify(initialFishes));
  let tempFishes = JSON.parse(JSON.stringify(initialFishes));

  // Populate the map
  for (const fish of initialFish) {
    fishes[fish]++;
  }

  for (let day = 0; day < NUM_DAYS; day++) {
    for (let internalTimer in fishes) {
      internalTimer = parseInt(internalTimer);

      if (internalTimer === 0) {
        tempFishes[8] += fishes[internalTimer];
        tempFishes[6] += fishes[internalTimer];
      } else {
        tempFishes[internalTimer - 1] += fishes[internalTimer];
      }
    }
    fishes = tempFishes;
    tempFishes = JSON.parse(JSON.stringify(initialFishes));
  }

  let numFish = 0;
  for (let internalTimer in fishes) {
    numFish += fishes[internalTimer];
  }

  return numFish;
};

// No need for part 2, just change the constant NUM_DAYS
