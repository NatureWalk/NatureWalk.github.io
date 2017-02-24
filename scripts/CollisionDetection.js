
/*var quad = new QuadTree({
	x: 0,
	y: 0,
    width: 1024,
	height: 576
}); */

collidableObjects = [];

function collisionChecker(x , y, width, height, collidablewith, name){
// boundary collision detection
		if((x+width) >= canvas.width || x < canvas.width/2){
		return true;
		}
		else if ((y+height) >= canvas.height || y <0){
		return true;
		}
					// object collision detection within the array
		for(var i = 0; i< collidableObjects.length; i++){
			for(var j = 0; j < collidablewith.length; j++){
				if(collidablewith[j] == collidableObjects[i].name){
					if (x < collidableObjects[i].x + collidableObjects[i].width &&
			    		x + width > collidableObjects[i].x &&
				 		y < collidableObjects[i].y + collidableObjects[i].height &&
				 		y + height > collidableObjects[i].y) {
							return true;
					}
				}
			}
			
		}
	
}
