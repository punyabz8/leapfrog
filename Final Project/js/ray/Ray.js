function Ray(ctx, playerX, playerY, angle){
    this.x = playerX;
    this.y = playerY;
    this.dx =  Math.cos(angle);
    this.dy =  Math.sin(angle);
    
    this.rayCast = function(lines){
        var x1 = lines;
    }

    this.draw = function(){
        ctx.strokeStyle = 'black';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.lineWidth = 0;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo((this.x * this.dx) + 1, (this.y * this.dy) + 1);
        ctx.stroke();
    }
}