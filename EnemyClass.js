
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
    //var angle = this.calculateAngle();
    
}

function draw() {
    ctx.rotate(this.moveDir); 
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.rotate(-this.moveDir);
    //console.log("hello");
}

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

function calculateAngle() {
    return Math.tan(this.moveDir);
}

function wallBounce(collidingSide) {
    //If colldingSide === top or bottom...
        //Reverse vertical direction. 
    //If colldingSide === left of right...
        //Reverse horizontal direction. 
}

function startingDirection() {
    var n = enemy_data["radianFractions"];
    var angleMultiplier = Math.round(Math.random()*(n*2));
    return angleMultiplier * (Math.PI/n);
}

/* ENEMY CLASS REQUIRED FUNCTIONALITY
 * 1. Needs to move. DONE
 * 2. Needs to handle collisions. Waiting for collision detection 
        a. Bounce off of walls.
        b. Reduce the armor of animals. 
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
}
Enemy.prototype = Object.create(Sprite.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = update;
Enemy.prototype.draw = draw;
Enemy.prototype.setSpriteAttributes = setSpriteAttributes;
Enemy.prototype.calculateAngle = calculateAngle;
Enemy.prototype.wallBounce = wallBounce;


