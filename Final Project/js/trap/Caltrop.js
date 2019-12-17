function Caltrop (ctx, x, y){
    this.x = 47 * x + 20;
    this.y = 47 * y + 465;
    this.width = 47;
    this.height = 47;
    this.damagePoint = 75;
    this.damageCooldown = 0;
    this.performedDamage = false;
    this.imagePositionX = this.x;
    this.imagePositiony = this.y - 5;
    this.image = null;

    this.init = function(){
        this.image = new Image();
        this.image.src = './assets/images/caltrop.png';
        this.draw();
    }

    this.draw = function(){
        ctx.beginPath();
        toggleShadow(ctx);
        ctx.drawImage(this.image, this.imagePositionX, this.imagePositiony, this.width, this.height + 5);
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