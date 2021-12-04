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


const BOARD_SIZE = 5;
// Used to mark called numbers on boards
const MAGIC_NUM = 10_000;

/**
 * Main function for the challenge
 */
 const part1 = (input) => {
    const inputSplit = input.split(/\r?\n/);
    const moves = inputSplit[0].split(",").map(Number);
    const boards = getBoards(inputSplit);

    for (const move of moves) {
        for (let board of boards) {
            const win = markAndCheck(move, board);

            if (win !== undefined) {
                return calcWin(move, win);
            }
        }
    }

    return -1;
 };

/**
 * Main function for the challenge
 */
 const part2 = (input) => {
    const inputSplit = input.split(/\r?\n/);
    const moves = inputSplit[0].split(",").map(Number);
    const boards = getBoards(inputSplit);

    for (const move of moves) {
        for (let i = boards.length - 1; i >= 0; i--) {
            const board = boards[i];
            const win = markAndCheck(move, board);

            if (win !== undefined){
                boards.splice(i, 1);
                
                if (boards.length === 0) {
                    return calcWin(move, win);
                }
            }
        }
    }

    return -1;
 };

 
 const calcWin = (move, board) => {
    let sum = 0;
    for (row of board) {
        for (element of row) {
            if (element < MAGIC_NUM) {
                sum += element;
            }
        }
    }

    return sum * move;
 }

 const markAndCheck = (num, board) => {
    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[r].length; c++) {
            if (board[r][c] === num) {
                board[r][c] += MAGIC_NUM;
                if (checkBoard(r, c, board)) {
                    return board;
                }
            }
        }
    }

    return undefined;
 }

 const checkBoard = (row, col, board) => {
     let winVert = true;
     for (let r = 0; r < board.length; r++) {
        if (board[r][col] < MAGIC_NUM) {
            winVert = false;
        }
     }

     let winHor = true;
     for (let c = 0; c < board[row].length; c++) {
        if (board[row][c] < MAGIC_NUM) {
            winHor = false;
        }
     }

     return winVert || winHor;
 }

 const getBoards = (inputSplit) => {
    const boards = [];

    let curBoard = []
    for (let i = 1; i < inputSplit.length; i++) {
        const row = inputSplit[i].trim().split(/[ ]+/).map(Number);

        // Handle empty line
        if (row.length === BOARD_SIZE) {
            if (curBoard.length === BOARD_SIZE) {
                boards.push(curBoard);
                curBoard = [];
            }
            curBoard.push(row);
        }
    }

    // Push final board
    boards.push(curBoard);
    return boards;
 }