function Arrow(player, ctx){
	this.x = player.x + player.width / 2;
	this.y = player.y + player.height / 2;
	this.dx = player.dx;
	this.dy = player.dy;
	this.speed = 5;

	this.update = function(){
		this.x += this.speed * this.dx;
		this.y += this.speed * this.dy;
		this.draw();
	}

	this.draw = function(){
		ctx.fillStyle = 'red';
		ctx.fillRect(this.x, this.y, 20, 8);
	}
}