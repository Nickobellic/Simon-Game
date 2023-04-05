var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
  $("h1").text("Level " + level);
  level = level + 1;
  var random = Math.floor(Math.random()*4);
  gamePattern.push(buttonColours[random]);
  $('#'+buttonColours[random]).fadeOut(100).fadeIn(100);
  return buttonColours[random];
}

function playSound(colour) {
  if (colour === "red") {
    var redAudio = new Audio('sounds/red.mp3');
    redAudio.play();
  } else if (colour === "green") {
    var greenAudio = new Audio('sounds/green.mp3');
    greenAudio.play();
  } else if (colour === "blue") {
    var blueAudio = new Audio('sounds/blue.mp3');
    blueAudio.play();
  } else if (colour === "yellow") {
    var yellowAudio = new Audio('sounds/yellow.mp3');
    yellowAudio.play();
  }
}

function animatePress (currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() { $("." + currentColour).removeClass("pressed") }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("True");
  } if (gamePattern.length === userClickedPattern.length) {
    setTimeout(function () { nextSequence(); }, 1000);
  }
  if (gamePattern[currentLevel] != userClickedPattern[currentLevel]) {
    var wrong = new Audio("sounds/wrong.mp3");
    $("body").addClass("game-over");
    wrong.play();
    setTimeout(function() {
      $("body").removeClass("game-over"), 200
    });
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern.clear();
  started = false;
}


$(document).keypress(function () {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});



$(".btn").click ( function(event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})
