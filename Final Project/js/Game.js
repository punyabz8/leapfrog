// tile 48 * 48
var coin = 0;
var frames = 0;
var keyPressed = {};
var experience = 0;
var gameWidth = 560;
var gameHeight = window.innerHeight;

var mapInfo = {
	x: gameWidth,
	y: 1700
}
var viewControl={
	x: 0,
	y: (mapInfo.y - gameHeight)
}
var gameBoundary={
	top: 455,
	left: 20,
	bottom: 285,
	right: 542
}
var gameFlags = {
	levelComplete: false,
	gameOver: false
}
var img = new Image();
img.src = './assets/images/background1.png';
// img.src = './assets/images/jungleMap.png';

function Game(canvas){
	this.frames = 0;
	this.enemies = [];
	this.player = null;
	this.chapter = null;
	this.obstacles = [];
	this.background = null;
	this.viewControl = null;
	this.parentElement = canvas;
	this.ctx = canvas.getContext('2d');

	var that = this;
	this.map = null;

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
		},true);
		document.addEventListener('keyup', function(){
			keyPressed[event.key] = false;
		});

		this.map = new Map(this.ctx);
		// this.map.init();
		this.map.draw();

		//need seperation later
		for(var i = 0; i < 2; i++){
			var obstacle = new Obstacle(this.ctx, (i + 1) * 3 );
			this.obstacles.push(obstacle);
		}

		var slime = new Slime(this.ctx, 400, 500, player);
		this.enemies.push(slime);
		var slime1 = new Slime(this.ctx, 300, 800, player);
		this.enemies.push(slime1);
	}

	// 
	this.startGame = function(){
		console.log('Game Started');
		this.init();
		this.background.draw();
		this.player.init();
		this.enemies[this.enemies.length - 1].draw();
		this.animate();
	}

	this.animate = function(){
		this.ctx.clearRect(0, 0, gameWidth, gameHeight);
		this.ctx.save();
		this.ctx.translate(-viewControl.x,-viewControl.y);		//translate for viewport adjustment
		this.background.draw();	//draw backgroud image
		this.map.draw();
		if(gameFlags.levelComplete == false){
			this.player.update(this.obstacles, this.enemies);	//Update player position 
			for(var i = 0; i < this.obstacles.length; i++){
				this.obstacles[i].draw();
			}
			for(var i = 0; i < this.enemies.length; i++){
				this.enemies[i].update(this.player, this.obstacles);	//update enemies position
			}
			for(var i = this.enemies.length - 1; i >= 0; i--)
			{
				if(this.enemies[i].hitPoint <= 0){
					this.enemies.splice(i, 1);
				}
			}
		}else{
			this.player.update(this.obstacles, this.enemies);	//Update player position 
			for(var i = 0; i < this.obstacles.length; i++){
				this.obstacles[i].draw();
			}
			console.log('Level Complete');
		}
		frames++;
		this.ctx.restore();
		requestAnimationFrame(function(){that.animate()});
	}

	this.keyPressed = function(event){
		this.player.keyPressed(event);
	}
}


var canvas = document.getElementById('myGame');
var game = new Game(canvas);
game.startGame();
var nextExperience = 500 * game.player.level;