function Obstacle (ctx, x, y){
    this.x = 47 * x + 20;
    this.y = 47 * y + 465;
    this.width = 94;
    this.height = 47;
    this.image = null;
    this.imagePositionX = this.x;
    this.imagePositiony = this.y - 20;

    this.init = function(){
        this.image = new Image();
        this.image.src = './assets/images/block.png';
        this.draw();
    }

    this.draw = function(){
        ctx.drawImage(this.image, this.imagePositionX, this.imagePositiony, this.width, this.height + 20);

    }

    this.update = function(){
        this.draw();
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