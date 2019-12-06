(function(){

	var scoreContainerWidth = null;
	var scoreContainerHeight = null;
	var globalGameContainer = null;
	function Vehicle(lane,speed){
		this.x = null;
		this.y = null;
		this.width = 60;
		this.lane = lane;
		this.height = 100;
		this.speed = speed;
		this.element = null;
		this.laneWidth = null;
		this.laneMiddle = null;
		this.containerWidth = null;
		this.containerHeight = null;

		this.init = function(gameContainer){
			this.containerWidth = gameContainer.offsetWidth;
			this.containerHeight = gameContainer.offsetHeight;
			this.laneWidth = Math.floor(gameContainer.offsetWidth / 3);
			this.laneMiddle = Math.floor(this.laneWidth / 2) - Math.floor(this.width / 2);
			this.createCar(gameContainer);
		}

		this.setPosition = function(x, y){
			this.x = x;
			this.y = y;
		}

		this.checkBoundary = function(){
			if(this.y - this.height > this.containerHeight){
				return true;
			}
		}

		this.moveCar = function(){
			this.y += this.speed;
			this.draw();
		}
		this.draw = function(){
			this.element.style.left = this.x + 'px';
			this.element.style.top = this.y + 'px';
		}
		this.createCar = function(gameContainer,laneNo){
			var vehicle = document.createElement('div');
			vehicle.style.background = 'url("./image/car1.png")';
			vehicle.style.position = 'absolute';
			vehicle.style.backgroundSize = '60px 100px';
			vehicle.style.width = this.width + 'px';
			vehicle.style.height = this.height + 'px';
			vehicle.style.transform = 'rotateZ(180deg)';
			vehicle.style.backgroundRepeat = 'no-repeat';
			
			this.setPosition((Math.floor(this.laneWidth / 2) - Math.floor(this.width / 2)) + ((lane -1) * this.laneWidth), -this.height);
			this.element = vehicle;
			gameContainer.append(vehicle);
			this.draw();
		}

	}

	var bullets = 5;

	function PlayerVehicle(gameIndex){
		this.x = null;
		this.y = null;
		this.lane = 2;
		this.width = 60;
		this.height = 100;
		this.element = null;
		this.bulletAmount = 5;
		this.laneWidth = null;
		this.laneMiddle = null;
		this.bulletElement = null
		this.containerWidth = null;
		this.containerHeight = null;
		this.bulletFiredState=false;
		this.playerIndex = gameIndex;
		this.gameFinished = false;

		var that = this;

		this.init = function(gameContainer, scoreWrapper){
			this.containerWidth = gameContainer.offsetWidth;
			this.containerHeight = gameContainer.offsetHeight;
			this.laneWidth = Math.floor(gameContainer.offsetWidth / 3);
			this.laneMiddle = Math.floor(this.laneWidth / 2) - Math.floor(this.width / 2);
			var player = document.createElement('div');
			this.element = player;
			setBackground(this, 'tank1.png');
			player.style.position = 'absolute';
			player.style.width = this.width + 'px';
			player.style.height = this.height + 'px';
			document.addEventListener("keydown",this.bottonPressed.bind(this));
			this.setPosition((Math.floor(this.containerWidth / 2) - Math.floor(this.width / 2)), (this.containerHeight - this.height));
			this.draw();
			gameContainer.append(player);
		}
		this.setBackground = function(player, path){
			player.element.style.background = 'url(./image/' + path +')';
			player.element.style.backgroundSize = '60px 100px';
			player.element.style.backgroundRepeat = 'no-repeat';
		}
		this.setPosition = function(x, y){
			this.x = x;
			this.y = y;
		}
		this.collision = function(vehicles){
			// var that.gameFinished = false;
			vehicles.forEach(function(element) {
				if (that.x < element.x + element.width &&
					that.y < element.y + element.height &&
					that.x + that.width > element.x &&
					that.y + that.height > element.y) {
						that.gameFinished = true;
						setBackground(element, 'crashedRed.png');	
						setBackground(that, 'tank1.png');
						that.draw();
				 }
			});
			if(that.gameFinished == true){
				return true;
			}else{
				return false;
			}
		}

		this.movePlayer = function(){
			this.x =((this.lane-1) * this.laneWidth) + this.laneMiddle;
			this.draw();
		}
		this.bulletFired = function(lane){
			this.bulletFiredState = true;
			this.bulletElement = new Bullet();
			this.bulletElement.init();
			this.bulletElement.createBullet(lane);
			this.bulletElement.setPosition(this.x + this.width * 0.40, (this.containerHeight - this.height));
			this.bulletElement.draw();
		}
		
		this.bottonPressed = function(event){
			if(that.gameFinished == false && this.playerIndex % 2 == 1){
				if(event.code == "ArrowLeft"){	
					if(this.lane > 1){
						this.lane--;
						this.movePlayer();
					}
				}
				if(event.code == 'ArrowRight'){
					if(this.lane < 3){
						this.lane++;
						this.movePlayer();
					}
				}
				if(event.code == 'ArrowUp'){
					{
						if(this.bulletAmount <= bullets && this.bulletAmount > 0 && this.bulletFiredState == false){
							this.bulletAmount--;
							this.bulletFiredState = true;	
							this.bulletFired(this.lane);
						}
					}
				}
			}
			else if(that.gameFinished == false && this.playerIndex % 2 == 0){
				if(event.code == "KeyA"){	
					if(this.lane > 1){
						this.lane--;
						this.movePlayer();
					}
				}
				if(event.code == 'KeyD'){
					if(this.lane < 3){
						this.lane++;
						this.movePlayer();
					}
				}
				if(event.code == 'KeyW'){
					{
						if(this.bulletAmount <= bullets && this.bulletAmount > 0 && this.bulletFiredState == false){
							this.bulletAmount--;
							this.bulletFiredState = true;	
							this.bulletFired(this.lane);
						}
					}
				}
			}
		}
		this.draw = function(){
			this.element.style.top = this.y + 'px';
			this.element.style.left = this.x + 'px';
		}
	}

	function Bullet(){
		this.element = null;
		this.x = null;
		this.y = null;
		this.width = null;
		this.height = null;
		this.speed = 5;

		var that = this;
		
		this.init = function(){
			this.width = scoreContainerWidth;
			this.height = scoreContainerHeight;
		}

		this.createBullet = function(lane){
			var bullet = document.createElement('div');
			this.element = bullet;
			bullet.style.position = 'absolute';
			bullet.style.bottom = 20 + 'px';
			bullet.style.width = this.width * 0.2 + 'px';
			bullet.style.display = 'inline-block';
			bullet.style.height = this.height * 0.1 + 'px';
			bullet.style.background = 'url(./image/bullet1.png)';
			bullet.style.backgroundRepeat = 'no-repeat';
			bullet.style.backgroundSize = 'contain';
			bullet.style.left = Math.floor(this.width / 5) * i + 'px';
			globalGameContainer.append(this.element);
		}
		this.collision = function(cars){
			for(var i = 0; i < cars.length; i++){
				if (this.x < cars[i].x + cars[i].width &&
					this.y < cars[i].y + cars[i].height &&
					this.x + (this.width * 0.2) > cars[i].x &&
					this.y + (this.height * 0.1) > cars[i].y) {
						return i;
					}
			}
		}
		this.checkBoundary = function(){
			if(that.y + this.height * 0.1 < 0){
				return true;
			}
		}
		this.setPosition = function(x, y){
			this.x = x;
			this.y = y;
		}
		this.moveBullet = function(){
			this.y -= this.speed;
			this.draw();
		}
		this.draw = function(){
			this.element.style.top = this.y  + 'px';
			this.element.style.left = this.x + 'px';
		}
	}


	
	// function Bullet(scoreContainer, gameContainer){
	// 	var bullets = [];
	// 	this.element = null;
	// 	this.x = null;
	// 	this.y = null;
	// 	this.width = null;
	// 	this.height = null;
	// 	this.speed = 0;

	// 	var that = this;
		
	// 	this.init = function(){
	// 		this.width = scoreContainer.offsetWidth;
	// 		this.height = scoreContainer.offsetHeight;
	// 	}

	// 	this.createBullet = function(i){
	// 		var bullet = document.createElement('div');
	// 		bullet.style.background = 'url(./image/bullet1.png)';
	// 		bullet.style.height = this.height * 0.1 + 'px';
	// 		bullet.style.width = this.width * 0.2 + 'px';
	// 		bullet.style.bottom = 20 + 'px';
	// 		bullet.style.backgroundSize = 'contain';
	// 		bullet.style.backgroundRepeat = 'no-repeat';
	// 		bullet.style.position = 'absolute';
	// 		bullet.style.display = 'inline-block';
	// 		bullet.style.left = Math.floor(this.width / 5) * i + 'px';
	// 		this.element = bullet;
	// 		scoreContainer.append(bullet);
	// 		return this;
	// 	}
	// 	this.collision = function(){
	// 		if (this.x < element.x + element.width &&
	// 			this.y < element.y + element.height &&
	// 			this.x + this.width > element.x &&
	// 			this.y + this.height > element.y) {

	// 			}
	// 	}
	// 	this.checkBoundary = function(){
	// 		if(this.y - this.height > this.containerHeight){
	// 			return true;
	// 		}
	// 	}
	// 	this.setPosition = function(x, y){
	// 		this.x = x;
	// 		this.y = y;
	// 	}
	// 	this.moveBullet = function(){
	// 		this.y -= speed;
	// 	}
	// 	this.draw = function(){
	// 		this.element.style.top = this.y  + 'px';
	// 		this.element.style.left = this.x + 'px';
	// 	}
	// }

	function setBackground(car, path){
		car.element.style.background = 'url(./image/' + path +')';
		car.element.style.backgroundSize = '60px 100px';
		car.element.style.backgroundRepeat = 'no-repeat';
	}

	function setParentProperties(parent){
		// parent.style.width = parent.offsetWidth < 500 ? 500 + 'px' : parent.offsetWidth;
		// parent.style.height = parent.offsetHeight < 600 ? 600 + 'px' : parent.offsetHeight;
		parent.style.height = '700px';
		parent.style.width = '500px';
		parent.style.position = 'relative';
		parent.style.backgroundColor = 'gray';
		parent.style.display = 'inline-block';
	}

	function setGameWrapperProperties(parentInc, gameWrapper){
		gameWrapper.style.float = 'left';
		gameWrapper.style.backgroundColor = 'white';
		gameWrapper.style.height = parentInc.offsetHeight + 'px';
		gameWrapper.style.width = Math.floor(parentInc.offsetWidth * 0.70) + 'px';
	}

	function setScoreWrapperProperties(parentInc, scoreWrapper){
		scoreWrapper.style.float = 'right';
		scoreWrapper.style.position = 'relative';
		scoreWrapper.style.backgroundColor = 'gray';
		scoreWrapper.style.height = parentInc.offsetHeight + 'px';
		scoreContainerWidth = Math.floor(parentInc.offsetWidth * 0.30);
		scoreContainerHeight =  parentInc.offsetHeight;
		scoreWrapper.style.width = Math.floor(parentInc.offsetWidth * 0.30) + 'px';

	}

	function setGameContainerProperties(parentInc, gameContainer){
		gameContainer.style.overflow = 'hidden';
		gameContainer.style.position = 'relative';
		gameContainer.style.background = 'url("./image/road.png")';
		gameContainer.style.backgroundSize = parentInc.offsetWidth * 0.7 + 'px ' + parentInc.offsetHeight + 'px';
		gameContainer.style.height = parentInc.offsetHeight + 'px';
		gameContainer.style.width = Math.floor(parentInc.offsetWidth * 0.70) + 'px';

	}
	
	function setBackgroundWrapperProperties(parentInc, backgroundWrapper){
		backgroundWrapper.style.top = 0;
		backgroundWrapper.style.left = 0;
		backgroundWrapper.style.overflow = 'hidden';
		backgroundWrapper.style.position = 'absolute';
		backgroundWrapper.style.width = parentInc.offsetWidth + 'px';
	}

	function setScoreContainerProperties(parentInc, scoreBoard){
		scoreBoard.style.height = '50%';
		scoreBoard.style.width = '100%';
		scoreBoard.style.backgroundColor = 'green';
		scoreBoard.style.boxSizing = 'border-box';
	}

	function getRandomInt(min, max) {
		min = Math.floor(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
	}
	function createButton(button, text){
		button.style.width = '100%';
		button.style.height = '50px';
		button.style.color = 'white';
		button.style.backgroundColor = 'blue';
		button.style.boxSizing = 'border-box';
		button.innerHTML = text;
	}

	function Game(parentElement, gameIndex){
		var GameIncrement = 0;
		var vehicles = [];
		var increment = 3;
		this.speed = 10;
		this.score = null;
		this.player = null;
		this.highScore = null;
		var myHighScore = null;
		this.gameStart = false;
		this.gameWrapper = null;
		this.imageSlider = null;
		this.scoreWrapper = null;
		this.gameContainer = null;
		this.gameIndex = gameIndex;
		this.parentElement = parentElement;
		this.parentWidth = parentElement.offsetWidth;
		this.parentHeight = parentElement.offsetHeight;
		var position = 0;
		var flag = true;
		
		var that = this;

		this.init = function(){
			var temp = document.createElement('p');
			var score = document.createElement('p');
			var highScore = document.createElement('p');
			var option = document.createElement('div');
			var scoreBoard = document.createElement('div');
			var startBtn = document.createElement('button');
			var resetBtn = document.createElement('button');
			var gameWrapper = document.createElement('div');
			var scoreWrapper = document.createElement('div');
			var gameContainer = document.createElement('div');
			var backgroundWrapper = document.createElement('div');
			setParentProperties(this.parentElement);
			setGameContainerProperties(this.parentElement, gameContainer);
			setGameWrapperProperties(this.parentElement, gameWrapper);
			setScoreWrapperProperties(this.parentElement, scoreWrapper);
			setBackgroundWrapperProperties(gameContainer, backgroundWrapper);
			setScoreContainerProperties(scoreWrapper, scoreBoard);
			this.score = score;
			this.highScore = highScore;
			this.gameWrapper = gameWrapper;
			this.scoreWrapper = scoreWrapper;
			this.gameContainer = gameContainer;
			this.parentElement.append(gameWrapper);
			this.parentElement.append(scoreWrapper);
			this.gameWrapper.append(gameContainer);
			this.gameContainer.append(backgroundWrapper);
			globalGameContainer = gameContainer;
			temp.innerHTML = 'Score:';
			temp.style.fontSize = 40 + 'px';
			score.innerHTML = 0;
			score.style.textAlign = 'center';
			score.style.fontSize = 60 + 'px';
			score.style.paddingTop = 40 + 'px';
			scoreBoard.append(temp);
			scoreBoard.append(score);
			temp = document.createElement('p');
			temp.innerHTML = 'High Score:';
			temp.style.fontSize = 30 + 'px';
			highScore.style.fontSize = 40 + 'px';
			highScore.style.textAlign = 'center';
			scoreBoard.append(temp);
			scoreBoard.append(highScore);
			highScore.innerHTML = myHighScore;

			createButton(startBtn, 'Start Game');
			createButton(resetBtn, 'Reset');
			startBtn.onclick = function(){that.startGame();};
			resetBtn.onclick = function(){that.resetGame();};

			// startBtn.onclick = this.startGame.bind(this);
			resetBtn.onclick = this.resetGame.bind(this);
			this.scoreWrapper.append(scoreBoard);
			this.scoreWrapper.append(startBtn);
			this.scoreWrapper.append(resetBtn);

			var player = new PlayerVehicle(this.gameIndex);
			player.init(this.gameContainer, this.scoreWrapper);
			this.player = player;
			var vehicle = new Vehicle(getRandomInt(1, 4), that.speed);
			vehicle.init(this.gameContainer);
			vehicles.push(vehicle);



			// this.startGame();
		}

		this.startGame= function(){
			if(this.gameStart == false){
				this.gameInterval = setInterval(function(){
					that.gameContinue();
					that.newCars();
					GameIncrement += 1 ;
				},40 - increment);
				this.gameStart = true;	
			}
		}
		this.resetGame = function(){
			flag = true;
			position = 0;
			increment = 3;
			this.speed = 10;
			this.gameStart = false;
			for(var i = vehicles.length-1; i>= 0; i--) {
				that.gameContainer.removeChild(vehicles[i].element);
				vehicles.pop();
			}
			this.parentElement.innerHTML = '';
			this.init();
		}

		this.gameContinue = function() {
			if(this.player.gameFinished == true){
				clearInterval(this.gameInterval);
			}else{
				this.player.movePlayer();
				if(this.player.collision(vehicles) == true){
					this.player.gameFinished = true;
					if(that.score.innerHTML > that.highScore.innerHTML){
						that.highScore.innerHTML = that.score.innerHTML;
						myHighScore = that.score.innerHTML;
					}
				}
				if(this.player.bulletFiredState == true){
					that.player.bulletElement.speed += 1;
					that.player.bulletElement.moveBullet();
					if(that.player.bulletElement.checkBoundary())
						{
							that.gameContainer.removeChild(this.player.bulletElement.element);
							that.player.bulletFiredState = false;
						}
					var bulletCollision = that.player.bulletElement.collision(vehicles);
					if(bulletCollision != null){
						that.gameContainer.removeChild(this.player.bulletElement.element);
						this.gameContainer.removeChild(vehicles[bulletCollision].element);
						vehicles.splice(bulletCollision, 1);
						that.player.bulletFiredState = false;
						this.score.innerHTML++;
					}
				}
				for(var i = 0; i< vehicles.length; i++){
					vehicles[i].moveCar();
					if(vehicles[i].checkBoundary() == true){
						that.gameContainer.removeChild(vehicles[i].element);
						this.score.innerHTML++;
						vehicles.shift();
						break;
					}
				}
				position += increment;
				this.gameContainer.style.backgroundPositionY=position+"px";////////////////////////////////////////////////
				if(this.score.innerHTML % 5 == 0 && this.score.innerHTML != 0){
					if(flag == true){
						this.speed += 1;
						increment++;
						vehicles.forEach(function(el) {
							el.speed = that.speed;
						});
						flag = false;
					}
				}
				this.newCars = function(){
					if(vehicles.length > 0)
					{newCar = vehicles[vehicles.length - 1].y > (this.player.height * 2.5) || vehicles.length == 0 ? true : false;}
					if(newCar == true){
						var vehicle = new Vehicle(getRandomInt(1, 4), that.speed);
						vehicle.init(this.gameContainer);
						vehicles.push(vehicle);
					}
				}	
				if(flag == false && this.score.innerHTML % 5 > 1){
					flag = true;
				}
				if(GameIncrement % 150 == 0 && GameIncrement != 0){
					if(this.player.bulletAmount <=bullets){
						this.player.bulletAmount++;
						console.log('bullet amount :',this.player.bulletAmount);
					}
				}
			}
		}

	}

	var carLanes = document.getElementsByClassName('carLane');
	for(var i = 0; i< carLanes.length; i++){
			new Game(carLanes[i], i).init();
	}
})();