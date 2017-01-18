var canvas = document.getElementById("canvas");
canvas.addEventListener('mousemove', function(evt) {
 findTarget(evt);   
});
canvas.addEventListener('mousedown', function(evt) {
 findTarget(evt);   
});
canvas.addEventListener('mouseup', function(evt) {
 findTarget(evt);   
});
var ctx = canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;

//----------------------Menu System Implementaton-----------------------
//----------------------------------------------------------------------
var background = new Sprite();
background.setSrc("nwalk1.jpg");
background.width = 1280;
background.height = 720;
var screenMan = new ScreenManager();

var game = new Screen(true, true);
screenMan.push(game);
game.init = function() {
    this.push(background);
}

function overlap(a, b) {
    var aMaxX = a.x + a.width;
    var aMaxY = a.y + a.height;
    var bMaxX = b.x + b.width;
    var bMaxY = b.y + b.height;

    if (aMaxX < b.x || a.x > bMaxX) return false;
    if (aMaxY < b.y || a.y > bMaxY) return false;

    return true;
}

game_loop(screenMan);
