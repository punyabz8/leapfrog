var canvas = document.getElementsByTagName('canvas');

var ctx1 = canvas[0].getContext('2d');
var ctx2 = canvas[1].getContext('2d');
var ctx3 = canvas[2].getContext('2d');

ctx1.fillStyle = 'red';
ctx1.fillRect(0, 0, 700, 500);

ctx2.fillStyle = 'blue';
ctx2.fillRect(0, 0, 700, 500);

canvas[0].style.position = 'relative';

canvas[1].style.position = 'absolute';
canvas[1].style.top = '20px';
canvas[1].style.left = '20px';
canvas[1].style.opacity = '0.5';

ctx2.clearRect(0,0,700,500);