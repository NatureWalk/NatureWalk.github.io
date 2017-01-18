/*
* Button Class Functionality
* 1. Must be drawable on a canvas. 
    a. Needs a position on the canvas. DONE
    b. Needs an image to be drawn on the canvas. DONE (Tentatively)
    c. Needs an "on hover" and "on pressed" animation. DONE
* 2. Must have a parameter that is another function, and call that function. DONE(Tentatively) Accepts up to three parameters too. 
* 3. Button classifications? 
    a. Toggle/Radio. DONE
    b. Increment/Decrement Not necessary.
*/

var btnAry = [];
//Function to get the mouse position
//Credit -- 
// "http://stackoverflow.com/questions/24384368/simple-button-in-html5-canvas"


/* Constructor function. Takes in a function that will be called when the button is released. */
var Button = Function(_function) {
    //Directly calls the Sprite class to inherit Sprite's attributes. 
    Sprite.call(this);  
    
    //Inherits all the Sprite prototype functions. 
    Button.prototype = new Sprite();
    
    //Button attributes. 
    this.hovered = false;
    this.func = _function;
    //Could add a this.params to potentially call more functions. 
    this.isToggleButton = false;
    
    //ONLY USE THIS IS this.isToggleButton IS TRUE
    this.isToggled = false;
}

Button.prototype.constructor = Button;
Button.prototype.spriteAttributes = function(x, y, width, height, name) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    if (name === undefined) {
        this.name = "button";
    } else {
        this.name = name;
    }
}
Button.prototype.setSrc = function(srcPrimary, srcSecondary) {
    this.image.src = srcPrimary;
    this.onMouseUpImage.src = srcPrimary;
    this.onMouseDownImage.src = srcSecondary;
}
/*
isInside: Checks the position of the mouse in relation to this button.
Params: position of the mouse on the canvas. 
Returns: Boolean indicating if cursor is within this button's boundaries. 
*/
Button.prototype.isInside = function(mousePos) {
    return ((mousePos.x > this.x && mousePos.x < this.x+100) &&
            (mousePos.y > this.y && mousePos.y < this.y+100));
}
Button.prototype.toggle = function() {
    if (this.isToggled) {this.isToggled = false;} 
    else {this.isToggled = true;}
}
Button.prototype.mouseEventManager = mouseEventManager;
Button.prototype.onMouseMove = onMouseMove;
Button.prototype.onMouseClick = onMouseClick;
Button.prototype.onMouseDown = onMouseDown;
Button.prototype.onMouseUp = onMouseUp;

    
/**************MOUSE INTERFACING*****************/
/*
isInside: Checks the position of the mouse in relation to this button.
Params: position of the mouse on the canvas. 
Returns: Boolean indicating if cursor is within this button's boundaries. 
*/
/*
function isInside(mousePos) {
    return ((mousePos.x > this.x && mousePos.x < this.x+100) &&
            (mousePos.y > this.y && mousePos.y < this.y+100));
}
*/

/*
mouseEventManager: Canvas passes the mouse event here, then this function calls the correct function according to the event. 
Params: "evt" the mouse event that is being invoked. 
Returns: None. 
*/
function mouseEventManager(evt) {
    console.log(evt);
    switch(evt){
            case"mousemove":
                this.onMouseMove();
                break;
            /*
            case"mouseover": 
                //console.log("Moused Over");
                this.onMouseEnter();
                break;
            case"mouseout": 
                //console.log("Moused Over");
                this.onMouseLeave();
                break;
            */
            case"mousedown": 
                this.onMouseDown();
                break;
            case"mouseup":
                this.onMouseUp();
                break;
    }
}

