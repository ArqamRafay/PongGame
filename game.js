


var ballX=50;
var ballY=50;
var ballSpeedX = 10;
var ballSpeedY = 4;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT  = 100; 
const PADDLE_THICKNESS  = 10;

var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 3;

var showingWinScreen = true;

function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
}



function clickToStart(evt) {

	if(showingWinScreen) {
		player1Score = 0;
		player2Score = 0;
		showingWinScreen = false;
	}
	
}


var canvas= document.getElementById("gameCanvas");
var ctx=  canvas.getContext('2d');

	var framePerSceond = 30;
	setInterval(function() {
		moveEveryThing();
		drawEveryThing();
	},1000/framePerSceond);

//	canvas.addEventListener('mousedown', handleMouseClick);
	
	canvas.addEventListener('mousedown', clickToStart);


	canvas.addEventListener('mousemove',
		function(evt){ 
			var mousePos = calculateMousePos(evt);
			paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
		});

function ballReset() {

	if(player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
		
		showingWinScreen = true;
	
	}

	ballSpeedX =-ballSpeedX;
	ballX = canvas.width/2;
	ballY = canvas.height/2;


}

function computerMovement() {
	var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
	if(paddle2YCenter < ballY -35) {
		paddle2Y += 6;

	} else if(paddle2YCenter > ballY +35)  {
		paddle2Y -= 6;
		}

}

function moveEveryThing(){

	if(showingWinScreen == true) {
		return;
	}

	computerMovement();

	ballX += ballSpeedX;		//a = a+b equal a+=b
	ballY += ballSpeedY;

	if(ballX > canvas.width-50) {
		if(ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT) {	
			ballSpeedX = -ballSpeedX;

			var deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2);
			ballSpeedY = deltaY * 0.35;

		} else {
			player1Score++;
			ballReset();
		}
	}

	if(ballX < 50) {
		if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT) {	
			ballSpeedX = -ballSpeedX;

			var deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
			ballSpeedY = deltaY * 0.35;

		} else {
			player2Score++;
			ballReset();
		}
	}	

	if(ballY > canvas.height) {
		ballSpeedY =-ballSpeedY;
	}

	if(ballY < 0) {
		ballSpeedY =-ballSpeedY;
	}
}


function drawNet() {
	
	for(var i=0; i<canvas.height; i+=40) {
		colorRect(canvas.width/2-1,i,2,20,'White');
		}
}


function drawEveryThing() {
	
	//next line blanks out of screen with black
	colorRect(0,0,canvas.width,canvas.height,'black');


	if(showingWinScreen ) {
		ctx.fillStyle = 'White';
		ctx.font = 'italic 13pt Calibri';
	 	ctx.fillStyle = 'yellow';

		if(player1Score >= WINNING_SCORE){
			ctx.fillText("You won! ", 350, 200);
			ctx.fillText("click to continue!", 350, 250);
		} else if(player2Score >= WINNING_SCORE) {
			ctx.fillText("Computer  won!", 350, 200);
			ctx.fillText("click to continue!", 350, 250);
			return;
		} else 
		
		ctx.fillText("click to start", 380,400);
	return;
	}

	drawNet();

	//left player paddle
	colorRect(30, paddle1Y , PADDLE_THICKNESS , PADDLE_HEIGHT ,'White');

	//right computer paddle
	colorRect(canvas.width-30 , paddle2Y , PADDLE_THICKNESS , PADDLE_HEIGHT ,'white');

	//draw the ball
	colorCircle(ballX, ballY, 10, 'white');

	//scoring here 
	ctx.fillText(player1Score, 100, 100);
	ctx.fillText(player2Score, canvas.width-100, 100);

	
}

function colorCircle(centerX, centerY, radius, drawColor) {

	ctx.fillStyle = drawColor;
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	ctx.fill();

}

function colorRect(leftX, topX, width, height, drawColor) {

	ctx.fillStyle = drawColor;
	ctx.fillRect(leftX,topX,width,height);
}


