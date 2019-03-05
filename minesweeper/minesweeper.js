function boardAsString(board) {
  /*
  board is an array of arrays, where each cell contains a string:
  M: mine
  E: Empty
  1-9: How many mines next to a square
  B: No mines in the surrounding boxes.
  Examples of such boards follow:

  board = [
    ['M', 'M', 'E', 'E', 'E'],
    ['M', 'E', 'M', 'E', 'E'],
    ['E', 'E', 'M', 'E', 'E'],
    ['M', 'M', 'E', 'E', 'M'],
    ['M', 'E', 'E', 'E', 'M']]
  Where M represents the mine, E represent Empty.

  The following board is taken when the player has made some moves:
  board = [
    ['M', 'M', '2', '1', 'B'],
    ['M', '5', 'M', '2', 'B'],
    ['E', 'E', 'M', '3', '1'],
    ['M', 'M', '2', '3', 'M'],
    ['M', '3', '1', '2', 'M']]

  Your task is to return a string such that when its printed it displays a board
  on a string.

  The string returned by the board in the first example should be
  such that when you run the script you see the following:

    M M E E E
    M E M E E
    E E M E E
    M M E E M
    M E E E M

  In the second board case the string looks like:

  M M 2 1 B
  M 5 M 2 B
  E E M 3 1
  M M 2 3 M
  M 3 1 2 M
  */

  var numberOfRows = board.length
  var numberOfCols = board[0].length
  var boardStr = ""
  for(var row = 0; row < numberOfRows; row++) {
    for(var col = 0; col < numberOfCols; col++) {
      boardStr += board[row][col]+" ";
    }
    boardStr = boardStr.trim()+ "\n";
  }
  // Just return a board string
  return boardStr;
}
/*--------------------------------------------------------------*/
function generateRandomBoard(rows, columns, mineConcentration) {
  /*
  rows: How many rows do you want in the board
  columns: How many columns you want in the board
  mineConcentration: what % of mines do you want in the board(between 1-100)?. Default=40%

  This function returns a board given its size rows*columns. Note that the board can
  contain only Mines or Empty squares and a mineConcentration of 40% by default.

  This function uses a function called named `placeMine` which returns True of False
  based on a "random number generator". What this means is if  mine_concentration is 40
  then out of 100 cells in a grid approx 40 can be mines.
  You can just treat the `placeMine` function like a black box that returns True if the program
  should place a mine. All you have to do is complete the conditional statements.
  */
  var board = generateEmptyBoard(rows, columns);
  for(var row = 0; row < rows; row++) {
    for(var col = 0; col < columns; col++) {
        var shouldPlaceMine = placeMine(mineConcentration)
        if(shouldPlaceMine == true) {
            board[row][col] = 'M';
        } else {
            board[row][col] = 'E';
        }
    }
  }
  return board;
}

function move(board, row, column) {
  /*
   * This is the main function that should be called to play the game
  * board: This is the mine sweeper board at any stage of the game, it may have open or closed squares.
  * row: the row number where the user clicked on the board.
  * column: the column number where the user clicked on the board.
  * Use the function `openSquare` and `blowMine` depending on what the player selected.
  * The complete signature of the functions is: `openSquare(board, row, column)` and `blowMine(board, row, column)`
  * You will have to write the conditional statements and place those two statements at the appropriate location.
  *
  */
    if(board[row][column] === 'E') {
       openSquare(board, row, column)
    } else if (board[row][column] ==E 'M') {
        board[row][column] = 'X'
    }
    console.log(boardAsString(board))
}

/****************************************************************************************/
/******** DO NOT CHANGE THE CODE BELOW IT IS ONLY FOR TESTING The CODE TASKS ABOVE ******/
/****************************************************************************************/

/**********Helper functions*************/
function placeMine(mineConcentration) {
  if(typeof(mineConcentration) !== "number" ) {
    throw Error("Mine concentration can only be a number, but was type "+typeof(mineConcentration))
  }
  if(mineConcentration < 1 || mineConcentration >= 100) {
    throw Error("Mine concentration only between 1 and 100% but was "+mineConcentration);
  }
  return Math.random() < (mineConcentration/100);
}

function blowMine(board, row, column) {
    // Blow up all the mines ending the game and revealing all the mine positions.
    if(board[row][column] != 'M') {
        throw Error("Bad call to blow mine at location (" + row + ", "+ column + ") where no mine was present");
    }
    board[row][column] = 'X'
    for(var i = 0; i < board.length; i++) {
        for(var j = 0; j < board[i].length; j++) {
            if(board[i][j] === 'M') {
                board[i][j] = 'X'
            }
        }
    }
}

function openSquare(board, row, column) {
    openSquareHelper(board, row, column, {})
}

