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
      boardStr += board[row][col]+" ";
    }
    boardStr = boardStr.trim()+ "\n";
  }
  return boardStr;
}

function shipMarker() {
  return "*";
}

function placeAllShips(board, fleet) {
    /**
     * Arguments: The 10*10 board and the array fleet contining the ship locations
     * This code will call placeShip iteratively for each ship in the `fleet`, given the board and fleet arguments
    */
    // Student code begin here task 2
    // Student code end here task 2
}

function placeShip(board, start, end) {
    /*
     Given a board and the start and end position of a ship place it on the board.

     The function changes the board and does not return anything.
     Example with an empty board and start = B2 and end = F2 the board would like:

         1 2 3 4 5 6 7 8 9 10
        ---------------------
      A| E E E E E E E E E E
      B| E * E E E E E E E E
      C| E * E E E E E E E E
      D| E * E E E E E E E E
      E| E * E E E E E E E E
      F| E * E E E E E E E E
      G| E E E E E E E E E E
      H| E E E E E E E E E E
      I| E E E E E E E E E E
      J| E E E E E E E E E E
    */
    var startCoords = battlegridCoordinatesToXY(start[0], start[1]);
    var startX = startCoords[0];
    var startY = startCoords[1];
    var endCoords = battlegridCoordinatesToXY(end[0], end[1]);
    var endX = endCoords[0];
    var endY = endCoords[1];
    // Mark the ships position.
    placeMarkerHelper(board, startX, endX, startY, endY, shipMarker());
}

function placeMarkerHelper(board, startX, endX, startY, endY, marker) {
    /**
    * Given the board matrix and the start and end coordinates(startX, endX and startY, endY) of a ship, place the `marker` on the board. So calling placeMakerHelper(board, 1, 1, 6, 1, '*') on a 10*10 board
    changes the board to:

         1 2 3 4 5 6 7 8 9 10
        ---------------------
      A| E E E E E E E E E E
      B| E * E E E E E E E E
      C| E * E E E E E E E E
      D| E * E E E E E E E E
      E| E * E E E E E E E E
      F| E * E E E E E E E E
      G| E E E E E E E E E E
      H| E E E E E E E E E E
      I| E E E E E E E E E E
      J| E E E E E E E E E E
    * */
    // Student code begin here task 2
    // Student code end here task 2
}

/***************************************************************/
/************ Helper functions do not change these**************/
/***************************************************************/
function battlegridCoordinatesToXY(row, col) {
  // Given something like C, 10 this function returns
  var battleGridColumnLookup = {'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'J': 9};
  if(battleGridColumnLookup[row] === undefined || col > 10 || col < 1) {
    throw Error("Battle grid coordinate "+ row+ ":"+col+" is invalid");
  }
  return [battleGridColumnLookup[row], col -1];
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
    "E E E * E\n";
  assertEquals(boardAsString(board), boardString);
}

function testGenerateEmptyBoard() {
    var emptyBoard = generateEmptyBoard();
    if(emptyBoard.length != 10 && emptyBoard[0].length != 10) {
      throw Error("The empty board is not properly generated")
    }
    var board = [
        ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
        ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
        ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
        ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
        ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
        ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
        ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
        ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
        ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
        ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E']]
    assertBoardEquals(board, emptyBoard);
}

testPrintBoard()
testGenerateEmptyBoard()

/* Place ship test functions */
function testPlaceBattleshipRow() {
  // Given a board place a battleship on it
  var board = generateEmptyBoard();
  var expectedBoard = generateEmptyBoard();
  for(var i = 2; i <= 5; i ++) {
    expectedBoard[1][i] = shipMarker()
  }
  placeShip(board, 'B3', 'B6');
  assertBoardEquals(board, expectedBoard);
  console.log(".")

  //console.log(boardAsString(expectedBoard));
  //console.log(boardAsString(board));
}

function testPlaceCarrierCol() {
  // Given a board place a Carrier and verify the board state.
  var board = generateEmptyBoard();
  var expectedBoard = generateEmptyBoard();
  for(var i = 2; i <= 6; i ++) {
    expectedBoard[i][1] = shipMarker()
  }
  placeShip(board, 'C2', 'G2');
  assertBoardEquals(board, expectedBoard);
  console.log("..")

  //console.log(boardAsString(expectedBoard));
  //console.log(boardAsString(board));
}


function testPlaceDestroyerEdge() {
  // Place a destroyer at the top edge A3:A4
  var board = generateEmptyBoard();
  var expectedBoard = generateEmptyBoard();
  for(var i = 2; i <= 3; i ++) {
    expectedBoard[0][i] = shipMarker();
  }
  placeShip(board, 'A3', 'A4');
  assertBoardEquals(board, expectedBoard);
  console.log("...")
}

function testPlaceSubmarineEdge() {
  // place a submarine in on the left edge C1:E1
  var board = generateEmptyBoard();
  var expectedBoard = generateEmptyBoard();
  for(var i = 2; i <= 4; i ++) {
    expectedBoard[i][0] = shipMarker();
  }
  placeShip(board, 'C1','E1');
  assertBoardEquals(board, expectedBoard);
  console.log("....")
}

testPlaceBattleshipRow()
testPlaceCarrierCol()
testPlaceDestroyerEdge()
testPlaceSubmarineEdge()

function testPlaceAllShips() {
  /*
       1 2 3 4 5 6 7 8 9 10
      ---------------------
    A| E E E E E E E E E E
    B| E * E E E E * * * E
    C| E * E E E E E E E E
    D| E * E E E E * E E E
    E| E * E E E E * E E E
    F| E * E E * E E E E E
    G| E E E E * E E E E E
    H| E E E E * E E * E E
    I| E E E E * E E * E E
    J| E E E E E E E * E E
    ```
    Carrier: B2:F2
    Battleship: F5:I5
    Cruiser: H8:J8
    Submarine: B7:B9
    Destroyer: D7:E7
  */
  var board = generateEmptyBoard();
  var expectedBoard =[
     //1    2    3    4    5    6    7    8   9     10
     ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'], //A
     ['E', '*', 'E', 'E', 'E', 'E', '*', '*', '*', 'E'], //B
     ['E', '*', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'], //C
     ['E', '*', 'E', 'E', 'E', 'E', '*', 'E', 'E', 'E'], //D
     ['E', '*', 'E', 'E', 'E', 'E', '*', 'E', 'E', 'E'], //E
     ['E', '*', 'E', 'E', '*', 'E', 'E', 'E', 'E', 'E'], //F
     ['E', 'E', 'E', 'E', '*', 'E', 'E', 'E', 'E', 'E'], //G
     ['E', 'E', 'E', 'E', '*', 'E', 'E', '*', 'E', 'E'], //H
     ['E', 'E', 'E', 'E', '*', 'E', 'E', '*', 'E', 'E'], //I
     ['E', 'E', 'E', 'E', 'E', 'E', 'E', '*', 'E', 'E']] //J

  var fleet = [
    ['B2', 'F2'], // Carrier
    ['F5', 'I5'], // Battleship
    ['H8', 'J8'], // Cruiser
    ['B7', 'B9'], // Submarine
    ['D7', 'E7'] // Destroyer
  ]
  placeAllShips(board, fleet);
  assertBoardEquals(board, expectedBoard);
  console.log(".....")
}

testPlaceAllShips()

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
        throw Error("Boards are not the same:\n"+ b1Str+"\n"+b2Str)
      }
    }
  }
}
