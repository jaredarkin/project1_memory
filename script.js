//when window loads, display message in header "please select options and click new game to start"
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
var firstCard;
var firstCardValue;
var secondCard;
var secondCardValue;
$("#guesses").text(guessCounter);
//when a card is clicked
$("div.game_board td").on("click", function(){
  if(clickCounter === 0){
    clickCounter++;
    console.log(clickCounter);
    $(this).addClass("flipped");
    firstCard = $(this);
    firstCardValue = $(this).val();
    console.log(firstCardValue);
  } else {
    clickCounter = 0;
    console.log(clickCounter);
    $(this).addClass("flipped");
    secondCard = $(this);
    secondCardValue = $(this).val();
    console.log(secondCardValue);
    compareCards();
  }
});

//if text matches on both cards
  //cards remain as they are
  //click counter resets to 0
//if text does not match
  //after a 2 second delay
  //on both cards the text is hidden
  //on both cards the image is shown
  //click counter resets to 0
function compareCards(){
  guessCounter++;
  $("#guesses").text(guessCounter);
  if (firstCardValue === secondCardValue){
    console.log("youve got a match");
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
  //click counter increases to 1
  //background image on card is removed
  //centered text is shown
//when a second card is clicked
  //click counter increases to 2
  //background image is removed
  //centered text is shown
  //guesses counter is increased

var cardLibrary = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
function assignValues(){
  shuffle(cardLibrary);
  console.log(cardLibrary);
  for (i=0; i < cardLibrary.length; i++){
    $("div.game_board td").eq(i).val(cardLibrary[i]);
  }
};

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
