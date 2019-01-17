
/***
 _  _   __   __ _   ___  _  _   __   __ _
/ )( \ / _\ (  ( \ / __)( \/ ) / _\ (  ( \
) __ (/    \/    /( (_ \/ \/ \/    \/    /
\_)(_/\_/\_/\_)__) \___/\_)(_/\_/\_/\_)__)

 *          -------------------
 *          |                 |
 *          |                 |
 *          |                 O
 *          |                 |
 *          |                /|\
 *          |                 |
 *          |                /|\
 *          |
 *          |
 *          |
 *          |
 */

/***************************************************************
CODE FOR ANIMATION OF HANGMAN. DO NOT CHANGE THIS.
/**************************************************************/
var LOGO = "\n  _  _   __   __ _   ___  _  _   __   __ _\n \
/ )( \\ / _\\ (  ( \\ / __)( \\/ ) / _\\ (  ( \\\n \
) __ (/    \\/    /( (_ \\/ \\/ \\/    \\/    /\n \
\\_)(_/\\_/\\_/\\_)__) \\___/\\_)(_/\\_/\\_/\\_)__)";

var parts = [
      ["----------------------------------"],
      ["||", "||","||","||","||","||","||","||","||"],
       "|\t\t\t\t |",
       "|\t\t\t\t O",
       "|\t\t\t\t/|",
       "|\t\t\t\t/|\\",
     ]
function append_part_2(times) {
   var s = "";
   for(var i=0; i <times; i++) {
      s += "\n\t" + parts[2]
   }
   return s
}
// TODO: Instructional point. We could have used an array, but then we would
// need to have the bad_guesses be offset by one and that would make the code
// more complex than it needs to be.
var hangman_map = {
    1: "\n\t"+parts[1].join("\n\t"),
    2: "\t"+parts[0].join("")+"\n\t" +parts[1].join("\n\t"),
    3: "\t"+parts[0].join("") + append_part_2(2) + "\n\t" + parts[1].join("\n\t"),
    4: "\t"+parts[0].join("") + append_part_2(2) + "\n\t" + parts[3]+"\n\t" + parts[1].join("\n\t"),
    5: "\t"+parts[0].join("") + append_part_2(2) + "\n\t" + parts[3]+ append_part_2(4) + "\n\t" + parts[1].join("\n\t"),
    6: "\t"+parts[0].join("") + append_part_2(2) + "\n\t" + parts[3]+ append_part_2(1) + "\n\t" + parts[4] + append_part_2(2) + "\n\t" + parts[1].join("\n\t"),
    7: "\t"+parts[0].join("") + append_part_2(2) + "\n\t" + parts[3]+ append_part_2(1) +  "\n\t" + parts[5] + append_part_2(2) + "\n\t" + parts[1].join("\n\t"),
    8: "\t"+parts[0].join("") + append_part_2(2) + "\n\t" + parts[3]+ append_part_2(1) +  "\n\t" + parts[5] + append_part_2(1) + "\n\t" + parts[4] + "\n\t"+ parts[1].join("\n\t"),
    9: "\t"+parts[0].join("") + append_part_2(2) + "\n\t" + parts[3]+ append_part_2(1) +  "\n\t" + parts[5] + append_part_2(1) + "\n\t" + parts[5] + "\n\t"+ parts[1].join("\n\t"),
}


