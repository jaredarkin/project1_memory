
$(".option_forms input").on("click", function(){
  var chosenDeck = $("input[name=deckDesign]:checked").val();
  var numberOfRows = sizeLibrary[$("input[name=boardSize]:checked").val()];
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


$("#newGame").on("click", function(){
  var numberOfRows = sizeLibrary[$("input[name=boardSize]:checked").val()];
  if (numberOfRows){
    $("#newGameMessage").css("visibility", "hidden");
    $("input:radio").attr("disabled" , true);
    assignValues();
    //startTimer();
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
      alert("Congrats");
    }
  } else {
    console.log("no match");
    setTimeout(
            function() {
                firstCard.removeClass("flipped");
                secondCard.removeClass("flipped");
            },
            1500);
  }
};

var cardLibrary = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
function assignValues(){
  shuffle(cardLibrary);
  console.log(cardLibrary);
  for (i=0; i < cardLibrary.length; i++){
    $("div.game_board td").eq(i).val(cardLibrary[i]);
  }
};

var colorLibrary = {
  1: "#ff0000",
  2: "#0000ff",
  3: "#ffff00",
  4: "#008000",
  5: "#ee82ee",
  6: "#fffacd",
  7: "#000000",
  8: "#7fffd4",
  9: "#ff6347",
  10: "#7fff00",
  11: "#deb887",
  12: "#ff8c00",
  13: "#ff1493",
  14: "#dcdcdc",
  15: "#4b0082",
  16: "#f08080",
  17: "#ffe4e1",
  18: "#808000"
}

var sizeLibrary = {
  defaultSize: 4,
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
