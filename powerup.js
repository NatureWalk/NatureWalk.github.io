function Powerup() {
	Sprite.call(this);
}

Powerup.prototype.collide = function(/*animal*/) {

}

Powerup.prototype.update = function() {
	if (overlap(/*animal*/, this)) {
		this.collide(/*animal*/);
	}
}

function overlap(a, b) {
    aMaxX = a.x + a.width;
    aMaxY = a.y + a.height;
    bMaxX = b.x + b.width;
    bMaxY = b.y + b.height;

    if (aMaxX < b.x || a.x > bMaxX) return false;
    if (aMaxY < b.y || a.y > bMaxY) return false;

    return true;
}