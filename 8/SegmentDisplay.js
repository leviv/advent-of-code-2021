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
  const lines = input.split(/\r?\n/);
  let numUniqueSegments = 0;

  for (const line of lines) {
    const lineSplit = line.split("|");
    const patterns = lineSplit[0].trim().split(" ");
    const output = lineSplit[1].trim().split(" ");

    for (const num of output) {
      if ([2, 3, 4, 7].includes(num.length)) {
        numUniqueSegments++;
      }
    }
  }

  return numUniqueSegments;
};

/**
 * Main function for the challenge
 */
const part2 = (input) => {
  const lines = input.split(/\r?\n/);
  let numUniqueSegments = 0;

  for (const line of lines) {
    const lineSplit = line.split("|");
    const patterns = lineSplit[0].trim().split(" ");
    solveSegments(patterns);

    const output = lineSplit[1].trim().split(" ");

    for (const num of output) {
      if ([2, 3, 4, 7].includes(num.length)) {
        numUniqueSegments++;
      }
    }
  }

  return numUniqueSegments;
};

const solveSegments = (numbers) => {
  const solvePossibilities = {
    a: [],
    b: [],
    c: [],
    d: [],
    e: [],
    f: [],
    g: [],
  };
  const numToSegments = {
    0: ["a", "b", "c", "e", "f", "g"],
    1: ["c", "f"],
    2: ["a", "c", "d", "e", "g"],
    3: ["a", "c", "d", "f", "g"],
    4: ["b", "c", "d", "f"],
    5: ["a", "b", "d", "f", "g"],
    6: ["a", "b", "d", "e", "f", "g"],
    7: ["a", "c", "f"],
    8: ["a", "b", "c", "d", "e", "f", "g"],
    9: ["a", "b", "c", "d", "f", "g"],
  };

  for (let number of numbers) {
    number = number.split("").map(String);
    const potentialNumbers = [];

    for (let num in numToSegments) {
      if (numToSegments[num].length === number.length) {
        potentialNumbers.push(num);
      }
    }

    for (const potentialNum of potentialNumbers) {
      for (const segment of numToSegments[potentialNum]) {
        const possibilities = solvePossibilities[segment];

        if (
          number.length < possibilities.length ||
          possibilities.length === 0
        ) {
          solvePossibilities[segment] = number;
        }
      }
    }
  }

  console.log(solvePossibilities);

  let i = 0;

  while (!isSolved(solvePossibilities)) {
    for (const segI in solvePossibilities) {
      const segIPossibilities = solvePossibilities[segI];
      if (segIPossibilities.length > 1) {
        for (const segJ in solvePossibilities) {
          const segJPossibilities = solvePossibilities[segJ];

          if (segIPossibilities.length === segJPossibilities.length + 1) {
            const diff = segIPossibilities.filter(
              (x) => !segJPossibilities.includes(x)
            );

            if (diff.length === 1) {
              const correct = [diff[0]];
              solvePossibilities[segI] = correct;

              // Remove the element as a possibility in any other array
              for (const segment in solvePossibilities) {
                if (segment !== segI) {
                  solvePossibilities[segment] = solvePossibilities[
                    segment
                  ].filter((item) => item !== correct[0]);
                }
              }
            }
          }
        }
      }
    }

    i++;
    if (i > 3) {
      return;
    }

    console.log(solvePossibilities);
  }
};

const isSolved = (solvePossibilities) => {
  for (const segment in solvePossibilities) {
    if (solvePossibilities[segment].length !== 1) {
      return false;
    }
  }

  return true;
};
