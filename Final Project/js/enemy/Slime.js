function Slime(ctx, x, y, player){
    this.speed = 4;
    this.width = 47;
    this.height = 47;
    this.hitPoint = 300;
    this.expPoint = 100;
    this.maxHealth = 300;
    this.coinOnDead = 20;
    this.x = 47 * x + 20;
    this.y = 47 * y + 465;
    this.healthBar = null;
    this.damagePoint = 75;
    this.collision = false;
    this.damageCooldown = 0;
    this.movementToggle = 1;
    this.movementTile = 5 * 47;
    this.movementCooldown = 40;
    this.performedDamage = false;
    this.attackingTarget = player;
    this.dx = getRandomIntRange(-2, 2) >= 0 ? 1 : -1;
    this.dy = getRandomIntRange(-2, 2) >= 0 ? 1 : -1;
    this.state = {alive:true, attack:true, collided:false};
    this.spriteInfo = {srcX: 0, srcY: 0, sheetWidth: 145, sheetHeight: 200, frameCount: 3, cols: 3, rows: 4, width: 50, height: 50, currentFrame: 0};

    this.imageWidth = this.width;
    this.imagePositionX = this.x
    this.imagePositionY = this.y;

    this.init = function(){
        this.healthBar = new HealthBar(ctx, this, false);
        this.healthBar.draw();
        this.draw();
    }
    this.checkCollisionWithplayer = function(){
        if (collisionCheck(this, this.attackingTarget)){
            var wy = ((this.width + this.attackingTarget.width) / 2) * ((this.x + this.width / 2) - (this.attackingTarget.x + this.attackingTarget.width / 2));
            var hx = ((this.height + this.attackingTarget.height) / 2) * ((this.y + this.height / 2) - (this.attackingTarget.y + this.attackingTarget.height / 2));
            if(wy < hx){
                if(wy > -hx){
                    // collision on bottom
                    this.dy = -1;
                    this.y = this.attackingTarget.y + this.attackingTarget.height + 1;
                    this.dx = getRandomIntRange(-2, 2) >= 0 ? this.dx = 1 : this.dx = -1;
                }
                else{
                    // collision on left
                    this.dx = -1;
                    this.x = this.attackingTarget.x - this.width - 1;
                    this.dy = getRandomIntRange(-2, 2) >= 0 ? this.dy = 1 : this.dy = -1;
                }
            }else{
                if(wy > -hx){
                    //collision on right
                    this.dx = 1;
                    this.x = this.attackingTarget.x + this.attackingTarget.width + 1;
                    this.dy = getRandomIntRange(-2, 2) >= 0 ? this.dy = 1 : this.dy = -1;
                }
                else{
                    // collision on top
                    this.dy = 1;
                    this.y = this.attackingTarget.y - this.height - 1;
                }
            }
            this.movementToggle = -1;
        }
    }
    this.checkBoundry = function(){
        if(this.x < gameBoundary.left){
            this.dx = 1;
            this.movementToggle = -1;
            this.x = gameBoundary.left;
            this.dy = getRandomIntRange(-2, 2) >= 0 ? this.dy = 1 : this.dy = -1;
        }
        if(this.x + this.width > gameBoundary.right){
            this.dx = -1;
            this.movementToggle = -1;
            this.x = gameBoundary.right - this.width;
            this.dy = getRandomIntRange(-2, 2) >= 0 ? this.dy = 1 : this.dy = -1;
        }
        if(this.y < gameBoundary.top){
            this.dy = 1;
            this.movementToggle = -1;
            this.y = gameBoundary.top;
            this.dx = getRandomIntRange(-2, 2) >= 0 ? this.dx = 1 : this.dx = -1;
        }
        if(this.y > mapInfo.y - gameBoundary.bottom){
            this.dy = -1;
            this.movementToggle = -1;
            this.y = mapInfo.y - gameBoundary.bottom - this.height;
            this.dx = getRandomIntRange(-2, 2) >= 0 ? this.dx = 1 : this.dx = -1;
        }
    }
    this.checkObstacle = function(obstacles){
        for(var i = 0; i < obstacles.length; i++){
            if(obstacles[i].checkCollision(this)){
                var wy = ((this.width + obstacles[i].width) / 2) * ((this.x + this.width / 2) - (obstacles[i].x + obstacles[i].width / 2));
                var hx = ((this.height + obstacles[i].height) / 2) * ((this.y + this.height / 2) - (obstacles[i].y + obstacles[i].height / 2));
                if(wy < hx){
                    if(wy > -hx){
                        this.dy = 1;
                        this.y = obstacles[i].y + obstacles[i].height + 1;
                        this.dx = getRandomIntRange(-2, 2) >= 0 ? this.dx = 1 : this.dx = -1;
                    }
                    else{
                        this.dx = -1;
                        this.x = obstacles[i].x - this.width - 1;
                        this.dy = getRandomIntRange(-2, 2) >= 0 ? this.dy = 1 : this.dy = -1;
                    }
                }else{
                    if(wy > -hx){
                        this.dx = 1;
                        this.x = obstacles[i].x + obstacles[i].width + 1;
                        this.dy = getRandomIntRange(-2, 2) >= 0 ? this.dy = 1 : this.dy = -1;
                    }
                    else{
                        this.dy = -1;
                        this.y = obstacles[i].y - this.height - 1;
                        this.dx = getRandomIntRange(-2, 2) >= 0 ? this.dx = 1 : this.dx = -1;
                    }
                }
            }
        }
    }
    this.damageByHit = function(damageByArrow){
        this.hitPoint = this.hitPoint - damageByArrow;
        createTextField(ctx, '12px serif', damageByArrow, 'red', this.x, this.y - 25, 10);
    }
    this.update = function(obstacle){
        this.imagePositionX = this.x;
        this.imagePositionY = this.y;
        this.checkObstacle(obstacle);
        this.checkBoundry();
        this.checkCollisionWithplayer();
        this.movementTile = getRandomIntRange(6, 10) * 47;
        if(this.movementToggle == -1){
            if(this.movementCooldown >= 1){
                this.movementCooldown--;
            }
        }
        if(this.movementCooldown == 0){
            this.movementToggle = 1;
            this.movementCooldown = 50;
        }
        if(this.movementToggle == 1){
            this.x += this.speed * this.dx;
            this.y += this.speed * this.dy;
            if(this.movementTile >= 1){
                this.movementTile -= this.speed;
            }
        }
        this.healthBar.updateHealthBar(this);
        if(frames % 10 == 0){
            if(this.dx == -1 && this.dy == -1){
                this.spriteInfo.srcY = 51;
                this.spriteInfo.srcX = this.spriteInfo.currentFrame * this.spriteInfo.width;
                this.spriteInfo.currentFrame = ++this.spriteInfo.currentFrame % this.spriteInfo.cols;
            }
            if(this.dx == -1 && this.dy == 1){
                this.spriteInfo.srcY = 101;
                this.spriteInfo.srcX = this.spriteInfo.currentFrame * this.spriteInfo.width;
                this.spriteInfo.currentFrame = ++this.spriteInfo.currentFrame % this.spriteInfo.cols;
            }
            if(this.dx == 1 && this.dy == -1){
                this.spriteInfo.srcY = 151;
                this.spriteInfo.srcX = this.spriteInfo.currentFrame * this.spriteInfo.width;
                this.spriteInfo.currentFrame = ++this.spriteInfo.currentFrame % this.spriteInfo.cols;
            }
            if(this.dx == 1 && this.dy == 1){
                this.spriteInfo.srcY = 1;
                this.spriteInfo.srcX = this.spriteInfo.currentFrame * this.spriteInfo.width;
                this.spriteInfo.currentFrame = ++this.spriteInfo.currentFrame % this.spriteInfo.cols;
            }
        }
        this.draw();
    }
    this.draw = function(){
        ctx.drawImage(slimeImg, this.spriteInfo.srcX, this.spriteInfo.srcY, 50, 50, this.x, this.y, this.width, this.height);
    }
}