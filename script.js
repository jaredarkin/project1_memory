var numberOfRows;
$(".option_forms input").on("click", function(){
  var chosenDeck = $("input[name=deckDesign]:checked").val();
  numberOfRows = sizeLibrary[$("input[name=boardSize]:checked").val()];
  if (numberOfRows) {
    $("div.game_board td").removeClass().addClass(chosenDeck);
    $("#defaultImage").css("display", "none");
    $("tr").detach();
    for (i = 0; i < numberOfRows; i++){
      $("div.game_board table").append("<tr></tr>");
    }
    for (j = 0; j < numberOfRows; j++){
      $("tr").append("<td></td>");
      $("div.game_board td").addClass(chosenDeck);
      $("div.game_board td").on("click", cardClick);
    }
  } else {
        $("#defaultImage").removeClass().addClass(chosenDeck);
  }
});

$("#nameInput").on("keypress", function(event){
  if(event.keyCode === 13){
    event.preventDefault();
    $("#playerName").text($(this).val());
    $("#nameInput").hide();
  }
});


$("#newGameButton").on("click", function(){
  if (numberOfRows){
    $("#newGameMessage").css("visibility", "hidden");
    $("input:radio").attr("disabled" , true);
    buildCardLibrary();
    assignValues();
    $("#newGameButton").attr("disabled" , true);
    //startTimer();
  }
});

function resetGame(){
  buildCardLibrary();
  assignValues();
  guessCounter = 0;
  $("#guesses").text(guessCounter);
  $("input:radio").attr("disabled" , false);
  $("#newGameButton").attr("disabled" , false);
  $("div.game_board td").removeClass("flipped");
  //reset timer
}

function firstLetterOfResponse (response){
  var responseArray = response.split("");
  return responseArray[0];
}
$("#resetGameButton").on("click", function(){
  var resetResponse = firstLetterOfResponse(prompt("Are you sure you want to reset the game?\n Y/N")).toLowerCase();
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


function compareCards(){
  guessCounter++;
  $("#guesses").text(guessCounter);
  if (firstCardValue === secondCardValue){
    console.log("youve got a match");
    matchCounter++;
    if (matchCounter == cardLibrary.length/2){
      var winnerResponse = firstLetterOfResponse(prompt("Congratulations!\nWould you like to play again?\n Y/N")).toLowerCase();
      if (winnerResponse == "y"){
          resetGame();
      } else {
        alert("Thanks for playing!");
      }
    }
  } else {
    $("div.game_board td").off("click", cardClick);
    console.log("no match");
    setTimeout(
            function() {
                firstCard.removeClass("flipped");
                secondCard.removeClass("flipped");
                $("div.game_board td").on("click", cardClick);
            },
            1000);
  }
};

var cardLibrary = [];
function buildCardLibrary(){
  for (i = 1; i <= (numberOfRows * numberOfRows)/2; i++){
    cardLibrary.push(i);
    cardLibrary.push(i);
  }
}
function assignValues(){
  shuffle(cardLibrary);
  console.log(cardLibrary);
  for (i=0; i < cardLibrary.length; i++){
    $("div.game_board td").eq(i).val(cardLibrary[i]);
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

var sizeLibrary = {
  sizeOne: 4,
  sizeTwo: 6,
  sizeThree: 8
}

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
