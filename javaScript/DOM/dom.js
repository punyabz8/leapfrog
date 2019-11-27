var dots = document.getElementById('domCanvas');
dots.height=300;
dots.width=300;
dots.style.margin='0 0 0 40%';
dots.style.border='1px solid black';


function createDots(values,cb){
    values.forEach(function(item){
        cb(item.x,item.y);
    });
}

var values=[
    {x:10,y:20},
    {x:50,y:60},
    {x:70,y:20},
    {x:90,y:150},
    {x:120,y:100},
    {x:150,y:20},
    {x:170,y:250},
    {x:200,y:200}
];

createDots(values,function(x,y){
    var ctx = dots.getContext('2d');
    ctx.beginPath();
    ctx.arc(x,y,10,0,2*Math.PI);
    ctx.fillStyle = '#0000ff';
    ctx.fill();
});