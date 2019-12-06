var Obstacle = function(parentElement){
	this.y = 0;
	this.dx = 5;
	this.x = 500;
	this.width = 52;
	this.element = null;
	this.obstacleGap = 100;
	this.scoreCounted = false;
	this.height = getRandomIntRange(20,250);
		
	var that = this;
	//if upDownFlag is 0 then use pipe img accordingly & change bottom height accordingly of top pipe height
	this.createObstacle = function(upDownFlag, pipeHeight){
		var obstacle = document.createElement('div');
		obstacle.style.background = 'url("./assets/sprites/'+ obstacles[0] +'")';
		obstacle.style.left = this.x + 'px';
		obstacle.style.position = 'absolute';
		if(upDownFlag == 0){
			this.y = pipeHeight + this.obstacleGap;
			this.height = MAX_HEIGHT - pipeHeight - this.obstacleGap - 80;	//80 - forground height
		}else{
			obstacle.style.transform = 'rotate(180deg)';
		}
		obstacle.style.top = this.y + 'px';
		obstacle.style.width = this.width + 'px';
		obstacle.style.height = this.height + 'px';
		parentElement.append(obstacle); 
		this.element = obstacle;
		this.draw();
		return this.height;
	}
	this.draw = function(){
		this.element.style.left = this.x + 'px';
	}
	this.update = function(){
		this.x -= this.dx;
		this.draw();
	}
}