var i, assetsLoaded = false, backgroundImg = [], trapImg = [], enemyImg = [], obstacleImg = [], frames = 0, keyPressed = {}, gameWidth = 555, gameHeight = window.innerHeight;

var mapInfo = {
    x: gameWidth, 
    y: 1750}, 
viewControl={x: 0, 
    y: (mapInfo.y - gameHeight),
    movingState: false}, 
gameBoundary={
    top: 465, 
    left: 20, 
    bottom: 300, 
    right: 537}, 
gameFlags = {
	levelComplete: false,
	gameOver: false,
	nextLevel: false,
    firstTimeMapLoad: true,
    gameFinished: false
};

keyPressed = {
    w: false,
    d: false,
    s: false,
    a: false,
    ArrowUp: false,
    ArrowLeft: false,
    ArrowDown: false,
    ArrowRight: false,
    W: false,
    S: false,
    D: false,
    A: false,
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
skillList = ['criticalMaster.png','poison.png','doubleArrow.png', 'rage.png', 'bloodLust.png', 'healthBoost.png', 'waterWalking.png', 'douge.png', 'heal.png', 'attackBoost.png', 'criticalBoost.png', 'poisonBoost.png', 'attackSpeedBoost.png'];
var powerUpImg = [];
for(i = 0; i < skillList.length; i++){
    if(i < 5){
        trapImg.push(new Image());
        enemyImg.push(new Image());
        obstacleImg.push(new Image());
        if(i < 2){
            backgroundImg.push(new Image());
        }
    }
    powerUpImg.push(new Image());
}

function redeclareImageSource(){
    arrowImg.src = './assets/images/arrow.png';
    loadingImg.src = './assets/images/loading.png';
    trapImg[0].src = './assets/images/caltrop.png';

    obstacleImg[1].src = './assets/images/pool.png';
    obstacleImg[0].src = './assets/images/block.png';
    obstacleImg[2].src = './assets/images/fence.png';

	backgroundImg[0].src = './assets/images/background1.png';
    backgroundImg[1].src = './assets/images/background2.png';
    
    for(var i = 0; i < skillList.length; i++){
        powerUpImg[i].src = './assets/images/skills/' + skillList[i];
    }
}