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

  let total = 0;
  for (const line of lines) {
    const lineSplit = line.split("|");
    const patterns = lineSplit[0].trim().split(" ");
    const results = solveSegments(patterns);

    const output = lineSplit[1].trim().split(" ");

    let numStr = "";
    for (let num of output) {
      num = num.split("");
      for (const resultNum in results) {
        var a = new Set(num);
        var b = new Set(results[resultNum]);
        const areSetsEqual =
          a.size === b.size && [...a].every((value) => b.has(value));

        if (areSetsEqual) {
          numStr += resultNum;
        }
      }
    }

    total += parseInt(numStr);
  }

  return total;
};

const solveSegments = (numbers) => {
  const possibilities = [];
  const segmentKey = {
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
  const segmentKeyCopy = JSON.parse(JSON.stringify(segmentKey));

  // Populate array
  for (const number of numbers) {
    const numberSegmentArray = number.split("");
    if (numberSegmentArray.length === 2) {
      possibilities.push({ number: 1, segments: numberSegmentArray });
    } else if (numberSegmentArray.length === 3) {
      possibilities.push({ number: 7, segments: numberSegmentArray });
    } else if (numberSegmentArray.length === 4) {
      possibilities.push({ number: 4, segments: numberSegmentArray });
    } else if (numberSegmentArray.length === 7) {
      possibilities.push({ number: 8, segments: numberSegmentArray });
    } else {
      possibilities.push({ number: null, segments: numberSegmentArray });
    }
  }

  const solves = {};

  // Solve
  while (Object.keys(solves).length !== 7) {
    for (const i of possibilities) {
      for (const j of possibilities) {
        if (
          i.segments.length === j.segments.length + 1 &&
          j.number !== null &&
          (i.number == null || i.number == 7) // Bruh idk pt 2
        ) {
          const diff = i.segments.filter((x) => !j.segments.includes(x));

          if (diff.length === 1) {
            for (const number in segmentKey) {
              const segments = segmentKey[number];
              if (i.segments.length === segments.length) {
                const diff2 = segments.filter(
                  (x) => !segmentKey[j.number].includes(x)
                );
                if (diff2.length === 1) {
                  i.number = number;
                  solves[diff2[0]] = diff[0];

                  for (const num in segmentKey) {
                    segmentKey[num] = segmentKey[num].filter(
                      (item) => item !== diff2[0]
                    );
                  }
                  break;
                }
              }
            }

            for (const num of possibilities) {
              num.segments = num.segments.filter((item) => item !== diff[0]);
            }
            break;
          }
        }
      }
    }

    // Bruh idk
    for (const possibility of possibilities) {
      if (possibility.segments.length === 1 && possibility.number === null) {
        let count = 0;
        for (const possibility2 of possibilities) {
          if (
            possibility2.segments.length === 1 &&
            possibility.segments[0] === possibility2.segments[0]
          ) {
            count++;
          }
        }

        if (count === 1) {
          for (const i in segmentKey) {
            if (segmentKey[i].length === 1) {
              let countInner = 0;
              for (const j in segmentKey) {
                if (
                  segmentKey[j].length === 1 &&
                  segmentKey[i][0] === segmentKey[j][0]
                ) {
                  countInner++;
                }
              }

              if (countInner === 1) {
                possibility.number = i;
                solves[segmentKey[i][0]] = possibility.segments[0];

                for (const num in segmentKey) {
                  segmentKey[num] = segmentKey[num].filter(
                    (item) => item !== segmentKey[i][0]
                  );
                }

                const frick = possibility.segments[0];
                for (const num of possibilities) {
                  num.segments = num.segments.filter((item) => item !== frick);
                }
              }
            }
          }
        }
      }
    }
  }

  const returnMap = {};
  for (const i in segmentKeyCopy) {
    const segmentArr = [];
    for (const segment of segmentKeyCopy[i]) {
      segmentArr.push(solves[segment]);
    }

    returnMap[i] = segmentArr;
  }

  return returnMap;
};
