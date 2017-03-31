/* GENERAL UI NOTES:
 * There are lots of integer coordinates for the current UI, for scalability purposes, 
 they should be changed to fractions of the screen width and height. 
*/


/* ui_values
* List of various source arrays for image resources and data objects like the attribute list. 
Most of these elements are in a SPECIFIC order to accomodate the code. 
Something more general would probably be more efficient if we intend to add more animals or animal variations. 
*/
var ui_values = {
    //Capitalized for the sake of displaying, 
    //when using these to acquire data from animal.js, 
    //make sure to use "toLowerCase()".
    animalAry: ["Bird", "Deer", "Frog", "Bunny"],
    animalSrcAry: [("image_resources/Icon_Bird.png"),
                  ("image_resources/Icon_Deer.png"),
                  ("image_resources/Icon_Frog.png"),
                  ("image_resources/Icon_Bunny.png"),
                  ("images/nwalk1.jpg")],
    
    //For gif animations, though I didn't figure out how to make them do gif things. 
    animalStaticAry: [("image_resources/Icon_Bird.png"),
                      ("image_resources/Icon_Deer.png"),
                      ("image_resources/FrogSpriteSheet200_1400x1400.png"),
                      ("image_resources/AnimBunny.gif")],

    animalWalkAry: [("image_resources/Icon_Bird.png"),
                    ("image_resources/DeerWalk100_500x400.png"),
                    ("image_resources/FrogSpriteSheet200_1400x1400.png"),
                    ("image_resources/AnimBunny.gif")],
    currentAnimal: "Bird",
    attributes: ["armor", "speed", "capacity", "lifespan"],
};

/* backgroundSetup() - For setting up, non-button elements of the canvas, like the map and the pane that holds all of the attributes. 
 * Params - None. 
 * Returns - An array of panes that the game.init will push into the screen array. 
 * Notes: There are many variables in this function that could be combined into one single variable, 
 but I've created multiple for readability's sake. 
*/
function backgroundSetup() {
    "use strict";
    var panes = [], i, j, attributesPane, subAttPane;
    
    /////////////////////////////////////////////////
    //ATTRIBUTES PANE
    /////////////////////////////////////////////////
    attributesPane = new Sprite();
    attributesPane.setSrc("image_resources/AttPane.png");
    attributesPane.setSpriteAttributes(46, 170, 440, 380, "attributesPane");
    panes.push(attributesPane);
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //UNLOCKABLES (change to buttons when we have the functionality)
    /////////////////////////////////////////////////
    /*
    for (i = 0; i < 2; i++) {
        for (j = 0; j < 6; j++) {
            subAttPane = new Sprite();
            //Sets the source of each pane to be the same as the animal icon. 
            subAttPane.setSrc(ui_values.animalSrcAry[1]);
            subAttPane.setSpriteAttributes((101 + 60 * j), (435 + 50 * i), 40, 40, "unlockable");
            panes.push(subAttPane);
        }
    }
    */
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //MAP PANE (No Longer in Use)
    /////////////////////////////////////////////////
    /*
    var mapPane = new Sprite();
    mapPane.setSrc("image_resources/Worn-Paper-Texture.png");
    mapPane.setSpriteAttributes(527, 30, 452, 514, "mapPane");
    panes.push(mapPane);
    */
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //STATS PANE
    /////////////////////////////////////////////////
    var statPane = new Sprite();
    statPane.setSrc("image_resources/Worn-Paper-Texture.png");
    statPane.setSpriteAttributes(75, 215, 110, 200, "statPane");
    panes.push(statPane);
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //STAT VALUE PANE
    /////////////////////////////////////////////////
    var statPane = new Sprite();
    statPane.setSrc("image_resources/Worn-Paper-Texture.png");
    statPane.setSpriteAttributes(195, 215, 50, 200, "statPane");
    panes.push(statPane);
    /////////////////////////////////////////////////
    
    return panes;
}

