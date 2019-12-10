var gameWidth = 800;
var gameHeight = window.innerHeight;
var keyPressed = {};
var frames = 0;


var mapInfo = {
	x:gameWidth,
	y:2004
}
var viewControl={
	x:0,
	y:(mapInfo.y - gameHeight)
}
var img = new Image();
img.src = './assets/images/jungleMap.png';

function Game(canvas){
	this.frames = 0;
	this.player = null;
	this.chapter = null;
    this.obstacles = [];
	this.background = null;
	this.viewControl = null;
	this.parentElement = canvas;
	this.ctx = canvas.getContext('2d');

	var that = this;


	this.init = function(){
		canvas.width = gameWidth;
		canvas.height = gameHeight;
		canvas.style.margin = '0 10%';
		var background = new Background(this.ctx);
		this.background = background;
		var player = new Player(this.ctx);
		this.player = player;
		document.addEventListener('keydown', function(event){
			keyPressed[event.key] = true;
			console.log(keyPressed);
		},true);
		document.addEventListener('keyup', function(){
			keyPressed[event.key] = false;
			console.log(keyPressed);
		});

		var obstacle = new Obstacle(this.ctx);
		this.obstacles.push(obstacle);
	}
	this.startGame = function(){
		this.init();
		this.background.draw();
		this.player.init();
		this.animate();
	}
	this.animate = function(){
		this.ctx.clearRect(0, 0, gameWidth, gameHeight);
		this.ctx.save();
		this.ctx.translate(-viewControl.x,-viewControl.y);
		requestAnimationFrame(function(){that.animate()});
		this.background.draw();
		this.player.keyPressed();
		this.player.checkObstacle(this.obstacles);
		for(var i = 0; i < this.obstacles.length; i++){
			this.obstacles[i].draw();
		}
		this.player.checkBoundry();
		this.player.draw();
		frames++;



		this.ctx.restore();
	}

	this.keyPressed = function(event){
		this.player.keyPressed(event);
	}
}

var canvas = document.getElementById('myGame');
var game = new Game(canvas).startGame();