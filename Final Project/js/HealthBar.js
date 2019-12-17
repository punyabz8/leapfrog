function HealthBar(ctx, object, flag){
	this.x = object.imagePositionX;
	this.y = object.imagePositionY;
	this.maxHealth = object.maxHealth !== undefined ? object.maxHealth : object.hitPoint;
	this.currentHealth = object.hitPoint;
	this.healthBarLength = object.imageWidth + object.imageWidth * 0.2;
	this.flag = flag;

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
		ctx.strokeRect(this.x - object.imageWidth * 0.1, this.y - 20, this.healthBarLength, 10);
		for(var i = 0; i < this.maxHealth; i += this.maxHealth){
				this.createHealthBar();
		}
		toggleShadow(ctx);
		// for(var i = 1; i <= this.maxHealth; i += 100){
		// 		this.drawLines(i);
		// }
	}
	// this.drawLines = function(XPositionOfLine){
	// 		ctx.lineWidth = '2'; 
	// 		ctx.strokeStyle = 'black';
	// 		console.log('x position of health line',this.x - object.imageWidth * 0.1 + this.healthBarLength * 0.1);
	// 		ctx.moveTo(this.x - object.imageWidth * 0.1 + this.healthBarLength * 0.1, this.y - 20);
	// 		ctx.lineTo(this.x - object.imageWidth * 0.1 + this.healthBarLength * 0.1, this.y - 100);
	// }
	this.createHealthBar = function(){
		if(this.flag == true){
			var grd = ctx.createLinearGradient(0, 30, 0, 0);
			grd.addColorStop(0, '#00ba00');
			grd.addColorStop(1, '#6ae24a');
			ctx.fillStyle = grd;
		}else{
			ctx.fillStyle = 'red';
		}
		ctx.fillRect(this.x - object.imageWidth * 0.1, this.y - 19, (this.healthBarLength * ((this.currentHealth * 100) / this.maxHealth)) / 100, 8);
	}
}       