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
  const commands = input.split(/\r?\n/);
  let horizontalPosition = 0;
  let depth = 0;

  for (let command of commands) {
    command = command.split(" ");
    const direction = command[0];
    const distance = parseInt(command[1]);

    switch (direction) {
      case "forward":
        horizontalPosition += distance;
        break;
      case "down":
        depth += distance;
        break;
      case "up":
        depth -= distance;
        break;
    }
  }

  return horizontalPosition * depth;
};

/**
 * Main function for the challenge
 */
const part2 = (input) => {
  const commands = input.split(/\r?\n/);
  let horizontalPosition = 0;
  let depth = 0;
  let aim = 0;

  for (let command of commands) {
    command = command.split(" ");
    const direction = command[0];
    const distance = parseInt(command[1]);

    switch (direction) {
      case "forward":
        horizontalPosition += distance;
        depth += aim * distance;
        break;
      case "down":
        aim += distance;
        break;
      case "up":
        aim -= distance;
        break;
    }
  }

  return horizontalPosition * depth;
};
