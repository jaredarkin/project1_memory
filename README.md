# Memory Game

# User Stories
## As a user, I want to...
- select from different deck designs.
- select the number of cards.
- have the second card chosen visible long enough to memorize it.
- enter my name.
- select whether game is timed or not.
- know how many guesses I've made.
- see how long it is taking me to finish the game.

## As a user I don't want to...
- have to select the same options each game.
- accidentally change the options during the game.

## Potential additions:
- choose difficulty - either harder patterns to memorize or decreasing the time the second card is visible.
- two player mode - play against each other, most matches wins.

# Approach
## Sketched out basic layout
- used containers with borders to see how things fit together
- hard coded into html a 4x4 table so I could start working on js

## Basic game table functionality
- on click, background image disappears and color is shown
- added css class "flipped" which had background image display = none; placed at bottom of css page because of cascading
- chose to match colors so I wouldn't have to switch the card images back and forth
- hard coded text into each <td> element to test compare function
- used a click counter to run compare function after two cards were flipped
- set an interval before cards are flipped back if not a match
- non matches remove class "flipped" and background image is displayed

## More game table functionality
- built an card index array that would assign a value to each <td> element (removed hard coded text)
- added shuffle function (found online) to randomize card index array
- built a color library - each color assigned a value

## New Game Button
- build card index based on board size chosen
- assign values from card index to each td
- add click event listeners to each td (this prevents the board from being clicked before a game is started)
- disable option buttons so they can't be changed during the game
- start timer
- new game button is disabled until board size is chosen
- hide new game message in header

## Scoreboard Area
- Name input provided but is not necessary to play the game
- Name input box disappears (display: none) on enter keypress and is replaced by name submitted
- Guesses counter added
- Timer includes minutes and seconds - used slice to add a leading zero to 0-9; used modulus to calculate time shown

## Options
- Added radio buttons for options so only one can be chosen
- Deck design option changes the class of each <td> element to the corresponding image class
- Board size option empties table element then appends <tr> and <td> elements based on size chosen
- Empty is necessary to prevent a new table from being appended to an old table when the options are selected
- Empty deletes event listeners from table when it's created, so event listeners added when new game is clicked
- Initially only provided square sizes (one variable needed for rows/columns) but added a second columns variable to allow for more options

## Reset Game function
- Allows player to restart game on button click or when prompted that game is over
- Reset game should enable options and new game button, empty card index, restart timer
- Reset variable for matches and text and variable for guesses
- Show new game message in header

# Major Problems Solved
- Prevent clicks to board before values are assigned: don't assign event listeners until new game has started
- What if user doesn't select a board size: check for value of number of rows (which is assigned when a board size is clicked) before running new game functions
- Prevent multiple clicks during interval when cards are flipped and compared: when second card is flipped, remove event listeners from <td> elements. add listeners back after interval is over.
- Primary font did not show up on another computer: added two back up font-families
- One of the images did not fit correctly into the <td> elements: used background-position element to show it correctly

# Additional Opportunities and Functionality
- Add scoring based on guesses made and time taken
- End of game prompt can display player name and score
- Log previous scores and display list of top scores after each game
- Add deck image library to script and call background image from there instead of using css classes - this would be more consistent with the size library
- Rename colors to hexadecimal form to avoid problems if a browser does not recognize color name
- Match images instead of colors
- Allow user to choose the size of the board by using sliders instead of radio buttons
