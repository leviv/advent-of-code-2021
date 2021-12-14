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
  const pointsInput = input.split(/\r?\n/);
  let points = [];
  const folds = [];

  for (let pointInput of pointsInput) {
    if (pointInput.substring(0, 4) === "fold") {
      const foldInput = pointInput.split("=");
      const foldAxis = foldInput[0].substring(foldInput[0].length - 1);
      const foldValue = parseInt(foldInput[1]);

      folds.push({ axis: foldAxis, value: foldValue });
    } else if (pointInput.length > 0) {
      pointInput = pointInput.split(",");
      const x = parseInt(pointInput[0]);
      const y = parseInt(pointInput[1]);

      points.push({ x, y });
    }
  }

  for (const fold of folds) {
    const tempPoints = [];
    const curAxis = fold.axis;
    const otherAxis = curAxis === "x" ? "y" : "x";

    for (const point of points) {
      const numToCompare = fold.axis === "x" ? point.x : point.y;
      const otherNum = fold.axis === "x" ? point.y : point.x;

      if (numToCompare > fold.value) {
        const newPoint = {
          [curAxis]: numToCompare - (numToCompare - fold.value) * 2,
          [otherAxis]: otherNum,
        };
        tempPoints.push(newPoint);
      } else {
        tempPoints.push(point);
      }
    }

    // Remove duplicates
    points = [
      ...new Map(
        tempPoints.map((v) => [JSON.stringify([v.x, v.y]), v])
      ).values(),
    ];

    return points.length;
  }

  return points.length;
};

/**
 * Main function for the challenge
 */
const part2 = (input) => {
  const pointsInput = input.split(/\r?\n/);
  let points = [];
  const folds = [];

  for (let pointInput of pointsInput) {
    if (pointInput.substring(0, 4) === "fold") {
      const foldInput = pointInput.split("=");
      const foldAxis = foldInput[0].substring(foldInput[0].length - 1);
      const foldValue = parseInt(foldInput[1]);

      folds.push({ axis: foldAxis, value: foldValue });
    } else if (pointInput.length > 0) {
      pointInput = pointInput.split(",");
      const x = parseInt(pointInput[0]);
      const y = parseInt(pointInput[1]);

      points.push({ x, y });
    }
  }

  for (const fold of folds) {
    const tempPoints = [];
    const curAxis = fold.axis;
    const otherAxis = curAxis === "x" ? "y" : "x";

    for (const point of points) {
      const numToCompare = fold.axis === "x" ? point.x : point.y;
      const otherNum = fold.axis === "x" ? point.y : point.x;

      if (numToCompare > fold.value) {
        const newPoint = {
          [curAxis]: numToCompare - (numToCompare - fold.value) * 2,
          [otherAxis]: otherNum,
        };
        tempPoints.push(newPoint);
      } else {
        tempPoints.push(point);
      }
    }

    // Remove duplicates
    points = [
      ...new Map(
        tempPoints.map((v) => [JSON.stringify([v.x, v.y]), v])
      ).values(),
    ];
  }

  let maxX = 0;
  let maxY = 0;

  for (const point of points) {
    maxX = Math.max(maxX, point.x);
    maxY = Math.max(maxY, point.y);
  }

  let finalStr = [];

  for (let i = 0; i <= maxX; i++) {
    let rowStr = "";
    for (let j = 0; j <= maxY; j++) {
      if (points.filter((e) => e.x === i && e.y === j).length > 0) {
        rowStr += "\u2588";
      } else {
        rowStr += " ";
      }
    }
    finalStr.push(rowStr);
  }

  return finalStr.reverse().join("\n");
};
