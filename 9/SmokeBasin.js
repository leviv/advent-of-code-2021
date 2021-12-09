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
  const heightMap = input
    .split(/\r?\n/)
    .map((line) => line.split("").map(Number));

  let lowPointSum = 0;
  for (let i = 0; i < heightMap.length; i++) {
    for (let j = 0; j < heightMap[i].length; j++) {
      const curHeight = heightMap[i][j];

      if (
        (i === 0 || curHeight < heightMap[i - 1][j]) &&
        (i === heightMap.length - 1 || curHeight < heightMap[i + 1][j]) &&
        (j === 0 || curHeight < heightMap[i][j - 1]) &&
        (j === heightMap[0].length - 1 || curHeight < heightMap[i][j + 1])
      ) {
        lowPointSum += 1 + curHeight;
      }
    }
  }

  return lowPointSum;
};

/**
 * Main function for the challenge
 */
const part2 = (input) => {
  const heightMap = input
    .split(/\r?\n/)
    .map((line) => line.split("").map(Number));

  let basins = [];
  for (let i = 0; i < heightMap.length; i++) {
    for (let j = 0; j < heightMap[i].length; j++) {
      const curHeight = heightMap[i][j];

      if (
        (i === 0 || curHeight < heightMap[i - 1][j]) &&
        (i === heightMap.length - 1 || curHeight < heightMap[i + 1][j]) &&
        (j === 0 || curHeight < heightMap[i][j - 1]) &&
        (j === heightMap[0].length - 1 || curHeight < heightMap[i][j + 1])
      ) {
        const heightMapClone = JSON.parse(JSON.stringify(heightMap));
        const basinSize = basinHelper(heightMap, heightMapClone, i, j);
        basins.push(basinSize);
      }
    }
  }

  basins = basins.sort((a, b) => a - b).reverse();
  return basins[0] * basins[1] * basins[2];
};

const VISITED = -1;
const MAX_HEIGHT = 9;

const basinHelper = (heightMap, visited, i, j) => {
  // Check out of bounds
  if (i < 0 || j < 0 || i >= heightMap.length || j >= heightMap[i].length) {
    return 0;
  }

  // Check if we've seen before
  if (visited[i][j] === VISITED) {
    return 0;
  }

  // Check if we hit top of hill
  if (visited[i][j] === MAX_HEIGHT) {
    return 0;
  }

  visited[i][j] = VISITED;
  return (
    1 +
    basinHelper(heightMap, visited, i + 1, j) +
    basinHelper(heightMap, visited, i - 1, j) +
    basinHelper(heightMap, visited, i, j + 1) +
    basinHelper(heightMap, visited, i, j - 1)
  );
};
