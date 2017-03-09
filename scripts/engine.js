//Game loop. The main function passes a renderer to this and it creates a game loop. 
//Written this way for data abstraction purposes.
function game_loop(renderer) {
    setInterval(function() {renderer.update(); renderer.draw();}, 30);
}

var inheritsFrom = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
};