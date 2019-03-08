var GAME_BOARD = null;
var MINE_BLOWN = false;
var UI_INITIALIZED = false;
var FLAGGED_BOARD = null;
var MINE_CONCENTRATION_PCT = 10;
var NROW = 20; // The number of rows of the mines of the board
var NCOL = 20; // The columns

function boardAsString(board) {//{{{
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
}//}}}
// TODO: For Task 2 part 2, create a function that can print the board hiding the mines so that
// we can print the board when the game is being played.
/*--------------------------------------------------------------*/
function generateFlagBoard(rows, columns) {
    var board = generateEmptyBoard(rows, columns);
    for(var row = 0; row < rows; row++) {//{{{
        for(var col = 0; col < columns; col++) {
            board[row][col] = '';
        }
    }
    return board;
}

function generateRandomBoard(rows, columns, mineConcentration) {//{{{
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
  for(var row = 0; row < rows; row++) {//{{{
    for(var col = 0; col < columns; col++) {
        var shouldPlaceMine = placeMine(mineConcentration)
        if(shouldPlaceMine == true) {
            board[row][col] = 'M';
        } else {
            board[row][col] = 'E';
        }
    }
  }//}}}
  return board;
}//}}}

function move(board, row, column) {//{{{
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
    if(UI_INITIALIZED === false) {
        throw Error("Start the game first using startNewGame()");
    }

    if(board[row][column] === 'E') {
       openSquare(board, row, column);
    } else if (board[row][column] == 'M') {
        blowMine(board, row, column);
        MINE_BLOWN = true;
        console.log("GAME OVER!");
        // TODO: Display on the UI also.
    }
    // TODO: This is a debugging statement. Might want to lower it.
    console.log(boardAsString(board))
}//}}}

function initializeBoard() {
    if(UI_INITIALIZED === true) {
        throw Error("Cannot Reinitialized board. Press Redraw Minefield to force redraw");
    }
    UI_INITIALIZED = true;
    GAME_BOARD = generateRandomBoard(NROW, NCOL, MINE_CONCENTRATION_PCT);
    FLAGGED_BOARD = generateFlagBoard(NROW, NCOL);
    MINE_BLOWN = false;
    initUIWidgets();
    initUIState();
}

function forceRedraw() {
    // TODO: Place a restart button in the game.
    // Kill the game in the middle.
    UI_INITIALIZED = true;
    MINE_BLOWN = false;
    GAME_BOARD = generateRandomBoard(NROW, NCOL, MINE_CONCENTRATION_PCT);
    FLAGGED_BOARD = generateFlagBoard(NROW, NCOL);
    // initUI(); No need to reinitialize the static UI only its non static part like the mines, flags etc.
    initUIState(); // Only the stateful elements of it...
}

function initUIState() {
    setFillColor("gray")
    for(var i = 0; i < NROW; i++) {
      for( var j = 0; j< NCOL; j++){
        // 2,2,8,8;  8,2,14,8;  14,2,20,8
        // 2,8,8,14; 8,8,14,14; 14,8,20,14
        // 2,2,8,8;  9,2,14,8;  15,2,20,8
        // 2,8,8,14; 8,8,14,14; 14,8,20,14
        var x1 = OFFSET+(OFFSET+S)*j;
        var y1 = OFFSET+(OFFSET+S)*i;
        //var x2 = (offset+s)+(offset+s)*j;
        //var y2 = (offset+s)+(offset+s)*i;
        //console.log((x1+2)+","+y1+","+x2+","+y2);
        rect(x1,y1, S, S);
      }
    }
}

function initUIWidgets() {
    /**
    * This function is specific to code.org's API. It initializes the UI and
    * the event handlers that eventually
    **/
    // TODO: Get students to complete most of this.

    button("redraw_canvas", "Redraw Minefield");
    setProperty("redraw_canvas", "text-align", "center");
    setPosition("redraw_canvas",40 ,390, 100, 38);
    onEvent("redraw_canvas","click", function(event) {
        forceRedraw();
    });

    createCanvas("canvasMain", 320, 450);
    onEvent("canvasMain", "click", function(event) {
        var eventRowCol = eventCoordinatesToRowCol(event.x, event.y);
        if (eventRowCol === null) { // User clicked outside the board area, do nothing
            return;
        }
        var row = eventRowCol[0];
        var col = eventRowCol[1];
        if(event.shiftKey === true) {
            // The user wants to open the cell,
            if(!canOpenCell(row, col)) {
                //but he may have clicked somewhere else or in the wrong place like where its already opened or is a number
                console.log("Disallowed");
                return;
            }
            // Open the square
            move(GAME_BOARD, row, col); // Update the state of the board matrix.
            if(MINE_BLOWN === true) {
                // A mine was blown, reveal all the mines and stop the game.
                drawAllMines();
                return;
            }
            // We update each cell. We might be more efficient if we only maintained a list of
            // cells that were opened or numbered in `openSquareHelper` function instead of the entire board.
            repaintEntireCanvas();
            // No mine was blown, just draw the flags, the open
        } else {
            updateFlag(row, col);
        }
    });
}

