function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
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
		context.shadowBlur = 30;
        context.shadowOffsetX = 15;
        context.shadowOffsetY = 20;
		context.shadowColor = 'black';
	}else{
		context.shadowBlur = 0;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
		context.shadowColor = 'transparent';
	}

}