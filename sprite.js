
//----------------------Sprite Function----------------------------------
//-----------------------------------------------------------------------
//Sprite object with default x,y,width, and height.
//Has children array and functions to update across inheritence.
//Use Sprite.call(this); and .prototype = new Sprite(); to inherit the sprite class.
function Sprite() {
    this.image = new Image();
    this.x = 0;
    this.y = 0;
    this.width = 100;
    this.height = 100;
    this.name = "Unnamed";
    this.children = [];
}

Sprite.prototype.setSrc = function(src) {
    this.image.src = src;
}

Sprite.prototype.setSpriteAttributes = function(x, y, width, height, name) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    if (name === undefined) {
        this.name = "button";
    } else {
        this.name = name;
    }
}

//Ham-fistedly puts x and y in the center
Sprite.prototype.center = function() {
    this.x = this.x-this.width/2;
    this.y = this.y-this.height/2;
}

Sprite.prototype.uncenter = function() {
    this.x = this.x+this.width/2;
    this.y = this.y+this.height/2;
}

//If you override, keep this.drawChildren();
Sprite.prototype.draw = function() {
    //console.log("drawing"+this.image.src);
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.drawChildren();
};

Sprite.prototype.update = function() {
    this.updateChildren();
}

Sprite.prototype.addChild = function(child) {
    this.children.push(child);
}

Sprite.prototype.drawChildren = function() {
    for (var i in this.children) {
        this.children[i].draw();
    }
}

Sprite.prototype.updateChildren = function() {
    for (var i in this.children) {
        this.children[i].update();
    }
}
