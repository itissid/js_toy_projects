## Setup
This repo contains a game called [minesweeper](http://minesweeperonline.com/) with some partially completed code and this README. The main purpose of this repo is to be used by an instructor to teach students some of the basics of programming by getting them to complete important bits of the code for the game. The instructor needs an environment where students can run and debug javascript code. DO NOT DISTRIBUTE THIS README TO STUDENTS AS IT CONTAINS SPOILERS. For this task you will need to focus on the file `minesweeper.js` in the `minesweeper/` directory in the root of this repo. This README is a guide on how to use this task to help students get familiar with some code in javascript. Note that one can easily copy paste the code in `minesweeper.js` into a code.org workspace and just run it. All printed statements show out put in code.org's debug console:

![alt text](assets/codedotorg_workspace_console.png "Note the debugging console printing things")

## Task 1
Learning to apply indexing of Arrays, String concatenation and Looping in javascript.

### Prerequisites
#### Get familiar with the game
- First get the students familiar with mine sweeper. The game can be played [here](http://minesweeperonline.com/). Make sure the students understand important things in the game:
  - What are the rules of the game?
  - What different outcomes can happen when they open on a cell in the minefield? Especially when a box is opened that has no surrounding mine.
  - How to place flags on the field.
- The students should understand what is the initial state of the mine field and how it changes. Drawing a `4*4` board with different states drawn on the white/black board can help the student understand, especially when they open a box that has no surrounding mine.
- Next, the most important question that should get the creative juices of the students to flow: How one can represent a board in computer memory? Its an array of arrays or a matrix (if the students are familiar with those from math) What will the array contain initially? What will the array contain when we make a move? This is the easiest to use structure.

#### What coding skills are needed for this task
- What is for loop: Initial condition, step and stopping criteria?
  - Why are loops useful? Because we often need to take steps of from number X to Y which is useful for indexing. Because we often want to do somethings repeatedly like search for mines.
	- How to use a variable in a loop to iterate through an array?
	- What is a loop body?
- What does + mean for 2 string variables?
  - When printing a string there are some special chars like '\n' that
  help print a new line. It is instructive to give toy examples in code.org to show what these special characters are like the tab char '\t'.
  Example what should `console.log("1\t2\t3\n4\t5\t6")` print?
- A bit of knowledge of function return values is useful, although not required. The assignment does not require students to write any functions, only complete some missing code inside it in `minesweeper.js`.


### The task
The student's task is to figure out how to complete a function, `boardAsString` that returns a string representing the board. This string is then automatically printed on the console. Here is how to go about it:
- Make sure the students understand the board representation mentioned in the [prerequisite](#Get-familiar-with-the-game) section.
- Start by giving them an example of how a printed board should look like and how this task is set up. This is explained in the `boardAsString` as well.
- Next ask them to complete the function `boardAsString` in `minesweeper.js` and returning a string from the function given the board. The `boardAsString` function contains all the documentation needed to understand how the string will look given an board matrix. Again the student does not need to worry/concern oneself about console logging and functions, just the string representation of the board.
- A bit of knowledge of function return values is useful to understand the program but not necessary for this task's objectives.

### Outcomes:
  - Problem Solving: The Student can think about how the the mine field can be represented by an array or arrays. This is a useful skill in problem solving in CS: being able to convert objects in the real world to objects in computer memory.

  - Thinking iteratively: As the user moves how does the state of the board evolve in the memory of the program? The students should get into the habit of drawing pictures to understand the state of a program.

  - Debugging: Now one may ask why is this task interesting? After all shouldn't we be doing the meat of the problem first? When we actually code up the game we want to know if we did the right thing. Printing things is the only way to know if things are working. This is often done in programming to measure progress and squash bugs.

#### Coding skills attained(hopefully):
  - The student learn how to index an array of arrays.
  - They learn about string concatenation.
  - Optional: They also learn about how arrays are laid out in memory.

## Task 2
Creating a board with some mines in it.

#### What coding skills are needed for this task
To implement this you need to understand
- Basics of javascript like variables, expressions, types and arrays.
- for loops
- Basic understanding of conditional logic. This task is going to test this part specifically.

### The task
In this task students need to code up conditional logic that can generate a board. Again you will be working with `minesweeper.js` and  completing code for the function `generateRandomBoard`.
Once completed there is a test function that prints this board that the student/instructor can run. This string is then automatically printed on the console to make sure you got it right.
- Task 1 is not a prerequisite for this task but understanding the board representation using the array of array data structures is.
- Students/Instructors can test their function by executing the `generateRandomBoardTest` in the script. Make sure you test with different board sizes to ensure the code is working.

### Outcomes:
  - Problem Solving: The Student can think about how mines can be laid out in the field and how to encode conditional statements based on the value of a variable. in everyday coding, being able to code complex conditional logic is very useful. Another interesting aspect is thinking about the starting condition of a program. Typically any algorithm has a starting condition, a loop and a terminating condition.

  - Debugging: Now one may ask why is this task interesting? After all shouldn't we be doing the meat of the problem first? When we actually code up the game we want to know if we did the right thing. Printing things is the only way to know if things are working. This is often done in programming to measure progress and squash bugs.

