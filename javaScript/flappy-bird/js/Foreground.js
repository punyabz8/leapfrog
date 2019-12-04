var Foreground = function(parentElement){
    this.x = 0;
    this.width = 336;
    this.height = 112;
    this.y = MAX_HEIGHT - this.height;
    this.element = null;
    // this.parentElement = parentElement;

    this.init =function(){
        var foreground = document.createElement('div');
        this.element = foreground;
        foreground.style.background = 'url("./assets/sprites/base.png")';
        foreground.style.position = 'absolute';
        foreground.style.bottom = 0 + 'px';
        foreground.style.height = 80 + 'px';
        foreground.style.width = '100%';
        foreground.style.overflow = 'hidden';
        parentElement.append(foreground);
        this.draw();
    }

    this.draw = function(MAX_WIDTH, MAX_HEIGHT){ 

    }
}