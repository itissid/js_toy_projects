function generateEmptyBoard() {
  var board = [];
  for(var i=0; i<10; i++) {
    board.push([]);
    for(var j=0; j<10; j++) {
      board[i].push('E');
    }
  }
  return board;
}

function boardAsString(board) {
  /*
  board is an array of arrays, where each cell contains a string:
  *: Ship
  E: Empty Cell with no ships or enemy shells
  X: If a shell has landed on that position but there were no ships there.
  !: If a shell has landed on that position but there was a ship there
  Examples of such boards follow:

      1   2     3    4    5
  A[['E', 'E', 'E', 'E', 'E'],
  B ['E', '*', 'X', 'E', 'E'],
  C ['E', '*', 'E', 'X', 'E'],
  D ['E', '*', 'E', '!', 'E'],
  E ['E', 'E', 'E', '*', 'E']]

  We can see an unharmed Cruiser at position B2 and a partially bombed Destroyer in position D4.

  Your task is to return a string such that when its printed it displays a board
  on a string.

  The string returned by the board in the first example should be
  such that when you run the script you see the following:

    E E E E E
    E * X E E
    E * E X E
    E * E ! E
    E E E * E
  */
  var numberOfRows = board.length
  var numberOfCols = board[0].length
  var boardStr = ""
  for(var row = 0; row < numberOfRows; row++) {
    for(var col = 0; col < numberOfCols; col++) {
      boardStr += board[row][col] +" "
    }
    boardStr = boardStr.trim() +"\n"
  }
  return boardStr
}

/*------------ DO NOT CHANGE THE CODE BELOW -------------------*/
function testPrintBoard() {
  // A smaller board that the 10*10 battleship game, just to prove that the
  // boardAsString function works.
  var board = [
    ['E', 'E', 'E', 'E', 'E'],
    ['E', '*', 'X', 'E', 'E'],
    ['E', '*', 'E', 'X', 'E'],
    ['E', '*', 'E', '!', 'E'],
    ['E', 'E', 'E', '*', 'E']]
  var boardString = "E E E E E\n"+
    "E * X E E\n" + 
    "E * E X E\n" +
    "E * E ! E\n" +
    "E E E E E\n";
  assertEquals(boardAsString(board), boardString);
}

function testGenerateEmptyBoard() {
    var emptyBoard = generateEmptyBoard();
    if(emptyBoard.length != 10 && emptyBoard[0].length != 10) {
      throw Error("The empty board is not properly generated")
    }
    var board = [
        ['E', 'E', 'E', 'E', 'E'],
        ['E', 'E', 'E', 'E', 'E'],
        ['E', 'E', 'E', 'E', 'E'],
        ['E', 'E', 'E', 'E', 'E'],
        ['E', 'E', 'E', 'E', 'E']]
    assertBoardEquals(board, emptyBoard);
}

testPrintBoard()
testGenerateEmptyBoard()

function assertEquals(x, y) {
    if(x!==y) {
        throw Error("x!=y; \nx=\n"+x+"\ny=\n"+y)
    }
}

function assertNotEquals(x1, x2) {
    if(x1 === x2) {
        throw Error("x===y; \nx=\n"+x+"\ny=\n"+y)
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
