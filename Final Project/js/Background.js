function Background(ctx){
    this.width = gameWidth;
    this.height = 2500;

    this.draw = function(){
        ctx.beginPath();
        ctx.drawImage(img, 0, 0, gameWidth, mapInfo.y);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(0, 0, gameWidth, mapInfo.y);
        // var pattern = ctx.createPattern(img, 'repeat');
        // ctx.fillStyle = pattern;
        // ctx.fillRect(0, 0, this.width, this.height);
        
    }
}