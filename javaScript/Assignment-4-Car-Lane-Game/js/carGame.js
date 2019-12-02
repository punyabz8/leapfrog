(function(){


	function Vehicle(lane,speed){
		this.x = null;
		this.y = null;
		this.lane = lane;
		this.width = 60;
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

	function PlayerVehicle(gameIndex){
		this.x = null;
		this.y = null;
		this.lane = 2;
		this.width = 60;
		this.height = 100;
		this.element = null;
		this.laneWidth = null;
		this.laneMiddle = null;
		this.containerWidth = null;
		this.containerHeight = null;
		this.playerIndex = gameIndex;
		var gameFinished = false;

		var that = this;

		// this.vehicleType = [{'type': 'car', 'width': '50px', 'height': '100px'}];

		this.init = function(gameContainer){
			this.containerWidth = gameContainer.offsetWidth;
			this.containerHeight = gameContainer.offsetHeight;
			this.laneWidth = Math.floor(gameContainer.offsetWidth / 3);
			this.laneMiddle = Math.floor(this.laneWidth / 2) - Math.floor(this.width / 2);
			var player = document.createElement('div');
			this.element = player;
			setBackground(this, 'car.png');
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
			// var gameFinished = false;
			vehicles.forEach(function(element) {
				if (that.x < element.x + element.width &&
					that.y < element.y + element.height &&
					that.x + that.width > element.x &&
					that.y + that.height > element.y) {
						gameFinished = true;
						setBackground(element, 'crashedRed.png');	
						setBackground(that, 'crashed.png');
						that.draw();
				 }
			});
			if(gameFinished == true){
				return true;
			}else{
				return false;
			}
		}

		this.movePlayer = function(){
			this.x =((this.lane-1) * this.laneWidth) + this.laneMiddle;
			this.draw();
		}
		this.draw = function(){
			this.element.style.top = this.y + 'px';
			this.element.style.left = this.x + 'px';
		}

		this.bottonPressed = function(event){
			if(gameFinished == false && this.playerIndex % 2 == 1){
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
			}
			else if(gameFinished == false && this.playerIndex % 2 == 0){
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
			}
		}
	}

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
		// parent.style.margin = '0 auto';
	}

	function setGameWrapperProperties(parentInc, gameWrapper){
		gameWrapper.style.float = 'left';
		gameWrapper.style.backgroundColor = 'white';
		gameWrapper.style.height = parentInc.offsetHeight + 'px';
		gameWrapper.style.width = Math.floor(parentInc.offsetWidth * 0.70) + 'px';
	}

	function setScoreWrapperProperties(parentInc, scoreWrapper){
		scoreWrapper.style.float = 'right';
		scoreWrapper.style.backgroundColor = 'gray';
		scoreWrapper.style.height = parentInc.offsetHeight + 'px';
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
			player.init(this.gameContainer);
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
				if(flag == false && this.score.innerHTML % 5 > 1){
					flag = true;
				}
			}
		}
		this.newCars = function(){
			newCar = vehicles[vehicles.length - 1].y > (this.player.height * 2.5) ? true : false;
			if(newCar == true){
				var vehicle = new Vehicle(getRandomInt(1, 4), that.speed);
				vehicle.init(this.gameContainer);
				vehicles.push(vehicle);
			}
		}
	}

	var carLanes = document.getElementsByClassName('carLane');
	for(var i = 0; i< carLanes.length; i++){
			new Game(carLanes[i], i).init();
	}
})();