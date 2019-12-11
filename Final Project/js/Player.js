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
    this.attackCooldown = 30;
    this.enemyTarget = null;

    this.init = function(){
        this.draw();
        
        console.log('player drawn');
    }

    
    this.attack = function(){
        var arrow = new Arrow(this, ctx);
        this.arrows.push(arrow);
        this.arrows[this.arrows.length - 1].draw();
    }
    this.keyPressed = function(){
        if(keyPressed.ArrowLeft == true || keyPressed.a == true || keyPressed.A == true){
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
    
    this.checkBoundry = function(){
        this.x < 27 ? this.x = 27 : this.x = this.x;
        this.x + this.width > gameWidth - 27 ? this.x = gameWidth - this.width - 27 : this.x = this.x;
        this.y < Math.floor(gameHeight / 4) ? this.y = Math.floor(gameHeight / 4) : this.y = this.y;
        this.y + this.height > mapInfo.y - 535 ? this.y = mapInfo.y - this.height - 535 : this.y = this.y;
    }

    this.checkObstacle = function(obstacles){
        for(var i = 0; i < obstacles.length; i++){
            if(obstacles[i].checkCollosion(this)){
                console.log('collided with obstacle');
                if(obstacles[i].x < this.x + this.width && obstacles[i].x + obstacles[i].width > this.x){
                    if(keyPressed.ArrowLeft == true || keyPressed.a == true || keyPressed.A == true){
                        this.x = obstacles[i].x + obstacles[i].width + 1;
                        this.y = this.y;
                    }
                    else if(keyPressed.ArrowRight == true || keyPressed.d == true || keyPressed.D == true){
                        this.x = obstacles[i].x - this.width - 1;
                    }
                }
                if(obstacles[i].y < this.y + this.height && obstacles[i].y + obstacles[i].height > this.y){
                    if(keyPressed.ArrowUp == true || keyPressed.w == true || keyPressed.W == true){
                        this.y = obstacles[i].y + obstacles[i].height + 1;
                    }
                    else if(keyPressed.ArrowDown == true || keyPressed.s == true || keyPressed.S == true){
                        this.y = obstacles[i].y - this.height - 1;
                    }
                }
            }
        }
    }

    this.update = function(){
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