// TODO: The following helper functions can be completed by students in a task.
function canOpenCell(row, col) {
    if(FLAGGED_BOARD[row][col] === 'F') {
        return false; // If there is a flag in the cell don't do anything; the user needs to remove the flag first to open it.
    }
    if(GAME_BOARD[row][col] !== 'E' && GAME_BOARD[row][col] !== 'M') {
      return false;
    }
    return true;
}

function canFlagBePlaced(row, col) {
    return GAME_BOARD[row][col] === 'E' || GAME_BOARD[row][col] === 'M';
}

function toggleMine(row, col) {
    // Returns true if a mine is removed and false if it was added
    if (FLAGGED_BOARD[row][col] === 'F') {
        FLAGGED_BOARD[row][col] = ''
        return true;
    } else {
        FLAGGED_BOARD[row][col] = 'F'
        return false;
    }
}

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
    /**
      Blow up all the mines ending the game and revealing all the mine positions.
      Here is the state of a board before and after a mine is blown at position (0, 1)
      board = [
        ['M', 'M', 'E', 'E', 'E'],
        ['M', 'E', 'M', 'E', 'E'],
        ['E', 'E', 'M', 'E', 'E'],
        ['M', 'M', 'E', 'E', 'M'],
        ['M', 'E', 'E', 'E', 'M']]

      board = [
        ['X', 'X', 'E', 'E', 'E'],
        ['X', 'E', 'X', 'E', 'E'],
        ['E', 'E', 'X', 'E', 'E'],
        ['X', 'X', 'E', 'E', 'X'],
        ['X', 'E', 'E', 'E', 'X']]
    */
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
   * This function is actually a fun way to teach recursion(It is actually a
   * simple case of depth first search).  The best way of teaching it is to
   * walk the kids through a game. The instruction should go something like
   * this.
   * 1. Open the graphical minesweeper game
   *    1.1. Open a square.
   * 2. Now walk the students write a pseudocode/algorithm on how those squares are opened:
   *    If neighboring squares don't have mines
   *     - Open the square in question.
   *     - Add all the neighboring squares to a list of neighbors to be recursed on.
   *    If any neighboring square has a mine then mark the square in question
   *    with a number and do not recurse on the neighbour.
   * 3. To avoid repeated visitation of squares we keep a `visited` set.
   * When exploring the neighbors of a specific square we never add squares to
   * the list that are visited.
   */
    //console.log("Exploring row, col: "+ row+", "+column);
    var neighbourOffsets = [[0, -1], [0, 1], [1, 0], [-1, 0], [1, 1], [-1, -1], [-1, 1], [1, -1]]; // These are used as offsets to subtract from row, column to generate the set of neighbors.
    var neighbors = [];
    visited[[row, column]] = true; // This is how you will use the visited set
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
	      if(!isNumber(board[x][y]) && board[x][y] !== 'O') // Only consider cells that are not numbers and not open already
		neighbors.push([x, y]);
	    }
	}

    });

    if(numMines > 0) {
        // If we find any mines around the location, then we only place a number in the location
        if(FLAGGED_BOARD === null || FLAGGED_BOARD[row][column] !== 'F') {// Corner case: if a user places flag in a square where it should not be then the square is left as is.
            board[row][column] = numMines;
        } 
    } else {
        // If we don't find any mine around this location, then we open this square and each of their neighbors recursively.
        if(FLAGGED_BOARD === null || FLAGGED_BOARD[row][column] !== 'F') {// Corner case: if a user places flag in a square where it should not be then the square is left as is.
          board[row][column] = 'O' // Declare the square open
        } 
        for(var i = 0; i < neighbors.length; i++) {
              openSquareHelper(board, neighbors[i][0], neighbors[i][1], visited);
        }
    }

}

