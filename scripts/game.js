

//fitbit_start(); //Make the fitbit work before anything else.


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;

//----------------------Menu System Implementaton-----------------------
//----------------------------------------------------------------------
var dataTracker = new DataTracker();

var background = new Sprite();
//background.setSrc("nwalk1.jpg");
background.setSrc("http://vignette2.wikia.nocookie.net/uncyclopedia/images/4/44/White_square.png/revision/20061003200039");
background.width = 1280;
background.height = 720;
var screenMan = new ScreenManager();

var game = new Screen(true, true);
//game.buttonArray = [];
buttonsetup();
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
    var test_bird = new bird(800, 500);
    setupAnimal(test_bird);
    this.push(test_bird);
    if (game.buttonArray !== undefined) {
        game.buttonArray.forEach(function(elem) {
            game.push(elem);
        });
    }
    this.push(enemytest);
    this.push(new Spawner())
}

function buttonsetup() {
    
    var start = new Button(function() {alert("Game has started")});
    start.setSrc("https://vienna-wv.com/images/tree.jpg", "https://i.ytimg.com/vi/_hyE2NO7HnU/maxresdefault.jpg")
    start.setSpriteAttributes(500, 500, 100, 100, "test1");
    game.buttonArray.push(start); 
    /*EXAMPLE BUTTON SETUP */
    
    var end = new Button(dataTracker.getTime);
    end.setSrc("https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Five-pointed_star.svg/1088px-Five-pointed_star.svg.png", "http://pngimg.com/upload/star_PNG1595.png")
    end.setSpriteAttributes(500, 300, 100, 100, "test3");
    game.buttonArray.push(end); 
    
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
