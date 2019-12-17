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

var imagesObstacles = [];
var imagesEnemies = [];
var imagesTraps = ['caltrop.png'];


function Game(canvas){
	this.coin = 0;
	this.frames = 0;
	this.traps = [];
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
				if(this.map.tileMap[i][j] >= 1 && this.map.tileMap[i][j] <= 10){
					this.obstacles.push(this.map.mapDetail[i][j]);
				}
				if(this.map.tileMap[i][j] >= 11 && this.map.tileMap[i][j] <= 20){
					this.enemies.push(this.map.mapDetail[i][j]);
				}
				if(this.map.tileMap[i][j] >= 21 && this.map.tileMap[i][j] <= 30){
					this.traps.push(this.map.mapDetail[i][j]);
				}
			}
		}

	}

	

	// 
	this.startGame = function(){
		console.log('Game Started');
		this.init();
		this.background.draw();
		this.map.draw();
		this.player.init(this.enemies, this.obstacles);
		this.animate();
	}

	this.animate = function(){
		this.ctx.clearRect(0, 0, gameWidth, gameHeight);
		this.ctx.save();
		this.ctx.translate(-viewControl.x,-viewControl.y);		//translate for viewport adjustment
		this.background.draw();	//draw backgroud image
		this.map.draw();
		
		if(gameFlags.levelComplete == false && gameFlags.gameOver == false){
			// for(var i = 0; i < this.traps.length; i++){
				
			// 	this.traps[i].update();	
				
			// }
			this.player.update(this.obstacles, this.enemies, gameFlags.levelComplete, this.traps);	//Update player position 
			for(var i = 0; i < this.enemies.length; i++){
				this.enemies[i].update(this.obstacles);	//update enemies position
			}
			// Delete dead enemies
			for(var i = this.enemies.length - 1; i >= 0; i--)
			{
				if(this.enemies[i].hitPoint <= 0){
					console.log(this.enemies[i]);
					this.enemies.splice(i, 1);
					var temp = i;
					for(var k = 0; k < this.map.tileMap.length; k++){
						for(var j = 0; j < this.map.tileMap[k].length; j++){
							if(this.map.tileMap[k][j] == 11){
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
			if(this.player.hitPoint <= 0){
				gameFlags.gameOver = true;
			}
		}else if(gameFlags.levelComplete == true && gameFlags.gameOver == false){
			if(this.player.hitPoint <= 0){
				gameFlags.gameOver = true;
			}
			for(var i = 0; i < this.traps.length; i++){
				this.traps[i].update();	
			}
			this.player.update(this.obstacles, this.enemies, gameFlags.levelComplete, this.traps);	//Update player position 
			this.map.draw();
			console.log('Level Complete');
		}else{
			this.map.draw();
			console.log('Game Over');
		}

		frames++;
		this.ctx.restore();
		requestAnimationFrame(function(){that.animate()});
	}

	this.keyPressed = function(event){
		this.player.keyPressed(event);
	}

	this.chooseLevel = function(currentLevel){

	}
	this.resetMap = function(){

	}
}


var canvas = document.getElementById('myGame');
var game = new Game(canvas);
game.startGame();
var nextExperience = 500 * game.player.level;