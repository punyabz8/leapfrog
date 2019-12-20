function ArcherEnemy(ctx, x, y, player){
    this.speed = 4;
    this.width = 47;
    this.height = 47;
    this.arrows = [];
    this.hitPoint = 500;
    this.expPoint = 200;
    this.maxHealth = 300;
    this.coinOnDead = 50;
    this.x = 47 * x + 20;
    this.y = 47 * y + 465;
    this.healthBar = null;
    this.damagePoint = 75;
    this.collision = false;
    this.damageCooldown = 0;
    this.movementToggle = 1;
    this.movementTile = 5 * 47;
    this.movementCooldown = 300;
    this.performedDamage = false;
    this.enemyTarget = player;
    this.dx = getRandomIntRange(-2, 2) >= 0 ? 1 : -1;
    this.dy = getRandomIntRange(-2, 2) >= 0 ? 1 : -1;
    this.state = {alive:true, attack:true, collided:false};

    var distance = 0;

    this.init = function(){
        this.healthBar = new HealthBar(ctx, this, false);
        this.healthBar.draw();
        this.draw();
    }
    this.checkCollisionWithplayer = function(){
        if (collisionCheck(this, this.enemyTarget)){
            var wy = ((this.width + this.enemyTarget.width) / 2) * ((this.x + this.width / 2) - (this.enemyTarget.x + this.enemyTarget.width / 2));
            var hx = ((this.height + this.enemyTarget.height) / 2) * ((this.y + this.height / 2) - (this.enemyTarget.y + this.enemyTarget.height / 2));
            if(wy < hx){
                if(wy > -hx){
                    // collision on bottom
                    this.dy = -1;
                    this.y = this.enemyTarget.y + this.enemyTarget.height + 1;
                    this.dx = getRandomIntRange(-2, 2) >= 0 ? this.dx = 1 : this.dx = -1;
                }
                else{
                    // collision on left
                    this.dx = -1;
                    this.x = this.enemyTarget.x - this.width - 1;
                    this.dy = getRandomIntRange(-2, 2) >= 0 ? this.dy = 1 : this.dy = -1;
                }
            }else{
                if(wy > -hx){
                    //collision on right
                    this.dx = 1;
                    this.x = this.enemyTarget.x + this.enemyTarget.width + 1;
                    this.dy = getRandomIntRange(-2, 2) >= 0 ? this.dy = 1 : this.dy = -1;
                }
                else{
                    // collision on top
                    this.dy = 1;
                    this.y = this.enemyTarget.y - this.height - 1;
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
    this.attack = function(player){
        var arrow = new Arrow(ctx, this);
        arrow.init(this.damagePoint);
        this.arrows.push(arrow);
    }
    this.update = function(obstacle){
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
        if(this.attackingCooldown == 0){
            this.attack(player);
            this.attackingCooldown = 100;
        }
        if(this.attackingCooldown >0){
            this.attackingCooldown--;
        }
        for(var i = 0; i < this.arrows.length; i++)
        {
            this.arrows[i].checkBoundry();
            this.arrows[i].checkObstacle(obstacle);
            this.arrows[i].checkEnemyCollision(player);
            if(this.arrows[i].collidedState == false){
                this.arrows[i].update();
            }
        }
        this.healthBar.updateHealthBar(this);
        this.draw();
    }
    this.draw = function(){
        ctx.strokeStyle = 'red';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        // ctx.drawImage(slimeImg, this.spriteInfo.srcX, this.spriteInfo.srcY, 50, 50, this.x, this.y, this.width, this.height);
    }
}