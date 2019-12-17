function CreateMap(ctx){
    this.mapDetail = [];
    this.tileMap = null;
    // 11 * 21 of (47 * 47)
    this.init = function(){
        for(var i = 0; i < 11; i++){
            this.mapDetail[i] = [];
            for(var j = 0; j < 21; j++){
                this.mapDetail[i].push(0);
            }
        }
        this.tileMap = JSON.parse(JSON.stringify(this.mapDetail));
    }

    this.UpdateMapTIles = function(player){
        for(var i = 0; i < this.mapDetail.length; i++){
            for(var j = 0; j < this.mapDetail[i].length; j++){
                var temp = null;
                if(this.mapDetail[i][j] == 1){
                    temp = new Obstacle(ctx, i, j);
                    this.mapDetail[i][j] = temp;
                }
                if(this.mapDetail[i][j] == 11){
                    temp = new Slime(ctx, i, j, player);
                    this.mapDetail[i][j] = temp;
                }
                if(this.mapDetail[i][j] == 21){
                    temp = new Caltrop(ctx, i, j);
                    this.mapDetail[i][j] = temp;
                }
            }
        }
    }

    this.draw = function(){
        ctx.beginPath();
        for(var i = 0; i < this.mapDetail.length; i++){
            for(var j = 0; j < this.mapDetail[i].length; j++){
                if(this.mapDetail[i][j] != 0 && firstTimeMapLoad == true){
                    this.mapDetail[i][j].draw();
                }
                if(this.mapDetail[i][j] != 0 && firstTimeMapLoad == false){
                    this.mapDetail[i][j].update(this);
                }
            }
        }

        // ctx.strokeStyle = 'red';
        // for(var i = 0; i < this.mapDetail.length; i++){
        //     for(var j = 0; j < this.mapDetail[i].length; j++){
        //         ctx.strokeRect((i * 48) + 20, (j * 47) + 465, 47, 47);
        //         console.log('drawing grid');
        //     }
        // }
    }
}
