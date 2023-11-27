var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var currentLevel = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  return randomNumber;
}

function flashButton(color) {
  $("#" + color).animate({ opacity: 0 }, 200, "linear", function() {
    $(this).animate({ opacity: 1 }, 200, "linear");
  });
}

function playNextSequence() {
  level++;
  $("#level-title").text("Level " + level);

  var randomChosenColourIndex = nextSequence();
  var randomChosenColour = buttonColours[randomChosenColourIndex];

  console.log("Next sequence color: " + randomChosenColour);
  gamePattern.push(randomChosenColour);

  // Call flashButton to visually show the next sequence
  flashButton(randomChosenColour);

  var audio = new Audio("./sounds/" + randomChosenColour + ".mp3");
  audio.play();

  currentLevel = 0;
}

function checkAnswer() {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        playNextSequence();
      }, 1000);
      userClickedPattern = [];
    }
    currentLevel++;
  } else {
    console.log("Wrong");
    var wrongSound = new Audio("./sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  currentLevel = 0;
  gamePattern = [];
}

$(document).keydown(function(event) {
  if (level === 0 || event.key === "Enter") {
    startOver();
    playNextSequence();
  }
});

$("#restart-btn").click(function() {
  startOver();
  playNextSequence();
});

$(document).ready(function() {
  $(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    console.log("User chosen color: " + userChosenColour);
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);

    flashButton(userChosenColour);

    checkAnswer();

 
    var audio = new Audio("./sounds/" + userChosenColour + ".mp3");
    audio.play();
  });
});