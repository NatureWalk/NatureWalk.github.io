canvas = document.getElementById("myCanvas");
context = canvas.getContext("2d");

/**
 * QuadTree object.
 *
 * The quadrant indexes are numbered as below:
 *     |
 *  1  |  0
 * —-+—-
 *  2  |  3
 *     |
 */
function QuadTree(lvl, boundbox) {
	var maxObjects = 10;
	this.bounds = boundbox;
	var objects = [];
	this.nodes = [];
	var level = lvl;
	var maxLevels = 5;
	/*
	 * Clears the quadTree and all nodes of objects
	 */
	this.clear = function() {
		objects = [];
		for (var i = 0; i < this.nodes.length; i++) {
			this.nodes[i].clear();
		}
		this.nodes = [];
	};
	
	/*
	* Splits the node into four subnodes by dividing 
	* the node into four equal parts and initializing the four subnodes with the new bounds.
	*/
	
	this.split = function(){
	var subWidth = this.bounds.width/2;
	var subHeight = this.bounds.height/2;
	var x = this.bounds.x;
	var y = this.bounds.y;
	
	this.nodes[0] = new Quadtree(lvl+1, {x: x+subWidth, y: y, width: subWidth, height: subHeight});  
	this.nodes[1] = new Quadtree(lvl+1, {x: x, y: y, width: subWidth, height: subHeight});
	this.nodes[2] = new Quadtree(lvl+1, {x: x, y: y+subHeight, width: subWidth, height: subHeight});
	this.nodes[3] = new Quadtree(lvl+1, {x: x+subWidth, y: y+subHeight, width: subWidth, height: subHeight});
	};
	
/*
 * Determine which node the object belongs to. -1 means
 * object cannot completely fit within a child node and is part
 * of the parent node
 */
	this.getIndex = function(obj){
	var index = -1;
	var verticalMidpoint = this.bounds.x + (this.bounds.width / 2);
	var horizontalMidpoint = this.bounds.y + (this.bounds.height / 2);
	
	// Object can completely fit within the top quadrants
	var topQuadrant = (obj.y < horizontalMidpoint && obj.y + obj.height < horizontalMidpoint);
	// Object can completely fit within the bottom quadrants
	var bottomQuadrant = (obj.y > horizontalMidpoint);
	
	// Object can completely fit within the left quadrants
	if (obj.x < verticalMidpoint && obj.x + obj.width < verticalMidpoint){
		if(topqQuadrant){
			index = 1;
		}
		else if(bottomQuadrant){
			index = 2;
		}
	}
	
	// Object can completely fit within the right quadrants
	else if (obj.x > verticalMidpoint){
		if(topQuadrant){
			index = 0;
		}
		
		else if(bottomQuadrant){
			index = 3;
		}
	}
	
	return index;
	};
	
	/*
 * Insert the object into the quadtree. If the node
 * exceeds the capacity, it will split and add all
 * objects to their corresponding nodes.
 */
	this.insert = function(obj) {
		if (typeof obj === "undefined") {
			return;
		}

		if (obj instanceof Array) {
			for (var i = 0, len = obj.length; i < len; i++) {
				this.insert(obj[i]);
			}

			return;
		}

		if (this.nodes.length) {
			var index = this.getIndex(obj);
			if (index != -1) {
				this.nodes[index].insert(obj);

				return;
			}
		}

		objects.push(obj);

		// Prevent infinite splitting
		if (objects.length > maxObjects && level < maxLevels) {
			if (this.nodes[0] == null) {
				this.split();
			}

			var i = 0;
			while (i < objects.length) {

				var index = this.getIndex(objects[i]);
				if (index != -1) {
					this.nodes[index].insert((objects.splice(i,1))[0]);
				}
				else {
					i++;
				}
			}
		}
	};
	
		/*
	 * Get all objects in the quadTree
	 */
	this.getAllObjects = function(returnedObjects) {
		for (var i = 0; i < this.nodes.length; i++) {
			this.nodes[i].getAllObjects(returnedObjects);
		}
		for (var i = 0, len = objects.length; i < len; i++) {
			returnedObjects.push(objects[i]);
		}
		return returnedObjects;
	};
	
	// returns all objects it can collide with
	
	this.getObjects = function(returnObjects, obj){
		var index = this.getIndex(obj);
		if(index != -1 && this.nodes[0] != null){
			this.nodes[index].getObjects(returnObjects, obj);
		}
		
		for (var i = 0; i < objects.length; i++) {
			returnedObjects.push(objects[i]);
		}
		return returnedObjects;
	};
}


var square = {
	x:0,
	y:0,
	speedX:5,
	speedY:1,
	Draw: function(){
		context.font = "12px Verdana";
		context.fillStyle = "black";
		context.fillText("coord x: " + this.x, 20 ,20);
		context.fillText("coord y: " + this.y, 20 ,32);
	    context.fillRect(this.x, this.y, 20, 20);
		this.x += this.speedX;
		this.y += this.speedY;
		
		if(this.x >= 800 || this.x<=0){
		this.speedX = -this.speedX
		}
		else if (this.y >= 600 || this.y <=0){
		this.speedY = -this.speedY
		}
	}
};

var circle =  new function(){
	this.x=200,
	this.y=200,
	this.speedX=5,
	this.speedY=5,
	this.collidablewith = "square",
	this.type = "circle"
	this.Draw = function(){
		context.font = "12px Verdana";
		context.fillStyle = "blue";
		context.fillText("coord x: " + this.x, 20 ,48);
		context.fillText("coord y: " + this.y, 20 ,60)
	    context.fillRect(this.x, this.y, 20, 20);
		this.x += this.speedX;
		this.y += this.speedY;
		
		if(this.x >= 800 || this.x<0){
		this.speedX = -this.speedX
		}
		else if (this.y >= 600 || this.y <0){
		this.speedY = -this.speedY
		}
	}
};
function update(){
	this.quad = new QuadTree({x:0,y:0,width:800,height:600});
	
	quad.clear();
	//quad.insert(square);
	quad.insert(circle);
	
	//collisionChecker();
}

function draw(){
	canvas.width = canvas.width;
	
	var objects = [];
	objects.push(square);
	
	context.font = "12px Verdana";
	context.fillStyle = "black";
	context.fillText("objects: " + objects[0] , 100 ,20);
	
	square.Draw();
	circle.Draw();
}


function game_loop(){
	update();
	draw();
}

function collisionChecker(){
var objects = [];
update.quad.getAllObjects(objects);

	for (var x = 0, len = objects.length; x < len; x++) {
		game.quadTree.getObjects(obj = [], objects[x]);

		for (y = 0, length = obj.length; y < length; y++) {

			// DETECT COLLISION ALGORITHM
			if (objects[x].collidableWith === obj[y].type &&
				(objects[x].x < obj[y].x + obj[y].width &&
			     objects[x].x + objects[x].width > obj[y].x &&
				 objects[x].y < obj[y].y + obj[y].height &&
				 objects[x].y + objects[x].height > obj[y].y)) {
				objects[x].isColliding = true;
				obj[y].isColliding = true;
			}
		}
	}
}

setInterval(game_loop, 30);
