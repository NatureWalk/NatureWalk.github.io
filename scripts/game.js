

//fitbit_start(); //Make the fitbit work before anything else.


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;

//----------------------Menu System Implementaton-----------------------
//----------------------------------------------------------------------
var dataTracker = new DataTracker();

var background = new Sprite();
background.setSrc("images/nwalk1.jpg");
//background.setSrc("http://vignette2.wikia.nocookie.net/uncyclopedia/images/4/44/White_square.png/revision/20061003200039");
background.width = 1024;
background.height = 576;
var screenMan = new ScreenManager();

var game = new Screen(true, true);
//game.buttonArray = [];
var panes = backgroundSetup();
buttonSetup();
var mouseman = new MouseManager();



console.log("game set up");


/* POTENTIAL PROBLEM: With the canvas listening to mouse inputs, 
 * it's possible that if we have menus overlaying each other, 
 * a player may be able to click on things behind the active menu. 
*/
canvas.addEventListener('mousemove', function(evt) {
    mouseman.findTarget(evt);   
});
canvas.addEventListener('mousedown', function(evt) {
    mouseman.findTarget(evt);   
});
canvas.addEventListener('mouseup', function(evt) {
    mouseman.findTarget(evt);   
});

var enemytest = new Enemy();
enemytest.setSrc("TestEnemy.png");
enemytest.setSpriteAttributes(100, 100, 50, 50, "enemy1");
console.log("Enemy Created");

screenMan.push(game);

game.init = function() {
    this.push(background);
    panes.forEach( function(elem) {game.push(elem);} );
    var test_bird = new bird(800, 500);
    setupAnimal(test_bird);
    this.push(test_bird);
    if (game.buttonArray !== undefined) {
        game.buttonArray.forEach( function(elem) {game.push(elem);} );
    }
    
    this.push(enemytest);
    this.push(new Spawner())
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
