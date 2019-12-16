function Ray(ctx, playerX, playerY, angle){
    this.x = playerX;
    this.y = playerY;
    this.dx = - Math.cos(angle * Math.PI / 180);
    this.dy =  Math.sin(angle * Math.PI / 180);
    
    this.rayCast = function(lines){
        var x1 = lines.x1;
        var y1 = lines.y1;
        var x2 = lines.x2;
        var y2 = lines.y2;

        var x3 = this.x;
        var y3 = this.y;
        var x4 = this.x + 10 * this.dx;
        var y4 = this.y + 10 * this.dy;

        var tDeno = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        // console.log(x1, x2, x3, x4,y1, y2, y3, y4);
        if(tDeno != 0){
            var uDeno = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
            var t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / tDeno;
            var u = - ((x1 -x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / uDeno;
            var pt = {};
            if(t >= 0 || t <= 1){
                pt.x = Math.ceil(x1 + t * (x2 - x1));
                pt.y = Math.ceil(y1 + t * (y2 - y1));
                return pt;

            }
            if(u >=0 || u <=1){
                pt.x = x3 + u * (x4 - x3);
                pt.y = y3 + u * (y4 - y3);
                return pt;
            }
        }else{
            return false;
        }
    }

    this.draw = function(){
        ctx.strokeStyle = 'black';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.lineWidth = 0;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + 150 * this.dx, this.y + 150 * this.dy);
        ctx.stroke();
    }
}