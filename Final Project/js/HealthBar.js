function HealthBar(ctx, object, flag){
	this.x = object.imagePositionX;
	this.y = object.imagePositionY;
	this.maxHealth = object.maxHealth !== undefined ? object.maxHealth : object.hitPoint;
	this.currentHealth = object.hitPoint;
	this.width = object.imageWidth + object.imageWidth * 0.2;
	this.playerOrEnemy = flag;

	this.updateHealthBar = function(obj){
		this.x = obj.imagePositionX;
		this.y = obj.imagePositionY;
		this.currentHealth = obj.hitPoint;
		if(obj.level !== undefined){
			this.maxHealth = obj.maxHealth;
		}
		this.draw();
	}
	
	this.draw = function(){
		toggleShadow(ctx);
		ctx.lineWidth = '2';
		ctx.strokeStyle = 'black';
		ctx.strokeRect(this.x - object.imageWidth * 0.1, this.y - 20, this.width, 10);
		this.createHealthBar();
		this.showPlayerHealth();
		toggleShadow(ctx);
	}

	this.showPlayerHealth = function(){
		ctx.lineWidth = '3';
		ctx.font = '12px serif';
		ctx.strokeStyle = 'black';
		ctx.strokeText(this.currentHealth, this.x + this.width / 2 - 10, this.y - 19, 30);
		ctx.fillStyle = 'white';
		ctx.fillText(this.currentHealth, this.x + this.width / 2 - 10, this.y - 19, 30);
	}

	this.createHealthBar = function(){
		if(this.playerOrEnemy == true){
			var grd = ctx.createLinearGradient(0, 30, 0, 0);
			grd.addColorStop(0, '#00ba00');
			grd.addColorStop(1, '#6ae24a');
			ctx.fillStyle = grd;
		}else{
			ctx.fillStyle = 'red';
		}
		ctx.fillRect(this.x - object.imageWidth * 0.1, this.y - 19, (this.width * ((this.currentHealth * 100) / this.maxHealth)) / 100, 8);
	}
}       