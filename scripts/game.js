

//fitbit_start(); //Make the fitbit work before anything else.


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;

//----------------------Menu System Implementaton-----------------------
//----------------------------------------------------------------------
var dataTracker = new DataTracker();

var background = new Sprite();
<<<<<<< HEAD:game.js
background.setSrc("nwalk1.jpg");
//background.setSrc("http://vignette2.wikia.nocookie.net/uncyclopedia/images/4/44/White_square.png/revision/20061003200039");
background.width = 1024;
background.height = 576;
=======
//background.setSrc("nwalk1.jpg");
background.setSrc("http://vignette2.wikia.nocookie.net/uncyclopedia/images/4/44/White_square.png/revision/20061003200039");
background.width = 1280;
background.height = 720;
>>>>>>> master:scripts/game.js
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
<<<<<<< HEAD:game.js
    panes.forEach( function(elem) {game.push(elem);} );
=======
    var test_bird = new bird(800, 500);
    setupAnimal(test_bird);
    this.push(test_bird);
>>>>>>> master:scripts/game.js
    if (game.buttonArray !== undefined) {
        game.buttonArray.forEach( function(elem) {game.push(elem);} );
    }
    
    this.push(enemytest);
    this.push(new Spawner())
}

function backgroundSetup() {
    var panes = [];
    var stepPane = new Sprite();
    stepPane.setSrc("http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=33784063");
    stepPane.setSpriteAttributes(76, 30, 350, 50, "stepPane");
    panes.push(stepPane);
    
    
    
    var attributesPane = new Sprite();
    attributesPane.setSrc("http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=33784063");
    attributesPane.setSpriteAttributes(76, 200, 350, 350, "attributesPane");
    panes.push(attributesPane);
    
    var subAttPane;
    for(var i = 0; i < 4; i++) {
        
    }
    
    var mapPane = new Sprite();
    mapPane.setSrc("http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=33784063");
    mapPane.setSpriteAttributes(542, 30, 454, 514, "mapPane");
    panes.push(mapPane);
    
    return panes;
}

function buttonSetup() {
    
    var start = new Button(function() {alert("Game has started")});
    start.setSrc("https://vienna-wv.com/images/tree.jpg", "https://i.ytimg.com/vi/_hyE2NO7HnU/maxresdefault.jpg")
    start.setSpriteAttributes(500, 500, 100, 100, "Game Start");
    game.buttonArray.push(start); 
    /*EXAMPLE BUTTON SETUP */
    
    var end = new Button(function() {alert(dataTracker.getTime())});
    end.setSrc("https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Five-pointed_star.svg/1088px-Five-pointed_star.svg.png", "http://pngimg.com/upload/star_PNG1595.png")
    end.setSpriteAttributes(500, 300, 100, 100, "Time Played");
    game.buttonArray.push(end); 
    
    var devAttributes = new Button(dataTracker.openDevWindow);
    devAttributes.setSrc("RAnimalsNW.jpg", "http://pngimg.com/upload/star_PNG1595.png");
    devAttributes.setSpriteAttributes(700, 500, 50, 50, "devWindow");
    game.buttonArray.push(devAttributes); 
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
