function Pool(ctx, x, y){
    this.width = 47;
    this.height = 47;
    this.x = 47 * x + 20;
    this.y = 47 * y + 465;
    this.imagePositionX = this.x;
    this.imagePositiony = this.y;

    this.init = function(){
        this.draw();
    }
    this.draw = function(){
        ctx.drawImage(obstacleImg[1], this.imagePositionX, this.imagePositiony, this.width, this.height);
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