function Player(ctx){
    this.dx = 1;
    this.dy = 1;
    this.coin = 0;
    this.level = 1;
    this.speed = 8;
    this.width = 47;
    this.arrows = [];
    this.height = 47;
    this.expPoint = 0;
    this.skill = null;
    this.image = null;
    this.hitPoint = 500;
    this.spirit = null;
    this.enemies = null;
    this.expDeposit = 0;
    this.coinDeposit = 0;
    this.maxHealth = 500;
    this.healthBar = null;
    this.damagePoint = 100;
    this.x = gameWidth / 2;
    this.enemyTarget = null;    // which enemy to attack
    this.attackCooldown = 0;    // waiting time until next attack
    this.attackingTime = 40;    // time to wait for next consecutive attack
    this.y = mapInfo.y - 300;   // starting position of hero
    this.baseDamagePoint = 50;
    this.experienceBar = null;
    this.imagePositionX = this.x - 7;
    this.imagePositionY = this.y - 18;
    this.imageWidth = this.width + 15;
    this.playerFlags = {movingState: false, levelChangedStatus: false, playerPositionNearDoor: false};
    this.spriteNotMovingInfo = {srcX: 0, srcY: 0, sheetWidth: 560, sheetHeight: 640, frameCount: 4, cols: 4, rows: 4, width: 140, height: 160, currentFrame: 0};


    var distance = 0;

    this.init = function(ctx){
        this.skill = new Skill();
        this.image = new Image();
        this.spirit = new Spirit(ctx);
        this.spirit.init();
        this.image.src = './assets/images/player.png';
        this.healthBar = new HealthBar(ctx, this, true);
		this.experienceBar = new ExperienceBar(ctx);
        this.draw();
    }

    this.checkEnemyIsInView = function(point){
		for(var j = 0; j < this.enemies.length; j++){
			if(point.x >= this.enemies[j].x && point.x <= this.enemies[j].x + this.enemies[j].width && point.y >= this.enemies[j].y && point.y <= this.enemies[j].y + this.enemies[j].height){
				return this.enemies[j];
			}
		}
	}
    this.attack = function(enemies){
        var nearestEnemy = 99999;
        for(var i = 0; i < enemies.length; i++){
            distance = Math.sqrt(Math.pow((this.x - enemies[i].x),2) + Math.pow((this.y - enemies[i].y),2));
            if(distance < nearestEnemy){
                this.enemyTarget = enemies[i];
                nearestEnemy = distance;
            }
        }
        this.enemyTarget = nearestEnemy == 99999 ? null : this.enemyTarget;
        if(this.enemyTarget != null){
            var tempDamage = this.damagePoint;
            firingSound.play();
            for(var skillElement in this.skill.skillFlags){
                if(this.skill.skillFlags[skillElement] == true){
                    if(skillElement == 'criticalMaster'){
                        tempDamage += Math.floor(this.damagePoint * this.skill.criticalDamage);
                    }
                    if(skillElement == 'poison'){
                        tempDamage += this.skill.poisonDamage;
                    }
                    if(skillElement == 'rage' && this.hitPoint <= Math.floor(0.20 * this.maxHealth)){
                        tempDamage += Math.floor(this.damagePoint * this.skill.rageDamage);
                    }
                }
            }
            var arrow = new Arrow(ctx, this);
            if(this.skill.skillFlags.speedBoost == true){
                arrow.speed += this.skill.attackSpeedBoostAmount;
            }
            if(this.skill.skillFlags.doubleArrow == true){
                arrow.init(tempDamage);
                var tempArrowData = {x:arrow.x, y: arrow.y, dx: arrow.dx, dy: arrow.dy, angle: arrow.angle};
                for(var i = 0; i <= this.skill.doubleArrowAmount; i++){
                    var tempArrow = new Arrow(ctx, this);
                    tempArrow.init(tempDamage);
                    tempArrow.x = tempArrowData.x;
                    tempArrow.y = tempArrowData.y;
                    tempArrow.dx = tempArrowData.dx;
                    tempArrow.dy = tempArrowData.dy;
                    tempArrow.angle = tempArrowData.angle;
                    if(this.skill.doubleArrowAmount % 2 == 0 && i == this.skill.doubleArrowAmount / 2){
                        tempArrow.setPosition(i < this.skill.doubleArrowAmount / 2 ? 0  : 0);
                        this.arrows.push(tempArrow);
                        continue;
                    }
                    tempArrow.setPosition(i <= this.skill.doubleArrowAmount / 2 ? -(10 * (i + 1))  : (10 * (i - 1)));
                    this.arrows.push(tempArrow);
                }
            }else{
                arrow.init(tempDamage);
                this.arrows.push(arrow);
            }
        }
    }
    this.checkBoundry = function(){
        if(gameFlags.levelComplete == false){
            this.y < gameBoundary.top ? this.y = gameBoundary.top : false;
            this.x < gameBoundary.left ? this.x = gameBoundary.left : false;
            this.x + this.width > gameBoundary.right ? this.x = gameBoundary.right - this.height : false;
            this.y + this.height > mapInfo.y - gameBoundary.bottom ? this.y = mapInfo.y - this.height - gameBoundary.bottom : false;
        }else{
            if(this.x >= 220 && this.x + this.height <= 340 && this.y < gameBoundary.top){
                this.playerFlags.playerPositionNearDoor = true;
            }else if(this.y > gameBoundary.top + 8){
                this.playerFlags.playerPositionNearDoor = false;
            }
            if(this.playerFlags.playerPositionNearDoor == true){
                if(this.x < 220 && this.y > gameBoundary.top - 160){
                    this.x = 220;
                }else if(this.x + this.height > 340 && this.y > gameBoundary.top - 160){
                    this.x = 340 - this.height;
                }
                if(this.y < gameBoundary.top - 140){
                    this.y = gameBoundary.top - 140;
                }
            }else{
                if(this.y < gameBoundary.top){
                    this.y = gameBoundary.top;
                }
                this.x < gameBoundary.left ? this.x = gameBoundary.left : false;
                this.x + this.width > gameBoundary.right ? this.x = gameBoundary.right - this.height : false;
                this.y + this.height > mapInfo.y - gameBoundary.bottom ? this.y = mapInfo.y - this.height - gameBoundary.bottom : false;
            }
            if(this.y < gameBoundary.top - 120){
                gameFlags.nextLevel = true;
            }

        }
    }
    this.checkPlayerState = function(){
        if(keyPressed.a == false && keyPressed.d == false && keyPressed.w == false && keyPressed.s == false && keyPressed.ArrowLeft == false && keyPressed.ArrowRight == false && keyPressed.ArrowUp == false && keyPressed.ArrowDown == false && keyPressed.A == false && keyPressed.D == false && keyPressed.W == false && keyPressed.S == false){
            this.playerFlags.movingState = false;
        }else{
            this.playerFlags.movingState = true;
        }
    }
    //check player collision with objects
    this.checkObstacle = function(obstacles){
        for(var i = 0; i < obstacles.length; i++){
            if(obstacles[i].checkCollision(this)){
                var wy = ((this.width + obstacles[i].width) / 2) * ((this.x + this.width / 2) - (obstacles[i].x + obstacles[i].width / 2));
                var hx = ((this.height + obstacles[i].height) / 2) * ((this.y + this.height / 2) - (obstacles[i].y + obstacles[i].height / 2));
                if(wy < hx){
                    if(wy > -hx){
                        this.y = obstacles[i].y + obstacles[i].height;
                    }
                    else{
                        this.x = obstacles[i].x - this.width ;
                    }
                }else{
                    if(wy > -hx){
                        this.x = obstacles[i].x + obstacles[i].width;
                    }
                    else{
                        this.y = obstacles[i].y - this.height ;
                    }
                }
            }
        }
    }
    this.checkCollisionWithEnemies = function(enemies){
        for(var i = 0; i < enemies.length; i++){
            if (collisionCheck(this, enemies[i])){
                if(enemies[i].performedDamage == false && enemies[i].damageCooldown == 0){
                    var gamble = 100;
                    if(this.skill.skillFlags.douge == true){
                        gamble = getRandomInt(100);
                    }
                    if(gamble < 20){
                        createTextField(ctx, '12px serif', 'douged', 'yellow', this.x, this.y - 25, 10);
                    }else{
                        this.hitPoint -= enemies[i].damagePoint;
                    }
                    enemies[i].damageCooldown = 80;
                    enemies[i].performedDamage = true;
                }
                var wy = ((this.width + enemies[i].width) / 2) * ((this.x + this.width / 2) - (enemies[i].x + enemies[i].width / 2));
                var hx = ((this.height + enemies[i].height) / 2) * ((this.y + this.height / 2) - (enemies[i].y + enemies[i].height / 2));
                if(wy < hx){
                    if(wy > -hx){
                        this.dy = 1;
                        this.movementToggle = -1;
                        this.y = enemies[i].y + enemies[i].height + 1;
                    }
                    else{
                        this.dx = -1;
                        this.movementToggle = 1;
                        this.dy = getRandomIntRange(-5, 5) > 0 ? this.dy = 1 : this.dy = -1;
                    }
                }else{
                    if(wy > -hx){
                        this.dx = 1;
                        this.movementToggle = -1;
                        this.dy = getRandomIntRange(-5, 5) > 0 ? this.dy = 1 : this.dy = -1;
                    }
                    else{
                        this.dy = -1;
                        this.movementToggle = -1;
                        this.y = enemies[i].y - this.height - 1;
                    }
                }
            }
            if(enemies[i].damageCooldown > 0){
                enemies[i].damageCooldown--;
            }
            if(enemies[i].damageCooldown == 0){
                enemies[i].performedDamage = false;
            }
        }
    }
    this.updateCoinAndExp = function(coinFromEnemy, expFromEnemy){
        this.expDeposit += expFromEnemy;
        this.coinDeposit += coinFromEnemy;
    }
    //Called when game is over(set player values to initial state)

    this.addSkill = function(skillInput){
        var skillActiveCheck = false;
        for(var skillElement in this.skill.skillFlags){
            if(skillElement == skillInput && this.skill.skillFlags[skillElement] == true){
                skillActiveCheck = true;
            }
        }
        if(skillActiveCheck == true){
            if(this.skill.skillFlags[skillInput] == true){
                if(skillInput == 'doubleArrow'){
                    this.skill.doubleArrowAmount += 1;
                }
                if(skillInput == 'criticalMaster'){
                    this.skill.criticalDamage += this.skill.criticalDamageIncreament;

                }
                if(skillInput == 'poison'){
                    this.skill.poisonDamage += this.skill.poisonDamageIncrement;
                }
                if(skillInput == 'speedBoost'){
                    this.attackSpeedBoostAmount += this.skill.attackSpeedBoostIncrement;
                }
            }
        }else{
            if(skillInput == 'healthBoost'){
                this.maxHealth += Math.floor(this.maxHealth * this.skill.healthBoost);
                this.hitPoint += Math.floor(this.maxHealth * this.skill.healthBoost);
            }
            if(skillInput == 'criticalBoost'){
                this.skill.criticalDamage += this.skill.criticalDamageIncreament;
            }
            if(skillInput == 'heal'){
                this.hitPoint += Math.floor(this.maxHealth * this.skill.healAmount);
                if(this.hitPoint > this.maxHealth){
                    this.hitPoint = this.maxHealth;
                }
            }
            if(skillInput == 'attackBoost'){
                this.damagePoint += this.skill.attackBoostAmount;
            }
        }
        for(var skillElement in this.skill.skillFlags){
            if(skillElement == skillInput){
                this.skill.skillFlags[skillElement] = true;
                break;
            }
        }
    }
    this.update = function(obstacles, enemies, traps){
        tempArrow = [];
        this.enemies = enemies;
        this.imagePositionX = this.x - 7;
        this.imagePositionY = this.y - 18;
        this.keyPressed();
        this.checkBoundry();
        this.checkObstacle(obstacles);
        for(var z = 0; z < traps.length; z++){
            if(traps[z].checkCollision(this) == true){
                if(traps[z].performedDamage == false && traps[z].damageCooldown == 0){
                    this.hitPoint -= traps[z].damagePoint;
                    traps[z].damageCooldown = 100;
                    traps[z].performedDamage = true;
                }
            }
            if(traps[z].damageCooldown > 0){
                traps[z].damageCooldown--;
            }
            if(traps[z].damageCooldown == 0){
                traps[z].performedDamage = false;
            }
        }
        this.checkCollisionWithEnemies(enemies);
        this.attackCooldown > 0 ? this.attackCooldown-- : this.attackCooldown = this.attackingTime;
        this.checkPlayerState();
        if(this.playerFlags.movingState == true){
            walkingSound.play();
        }else{
            if(frames % 40 == 0){
                if(this.dy == -1){
                    this.spriteNotMovingInfo.srcY = 1;
                    this.spriteNotMovingInfo.srcX = this.spriteNotMovingInfo.currentFrame * this.spriteNotMovingInfo.width;
                    this.spriteNotMovingInfo.currentFrame = ++this.spriteNotMovingInfo.currentFrame % this.spriteNotMovingInfo.cols;
                }
                if(this.dx == -1){
                    this.spriteNotMovingInfo.srcY = 321;
                    this.spriteNotMovingInfo.srcX = this.spriteNotMovingInfo.currentFrame * this.spriteNotMovingInfo.width;
                    this.spriteNotMovingInfo.currentFrame = ++this.spriteNotMovingInfo.currentFrame % this.spriteNotMovingInfo.cols;
                }
                if(this.dx == 1){
                    this.spriteNotMovingInfo.srcY = 161;
                    this.spriteNotMovingInfo.srcX = this.spriteNotMovingInfo.currentFrame * this.spriteNotMovingInfo.width;
                    this.spriteNotMovingInfo.currentFrame = ++this.spriteNotMovingInfo.currentFrame % this.spriteNotMovingInfo.cols;
                }
                if(this.dy == 1){
                    this.spriteNotMovingInfo.srcY = 481;
                    this.spriteNotMovingInfo.srcX = this.spriteNotMovingInfo.currentFrame * this.spriteNotMovingInfo.width;
                    this.spriteNotMovingInfo.currentFrame = ++this.spriteNotMovingInfo.currentFrame % this.spriteNotMovingInfo.cols;
                }
            }
            walkingSound.pause();
        }
        if(this.playerFlags.movingState == false && this.attackCooldown == 0){
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
        // Save Exp and coin at the completion of level
        if(gameFlags.levelComplete == true){
            this.coin += this.coinDeposit;
            if(this.expDeposit > 0){
                this.expPoint += 10;
                this.expDeposit -= 10;
            }
            if(this.expPoint > this.level * 250){
                this.expPoint = this.expPoint - this.level * 250;
                this.level++;
                this.expDeposit = 0;
                this.playerFlags.levelChangedStatus = true;
            }
            this.coinDeposit = 0;
        }
        this.draw();
        this.spirit.update(obstacles, enemies, this);
        this.healthBar.updateHealthBar(this);
        if(viewControl.movingState == true){
            this.experienceBar.updateExperienceBar(this.expPoint, this.level);
        }
    }

    // Circle background of hero
    this.playerBackgroundEffect = function(){
        ctx.beginPath();
        toggleShadow(ctx);
        ctx.fillStyle = 'rgba(3, 232, 252, 0.3)';
        ctx.arc(this.x + this.width / 2, this.y + this.height / 2, 40, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(128, 255, 251, 0.5)';
        ctx.stroke();
        ctx.lineWidth = 0;
        toggleShadow(ctx);
    }
    this.draw = function(){
        this.playerBackgroundEffect();
        ctx.drawImage(playerNotMovingImg, this.spriteNotMovingInfo.srcX, this.spriteNotMovingInfo.srcY, 140, 160, this.x, this.y, this.width, this.height);
        // ctx.drawImage(this.image, this.imagePositionX, this.imagePositionY, this.width + 15, this.height + 18);
    }
    this.keyPressed = function(){
        if(this.playerFlags.levelChangedStatus != true){
            if(keyPressed.ArrowLeft == true || keyPressed.a == true || keyPressed.A == true){
                this.dx = -1;
                this.x -= this.speed;
                this.imagePositionX -= this.speed;
                this.playerFlags.movingState = true;
            }
            if(keyPressed.ArrowRight == true || keyPressed.d == true || keyPressed.D == true){
                this.dx = 1;
                this.x += this.speed;
                this.imagePositionX += this.speed;
                this.playerFlags.movingState = true;
            }
            if(keyPressed.ArrowUp == true || keyPressed.w == true || keyPressed.W == true){
                this.dy = -1;
                this.y -= this.speed;
                this.imagePositionY -= this.speed;
                this.playerFlags.movingState = true;
            }
            if(keyPressed.ArrowDown == true || keyPressed.s == true || keyPressed.S == true){
                this.dy = 1;
                this.y += this.speed;
                this.imagePositionY += this.speed;
                this.playerFlags.movingState = true;
            }
            // ViewPort location and movement
            if(this.y < viewControl.y + 474){
                viewControl.y = viewControl.y - this.speed;
                if(this.y < 474){
                    viewControl.y = viewControl.y - this.speed;
                }
                if(viewControl.y < 0){
                    viewControl.y = 0;
                }
                viewControl.movingState = true;
            }
            if(this.y > viewControl.y + gameHeight - 360){
                viewControl.y = viewControl.y + this.speed;
                if(this.y > mapInfo.y - 360){
                    viewControl.y = viewControl.y + this.speed;
                }
                if(viewControl.y + gameHeight > mapInfo.y){
                    viewControl.y = mapInfo.y - gameHeight;
                }
                viewControl.movingState = true;
            }
        }
    }
    this.damageByHit = function(damageByArrow){
        this.hitPoint = this.hitPoint - damageByArrow;
        createTextField(ctx, '12px serif', damageByArrow, 'red', this.x, this.y - 25, 10);
    }
    // reset all player status to initial state
    this.resetPlayer = function(){
        this.dx = 1;
        this.dy = 1;
        this.coin = 0;
        this.level = 1;
        this.arrows = [];
        this.expPoint = 0;
        this.expDeposit = 0;
        this.hitPoint = 500;
        this.enemies = null;
        this.coinDeposit = 0;
        this.maxHealth = 500;
        this.x = gameWidth / 2;
        this.enemyTarget = null;
        this.attackCooldown = 0;
        this.attackingTime = 40;
        this.y = mapInfo.y - 300;
        this.skill.resetSkills();
        this.playerFlags = {movingState: false, levelChangedStatus: false, playerPositionNearDoor: false};
    }
}