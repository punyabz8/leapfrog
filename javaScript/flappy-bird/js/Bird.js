var Bird = function (game) {
	this.speed = 2;
	this.rotate = 0;
	this.width = 34;
	this.height = 24;
	this.gravity = 1.5;
	this.element = null;
	this.jumpValue = 13.5;
	this.jumpState = true;
	this.birdAnimation = 1;
	this.x = MAX_WIDTH / 2 - this.width / 2;
	this.y = MAX_HEIGHT / 2 - this.height / 2;

	var that = this;

	this.init = function () {
		var bird = document.createElement('div');
		bird.style.background = 'url("./assets/sprites/' + birds[that.birdAnimation] + '")';
		bird.style.zIndex = '10';
		bird.style.top = this.y + 'px';
		bird.style.left = this.x + 'px';
		bird.style.position = 'absolute';
		bird.style.width = this.width + 'px';
		bird.style.height = this.height + 'px';
		game.parentElement.append(bird);
		this.element = bird;
	}
	this.getBirdValue = function () {
		this.birdAnimation += 1;
		this.birdAnimation %= 3;
	}
	this.draw = function () {
		this.getBirdValue();    //is it possible to use frames here without making frames an insrance scope for Game class.
		this.element.style.top = this.y + 'px';
		this.element.style.left = this.x + 'px';
		this.element.style.background = 'url("./assets/sprites/' + birds[that.birdAnimation] + '")';
	}
	this.update = function (gameState) {
		if (gameState == false) { bird.style.top = this.y + 'px'; }
		else {
			this.speed += this.gravity;
			this.y += this.speed;
			if (this.speed > 0) {
				this.rotate = this.speed * 7;
				if (this.rotate > 90) { this.rotate = 90; }
				this.element.style.transform = 'rotateZ(' + this.rotate + 'deg)';
			}
			if (this.jumpState == true || this.speed < 0) {
				this.rotate = -45;
				this.element.style.transform = 'rotateZ(' + this.rotate + 'deg)';
			}
		}
		this.jumpState = false;
		this.draw();
	}
	this.jump = async function () {
		this.jumpState = true;
		this.speed = -this.jumpValue;
		this.update();

	}
	this.collisionPipe = function (pipes) {
		for (var i = 0; i < pipes.length; i++) {
			if (that.x < pipes[i].x + pipes[i].width &&
				that.y < pipes[i].y + pipes[i].height &&
				that.x + that.width > pipes[i].x &&
				that.y + that.height > pipes[i].y) {
				return true;
			}
			if (that.x + that.width > pipes[i].x && that.y < 0) {
				if (pipes[i].x > that.x) { return true; }
			}
		}
	}

	this.collisionButtom = function (element) {
		if (this.y + this.height >= MAX_HEIGHT - element.height) {
			return true;
		}
	}
}