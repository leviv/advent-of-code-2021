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

const SCORES = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};
const BRACKET_MAP = {
  ")": "(",
  "]": "[",
  "}": "{",
  ">": "<",
};

/**
 * Main function for the challenge
 */
const part1 = (input) => {
  const bracketLines = input.split(/\r?\n/);
  let score = 0;

  for (const bracketLine of bracketLines) {
    const brackets = bracketLine.split("");
    const bracketStack = [];

    for (const bracket of brackets) {
      // If terminating bracket
      if (Object.keys(SCORES).includes(bracket)) {
        if (
          bracketStack.length === 0 ||
          bracketStack[bracketStack.length - 1] !== BRACKET_MAP[bracket]
        ) {
          score += SCORES[bracket];
          break;
        } else {
          bracketStack.pop();
        }
      } else {
        bracketStack.push(bracket);
      }
    }
  }

  return score;
};

const NEW_SCORES = {
  "(": 1,
  "[": 2,
  "{": 3,
  "<": 4,
};

/**
 * Main function for the challenge
 */
const part2 = (input) => {
  const bracketLines = input.split(/\r?\n/);
  let scores = [];

  for (const bracketLine of bracketLines) {
    const brackets = bracketLine.split("");
    const bracketStack = [];
    let error = false;

    for (const bracket of brackets) {
      // If terminating bracket
      if (Object.keys(SCORES).includes(bracket)) {
        if (
          bracketStack.length === 0 ||
          bracketStack[bracketStack.length - 1] !== BRACKET_MAP[bracket]
        ) {
          error = true;
          break;
        } else {
          bracketStack.pop();
        }
      } else {
        bracketStack.push(bracket);
      }
    }

    if (!error) {
      let curScore = 0;
      for (const bracket of bracketStack.reverse()) {
        curScore = curScore * 5 + NEW_SCORES[bracket];
      }
      scores.push(curScore);
    }
  }

  return scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)];
};
