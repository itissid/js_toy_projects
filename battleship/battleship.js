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
  console.log(boardAsString(board));
}

function testGenerateEmptyBoard() {
    var emptyBoard = generateEmptyBoard();
    if(emptyBoard.length != 10 && emptyBoard[0].length != 10) {
      throw Error("The empty board is not properly generated")
    }
    console.log(boardAsString(emptyBoard))
}
testPrintBoard()
testGenerateEmptyBoard()
