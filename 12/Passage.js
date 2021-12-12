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
  const edges = input.split(/\r?\n/);
  const caveGraph = {};

  // Parse input
  for (let edge of edges) {
    edge = edge.split("-");
    const start = edge[0];
    const end = edge[1];

    if (!caveGraph[start]) {
      caveGraph[start] = { visited: false, adjacent: [] };
    }

    if (!caveGraph[end]) {
      caveGraph[end] = { visited: false, adjacent: [] };
    }

    caveGraph[start].adjacent.push(end);
    caveGraph[end].adjacent.push(start);
  }

  return helper1(caveGraph, "start");
};

const helper1 = (caveGraph, curNode) => {
  if (curNode === "end") {
    return 1;
  }

  if (curNode === curNode.toLowerCase()) {
    if (caveGraph[curNode].visited) {
      return 0;
    }

    caveGraph[curNode].visited = true;
  }

  let numPaths = 0;
  for (const node of caveGraph[curNode].adjacent) {
    numPaths += helper1(caveGraph, node);
  }
  caveGraph[curNode].visited = false;
  return numPaths;
};

/**
 * Main function for the challenge
 */
const part2 = (input) => {
  const edges = input.split(/\r?\n/);
  const caveGraph = {};

  // Parse input
  for (let edge of edges) {
    edge = edge.split("-");
    const start = edge[0];
    const end = edge[1];

    if (!caveGraph[start]) {
      caveGraph[start] = { numVisits: 0, adjacent: [] };
    }

    if (!caveGraph[end]) {
      caveGraph[end] = { numVisits: 0, adjacent: [] };
    }

    caveGraph[start].adjacent.push(end);
    caveGraph[end].adjacent.push(start);
  }

  return helper2(caveGraph, "start", false);
};

const helper2 = (caveGraph, curNode, visitedSmallTwice) => {
  if (curNode === "end") {
    return 1;
  }

  if (curNode === "start" && caveGraph[curNode].numVisits > 0) {
    return 0;
  }

  if (curNode === curNode.toLowerCase()) {
    if (caveGraph[curNode].numVisits > 1) {
      return 0;
    }

    if (caveGraph[curNode].numVisits === 1 && !visitedSmallTwice) {
      visitedSmallTwice = true;
    } else if (caveGraph[curNode].numVisits === 1 && visitedSmallTwice) {
      return 0;
    }
  }

  caveGraph[curNode].numVisits++;
  let numPaths = 0;
  for (const node of caveGraph[curNode].adjacent) {
    numPaths += helper2(caveGraph, node, visitedSmallTwice);
  }
  caveGraph[curNode].numVisits--;
  return numPaths;
};
