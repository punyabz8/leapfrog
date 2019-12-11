function Arrow(ctx, player){
	this.speed = 10;
	this.slope = null;
	this.intercept = null;
	this.x = player.x + player.width / 2;
	this.y = player.y + player.height / 2;
	this.dx = player.dx;
	this.dy = player.dy;
	this.init = function(){
		var eCenterX = player.enemyTarget.x + player.enemyTarget.width / 2;
		var eCentery = player.enemyTarget.y + player.enemyTarget.height / 2;
		this.slope = (this.y - eCentery) / (this.x - eCenterX);
		this.intercept = eCentery - (this.slope * eCenterX);
		// this.dy = this.slope > 0 ? 1 : -1; 
		// this.dx = this.x > eCenterX ? 1 : -1;
		this.draw();
	}

	this.update = function(){
		// this.x += this.speed ;
		// this.y = (this.x * this.slope + this.intercept) ;
		this.x += this.speed * this.dx;
		this.y += this.speed * this.dy;
		this.draw();
	}

	this.checkBoundry = function(){
        if(this.x < 20){
			return true;
		}
        if(this.x + this.width > gameWidth - 19){
			return true;
		}
        if(this.y < 474){
			return true;
		}
        if(this.y + this.height > mapInfo.y - 535){
			return true;
		}
		return false;
    }

	this.draw = function(){
		ctx.beginPath();
		ctx.fillStyle = 'red';
		// ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
		ctx.fillRect(this.x, this.y, 20, 10);
	}
}