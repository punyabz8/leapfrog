function Player(ctx){
    this.dx = 1;
    this.dy = 1;
    this.coin = 0;
    this.level = 1;
    this.speed = 8;     //player speed
    this.width = 47;
    this.arrows = [];
    this.height = 47;
    this.expPoint = 0;
    this.expDeposit = 0;
    this.hitPoint = 500;     //Player HP
    this.coinDeposit = 0;
    this.maxHealth = 500;   //Player Max HP
    this.x = gameWidth / 2;
    this.attackCooldown = 0;   // waiting time until next attack
    this.attackingTime = 40;    // time to wait for next consecutive attack
    this.y = mapInfo.y - 300;   // starting position of hero
    this.baseDamagePoint = 50;
    
    this.skill = null;
    this.image = null;
    this.enemies = null;
    this.healthBar = null;
    this.enemyTarget = null;    // which enemy to attack
    this.imagePositionX = this.x - 7;
    this.imagePositionY = this.y - 18;
    this.imageWidth = this.width + 15;
    this.playerFlags = {movingState: false, levelChangedStatus: false, playerPositionNearDoor: false};
    
    var distance = 0;
    // this.rays = [];
    // this.lines = null;

    this.init = function(enemies, obstacles){
        this.enemies = enemies;
        this.skill = new Skill();
        this.image = new Image();
        this.image.src = './assets/images/player.png';
        // this.lines = new Line(enemies, obstacles);
        // this.lines.createLine();
        this.healthBar = new HealthBar(ctx, this, true);
        this.draw();
    }

    this.checkEnemyIsInView = function(point){
		for(var j = 0; j < this.enemies.length; j++){
			if(point.x >= this.enemies[j].x && point.x <= this.enemies[j].x + this.enemies[j].width && point.y >= this.enemies[j].y && point.y <= this.enemies[j].y + this.enemies[j].height){
                console.log('hello Enemy is in view');
				return this.enemies[j];
			}
		}
	}
    
    this.attack = function(enemies){
        // var enemyTargets = [];
        // this.rays = [];
        // for(var j = 0; j <= 1; j +=5){
        //     this.rays.push(new Ray(ctx, this.x + this.width / 2, this.y + this.height / 2, j));
        // }
        
        // for(var j = 0; j < this.rays.length; j++){
        //     var temp = {};
        //     var distance = 9999;
        //     var newDistance = 0;
        //     for(var l = 0; l < this.lines.allLines.length; l++){
        //         var pt = this.rays[j].rayCast(this.lines.allLines[l]);
        //         newDistance = Math.sqrt(Math.pow(((this.x + this.width / 2) - pt.x),2) + Math.pow(((this.y + this.height / 2) - pt.y),2));
        //         if(distance > newDistance){
        //             distance = newDistance;
        //             temp = pt;
        //         }
        //     }
        //     console.log('collision point' ,temp);
        //     var enemyChecked = this.checkEnemyIsInView(temp);
        //     // console.log(enemyChecked);
        //     if(enemyChecked != null){
        //         this.enemyTarget = enemyChecked ;
        //     }
        // }
        // for(var j = 0; j < this.rays.length; j++){
        //     this.rays[j].draw();
        // }

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
            var arrow = new Arrow(ctx, this);
            arrow.init();
            arrow.draw();
            this.arrows.push(arrow);
        }else{
            gameFlags.levelComplete = true;
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
        if(keyPressed.hasOwnProperty('w')){
            if(keyPressed.a == false && keyPressed.d == false && keyPressed.w == false && keyPressed.s == false ){
                    this.playerFlags.movingState = false;
                }
        }else if(keyPressed.hasOwnProperty('ArrowUp')){
            if(keyPressed.ArrowLeft == false && keyPressed.ArrowRight == false && keyPressed.ArrowUp == false && keyPressed.ArrowDown == false ){
                    this.playerFlags.movingState = false;
                }
        }else if(keyPressed.hasOwnProperty('W')){
            if(keyPressed.A == false && keyPressed.D == false && keyPressed.W == false && keyPressed.S == false){
                this.playerFlags.movingState = false;
                }
        }
    }
    //check player collision with objects
    this.checkObstacle = function(obstacles){
        for(var i = 0; i < obstacles.length; i++){
            if(obstacles[i].checkCollosion(this)){
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
            if (collisionCheck(this, enemies[i]))
                {
                    if(enemies[i].performedDamage == false && enemies[i].damageCooldown == 0){
                        this.hitPoint -= enemies[i].damagePoint;
                        enemies[i].damageCooldown = 80;
                        enemies[i].performedDamage = true;
                        console.log('Hero hit point   :',this.hitPoint);

                    }   
                    
                    var wy = ((this.width + enemies[i].width) / 2) * ((this.x + this.width / 2) - (enemies[i].x + enemies[i].width / 2));
                    var hx = ((this.height + enemies[i].height) / 2) * ((this.y + this.height / 2) - (enemies[i].y + enemies[i].height / 2));
                    if(wy < hx){
                        if(wy > -hx){
                            // console.log('bottom');
                            this.y = enemies[i].y + enemies[i].height + 1;
                            this.dy = 1;
                            this.movementToggle = -1;
                        }
                        else{
                            // console.log('left');
                            this.x = enemies[i].x - this.width - 1;
                            this.dx = -1;
                            this.movementToggle = 1;
                            this.dy = getRandomInt(-5, 5) > 0 ? this.dy = 1 : this.dy = -1; 
                        }
                    }else{
                        if(wy > -hx){
                            // console.log('right');
                            this.x = enemies[i].x + enemies[i].width + 1;
                            this.dx = 1;
                            this.movementToggle = -1;
                            this.dy = getRandomInt(-5, 5) > 0 ? this.dy = 1 : this.dy = -1; 
                        }
                        else{
                            // console.log('top');
                            this.y = enemies[i].y - this.height - 1;
                            this.dy = -1;
                            this.movementToggle = -1;
                        }
                    }
                // console.log('player collided with ', enemies[i]);
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
        this.coinDeposit += coinFromEnemy;
        this.expDeposit += expFromEnemy;
        console.log('conideposit :', this.coinDeposit);
       
    }
    //Called when game is over(set player values to initial state)
    this.resetPlayer = function(){
        this.dx = 1;
        this.dy = 1;
        this.coin = 0;
        this.level = 1;
        this.arrows = [];
        this.expPoint = 0;
        this.expDeposit = 0;
        this.hitPoint = 500;  
        this.coinDeposit = 0;
        this.maxHealth = 500;
        this.x = gameWidth / 2;
        this.attackCooldown = 0;  
        this.attackingTime = 40; 
        this.y = mapInfo.y - 300;  
        this.skill = null;
        this.enemies = null;
        this.enemyTarget = null;   
        this.playerFlags = {movingState: false, levelChangedStatus: false, playerPositionNearDoor: false};
    }
    this.addSkill = function(){

    }
    this.update = function(obstacles, enemies, traps){
        tempArrow = [];
        this.imagePositionX = this.x - 7;
        this.imagePositionY = this.y - 18;
        this.keyPressed();
        this.checkBoundry();
        this.checkObstacle(obstacles);
        for(var z = 0; z < traps.length; z++){
            if(traps[z].checkCollosion(this) == true){
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
        if(this.playerFlags.movingState == false && this.attackCooldown == 0){
            this.attack(enemies);
        }
        for(var i = 0; i < this.arrows.length; i++)
        {
            this.arrows[i].checkBoundry();
            this.arrows[i].checkObstacle(obstacles);
            var enemyCollision = this.arrows[i].checkEnemyCollision(enemies);
            if(enemyCollision != null){
                // enemyCollision
            }
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
        if(gameFlags.levelComplete == true){
            this.coin += this.coinDeposit;
            this.expPoint += this.expDeposit;
            if(this.expPoint > this.level * 250){
                this.level++;
                this.playerFlags.levelChangedStatus = true;
                //call skill function
                // this.addSkill();dsa
            }
            this.coinDeposit = 0;
            this.expDeposit = 0;
        }
        this.healthBar.updateHealthBar(this);
        this.draw();
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
        // ctx.strokeStyle = 'black';
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.imagePositionX, this.imagePositionY, this.width + 15, this.height + 18);
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
            }
            if(this.y > viewControl.y + gameHeight - 300){
                viewControl.y = viewControl.y + this.speed;
                if(this.y > mapInfo.y - 300){
                    // viewControl.y = mapInfo.y - gameHeight;
                    viewControl.y = viewControl.y + this.speed;

                }
                if(viewControl.y + gameHeight > mapInfo.y){
                    viewControl.y = mapInfo.y - gameHeight;
                }
            }
        }
    }
}