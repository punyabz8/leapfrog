function Game(canvas){
	var that = this;
	this.map = null;
	this.frames = 0;
	this.traps = [];
	this.enemies = [];
	this.gameCoin = 0;
	this.gameLevel = -1;	//current level in game
	this.player = null;		//player holder
	this.obstacles = [];
	this.experience = 0;
	this.background = null;
	this.viewControl = null;
	this.mouse = {x: 0, y: 0};
	this.parentElement = canvas;
	this.powerScrollLeft = null;
	this.powerScrollRight = null;
	this.powerScrollingState = true;
	this.ctx = canvas.getContext('2d');
	this.nextLevelMessage = null;
	this.nextLevelMessageCooldown = 300;

	this.init = function(){
		canvas.width = gameWidth;
		canvas.height = gameHeight;
		// canvas.style.margin = '0 10%';
		this.background = new Background(this.ctx);
		document.addEventListener('keydown', function(event){
			keyPressed[event.key] = true;
		},true);
		document.addEventListener('keyup', function(event){
			keyPressed[event.key] = false;
		});
		canvas.onmousedown = this.mouseDownHandler.bind(this);
		canvas.onmouseup = this.mouseUpHandler.bind(this);
		toggleShadow(this.ctx);
		var player = new Player(this.ctx);
		this.player = player;
		this.player.init(this.ctx);
		this.animate();
	}


	this.startGame = function(){
		if(this.gameLevel >= 0){
			redeclareImageSource();
			this.map = new Map(this.ctx, gameFlags.firstTimeMapLoad);
			this.map.init(this.gameLevel);
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
			this.background.draw(0);
			this.map.draw();
			this.player.draw();
			gameFlags.firstTimeMapLoad = false;
		}else{
			redeclareImageSource();
			this.background.draw(1);
		}
	}

	this.animate = function(){
		this.ctx.clearRect(0, 0, gameWidth, gameHeight);
		if(gameFlags.firstTimeMapLoad == true){
			this.startGame();
			gameFlags.firstTimeMapLoad = false;
		}
		if(this.gameLevel >= 0){
			backgroundSong.pause();

			this.ctx.save();
			//translate for viewport adjustment
			this.ctx.translate(-viewControl.x,-viewControl.y);		
			this.background.draw(0);

			if(gameFlags.levelComplete == false && gameFlags.gameOver == false){
				for(var i = 0; i < this.obstacles.length; i++){
					this.obstacles[i].update();
				}
				for(var i = 0; i < this.traps.length; i++){
					this.traps[i].update();
				}
				if(this.enemies.length <= 0){
					gameFlags.levelComplete = true;
				}
				for(var i = 0; i < this.enemies.length; i++){
					this.enemies[i].update(this.obstacles);
				}
				this.player.update(this.obstacles, this.enemies, this.traps);
				// Delete dead enemies
				for(var i = this.enemies.length - 1; i >= 0; i--)
				{
					if(this.enemies[i].hitPoint <= 0){
						this.player.updateCoinAndExp(this.enemies[i].coinOnDead, this.enemies[i].expPoint);
						//Increase player health on enemy death when bloodlust skill is active
						if(this.player.skill.skillFlags.bloodLust == true){
							this.player.hitPoint += Math.floor(this.player.skill.bloodLustHealth * this.enemies[i].maxHealth);
							if(this.player.hitPoint >= this.player.maxHealth){
								this.player.hitPoint = this.player.maxHealth;
							}
						}
						this.enemies.splice(i, 1);
						var temp = i;
						//remove enemy from currently loaded tile map
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
			}else if(gameFlags.levelComplete == true && gameFlags.gameOver == false){
				// Do not update elements if power boost menu pop Up
				if(this.player.playerFlags.levelChangedStatus == true){
					this.powerUpMenu();
				}else{
					//If all levels are completed finish game
					if(gameFlags.gameFinished == true){
						this.gameFinishedScreen();
						this.player.checkPlayerState();
						buttonClickedSound.play();
					}else{
						if(this.player.hitPoint <= 0){
							gameFlags.gameOver = true;
						}
						if(gameFlags.nextLevel == true){
							this.prepareNextLevel();
						}
						for(var i = 0; i < this.obstacles.length; i++){
							this.ctx.beginPath();
							this.obstacles[i].update();
						}
						for(var i = 0; i < this.traps.length; i++){
							this.traps[i].update();
						}
						this.player.update(this.obstacles, this.enemies, this.traps);
					}
				}
			}else{
				for(var i = 0; i < this.obstacles.length; i++){
					this.obstacles[i].update();
				}
				for(var i = 0; i < this.traps.length; i++){
					this.traps[i].update();
				}
				if(this.gameOverScreen()){
					this.resetGame();
					this.gameLevel = -1;
				}
			}
			this.ctx.restore();
		}else{
			backgroundSong.play();
			this.background.draw(1);
			toggleShadow(this.ctx);
			this.playButton();
			toggleShadow(this.ctx);
			if(keyPressed[0] == true && this.mouse.x > (gameWidth / 2 - 50) && this.mouse.x < (gameWidth / 2 - 50) + 100 && this.mouse.y > gameHeight - gameHeight / 6 && this.mouse.y < (gameHeight - gameHeight / 6) + 50){
				this.gameLevel = 0;
				buttonClickedSound.play();
				gameFlags.firstTimeMapLoad = true;
			}
		}
		frames++;
		if(frames % 5000 == 0){
			console.clear();
		}
		requestAnimationFrame(that.animate.bind(this));
	}

	this.playButton = function(){
		
		this.ctx.fillStyle = 'green';
		this.ctx.fillRect(gameWidth / 2 - 50, gameHeight - gameHeight / 6, 100, 50);
		createTextField(this.ctx, '25px serif', 'Start', 'white', (gameWidth / 2) - 25, (gameHeight - gameHeight / 6 ) + 30, 50);
		createTextStrokeField(this.ctx, '30px serif','5', 'Time to begin the adventure to strike monsters', 'black', (gameWidth / 8) - 25, (gameHeight / 6 ), 450);
		createTextField(this.ctx, '30px serif', 'Time to begin the adventure to strike monsters', 'white', (gameWidth / 8) - 25, (gameHeight / 6 ), 450, 450);

	}
	this.powerUpMenu = function(){
		this.ctx.fillStyle = '#111111';
		this.ctx.fillRect(viewControl.x, viewControl.y, gameWidth, gameHeight);
		this.ctx.fillStyle = '#102cc9';
		this.ctx.fillRect(viewControl.x, viewControl.y + 100, gameWidth, 50);
		toggleShadow(this.ctx);
		createTextField(this.ctx, '30px serif', 'Select your new ability', 'white', viewControl.x + 150, viewControl.y + 130, 200);
		toggleShadow(this.ctx);
		createStrokeRectangle(this.ctx, 'green', viewControl.x + 100, viewControl.y + 450, 130, 130, 10);
		createStrokeRectangle(this.ctx, 'green', viewControl.x + 300, viewControl.y + 450, 130, 130, 10);
		if(this.powerScrollingState == true){
			this.powerScrollLeft = getRandomInt(this.player.skill.skillList.length);
			do{
				this.powerScrollRight = getRandomInt(this.player.skill.skillList.length);
			}while(this.powerScrollLeft == this.powerScrollRight);
			this.powerScrollingState = false;
			if(this.player.skill.skillList[this.powerScrollLeft] == 'poisonBoost' || this.player.skill.skillList[this.powerScrollRight] == 'poisonBoost'){
				if(this.player.skill.skillFlags.poison == false){
					this.powerScrollingState = true;
				}
			}
			if(this.player.skill.skillList[this.powerScrollLeft] == 'criticalBoost' || this.player.skill.skillList[this.powerScrollRight] == 'criticalBoost'){
				if(this.player.skill.skillFlags.criticalMaster == false){
					this.powerScrollingState = true;
				}
			}
			if(this.checkSkillActiveState(this.powerScrollLeft, this.powerScrollRight, 'rage')){
				this.powerScrollingState = true;
			}
			if(this.checkSkillActiveState(this.powerScrollLeft, this.powerScrollRight, 'douge')){
				this.powerScrollingState = true;
			}
			if(this.checkSkillActiveState(this.powerScrollLeft, this.powerScrollRight, 'poison')){
				this.powerScrollingState = true;
			}
			if(this.checkSkillActiveState(this.powerScrollLeft, this.powerScrollRight, 'bloodLust')){
				this.powerScrollingState = true;
			}
			if(this.checkSkillActiveState(this.powerScrollLeft, this.powerScrollRight, 'speedBoost')){
				this.powerScrollingState = true;
			}
			if(this.checkSkillActiveState(this.powerScrollLeft, this.powerScrollRight, 'waterWalking')){
				this.powerScrollingState = true;
			}
			if(this.checkSkillActiveState(this.powerScrollLeft, this.powerScrollRight, 'criticalMaster')){
				this.powerScrollingState = true;
			}
		}
		createTextField(this.ctx, '20px serif', this.player.skill.skillList[this.powerScrollLeft], 'white', 115, viewControl.y + 425, 100);
		createTextField(this.ctx, '20px serif', this.player.skill.skillList[this.powerScrollRight], 'white', 315, viewControl.y +  425, 100);
		toggleShadow(this.ctx);
		this.ctx.drawImage(powerUpImg[this.powerScrollLeft], viewControl.x + 105, viewControl.y + 455, 120, 120);
		this.ctx.drawImage(powerUpImg[this.powerScrollRight], viewControl.x + 305, viewControl.y + 455, 120, 120);
		toggleShadow(this.ctx);
		if(keyPressed[0] == true && this.mouse.x > 100 && this.mouse.x < 220 && this.mouse.y > 450 && this.mouse.y < 570){
			buttonClickedSound.play();
			this.powerScrollingState = true;
			this.player.playerFlags.levelChangedStatus = false;
			this.player.addSkill(this.player.skill.skillList[this.powerScrollLeft]);
			this.nextLevelMessage = 'You have aquired skill ' + this.player.skill.skillList[this.powerScrollLeft];
		}else if(keyPressed[0] == true && this.mouse.x > 300 && this.mouse.x < 420 && this.mouse.y > 450 && this.mouse.y < 570){
			buttonClickedSound.play();
			this.powerScrollingState = true;
			this.player.playerFlags.levelChangedStatus = false;
			this.player.addSkill(this.player.skill.skillList[this.powerScrollRight]);
			this.nextLevelMessage = 'You have aquired skill ' + this.player.skill.skillList[this.powerScrollLeft];
		}
	}
	//Check given skill is active or not as well as left and right have same skill
	this.checkSkillActiveState = function(left, right, skillName){
		if(this.player.skill.skillList[left] == skillName || this.player.skill.skillList[right] == skillName){
			if(this.player.skill.skillFlags[skillName] == true){
				return true;
			}
		}
	}
	this.gameOverScreen = function(){
		createRectangle(this.ctx, 'black', viewControl.x, viewControl.y, gameWidth, gameHeight);
		createTextStrokeField(this.ctx, '50px serif','3', 'Game Over', 'red', viewControl.x + (gameWidth / 2) - 120, viewControl.y + gameHeight / 2, 300);
		createTextField(this.ctx, '50px serif', 'Game Over', 'white', viewControl.x + (gameWidth / 2) - 123, viewControl.y +  gameHeight / 2, 300);
		createTextField(this.ctx, '15px serif', 'Click anywhere to go to main menu', 'white', viewControl.x + (gameWidth / 2) - 123, viewControl.y +  gameHeight - 100, 300);
		createTextField(this.ctx, '30px serif', 'You have reached Level ' + this.gameLevel + ' in this Adventure', 'white', viewControl.x + (gameWidth / 2) - 170, viewControl.y +  gameHeight / 2 + 50, 300);
		if(keyPressed[0] == true){
			buttonClickedSound.play();
			return true;
		}
	}
	this.gameFinishedScreen = function(){
		backgroundSong.play();
		// createRectangle(this.ctx, 'black', viewControl.x, viewControl.y, gameWidth, gameHeight);
		this.ctx.drawImage(gameFinishedImg, viewControl.x, viewControl.y, gameWidth, gameHeight);
		createTextStrokeField(this.ctx, '60px serif','6', 'Congrats on completing all the Levels', 'black', viewControl.x + (gameWidth / 2) - 170, viewControl.y + gameHeight / 2 - 100, 400);
		createTextField(this.ctx, '60px serif', 'Congrats on completing all the Levels', 'yellow', viewControl.x + (gameWidth / 2) - 174, viewControl.y +  gameHeight / 2 - 100, 400);
		createTextField(this.ctx, '15px serif', 'Click anywhere to go to main menu', 'white', viewControl.x + (gameWidth / 2) - 123, viewControl.y +  gameHeight - 100, 300);
		createTextField(this.ctx, '30px serif', '"Now you are a qualified Adventurer"', 'green', viewControl.x + (gameWidth / 2) - 150, viewControl.y +  gameHeight / 2 + 50, 300);
		if(keyPressed[0] == true){
			this.resetGame();
		}
	}
	this.prepareNextLevel = function(){
		this.resetMap();
		gameFlags = {
			levelComplete: false,
			gameOver: false,
			nextLevel: false,
			firstTimeMapLoad: true,
			gameFinished: false
		};
		this.player.x = gameWidth / 2;
		this.player.y = mapInfo.y - 300;   // starting position of hero
		viewControl.y = mapInfo.y - gameHeight;
		this.player.spirit.y = mapInfo.y - 300;
		this.player.spirit.x = gameWidth / 2 - 100;
		this.gameLevel++;
		if(this.gameLevel % mapLevels.length == 0){
			gameFlags.gameFinished = true;
		}
	}
	//Called upon level complete
	this.resetMap = function(){
		//call skillAdd function()
		this.map = null;
		this.traps = [];
		this.enemies = [];
		this.obstacles = [];
	}
	//Called when game is over
	this.resetGame = function(){
		this.gameCoin += this.player.coin;
		this.map = null;
		this.traps = [];
		this.enemies = [];
		this.obstacles = [];
		this.gameLevel = -1;
		resetGlobalVariables();
		this.player.resetPlayer();
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
// if(assetsLoaded == true){
	game.init();
// }