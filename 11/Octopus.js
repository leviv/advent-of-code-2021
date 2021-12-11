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

const NUM_STEPS = 100;

/**
 * Main function for the challenge
 */
 const part1 = (input) => {
    const octopusEnergy = input
    .split(/\r?\n/)
    .map((line) => line.split("").map(Number));

    let numFlashes = 0;

    for (let i = 0; i < NUM_STEPS; i++) {
        for (let i = 0; i < octopusEnergy.length; i++) {
            for (let j = 0; j < octopusEnergy[i].length; j++) {
                octopusEnergy[i][j]++
            }
        }

        for (let i = 0; i < octopusEnergy.length; i++) {
            for (let j = 0; j < octopusEnergy[i].length; j++) {
                if (octopusEnergy[i][j] > 9) {
                    numFlashes += flashHelper(octopusEnergy, i, j, true);
                }
            }
        }   
    }

    return numFlashes;
 }

 /**
 * Main function for the challenge
 */
  const part2 = (input) => {
    const octopusEnergy = input
    .split(/\r?\n/)
    .map((line) => line.split("").map(Number));

    let flashTogether = false;
    let numSteps = 0;
    while(!flashTogether) {
        for (let i = 0; i < octopusEnergy.length; i++) {
            for (let j = 0; j < octopusEnergy[i].length; j++) {
                octopusEnergy[i][j]++
            }
        }
        numSteps++
        let numFlashes = 0;

        for (let i = 0; i < octopusEnergy.length; i++) {
            for (let j = 0; j < octopusEnergy[i].length; j++) {
                if (octopusEnergy[i][j] > 9) {
                    numFlashes += flashHelper(octopusEnergy, i, j, true);
                }
            }
        }

        if (numFlashes === octopusEnergy.length * octopusEnergy[0].length) {
            flashTogether = true;
        }
    }

    return numSteps;
 }

 const flashHelper = (octopusEnergy, i, j, firstCall) => {
    // Check out of bounds
    if (i < 0 || j < 0 || i >= octopusEnergy.length || j >= octopusEnergy[i].length) {
        return 0;
    }

    if (octopusEnergy[i][j] === 0) {
        return 0;
    }

    if (!firstCall) {
        octopusEnergy[i][j]++;
    }

    if (octopusEnergy[i][j] > 9) {
        octopusEnergy[i][j] = 0;
        return 1 + 
        flashHelper(octopusEnergy, i+1, j, false) + 
        flashHelper(octopusEnergy, i+1, j-1, false) + 
        flashHelper(octopusEnergy, i+1, j+1, false) + 
        flashHelper(octopusEnergy, i-1, j, false) +
        flashHelper(octopusEnergy, i-1, j+1, false) +
        flashHelper(octopusEnergy, i-1, j-1, false) +
        flashHelper(octopusEnergy, i, j+1, false) +
        flashHelper(octopusEnergy, i, j-1, false)
    }
    
    return 0;
 }