var HANGMAN_INSTANCE = null; // The global object holding the hangman's state initialized in start_hangman()
function build_new_hangman(word) {
    // internal helper to create a new hangman from the word
    // TODO: MAKE A CALL WEATHER WE SHOULD ADD THIS TO TASK.
    function build_hangman_word_map(word) {
            var map = {};
            for(var v = 0; v < word.length; v++) {
                if(!(word[v] in map)) {
                   map[word[v]] = []
                }
                map[word[v]].push(v)
            }
            return(map);
    }
    return({
        "word": word,
        "word_lookup": build_hangman_word_map(word),
        "guessed_word": new Array(word.length), 
        "bad_guesses": 0,
        "is_hangman_word_guessed": function() {
            for(var i = 0; i < HANGMAN_INSTANCE.guessed_word.length; i++) {
              if(HANGMAN_INSTANCE.guessed_word[i] !== HANGMAN_INSTANCE.word[i]) {
                  return false
              }
            }
            return true;
        },
        "is_hangman_hung": function () {
            return this.bad_guesses === 9;
        },
        "is_game_complete": function () {
            return (this.is_hangman_hung() || this.is_hangman_word_guessed());
        },

        "update_hangman": function(letter) {
            // Once you have guessed a letter you should call this function. It will update the hangman game.
            if(this.is_game_complete()) {
                  console.log("Game is completed. Start a new one by calling start_hangman(...)")
                  return;
            }
            var idxs = this.word_lookup[letter] ;
            // Logic for processing a bad guess.
            if(idxs === undefined) {
              this.bad_guesses += 1;
              this.draw_hangman();
              return;
            }
            // Logic for processing a good guess.
            // COMPLETE ME: Update the appropriate variable that accounts for bad guesses. Don't forget to call the draw_hangman() function at the end.
            for(var i = 0; i < idxs.length; i++) {
               this.guessed_word[idxs[i]] = letter;
            }
            this.draw_hangman()
        },

        "draw_hangman": function() {
            // draw the hangman on the console. Use the closure context to
            // update the hangman.
            // Use special cases for game end(reset the hangman and set the state as completed)
            console.log(LOGO);
            console.log(this._hangman_str())
            if(this.is_hangman_hung() === true) {
                console.log("Game Over! You lost!")
            } else if(this.is_hangman_word_guessed() === true) {
                console.log("Game Over! You guessed the word!")
            }
        },
        "_hangman_str": function () {
          var s = "";
          if(this.bad_guesses > 0)
            s += hangman_map[this.bad_guesses] + "\n\n";

          for(var i = 0; i < this.guessed_word.length; i++){
            if(this.guessed_word[i] === undefined) {
              s += " _"
            } else {
              s += " "+this.guessed_word[i]
            }
          }
          return(s)
        }
    })
}


/***************************************************************/
// Public API to play the hangman game. DO NOT EDIT THIS CODE, unless you know what you are doing.
/**************************************************************/

function start_hangman(word) {
    //create a new hangman if one is not in progress
    if(word === null || word === "" || word === undefined) {
      console.log("Word cannot be empty/null");
      return;
    }
    if(HANGMAN_INSTANCE !== null && HANGMAN_INSTANCE.is_game_complete() === false) {
        console.log("** ERROR: Cannot start a new game while one is already started. Use reset_hangman to reset the game forcefully.");
        return;
    }
    console.log(LOGO);
    HANGMAN_INSTANCE = build_new_hangman(word)
}

function guess(letter) {
  // update the hangman.
    if(HANGMAN_INSTANCE === null) {
        console.log("Game not started. Call start_hangman() first")
        return;
    }
    HANGMAN_INSTANCE.update_hangman(letter);
}

function restart_hangman(word) {
    if(word === null || word === "" || word === undefined) {
        console.log("** ERROR: Word cannot be empty/null");
        return;
    }
    HANGMAN_INSTANCE = build_new_hangman(word);
}

function reset_hangman() {
    HANGMAN_INSTANCE = null;
}

/********************************************************************
TEST FUNCTIONS
/**************************************************************/

function test_draw_hangman_picture_map() {
    // We "mock" the variables necessary to draw the hangman correctly
    console.log("*** testing drawing of the hangman on the console. Verify me visually")
    start_hangman("foobar");
    HANGMAN_INSTANCE.guessed_word = new Array("foobar".length) // Simulate no correct guesses
    for(var k in hangman_map) {
        HANGMAN_INSTANCE.bad_guesses = k; // Simulate bad guesses.
        HANGMAN_INSTANCE.draw_hangman();
    }
}


