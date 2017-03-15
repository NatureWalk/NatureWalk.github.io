/* GENERAL UI NOTES:
 * There are lots of integer coordinates for the current UI, for scalability purposes, 
 they should be changed to fractions of the screen width and height. 
*/

/*JIM MEETING NOTES
 * Add Title for selected animal. (DONE)
 * Show level below animal icons. (DONE)
 * Game Title somewhere on the page. 
 * Better communication of events and effects of them. 
 * Multiple different animals on screen, only show animals that the player has. 
 * Player's permanent animal. 
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
    //animalStatsAry: [dataObj.BirdStats, dataObj.DeerStats, dataObj.FrogStats, dataObj.BunnyStats],
    animalSrcAry: [("image_resources/Icon_Bird.png"),
                  ("image_resources/Icon_Deer.png"),
                  ("image_resources/Icon_Frog.png"),
                  ("image_resources/Icon_Bunny.png"),
                  ("image_resources/StepPaper.png")],
    
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
    //currentAnimalStats: dataObj.BirdStats,
    //attributes: ["armor", "speed", "capacity", "lifespan"],
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
    attributesPane.setSpriteAttributes(46, 195, 440, 370, "attributesPane");
    panes.push(attributesPane);
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //UNLOCKABLES (change to buttons when we have the functionality)
    /////////////////////////////////////////////////
    
    for (i = 0; i < 2; i++) {
        for (j = 0; j < 6; j++) {
            subAttPane = new Sprite();
            //Sets the source of each pane to be the same as the animal icon. 
            subAttPane.setSrc(ui_values.animalSrcAry[1]);
            subAttPane.setSpriteAttributes((101 + 60 * j), (455 + 50 * i), 40, 40, "unlockable");
            panes.push(subAttPane);
        }
    }
    
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //STATS PANE
    /////////////////////////////////////////////////
    var statPane = new Sprite();
    statPane.setSrc("image_resources/Worn-Paper-Texture.png");
    statPane.setSpriteAttributes(75, 245, 110, 163, "statPane");
    panes.push(statPane);
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //STAT VALUE PANE
    /////////////////////////////////////////////////
    var statPane = new Sprite();
    statPane.setSrc("image_resources/Worn-Paper-Texture.png");
    statPane.setSpriteAttributes(195, 245, 50, 163, "statVals");
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
    if (stepCount === undefined) { stepCount = 33421; }
    
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
    
    //Changing the button's update function to get the step count every frame. 
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
    var animalIcon, i, animalCount;
    for (i = 0; i < 4; i++) {
        animalIcon = new Button(change_image, [i]);
        
        animalIcon.setSrc(ui_values.animalSrcAry[i], ui_values.animalSrcAry[4]);
        
        animalIcon.setSpriteAttributes((71 +(100*i)), 110, 60, 60, "animal_icon" + i);
        animalIcon.hasTextValue = true;
        animalIcon.setText(ui_values.animalAry[i], (5-ui_values.animalAry[i].length)*5, -24)
        game.buttonArray.push(animalIcon);
        
        /////////////////////////////////////////////////
        //ANIMAL COUNT
        /////////////////////////////////////////////////
        animalCount = new Button(function() {})
        animalCount.setSrc("image_resources/ClearSquare.png");
        animalCount.setSpriteAttributes((111 +(100*i)), 125, 60, 60, "animal_count" + i);
        animalCount.hasTextValue = true;
        
        (function(i) {
            animalCount.update = function() {
                var testRef = controller.getAnimalCount(animal_types[i]);
                var charNum = numberLen(testRef);  
                this.setText(controller.getAnimalCount(animal_types[i]), (animalCount.width / 2) - (5 * charNum), 0);
            }
        })(i);
        game.buttonArray.push(animalCount);
        /////////////////////////////////////////////////
        
        /////////////////////////////////////////////////
        //ANIMAL LEVEL
        /////////////////////////////////////////////////
        animalLevel = new Button(function() {})
        animalLevel.setSrc("image_resources/ClearSquare.png");
        animalLevel.setSpriteAttributes((71 +(100*i)), 165, 60, 60, "animal_level" + i);
        animalLevel.hasTextValue = true;
        
        (function(i) {
            animalLevel.update = function() {
                var temp = ui_values.animalAry[i].toLowerCase();
                var level = controller.levels[temp];
                var charNum = numberLen(temp);  
                this.setText("Lvl " + level, (animalLevel.width / 2) - (5 * charNum), 0);
            }
        })(i);
        game.buttonArray.push(animalLevel);
        /////////////////////////////////////////////////
        
    }
    /////////////////////////////////////////////////
    //ATTRIBUTE NAMES
    /////////////////////////////////////////////////
    var attButton, attValue, animalImage;
    for (i = 0; i < 6; i++) {
        attValue = new Button(function () {});
        attValue.setSrc("image_resources/ClearSquare.png");
        
        attValue.setSpriteAttributes(86, (245 + 27 * i), 80, 40, "attribute_value" + i);
        
        attValue.hasTextValue = true;
        attValue.fontSize = '22px';
        
        //Using an animal from ui_values, therefore must use toLowerCase().
       // var attSelect = animal_data[ui_values.currentAnimal.toLowerCase() + "_" + ui_values.attributes[i]];
        charNum = dataObj.animalStats[i].length;
        attValue.setText(dataObj.animalStats[i], 0, 0);
        game.buttonArray.push(attValue);
        
        /////////////////////////////////////////////////
        //ATTRIBUTE VALUES
        /////////////////////////////////////////////////
        attNum = new Button(function () {});
        attNum.setSrc("image_resources/ClearSquare.png");
        
        attNum.setSpriteAttributes(183, (245 + 27 * i), 80, 40, "attribute_value" + i);
        
        attNum.hasTextValue = true;
        attNum.fontSize = '22px';
        
        (function(i) {
            attNum.update = function() {
                var stats = (ui_values.currentAnimal).toLowerCase();
                var testRef = controller.getAnimalData(stats);
                var charNum = numberLen(testRef[i]);  
                this.setText(testRef[i], (attNum.width / 2) - (5 * charNum), 0);
            }
        })(i);
        game.buttonArray.push(attNum);
        /////////////////////////////////////////////////
    }
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //UPGRADE BUTTON
    /////////////////////////////////////////////////
    var upgradeBtn;
    upgradeBtn = new Button(function() {
        upgrade_animal();
    });
    upgradeBtn.setSrc("image_resources/Worn-Paper-Texture.png", "image_resources/StepPaper.png");

    upgradeBtn.setSpriteAttributes(76, 415, 170, 30, "attribute_value" + i);

    upgradeBtn.hasTextValue = true;
    upgradeBtn.fontSize = '28px';
    charnum = "upgrade".length;
    upgradeBtn.setText("UPGRADE", (upgradeBtn.width / 2) - (7 * charNum), -2);
    game.buttonArray.push(upgradeBtn);    
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //ANIMAL IMAGE
    /////////////////////////////////////////////////
    animalImage = new Button(spawn_animal);
    animalImage.setSrc(ui_values.animalStaticAry[0], "image_resources/StepPaper.png");
    //console.log(animalImage.anim);
    animalImage.setSpriteAttributes(261, 245, 200, 200, "animal_image");
    game.buttonArray.push(animalImage);
    
    animalImage.hasTextValue = true;
    animalImage.fontSize = '38px';
    animalImage.update = function() {
                //var stats = (ui_values.currentAnimal).toLowerCase();
                var temp = ui_values.currentAnimal;
                //console.log(testRef);
                var charNum = numberLen(temp);  
                this.setText(temp, -15 - (9 * charNum), -40);
                //console.log(attNum.text);                 
            }
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

    var eventLogPane = new Button();
    eventLogPane.setSrc("image_resources/AttPane.png");
    eventLogPane.setSpriteAttributes(527, 30, 452, 204, "eventLog");
    game.buttonArray.push(eventLogPane);
        
        
    for (i = 0; i < 5; i++) {
        var eventLogEntry = new Button();
        eventLogEntry.setSrc("image_resources/ClearSquare.png");
        eventLogEntry.setSpriteAttributes(567, (30*i)+40, 452, 54, "eventLog");
        game.buttonArray.push(eventLogEntry);

        eventLogEntry.hasTextValue = true;
        eventLogEntry.fontSize = '18px';
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
            //console.log(testRef);
            eventLogEntry.update = function() {
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
        animalAnimation.setSrc(ui_values.animalWalkAry[1],                              ui_values.animalWalkAry[1], true);
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

/* spawn_animal() - For spawning animals. 
 * Params: None
 * Returns: None. 
*/
function spawn_animal() {
    if (stepCount - 100 < 0) {
        return;
    }
    controller.addAnimal(ui_values.currentAnimal.toLowerCase());
    switch (ui_values.currentAnimal) {
        case 'Bird':
            break;
        case 'Deer':
            break;
        case 'Frog':
            break;
        case 'Bunny':
            break;
    }
    soundMan.click.play()
    stepCount -= 100;
}

/* upgrade_animal() - For increasing the level of animals. 
 * Params: None
 * Returns: None. 
*/
function upgrade_animal() {
    var level = controller.getAnimalLevel((ui_values.currentAnimal).toLowerCase());
    console.log("Level is: " + level);
    if (dataObj.animalTracks - (level * 100) < 0) {
        return;
    } else {
        dataObj.animalTracks -= (level * 100);
        controller.levelUp(ui_values.currentAnimal.toLowerCase());
    }
}

//Small utility function that converts a number to a string and returns the length. 
//Good for text alignment, but not perfect. 
function numberLen(num) {
    return num.toString().length;
}