function ExperienceBar(ctx){
	this.height = 30;
	this.currentExperience = 0;
	this.width = gameWidth / 2;
	this.y = viewControl.y + 30;
	this.maxExperienceThisLevel = 0;
	this.x = gameWidth - ((gameWidth * 3) / 4);

	this.updateExperienceBar = function(experience, playerLevel){
		this.y = viewControl.y + 50;
		this.maxExperienceThisLevel = playerLevel * 250;
		this.currentExperience = experience;
		this.draw(playerLevel);
	}

	this.draw = function(playerLevel){
		toggleShadow(ctx);
		ctx.lineWidth = '3';
		ctx.strokeStyle = 'black';
		ctx.strokeRect(this.x, this.y, this.width, this.height);
		this.fillExperienceBar();
		this.showPlayerLevel(playerLevel);
		toggleShadow(ctx);
	}

	this.showPlayerLevel = function(playerLevel){

		ctx.font = '30px serif';
		ctx.lineWidth = '4';
		ctx.strokeStyle = 'black';
		ctx.strokeText('Lv.' + playerLevel, this.x + this.width / 2 - 25, viewControl.y + 55, 50);
		ctx.fillStyle = 'white';
		ctx.fillText('Lv.' + playerLevel, this.x + this.width / 2 - 25, viewControl.y + 55, 50);
	}

	this.fillExperienceBar = function(){
		var grd = ctx.createLinearGradient(0, 100, 0, 0);
		grd.addColorStop(0, '#fede00');
		grd.addColorStop(1, '#e09411');
		ctx.fillStyle = '#ffb017';
		// ctx.fillStyle = grd;
		ctx.fillRect(this.x + 2, viewControl.y + 52, (this.width * ((this.currentExperience * 100) / this.maxExperienceThisLevel)) / 100, this.height - 4);
	}
}