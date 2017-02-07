canvas = document.getElementById("myCanvas");
context = canvas.getContext("2d");

//create an object array
var objectList = [];

var square = new function() {
//default object characteristics
	this.x=0,
	this.y=0,
	this.width = 50,
	this.height = 50,
	this.speedX=10,
	this.speedY=5,
	this.collidablewith = "circle",
	this.type = "square",
	this.Draw= function(){
	
	// display coordinates on the canvas for testing
		context.font = "12px Verdana";
		context.fillStyle = "black";
		context.fillText("coord x: " + this.x, 20 ,20);
		context.fillText("coord y: " + this.y, 20 ,32);
		
		//draw the image of the object
	    context.fillRect(this.x, this.y, this.width, this.height);
		
		//default movement
		this.x += this.speedX;
		this.y += this.speedY;
		
		//check if there is collision
		if(collisionChecker(this.x, this.y, this.width, this.height, this.collidablewith, this.type)){
			//what happens if collision comes back true
			this.speedX=-this.speedX;
			this.speedY= -this.speedY;
		}
	}
};
//push object to the object array
objectList.push(square);

var circle =  new function(){
//default object characteristics
	this.x=70,
	this.y=70,
	this.width = 20,
	this.height = 20,
	this.speedX=20,
	this.speedY=15,
	this.collidablewith = "square",
	this.type = "circle",
	this.Draw = function(){
	
	// display coordinates on the canvas for testing
		context.font = "12px Verdana";
		context.fillStyle = "blue";
		context.fillText("coord x: " + this.x, 20 ,48);
		context.fillText("coord y: " + this.y, 20 ,60);
		
		//draw the image of the object
	    context.fillRect(this.x,this.y, this.width, this.height);
		
		//default movement
		this.x += this.speedX;
		this.y += this.speedY;
		
		//check if there is collision
		if(collisionChecker(this.x, this.y, this.width, this.height, this.collidablewith, this.type)){
			//what happens if collision comes back true
			this.speedX=-this.speedX;
			this.speedY= -this.speedY;
		}
	}
};
//push object to the object array
objectList.push(circle);


function draw(){
	canvas.width = canvas.width;
	
	//display object array contents on canvas for testing
	context.font = "12px Verdana";
	context.fillStyle = "black";
	context.fillText("objects in array: " + objectList , 400 ,20);
	
	square.Draw();
	circle.Draw();
}


function game_loop(){
	draw();
}


function collisionChecker(x , y, width, height, collidablewith, type){

// boundary collision detection
		if(x >= 800 || x<0){
		return true;
		}
		else if (y >= 600 || y <0){
		return true;
		}
		
					// object collision detection within the array
		for(var i = 0; i<objectList.length; i++){
			if (collidablewith === objectList[i].type &&
				(x < objectList[i].x + objectList[i].width &&
			     x + width > objectList[i].x &&
				 y < objectList[i].y + objectList[i].height &&
				 y + height > objectList[i].y)) {
				return true;
			}
		}
		

		
}

setInterval(game_loop, 30);
