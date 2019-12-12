function Arrow(ctx, player){
	this.dx = 0;
	this.dy = 0;
	this.speed = 20;
	this.eCenterX = 0;
	this.eCentery = 0;
	this.angle = null;
	this.collidedTo = null;
	this.collidedState = false;
	this.height = 10;
	this.width = 20;
	this.x = Math.floor(player.x + player.width / 2);
	this.y = Math.floor(player.y + player.height / 2);

	this.init = function(){
		this.eCenterX = Math.floor(player.enemyTarget.x + player.enemyTarget.width / 2);
		this.eCentery = Math.floor(player.enemyTarget.y + player.enemyTarget.height / 2);
		this.angle = Math.atan2( this.y - this.eCentery ,  this.x - this.eCenterX);
		this.dx = - Math.cos(this.angle);
		this.dy = - Math.sin(this.angle);
		this.draw();
	}

	this.update = function(){
		if(this.collidedState == false){
			this.x += this.speed * this.dx;
			this.y += this.speed * this.dy;
			this.draw();
		}
	}

	this.checkBoundry = function(){
        if(this.x < 20){
			this.collidedTo = 'boundry';
			this.collidedState = true;
			return true;
		}
        if(this.x + this.width > gameWidth - 19){
			this.collidedTo = 'boundry';
			this.collidedState = true;
			return true;
		}
        if(this.y < 474){
			this.collidedTo = 'boundry';
			this.collidedState = true;
			return true;
		}
        if(this.y + this.height > mapInfo.y - 535){
			this.collidedTo = 'boundry';
			this.collidedState = true;
			return true;
		}
	}

	this.checkCollosion = function(obj){
        if (this.x < obj.x + obj.width &&
            this.x + this.width > obj.x &&
            this.y < obj.y + obj.height &&
            this.y + this.height > obj.y) {
				console.log('checked');
				return true;
        }
    }
	
	this.checkObstacle = function(obstacles){
		for(i = 0; i < obstacles.length; i++){
			if(this.checkCollosion(obstacles[i])){
				this.collidedState = true;
				this.collidedTo = 'obstacle';
			}
		}
	}

	this.checkEnemyCollision = function(enemies){
		for(i = 0; i < enemies.length; i++){
			if(this.checkCollosion(enemies[i])){
				this.collidedState = true;
				this.collidedTo = 'enemy';
				return enemies[i];
			}
		}
		return false;
	}

	this.draw = function(){
		ctx.beginPath();
		ctx.fillStyle = 'red';
		// ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}