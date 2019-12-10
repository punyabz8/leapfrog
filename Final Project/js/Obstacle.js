function Obstacle (ctx){
    this.x = 300;
    this.y = 700;
    this.width = 40;
    this.height = 40;

    this.draw = function(){
        ctx.beginPath();
        ctx.strokeStyle = 'blue';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    // this.update = function(){
        
    // }
    this.checkCollosion = function(player){
        if (this.x < player.x + player.width &&
            this.x + this.width > player.x &&
            this.y < player.y + player.height &&
            this.y + this.height > player.y) {
            return true;
        }
    }
}