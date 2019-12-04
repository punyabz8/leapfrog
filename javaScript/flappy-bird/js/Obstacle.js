var Obstacle = function(parentElement){
    this.x = 500;
    this.y = 0;
    this.width = 52;
    this.height = getRandomIntRange(20,250);
    this.element = null;
	this.dx = 5;
	this.scoreCounted = false;
		
    var that = this;
    
    this.createObstacle = function(upDownFlag, pipeHeight){
			var obstacle = document.createElement('div');
			obstacle.style.background = 'url("./assets/sprites/'+ obstacles[0] +'")';
			obstacle.style.position = 'absolute';
			obstacle.style.left = this.x + 'px';
			if(upDownFlag == 0){
				this.y = pipeHeight + 120;
				this.height = MAX_HEIGHT - pipeHeight - 120 - 80;
			}else{
				obstacle.style.transform = 'rotate(180deg)';
			}

			obstacle.style.top = this.y + 'px';
			obstacle.style.height = this.height + 'px';
			obstacle.style.width = this.width + 'px';
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