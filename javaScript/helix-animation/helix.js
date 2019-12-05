function Helix(canvas){
    this.canvas = canvas;
    this.c = canvas.getContext('2d');
    this.width = 600;
    this.height = 600;
    this.currentLoopCircles = [];
    this.nextLoopCircles = [];
    // this.currentLoopCircles = [[]];
    // this.nextLoopCircles = [[]];
    this.circleDistance = 20;
    this.frames = 0;

    var that = this;
    

    this.init = function(){
        canvas.width = this.width;
        canvas.height = this.height;
        this.c.fillStyle = 'rgba(0,255,0, 1)';
        this.c.fillRect(0, 0, this.width, this.height);
        this.c.fill();
        for( var k =0, y = 100; k < 10; k++, y += 30){
            for(var i = 0; i< 15; i++){
                var circle = new Circle(this.c, i , y, 0.5);
                this.currentLoopCircles.push(circle);
            }
            for(var i = 0; i< 15; i++){
                var circle = new Circle(this.c, i , y, -0.5);
                this.currentLoopCircles.push(circle);
            }
        }
        this.draw();
        this.animate();
    }

    this.draw = function(){
        // for(var k = 0; k < this.currentLoopCircles.length; k++){
        //     for(var i = 0; i< this.currentLoopCircles[k].length; i++){
        //         this.currentLoopCircles[i].draw();
        //     }
        // }
        for(var i = 0; i< this.currentLoopCircles.length; i++){
            this.currentLoopCircles[i].draw();
        }
    }

    this.update = function(){

        this.draw();
    }

    this.animate = function(){
        requestAnimationFrame(function(){that.animate();});
        this.c.clearRect(0, 0, this.width, this.height);
        for(var i = 0; i< this.currentLoopCircles.length; i++){
            this.currentLoopCircles[i].update();
    }
        // for(var k =0; k< this.currentLoopCircles.length; k++)
            // for(var i = 0; i< this.currentLoopCircles[k].length; i++){
            //     this.currentLoopCircles[k][i].update();
            // }
        this.frames++;

        // this.c.beginPath();
        // this.c.arc(100, 100, 10, 0, Math.PI * 2, false);
        // this.c.fillStyle = 'rgba(0,0,255)';
        // this.c.fill();
    }
}

function Circle(c, nextX, y, angle){
    this.x = 100 + (nextX * 30);
    this.y = y + (Math.sin(nextX * angle)* 30);
    this.c = c;
    this.dy = 3;
    this.radius = 1;
    // this.start = false;
    this.yBackup = this.y;
    this.increaseRadiusRate = 0.5;
    this.currentRadius = 5;
    this.MinCircleRadius = 0.5;
    this.MaxCircleRadius = 20;
    this.circleStateIncreasing = true;

    this.draw = function(){
        this.c.beginPath();
        this.c.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2, false);
        this.c.fillStyle = 'rgba(255,0,0)';
        this.c.fill();
    }

    this.update = function(){
        if(this.circleStateIncreasing == true){
            if(this.currentRadius < 8){
                this.y -= this.dy;
            }else if(this.currentRadius > 8){
                this.y += this.dy;
            }
            if(this.currentRadius == this.MaxCircleRadius){
                this.circleStateIncreasing = false;
            }
            this.currentRadius += this.increaseRadiusRate;            
        }else{
            if(this.currentRadius > this.MinCircleRadius){
                this.currentRadius -= this.increaseRadiusRate;
            }
            console.log("current radius: ",this.currentRadius);
            if(this.currentRadius == this.MinCircleRadius){
                this.circleStateIncreasing = true;
                this.y = this.yBackup
            }
        }
        this.draw();

    }
    this.fallDown = function(){

    }

    this.RaiseUp = function(){

    }
}













var canvasList = document.getElementsByClassName('myCanvas');
// for(var i = 0; i < canvasList.length; i++){
    var helix = new Helix(canvasList[0]).init();
// }