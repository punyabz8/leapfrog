function Boundary(ctx){
    this.boundary ={x1: 20, y1: 465, x2:537, y2: 1450};

    this.draw = function(){
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        ctx.moveTo(this.boundary.x1, this.boundary.y1);
        ctx.lineTo(this.boundary.x2, this.boundary.y1);
        ctx.lineTo(this.boundary.x2, this.boundary.y2);
        ctx.lineTo(this.boundary.x1, this.boundary.y2);
        ctx.lineTo(this.boundary.x1, this.boundary.y1);
        ctx.stroke();
    }
}