//----------------------Menu System Functions---------------------------
//----------------------------------------------------------------------
//A viewed game state
//Contains all updated and displayed game objects in a screen
//alwaysUpdate is for screens you want running in the background
//--Pop-up Menu--
//alwaysDraw is for screens drawn in the background
//--Pause Menu--
function Screen(alwaysUpdate, alwaysDraw){
    this.objects = [];
    this.buttonArray = [];

    //Boolean
    this.alwaysUpdate = alwaysUpdate;
    this.alwaysDraw = alwaysDraw;

    this.initialized = false;
}

//What runs when the screen is initially loaded
//Often is where you add objects
Screen.prototype.init = function() {
}

Screen.prototype.push = function(object) {
    this.objects.push(object);
}

Screen.prototype.remove = function(object) {
    for (var i in this.objects) {
        if (this.objects[i] == object) {
            this.objects.splice(i,1);
        }
    }
}

Screen.prototype.draw = function() {
    for (var i in this.objects) {
        this.objects[i].draw();
    }
}

Screen.prototype.update = function() {
    for (var i in this.objects) {
        this.objects[i].update();
    }
}

//Object holding Screens
function ScreenManager(){
    this.screens = [];
}

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
    

    for(var i in screens){

        if(screens[i].alwaysDraw || screens[i] == screens[screens.length-1]){
            screens[i].draw();
        }
    }
}
