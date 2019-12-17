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
	gameOver: false,
	nextLevel: false,
	firstTimeMapLoad: true
}
var img = new Image();
img.src = './assets/images/background1.png';

var arrowImg = new Image();
arrowImg.src = './assets/images/arrow.png';

var loadingImg = new Image();
loadingImg.src = './assets/images/loading.png';

var imagesObstacles = [];
var imagesEnemies = [];
var imagesTraps = ['caltrop.png'];


function Game(canvas){
	var that = this;
	this.map = null;
	this.frames = 0;
	this.traps = [];
	this.enemies = [];
	this.gameCoin = 0;
	this.gameLevel = 0;		//current level in game
	this.player = null;		//player holder
	this.obstacles = [];
	this.experience = 0;
	this.background = null;
	this.viewControl = null;
	this.mouse = {x: 0, y: 0};
	this.experienceBar = null;
	this.parentElement = canvas;
	this.ctx = canvas.getContext('2d');

	this.init = function(){
		canvas.width = gameWidth;
		canvas.height = gameHeight;
		canvas.style.margin = '0 10%';
		this.background = new Background(this.ctx);
		this.experienceBar = new ExperienceBar(this.ctx);

		document.addEventListener('keydown', function(event){
			keyPressed[event.key] = true;
		},true);
		document.addEventListener('keyup', function(event){
			keyPressed[event.key] = false;

		});

		canvas.onclick = this.mouseDownHandler.bind(this);
		canvas.onmouseup = this.mouseUpHandler.bind(this);
		toggleShadow(this.ctx);
		this.startGame();
	}





	this.startGame = function(){
		console.log('Game Started');
		// this.init();
		var player = new Player(this.ctx);
		this.player = player;
		this.map = new Map(this.ctx, gameFlags.firstTimeMapLoad);
		this.map.init(1);
		this.map.setMapTIles(this.player);
		for(var i = 0; i < this.map.tileMap.length; i++){
			for(var j = 0; j < this.map.tileMap[i].length; j++){
				if(this.map.tileMap[i][j] >= 1 && this.map.tileMap[i][j] <= 10){
					this.obstacles.push(this.map.mapWithObjects[i][j]);
				}
				if(this.map.tileMap[i][j] >= 11 && this.map.tileMap[i][j] <= 20){
					this.enemies.push(this.map.mapWithObjects[i][j]);
				}
				if(this.map.tileMap[i][j] >= 21 && this.map.tileMap[i][j] <= 30){
					this.traps.push(this.map.mapWithObjects[i][j]);
				}
			}
		}
		this.background.draw();
		this.map.draw();
		this.player.init(this.enemies, this.obstacles);
		gameFlags.firstTimeMapLoad = false;
		this.animate();
	}

	this.animate = function(){
		this.ctx.clearRect(0, 0, gameWidth, gameHeight);
		this.ctx.save();
		this.ctx.translate(-viewControl.x,-viewControl.y);		//translate for viewport adjustment
		this.background.draw();	//draw backgroud image

		if(gameFlags.levelComplete == false && gameFlags.gameOver == false){
			for(var i = 0; i < this.obstacles.length; i++){
				this.obstacles[i].update();
			}
			for(var i = 0; i < this.traps.length; i++){
				this.traps[i].update();
			}
			for(var i = 0; i < this.enemies.length; i++){
				this.enemies[i].update(this.obstacles);	//update enemies position
			}
			// this.map.draw();
			this.player.update(this.obstacles, this.enemies, gameFlags.levelComplete, this.traps);	//Update player position
			// Delete dead enemies
			for(var i = this.enemies.length - 1; i >= 0; i--)
			{
				if(this.enemies[i].hitPoint <= 0){
					this.player.updateCoinAndExp(this.enemies[i].coinOnDead, this.enemies[i].expPoint);
					this.enemies.splice(i, 1);
					var temp = i;
					for(var k = 0; k < this.map.tileMap.length; k++){
						for(var j = 0; j < this.map.tileMap[k].length; j++){
							if(this.map.tileMap[k][j] == 11){
								if(temp == 0){
									this.map.mapWithObjects[k][j] = 0;
									this.map.tileMap[k][j] = 0;
								}
								temp--;
							}
						}
					}
				}
			}
			if(this.player.hitPoint <= 0){
				gameFlags.gameOver = true;
			}
			this.experienceBar.updateExperienceBar(this.player.expPoint, this.player.level);
		}else if(gameFlags.levelComplete == true && gameFlags.gameOver == false){
			if(this.player.hitPoint <= 0){
				gameFlags.gameOver = true;
			}
			for(var i = 0; i < this.obstacles.length; i++){
				this.ctx.beginPath();
				this.obstacles[i].update();
			}
			for(var i = 0; i < this.traps.length; i++){
				this.traps[i].update();
			}
			// this.map.draw();
			this.player.update(this.obstacles, this.enemies, gameFlags.levelComplete, this.traps);	//Update player position
			if(gameFlags.nextLevel == true){
				this.prepareNextLevel();
			}
			this.experienceBar.updateExperienceBar(this.player.expPoint, this.player.level);
			console.log('Level Complete');
		}else{
			// this.map.draw();
			for(var i = 0; i < this.obstacles.length; i++){
				this.obstacles[i].update();
			}
			for(var i = 0; i < this.traps.length; i++){
				this.traps[i].update();
			}
			console.log('Game Over');
		}
		frames++;
		this.ctx.restore();
		requestAnimationFrame(function(){that.animate()});
		if(frames % 5000 == 0){
			console.clear();
		}
	}
	this.playerExperienceBar = function(playerExperience){

	}

	this.keyPressed = function(event){
		this.player.keyPressed(event);
	}

	this.prepareNextLevel = function(){
		this.gameLevel++;
		var gameFlags = {
			levelComplete: false,
			gameOver: false,
			nextLevel: false,
			firstTimeMapLoad: true
		}
	}

	this.resetMap = function(){
		//call skillAdd function()
		this.traps = [];
		this.enemies = [];
		this.obstacles = [];
		this.player = null;		//player holder
		this.map = null;
	}

	this.resetGame = function(){

	}

	this.mouseDownHandler = function(event){
		keyPressed[event.button] = true;
		this.mouse.x = event.offsetX;
		this.mouse.y = event.offsetY;
	}
	this.mouseUpHandler = function(event){
		keyPressed[event.button] = false;
	}
}


var canvas = document.getElementById('myGame');
var game = new Game(canvas);
game.init();

var nextExperience = 500 * game.player.level;