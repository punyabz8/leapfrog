function Slime(ctx){
    this.dx = 1;
    this.dy = 1;
    this.x = 200;
    this.y = 500;
    this.speed = 3;
    this.width = 50;
    this.damage = 50;
    this.height = 50;
    this.target = null;
    this.collision = false;
    this.movementToggle = 1;
    this.movementCooldown = 200;
    this.state = {alive:true, attack:true, collided:false};
    
    this.checkCollisionWithplayer = function(enemies){
        if (this.x < enemies[i].x + enemies[i].width &&
            this.x + this.width > enemies[i].x &&
            this.y < enemies[i].y + enemies[i].height &&
            this.y + this.height > enemies[i].y)
            {
                var wy = ((this.width + enemies[i].width) / 2) * ((this.x + this.width / 2) - (enemies[i].x + enemies[i].width / 2));
                var hx = ((this.height + enemies[i].height) / 2) * ((this.y + this.height / 2) - (enemies[i].y + enemies[i].height / 2));
                if(wy < hx){
                    if(wy > -hx){
                        // console.log('bottom');
                        this.dy = 1;
                        this.movementToggle = -1;
                        this.y = enemies[i].y + enemies[i].height + 1;
                    }
                    else{
                        // console.log('left');
                        this.dx = -1;
                        this.movementToggle = 1;
                        this.x = enemies[i].x - this.width - 1;
                        this.dy = getRandomInt(-5, 5) > 0 ? this.dy = 1 : this.dy = -1; 
                    }
                }else{
                    if(wy > -hx){
                        // console.log('right');
                        this.dx = 1;
                        this.movementToggle = -1;
                        this.x = enemies[i].x + enemies[i].width + 1;
                        this.dy = getRandomInt(-5, 5) > 0 ? this.dy = 1 : this.dy = -1; 
                    }
                    else{
                        // console.log('top');
                        this.dy = -1;
                        this.movementToggle = -1;
                        this.y = enemies[i].y - this.height - 1;
                    }
                }
            }
        console.log('Slime collided with enemies[i]');
    }

    this.checkBoundry = function(){
        if(this.x < 20){
            this.dx = 1;
            this.movementToggle = -1;
            this.dy = getRandomInt(-5, 5) > 0 ? this.dy = 1 : this.dy = -1; 
        }
        if(this.x + this.width > gameWidth - 19){
            this.dx = -1;
            this.movementToggle = -1;
            this.dy = getRandomInt(-5, 5) > 0 ? this.dy = 1 : this.dy = -1; 
        }
        if(this.y < 474){
            this.dy = 1;
            this.movementToggle = -1;
            // this.dx = getRandomInt(-5, 5) > 0 ? this.dx = 1 : this.dx = -1; 
        }
        if(this.y + this.height > mapInfo.y - 535){
            this.dy = -1;
            this.movementToggle = -1;
            // this.dx = getRandomInt(-5, 5) > 0 ? this.dx = 1 : this.dx = -1; 
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
    
    this.update = function(player, obstacle){
        this.checkObstacle(obstacle);
        // this.checkCollisionWithPlayer(player);
        if(this.movementToggle == 1){
            this.checkBoundry();
            var distance = Math.sqrt(Math.pow(((this.x + this.width / 2)  - (player.x + player.width / 2)), 2) + Math.pow(((this.y + this.height / 2) - (player.y + player.height / 2)), 2));
            this.x += this.speed * this.dx;
            this.y += this.speed * this.dy;
        }
        if(frames % this.movementCooldown == 0){
            this.movementToggle *= -1;
        }
        this.draw();
    }

    this.draw = function(){
        ctx.beginPath();
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}