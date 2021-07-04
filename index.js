let buttonColours = ["red","blue","green","yellow"];
let startFlag, level,gamePattern;
let userClickedPattern = [];

function init(){
    level = 0;
    gamePattern = [];
    startFlag = false;
}
function playSound(name){
    let audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
   let randomNumber = Math.trunc(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    console.log(gamePattern);
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200); 

          init();
    }
}


init();


$(document).on("keydown",function(){
    if(!startFlag){
        $("#level-title").text("Level " + level);
        nextSequence();
        startFlag = true;
    }
});

$(".btn").on("click",function(){
    let userChosenColour = $(this).attr("id");

    playSound(userChosenColour);

    animatePress(userChosenColour);

    userClickedPattern.push(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

