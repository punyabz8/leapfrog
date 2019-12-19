function Fence(ctx, x, y){
    this.width = 141;
    this.height = 47;
    this.x = 47 * x + 20;
    this.y = 47 * y + 465;
    this.imagePositionX = this.x;
    this.imagePositiony = this.y - 20;

    this.init = function(){
        this.draw();
    }
    this.draw = function(){
        ctx.drawImage(obstacleImg[2], this.imagePositionX, this.imagePositiony, this.width, this.height + 20);
    }
    this.update = function(){
        this.draw();
    }
    /**
     * check collision with player and enemies
     */
    this.checkCollision = function(mobsAndPlayer){
        if(collisionCheck(mobsAndPlayer, this)){
            return true;
        }
    }
}