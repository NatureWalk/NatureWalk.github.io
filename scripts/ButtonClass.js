/* EXAMPLE BUTTON CREATION:
 * 1. Create button with: var btn = new Button(function_to_call, parameterArray_for_function);
 
 * 2. Set the button source images with: btn.setSrc(srcPrimary, srcSecondary);
 
 * 3. Set the button attributes with: btn.setSpriteAttributes(xCoord, yCoord, width_of_image, height_of_image, name(optional)); 
 
 * 4. Push the button into the screen's button array with: name_of_screen.buttonArray.push(btn);
 
 NOTE: This must be done during the screen's initialization period or the buttons will not show up. 

 */

/**************MOUSE INTERFACING*****************/
/*
mouseEventManager: Canvas passes the mouse event here, then this function calls the correct function according to the event. 
Params: "evt" the mouse event that is being invoked. 
Returns: None. 
*/

function mouseEventManager(evt) {
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
    this.isPressed = false;
    this.image.src = this.onMouseUpImageSrc;
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
    if (!this.hovered) {
        this.onMouseEnter();
    }
    //DEBUG: console.log(this.isPressed);
}

/*   DEPRECATED
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
    this.image.src = this.onMouseDownImageSrc;
    //For toggle functionality.
    if (this.isToggleButton === true) {
        this.toggle();
        this.callFunction();
    }
    this.isPressed = true;
    //DEBUG: console.log("pressed");
}

/*
onMouseUp: Function that is called when the mouse is released from being pressed on the button. 
Params: None.
Returns: None.
*/
function onMouseUp() {
    this.image.src = this.onMouseUpImageSrc;
    if (this.isPressed) {
        this.callFunction();
        this.isPressed = false;
    }
    
    //DEBUG: console.log("released");
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

/*
setSpriteAttributes: An easy way to set the sprite attributes for the button. 
Params: 
-x: the x coordinate on the canvas. 
-y: the y coordinate on the canvas.
-width: the width of the image source.
-height: the height of the image source. 
-name: the compiler name for the button (optional).
Returns: None.
*/
function setSpriteAttributes(x, y, width, height, name) {
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


/*
* Button Class Functionality
* 1. Must be drawable on a canvas. 
    a. Needs a position on the canvas. DONE
    b. Needs an image to be drawn on the canvas. DONE
    c. Needs an "on hover" and "on pressed" animation. DONE
* 2. Must have a parameter that is another function, and call that function. DONE. Accepts up to three parameters. 
* 3. Button classifications? 
    a. Toggle/Radio. DONE
*/

/* 
Constructor function. 
Params: _function: Takes in a function that will be called when the button is released. 
        _params:   Takes in an array of up to three parameters that must be passed into the function.  
Returns: None.
*/
function Button(_function, _params) {
    //Directly calls the Sprite class to inherit Sprite's attributes. 
    Sprite.call(this);  
    //Inherits all the Sprite prototype functions. 
    Button.prototype = Object.create(Button.prototype);
    //Button attributes. 
    this.hovered = false;
    this.isPressed = false;
    this.func = _function;
    this.params = _params;
    this.isToggleButton = false;
    
    //ONLY USE THIS IS this.isToggleButton IS TRUE
    this.isToggled = false;
    this.onMouseUpImageSrc;
    this.onMouseDownImageSrc;
}
Button.prototype.changeFunc = function(_function, _params) {
    this.func = _function;
    this.params = _params;
}
Button.prototype.constructor = Button;
Button.prototype.setSpriteAttributes = setSpriteAttributes;
Button.prototype.setSrc = function(srcPrimary, srcSecondary) {
    this.image = new Image();
    this.image.src = srcPrimary;
    this.onMouseUpImageSrc = srcPrimary;
    this.onMouseDownImageSrc = srcSecondary;
}
Button.prototype.update = function () {
    
}
Button.prototype.draw = function () {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
}
/*toggle: changes the status of 'isToggled'. 
Params: None.
Returns: None.
*/
Button.prototype.toggle = function() {
    if (this.isToggled) {this.isToggled = false;} 
    else {this.isToggled = true;}
    console.log("Toggled");
}
Button.prototype.mouseEventManager = mouseEventManager;
Button.prototype.onMouseMove = onMouseMove;
Button.prototype.onMouseEnter = onMouseEnter;
Button.prototype.onMouseLeave = onMouseLeave;
Button.prototype.onMouseDown = onMouseDown;
Button.prototype.onMouseUp = onMouseUp;
Button.prototype.callFunction = callFunction;