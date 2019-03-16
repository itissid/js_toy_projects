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
    boardStr = boardStr.trim() + '\n';
  }
  return boardStr
}

/*------------ DO NOT CHANGE THE CODE BELOW -------------------*/
function testBoardToString() {
    var board1 = [
        ['M', 'M', 'E', 'E', 'E'],
        ['M', 'E', 'M', 'E', 'E'],
        ['E', 'E', 'M', 'E', 'E'],
        ['M', 'M', 'E', 'E', 'M'],
        ['M', 'E', 'E', 'E', 'M']]
    console.log(boardAsString(board1));
    assertEquals(boardAsString(board1), "M M E E E\nM E M E E\nE E M E E\nM M E E M\nM E E E M\n");
}

function assertEquals(x, y) {
    if(x!==y) {
        throw Error("x!=y; \nx=\n"+x+"\ny=\n"+y)
    }
}
testBoardToString()
console.log("All tests run successfully");
