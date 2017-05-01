//fitbit_start(); //Make the fitbit work before anything else.

/////////////////////////////////////////////////
//VOLUME IN SOUND.JS HAS BEEN REDUCED, FIX THAT.
/////////////////////////////////////////////////

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

var popups = new Screen(false, true);

var pcontroller_i = new popupController();
pcontroller_i.update = function() {
    p_maxUpgrade();
}

var pcontroller_p = new popupController();
pcontroller_p.update = function() {
    console.log("updating popup screen "+popups.objects.length)
    if (popups.objects.length == 1) {
        console.log("stopping popups")
        screenMan.pop();
    }
}

//layerFix();
//game.buttonArray = [];
var controller = new master_controller();
var panes = backgroundSetup();
buttonSetup();
var mouseman = new MouseManager();
console.log("game set up");

var pController = new popupController();

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
	var titleback = new Sprite();
	titleback.setSrc("image_resources/naturewalk.jpg");
	titleback.width = w*.90;
	titleback.height = h*.90;
	titleback.x = w*.05;
	titleback.y = h*.05;
	this.push(background);
	this.push(titleback);
	if (title.buttonArray !== undefined) {
        title.buttonArray.forEach( function(elem) {title.push(elem);} );
    }
}

interface.init = function() {	
    if (interface.buttonArray !== undefined) {
        interface.buttonArray.forEach( function(elem) {interface.push(elem);} );
    }
    this.push(pcontroller_i);
    //addPopup("This is a test.",w/2,h/2);
}

popups.init = function() {
    this.push(pcontroller_p);
    addPopup("This is a test.",w/2,h/2)
}

game.init = function() {	
	background.setSrc("image_resources/Book(open).png");
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