

//fitbit_start(); //Make the fitbit work before anything else.


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;

//----------------------Menu System Implementaton-----------------------
//----------------------------------------------------------------------
var dataTracker = new DataTracker();

var background = new Sprite();
//<<<< HEAD:game.js
background.setSrc("images/nwalk1.jpg");
//background.setSrc("http://vignette2.wikia.nocookie.net/uncyclopedia/images/4/44/White_square.png/revision/20061003200039");
background.width = 1024;
background.height = 576;
//=======
//background.setSrc("nwalk1.jpg");
//background.setSrc("http://vignette2.wikia.nocookie.net/uncyclopedia/images/4/44/White_square.png/revision/20061003200039");
background.width = 1280;
background.height = 720;
//>>>>>>> master:scripts/game.js
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
/*
function backgroundSetup() {
    var panes = [];
    var animalAry = ["image_resources/Icon_Bird.png", 
                     "image_resources/Icon_Deer.png",
                     "image_resources/frogpng_1024_noAlpha.png",
                     "image_resources/Icon_Rabbit.jpeg",
                     "images/nwalk1.jpg"];
    //Pane that holds the steps.
    var stepPane = new Sprite();
    stepPane.setSrc("http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=33784063");
    stepPane.setSpriteAttributes(76, 30, 400, 50, "stepPane");
    panes.push(stepPane);
    
    //Pane that holds all of the attribute data.
    var attributesPane = new Sprite();
    attributesPane.setSrc("http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=33784063");
    attributesPane.setSpriteAttributes(76, 200, 400, 350, "attributesPane");
    panes.push(attributesPane);
    
    //Animal Image
    subAttPane = new Sprite();
    subAttPane.setSrc(animalAry[0]);
    subAttPane.setSpriteAttributes(266, 220, 190, 190, "animal_image");
    panes.push(subAttPane);
    
    var subAttPane;
    //Attributes
    for(var i = 0; i < 4; i++) {
        subAttPane = new Sprite();
        subAttPane.setSrc(animalAry[0]);
        subAttPane.setSpriteAttributes(96, (225 + 50*i), 60, 30, "attribute");
        panes.push(subAttPane);
    }
    //Attribute Values
    for(var i = 0; i < 4; i++) {
        subAttPane = new Sprite();
        subAttPane.setSrc(animalAry[1]);
        subAttPane.setSpriteAttributes(166, (220 + 50*i), 80, 40, "attribute_value");
        panes.push(subAttPane);
    }
    
    
    
    //Unlockables
    for(var i = 0; i < 2; i++) {
        for(var j = 0; j < 6; j++) {
            subAttPane = new Sprite();
            subAttPane.setSrc(animalAry[1]);
            subAttPane.setSpriteAttributes((101 + 60*j), (435 + 50*i), 40, 40, "unlockable");
            panes.push(subAttPane);
        }
    }
    
    //Map Pane
    var mapPane = new Sprite();
    mapPane.setSrc("http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=33784063");
    mapPane.setSpriteAttributes(542, 30, 454, 514, "mapPane");
    panes.push(mapPane);
    
    return panes;
}
*/

/*
function buttonSetup() {
    
    var start = new Button(function() {alert("Game has started")});
    start.setSrc("https://vienna-wv.com/images/tree.jpg", "https://i.ytimg.com/vi/_hyE2NO7HnU/maxresdefault.jpg")
    start.setSpriteAttributes(500, 500, 100, 100, "Game Start");
    game.buttonArray.push(start); 
    
    var end = new Button(function() {alert(dataTracker.getTime())});
    end.setSrc("https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Five-pointed_star.svg/1088px-Five-pointed_star.svg.png", "http://pngimg.com/upload/star_PNG1595.png")
    end.setSpriteAttributes(500, 300, 100, 100, "Time Played");
    game.buttonArray.push(end); 
    
    var devAttributes = new Button(dataTracker.openDevWindow);
    devAttributes.setSrc("image_resources/Icon_Rabbit.jpeg", "http://pngimg.com/upload/star_PNG1595.png");
    devAttributes.setSpriteAttributes(20, 530, 30, 30, "devWindow");
    game.buttonArray.push(devAttributes); 
    
    //Animal selection buttons. 
    //CHANGE TO BUTTONS
    var animalIcon;
    var animalAry = ["image_resources/Icon_Bird.png", 
                     "image_resources/Icon_Deer.png",
                     "image_resources/frogpng_1024_noAlpha.png",
                     "image_resources/Icon_Rabbit.jpeg",
                     "images/nwalk1.jpg"]
    for (var i = 0; i < 4; i++) {
        animalIcon = new Button(change_image, [animalAry[i]]);
        animalIcon.setSrc(animalAry[i], animalAry[4]);
        animalIcon.setSpriteAttributes((96 +(100*i)), 110, 60, 60, "animal_icon");
        game.buttonArray.push(animalIcon);
    }
}

function change_image(animal_image) {
    panes[2].setSrc(animal_image);
}   
*/

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
