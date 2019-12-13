// tile 48 * 48
var frames = 0;
var keyPressed = {};
var gameWidth = 555;
var gameHeight = window.innerHeight;

var mapInfo = {
	x: gameWidth,
	y: 1750
}
var viewControl={
	x: 0,
	y: (mapInfo.y - gameHeight)
}
var gameBoundary={
	top: 465,
	left: 20,
	bottom: 300,
	right: 537
}
var gameFlags = {
	levelComplete: false,
	gameOver: false
}
var img = new Image();
img.src = './assets/images/background1.png';
// img.src = './assets/images/jungleMap.png';

function Game(canvas){
	this.coin = 0;
	this.frames = 0;
	this.enemies = [];
	this.player = null;
	this.chapter = null;
	this.obstacles = [];
	this.experience = 0;
	this.background = null;
	this.viewControl = null;
	this.parentElement = canvas;
	this.firstTimeLevelMapLoaded = true;
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
		document.addEventListener('keyup', function(event){
			keyPressed[event.key] = false;
		});

		this.map = new Map(this.ctx, this.firstTimeLevelMapLoaded);
		this.map.init();
		this.map.setMapTIles(this.player);
		for(var i = 0; i < this.map.tileMap.length; i++){
			for(var j = 0; j < this.map.tileMap[i].length; j++){
				if(this.map.tileMap[i][j] == 1){
					this.obstacles.push(this.map.mapDetail[i][j]);
				}
				if(this.map.tileMap[i][j] == 10){
					this.enemies.push(this.map.mapDetail[i][j]);
				}
			}
		}
		console.log(this.enemies);
		console.log(this.obstacles);

		//need seperation later
		// for(var i = 0; i < 2; i++){
		// 	var obstacle = new Obstacle(this.ctx, (i + 1) * 3 );
		// 	this.obstacles.push(obstacle);
		// }

		// var slime = new Slime(this.ctx, 400, 500, player);
		// this.enemies.push(slime);
		// var slime1 = new Slime(this.ctx, 300, 800, player);
		// this.enemies.push(slime1);
	}

	// 
	this.startGame = function(){
		console.log('Game Started');
		this.init();
		this.background.draw();
		this.map.draw();
		this.player.init();
		// this.enemies[this.enemies.length - 1].draw();
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
		// 	for(var i = 0; i < this.obstacles.length; i++){
		// 		this.obstacles[i].draw();
		// 	}
			for(var i = 0; i < this.enemies.length; i++){
				this.enemies[i].update(this.obstacles);	//update enemies position
			}
			for(var i = this.enemies.length - 1; i >= 0; i--)
			{
				if(this.enemies[i].hitPoint <= 0){
					console.log(this.enemies[i]);
					this.enemies.splice(i, 1);
					var temp = i;
					for(var k = 0; k < this.map.tileMap.length; k++){
						for(var j = 0; j < this.map.tileMap[k].length; j++){
							if(this.map.tileMap[k][j] == 10){
								if(temp == 0){
									this.map.mapDetail[k][j] = 0;
									this.map.tileMap[k][j] = 0;
								}
								temp--;
							}
						}
					}
					console.log(this.enemies);
				}
			}
		}else{
			this.player.update(this.obstacles, this.enemies);	//Update player position 
			this.map.draw();
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