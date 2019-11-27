var slideIndex,slides,dots,i,wrapper,imageIndicatorsContainer;
function initiateSlider(){
    slideIndex = 0;
    dots = [];
    slides = document.getElementsByTagName('img');
    slides[slideIndex].style.opacity = 1;
    for (i = 0; i < slides.length; i++) {
        slides[i].style.opacity = 0;
    }
    imageIndicatorsContainer = document.getElementById('image-indicators');
    for(i = 0;i < slides.length; i++){
        var dot = document.createElement('span');
        dot.classList.add('dot');
        dot.setAttribute('onClick','moveSlider('+i+')');
        imageIndicatorsContainer.append(dot);
        dots.push(dot);
    }
    slides[slideIndex].style.opacity = 1;
    dots[slideIndex].classList.add ('active');
    setInterval(function(){
        if(slideIndex<slides.length)
            moveSlider(slideIndex+1);
    },1500);
}
// Imputs from button left and right for increment
function btnMove(n){
    moveSlider(slideIndex + n);
}
// Conditions: if new index is not equal to curr slide index, if newSlide index reach bbottom index and top index
function moveSlider(newIndex){
    var next, current;
    var animationClass={
        moveCurrent: '',
        moveNext: ''
    };
    if(newIndex > slideIndex){
        animationClass.moveCurrent = 'moveCurrentLeft';
        animationClass.moveNext = 'moveNextLeft';
        if(newIndex >= slides.length){
            newIndex = 0;
        }
    }else if(newIndex < slideIndex)
        {
            if(newIndex < 0)
                {newIndex = slides.length - 1;}
            animationClass.moveCurrent = 'moveCurrentRight';
            animationClass.moveNext = 'moveNextRight';
        }
    if(newIndex != slideIndex){
        next = slides[newIndex];
        current = slides[slideIndex];
        for(i = 0; i < slides.length; i++){
            slides[i].classList = '';
            slides[i].style.opacity = 0;
            dots[i].classList.remove("active");
        }  
        current.style.opacity = 1;
        current.classList.add(animationClass.moveCurrent);
        next.classList.add(animationClass.moveNext);
        dots[newIndex].classList.add("active");
        next.style.opacity = 1;
        slideIndex = newIndex;
    }
}

initiateSlider();