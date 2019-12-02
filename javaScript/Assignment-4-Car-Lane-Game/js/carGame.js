var position=0;
(function(){
	function Vehicle(parentElement){
		this.x = null;
		this.y = null;
		this.lane = null;
		this.speed = null;
		this.width = null;
		this.height = 60;
		this.element = 100;
		// this.vehicleType = [{'type': 'car', 'width': '50px', 'height': '100px'},
		// {'type': 'bus', 'width': '50px', 'height': '120px'},
		// {'type': 'jeep', 'width': '50px', 'height': '110px'}];

		this.init = function(){
			// this.vehicleType = Math.randomInt(3);

		}

		this.setPosition = function(x, y){
			this.x = x;
			this.y = y;
		}

		this.collision = function(){
			//collision detection
		}

		this.checkBoundary = function(width, height){
			if(this.y > height){
				//do something to obstacle
			}
		}

		this.moveCar = function(){
			this.y += this.speed;
			this.draw();
		}

		this.draw = function(){
			this.element.style.top = this.y + 'px';
		}
	}

	function PlayerVehicle(){
		this.x = null;
		this.y = null;
		this.lane = 2;
		this.width = 80;
		this.height = 120;
		this.element = null;
		this.laneWidth = null;
		this.laneMiddle = null;
		this.containerWidth = null;
		this.containerHeight = null;

		this.vehicleType = [{'type': 'car', 'width': '50px', 'height': '100px'}];

		this.init = function(gameContainer){
			this.containerWidth = gameContainer.offsetWidth;
			this.containerHeight = gameContainer.offsetHeight;
			this.laneWidth = Math.floor(gameContainer.offsetWidth / 3);
			this.laneMiddle = Math.floor(this.laneWidth / 2) - Math.floor(this.width / 2);
			console.log(this.laneWidth);
			console.log(this.laneMiddle);
			var player = document.createElement('div');
			player.style.background = 'url("./image/car.png")';
			player.style.backgroundSize = '60px 100px';
			player.style.backgroundRepeat = 'no-repeat';
			player.style.position = 'absolute';
			player.style.width = this.width + 'px';
			player.style.height = this.height + 'px';
			this.element = player;
			console.log(gameContainer.offsetHeight);
			this.setPosition((Math.floor(this.containerWidth / 2) - Math.floor(this.width / 2)), (this.containerHeight - this.height));
			this.draw();
			gameContainer.append(player);
		}

		this.setPosition = function(x, y){
			console.log(x,y);
			this.x = x;
			this.y = y;
		}

		this.collision = function(){
			//collision detection
		}

		this.movePlayer = function(){
			this.x =((this.lane-1) * this.laneWidth) + this.laneMiddle;
			this.draw();
		}
		this.draw = function(){
			this.element.style.top = this.y + 'px';
			this.element.style.left = this.x + 'px';
		}
	}

	//THis is slider creator 
	function createSlider(parentElement){
		for(var i = 0; i < 5; i++)
		parentElement.backgroundWrapper
	}

	function setParentProperties(parent){
		parent.style.backgroundColor = 'blue';
		// parent.style.width = parent.offsetWidth < 500 ? 500 + 'px' : parent.offsetWidth;
		// parent.style.height = parent.offsetHeight < 600 ? 600 + 'px' : parent.offsetHeight;
		parent.style.height = '700px';
		parent.style.width = '1000px';
		parent.style.position = 'relative';
		parent.style.margin = '0 auto';
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
		gameContainer.style.position = 'relative';
		gameContainer.style.background = 'url("./image/road.png")';
		gameContainer.style.backgroundSize = 'cover';
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

	function setScoreContainerProperties(scoreWrapper, scoreBoard){
		console.log(scoreWrapper.offsetHeight);
		console.log(scoreWrapper.offsetWidth);
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

		this.startGame= function(){
			var vehicle = new Vehicle(this.gameContainer);
			
			document.onkeydown = function(e){
				switch(e.keyCode){
					case 37:
						if(that.player.lane > 1)
							{that.player.lane -= 1;}
						that.gameContinue();
						break;
					case 39:
						if(that.player.lane < 3)
							{that.player.lane += 1;}
						that.gameContinue();
						break;
				}
			}
			setInterval(function(){
				that.gameContinue();
			},20);
		}

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
			this.gameWrapper = gameWrapper;
			this.scoreWrapper = scoreWrapper;
			this.gameContainer = gameContainer;
			this.parentElement.append(gameWrapper);
			this.parentElement.append(scoreWrapper);
			this.gameWrapper.append(gameContainer);
			this.gameContainer.append(backgroundWrapper);

			score.innerHTML = '0';
			score.style.textAlign = 'center';
			score.style.fontSize = 40 + 'px';
			console.log(scoreBoard.offsetHeight);
			score.style.margin = 'auto auto';
			scoreBoard.append(score);
			this.scoreWrapper.append(scoreBoard);

			var player = new PlayerVehicle(this.gameContainer);
			player.init(this.gameContainer);
			this.player = player;
			this.player.movePlayer();
			this.startGame();
			
		}

		this.gameContinue = function() {
			this.player.movePlayer();
			position++;
			this.gameContainer.style.backgroundPositionY=position+"px";
		}
	}

	var carLanes = document.getElementsByClassName('carLane');
	for(var i = 0; i< carLanes.length; i++){
			new Game(carLanes[i], i).init();
	}
})();