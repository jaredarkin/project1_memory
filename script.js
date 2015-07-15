var numberOfRows;
var numberOfColumns;
var sizeChecked;
var chosenDeck;
$(".option_forms input").on("click", function(){
  chosenDeck = $("input[name=deckDesign]:checked").val();
  sizeChecked = $("input[name=boardSize]:checked").val();
  /*if a radio button for board size is not checked, the value of the input is undefined.
    the value is assigned to sizeChecked which is used in the conditional*/
  if (sizeChecked) {
    numberOfRows = sizeLibrary[$("input[name=boardSize]:checked").val()][0];
    numberOfColumns = sizeLibrary[$("input[name=boardSize]:checked").val()][1];
    $("div.game_board td").removeClass().addClass(chosenDeck);
    $("#defaultImage").css("display", "none");
    $("tr").detach();
    for (i = 0; i < numberOfRows; i++){
      $("div.game_board table").append("<tr></tr>");
    }
    for (j = 0; j < numberOfColumns; j++){
      $("tr").append("<td></td>");
      $("div.game_board td").addClass(chosenDeck);
    }
  } else {
        $("#defaultImage").removeClass().addClass(chosenDeck);
  }
});

//after name is entered, pressing enter hides input box and displays name
$("#nameInput").on("keypress", function(event){
  if(event.keyCode === 13){
    event.preventDefault();
    $("#playerName").text($(this).val());
    $("#nameInput").hide();
  }
});

/*if sizeChecked is undefined because a board size hasn't been chosen
  do not run new game functions*/
$("#newGameButton").on("click", function(){
  if (sizeChecked){
    $("div.game_board td").on("click", cardClick);
    $("#newGameMessage").css("visibility", "hidden");
    $("input:radio").attr("disabled" , true);
    buildCardIndex();
    assignValues();
    $("#newGameButton").attr("disabled" , true);
    startTimer();
  }
});

function resetGame(){
  clearCardIndex();
  guessCounter = 0;
  matchCounter = 0;
  $("#guesses").text(guessCounter);
  $("input:radio").attr("disabled" , false);
  $("#newGameButton").attr("disabled" , false);
  $("#newGameMessage").css("visibility", "visible");
  $("div.game_board td").removeClass("flipped");
  $("div.game_board td").off("click", cardClick);
  resetTimer();
}

//used to only get lowercase y or n from prompt for use in conditional
function firstLetterOfResponse (response){
  var responseArray = response.split("");
  return responseArray[0].toLowerCase();
}

/*prompt when reset button is pressed. if y, run reset game
  if not y, do nothing, go back to game. potentially add more conditionals to prevent random inputs*/
$("#resetGameButton").on("click", function(){
  var resetResponse = firstLetterOfResponse(prompt("Are you sure you want to reset the game?\n Y/N"));
  if (resetResponse == "y"){
      resetGame();
    }
});

var clickCounter = 0;
var guessCounter = 0;
var matchCounter = 0;
var firstCard;
var firstCardValue;
var secondCard;
var secondCardValue;
$("#guesses").text(guessCounter);
function cardClick(){
  if(!$(this).hasClass("flipped")){
    if(clickCounter === 0){
      clickCounter++;
      $(this).addClass("flipped");
      firstCard = $(this);
      firstCardValue = $(this).val();
      firstCard.css("background-color", colorLibrary[firstCardValue]);
    } else {
      clickCounter = 0;
      $(this).addClass("flipped");
      secondCard = $(this);
      secondCardValue = $(this).val();
      secondCard.css("background-color", colorLibrary[secondCardValue]);
      compareCards();
    }
  }
};

/*remove event listeners from board if not a match to prevent extra clicks
  add listeners back after cards have been "flipped" back over*/
function compareCards(){
  guessCounter++;
  $("#guesses").text(guessCounter);
  if (firstCardValue === secondCardValue){
    matchCounter++;
    if (matchCounter == cardIndex.length/2){
      var winnerResponse = firstLetterOfResponse(prompt("Congratulations!\nWould you like to play again?\n Y/N"));
      if (winnerResponse == "y"){
          resetGame();
      } else {
        alert("Thanks for playing!");
      }
    }
  } else {
    $("div.game_board td").off("click", cardClick);
    setTimeout(
            function() {
                firstCard.removeClass("flipped");
                secondCard.removeClass("flipped");
                $("div.game_board td").on("click", cardClick);
            },
            1000);
  }
};

/* cardIndex functions: build index based on size of board
  clear index on reset
  assign values to each td element on new game click*/
var cardIndex = [];
function buildCardIndex(){
  for (i = 1; i <= (numberOfRows * numberOfColumns)/2; i++){
    cardIndex.push(i);
    cardIndex.push(i);
  }
}
function clearCardIndex(){
  while (cardIndex.length > 0){
    cardIndex.pop();
  }
}
function assignValues(){
  shuffle(cardIndex);
  for (i=0; i < cardIndex.length; i++){
    $("div.game_board td").eq(i).val(cardIndex[i]);
  }
};

var colorLibrary = {
  1: "Red",
  2: "Blue",
  3: "Yellow",
  4: "Green",
  5: "Violet",
  6: "Lemonchiffon",
  7: "Black",
  8: "Aquamarine",
  9: "Tomato",
  10: "Chartreuse",
  11: "Burlywood",
  12: "DarkOrange",
  13: "DeepPink",
  14: "Gainsboro",
  15: "Indigo",
  16: "LightCoral",
  17: "MistyRose",
  18: "Olive"
}

/*more sizes can be added if color library is expanded*/
var sizeLibrary = {
  sizeOne: [4,4],
  sizeTwo: [4,6],
  sizeThree: [6,6]
}

//Fisher-Yates Shuffle function
function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

/*timer function should start on new game, reset on reset game
  string adds a leading zero to the value, slice -2 only shows the last two elements of the string*/
var stopWatchValue = 0;
var stopWatchMinutes = 0;
var seconds;
function startTimer(){
  seconds = setInterval(increaseTimer, 1000)
};
function increaseTimer(){
  stopWatchValue++;
  stopWatchString = "0" + (stopWatchValue % 60);
  if ((stopWatchValue % 60) === 0){
    stopWatchMinutes++;
  }
  $("#timer").text(stopWatchMinutes + ":" + stopWatchString.slice(-2));
};
function resetTimer(){
  stopWatchValue = 0;
  stopWatchMinutes = 0;
  $("#timer").text("0:00");
  clearInterval(seconds);
};
