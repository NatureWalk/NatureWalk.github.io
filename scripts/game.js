//fitbit_start(); //Make the fitbit work before anything else.


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//ctx.textBaseline = 'middle';
//ctx.textAlign = "center";
var w = canvas.width;
var h = canvas.height;

soundMan = new soundManager()
//soundMan.music.play()

//----------------------Menu System Implementaton-----------------------
//----------------------------------------------------------------------
var dataTracker = new DataTracker();

var background = new Sprite();
background.setSrc("image_resources/Book(open).png");
background.width = w;
background.height = h;

land = new landscape(); 

var screenMan = new ScreenManager();

var title = new Screen(false, false);

//Button screen above game object
//Must be pushed after "game"
var interface = new Screen(false, true);

//layerFix();
//game.buttonArray = [];
var controller = new master_controller();
var panes = backgroundSetup();
buttonSetup();
var mouseman = new MouseManager();
console.log("game set up");

var cursor = {};
cursor.x=0;
cursor.y=0;

var game = new Screen(true, true);

canvas.addEventListener('mousemove', function(evt) {
    mouseman.findTarget(evt);
    cursor= mouseman.getMousePos(canvas,evt);
});
canvas.addEventListener('mousedown', function(evt) {
    mouseman.findTarget(evt);   
});
canvas.addEventListener('mouseup', function(evt) {
    mouseman.findTarget(evt);   
});


screenMan.push(title);
/*screenMan.push(game);
screenMan.push(interface);*/

//Runs when the game screen is loaded.

title.init = function() {
	this.push(background);
	if (title.buttonArray !== undefined) {
        title.buttonArray.forEach( function(elem) {title.push(elem);} );
    }
}

interface.init = function() {	
    if (interface.buttonArray !== undefined) {
        interface.buttonArray.forEach( function(elem) {interface.push(elem);} );
    }
}

game.init = function() {	
    this.push(background);
    this.push(controller);
    this.push(land);
    panes.forEach( function(elem) {game.push(elem);} );
} 
///////////////////////////////local storage junk//////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////
//Who doesn't like a random collision function
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
window.onbeforeunload = function () {
    console.log("Closing");
    dataTracker.sessionEnd();
    console.log("Sesson End");
    return "Are you sure?";
}