/* buttonSetup() - For setting up, button elements of the canvas.
 * Params - None. 
 * Returns - None. 
 * Notes: There is a small cheat here in which UI elements that have tooltips 
 (even if they are not meant to call a function) are being used as buttons. 
 * IMPORTANT: For tooltips to be updated regularly, you must manually change the button's update function to adapt the value. 
 That, or have a function elsewhere that changes 'btn.text' for the button's draw function. 
*/
function buttonSetup() {
    /*
    var start = new Button(function() {alert("Game has started")});
    start.setSrc("https://vienna-wv.com/images/tree.jpg", "https://i.ytimg.com/vi/_hyE2NO7HnU/maxresdefault.jpg")
    start.setSpriteAttributes(500, 500, 100, 100, "Game Start");
    game.buttonArray.push(start); 
    
    var end = new Button(function() {alert(dataTracker.getTime())});
    end.setSrc("https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Five-pointed_star.svg/1088px-Five-pointed_star.svg.png", "http://pngimg.com/upload/star_PNG1595.png")
    end.setSpriteAttributes(500, 300, 100, 100, "Time Played");
    game.buttonArray.push(end); 
    */
    
    /////////////////////////////////////////////////
    //DEV ATTRIBUTES
    /////////////////////////////////////////////////
    var devAttributes = new Button(dataTracker.openDevWindow);
    devAttributes.setSrc("image_resources/ClearSquare.png", "image_resources/ClearSquare.png");
    devAttributes.setSpriteAttributes(20, 530, 30, 30, "devWindow");
    game.buttonArray.push(devAttributes);
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //STEP PANE (but it's a button)
    /////////////////////////////////////////////////
    var stepPane = new Button();
    stepPane.setSrc("image_resources/StepPaper.png");
    stepPane.setSpriteAttributes(76, 30, 150, 50, "stepPane");
    stepPane.hasTextValue = true;
    
    //Arbitrary step setup if the player does not have any steps yet. 
    if (stepCount === undefined) { stepCount = 100; }
    
    stepPane.setText(stepCount + " Steps", (stepPane.width / 2) - 5 * numberLen(stepCount + " Steps"), stepPane.height / 4);
    
    //Changeing the button's update function to get the step count every frame. 
    stepPane.update = function() {
        this.text = stepCount + " Steps";
        this.textOffsetX = (stepPane.width / 2) - 5.5 * numberLen(stepCount + " Steps")
    };
    game.buttonArray.push(stepPane);
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //TRACKS PANE (but it's a button)
    /////////////////////////////////////////////////
    var trackPane = new Button();
    trackPane.setSrc("image_resources/TracksPaper.png");
    trackPane.setSpriteAttributes(226, 35, 250, 50, "trackPane");
    trackPane.hasTextValue = true;
    
    //Arbitrary step setup if the player does not have any steps yet. 
    if (trackPane === undefined) { dataObj.animalTracks = 100; }
    
    trackPane.setText(dataObj.animalTracks + " Tracks", (trackPane.width / 2) - 5 * numberLen(dataObj.animalTracks + " Steps"), trackPane.height / 4);
    
    //Changeing the button's update function to get the step count every frame. 
    trackPane.update = function() {
        this.text = dataObj.animalTracks + " Tracks";
        this.textOffsetX = (trackPane.width / 2) - 5 * numberLen(dataObj.animalTracks + " Tracks")
        this.textOffsetY = 10;
    };
    game.buttonArray.push(trackPane);
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //ANIMAL ICONS
    /////////////////////////////////////////////////
    var animalIcon, i;
    for (i = 0; i < 4; i++) {
        animalIcon = new Button(change_image, [i]);
        
        animalIcon.setSrc(ui_values.animalSrcAry[i], ui_values.animalSrcAry[4]);
        
        animalIcon.setSpriteAttributes((96 +(100*i)), 110, 60, 60, "animal_icon" + i);
        
        animalIcon.setText(ui_values.animalAry[i], (5-ui_values.animalAry[i].length)*5, -24)
        game.buttonArray.push(animalIcon);
    }
    /////////////////////////////////////////////////
    
    var attButton, attValue, animalImage;
    for (i = 0; i < 6; i++) {
        attValue = new Button(function () {});
        attValue.setSrc("image_resources/ClearSquare.png");
        
        attValue.setSpriteAttributes(91, (215 + 33 * i), 80, 40, "attribute_value" + i);
        
        attValue.hasTextValue = true;
        
        //Using an animal from ui_values, therefore must use toLowerCase().
       // var attSelect = animal_data[ui_values.currentAnimal.toLowerCase() + "_" + ui_values.attributes[i]];
        charNum = "Att".length;
        attValue.setText("Att", (attValue.width / 2) - (5 * charNum), 0);
        game.buttonArray.push(attValue);
        
        attNum = new Button(function () {});
        attNum.setSrc("image_resources/ClearSquare.png");
        
        attNum.setSpriteAttributes(178, (215 + 33 * i), 80, 40, "attribute_value" + i);
        
        attNum.hasTextValue = true;
        
        //Using an animal from ui_values, therefore must use toLowerCase().
       // var attSelect = animal_data[ui_values.currentAnimal.toLowerCase() + "_" + ui_values.attributes[i]];
        charNum = "Attr".length;
        attNum.setText("1507", (attNum.width / 2) - (5 * charNum), 0);
        game.buttonArray.push(attNum);
    }
    
    /////////////////////////////////////////////////
    //ANIMAL IMAGE
    /////////////////////////////////////////////////
    animalImage = new Button(spawn_animal);
    animalImage.setSrc(ui_values.animalStaticAry[0], "images/nwalk1.jpg");
    //console.log(animalImage.anim);
    animalImage.setSpriteAttributes(261, 215, 200, 200, "animal_image");
    game.buttonArray.push(animalImage);
    /////////////////////////////////////////////////

    //Mute Button
    function mB() {soundMan.mute_music()}

    muteButton = new Button(mB);
    muteButton.setSrc("images/mute.jpg")
    muteButton.setSpriteAttributes(40,40,30,30, "mute_music");
    game.buttonArray.push(muteButton);
    
    /////////////////////////////////////////////////
    //EVENT LOG
    /////////////////////////////////////////////////
    for (i = 0; i < 5; i++) {
        var eventLogPane = new Button();
        eventLogPane.setSrc("image_resources/ClearSquare.png");
        eventLogPane.setSpriteAttributes(527, (40*i)+30, 452, 54, "eventLog");
        game.buttonArray.push(eventLogPane);

        eventLogPane.hasTextValue = true;
        eventLogPane.fontSize = '18px';
        /*
        evtStr = "Hello world, this is an event. Now this is a very long event" + "\n" + "that will likely go off the page.";
        //;
        //evtStr = dataTracker.getEventString();
        console.log(charNum = evtStr.length);
        eventLogPane.setText(evtStr, 0, 0);
        */
        //var testRef = {foo: eventLogAry[i]}
        (function(i) {
            var testRef = eventLogAry[i];
            console.log(testRef);
            eventLogPane.update = function() {
                if (eventLogAry[i]) {
                    this.text = eventLogAry[i];
                } else {this.text = "";}
            }
        })(i);
    }
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //ANIMAL ANIMATIONS
    /////////////////////////////////////////////////
    for (i = 0; i < 4; i++) {
        var animalAnimation = new Button();
        animalAnimation.setSrc(ui_values.animalWalkAry[1],                              ui_values.animalWalkAry[1],                              true);
        animalAnimation.setSpriteAttributes(597 - (20*i), (40*i)+340, 100, 100, "animalAnimation");
        game.buttonArray.push(animalAnimation);

        animalAnimation.setupAnim(16, 4, 5);
    }
    /////////////////////////////////////////////////
}

