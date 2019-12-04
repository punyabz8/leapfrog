var Bird = function(parentElement){
    this.width = 34;
    this.height = 24;
    this.element = null;
    this.birdAnimation = 1;
    this.speed = 0;
    this.gravity = 4;
    this.jumpValue = 60;
    this.x = MAX_WIDTH / 2 - this.width / 2;
    this.y = MAX_HEIGHT /2 - this.height / 2;
    this.rotate = 0;
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
                this.rotate = this.speed * 2.5
                if(this.rotate >90)
                    {this.rotate = 90;}
                this.element.style.transform = 'rotateZ('+ this.rotate + 'deg)';
            }
            if(this.jumpState = true){
                this.rotate = this.jump * 2.5;
                this.element.style.transform = 'rotateZ('+ this.rotate + 'deg)';
            }
        }
        this.draw();
    }

    this.jump = function(){
        console.log(this.y);
        this.y -= this.jumpValue;
        console.log(this.y);
        this.speed = 0;
        this.draw();
        
    }

    this.collisionButtom = function(element){
        // console`.log('Background :x ',element.x, "y ",element.y);
        if (this.y + this.height/2 >= MAX_HEIGHT - element.height){
            return true;
        }
    }

    this.rise = function(){
        this.y += this.speed;
    }
}