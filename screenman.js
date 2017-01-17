//----------------------Menu System Functions---------------------------
//----------------------------------------------------------------------
//A viewed game state
function Screen(alwaysUpdate, alwaysDraw){
    Sprite.call(this);

    //Boolean
    this.alwaysUpdate = alwaysUpdate;
    this.alwaysDraw = alwaysDraw;

    this.stage = new Sprite();

    this.initialized = false;
}
Screen.prototype = new Sprite();

Screen.prototype.init = function(){
}

//Needed because inheriting from sprite apparently doesn't work right in Firefox
Screen.prototype.draw = function() {
    this.drawChildren();
}

//Object holding Screens
function ScreenManager(){
    Sprite.call(this);

    this.screens = [];
}
ScreenManager.prototype = new Sprite();

ScreenManager.prototype.push = function(screen){
    for (var i in this.screens) {
        if (this.screens[i] == screen) {
            this.screens[i].initialized = false;
            this.screens[i].children = [];
            this.screens.splice(i,1);
        }
    }
    this.screens.push(screen);
}

ScreenManager.prototype.pop = function(){
    return this.screens.pop();
}

ScreenManager.prototype.remove = function(screen){
    for (var i in this.screens) {
        if (this.screens[i] == screen) {
            this.screens[i].initialized = false;
            this.screens[i].children = [];
            this.screens.splice(i,1);
        }
    }
}

ScreenManager.prototype.update = function(){
    var screens = this.screens;

    for(var i in screens){

        if(screens[i].alwaysUpdate || screens[i] == screens[screens.length-1]){
            if(!screens[i].initialized){
                screens[i].init();
                screens[i].initialized = true;
            }
            screens[i].update();
        }
    }
}

ScreenManager.prototype.draw = function(){
    var screens = this.screens;
    console.log("drawing");
    for(var i in screens){

        if(screens[i].alwaysDraw || screens[i] == screens[screens.length-1]){
            screens[i].draw();
        }
    }
}
