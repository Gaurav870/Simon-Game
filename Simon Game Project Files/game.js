var buttonColor = ["green","red","yellow","blue"];
var userChosenPattern = [];
var gamePattern = [];
var started = false;
var level = 0;

$(document).on("keypress",function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});

function startOver(){
    gamePattern=[];
    started=false;
    level=0;
    userChosenPattern=[];
}

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    playSound(userChosenColor);
    animatePressed(userChosenColor);
    userChosenPattern.push(userChosenColor);
    checkAnswer(userChosenPattern.length-1);
});

function nextSequence(){
    userChosenPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePressed(name){
    var curr = $("#"+name);
    curr.addClass("pressed");
    setTimeout(function(){
        curr.removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(userChosenPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("SUCCESS");
        if(userChosenPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence()
            },1000)
        }
    }
    else{
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },300);
        $("#level-title").text("Game Over, Press any key to Restart.")
        startOver();
        playSound("wrong");
    }
}