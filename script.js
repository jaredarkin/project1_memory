//when window loads, display message in header "please select options and click new game to start"
//change background image of cards depending on option clicked - done
  //only one option can be checked at once - radio buttons
var deckImage;
$("input[name='deckDesign']").change(function(){
  if ($(this).val() === "cats"){
    $("p.card").css("background-image", "url(images/spacecat.jpg)");
    deckImage = images/spacecat.jpg;
  }
  if ($(this).val() === "logo"){
    $("p.card").css("background-image", "url(images/ga_logo.png)");
    deckImage = images/ga_logo.png;
  }
  if ($(this).val() === "bob"){
    $("p.card").css("background-image", "url(images/gene2.gif)");
    deckImage = images/gene2.gif;
  }
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
  //startTimer();
});

var clickCounter = 0;
var guessCounter = 0;
var firstCard;
var firstCardValue;
var secondCard;
var secondCardValue;
//when a card is clicked
$("p.card").on("click", function(){
  if(clickCounter === 0){
    clickCounter++;
    console.log(clickCounter);
    $(this).addClass("flipped");
    firstCard = $(this);
    firstCardValue = $(this).text();
    console.log(firstCardValue);
  } else {
    clickCounter = 0;
    console.log(clickCounter);
    $(this).addClass("flipped");
    secondCard = $(this);
    secondCardValue = $(this).text();
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
  if (firstCardValue === secondCardValue){
    console.log("youve got a match");
  } else {
    console.log("no match");
    setTimeout(
            function() {
                firstCard.removeClass("flipped");
                secondCard.removeClass("flipped");
            },
            2000);
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
