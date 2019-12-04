var MAX_WIDTH = 500;
var MAX_HEIGHT = 500;
var baseHeight = 112;
var obstacles = ['pipe-green-up.png', 'pipe-green-down.png'];
var birds = ['bluebird-downflap.png', 'bluebird-midflap.png', 'bluebird-upflap.png'];

var Game = function(parentElement){
    var frames = 70;
    this.pipes = [];
    this.bird = null;
    this.score = null;
    this.endScreen = null;
    this.gameIndex = null;
    this.highScore = null;
    this.foreground = null;
    this.gameStarted = false;
    this.gameFinished = false;
    this.parentElement = parentElement;
    this.gameScore = 0;
    this.gameHighScore = 0;

    var that = this;

    this.init = function(ne){
        this.gameIndex = ne;
        parentElement.style.width = MAX_WIDTH + 'px'; 
        parentElement.style.height = MAX_HEIGHT + 'px'; 
        parentElement.style.margin = '0 auto';
        parentElement.style.backgroundColor = 'red';
        parentElement.style.background = 'url("./assets/sprites/background-day.png")';
        parentElement.style.position = 'relative';
        parentElement.style.overflow = 'hidden';
        parentElement.style.display = 'block';

        var endScreen = document.createElement('div');
        var score = document.createElement('h1');
        var highScore = document.createElement('h1');
        this.score = score;
        this.score.innerHTML = 0;
        this.highScore = highScore;
        this.highScore.innerHTML = 0;
        endScreen.style.border = '1px solid green';
        endScreen.style.position = 'absolute';
        endScreen.style.height = 300 + 'px';
        endScreen.style.width = 300 + 'px';
        endScreen.style.backgroundColor = 'grey';
        endScreen.style.top = 50 + 'px';
        endScreen.style.left = 100 + 'px';
        endScreen.style.opacity = 0.8;
        endScreen.style.display = 'none';
        endScreen.style.zIndex = '10';
        endScreen.style.textAlign = 'center';
        endScreen.innerHTML = '<h1 style = "text-align :center; color: red;"> Game Over </h1><h2>Score</h2>'+ this.score.innerHTML +
        '<h2>High Score</h2>'+ this.highScore.innerHTML;
        parentElement.append(endScreen);
        this.endScreen = endScreen;


        this.foreground = new Foreground(parentElement);
        this.foreground.init();
        document.addEventListener("keydown",this.keyDown.bind(this));
        this.startGame();
    }

    this.startGame = function(){
        this.bird = new Bird(parentElement);
        this.bird.init();
        var checkScore = true;
        var gameInterval = setInterval(function(){
            frames++;
            that.foreground.element.style.backgroundPositionX = -frames * 6 +'px';
            that.bird.draw();

            if(that.gameStarted == false && that.gameFinished == true){
                
            }
            if(that.gameStarted == true && that.gameFinished == false)  {
                if(frames % 60 == 0){
                    var obstacleUp = new Obstacle(that.parentElement);
                    var upHeight = obstacleUp.createObstacle(1, 0);
                    that.pipes.push(obstacleUp);
                    var obstacleDown = new Obstacle(that.parentElement);
                    obstacleDown.createObstacle(0, upHeight);
                    that.pipes.push(obstacleDown);
                }
                if(that.bird.collisionButtom(that.foreground) == true){
                    that.gameFinished = true;
                    clearInterval(gameInterval);
                    that.setScore();
                    that.endScreen.style.display = 'block';
                }
                if(that.bird.collisionPipe(that.pipes) == true){
                    that.gameFinished = true;
                    clearInterval(gameInterval);
                    that.setScore();
                    that.endScreen.style.display = 'block';
                }
                that.bird.update(that.gameStarted);
                for(var i = 0; i < that.pipes.length; i++){
                    that.pipes[i].update();
                }
                for(var i = 0; i < that.pipes.length; i += 2){
                    if(that.bird.x > that.pipes[i].x + that.pipes[i].height){
                        if(that.pipes[i].scoreCounted == false){
                            that.gameScore += 1;
                            that.pipes[i].scoreCounted = true;
                        }
                        console.log('running');
                        console.log(that.gameScore);
                    }
                }
            }
        },50);
    }

    this.draw = function(){
        that.background.moveBackground();
    }

    this.setScore = function(){
        if(that.gameHighScore < that.gameScore){
            that.highScore.innerHTML = that.gameHighScore;
            that.score.innerHTML = that.gameScore;
        }
    }

    this.resetGame = function(){
        console.log('reset game');
        this.gameStarted = false;
        this.gameFinished = false;
        
        this.parentElement.removeChild(this.bird.element);
        
        console.log(this.gameScore);
        console.log(this.gameHighScore);
        console.log(this.score);
        console.log(this.highScore.innerHTML);
        for(var i = this.pipes.length-1; i>= 0; i--) {
            that.parentElement.removeChild(this.pipes[i].element);
            this.pipes.pop();
        }
        that.endScreen.style.display = 'none';
        this.gameScore = 0;
    }

    this.checkPipesPosition = function(){
        for(var i=0;i<this.pipes.length;i++){
            if(this.pipes[i].x - this.pipes[i].height < 0){
                this.pipes.splice(i, 1);
            }
        }
    }

    this.keyDown = function(event){
        if(this.gameIndex % 2 == 0)        {
            if(this.gameFinished == false){
                if(event.code == "Space" && this.gameStarted == false){
                    that.gameStarted = true;
                }
                if(event.code == "Space" && this.gameStarted == true){
                    that.bird.jump();
                }
            }
            if(event.code == 'Space' && this.gameFinished == true){
                this.resetGame();
                this.startGame();
            }
        }
        if(this.gameIndex % 2 == 1)        {
            if(this.gameFinished == false){
                if(event.code == "Numpad0" && this.gameStarted == false){
                    that.gameStarted = true;
                }
                if(event.code == "Numpad0" && this.gameStarted == true){
                    that.bird.jump();
                }
            }
            if(event.code == 'Numpad0' && this.gameFinished == true){
                this.resetGame();
                this.startGame();
                // console.log(this.gameFinished);
                // console.log(this.gameStarted);
            }
        }
    }
}

var flappyBirdContainer = document.getElementsByClassName('myFlappyBird');

for(var i = 0; i < flappyBirdContainer.length; i++){
    var game = new Game(flappyBirdContainer[i]).init(i);
}
