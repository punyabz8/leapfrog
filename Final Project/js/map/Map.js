function Map(ctx, firstTimeMapLoad){
    this.mapDetail = [];
    this.tileMap = null;
    // 11 * 21 of (47 * 47)
    this.init = function(){
        for(var i = 0; i < 11; i++){
            this.mapDetail[i] = [];
            for(var j = 0; j < 21; j++){
                if((i == 4 && j == 0) || (i == 5 && j == 0)){
                    this.mapDetail[i].push(0);
                    continue;
                }
                if(i % 4 == 0 && j % 4 == 0){
                    // var obstacle = new Obstacle(ctx, i, j);
                    // this.mapDetail[i].push(obstacle);
                    this.mapDetail[i].push(1);
                    continue;
                }
                if(i % 10 == 0 && j % 10 == 0){
                    this.mapDetail[i].push(10);
                }else{
                    this.mapDetail[i].push(0);
                }
            }
        }
        this.tileMap = JSON.parse(JSON.stringify(this.mapDetail));
    }

    this.setMapTIles = function(player){
        for(var i = 0; i < this.mapDetail.length; i++){
            for(var j = 0; j < this.mapDetail[i].length; j++){
                if(this.mapDetail[i][j] == 1){
                    var obstacle = new Obstacle(ctx, i, j);
                    this.mapDetail[i][j] = obstacle;
                }
                if(this.mapDetail[i][j] == 10){
                    var slime = new Slime(ctx, i, j, player);
                    this.mapDetail[i][j] = slime;
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