/* change_attribute() - For changing attributes up or down. 
 * Params:
 *    index - index of the attribute being changed.
 *    sign  - "pos" or "neg" determine if the attribute goes up or down.
 *    attValue - A reference the the attribute that is being modified. 
               - Could possibly change it to just passing in the parent's 'text' value. 
 * Returns - None. 
*/
/*
function change_attribute(index, sign, attValue) {
    
    var attributeString = (ui_values.currentAnimal + "_").toLowerCase();
    switch (index) {
    case 0:
        attributeString += "armor";
        break;
    case 1:
        attributeString += "speed";
        break;
    case 2:
        attributeString += "capacity";
        break;
    case 3:
        attributeString += "lifespan";
        break;
    }
    
    if (sign === "neg") {
        if (animal_data[attributeString] < 1) {
            return;
        }
        animal_data[attributeString]--;
        attValue.text = animal_data[attributeString];
        stepCount+=(10*animal_data[attributeString]);
    } else {
        if (stepCount - (10*(animal_data[attributeString]+1)) <= 0) {
            return;
        }
        animal_data[attributeString]++;
        attValue.text = animal_data[attributeString];
        stepCount-=(10*animal_data[attributeString]);   
    }
    attValue.text = animal_data[attributeString];

    soundMan.click.play()
}
*/

