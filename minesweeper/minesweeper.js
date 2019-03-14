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
  return boardStr;
}
/*--------------------------------------------------------------*/
function generateRandomBoard(rows, columns, mineConcentration) {
  /*
  rows: How many rows do you want in the board
  columns: How many columns you want in the board
  mineConcentration: what % of mines do you want in the board(between 1-100)?. Default=40%

  This function returns a board given its size rows*columns. Note that the board can
  contain only Mines(M) or Empty(E) squares and a mineConcentration.

  This function uses a function called named `placeMine` which returns True of False
  with probability mineConcentration/100. What this means is if mine_concentration is 40
  then it will return true approximately 40 out of 100 times.
  You can just treat the `placeMine` function like a black box to place a mine.
  */
  var board = generateEmptyBoard(rows, columns);
  // Student code begins here for task 2
  // Student code ends here for task 2
  return board;
}


/**********Helper functions*************/
function placeMine(mineConcentration) {
  if(typeof(mineConcentration) !== "number" ) {
    throw Error("Mine concentration can only be a number, but was type "+typeof(mineConcentration))
  }
  if(mineConcentration < 1 || mineConcentration >= 100) {
    throw Error("Mine concentration only between 1 and 100% but was "+mineConcentration);
  }
    return generateMine(mineConcentration/100);
}

function generateMine(probability) {
    // Why is it useful to have this function separately that just put the one line into placeMine?
    // The answer is testability. We replace this function with a dummy one to test generateRandomBoard.
    // Without replacing this it would be impossible to test generateRandomBoard.
    return Math.random() < probability;
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


/****************************************************************************************/
/******** DO NOT CHANGE THE CODE BELOW IT IS ONLY FOR TESTING The CODE TASKS ABOVE ******/
/****************************************************************************************/
function testBoardToString() {
    var board1 = [
        ['M', 'M', 'E', 'E', 'E'],
        ['M', 'E', 'M', 'E', 'E'],
        ['E', 'E', 'M', 'E', 'E'],
        ['M', 'M', 'E', 'E', 'M'],
        ['M', 'E', 'E', 'E', 'M']]
    console.log(boardAsString(board1));
    assertEquals(boardAsString(board1), "M M E E E\nM E M E E\nE E M E E\nM M E E M\nM E E E M\n");
    console.log(".");
}
testBoardToString()

function testGenerateRandomBoard() {
    var rows = 5
    var cols = 5
    var expectedBoard = [['M', 'E', 'E', 'E', 'E'],
       ['M', 'E', 'E', 'E', 'E'],
       ['M', 'E', 'E', 'E', 'E'],
       ['M', 'E', 'E', 'E', 'E'],
       ['M', 'E', 'E', 'E', 'E']];
    try {
      // We replace the generateMine function with a dummy one to test our logic
      var realMineGenFn = generateMine;
      var i = 0;
      generateMine = function(probability) {
          if(i%5 == 0) {
              i++;
              return true;
          }
          i++;
          return false;
      }
      var board = generateRandomBoard(rows, cols, 40)
      assertBoardEquals(board, expectedBoard);
      console.log("..");
    } catch(e) {
      generateMine = realMineGenFn;
      throw(e);
    }
}

testGenerateRandomBoard()

function assertEquals(x, y) {
    if(x!==y) {
        throw Error("x!=y; \nx=\n"+x+"\ny=\n"+y)
    }
}

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

console.log("All tests run successfully");
