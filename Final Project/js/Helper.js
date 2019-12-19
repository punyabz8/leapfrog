function getRandomIntRange(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

//detect collision between two objects (rectangle)
var collisionCheck = function(obj1,obj2){
	if (obj1.x < obj2.x + obj2.width &&
		obj1.x + obj1.width > obj2.x &&
		obj1.y < obj2.y + obj2.height &&
		obj1.y + obj1.height > obj2.y)
		{
			return true;
		}
}

// toggle shadow setting for canvas
var toggleShadow = function(context){
	if(context.shadowColor == 'rgba(0, 0, 0, 0)'){
		context.shadowBlur = 25;
        context.shadowOffsetX = 5;
        context.shadowOffsetY = 15;
		context.shadowColor = 'black';
	}else{
		context.shadowBlur = 0;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
		context.shadowColor = 'transparent';
	}

}
var createStrokeRectangle = function (ctx, color, x, y, width, height, lineWidth){
	ctx.strokeStyle = color;
	ctx.lineWidth = lineWidth;
	ctx.strokeRect(x, y, width, height);
	ctx.lineWidth = '0';
}
var createRectangle = function (ctx, color, x, y, width, height){
	ctx.fillStyle = color;
	ctx.fillRect(x, y, width, height);
}
var createTextField = function(ctx,font, text, color, x, y, textWide){
	ctx.font = font;
	ctx.fillStyle = color;
	ctx.fillText(text, x, y, textWide);
}
var createTextStrokeField = function(ctx,font, width, text, color, x, y, textWide){
	ctx.font = font;
	ctx.lineWidth = width;
	ctx.strokeStyle = color;
	ctx.strokeText(text, x, y, textWide);
	ctx.lineWidth = '0';
}