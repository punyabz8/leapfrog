function Player(ctx){
    this.dx = 1;
    this.dy = 1;
    this.level = 1;
    this.speed = 8;
    this.width = 45;
    this.arrows = [];
    this.height = 45;
    this.health = 500;
    this.weapon = null;
    this.maxHealth = 500;
    this.x = gameWidth / 2;
    this.enemyTarget = null;    // which enemy to attack
    this.y = mapInfo.y - 300;   // starting position of hero
    this.movingState = false;
    this.attackState = false;
    this.attackCooldown = 60;   // waiting time until next attack

    var distance = 0;
    var tempArrow = [];

    this.init = function(){
        this.draw();
        console.log('player drawn');
    }

    // Circle background of hero
    this.playerBackgroundEffect = function(){
        ctx.beginPath();
        ctx.fillStyle = 'rgba(3, 232, 252, 0.2)';
        ctx.arc(this.x + this.width / 2, this.y + this.height / 2, 40, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(128, 255, 251, 0.4)';
        ctx.stroke();
    }

    
    this.attack = function(enemies){
        var nearestEnemy = 9999;
        for(var i = 0; i < enemies.length; i++){
            distance = Math.sqrt(Math.pow((this.x - enemies[i].x),2) + Math.pow((this.y - enemies[i].y),2));
            if(nearestEnemy > distance){
                this.enemyTarget = enemies[i];
            }
        }
        var arrow = new Arrow(ctx, this);
        arrow.init();
        arrow.draw();
        this.arrows.push(arrow);
    }

    this.keyPressed = function(obstacles){
        if(keyPressed.ArrowLeft == true || keyPressed.a == true || keyPressed.A == true){
            // if(!)if
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
            viewControl.y = viewControl.y - this.speed;
            if(viewControl.y < 0){
                viewControl.y = 0;
            }
        }
        if(this.y > viewControl.y + gameHeight - 100){
            viewControl.y = viewControl.y + this.speed;
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
                var wy = ((this.width + obstacles[i].width) / 2) * ((this.x + this.width / 2) - (obstacles[i].x + obstacles[i].width / 2));
                var hx = ((this.height + obstacles[i].height) / 2) * ((this.y + this.height / 2) - (obstacles[i].y + obstacles[i].height / 2));
                console.log('handle obstacle collision');
                if(wy < hx){
                    if(wy > -hx){
                        // console.log('bottom');
                        this.y = obstacles[i].y + obstacles[i].height + 1;
                    }
                    else{
                        // console.log('left');
                        this.x = obstacles[i].x - this.width - 1;
                    }
                }else{
                    if(wy > -hx){
                        // console.log('right');
                        this.x = obstacles[i].x + obstacles[i].width + 1;
                    }
                    else{
                        // console.log('top');
                        this.y = obstacles[i].y - this.height - 1;
                    }
                }
            }
        }
    }

    this.update = function(obstacles, enemies){
        tempArrow = [];
        this.keyPressed();
        this.checkObstacle(obstacles);
        this.checkBoundry();
        this.playerBackgroundEffect();
        this.draw();
        if(frames % this.attackCooldown == 0)
            {this.attack(enemies);}
        for(var i = 0; i < this.arrows.length; i++){
            if(this.arrows[i].checkBoundry()){
                tempArrow.push(i);
            }
        }
        for(var i = tempArrow.length - 1; i >= 0; i--){
            this.arrows.splice(tempArrow[i],1);
        }
        for(var i = 0; i < this.arrows.length; i++){
            this.arrows[i].update();
            this.arrows[i].checkBoundry();
        }
        console.log(this.arrows);
    }

    this.draw = function(){
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 10;
        ctx.shadowOffsetY = 15;
        ctx.fillStyle = 'blue';
        ctx.shadowColor = '#333';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.beginPath();
    }
}