/*
onMouseEnter: Function that is called when the mouse enters the button's perimeter. 
Params: None.
Returns: None.
NOTE: Is only called the first time onMouseMove() is called. 
*/
function onMouseEnter() {
    //If cursor is over 
    //Set this.color to this.hoverColor.
    this.hovered = true;
    console.log("enter");
}
/*
onMouseLeave: Function that is called when the mouse leaves the button's perimeter. 
Params: None.
Returns: None.
NOTE: Not a self-sufficient function. As it is, it must be called from the canvas when it finds out that the mouse has left the button. 
*/
function onMouseLeave() {
    //If cursor is over 
    //Set this.color to this.hoverColor.
    this.hovered = false;
    console.log("left");
}
/*
onMouseMove: Function that is called when the mouse is moving over the button. Called every time the mouse moves. 
BEWARE OF INPUT LAG. Consider using onMouseEnter() instead. 
Params: None
Returns: None
*/
function onMouseMove() {
    //If cursor is over 
    //Set this.color to this.hoverColor.
    if (!this.hovered) {
        this.onMouseEnter();
    }
    //console.log("moved");
}

/*
onMouseClick: Function that is called when the mouse is clicked on the button. When clicked, it will call whatever function it has been given in this.func. 
Params: None.
Returns: None.

function onMouseClick() {
    //this.color = "#ff0000"
    this.func();
    console.log("clicked");
}
*/

/*
onMouseDown: Function that is called when the mouse is pressed, but not released, on the button. 
Params: None.
Returns: None.
*/
function onMouseDown() {
    //this.color = "#00FF00"
    this.img.src = "https://i.ytimg.com/vi/_hyE2NO7HnU/maxresdefault.jpg";
    //For toggle functionality.
    if (this.isToggleButton === true) {
        this.toggle();
        this.callFunction();
    }

    //this.img.src = this.onMouseDownImage.src;
    console.log("pressed");
}

/*
onMouseUp: Function that is called when the mouse is released from being pressed on the button. 
Params: None.
Returns: None.
*/
function onMouseUp() {
    this.img.src = "https://vienna-wv.com/images/tree.jpg";
    //this.img.src = this.onMouseUpImage.src;
    this.callFunction();
    console.log("released");
}

/**************UTILITIES*****************/

/*
callFunction: Executes the function that was passed to this.func. 
Params: None. This will pull the parameters from this.params.
Returns: None.
*/
function callFunction() {
    if (this.params !== undefined) {
        if (this.params.length === 3) {
            this.func(this.params[0], this.params[1], this.params[2]);
        } 
        else if (this.params.length === 2) {
             this.func(this.params[0], this.params[1]);
        }
        else if (this.params.length === 1) {
             this.func(this.params[0]);
        }
    } else {
        this.func();
    }
}

function update() {
    //Check if cursor is over the button. 
}
function draw() {
    ctx.drawImage(this.img, this.x, this.y, 50, 50);
} 
function debugMessage(str){
    console.log(str)
}

/*
var btn = new Button(10, 20, function(){alert("hello world")})
console.log(btn);
btn.debugMessage("Hello World!!!!!");
*/
function incrementTheseArys(numAry, numAry2, numAry3) {
    for(var i = 0; i < numAry.length; i++) {
        numAry[i]++;
    }
    if (numAry2 !== undefined) {
        for (var j = 0; j < numAry2.length; j++) {
            numAry2[j]++;   
        }
    }
    if (numAry3 !== undefined) {
        for (var k = 0; k < numAry3.length; k++) {
            numAry3[k]++;   
        }
    }
    console.log(numAry);
    console.log(numAry2);
    console.log(numAry3);
}

var img = new Image(100, 196);
img.src = "https://vienna-wv.com/images/tree.jpg";
btnAry[0] = new Button("test", 10, 20, function(){alert("hello world")}, img);

var params1 = [[1,2,3], [50,51]];
btnAry[1] = new Button("test", 70, 20, incrementTheseArys, img, params1);

var twodary = [[1,3,5], 1];
incrementTheseArys(twodary[0], twodary[1]);
function update() {
    btnAry[0].draw();
    btnAry[1].draw();
}

setInterval(update, 100); 