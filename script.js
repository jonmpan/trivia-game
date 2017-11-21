$(document).ready(function() {

triviaStart = false;
highScore = 0;
score = 0;
lives = 3;
lunatic = false;
gameover=0;

timer = 9;
var intervalId;
var timerRunning = false;

random = 0;
oldrandom=100;
currentQuestion = {};

var sndCorrect = new Audio('audio/correct.wav');
var sndIncorrect = new Audio('audio/incorrect.wav');
var sndGameOver = new Audio('audio/gameover.wav');
var sndEasyStart = new Audio('audio/easystart.wav');
var sndLunaticStart = new Audio('audio/lunaticstart.wav');

$('#songplayer').get(0).play();

$('.answers').click(function(){
	if ($(this).attr("id") === currentQuestion.a) {
		score++;
		updateNumbers();
		newQuestion();
		sndCorrect.play();
	}
	else if (lives>1) {
		lives--;
		updateNumbers();
		$(this).css("visibility", "hidden");
		sndIncorrect.play();
	}
	else {
		lives--;
		$(this).css("visibility", "hidden");
		gameOver();
	}
});

$('#tutorialpage').click(function(){
	if(gameover < 1){
		sndEasyStart.play();
		lunatic = false;
		newQuestion();
	}
	else{
		return;
	}
});

$('#easymode').click(function(){
	sndEasyStart.play();
	newGameEasy();
});

$('#lunaticmode').click(function(){
	sndLunaticStart.play();
	newGameLunatic();
});

function newGameEasy(){
	if (lunatic){
		lunatic = false;
		document.getElementById("answerscontainer").style.backgroundImage="url('images/cirno.gif')";
		var audioElement = document.getElementById("songplayer");
  		audioElement.setAttribute("src", "audio/easy.mp3");
		$('#songplayer').get(0).play();
		newQuestion();
	}
	else {
		newQuestion();
	}
}

function newGameLunatic(){
	if (lunatic){
		newQuestionLunatic();
	}
	else {
		lunatic = true;
		// $('#songplayer').attr("src", "audio/lunatic.mp3");
		document.getElementById("answerscontainer").style.backgroundImage="url('images/cirnolunatic.gif')";
		var audioElement = document.getElementById("songplayer");
  		audioElement.setAttribute("src", "audio/lunatic.mp3");
  		$('#songplayer').get(0).play();
  		newQuestionLunatic();
	}
}

function newQuestion(){
	$('#tutorialpage').hide();
	$('#triviapage').show();
	random = Math.floor(Math.random()*questions.length);
	console.log(random);
	// $('#retrybuttonscontainer').hide();
	if (random===oldrandom) {
		newQuestion();
	}
	else {
		currentQuestion = questions[random];
		$('#questiondisplay').text(questions[random].q);
		$('#answer1').text(questions[random].a1);
		$('#answer2').text(questions[random].a2);
		$('#answer3').text(questions[random].a3);
		$('#answer4').text(questions[random].a4);
		// $('#questiondisplay').css("visibility", "visible")
		$('.answers').css("visibility", "visible");
		stopwatch.reset();
		stopwatch.start();
		oldrandom = random;
	}
};

function newQuestionLunatic(){
	$('#tutorialpage').hide();
	$('#triviapage').show();
	random = Math.floor(Math.random()*lunaticquestions.length);
	console.log(random);
	// $('#retrybuttonscontainer').hide();
	if (random===oldrandom) {
		newQuestionLunatic();
	}
	else {
		currentQuestion = lunaticquestions[random];
		$('#questiondisplay').text(lunaticquestions[random].q);
		$('#answer1').text(lunaticquestions[random].a1);
		$('#answer2').text(lunaticquestions[random].a2);
		$('#answer3').text(lunaticquestions[random].a3);
		$('#answer4').text(lunaticquestions[random].a4);
		// $('#questiondisplay').css("visibility", "visible")
		$('.answers').css("visibility", "visible");
		stopwatch.reset();
		stopwatch.start();
		oldrandom = random;
	}
};

var stopwatch = {
	start: function() {
		if (!timerRunning) {
		
		updateNumbers();
		timerRunning = true;
        console.log('start');
        	if (!lunatic) {
        		intervalId = setInterval(stopwatch.count, 1000);
        	}
        	if (lunatic) {
        		intervalId = setInterval(stopwatch.count, 500);
        	}
    	}
    },

    count: function() {
    	if (timer > 0){
	    	timer--;
	    	updateNumbers();

    	}
    	else if(lives>1){
    		lives--;
    		sndIncorrect.play();
    		stopwatch.reset();
    		updateNumbers();
	    		if(!lunatic){
	    			newQuestion();
	    		}
	    		if(lunatic){
	    			newQuestionLunatic();
	    		}
    		}
		else {
			sndIncorrect.play();
			lives--;
    		gameOver();
		}
    	},

    reset: function() {
    	timer = 9
    	timerRunning = false;
    	clearInterval(intervalId);
    }
}

function gameOver() {
	sndGameOver.play();
	updateNumbers();
	// $('.answers').css("visibility", "hidden");
	// $('#questiondisplay').css("visibility", "hidden")
	$('#retrybuttonscontainer').show();
	$('#tutorialpage').show();
	$('#triviapage').hide();
	console.log('gameOver');
	lives = 3;
	score = 0;
	stopwatch.reset();
	gameover++;
}

function updateNumbers() {
	$('#scoredisplay').text(score);
	$('#livesdisplay').text(lives);
	$('#timerdisplay').text(timer);
	if(lunatic){
		$('#finalscoredisplay').text('Lunatic Score: '+score);
	}
	else{
		$('#finalscoredisplay').text('Score: '+score);
	}
}

// do{
// 	gameOver();
// }
// while (lives<1);

});