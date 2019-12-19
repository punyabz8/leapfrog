var i, assetsLoaded = false, backgroundImg = [], trapImg = [], enemyImg = [], obstacleImg = [], frames = 0, keyPressed = {}, gameWidth = 555, gameHeight = window.innerHeight;

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
var firingSound = new Audio();
var walkingSound = new Audio();
var backgroundSong = new Audio();
var buttonClickedSound = new Audio();
firingSound.src = './assets/sound/fire.mp3';
walkingSound.src = './assets/sound/walking.mp3';
backgroundSong.src = './assets/sound/backgroundSong.mp3';
buttonClickedSound.src = './assets/sound/buttonClicked.mp3';

for(i = 0; i < 5; i++){
    trapImg.push(new Image());
    enemyImg.push(new Image());
    obstacleImg.push(new Image());
    if(i < 2){
        backgroundImg.push(new Image());
    }
}

function redeclareImageSource(){
    arrowImg.src = './assets/images/arrow.png';
    loadingImg.src = './assets/images/loading.png';
    trapImg[0].src = './assets/images/caltrop.png';
    obstacleImg[0].src = './assets/images/block.png';
	backgroundImg[0].src = './assets/images/background1.png';
    backgroundImg[1].src = './assets/images/background2.png';
}