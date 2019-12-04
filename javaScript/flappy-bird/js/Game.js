var MAX_WIDTH = 500;
var MAX_HEIGHT = 500;
var frames = 0;

var Game = function(parentElement){

    this.parentElement = parentElement;
    this.endScreen = null;
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

        var endScreen = document.createElement('div');
        endScreen.style.border = '1px solid green';
        endScreen.style.position = 'absolute';
        endScreen.style.height = 250 + 'px';
        endScreen.style.width = 300 + 'px';
        endScreen.style.backgroundColor = 'grey';
        endScreen.style.top = 50 + 'px';
        endScreen.style.left = 100 + 'px';
        endScreen.style.opacity = 0.8;
        endScreen.style.display = 'none';
        endScreen.innerHTML = '<h2 style = "text-align :center;"> Game Over </h2>';
        parentElement.append(endScreen);
        this.endScreen = endScreen;



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

            if(that.gameStarted == false && that.gameFinished == true){
                that.endScreen('visible');
                that.gameStarted = false;
            }
            if(that.gameStarted == true && that.gameFinished == false)  {
                // that.endScreen('none');
                if(that.bird.collisionButtom(that.foreground) == true){
                    that.gameFinished == true;
                    clearInterval(gameInterval);
                    that.endScreen.style.display = 'block';
                }
                that.bird.update(that.gameStarted);
            }
        },80);
    }

    this.draw = function(){
        that.background.moveBackground();
    }

    this.resetGame = function(){
        this.parentElement = parentElement;
        this.gameStarted = false;
        this.gameFinished = false;
        this.bird.innerHML = '';
        if(highScore > this.score){
            highScore = this.score
        }
        this.score = 0;
    }

    this.keyDown = function(event){
        if(event.code == "Space" && this.gameStarted == false){
            that.gameStarted = true;
        }
        if(event.code == "Space" && this.gameStarted == true){
            that.bird.jump();
        }
        if(event.code == 'Space' && this.gameFinished == true){
            this.gameStarted = false;
            this.gameFinished = false;
            this.resetGame();
        }
        
    }
}

var flappyBirdContainer = document.getElementsByClassName('myFlappyBird');

for(var i = 0; i < flappyBirdContainer.length; i++){
    var game = new Game(flappyBirdContainer[i]).init();
}
