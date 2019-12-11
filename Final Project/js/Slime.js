function Slime(ctx){
    this.x = 400;
    this.y = 600;
    this.dx = 1;
    this.dy = 1;
    this.speed = 3;
    this.width = 100;
    this.damage = 50;
    this.height = 100;
    this.state = {alive:true, attack:true, collided:false};
    this.target = null;
    this.movementCooldown = 50;
    this.movementToggle = 1;
    
    this.collisionCheck = function(){
        if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y)
            {}
    }

    this.checkBoundry = function(){
        if(this.x < 20){
            this.dx = 1;
            this.dy = getRandomInt(-5, 5) > 0 ? this.dy = 1 : this.dy = -1; 
            this.movementToggle = -1;
        }
        if(this.x + this.width > gameWidth - 19){
            this.dx = -1;
            this.dy = getRandomInt(-5, 5) > 0 ? this.dy = 1 : this.dy = -1; 
            this.movementToggle = -1;
        }
        if(this.y < 474){
            this.dy = 1;
            // this.dx = getRandomInt(-5, 5) > 0 ? this.dx = 1 : this.dx = -1; 
            this.movementToggle = -1;
        }
        if(this.y + this.height > mapInfo.y - 535){
            this.dy = -1;
            // this.dx = getRandomInt(-5, 5) > 0 ? this.dx = 1 : this.dx = -1; 
            this.movementToggle = -1;
        }
    }
    
    this.checkObstacle = function(){

    }
    
    this.update = function(player){
        if(this.movementToggle == 1){
            this.checkBoundry();
            var distance = Math.sqrt(Math.pow(((this.x + this.width / 2)  - (player.x + player.width / 2)), 2) + Math.pow(((this.y + this.height / 2) - (player.y + player.height / 2)), 2));
            this.x += this.speed * this.dx;
            this.y += this.speed * this.dy;
        }
        if(frames % this.movementCooldown == 0){
            this.movementToggle = 1;
        }
        this.draw();
    }

    this.draw = function(){
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}