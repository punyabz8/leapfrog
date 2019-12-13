function Slime(ctx, x, y, player){
    this.dx = 1;
    this.dy = 1;
    this.speed = 4;
    this.width = 47;
    this.height = 47;
    this.x = 47 * x + 20;     //Initial x-position of slime
    this.y = 47 * y + 465;     //Initial y-position of slime
    this.hitPoint = 300;    // HP
    this.damagePoint = 75;
    this.collision = false;
    this.movementToggle = 1;
    this.movementTile = 5 * 47;
    this.movementCooldown = 40;
    this.attackingTarget = player;    // Attacking target (hero)
    this.state = {alive:true, attack:true, collided:false};
    
    this.checkCollisionWithplayer = function(){
        if (this.x < this.attackingTarget.x + this.attackingTarget.width &&
            this.x + this.width > this.attackingTarget.x &&
            this.y < this.attackingTarget.y + this.attackingTarget.height &&
            this.y + this.height > this.attackingTarget.y)
            {
                // var wy = ((this.width + this.attackingTarget.width) / 2) * ((this.x + this.width / 2) - (this.attackingTarget.x + this.attackingTarget.width / 2));
                // var hx = ((this.height + this.attackingTarget.height) / 2) * ((this.y + this.height / 2) - (this.attackingTarget.y + this.attackingTarget.height / 2));
                // if(wy < hx){
                //     if(wy > -hx){
                //         // console.log('bottom');
                //         this.dy = 1;
                //         this.movementToggle = -1;
                //         this.y = this.attackingTarget.y + this.attackingTarget.height + 1;
                //     }
                //     else{
                //         // console.log('left');
                //         this.dx = -1;
                //         this.movementToggle = 1;
                //         this.x = this.attackingTarget.x - this.width - 1;
                //         this.dy = getRandomInt(-5, 5) > 0 ? this.dy = 1 : this.dy = -1; 
                //     }
                // }else{
                //     if(wy > -hx){
                //         // console.log('right');
                //         this.dx = 1;
                //         this.movementToggle = -1;
                //         this.x = this.attackingTarget.x + this.attackingTarget.width + 1;
                //         this.dy = getRandomInt(-5, 5) > 0 ? this.dy = 1 : this.dy = -1; 
                //     }
                //     else{
                //         // console.log('top');
                //         this.dy = -1;
                //         this.movementToggle = -1;
                //         this.y = this.attackingTarget.y - this.height - 1;
                //     }
                // }
                this.attackingTarget.hitByEnemy(this.damagePoint);
                console.log('Slime collided with this.attackingTarget');
            }
    }

    this.checkBoundry = function(){
        if(this.x < gameBoundary.left){
            this.dx = 1;
            this.movementToggle = -1;
            this.x = gameBoundary.left;
            this.dy = getRandomInt(-5, 5) > 0 ? this.dy = 1 : this.dy = -1; 
        }
        if(this.x + this.width > gameBoundary.right){
            this.dx = -1;
            this.movementToggle = -1;
            this.x = gameBoundary.right - this.width;
            this.dy = getRandomInt(-5, 5) > 0 ? this.dy = 1 : this.dy = -1; 
        }
        if(this.y < gameBoundary.top){
            this.dy = 1;
            this.movementToggle = -1;
            this.y = gameBoundary.top;
            this.dx = getRandomInt(-5, 5) > 0 ? this.dx = 1 : this.dx = -1; 
        }
        if(this.y + this.height >mapInfo.y - gameBoundary.bottom){
            this.dy = -1;
            this.movementToggle = -1;
            this.y =mapInfo.y - gameBoundary.bottom - this.height;
            this.dx = getRandomInt(-5, 5) > 0 ? this.dx = 1 : this.dx = -1; 
        }
    }
    
    this.checkObstacle = function(obstacles){
        for(var i = 0; i < obstacles.length; i++){
            if(obstacles[i].checkCollosion(this)){
                var wy = ((this.width + obstacles[i].width) / 2) * ((this.x + this.width / 2) - (obstacles[i].x + obstacles[i].width / 2));
                var hx = ((this.height + obstacles[i].height) / 2) * ((this.y + this.height / 2) - (obstacles[i].y + obstacles[i].height / 2));
                if(wy < hx){
                    if(wy > -hx){
                        // console.log('bottom');
                        this.dy = 1;
                        this.movementToggle = -1;
                        this.y = obstacles[i].y + obstacles[i].height + 1;
                        this.dx = getRandomInt(-5, 5) > 0 ? this.dx = 1 : this.dx = -1; 

                    }
                    else{
                        // console.log('left');
                        this.dx = -1;
                        this.movementToggle = 1;
                        this.x = obstacles[i].x - this.width - 1;
                        this.dy = getRandomInt(-5, 5) > 0 ? this.dy = 1 : this.dy = -1; 
                    }
                }else{
                    if(wy > -hx){
                        // console.log('right');
                        this.dx = 1;
                        this.movementToggle = -1;
                        this.x = obstacles[i].x + obstacles[i].width + 1;
                        this.dy = getRandomInt(-5, 5) > 0 ? this.dy = 1 : this.dy = -1; 
                    }
                    else{
                        // console.log('top');
                        this.dy = -1;
                        this.movementToggle = -1;
                        this.y = obstacles[i].y - this.height - 1;
                        this.dx = getRandomInt(-5, 5) > 0 ? this.dx = 1 : this.dx = -1; 
                    }
                }
            }
        }
    }

    this.damageByHit = function(arrow){
        var criticalDamage = player.attackingFlags.critical == true ? player.criticalDamage : 0;
        var poisionDamage = player.attackingFlags.poision == true ? player.poisionDamage : 0;
        this.hitPoint = this.hitPoint - (arrow.damagePoint + arrow.damagePoint * criticalDamage + poisionDamage);
    }
    
    this.update = function(obstacle){
        this.checkObstacle(obstacle);
        if(this.movementToggle == 1){
            this.checkBoundry();
            this.checkCollisionWithplayer();
            // var distance = Math.sqrt(Math.pow(((this.x + this.width / 2)  - (player.x + player.width / 2)), 2) + Math.pow(((this.y + this.height / 2) - (player.y + player.height / 2)), 2));
            this.x += this.speed * this.dx;
            this.y += this.speed * this.dy;
            if(this.movementTile >= 1){
                this.movementTile -= this.speed;
            }
        }
        if(this.movementTile < 1){
            this.movementToggle = -1;
            this.movementTile = getRandomInt(6, 10) * 47;
        }
        if(this.movementToggle == -1){
            if(this.movementCooldown >= 1){
                this.movementCooldown--;
            }
        }
        if(this.movementCooldown == 0){
            this.movementToggle = 1;
            this.movementCooldown = 50;
            this.dy = getRandomInt(-5, 5) > 0 ? this.dy = 1 : this.dy = -1;
        }

        // if(frames % this.movementCooldown == 0){
        //     this.movementToggle *= -1;
        // }
        this.draw();
    }

    this.draw = function(){
        ctx.beginPath();
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    
}