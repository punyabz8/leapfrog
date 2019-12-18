var i, backgroundImg = [];
backgroundImg.push(new Image());
backgroundImg.push(new Image());

var trapImg = [];
var enemyImg = [];
var obstacleImg = [];
var arrowImg = new Image();
var loadingImg = new Image();

for(i = 0; i < 5; i++){
    trapImg.push(new Image());
    enemyImg.push(new Image());
    obstacleImg.push(new Image());
}

function redeclareImageSource(){
	backgroundImg[0].src = './assets/images/background1.png';
    backgroundImg[1].src = './assets/images/background2.png';
    arrowImg.src = './assets/images/arrow.png';
    loadingImg.src = './assets/images/loading.png';
    obstacleImg[0].src = './assets/images/block.png';
    trapImg[0].src = './assets/images/caltrop.png';

}