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

  numberOfRows = board.length
  numberOfCols = board[0].length
  boardStr = ""
  for(row = 0; row < /*What goes here*/; row++) {
    for(col = 0; col < /*What goes here?*/; col++) {
      // Complete some code here to add to the string boardStr
    }
    // What would you do to the boardStr here?
  }
  // Just return a board string
  return boardStr
}

/*------------ DO NOT CHANGE THE CODE BELOW -------------------*/
function printBoard() {
  board1 = [
    ['M', 'M', 'E', 'E', 'E'],
    ['M', 'E', 'M', 'E', 'E'],
    ['E', 'E', 'M', 'E', 'E'],
    ['M', 'M', 'E', 'E', 'M'],
    ['M', 'E', 'E', 'E', 'M']]
  board2 = [
      ['M', 'M', '2', '1', 'B'],
      ['M', '5', 'M', '2', 'B'],
      ['E', 'E', 'M', '3', '1'],
      ['M', 'M', '2', '3', 'M'],
      ['M', '3', '1', '2', 'M']]
  console.log(boardAsString(board1));
  console.log(boardAsString(board2));
}
printBoard()
