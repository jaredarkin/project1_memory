// can't click cards until new game has been clicked
$("input[name='deckDesign']").on("click", function(){
  var chosenDeck = $("input[name=deckDesign]:checked").val();
  $("div.game_board td").removeClass().addClass(chosenDeck);
});

//change number of cards (<p>) depending on option clicked
//when and where will the user enter name
  //prompt for it (when)
  //textbox input - then hide textbox
  //name is stored as a variable
  //name is displayed on scoreboard
//when new game is clicked:
  //message in header is hidden - done
  //options are locked - done
  //timer is started if used
$("#newGame").on("click", function(){
  $("#newGameMessage").hide();
  $("input:radio").attr("disabled" , true);
  assignValues();
  //startTimer();
});

var clickCounter = 0;
var guessCounter = 0;
var matchCounter = 0;
var firstCard;
var firstCardValue;
var secondCard;
var secondCardValue;
$("#guesses").text(guessCounter);
$("div.game_board td").on("click", function(){
  if(!$(this).hasClass("flipped")){
    if(clickCounter === 0){
      clickCounter++;
      $(this).addClass("flipped");
      firstCard = $(this);
      firstCardValue = $(this).val();
      firstCard.css("background-color", matchLibrary[firstCardValue]);
    } else {
      clickCounter = 0;
      $(this).addClass("flipped");
      secondCard = $(this);
      secondCardValue = $(this).val();
      secondCard.css("background-color", matchLibrary[secondCardValue]);
      compareCards();
    }

  }
});


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
}

var cardLibrary = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
function assignValues(){
  shuffle(cardLibrary);
  console.log(cardLibrary);
  for (i=0; i < cardLibrary.length; i++){
    $("div.game_board td").eq(i).val(cardLibrary[i]);
  }
};

var matchLibrary = {
  1: "red",
  2: "blue",
  3: "yellow",
  4: "green",
  5: "violet",
  6: "lemonchiffon",
  7: "black",
  8: "aquamarine"
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
