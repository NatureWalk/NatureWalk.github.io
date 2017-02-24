//Object to hold the current enemy creation parameters. 
var enemy_data = {
    speedMed:1,
    speedVari: 0,
    damage: 1,
    radianFractions: 12,
    playerLevel: 1
}

function update() {
    //Move this.x and this.y in this.moveDir * this.speed. 
    this.x += (Math.cos(this.moveDir) * this.speedMedian);
    this.y -= (Math.sin(this.moveDir) * this.speedMedian);  
    //var usable_obj = quad.getObjects(this);
    if(collisionChecker(this.x, this.y, this.width, this.height, this.collidablewith, this.name, this.location)){
		//what happens if collision comes back true
		var checkx = false;
		var checky = false;
		this.moveDir = (this.moveDir + Math.PI);
		if(this.x < canvas.width/2) {
			this.x = canvas.width/2;
			checkx = true;
		} else if((this.x + this.width) > canvas.width){
			this.x = canvas.width - this.width;
			checkx = true;
		} 
		if(this.y < 0) {
			this.y = 0;
			checky = true;
		} else if((this.y + this.height) > canvas.height){
			this.y = canvas.height - this.height;
			checky = true;
		} 
		if (checkx == false && checky == false){
			
		}
			
		
	}
}

function draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    /*
    ctx.rotate(this.moveDir); 
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.rotate(-this.moveDir);
    */
}

/*
setSpriteAttributes: An easy way to set the sprite attributes for the button. 
Params: 
-x: the x coordinate on the canvas. 
-y: the y coordinate on the canvas.
-width: the width of the image source.
-height: the height of the image source. 
-name: the compiler name for the button (optional).
Returns: None.
*/
function setSpriteAttributes(x, y, w, h, name) {
    this.x = x;
    this.y = y;
    this.width = w + enemy_data["playerLevel"];
    this.height = h + enemy_data["playerLevel"];
    if (name === undefined) {
        this.name = "button";
    } else {
        this.name = name;
    }
}

/*wallBounce: Changes this.moveDir based on what side a collision has occured on. 
Params: Side of rectangle that the collision occured on.
Returns: None. this.moveDir will be changed. 
*/
function wallBounce(collidingSide) {
    //If colldingSide === top or bottom...
        //Reverse vertical direction. 
    //If colldingSide === left of right...
        //Reverse horizontal direction. 
}

/*startingDirection: Generates a random direction that the enemy will move in upon creation. 
Params: None.
Returns: Angle in radians.

NOTE: Unit circle is drawn like so (in radians):
    3(PI)/2
        |
        |
PI------------0
        |
        |
      PI/2
*/
function startingDirection() {
    var n = enemy_data["radianFractions"];
    var angleMultiplier = Math.round(Math.random()*(n*2));
    return angleMultiplier * (Math.PI/n);
}

/* ENEMY CLASS REQUIRED FUNCTIONALITY
 * 1. Needs to move. DONE
 * 2. Needs to handle collisions. Waiting for collision detection 
        a. Bounce off of walls and animals
 * 3. Needs to select a random direction, upon construction, to move in. DONE
 * 4. Must have a sprite. DONE
        a. Sprite must be manipulatable based on the player's level. DONE
*/

function Enemy() {
    Sprite.call(this);
    this.speedMedian = enemy_data["speedMed"];
    this.speedVariance = enemy_data["speedVari"];
    this.damage = enemy_data["damage"];
    this.moveDir = startingDirection();
    this.name = 'enemy'
    this.collidablewith = ['frog', 'bird', 'deer', 'bunny']
}
inheritsFrom(Enemy, Sprite);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = update;
Enemy.prototype.draw = draw;
Enemy.prototype.setSpriteAttributes = setSpriteAttributes;
Enemy.prototype.wallBounce = wallBounce;


