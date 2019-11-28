// var i, dot, dots = [], sliderImage, sliderBtn, arrow, arrowLeft, arrowRight, sliderBtnLeft, sliderBtnRight, state, slideIndex, carouselContainer, carouselWrapper, containerHeight, containerWidth, imageIndicatorsContainer, buttonSize = 10;
var carouselCollection = [], i, j;
carouselContainer = document.getElementsByClassName('carousel-container');

for(j = 0; j < carouselContainer.length; j++){
	console.log(j);
	console.log(carouselContainer[j]);
	carouselCollection[j] = new carousel();
	carouselCollection[j].init(carouselContainer[j], j);
}


function carousel(carouselContainer){
	this.dots = [];
	this.arrow = null;
	this.arrowLeft = null;
	this.sliderBtn = null;
	this.arrowRight = null;
	this.sliderImage = null;
	this.sliderBtnLeft = null;
	this.sliderBtnRight = null;
	this.carouselNumber = null;
	this.containerWidth = null;
	this.carouselWrapper = null;
	this.carouselWrapper = null;
	this.containerHeight = null;
	this.imageIndicatorsContainer = null;

	this.newIndex = 0;
  this.slideIndex = 0;
  this.intervalTime = 1500;

  this.setCarousel = function(carouselObject){
		this.carouselContainer = carouselObject;
		this.carouselWrapper = this.carouselContainer.getElementsByClassName('carousel-wrapper');
		this.containerHeight = this.carouselContainer.offsetHeight;
		this.containerWidth = this.carouselContainer.offsetWidth;
		this.sliderImage = this.carouselContainer.getElementsByTagName('img');
  }


  this.init = function(carouselObject, carouselNumber){
		this.carouselNumber = carouselNumber;
		this.setCarousel(carouselObject);
		carouselSetProperities(this);
  }
}




function carouselSetProperities(carouselObj){
	carouselObj.slideIndex = 0;
	
  //Style for carouselContainer
  carouselObj.carouselContainer.style.width = '100%';
	carouselObj.carouselContainer.style.overflow = 'hidden';
	carouselObj.carouselContainer.style.margin = 0 + ' auto';
	carouselObj.carouselContainer.style.position = 'relative';
	carouselObj.carouselContainer.style.maxWidth = carouselObj.containerWidth + 'px';
  
	
	//Style for carouselWrapper
	carouselObj.carouselWrapper[0].style.height = 'auto';
	carouselObj.carouselWrapper[0].style.width = carouselObj.width * carouselObj.sliderImage.length;
	
	//style for every images
	for(i = 0; i < carouselObj.sliderImage.length; i++){
		carouselObj.sliderImage[i].style.position = 'absolute';
		carouselObj.sliderImage[i].style.width = carouselObj.containerWidth;
		carouselObj.sliderImage[i].style.opacity = 1;
		carouselObj.sliderImage[i].style.maxHeight = carouselObj.containerHeight;
	}
		
    //create button
	createButton(carouselObj);
	carouselObj.sliderBtnLeft = carouselObj.sliderBtn.cloneNode(true);
	carouselObj.sliderBtnRight = carouselObj.sliderBtn.cloneNode(true);

	carouselObj.sliderBtnRight.style.right = '0%';
	carouselObj.sliderBtnLeft.style.cursor = 'pointer';
	carouselObj.sliderBtnRight.style.cursor = 'pointer';	
	carouselObj.sliderBtnRight.style.transform = 'rotate(180deg)';
	carouselObj.sliderBtnLeft.setAttribute('onclick','plusIndex('+ -1 +','+ carouselObj.carouselNumber +')');
	carouselObj.sliderBtnRight.setAttribute('onclick','plusIndex('+ 1 +','+ carouselObj.carouselNumber +')');

	carouselObj.carouselContainer.append(carouselObj.sliderBtnLeft);
	carouselObj.carouselContainer.append(carouselObj.sliderBtnRight);
		
    //create arrow (Inside button)
  createArrow(carouselObj);
  carouselObj.arrowLeft = carouselObj.arrow.cloneNode(true);
  carouselObj.arrowRight = carouselObj.arrow.cloneNode(true);
  carouselObj.sliderBtnLeft.append(carouselObj.arrowLeft);
	carouselObj.sliderBtnRight.append(carouselObj.arrowRight);
	
	//Creates image indicators (dots)
	carouselObj.imageIndicatorsContainer = document.createElement('div');
	carouselObj.imageIndicatorsContainer.style.width = '100%';
	carouselObj.imageIndicatorsContainer.style.margin = '0 auto';
	carouselObj.imageIndicatorsContainer.style.position = 'absolute';
	carouselObj.imageIndicatorsContainer.style.bottom = '0%';
	carouselObj.imageIndicatorsContainer.style.height = '10%';
	carouselObj.imageIndicatorsContainer.style.textAlign = 'center';
  carouselObj.carouselContainer.append(carouselObj.imageIndicatorsContainer);
  createDots(carouselObj);

	// Time interval to slide image
  setInterval(function(){
    if(carouselObj.slideIndex < carouselObj.sliderImage.length)
        moveSlider(carouselObj.slideIndex + 1, carouselObj.carouselNumber);
  },carouselObj.intervalTime);
}



