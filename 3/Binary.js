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

/**
 * Main function for the challenge
 */
const part1 = (input) => {
  const binaries = input.split(/\r?\n/);
  const oneAggregates = Array(binaries[0].length).fill(0);

  for (binaryString of binaries) {
    for (let i = 0; i < binaryString.length; i++) {
      if (binaryString.charAt(i) === "1") {
        oneAggregates[i]++;
      }
    }
  }

  let gamma = "";
  let epsilon = "";

  for (let i = 0; i < oneAggregates.length; i++) {
    const percentOne = oneAggregates[i] / binaries.length;
    gamma += percentOne > 0.5 ? "1" : 0;
    epsilon += percentOne <= 0.5 ? "1" : 0;
  }

  // Parse binary to decimal
  gamma = parseInt(gamma, 2);
  epsilon = parseInt(epsilon, 2);

  return gamma * epsilon;
};

/**
 * Main function for the challenge
 */
const part2 = (input) => {
  const binaries = input.split(/\r?\n/);

  let oxygen = helper(binaries, true, 0);
  let co2 = helper(binaries, false, 0);

  // Parse binary to decimal
  oxygen = parseInt(oxygen, 2);
  co2 = parseInt(co2, 2);

  return oxygen * co2;
};

/**
 * Recursive helper method
 */
const helper = (listInput, oxygen, index) => {
  // We have one number left
  if (listInput.length === 1) {
    return listInput[0];
  }

  let numOnes = 0;
  for (binaryString of listInput) {
    if (binaryString.charAt(index) === "1") {
      numOnes += 1;
    }
  }

  let nextDigit;
  if (oxygen) {
    nextDigit = numOnes / listInput.length >= 0.5 ? "1" : "0";
  } else {
    nextDigit = numOnes / listInput.length < 0.5 ? "1" : "0";
  }

  const nextInput = listInput.filter(
    (binaryString) => binaryString.charAt(index) === nextDigit
  );

  return helper(nextInput, oxygen, index + 1);
};
