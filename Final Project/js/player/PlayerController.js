function PlayerController(ctx){
    this.keyPressed = function(event){
        if(event.which == 37 || event.which == 65){
            ctx.fillRect(0, 0, this.width, this.height);
        }
        if(event.which == 38 || event.which == 87){
            //move up
        }
        if(event.which == 39 || event.which == 68){
            //move right
        }
        if(event.which == 40 || event.which == 83){
            //move down
        }
        
    }
}