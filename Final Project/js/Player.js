function Player(ctx){
    this.dx = 1;
    this.dy = 1;
    this.level = 1;
    this.speed = 7;
    this.width = 45;
    this.arrows = [];
    this.height = 45;
    this.health = 500;
    this.weapon = null;
    this.maxHealth = 500;
    this.x = gameWidth / 2;
    this.y = mapInfo.y - 300;
    this.movingState = false;
    this.attackState = false;
    this.attackCooldown = 40;
    this.enemyTarget = null;

    this.init = function(){
        this.draw();
        
        console.log('player drawn');
    }

    this.playerBackgroundEffect = function(){
        ctx.beginPath();
        ctx.fillStyle = 'rgba(3, 232, 252, 0.2)';
        ctx.arc(this.x + this.width / 2, this.y + this.height / 2, 40, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(128, 255, 251, 0.4)';
        ctx.stroke();
        console.log('effects hahaha');

    }

    
    this.attack = function(){
        var arrow = new Arrow(this, ctx);
        this.arrows.push(arrow);
        this.arrows[this.arrows.length - 1].draw();
    }
    this.keyPressed = function(){
        if(keyPressed.ArrowLeft == true || keyPressed.a == true || keyPressed.A == true){
            // if(!)
            this.x = this.x - this.speed;
            this.dx = -1;
        }
        if(keyPressed.ArrowRight == true || keyPressed.d == true || keyPressed.D == true){
            this.x = this.x + this.speed;
            this.dx = 1;

        }
        if(keyPressed.ArrowUp == true || keyPressed.w == true || keyPressed.W == true){
            this.y = this.y - this.speed;
            this.dy = -1;
        }
        if(keyPressed.ArrowDown == true || keyPressed.s == true || keyPressed.S == true){
            this.y = this.y + this.speed;
            this.dy = 1;
        }
        // ViewPort location and movement
        if(this.y < viewControl.y + 300){
            viewControl.y = viewControl.y - 7;
            if(viewControl.y < 0){
                viewControl.y = 0;
            }
        }
        if(this.y > viewControl.y + gameHeight - 100){
            viewControl.y = viewControl.y + 7;
            if(viewControl.y + gameHeight > mapInfo.y){
                viewControl.y = mapInfo.y - gameHeight;
            }
        }
    }

    this.checkCollosion = function(){
        if (this.x < obstacle[i].x + obstacle[i].width &&
            this.x + this.width > obstacle[i].x &&
            this.y < obstacle[i].y + obstacle[i].height &&
            this.y + this.height > obstacle[i].y) {
                return true;
        }
    }
    
    this.checkBoundry = function(){
        this.x < 20 ? this.x = 20 : false;
        this.x + this.width > gameWidth - 19 ? this.x = gameWidth - this.width - 19 : false;
        this.y < 474 ? this.y = 474 : false;
        this.y + this.height > mapInfo.y - 535 ? this.y = mapInfo.y - this.height - 535 : false;
    }

    //check player collision with objects
    this.checkObstacle = function(obstacles){
        for(var i = 0; i < obstacles.length; i++){
            if(obstacles[i].checkCollosion(this)){
                console.log('handle obstacle collision');

                // if(obstacles[i].x < this.x + this.width){
                //     if(keyPressed.ArrowRight == true || keyPressed.d == true || keyPressed.D == true){
                //         if(this.dx == 1){
                //             this.x = obstacles[i].x - this.width - 1;
                //         }
                //     }
                // }
                // if(obstacles[i].y + obstacles[i].height > this.y){
                //     if(keyPressed.ArrowUp == true || keyPressed.w == true || keyPressed.W == true){
                //         if(this.dy == 1){
                //             this.y = obstacles[i].y + obstacles[i].height + 1;
                //         }
                //     }
                // }
                // if(obstacles[i].x + obstacles[i].width > this.x){
                //     if(keyPressed.ArrowLeft == true || keyPressed.a == true || keyPressed.A == true){
                //         this.x = obstacles[i].x + obstacles[i].width + 1;
                //         break;
                //     }
                // }
                // if(obstacles[i].y < this.y + this.height){
                //     if(keyPressed.ArrowDown == true || keyPressed.s == true || keyPressed.S == true){
                //         this.y = obstacles[i].y - this.height - 1;
                //         break;
                //     }
                // }
            }
        }
    }

    this.update = function(){
        this.playerBackgroundEffect();
        this.draw();
        if(frames % this.attackCooldown == 0)
        {this.attack();}
        for(var i = 0; i < this.arrows.length; i++){
            this.arrows[i].update();
        }
    }

    this.draw = function(){
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}