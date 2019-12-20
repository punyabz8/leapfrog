function Spirit(ctx){
    this.dx = 1;
    this.dy = 1;
    this.level = 1;
    this.speed = 8;
    this.width = 47;
    this.arrows = [];
    this.height = 47;
    this.skill = null;
    this.image = null;
    this.angle = null;
    this.damagePoint = 50;
    this.enemyTarget = null;    // which enemy to attack
    this.attackCooldown = 0;   // waiting time until next attack
    this.attackingTime = 40;    // time to wait for next consecutive attack
    this.y = mapInfo.y - 300;   // starting position of Spirit
    this.baseDamagePoint = 50;
    this.x = gameWidth / 2 - 100;
    this.imagePositionX = this.x - 7;
    this.imagePositionY = this.y - 18;
    this.imageWidth = this.width + 15;
    this.spiritFlags = {movingState: false};

    var distance = 0;

    this.init = function(){
        this.image = new Image();
        this.skill = new SpiritSkill();
        this.image.src = './assets/images/player.png';
        this.draw();
    }

    this.attack = function(enemies){
        var nearestEnemy = 9999;
        for(var i = 0; i < enemies.length; i++){
            distance = Math.sqrt(Math.pow((this.x - enemies[i].x),2) + Math.pow((this.y - enemies[i].y),2));
            if(distance < nearestEnemy){
                this.enemyTarget = enemies[i];
                nearestEnemy = distance;
            }
        }
        this.enemyTarget = nearestEnemy == 99999 ? null : this.enemyTarget;
        if(this.enemyTarget != null){
            var arrow = new Arrow(ctx, this);
            var tmpDamage = this.damagePoint;
            if(this.skill.skillFlags.attackBoost == true){
                tmpDamage += this.damagePoint * this.skill.attackBoostAmount;
            }
            arrow.init(tmpDamage);
            this.arrows.push(arrow);
        }
    }
    this.checkBoundry = function(){
        this.y < gameBoundary.top ? this.y = gameBoundary.top : false;
        this.x < gameBoundary.left ? this.x = gameBoundary.left : false;
        this.x + this.width > gameBoundary.right ? this.x = gameBoundary.right - this.height : false;
        this.y + this.height > mapInfo.y - gameBoundary.bottom ? this.y = mapInfo.y - this.height - gameBoundary.bottom : false;
    }
    this.addSkill = function(playerLevel){
        if(playerLevel >= 5){
            this.skill.recovery = true;
        }
        if(playerLevel >= 10){
            this.skill.attackBoost = true;
        }
    }
    this.update = function(obstacles, enemies, player){
        tempArrow = [];
        this.imagePositionX = this.x - 7;
        this.imagePositionY = this.y - 18;
        this.attackCooldown > 0 ? this.attackCooldown-- : this.attackCooldown = this.attackingTime;
        if(this.spiritFlags.movingState == false && this.attackCooldown == 0 && enemies.length != 0){
            this.attack(enemies);
        }
        for(var i = 0; i < this.arrows.length; i++)
        {
            this.arrows[i].checkBoundry();
            this.arrows[i].checkObstacle(obstacles);
            this.arrows[i].checkEnemyCollision(enemies);
            if(this.arrows[i].collidedState == false){
                this.arrows[i].update();
            }
        }
        for(var i = this.arrows.length - 1; i >= 0; i--)
        {
            if(this.arrows[i].collidedState == true){
                this.arrows.splice(i, 1);
            }
        }
        if(this.checkHeroPosition(player)){
            this.spiritFlags.movingState = true;
            this.x += this.speed * this.dx;
            this.y += this.speed * this.dy;
        }
        if(player.level % 5 == 0){
            this.addSkill(player.level);
        }
        if(this.skill.skillFlags.recovery == true){
            if(frames % 100 == 0){
                player.hitPoint += this.skill.recoveryAmount;
            }
        }
        this.draw();
    }
    this.checkHeroPosition = function(player){
        var spiritCenterX = Math.floor(this.x + this.width / 2);
        var spiritCenterY = Math.floor(this.y + this.height / 2);
        var playerCenterX = Math.floor(player.x + player.width / 2);
        var playerCenterY = Math.floor(player.y + player.height / 2);
        distance = Math.sqrt(Math.pow((spiritCenterX - playerCenterX),2) + Math.pow((spiritCenterY - playerCenterY),2));
        if(distance > 180){
            this.angle = Math.atan2(spiritCenterY - playerCenterY ,  spiritCenterX - playerCenterX);
            this.dx = - Math.cos(this.angle);
            this.dy = - Math.sin(this.angle);
            return true;
        }else{
            this.spiritFlags.movingState = false;
        }
    }
    this.draw = function(){
        ctx.drawImage(this.image, this.imagePositionX, this.imagePositionY, this.width + 15, this.height + 18);
    }
    // reset all Spirit status to initial state
    this.resetSpirit = function(){
        this.dx = 1;
        this.dy = 1;
        this.level = 1;
        this.arrows = [];
        this.damagePoint = 50;
        this.x = gameWidth / 2;
        this.enemyTarget = null;
        this.attackCooldown = 0;
        this.attackingTime = 40;
        this.y = mapInfo.y - 300;
        this.skill.resetSkills();
        this.baseDamagePoint = 50;
        this.spiritFlags = {movingState: false};
    }
}