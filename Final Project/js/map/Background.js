function Background(ctx){
    this.height = null;
    this.width = gameWidth;

    this.draw = function(imgIndex){
        ctx.beginPath();
        imgIndex == 1 ? this.height = gameHeight : this.height = mapInfo.y;
        toggleShadow(ctx);
        ctx.drawImage(backgroundImg[imgIndex], 0, 0, gameWidth, this.height);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(0, 0, gameWidth, mapInfo.y);
        toggleShadow(ctx);
    }
}