function Background(ctx){
    this.width = gameWidth;
    this.height = 2500;

    this.draw = function(){
        ctx.beginPath();
        toggleShadow(ctx);
        ctx.drawImage(img, 0, 0, gameWidth, mapInfo.y);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(0, 0, gameWidth, mapInfo.y);
        toggleShadow(ctx);
        
    }
}