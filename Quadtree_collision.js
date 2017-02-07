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
	this.bounds = boundbox || {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
	var objects = [];
	this.nodes = [];
	var level = lvl || 0;
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
	this.insert = function(obj){
		if(this.nodes[0] != null){
		var index = this.getIndex(obj);
		
			if(index != -1){
				this.nodes[index].insert(obj);
		
				return;
			}
		}
		objects.push(obj);
		
		if(objects.length > maxObjects && level < maxLevels){
			if(this.nodes[0] == null){
				this.split();
			}
			
			var i = 0;
			while( i < objects.length){
				var index = this.getIndex(objects[i]);
				if(index != -1){
					this.nodes[index].insert((objects.splice(i,1))[0]);  // objects.remove(i)
				}
				else{
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


function Drawable() {
	this.init = function(x, y, width, height) {
		// Default variables
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	this.speed = 0;
	this.canvasWidth = 0;
	this.canvasHeight = 0;
	this.collidableWith = "";
	this.isColliding = false;
	this.type = "";

	// Define abstract function to be implemented in child objects
	this.draw = function() {
	};
	this.move = function() {
	};
	this.isCollidableWith = function(object) {
		return (this.collidableWith === object.type);
	};
}

// Object classes go here and their properties
function square(){
    this.alive = false;
	this.collidableWith = "circle";
	this.type = "enemy";
	
	this.spawn = function(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speedX = 5;
		this.speedY = 5;
		this.alive = true;
		this.leftEdge = this.x - 90;
		this.rightEdge = this.x + 90;
		this.bottomEdge = this.y + 140;
	};

	this.draw = function(){
		context.fillStyle = "black";
	    context.fillRect(0, 0, 800, 600);
		this.x += this.speedX;
		this.y += this.speedY;
		
		if(this.x <= 800){
		this.speedX = -this.speedX
		}
	else if (this.y <= 600){
		this.speedY = -this.speedY
		}
	};
	
	this.clear = function(){
		this.x = 0;
		this.y = 0;
		this.speedX = 0;
		this.speedY = 0;
		this.alive = false;
		this.isColliding = false;
	};
}
square.prototype = new Drawable();

/*
 * Creates the Game object which will hold all objects and data for
 * the game.
 */
function Game(){
	
	this.quadTree = new QuadTree({x:0,y:0,width:800,height:600});
	
	this.square = new square();

	this.start = function(){
		this.square.draw();
		animate();
	};
}

function animate() {
	/*Insert and clear objects
	* for example:
	* game.quadTree.clear();
	* game.quadTree.insert(game.object);
	*/
	game.QuadTree.clear();
	game.QuadTree.insert(this.square);
	
	collisionChecker();
	
	
}

function collisionChecker(){
var objects = [];
game.quadTree.getAllObjects(objects);

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

setInterval(Game, 30);
