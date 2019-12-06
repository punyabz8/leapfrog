var MAX_WIDTH = 500;
var MAX_HEIGHT = 500;
var baseHeight = 112;
var obstacles = ['pipe-green-up.png', 'pipe-green-down.png'];
var birds = ['bluebird-downflap.png', 'bluebird-midflap.png', 'bluebird-upflap.png'];

var Game = function(parentElement){
	var frames = 70;
	this.pipes = [];
	this.bird = null;
	this.score = null;
	this.gameScore = 0;
	this.endScreen = null;
	this.gameIndex = null;
	this.gameHighScore = 0;
	this.foreground = null;
	this.gameStarted = false;
	this.gameFinished = false;
	this.parentElement = parentElement;

	var that = this;

	this.init = function(divIndex){
		this.gameIndex = divIndex;
		parentElement.style.float = 'left';
		parentElement.style.margin = '0 5%';
		parentElement.style.overflow = 'hidden';
		parentElement.style.position = 'relative';
		parentElement.style.backgroundColor = 'red';
		parentElement.style.width = MAX_WIDTH + 'px'; 
		parentElement.style.display = 'inline-block';
		parentElement.style.height = MAX_HEIGHT + 'px'; 
		parentElement.style.background = 'url("./assets/sprites/background-day.png")';

		var score = document.createElement('div');
		this.score = score;
		score.style.left = '50%';
		score.style.top = '50px';
		score.style.zIndex = '30';
		score.style.margin = '0 auto';
		score.style.position = 'absolute';
		this.score.innerHTML = '<h2> '+ this.gameScore +'</h2>';
		parentElement.append(this.score);

		this.foreground = new Foreground(parentElement);
		this.foreground.init();
		document.addEventListener("keydown",this.keyDown.bind(this));
		this.startGame();
	}

	this.startGame = function(){
		this.bird = new Bird(this);
		this.bird.init();
		var checkScore = true;
		var gameInterval = setInterval(function(){
			frames++;
			that.foreground.element.style.backgroundPositionX = -frames * 6 +'px';
			that.bird.draw();
			if(that.gameStarted == true && that.gameFinished == false)  {
				// Create pipes set every 50 frames
				if(frames % 50 == 0){
					var obstacleUp = new Obstacle(that.parentElement);
					var upHeight = obstacleUp.createObstacle(1, 0);
					that.pipes.push(obstacleUp);
					var obstacleDown = new Obstacle(that.parentElement);
					obstacleDown.createObstacle(0, upHeight);
					that.pipes.push(obstacleDown);
				}
				// check if bird is collided with bottom
				if(that.bird.collisionButtom(that.foreground) == true){
					that.gameFinished = true;
					clearInterval(gameInterval);
					that.setScore();
					that.endGame();
				}
				//Check bird is collide with pipes
				if(that.bird.collisionPipe(that.pipes) == true){
					that.gameFinished = true;
					clearInterval(gameInterval);
					that.setScore();
					that.endGame();
				}
				//update bird actions on the basis of game status
				that.bird.update(that.gameStarted);
				for(var i = 0; i < that.pipes.length; i++){
					that.pipes[i].update();
				}
				//Code to increase score as bird cross pipes
				for(var i = 0; i < that.pipes.length; i += 2){
					if(that.bird.x > that.pipes[i].x + that.pipes[i].height){
						if(that.pipes[i].scoreCounted == false){
							that.gameScore += 1;
							that.pipes[i].scoreCounted = true;
							that.setScore();
						}
					}
				}
			}
		},50);
	}

	this.draw = function(){
		that.background.moveBackground();
	}
	// draw score on game running
	this.setScore = function(){
		this.score.innerHTML = '';
		this.score.innerHTML = '<h2> '+ this.gameScore +'</h2>';
		if(that.gameHighScore < that.gameScore){
			that.gameHighScore = that.gameScore;
		}
	}
	// Game end display block
	this.endGame = function(){
		this.endScreen = document.createElement('div');
		this.endScreen.style.zIndex = '20';
		this.endScreen.style.opacity = 0.8;
		this.endScreen.style.top = 50 + 'px';
		this.endScreen.style.left = 100 + 'px';
		this.endScreen.style.display = 'block';
		this.endScreen.style.width = 300 + 'px';
		this.endScreen.style.height = 300 + 'px';
		this.endScreen.style.textAlign = 'center';
		this.endScreen.style.position = 'absolute';
		this.endScreen.style.backgroundColor = 'grey';
		this.endScreen.style.border = '1px solid green';
		this.endScreen.innerHTML = '<h1 style = "text-align :center; color: red;"> Game Over </h1><h2>Score</h2>'+ that.gameScore +
		'<h2>High Score</h2>'+ that.gameHighScore;
		this.gameIndex % 2 == 0 ? this.endScreen.innerHTML += '<br><br>Press "Space" to restart' : this.endScreen.innerHTML += '<br><br>Press "Numpad0" to restart';
		parentElement.append(this.endScreen);
		this.endScreen = this.endScreen;
		this.score.style.display = 'none';
	}
	// reset all variables to initial state
	this.resetGame = function(){
		this.gameStarted = false;
		this.gameFinished = false;
		this.parentElement.removeChild(this.bird.element);
		for(var i = this.pipes.length-1; i>= 0; i--) {
			that.parentElement.removeChild(this.pipes[i].element);
			this.pipes.pop();
		}
		this.parentElement.removeChild(this.endScreen);
		this.gameScore = 0;
		this.setScore();
		this.score.style.display = 'block';

	}
	// check pipes position if x < 0 delete them
	this.checkPipesPosition = function(){
		for(var i=0;i<this.pipes.length;i++){
			if(this.pipes[i].x - this.pipes[i].height < 0){
				this.pipes.splice(i, 1);
			}
		}
	}
	// keydown events actions
	this.keyDown = function(event){
		if(this.gameIndex % 2 == 0)        {
			if(this.gameFinished == false){
				if(event.code == "Space" && this.gameStarted == false){
					that.gameStarted = true;
				}
				if(event.code == "Space" && this.gameStarted == true){
					that.bird.jump();
				}
			}
			if(event.code == 'Space' && this.gameFinished == true){
				this.resetGame();
				this.startGame();
			}
		}
		if(this.gameIndex % 2 == 1)        {
			if(this.gameFinished == false){
				if(event.code == "Numpad0" && this.gameStarted == false){
					that.gameStarted = true;
				}
				if(event.code == "Numpad0" && this.gameStarted == true){
					that.bird.jump();
				}
			}
			if(event.code == 'Numpad0' && this.gameFinished == true){
				this.resetGame();
				this.startGame();
			}
		}
	}
}


var flappyBirdContainer = document.getElementsByClassName('myFlappyBird');
for(var i = 0; i < flappyBirdContainer.length; i++){
	var game = new Game(flappyBirdContainer[i]).init(i);
}