const buttonColors = new Array("red", "blue", "green", "yellow");
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var correct ="Right";

//when the game starts..
$(document).on("keypress", function(){
    if(!started){
        //change header
        $("#level-title").text("Level " + level);
        //add a random color to the game
        nextSequence();
        started = true;
    }

});


//when a button is pressed.. 
$( ".btn" ).on( "click", function() {
    
    //get user's clicked color and store in userClickecPattern
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    //give user some kind of response when button is clicked
    playSound(userChosenColor);
    animatePress(userChosenColor);

    //check user's response
    checkAnswer(userClickedPattern.length-1);
} );


function startOver(){
    level= 0;
    gamePattern = [];
    started = false;
}


function checkAnswer(currentLevel){

    //check if user's current answer is the same as the nth answer in the game pattern array 
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        //if the user has clicked the right pattern which is now the same length of the game's pattern
        //add the next color
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000)
        }
    
    }
    // if user's current answer is not the same as the nth answer, end game
    else{

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();


    }
    
}



//generate the next color in the sequence
function nextSequence(){

    //reset user pattern for every level
    userClickedPattern = [];

    //random num between 0 to 3
    var randomNumber = Math.floor(Math.random()*4);
    //pick a random color form buttonColors array
    var randomChosenColor = buttonColors[randomNumber];
    // add the game chosen random color to the game
    gamePattern.push(randomChosenColor);
    //show the user the new color
    $("."+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    //increase level
    level++;
    $("#level-title").text("Level " + level);

}

//play audio for random color
function playSound(name){ 
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}


//button animation
function animatePress(currentColor){

    $(currentColor).addClass("pressed");

    setTimeout(function(){

        $(currentColor).removeClass("pressed");

    }, 200);

}