/****************************************************************************/
/************** UI FUNCTIONS(The following functions are not important for
doing the task 1, 2 or 3, so only change them if you know what you are doing)
***********************/
/****************************************************************************/

var S = 12; // The side of the square.
var OFFSET = 0;

function drawNumber(row, col, number) {
    /**

        -----       0
        |   |       1, 2
        -----       4
        |   |       4, 5
         ___        6
     */
    if(isNaN(parseInt(number))) {
        throw Error("Not a number: "+number);
    }
    var cellCoords = rowColToCanvasCoordinates(row, col);
    var x1 = cellCoords[0];
    var y1 = cellCoords[1];
    var x2 = cellCoords[2];
    var y2 = cellCoords[3];
    setStrokeWidth(0.25*S);
    setFillColor("lightgrey")
    paintOver(row, col, "lightgrey", "black"); // Numbers are drawn on a light gray back ground with black being the boundary of the cell.
    if(number === 1) {
        setStrokeColor("blue")
        setStrokeWidth(0.10*S);
        var x_center = (x1+x2)/2;
        var y_center = (y1+y2)/2;
        var vert_line_len = 0.30*S;
        var hor_line_len = 0.30*S;
        line(x_center, y_center, x_center, y_center+vert_line_len);
        line(x_center, y_center, x_center, y_center-vert_line_len);
        line(x_center, y_center+vert_line_len, x_center-hor_line_len, y_center+vert_line_len);
        line(x_center, y_center+vert_line_len, x_center+hor_line_len, y_center+vert_line_len);
        line(x_center, y_center-vert_line_len, x_center-hor_line_len, y_center-vert_line_len);
        //_drawNumberDigital(x1, y1, [0, 0, 1, 0, 0, 1, 0]); Special case 1 is not very visible on the board with my digital scheme, so manually drawing it
        // So we draw manually to make it easier.
    }
    if(number === 2) {
        setStrokeColor("green")
        _drawNumberDigital(x1, y1, [1, 0, 1, 1, 1, 0, 1]);
    }
    if(number === 3) {
        setStrokeColor("red")
        _drawNumberDigital(x1, y1, [1, 0, 1, 1, 0, 1, 1]);
    }
    if(number === 4) {
        setStrokeColor("darkblue")
        _drawNumberDigital(x1, y1, [0, 0, 1, 0, 0, 1, 0]);
        _drawNumberDigital(x1, y1, [0, 1, 1, 1, 0, 1, 0]);
    }
    if(number === 5) {
        setStrokeColor("orange")
        _drawNumberDigital(x1, y1, [1, 1, 0, 1, 0, 1, 1]);
    }
    if(number === 6) {
        setStrokeColor("yellow")
        _drawNumberDigital(x1, y1, [1, 1, 0, 1, 1, 1, 1]);
    }
    if(number === 7) {
        setStrokeColor("black")
        _drawNumberDigital(x1, y1, [1, 0, 1, 0, 0, 1, 0]);
    }
    if(number === 8) {
        setStrokeColor("purple")
        _drawNumberDigital(x1, y1, [1, 1, 1, 1, 1, 1, 1]);
    }
}

function _drawNumberDigital(x,y, bitmap) {
    /**
        -----       0
        |   |       1, 2
        -----       3
        |   |       4, 5
         ___        6
        7 segments to be drawn in the square depending on the bitmap array of length 7.
     */
    var i = 0;
    var o = 0.25*S;
    var hor_line_len = 0.60*S;
    var vert_line_len = 0.30*S;
    setStrokeWidth(0.10*S);
    for(var i = 0; i < bitmap.length; i++) {
        if(bitmap[i] === 1) {

            if(i == 0) {
               line(x+o, y+o, x+o+hor_line_len, y+o);
            }
            if(i == 1) {
               line(x+o, y+o, x+o, y+o+vert_line_len);
            }
            if(i == 2) {
               line(x+o+hor_line_len, y+o, x+o+hor_line_len, y+o+vert_line_len);
            }
            if(i == 3) {
               line(x+o, y+o+vert_line_len, x+o+hor_line_len, y+o+vert_line_len);
            }
            if(i == 4) {
               line(x+o, y+o+vert_line_len, x+o, y+o+2*vert_line_len);
            }
            if(i == 5) {
               line(x+o+hor_line_len, y+o+vert_line_len, x+o+hor_line_len, y+o+2*vert_line_len);
            }
            if(i == 6) {
               line(x+o, y+o+2*vert_line_len, x+o+hor_line_len, y+o+2*vert_line_len);
            }
        }
    }

}

