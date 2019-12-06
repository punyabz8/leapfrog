var Foreground = function(parentElement){
    this.x = 0;
    this.width = 336;
    this.height = 112;
    this.element = null;
    this.y = MAX_HEIGHT - this.height;

    this.init =function(){
        var foreground = document.createElement('div');
        this.element = foreground;
        foreground.style.background = 'url("./assets/sprites/base.png")';
        foreground.style.width = '100%';
        foreground.style.bottom = 0 + 'px';
        foreground.style.height = 80 + 'px';
        foreground.style.overflow = 'hidden';
        foreground.style.position = 'absolute';
        parentElement.append(foreground);
    }
}