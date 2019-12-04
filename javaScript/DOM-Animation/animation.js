var canvas = document.getElementById('animationCanvas');
canvas.height=600;
canvas.width=800;
canvas.style.margin="0 0 0 40%";
canvas.style.border="1px solid black";

var ctx = canvas.getContext("2d");
var circle = {x:canvas.width/2-50,y:50,dy:2};


function drawing(circle,cb){
    setInterval(function(){
        cb(circle.x,circle.y);
        circlePosition(circle);
    },1);
}

function circlePosition(circle){
    circle.y+=circle.dy;
    if(circle.y+50>=canvas.height)
    {
        circle.dy=-2;
    }
    if(circle.y-50<=0){
        circle.dy=2;
    }
    console.log(circle);
}

drawing(circle,function(x,y){
    ctx.clearRect(0,0,canvas.height,canvas.width);
    ctx.beginPath();
    ctx.arc(x,y,50,0,2*Math.PI);
    ctx.fillStyle = "#ff0000";
    ctx.fill();
});