function isNumber(x) {
    return !isNaN(parseInt(x));
}
function removeFlag(row, col) {
    paintOver(row, col, "gray", "black")
}

function paintOver(row, col, fillColor, strokeColor) {
    var cellCoords = rowColToCanvasCoordinates(row, col);
    var x1 = cellCoords[0];
    var y1 = cellCoords[1];
    setFillColor(fillColor);
    setStrokeWidth(1);
    setStrokeColor(strokeColor);
    rect(x1,y1, S, S);
}

function drawFlag(row, col) {
    var cellCoords = rowColToCanvasCoordinates(row, col);
    var x1 = cellCoords[0];
    var y1 = cellCoords[1];
    var x2 = cellCoords[2];
    var y2 = cellCoords[3];
    var x_center = (x1 + x2)/2;
    var y_center = (y1 + y2)/2;
    var off_x_center = (x_center +x1)/2;
    var off_y_center = y_center - y_center/2
    setStrokeColor("black");
    setStrokeWidth(0.1*S);
    // Poles
    line(off_x_center, y_center, off_x_center, y_center+S/3);
    line(off_x_center, y_center, off_x_center, y_center-S/3);
    line(off_x_center, y_center+S/3, off_x_center-S/5, y_center+S/3);
    line(off_x_center, y_center+S/3, off_x_center+S/5, y_center+S/3);
    // Mast
    setFillColor("yellow");
    rect(off_x_center, y_center-S/3, S/2, S/3);

}

function drawMine(row, col, should_blow) {
    // Used for drawing mne on the board.
    var cellCoords = rowColToCanvasCoordinates(row, col);
    if(cellCoords === null) {
        throw Error("row, col: "+row+", "+ col+" are outside bounds"+NROW+", "+NCOL+". Cannot draw a flag.");
    }
    var x1 = cellCoords[0];
    var y1 = cellCoords[1];
    var x2 = cellCoords[2];
    var y2 = cellCoords[3];
    // Draw a black circle with 4 dots and
    if(should_blow === true) {
        setFillColor("red");
        rect(x1,y1, S, S);
    }
    var x_center = (x1 + x2)/2;
    var y_center = (y1 + y2)/2;
    var rad = S/4
    setFillColor("black");
    setStrokeColor("black");
    // Some custom code to draw a mine like picture.
    circle(x_center, y_center, rad);
    // Mine's edges@ 0, 90', 180', 270' positions
    var o = 0.1875*S;
    line(x_center, y_center, x_center+rad+o, y_center);
    line(x_center, y_center, x_center, y_center+rad+o);
    line(x_center, y_center, x_center-rad-o, y_center);
    line(x_center, y_center, x_center, y_center-rad-o);
    // Dots at the 45, 135, 225, 315' positions
    rect((2*x_center + rad + 1)/2, (2*y_center+ rad+1)/2, 0.1, 0.1);
    rect((2*x_center + rad + 1)/2, (2*y_center- rad-1)/2, 0.1, 0.1);
    rect((2*x_center - rad - 1)/2, (2*y_center+ rad+1)/2, 0.1, 0.1);
    rect((2*x_center - rad - 1)/2, (2*y_center- rad-1)/2, 0.1, 0.1);
}

function drawAllMines() {
    // Draw all the mines on the canvas using the drawMine() function.
    for(var i = 0; i < GAME_BOARD.length; i++) {
        for(var j = 0; j < GAME_BOARD[i].length; j++) {
            if(GAME_BOARD[i][j] === 'X') {
                drawMine(i, j, true);
            } else if(GAME_BOARD[i][j] === 'M') {
                drawMine(i, j, false);
            }
        }
    }
}