/* change_image() - For changing the spawn button image and the unlockables connected to it. . 
 * Params:
 *    animal_index - index of the animal being selected.
 * Returns - None. 
*/
function change_image(animal_index) {
    var ani_imgRef;
    aniSrc = ui_values.animalStaticAry;
    game.buttonArray.forEach(function (elem) {
        if (elem.name === "animal_image") {
            //DEBUG: console.log(aniSrc[animal_index]);
            if (aniSrc[animal_index] === "image_resources/FrogSpriteSheet200_1400x1400.png") {
                elem.setSrc(aniSrc[animal_index], aniSrc[4], true);
                elem.setupAnim(44, 7, 7);
            } 
            else {
                elem.setSrc(aniSrc[animal_index], aniSrc[4], false);
            }  
        }
    });
    
    //Making the source the png files for the unlockables. 
    aniSrc = ui_values.animalSrcAry;
    panes.forEach(function (elem) {
        if (elem.name === "unlockable") {
            elem.setSrc(aniSrc[animal_index], aniSrc[4]);
        }
    });
    
    //Setting current animal so we all know what we're referencing. 
    ui_values.currentAnimal = ui_values.animalAry[animal_index];
    soundMan.click.play()
}

/* spawn_animal() - For spawning animals on the map. 
 * Params: None
 * Returns: None. 
 * Notes: Spawn location determination should be done here, unless there's another function that can specify it. 
*/
function spawn_animal() {
}
/*
function spawn_animal() {
    var animal, mapPane, spawnX, spawnY;
    //Find the map pane from the panes array. 
    panes.forEach(function (elem) {
        if (elem.name === "mapPane") {
            mapPane = elem;
        }
    });
    
    if (stepCount - 100 < 0) {
        return;
    }
    spawnX = randomNum(550, 950);
    spawnY = randomNum(50, 500);

    
    //Spawn the proper animal. 
    switch (ui_values.currentAnimal) {
    case "Bird":
        dataObj.animalCounter[0]++;
        //stepCount -= (50*ui_values.animalCounter[0]);
        animal = new bird(spawnX, spawnY);
        setupAnimal(animal);
        game.push(animal);
        break;
    case "Deer":
        dataObj.animalCounter[1]++;
        //stepCount -= (100*ui_values.animalCounter[1]);
        animal = new deer(spawnX, spawnY);
        setupAnimal(animal);
        game.push(animal);
        break;
    case "Frog":
        //console.log("frog");
        dataObj.animalCounter[2]++;
        //stepCount += (50*ui_values.animalCounter[2]);
            //console.log(ui_values.animalCounter[2]);
        animal = new frog(spawnX, spawnY);
        setupAnimal(animal);
        game.push(animal);
        break;
    case "Bunny":
        dataObj.animalCounter[3]++;
        //stepCount -= (50*ui_values.animalCounter[3]);
        animal = new bunny(spawnX, spawnY);
        setupAnimal(animal);
        game.push(animal);
        break;
    }

    soundMan.click.play()
    stepCount -= 100;
}
*/

//Small utility function that converts a number to a string and returns the length. 
//Good for text alignment, but not perfect. 
function numberLen(num) {
    return num.toString().length;
}