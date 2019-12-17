function Obstacle (ctx, x, y){
    this.x = 47 * x + 20;
    this.y = 47 * y + 465;
    this.width = 47;
    this.height = 47;
    this.image = null;
    this.imagePositionX = this.x;
    this.imagePositiony = this.y - 34;

    this.init = function(){
        this.image = new Image();
        this.image.src = './assets/images/block.png';
        this.draw();
    }

    this.draw = function(){
        ctx.fillStyle = '#ffffff';
        ctx.shadowOffsetY = 10;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        toggleShadow(ctx);
        ctx.drawImage(this.image, this.imagePositionX, this.imagePositiony, this.width, this.height + 34);
        toggleShadow(ctx);
    }

    this.update = function(){
        this.draw();
    }

    this.checkCollosion = function(player){
        if(collisionCheck(player, this)){
            return true;
        }
    }
}