function repaintEntireCanvas() {
    for(var i = 0; i < GAME_BOARD.length; i++) {
        for(var j = 0; j < GAME_BOARD[i].length; j++) {
            if(FLAGGED_BOARD[i][j] === 'F') {
                assertSomeEqual(GAME_BOARD[i][j], ['E', 'M']); // Sanity check make sure the code is not doing something odd.
                drawFlag(i, j);
                continue; // Painted flags take priority, even if that square does not have a mine, a flag put by the user is never overwritten
            }
            if(GAME_BOARD[i][j] === 'O') {
                // paint all open cells with preset colors
                paintOver(i, j, "lightgrey", "black");
            } else if(isNumber(GAME_BOARD[i][j])) {
                // If cell has a number (its not empty(E),not a mine(M) and not open(O)) draw it on the canvas.
                drawNumber(i, j, parseInt(GAME_BOARD[i][j]));
            } else { // This is a sanity to ensure the board is not corrupted somehow.
                try {
                    assertSomeEqual(GAME_BOARD[i][j], ['E', 'M']); // Sanity check make sure the code is not doing something odd.
                } catch(error) {
                    throw Error("Encountered illegal board state @i,j= "+ i+","+j +"\n"+boardAsString(GAME_BOARD));
                }
            }
        }
    }
}

function updateFlag(row, col) {
    if(!canFlagBePlaced(row, col)) {
      //  Not allowed to place a flag in an already opened square or a number
      console.log("Disallowed");
      return;
    }

    if(toggleMine(row, col)) {
        removeFlag(row, col);
    } else {
        drawFlag(row, col);
    }

}

function rowColToCanvasCoordinates(row, col) {
    // Used for updating the canvas from the board matrix
    return [
    // TODO: This could be something the students could complete.
    OFFSET+(OFFSET+S)*col,
    OFFSET+(OFFSET+S)*row,
    (OFFSET+S)+(OFFSET+S)*col,
    (OFFSET+S)+(OFFSET+S)*row
    ];
}

function eventCoordinatesToRowCol(x, y) {
    // Used to update the board based on the click.
    // Returns null if the click is outside the board,
    // returns a size 2 array with the row and column
    var row = parseInt(y/12);
    var col = parseInt(x/12);
    // TODO: Get students to write this check so that
    // we can do proper error checking.
    if(row >= NROW || col >= NCOL) {
        return null
    }
    return [row, col];
}

/****************************************************************************************/
/******** DO NOT CHANGE THE CODE BELOW IT IS ONLY FOR TESTING The CODE TASKS ABOVE ******/
/****************************************************************************************/

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
    var board = generateRandomBoard(rows, cols, 40)
    console.log(boardAsString(board))
}

generateRandomBoardTest()

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
    ['M', 'M',  2,  1, 'O'],
    ['M', 'E', 'M', 2, 'O'],
    ['E', 'E', 'M', 3,  1],
    ['M', 'M', 'E', 'E', 'M'],
    ['M', 'E', 'E', 'E', 'M']];
  openSquare(board, 0, 4);
  assertBoardEquals(board, expectedBoard);
  console.log(".")
}

testOpen();

function testBlowMine() {
    var board = [
        ['M', 'M', 'E', 'E', 'E'],
        ['M', 'E', 'M', 'E', 'E'],
        ['E', 'E', 'M', 'E', 'E'],
        ['M', 'M', 'E', 'E', 'M'],
        ['M', 'E', 'E', 'E', 'M']]
    var expectedBoard = [
        ['X', 'X', 'E', 'E', 'E'],
        ['X', 'E', 'X', 'E', 'E'],
        ['E', 'E', 'X', 'E', 'E'],
        ['X', 'X', 'E', 'E', 'X'],
        ['X', 'E', 'E', 'E', 'X']]
    blowMine(board, 0, 1);
    assertBoardEquals(board, expectedBoard);
}
testBlowMine()
function assertSomeEqual(x, y) {
    for(var i = 0; i < y.length; i++) {
        if(y[i] === x)
            return
    }
    throw Error("none of x matched y, x="+x+";y="+y);
}

function assertEquals(x1, x2) {
    if(x1 !== x2) {
        throw Error("Assert x1===x2, but "+x1+"!=="+x2);
    }
}
function assertNotEquals(x1, x2) {
    if(x1 === x2) {
        throw Error("Assert x1!=x2, but "+x1+"==="+x2);
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

function testMoveOnUI() {
    // Display the canvas on the UI. Let the user click and open the square. Remove all logic for game completion.
    // Just place a button to redo the canvas so the kids can click and see the canvas unfold as they click. A bit of validation logic and a chunk of UI logic would go away.
    // I can tell kids to use click or a shift-click to make a move and/or place a mine and once they complete the functions in task 3 they can just use these.
    initializeBoard();

}
testMoveOnUI();
