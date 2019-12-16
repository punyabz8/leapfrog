function Player(ctx){
    this.dx = 1;
    this.dy = 1;
    this.level = 1;
    this.speed = 8;     //player speed
    this.width = 47;
    this.arrows = [];
    this.height = 47;
    this.hitPoint = 500;     //Player HP
    this.weaponType = null;
    this.maxHealth = 500;   //Player Max HP
    this.x = gameWidth / 2;
    this.y = mapInfo.y - 300;   // starting position of hero
    this.enemyTarget = null;    // which enemy to attack

    this.attackCooldown = 0;   // waiting time until next attack
    this.attackingTime = 40;    // time to wait for next consecutive attack
    this.criticalDamage = 0.1;
    this.poisionDamage = 30;
    this.poisionDamageIncrement = 3;
    this.criticalDamageIncreament = 0.025;
    this.attackingFlags = {critical:true, poision:false, doubleArrow: false};
    this.rays = [];
    
    this.movingState = false;

    var distance = 0;
    var tempArrow = [];

    this.init = function(){
        this.draw();
        console.log('player drawn');
    }
    
    this.attack = function(enemies){

        // this.rays = [];
        // for(var j = 0; j < 360; j +=5){
        //     this.rays.push(new Ray(ctx, this.x + this.width / 2, this.y + this.height / 2, j));
        // }
        // for(var j = 0; j < this.rays.length; j++){
		// 	this.rays[j].draw();
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

    this.keyPressed = function(obstacles){
        if(keyPressed.ArrowLeft == true || keyPressed.a == true || keyPressed.A == true){
            this.dx = -1;
            this.movingState = true;
            this.x = this.x - this.speed;
        }
        if(keyPressed.ArrowRight == true || keyPressed.d == true || keyPressed.D == true){
            this.dx = 1;
            this.movingState = true;
            this.x = this.x + this.speed;

        }
        if(keyPressed.ArrowUp == true || keyPressed.w == true || keyPressed.W == true){
            this.dy = -1;
            this.movingState = true;
            this.y = this.y - this.speed;
        }
        if(keyPressed.ArrowDown == true || keyPressed.s == true || keyPressed.S == true){
            this.dy = 1;
            this.movingState = true;
            this.y = this.y + this.speed;
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
                viewControl.y = mapInfo.y - gameHeight;
            }
            if(viewControl.y + gameHeight > mapInfo.y){
                viewControl.y = mapInfo.y - gameHeight;
            }
        }
    }
    
    this.checkBoundry = function(){ 
        this.y < gameBoundary.top ? this.y = gameBoundary.top : false;
        this.x < gameBoundary.left ? this.x = gameBoundary.left : false;
        this.x + this.width > gameBoundary.right ? this.x = gameBoundary.right - this.height : false;
        this.y + this.height > mapInfo.y - gameBoundary.bottom ? this.y = mapInfo.y - this.height - gameBoundary.bottom : false;
    }

    this.checkPlayerState = function(){
        if(keyPressed.hasOwnProperty('w')){
            if(keyPressed.a == false && keyPressed.d == false && keyPressed.w == false && keyPressed.s == false ){
                    this.movingState = false;
                }
        }else if(keyPressed.hasOwnProperty('ArrowUp')){
            if(keyPressed.ArrowLeft == false && keyPressed.ArrowRight == false && keyPressed.ArrowUp == false && keyPressed.ArrowDown == false ){
                    this.movingState = false;
                }
        }else if(keyPressed.hasOwnProperty('W')){
            if(keyPressed.A == false && keyPressed.D == false && keyPressed.W == false && keyPressed.S == false){
                    this.movingState = false;
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
                        this.y = obstacles[i].y + obstacles[i].height + 1;
                    }
                    else{
                        this.x = obstacles[i].x - this.width - 1;
                    }
                }else{
                    if(wy > -hx){
                        this.x = obstacles[i].x + obstacles[i].width + 1;
                    }
                    else{
                        this.y = obstacles[i].y - this.height - 1;
                    }
                }
            }
        }
    }

    this.checkCollisionWithEnemies = function(enemies){
        for(var i = 0; i < enemies.length; i++){
            if (collisionCheck(this, enemies[i]))
                {
                    this.hitByEnemy(enemies[i].damagePoint);
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
        }
    }

    this.updateHealth = function(){
        // HP related task
    }

    this.updateExperience = function(){
        // Experience related tack
    }

    this.updateCoin = function(){
        // Coin related task
    }

    this.update = function(obstacles, enemies){
        tempArrow = [];
        this.keyPressed();
        this.checkBoundry();
        this.checkObstacle(obstacles);
        this.checkCollisionWithEnemies(enemies);
        this.draw(); 
        this.attackCooldown > 0 ? this.attackCooldown-- : this.attackCooldown = this.attackingTime;
        this.checkPlayerState();
        if(this.movingState == false && this.attackCooldown == 0){
            this.attack(enemies);
        }
        for(var i = 0; i < this.arrows.length; i++)
        {
            this.arrows[i].checkBoundry();
            this.arrows[i].checkObstacle(obstacles);
            var enemyCollision = this.arrows[i].checkEnemyCollision(enemies);
            // console.log('enemyCollision    :', enemyCollision);
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
    }

    this.hitByEnemy = function(damageFromEnemy){
        this.hitPoint -= damageFromEnemy;
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

    this.draw = function(){
        ctx.beginPath();
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 10;
        ctx.shadowOffsetY = 15;
        ctx.fillStyle = 'blue';
        ctx.shadowColor = '#333';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        this.playerBackgroundEffect();
    }
}