function openSquareHelper(board, row, column, visited) {
  /**
   * This function is actually a fun way to teach recursion(It is actually a case of depth first search). The best way of teaching it is to
   * walk the kids through a game. The instruction should go something like this.
   * 1. Open the graphical minesweeper game
   *    1.1. Open a square.
   * 2. Now walk the students write a pseudocode/algorithm on how those squares are opened:
   *    If neighboring squares don't have mines
   *     - Open the square in question.
   *     - Add all the neighboring squares to a list of neighbors to be recursed on.
   *    If any neighboring square has a mine then mark the square in question with a number and do not recurse on the neighbour.
   * 3. To avoid repeated visitation of squares we keep a `visited` dictionary. When exploring the neighbors of a specific square we never add squares to the list that are visited.
   */
  var neighbourOffsets = [[0, -1], [0, 1], [1, 0], [-1, 0], [1, 1], [-1, -1], [-1, 1], [1, -1]];
  var neighbors = [];
  visited[[row, column]] = true;
  var numMines = 0;
  neighbourOffsets.forEach(function(offset) {
    var x = row + offset[0];
    var y = column + offset[1];
    if(visited[[x, y]] === undefined) {
        if(x >=0 && x < board.length && y >= 0 && y < board[row].length) {

          if(board[x][y] === 'M') {
            numMines += 1;
          }
          //console.log(x, y, board[row][column]);
          neighbors.push([x, y]);
        }
    }
  });
  console.log(row+" "+column+" "+numMines + "| "+neighbors);
  if(numMines > 0) {
      board[row][column] = numMines;
  } else {
    board[row][column] = 'O' // Declare the square open
    for(var i = 0; i < neighbors.length; i++) {
        openSquareHelper(board, neighbors[i][0], neighbors[i][1], visited);
    }
  }
}

/*************************************/

function printBoardTest() {
  var board1 = [
    ['M', 'M', 'E', 'E', 'E'],
    ['M', 'E', 'M', 'E', 'E'],
    ['E', 'E', 'M', 'E', 'E'],
    ['M', 'M', 'E', 'E', 'M'],
    ['M', 'E', 'E', 'E', 'M']]
  var board2 = [
      ['M', 'M', '2', '1', 'B'],
      ['M', '5', 'M', '2', 'B'],
      ['E', 'E', 'M', '3', '1'],
      ['M', 'M', '2', '3', 'M'],
      ['M', '3', '1', '2', 'M']]
  console.log(boardAsString(board1));
  console.log(boardAsString(board2));
}

function generateEmptyBoard(rows, cols) {
  if(rows <= 0) {
    throw Error("Number of rows cannot be less than 0");
  }
  if(cols <= 0) {
    throw Error("Number of cols cannot be less than 0");
  }
  var board = [];
  for(var row = 0; row < rows; row++) {
    board.push([])
    for(var col = 0; col < cols; col++) {
        board[row].push("")
    }
  }
  return board;
}

//printBoardTest()

function generateRandomBoardTest() {
    var rows = 10
    var cols = 10
    var board = generateRandomBoard(rows, cols, 40)
    console.log(boardAsString(board))
}

//generateRandomBoardTest()


function testOpen() {
  var board = [
    ['M', 'M', 'E', 'E', 'E'],
    ['M', 'E', 'M', 'E', 'E'],
    ['E', 'E', 'M', 'E', 'E'],
    ['M', 'M', 'E', 'E', 'M'],
    ['M', 'E', 'E', 'E', 'M']]
  openSquare(board, 0, 2);
  var expectedBoard = [
    ['M', 'M',  2, 'E', 'E'],
    ['M', 'E', 'M', 'E', 'E'],
    ['E', 'E', 'M', 'E', 'E'],
    ['M', 'M', 'E', 'E', 'M'],
    ['M', 'E', 'E', 'E', 'M']];
  console.log(board);
  assertBoardEquals(board, expectedBoard);
  // Next move
  var expectedBoard = [
    ['M', 'M',  2,  1, 'E'],
    ['M', 'E', 'M', 2, 'E'],
    ['E', 'E', 'M', 3,  1],
    ['M', 'M', 'E', 'E', 'M'],
    ['M', 'E', 'E', 'E', 'M']];
  openSquare(board, 0, 4);
  assertBoardEquals(board, expectedBoard);
  console.log(".")
}

testOpen();

function assertBoardEquals(b1, b2) {
  var b1Str = boardAsString(b1);
  var b2Str = boardAsString(b2);
  if(b1.length !== b2.length || b1[0].length !== b2[0].length) {
    throw Error("Boards are not equal length.\n"+ b1Str+"\n"+b2Str)
  }
  for(var i = 0; i < b1.length; i++) {
    for(var j = 0; j< b1[i].length; j++) {
      if (b1[i][j] !== b2[i][j]) {
        throw Error("Boards are not equal length.\n"+ b1Str+"\n"+b2Str)
      }
    }
  }
}

