function Map(ctx, firstTimeMapLoad){
    this.mapDetail = [];
    this.tileMap = null;
    this.firstTimeMapLoad = firstTimeMapLoad;
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
                    this.mapDetail[i].push(1);
                    continue;
                }
                if(i % 9 == 0 && j % 9 == 0){
                    this.mapDetail[i].push(21);
                    continue;
                }
                if(i % 10 == 0 && j % 20 == 0){
                    this.mapDetail[i].push(11);
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
        for(var i = 0; i < this.mapDetail.length; i++){
            for(var j = 0; j < this.mapDetail[i].length; j++){
                if(this.mapDetail[i][j] != 0 && this.firstTimeMapLoad == true){
                    this.mapDetail[i][j].init();
                }
                if(this.mapDetail[i][j] != 0 && this.firstTimeMapLoad == false){
                    // if(this.tileMap[i][j] > 20 && this.tileMap[i][j] < 31){
                    //     this.mapDetail[i][j].update(this);
                    //     continue;
                    // }
                    // this.mapDetail[i][j].update();
                }
            }
        }

        // ////Draw Grid 
        // ctx.strokeStyle = 'white';
        // for(var i = 0; i < this.mapDetail.length; i++){
        //     for(var j = 0; j < this.mapDetail[i].length; j++){
        //         ctx.strokeRect((i * 47) + 20, (j * 47) + 465, 47, 47);
        //     }
        // }
    }
}

