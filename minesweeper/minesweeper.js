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
function generateRandomBoard(rows, columns, mineConcentration=40) {
  /*
  This function returns a board given its size. Note that the board will
  contain only Mines or Empty squares using a mine_concentration of 40% by default.

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
        /*Complete the conditional logic here to place a mine on the board*/
    }
  }
  return board;
}

/****************************************************************************************/
/******** DO NOT CHANGE THE CODE BELOW IT IS ONLY FOR TESTING YOUR CODE ABOVE ***********/
/****************************************************************************************/

/**********Helper functions*************/
function placeMine(mineConcentration) {
  if(typeof(mineConcentration) !== "number" ) {
    throw Error("Mine concentration can only be a number, but was type "+typeof(mineConcentration))
  }
  if(mineConcentration < 1 || mineConcentration >= 100) {
    throw Error("Mine concentration only between 1 and 100% but was "+mineConcentration);
  }
  return Math.random()<(mineConcentration/100);
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

printBoardTest()

function generateRandomBoardTest() {
    var rows = 10
    var cols = 10
    var board = generateRandomBoard(rows, cols)
    console.log(boardAsString(board))
}

generateRandomBoardTest()
