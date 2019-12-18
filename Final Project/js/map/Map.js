function Map(ctx, firstTimeMapLoad){
    this.mapWithObjects = [];
    this.tileMap = null;
    // 11 * 21 of (47 * 47)
    this.init = function(currentLevel){
        currentLevel = currentLevel % mapLevels.length == 0 ? 0 : currentLevel;
        console.log(currentLevel);
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
        if(gameFlags.firstTimeMapLoad == true){
            for(var i = 0; i < this.mapWithObjects.length; i++){
                for(var j = 0; j < this.mapWithObjects[i].length; j++){
                    if(this.mapWithObjects[i][j] != 0 ){
                        this.mapWithObjects[i][j].init();
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

