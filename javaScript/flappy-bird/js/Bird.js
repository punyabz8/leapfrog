var Bird = function(parentElement){
    this.width = 34;
    this.height = 24;
    this.element = null;
    this.birdAnimation = 1;
    this.speed = 0;
    this.gravity = 5;
    this.x = MAX_WIDTH / 2 - this.width / 2;
    this.y = MAX_HEIGHT /2 - this.height / 2;
    var birds = ['bluebird-downflap.png','bluebird-midflap.png','bluebird-upflap.png'];

    var that = this;

    this.init = function(){
        var bird = document.createElement('div');
        bird.style.background = 'url("./assets/sprites/'+ birds[that.birdAnimation] +'")';
        bird.style.position = 'absolute';
        bird.style.left = this.x + 'px';
        bird.style.top = this.y + 'px';
        bird.style.height = this.height + 'px';
        bird.style.width = this.width + 'px';
        parentElement.append(bird); 
        this.element = bird;
    }

    this.getBirdValue = function(){
        this.birdAnimation += 1;
        this.birdAnimation %= 3;
    }


    this.draw = function(){
        this.getBirdValue();
        this.element.style.background = 'url("./assets/sprites/'+ birds[that.birdAnimation] +'")';
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }

    this.update = function(gameState){
        if( gameState == false )
            {bird.style.top = this.y + 'px';}
        else{
            this.speed += this.gravity;
            this.y += this.speed;
            if(this.speed > 0){
                this.element.style.transform = 'rotate('+ this.speed * 360 +')';
                console.log(this.speed * 360);
            }
        }
        this.draw();
    }

    this.collisionButtom = function(element){
        console.log(element);
        console.log(this);
        console.log('Background :x ',element.x, "y ",element.y);
        console.log('x ',this.x, "y ",this.y);
        if (this.y + this.height >= MAX_HEIGHT - element.height){
                return true;
        }
    }

    this.rise = function(){
        this.y += this.speed;
    }
}