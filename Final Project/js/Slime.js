function Slime(ctx){
    this.x = 0;
    this.y = 0;
    this.dx = 1;
    this.dy = 1;
    this.speed = 10;
    this.width = 100;
    this.height = 100;
    this.state = {alive:true, attack:true, collided:false};
    this.target = null;
    
    // this.collisionCheck = function(){
    //     if (rect1.x < rect2.x + rect2.width &&
    //         rect1.x + rect1.width > rect2.x &&
    //         rect1.y < rect2.y + rect2.height &&
    //         rect1.y + rect1.height > rect2.y)
    // }
    
    
    this.update = function(player){
        var distance = Math.sqrt(Math.pow((this.x - player.x), 2) - Math.pow((this.y - player.y), 2));
        if(distance < 10){
            this.target = player;
        }else{
            this.target = null;
        }
        if(this.target == null){

        }

        // if(this.dx == 1 && this.dy == 1){
        //     this.x += this.speed;
        //     this.y += this.speed;
        // }
        // if(this.dx == 1 && this.dy == -1){
        //     this.x += this.speed;
        //     this.y -= this.speed;
        // }
        // if(this.dx == 1 && this.dy == 1){
        //     this.x += this.speed;
        //     this.y += this.speed;
        // }
        // if(this.dx == 1 && this.dy == 1){
        //     this.x += this.speed;
        //     this.y += this.speed;
        // }
    }

    this.attack = function(){

    }

    this.draw = function(){
        ctx.beginPath();
        ctx.strokeStyle = 'blue';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}