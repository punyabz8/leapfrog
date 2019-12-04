var MAX_WIDTH = 500;
var MAX_HEIGHT = 500;
var frames = 0;

var Game = function(parentElement){

    this.parentElement = parentElement;
    this.gameStarted = false;
    this.gameFinished = false;
    this.foreground = null;
    this.bird = null;
    this.score = 0;
    var highScore = 0;


    var that = this;

    this.init = function(){

        parentElement.style.width = MAX_WIDTH + 'px'; 
        parentElement.style.height = MAX_HEIGHT + 'px'; 
        parentElement.style.margin = '0 auto';
        parentElement.style.backgroundColor = 'red';
        parentElement.style.background = 'url("./assets/sprites/background-day.png")';
        parentElement.style.position = 'relative';
        this.foreground = new Foreground(parentElement);
        this.foreground.init();
        this.bird = new Bird(parentElement);
        this.bird.init();
        document.addEventListener("keydown",this.keyDown.bind(this));
        this.startGame();
    }

    this.startGame = function(){
        var gameInterval = setInterval(function(){
            frames++;
            that.foreground.element.style.backgroundPositionX = -frames * 6 +'px';
            that.bird.draw();
            // console.log(that.gameStarted);
            // console.log(that.gameFinished);

            if(that.gameStarted == false && that.gameFinished == true){
                that.endScreen('visible');
                that.gameStarted = false;
            }
            if(that.gameStarted == true && that.gameFinished == false)  {
                that.endScreen('none');
                if(that.bird.collisionButtom(that.foreground) == true){
                    that.gameFinished == true;
                    clearInterval(gameInterval);
                }
                that.bird.update(that.gameStarted);
            }
        },500);
    }

    this.endScreen = function(show){

    }

    this.draw = function(){
        that.background.moveBackground();
    }

    this.keyDown = function(event){
        if(event.code == "Space" && this.gameStarted == false){
            that.gameStarted = true;
        }
        if(event.code == "Space" && this.gameStarted == true){
            // that.bird.speed = 
        }
    }
}

var flappyBirdContainer = document.getElementsByClassName('myFlappyBird');

for(var i = 0; i < flappyBirdContainer.length; i++){
    var game = new Game(flappyBirdContainer[i]).init();
}
