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
    this.caltropImage = null;

    this.init = function(){
        this.caltropImage = new Image();
        this.caltropImage.src = './assets/images/caltrop.png';
        this.draw();
    }

    this.draw = function(){
        ctx.beginPath();
        ctx.drawImage(this.caltropImage, this.imagePositionX, this.imagePositiony, this.width, this.height + 5);
    }

    this.update = function(player){
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