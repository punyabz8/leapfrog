function Obstacle (ctx, number){
    this.x = 50 * number;
    this.y = 600;
    this.width = 80;
    this.height = 80;

    this.draw = function(){
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.update = function(){
        
    }
    this.checkCollosion = function(player){
        if (this.x < player.x + player.width &&
            this.x + this.width > player.x &&
            this.y < player.y + player.height &&
            this.y + this.height > player.y) {
                return true;
        }
    }
}