function test_hangman_start() {
    var test_word = "foobar";
    start_hangman(test_word);
    assertNeq(HANGMAN_INSTANCE, undefined);
    assertEq(HANGMAN_INSTANCE.word, test_word);
    var lookup = HANGMAN_INSTANCE.word_lookup;
    console.log(lookup);
    assertArrEq(lookup["f"], [0]);
    assertArrEq(lookup["o"], [1, 2]);
    assertArrEq(lookup["b"], [3]);
    reset_hangman() // reset before the next test. This is hackish. Ideally we want a finalizer to run independent tests
}

function test_hangman_is_saved() {
  console.log("** Test test_hangman_is_saved")
  var word = "foobar";
  start_hangman(word);
  guess("o");
  assertEq(HANGMAN_INSTANCE.bad_guesses, 0);
  assertEq(HANGMAN_INSTANCE.guessed_word[1], "o")
  assertEq(HANGMAN_INSTANCE.guessed_word[2] , "o")
  assertEq(all(HANGMAN_INSTANCE.guessed_word.slice(0,1), undefined), true);
  assertEq(all(HANGMAN_INSTANCE.guessed_word.slice(3), undefined), true);
  guess("i");
  assertEq(HANGMAN_INSTANCE.bad_guesses, 1);
  assertEq(HANGMAN_INSTANCE.guessed_word[1],  "o")
  assertEq(HANGMAN_INSTANCE.guessed_word[2],  "o")
  assertEq(all(HANGMAN_INSTANCE.guessed_word.slice(0,1), undefined), true);
  assertEq(all(HANGMAN_INSTANCE.guessed_word.slice(3), undefined), true);
  guess("f");
  guess("b");
  guess("a");
  guess("r");
  assertEq(HANGMAN_INSTANCE.bad_guesses, 1);
  assertEq(HANGMAN_INSTANCE.guessed_word.join(""), word);
  assertEq(HANGMAN_INSTANCE.is_game_complete(), true);
  reset_hangman() // reset before the next test. This is hackish. Ideally we want a finalizer to run independent tests
}

function test_hangman_is_hung() {
  console.log("** Test test_hangman_is_hung")
  var word = "foobar";
  start_hangman(word);
  guess("j");
  assertEq(HANGMAN_INSTANCE.bad_guesses, 1);
  assertEq(all(HANGMAN_INSTANCE.guessed_word, undefined), true)
  for(var i = 0; i < 8; i++){
    guess("j");
  }
  assertEq(HANGMAN_INSTANCE.bad_guesses, 9);
  assertEq(all(HANGMAN_INSTANCE.guessed_word, undefined), true)
  assertEq(HANGMAN_INSTANCE.is_game_complete(), true);
  reset_hangman() // reset before the next test. This is hackish. Ideally we want a finalizer to run independent tests
}

test_draw_hangman_picture_map()
test_hangman_start()
test_hangman_is_saved()
test_hangman_is_hung()

/************************************************************************
TEST UTILITY FUNCTIONS(Do not touch these unless you know what you are doing)
*************************************************************************/

function all(arr, val) {
    for(var i = 0; i< arr.length; i++){
      if(arr[i] !== val) {
        return false
      }
    }
    return true;
}

function assertEq(a, b) {
    if(a !== b) {
        throw Error(a+"!="+b)
    }
}

function assertNeq(a, b) {
    if(a === b) {
        throw Error(a+"==="+b)
    }
}

function assertArrEq(a,b) {
    if(a === undefined || a === null || b===undefined || b === null){
      throw Error(a+" != "+b)
    }
    if(a.length !== b.length) {
        throw Error(a+" != "+b)
    }
    for(var i = 0; i < a.length; i++) {
        if(a[i] != b[i]) {
            throw Error(a+" != "+b)
        }
    }
}
