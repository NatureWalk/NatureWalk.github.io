/**
 * @author Duunko
 */


var wall = function(xpos, ypos) {
	Sprite.call(this)
	this.x = xpos
	this.y = ypos
	this.width = 32
	this.height = 32
	this.name = 'wall'
}

wall.prototype.draw = function() {
	ctx.fillRect(this.x, this.y, this.width, this.height, c_black)
}
