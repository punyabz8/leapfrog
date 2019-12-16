function Line(enemies, obstacles){
    this.boundary = {x1: 20, y1: 465, x2:537, y2: 1450}
    this.boundaryLines = [];
    this.obstacleLines = [];
    this.enemiesLines = [];
    this.allLines = [];
    var obj= {};

    this.createLine = function(){
        for(var j = 0; j < 4; j++){
            obj = {x1:0,y1:0,x2:0,y2:0};
            if(j == 0){
                obj.x1 = this.boundary.x1;
                obj.y1 = this.boundary.y1;
                obj.x2 = this.boundary.x2;
                obj.y2 = this.boundary.y1;
            }
            if(j == 1){
                obj.x1 = this.boundary.x2;
                obj.y1 = this.boundary.y1;
                obj.x2 = this.boundary.x2;
                obj.y2 = this.boundary.y2;
            }
            if(j == 2){
                obj.x1 = this.boundary.x2;
                obj.y1 = this.boundary.y2;
                obj.x2 = this.boundary.x1;
                obj.y2 = this.boundary.y2;
            }
            if(j == 3){
                obj.x1 = this.boundary.x1;
                obj.y1 = this.boundary.y2;
                obj.x2 = this.boundary.x1;
                obj.y2 = this.boundary.y1;
            }
            this.boundaryLines.push(obj);
        }

        for(var i = 0; i < enemies.length; i++){
            var rectLineArray = this.createObjectLine(enemies[i]);
            this.enemiesLines = this.enemiesLines.concat(rectLineArray);
        }

        for(var i = 0; i < obstacles.length; i++){
            var rectLineArray = this.createObjectLine(obstacles[i]);
            this.obstacleLines = this.obstacleLines.concat(rectLineArray);
        }
        this.updateEnemyLine(enemies);
    }

    this.updateEnemyLine = function(enemies){
        this.enemiesLines = [];
        this.allLines = [];

        for(var i = 0; i < enemies.length; i++){
            var rectLineArray = this.createObjectLine(enemies[i]);
            this.enemiesLines = this.enemiesLines.concat(rectLineArray);
        }
        this.allLines = this.allLines.concat(this.enemiesLines);
        this.allLines = this.allLines.concat(this.obstacleLines);
        this.allLines = this.allLines.concat(this.boundaryLines);

    }

    this.createObjectLine = function(obj){
        var arrayOfLine = [];
        for(var j = 0; j < 4; j++){
            object = {x1:0,y1:0,x2:0,y2:0};
            if(j == 0){
                object.x1 = obj.x;
                object.y1 = obj.y;
                object.x2 = obj.x + obj.width;
                object.y2 = obj.y;
            }else
            if(j == 1){
                object.x1 = obj.x + obj.width;
                object.y1 = obj.y;
                object.x2 = obj.x + obj.width;
                object.y2 = obj.y + obj.height;
            }else
            if(j == 2){
                object.x1 = obj.x + obj.width;
                object.y1 = obj.y + obj.height;
                object.x2 = obj.x;
                object.y2 = obj.y + obj.height;
            }else
            if(j == 3){
                object.x1 = obj.x;
                object.y1 = obj.y + obj.height;
                object.x2 = obj.x;
                object.y2 = obj.y;
            }
            arrayOfLine.push(object);
        }
        return arrayOfLine;
    }
}