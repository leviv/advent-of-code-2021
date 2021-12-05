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
  const vertices = {};

  for (const line of lines) {
    const points = line.replace("->", "").split(/[ ]+/);
    const start = points[0].split(",").map(Number);
    const end = points[1].split(",").map(Number);

    if (start[0] == end[0]) {
      for (
        let c = Math.min(start[1], end[1]);
        c <= Math.max(start[1], end[1]);
        c++
      ) {
        const point = [start[0], c];
        if (!vertices[point]) {
          vertices[point] = 0;
        }
        vertices[point]++;
      }
    } else if (start[1] == end[1]) {
      for (
        let r = Math.min(start[0], end[0]);
        r <= Math.max(start[0], end[0]);
        r++
      ) {
        const point = [r, start[1]];
        if (!vertices[point]) {
          vertices[point] = 0;
        }
        vertices[point]++;
      }
    }
  }

  let numOverlap = 0;
  for (const point in vertices) {
    if (vertices[point] >= 2) {
      numOverlap++;
    }
  }

  return numOverlap;
};

/**
 * Main function for the challenge
 */
const part2 = (input) => {
  const lines = input.split(/\r?\n/);
  const vertices = {};

  for (const line of lines) {
    const points = line.replace("->", "").split(/[ ]+/);
    const start = points[0].split(",").map(Number);
    const end = points[1].split(",").map(Number);

    if (start[0] == end[0]) {
      // Vertical line
      for (
        let c = Math.min(start[1], end[1]);
        c <= Math.max(start[1], end[1]);
        c++
      ) {
        const point = [start[0], c];
        if (!vertices[point]) {
          vertices[point] = 0;
        }
        vertices[point]++;
      }
    } else if (start[1] == end[1]) {
      // Horizontal lione
      for (
        let r = Math.min(start[0], end[0]);
        r <= Math.max(start[0], end[0]);
        r++
      ) {
        const point = [r, start[1]];
        if (!vertices[point]) {
          vertices[point] = 0;
        }
        vertices[point]++;
      }
    } else {
      // Diagonal line - I used x and y because visualizing
      // row and col became way too confusing for me
      const topPoint = start[1] > end[1] ? start : end;
      const bottomPoint = start[1] > end[1] ? end : start;
      let x = bottomPoint[0];
      let xDelta = 0;

      if (topPoint[0] < bottomPoint[0]) {
        // top is to the left of bottom
        xDelta = -1;
      } else {
        // top is to the right of bottom
        xDelta = 1;
      }

      for (let y = bottomPoint[1]; y <= topPoint[1]; y++) {
        const point = [x, y];
        if (!vertices[point]) {
          vertices[point] = 0;
        }
        vertices[point]++;
        x += xDelta;
      }
    }
  }

  let numOverlap = 0;
  for (const point in vertices) {
    if (vertices[point] >= 2) {
      console.log(point);
      numOverlap++;
    }
  }

  return numOverlap;
};
