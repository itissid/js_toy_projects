
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

/********************************************************************
TEST FUNCTION
*********************************************************************/

function test_draw_hangman_picture_map() {
  for(var k in hangman_map) {
    console.log(hangman_map[k]);
    console.log("***")
  }
}

test_draw_hangman_picture_map();
