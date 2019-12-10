function Player(ctx){
    this.dx = 1;
    this.dy = 1;
    this.speed = 10;
    this.width = 45;
    this.height = 45;
    this.x = gameWidth / 2;
    this.y = mapInfo.y - 300;
    this.movingState = false;

    this.init = function(){
        this.draw();
        console.log('player drawn');
    }

    this.draw = function(){
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.keyPressed = function(){
        if(keyPressed.ArrowLeft == true || keyPressed.a == true || keyPressed.A == true){
            this.x = this.x - this.speed;
        }
        if(keyPressed.ArrowRight == true || keyPressed.d == true || keyPressed.D == true){
            this.x = this.x + this.speed;
        }
        if(keyPressed.ArrowUp == true || keyPressed.w == true || keyPressed.W == true){
            this.y = this.y - this.speed;
        }
        if(keyPressed.ArrowDown == true || keyPressed.s == true || keyPressed.S == true){
            this.y = this.y + this.speed;
        }
        if(this.y < viewControl.y + 700){
            viewControl.y = viewControl.y - 10;
            if(viewControl.y < 0){
                viewControl.y = 0;
            }
        }
        if(this.y > viewControl.y + gameHeight-535){
            viewControl.y = viewControl.y +10;
            if(viewControl.y + gameHeight > mapInfo.y){
                viewControl.y = mapInfo.y - gameHeight;
            }
        }
    }

    this.checkBoundry = function(){
        if(this.x < 27){
            this.x = 27;
        }
        if(this.x + this.width > gameWidth - 27){
            this.x = gameWidth - this.width - 27;
        }
        if(this.y < Math.floor(gameHeight / 2)){
            this.y = Math.floor(gameHeight / 2);
        }
        if(this.y + this.height > mapInfo.y - 535){
            this.y = mapInfo.y - this.height - 535;
        }
    }

    this.checkObstacle = function(obstacles){
        for(var i = 0; i < obstacles.length; i++){
            if(obstacles[i].checkCollosion(this)){
                console.log('collided with obstacle');
                // if(obstacles[i].x < this.x + this.width){
                //     this.x = obstacles[i].x - this.width - 1;
                // }
                // if(obstacles[i].x + obstacles[i].width > this.x){
                //     this.x = obstacles[i].x + obstacles[i].width + 1;
                // }
                // if(obstacles[i].y < this.y + this.height){
                //     this.y = obstacles[i].y - this.height - 1;
                // }
                // if(obstacles[i].y + obstacles[i].height > this.y){
                //     this.y = obstacles[i].y + obstacles[i].height + 1;
                // }
            }
        }
    }
    
}