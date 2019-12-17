function Map(ctx, firstTimeMapLoad){
    this.mapWithObjects = [];
    this.tileMap = null;
    // 11 * 21 of (47 * 47)
    this.init = function(currentLevel){
        // for(var i = 0; i < 11; i++){
        //     this.mapWithObjects[i] = [];
        //     for(var j = 0; j < 21; j++){
        //         if((i == 4 && j == 0) || (i == 5 && j == 0)){
        //             this.mapWithObjects[i].push(0);
        //             continue;
        //         }
        //         if(i % 4 == 0 && j % 4 == 0){
        //             this.mapWithObjects[i].push(1);
        //             continue;
        //         }
        //         if(i % 9 == 0 && j % 9 == 0){
        //             this.mapWithObjects[i].push(21);
        //             continue;
        //         }
        //         if(i % 10 == 0 && j % 20 == 0){
        //             this.mapWithObjects[i].push(11);
        //         }else{
        //             this.mapWithObjects[i].push(0);
        //         }
        //     }
        // }

        this.mapWithObjects = JSON.parse(JSON.stringify(mapLevels[currentLevel]));
        this.tileMap = JSON.parse(JSON.stringify(this.mapWithObjects));
    }

    this.setMapTIles = function(player){
        for(var i = 0; i < this.mapWithObjects.length; i++){
            for(var j = 0; j < this.mapWithObjects[i].length; j++){
                var temp = null;
                if(this.mapWithObjects[i][j] == 1){
                    temp = new Obstacle(ctx, i, j);
                    this.mapWithObjects[i][j] = temp;
                }
                if(this.mapWithObjects[i][j] == 11){
                    temp = new Slime(ctx, i, j, player);
                    this.mapWithObjects[i][j] = temp;
                }
                if(this.mapWithObjects[i][j] == 21){
                    temp = new Caltrop(ctx, i, j);
                    this.mapWithObjects[i][j] = temp;
                }
            }
        }
    }

    this.draw = function(){
        for(var i = 0; i < this.mapWithObjects.length; i++){
            for(var j = 0; j < this.mapWithObjects[i].length; j++){
                if(this.mapWithObjects[i][j] != 0 && gameFlags.firstTimeMapLoad == true){
                    this.mapWithObjects[i][j].init();
                }
                if(this.mapWithObjects[i][j] != 0 && gameFlags.firstTimeMapLoad == false){
                    if(this.tileMap[i][j] > 10 && this.tileMap[i][j] <= 20){
                        continue;
                    }
                    if(this.tileMap[i][j] > 20 && this.tileMap[i][j] <= 30){
                        this.mapWithObjects[i][j].update();
                    }
                }
            }
        }

        // ////Draw Grid 
        // ctx.strokeStyle = 'white';
        // for(var i = 0; i < this.mapWithObjects.length; i++){
        //     for(var j = 0; j < this.mapWithObjects[i].length; j++){
        //         ctx.strokeRect((i * 47) + 20, (j * 47) + 465, 47, 47);
        //     }
        // }
    }
}