function createButton(carouselObj){
	carouselObj.sliderBtn = document.createElement('div');
	carouselObj.sliderBtn.style.top = '45%';
	carouselObj.sliderBtn.style.position = 'absolute';
	carouselObj.sliderBtn.style.backgroundColor = '#888';
	carouselObj.sliderBtn.style.height = 10 * carouselObj.containerHeight / 100 + 'px';
	carouselObj.sliderBtn.style.width = 9 * carouselObj.containerHeight / 100 + 'px';
	carouselObj.sliderBtn.style.borderTopLeftRadius = '8px';
	carouselObj.sliderBtn.style.borderBottomLeftRadius = '8px';
	carouselObj.sliderBtn.style.opacity = 0.6;
}
// 
function createArrow(carouselObj){
	carouselObj.arrow = document.createElement('span');
	carouselObj.arrow.style.position = 'absolute';
	carouselObj.arrow.style.top = '38%';
	carouselObj.arrow.style.left = '35%';
	carouselObj.arrow.style.border = '4px solid white';
	carouselObj.arrow.style.width = '30%';
	carouselObj.arrow.style.height = '30%';
	carouselObj.arrow.style.borderLeft = 'none';
	carouselObj.arrow.style.borderBottom = 'none';
	carouselObj.arrow.style.transform = 'rotateZ(45deg)';
	carouselObj.arrow.style.display = 'inline-block';	
	carouselObj.arrow.style.transform = 'rotate(225deg)';
	carouselObj.arrow.style.margin = 'auto auto';
}
//Create dots as per number of images in slider 
function createDots(carouselObj){
	for (i = 0; i < carouselObj.sliderImage.length; i++) {
		createDot(carouselObj, i);
	}
}
function createDot(carouselObj, i){
	dot = document.createElement('span');
	dot.style.width = '4%';
	dot.style.opacity = 0.8;
	dot.style.height = '60%';
	dot.style.cursor = 'pointer';
	dot.style.borderRadius = '50%';
	dot.style.borderRadius = '50%%';
	dot.style.backgroundColor = '#888';
	dot.style.display = 'inline-block';
	if(i!=0){dot.style.marginLeft = '20px'};
	dot.setAttribute('onclick','moveSlider('+ i +','+ carouselObj.carouselNumber +')');
	carouselObj.imageIndicatorsContainer.append(dot);
	carouselObj.dots.push(dot);
}

function moveSlider(newIndex, num){
  var next, current;
  var animationClass = {
      moveCurrent: '',
      moveNext: ''
  };
  console.log(num);
  console.log(carouselCollection[num]);
  if(newIndex > carouselCollection[num].slideIndex){
      animationClass.moveCurrent = 'moveCurrentLeft';
      animationClass.moveNext = 'moveNextLeft';
      if(newIndex >= carouselCollection[num].sliderImage.length){
          newIndex = 0;
      }
  }else if(newIndex < carouselCollection[num].slideIndex)
  {
    if(newIndex < 0)
        {newIndex = carouselCollection[num].sliderImage.length - 1;}
    animationClass.moveCurrent = 'moveCurrentRight';
    animationClass.moveNext = 'moveNextRight';
  }
  if(newIndex != carouselCollection[num].slideIndex){
    next = carouselCollection[num].sliderImage[newIndex];
    current = carouselCollection[num].sliderImage[carouselCollection[num].slideIndex];
    for(i = 0; i < carouselCollection[num].sliderImage.length; i++){
      carouselCollection[num].sliderImage[i].classList = '';
      carouselCollection[num].sliderImage[i].style.opacity = 0;
      carouselCollection[num].dots[i].classList.remove("active");
    }  
    current.style.opacity = 1;
    current.classList.add(animationClass.moveCurrent);
    next.classList.add(animationClass.moveNext);
    carouselCollection[num].dots[newIndex].classList.add("active");
    next.style.opacity = 1;
    carouselCollection[num].slideIndex = newIndex;
  }
}

function plusIndex(action,num){
  moveSlider(action + carouselCollection[num].slideIndex, num);
}