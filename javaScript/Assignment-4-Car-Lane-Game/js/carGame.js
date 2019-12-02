(function(){
	var position = 0;
	var speed = 10;
	var flag = true;
	var gameFinished = false;

	function Vehicle(lane){
		this.x = null;
		this.y = null;
		this.lane = lane;
		this.speed = speed;
		this.width = 60;
		this.height = 100;
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
			vehicle.style.background = 'url("./image/car.png")';
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

	function PlayerVehicle(){
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
		var that = this;

		// this.vehicleType = [{'type': 'car', 'width': '50px', 'height': '100px'}];

		this.init = function(gameContainer){
			this.containerWidth = gameContainer.offsetWidth;
			this.containerHeight = gameContainer.offsetHeight;
			this.laneWidth = Math.floor(gameContainer.offsetWidth / 3);
			this.laneMiddle = Math.floor(this.laneWidth / 2) - Math.floor(this.width / 2);
			var player = document.createElement('div');
			player.style.background = 'url("./image/car.png")';
			player.style.backgroundSize = '60px 100px';
			player.style.backgroundRepeat = 'no-repeat';
			player.style.position = 'absolute';
			player.style.width = this.width + 'px';
			player.style.height = this.height + 'px';
			document.addEventListener("keydown",this.bottonPressed.bind(this));
			this.element = player;
			this.setPosition((Math.floor(this.containerWidth / 2) - Math.floor(this.width / 2)), (this.containerHeight - this.height));
			this.draw();
			gameContainer.append(player);
		}

		this.setPosition = function(x, y){
			this.x = x;
			this.y = y;
		}

		this.collision = function(vehicles){
			var collided = false;
			vehicles.forEach(function(element) {
				if (that.x < element.x + element.width &&
					that.x + that.width > element.x &&
					that.y < element.y + element.height &&
					that.y + that.height > element.y) {
						collided = true;
				 }
			});
			if(collided == true){
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
			console.log(event.which);
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
	}

	function setParentProperties(parent){
		parent.style.backgroundColor = 'blue';
		// parent.style.width = parent.offsetWidth < 500 ? 500 + 'px' : parent.offsetWidth;
		// parent.style.height = parent.offsetHeight < 600 ? 600 + 'px' : parent.offsetHeight;
		parent.style.height = '700px';
		parent.style.width = '600px';
		parent.style.position = 'relative';
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
		scoreWrapper.style.backgroundColor = 'black';
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
		// gameContainer.style.backgroundSize = parentInc.containerWidth +'px' + 'auto';
		// gameContainer.style.backgroundSize = 'par' + parentInc.containerHeight + 'px';

	}

	function setBackgroundWrapperProperties(parentInc, backgroundWrapper){
		backgroundWrapper.style.top = 0;
		backgroundWrapper.style.left = 0;
		backgroundWrapper.style.overflow = 'hidden';
		backgroundWrapper.style.position = 'absolute';
		backgroundWrapper.style.width = parentInc.offsetWidth + 'px';
	}

	function setScoreContainerProperties(scoreWrapper, scoreBoard){
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

	function Game(parentElement, gameIndex){
		var vehicles = [];
		var increment = 3;
		var gameInterval = null;
		this.score = null;
		this.player = null;
		this.gameWrapper = null;
		this.imageSlider = null;
		this.scoreWrapper = null;
		this.gameContainer = null;
		this.gameIndex = gameIndex;
		this.parentElement = parentElement;
		this.parentWidth = parentElement.offsetWidth;
		this.parentHeight = parentElement.offsetHeight;
		
		var that = this;

		this.init = function(){
			var score = document.createElement('p');
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
			this.gameWrapper = gameWrapper;
			this.scoreWrapper = scoreWrapper;
			this.gameContainer = gameContainer;
			this.parentElement.append(gameWrapper);
			this.parentElement.append(scoreWrapper);
			this.gameWrapper.append(gameContainer);
			this.gameContainer.append(backgroundWrapper);

			score.innerHTML = 0;
			score.style.textAlign = 'center';
			score.style.fontSize = 60 + 'px';
			score.style.paddingTop = 40 + 'px';
			scoreBoard.append(score);
			this.scoreWrapper.append(scoreBoard);

			var player = new PlayerVehicle(this.gameContainer);
			player.init(this.gameContainer);
			this.player = player;

			var vehicle = new Vehicle();
			vehicle.init(this.gameContainer);
			vehicles.push(vehicle);

			this.startGame();
		}

		this.startGame= function(){
			this.gameInterval = setInterval(function(){
				that.gameContinue();
				that.newCars();
			},40 - increment);
		}

		this.gameContinue = function() {
			if(gameFinished == true){
				clearInterval(this.gameInterval);
				this.resetGame();
			}else{
				this.player.movePlayer();
				if(this.player.collision(vehicles) == true){
					gameFinished = true;
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
				this.gameContainer.style.backgroundPositionY=position+"px";
				if(this.score.innerHTML % 5 == 0 && this.score.innerHTML != 0){
					if(flag == true){
						speed += 1;
						increment += 2;
						vehicles.forEach(function(el) {
							el.speed = speed;
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
			newCar = vehicles[vehicles.length - 1].y > 150 ? true : false;
			if(newCar == true){
				var vehicle = new Vehicle(getRandomInt(1, 4));
				vehicle.init(this.gameContainer);
				vehicles.push(vehicle);
			}
		}
		this.resetGame = function(){
		}
	}

	var carLanes = document.getElementsByClassName('carLane');
	for(var i = 0; i< carLanes.length; i++){
			new Game(carLanes[i], i).init();
	}
})();