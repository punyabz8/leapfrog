var i, backgroundImg = [], trapImg = [], enemyImg = [], obstacleImg = [], frames = 0, keyPressed = {}, gameWidth = 555, gameHeight = window.innerHeight;

var mapInfo = {
    x: gameWidth, 
    y: 1750}, 
viewControl={x: 0, 
    y: (mapInfo.y - gameHeight)}, 
gameBoundary={
    top: 465, 
    left: 20, 
    bottom: 300, 
    right: 537}, 
gameFlags = {
	levelComplete: false,
	gameOver: false,
	nextLevel: false,
	firstTimeMapLoad: true
};

var arrowImg = new Image();
var loadingImg = new Image();

for(i = 0; i < 5; i++){
    trapImg.push(new Image());
    enemyImg.push(new Image());
    obstacleImg.push(new Image());
    if(i < 2){
        backgroundImg.push(new Image());
    }
}

function redeclareImageSource(){
	backgroundImg[0].src = './assets/images/background1.png';
    backgroundImg[1].src = './assets/images/background2.png';
    arrowImg.src = './assets/images/arrow.png';
    loadingImg.src = './assets/images/loading.png';
    obstacleImg[0].src = './assets/images/block.png';
    trapImg[0].src = './assets/images/caltrop.png';
}