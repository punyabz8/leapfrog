function Obstacle (ctx, x, y){
    this.width = 47;
    this.height = 47;
    this.x = 47 * x + 20;
    this.y = 47 * y + 465;
    this.imagePositionX = this.x;
    this.imagePositiony = this.y - 34;

    this.init = function(){
        this.draw();
    }
    this.draw = function(){
        ctx.shadowOffsetY = 10;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        toggleShadow(ctx);
        ctx.drawImage(obstacleImg[0], this.imagePositionX, this.imagePositiony, this.width, this.height + 34);
        toggleShadow(ctx);
    }
    this.update = function(){
        this.draw();
    }
    this.checkCollision = function(mobsAndPlayer){
        if(collisionCheck(mobsAndPlayer, this)){
            return true;
        }
    }
}