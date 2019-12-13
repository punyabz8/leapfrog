// 11 * 21 of (47 * 47)

function Map(ctx){
    this.map = [];
    // this.init = function(){
    //     for(var i = 0; i < 21; i++){
    //         this.map[i] = [];
    //         for(var j = 0; j < 11; i++){
    //             this.map[i].push(j) ;
    //         }
    //     }
    // }
    // this.addGrid = function(x, y){
    //     newX = (x + 1) * 47;
    //     newY = (y + 1) * 47;
    //     ctx.beginPath();
    //     ctx.strokeStyle = 'red';
    //     ctx.strokeRect(newX, newY, 47, 47);
    // }
    // this.update = function(){
    //     this.draw();
    // }

    this.draw = function(){
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        for(var i = 0; i < this.map.length; i++){
            for(var j = 0; j < this.map[i].length; j++){
                ctx.strokeRect(i * 47, j * 47, 47, 47);
                console.log('drawing grid');
            }
        }
    }
}

