function Obstacle (ctx){
    this.x = 20;
    this.y = 20;
    this.width = 40;
    this.height = 40;

    this.draw = function(){
        ctx.beginPath();
        ctx.strokeStyle = 'blue';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    // this.update = function(){
        
    // }
    this.collision
}