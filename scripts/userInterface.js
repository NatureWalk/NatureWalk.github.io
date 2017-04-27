/* GENERAL UI NOTES:
 * There are lots of integer coordinates for the current UI, for scalability purposes, 
 they should be changed to fractions of the screen width and height. 
*/

/*JIM MEETING NOTES
 * Add Title for selected animal. (DONE)
 * Show level below animal icons. (DONE)
 * Game Title somewhere on the page. (DONE in text, need logo)
 * Better communication of events and effects of them. 
 * Multiple different animals on screen, only show animals that the player has. (DONE)
 * Player's permanent animal. 
 */

/*
 *BUTTON TEXT IS AN ARRAY NOW
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
                  ("image_resources/EventLog.png")],
    
    //For gif animations, though I didn't figure out how to make them do gif things. 
    animalStaticAry: [("image_resources/Icon_Bird.png"),
                      ("image_resources/Icon_Deer.png"),
                      ("image_resources/FrogCroak.png"),
                      ("image_resources/BunnyTurns.png"),
                      ("image_resources/EventLog.png")],

    animalWalkAry: [("image_resources/BirdWalk.png"),
                    ("image_resources/DeerWalk100_500x400.png"),
                    ("image_resources/FrogWalk100.png"),
                    ("image_resources/BunnyWalk.png")],
    //For selecting base animal or party animal
    selected: "base",
    partyIndex: 0,
    currentAnimal: "Deer",
    //currentAnimalStats: dataObj.BirdStats,
    //attributes: ["armor", "speed", "capacity", "lifespan"],
};


/* backgroundSetup() - For setting up, non-button elements of the canvas, like the map and the pane that holds all of the attributes. 
 * Params - None. 
 * Returns - An array of panes that the interface.init will push into the screen array. 
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
    //STATS PANE
    /////////////////////////////////////////////////
    var statPane = new Sprite();
    statPane.setSrc("image_resources/EventLog.png");
    statPane.setSpriteAttributes(75, 235, 115, 183, "statPane");
    panes.push(statPane);
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //STAT VALUE PANE
    /////////////////////////////////////////////////
    var statPane = new Sprite();
    statPane.setSrc("image_resources/EventLog.png");
    statPane.setSpriteAttributes(180, 235, 70, 183, "statVals");
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
    //Title Login
    /////////////////////////////////////////////////
    //Replace with a function that ensures the game data is loaded before the game is pushed.
    function loadGame() {
        //Would also include pulling from the server.
//******function for testing without fitbit data COMMENT OUT ONCE FITBITSTART() IS BEING CALLED*****
        console.log("my user id is : " + userID);
        if(userID == undefined){
         userID = "asdfwer";
         stepCount = 501800;
        }
//**************************************************************************************************
        //logs user data to local storage
        console.log(userID);
        logIn();
        screenMan.push(game);
        screenMan.push(interface);
    }

    var login = new Button(loadGame)
    login.setSrc("image_resources/StepPaper.png","image_resources/TracksPaper.png")
    login.setSpriteAttributes(392,248,240,80, "login button")
    login.hasTextValue = true;
    login.setText(["Login With Fitbit"],40,20)
    console.log(login.text);
    title.buttonArray.push(login);

    /////////////////////////////////////////////////
    //DEV ATTRIBUTES
    /////////////////////////////////////////////////
    var devAttributes = new Button(dataTracker.openDevWindow);
    devAttributes.setSrc("image_resources/ClearSquare.png", "image_resources/ClearSquare.png");
    devAttributes.setSpriteAttributes(20, 530, 30, 30, "devWindow");
    interface.buttonArray.push(devAttributes);
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //STEP PANE (but it's a button)
    /////////////////////////////////////////////////
    var stepPane = new Button();
    stepPane.setSrc("image_resources/StepPaper.png");
    stepPane.setSpriteAttributes(76, 30, 150, 50, "stepPane");
    stepPane.hasTextValue = true;
    
    //Arbitrary step setup if the player does not have any steps yet. 
    
    
    
    stepPane.setText([stepCount + " Steps"], (stepPane.width / 2) - 5 * numberLen(stepCount + " Steps"), stepPane.height / 4);
    
    //Changeing the button's update function to get the step count every frame. 
    stepPane.update = function() {
        this.updateText([stepCount + " Steps"]);
        this.textOffsetX = (stepPane.width / 2) - 5.5 * numberLen(stepCount + " Steps")
    };
    interface.buttonArray.push(stepPane);
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //TRACKS PANE (but it's a button)
    /////////////////////////////////////////////////
    var trackPane = new Button();
    trackPane.setSrc("image_resources/TracksPaper.png");
    trackPane.setSpriteAttributes(226, 35, 250, 50, "trackPane");
    trackPane.hasTextValue = true;
    trackPane.color = 'blue';
    
    //Changing the button's update function to get the step count every frame. 
    trackPane.update = function() {
        var text = [];
        var color = [];
        text.push(numberConversion(Math.floor(dataObj.animalTracks)))
        color.push('blue');
        text.push(" Tracks");
        color.push('black');
        this.updateText(text,color);
        this.textOffsetX = (trackPane.width / 2) - 5 * numberLen(Math.floor(dataObj.animalTracks) + " Tracks")
        this.textOffsetY = 10;
    };
    interface.buttonArray.push(trackPane);
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //ANIMAL ICONS
    /////////////////////////////////////////////////
    var animalIcon, i, animalCount;
    for (i = 0; i < 4; i++) {
        animalIcon = new Button(select_base, [i]);
        
        animalIcon.setSrc(ui_values.animalSrcAry[i], ui_values.animalSrcAry[4]);
        
        animalIcon.setSpriteAttributes((71 +(100*i)), 110, 60, 60, "animal_icon" + i);
        animalIcon.hasTextValue = true;
        animalIcon.setText([ui_values.animalAry[i]], (5-ui_values.animalAry[i].length)*5, -24)
        interface.buttonArray.push(animalIcon);
        
        /////////////////////////////////////////////////
        //ANIMAL COUNT
        /////////////////////////////////////////////////
        /*animalCount = new Button(function() {})
        animalCount.setSrc("image_resources/ClearSquare.png");
        animalCount.setSpriteAttributes((140 +(100*i)), 125, 0, 0, "animal_count" + i);
        animalCount.hasTextValue = true;
        
        //This is a closure that declares a function with a parameter 'i' then immediately calls it with i.
        //Changing the update 
        (function(i) {
            animalCount.update = function() {
                var testRef = controller.getAnimalCount(animal_types[i]);
                var charNum = numberLen(testRef);  
                this.setText(controller.getAnimalCount(animal_types[i]), (animalCount.width / 2) - (5 * charNum), 0);
            }
        })(i);
        interface.buttonArray.push(animalCount);*/
        /////////////////////////////////////////////////
        
        
        
        /////////////////////////////////////////////////
        //ANIMAL LEVEL
        /////////////////////////////////////////////////
        animalLevel = new Button(function() {})
        animalLevel.setSrc("image_resources/ClearSquare.png");
        animalLevel.setSpriteAttributes((91 +(100*i)), 165, 0, 0, "animal_level" + i);
        animalLevel.hasTextValue = true;
        
        (function(i) {
            animalLevel.update = function() {
                var temp = ui_values.animalAry[i].toLowerCase();
                var level = controller.getAnimalBaseLevel(temp);
                var charNum = numberLen(temp);  
                this.setText(["Lvl " + level], (animalLevel.width / 2) - (5 * charNum), 0);
            }
        })(i);
        interface.buttonArray.push(animalLevel);
        /////////////////////////////////////////////////  
    }
    
    
    /////////////////////////////////////////////////
    //ATTRIBUTE NAMES
    /////////////////////////////////////////////////
    
    var attButton, attValue, animalImage, animalImageCost;

    for (i = 0; i < 4; i++) {

        attValue = new Button(function () {});
        attValue.setSrc("image_resources/ClearSquare.png");
        
        attValue.setSpriteAttributes(96, (245 + 27 * i), 0, 40, "attribute_value" + i);
        
        attValue.hasTextValue = true;
        attValue.fontSize = '22px';
        
        charNum = dataObj.animalStats[i].length;
        attValue.setText([dataObj.animalStats[i]], 0, 0);
        interface.buttonArray.push(attValue);
        
        /////////////////////////////////////////////////
        //ATTRIBUTE VALUES
        /////////////////////////////////////////////////
        attNum = new Button(function () {});
        attNum.setSrc("image_resources/ClearSquare.png");
        
        attNum.setSpriteAttributes(218, (245 + 27 * i), 0, 40, "attribute_value" + i);
        
        attNum.hasTextValue = true;
        attNum.fontSize = '22px';
        
        (function(i) {
            attNum.update = function() {
                if (ui_values.selected == "base") {
                    var stats = (ui_values.currentAnimal).toLowerCase();
                    var testRef = controller.getBaseData(stats);
                } else {
                    var testRef = controller.getAnimalData()[ui_values.partyIndex];
                    if (testRef == undefined) {
                        ui_values.selected = "base"
                        return;
                    }
                    if (testRef != undefined) {
                        testRef.splice(0,1);
                        testRef.splice(4,1);
                    }
                    //console.log(testRef)
                }
                //Workaround, some event may be more broken
                if (testRef == undefined) return;

                var charNum = numberConversion(testRef[i]).length  
                this.setText([numberConversion(testRef[i])], (attNum.width / 2) - (5 * charNum), 0);
                
            }
        })(i);
        interface.buttonArray.push(attNum);
        /////////////////////////////////////////////////
    }
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //UPGRADE BUTTON
    /////////////////////////////////////////////////
    var upgradeBtn;
    upgradeBtn = new Button(function() {
        if (ui_values.selected == "base") {
            upgrade_baseAnimalMax();
        } else {
            upgrade_animalMax();
        }
    });
    upgradeBtn.setSrc("image_resources/StepPaper.png", "image_resources/TracksPaper.png");

    upgradeBtn.setSpriteAttributes(76, 405, 120, 40, "UpgradeBtn");

    upgradeBtn.hasTextValue = true;
    upgradeBtn.fontSize = '20px';
    charnum = "upgrade".length;
    upgradeBtn.setText(["UPGRADE"], (upgradeBtn.width / 2) - (6.3 * charnum), 5);
    upgradeBtn.setTooltip("This upgrades the "+ui_values.selected+" animal to the next level.")
    interface.buttonArray.push(upgradeBtn);    
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //UPGRADE COST
    /////////////////////////////////////////////////
    var upgradeCost;
    upgradeCost = new Button(function() {});
    upgradeCost.setSrc("image_resources/StepPaper.png");

    upgradeCost.setSpriteAttributes(186, 405, 65, 40, "upgradeCost");

    upgradeCost.hasTextValue = true;
    upgradeCost.fontSize = '20px';
    upgradeCost.color = ['blue'];


    upgradeCost.update = function() {
        if (ui_values.selected == "base") {
            var level = controller.base_levels[(ui_values.currentAnimal).toLowerCase()];       
        } else {
            if (controller.animals[ui_values.partyIndex] == undefined) {
                ui_values.selected = "base";
                return;
            }
            var level = controller.animals[ui_values.partyIndex].level;
        }

        charnum = numberConversion(level*100).length;
        upgradeCost.setText([numberConversion(level*100)], (upgradeCost.width / 2) - (4 * charnum), 5);
    };

   
    //upgradeCost.setText(level*100, 0,0);
    interface.buttonArray.push(upgradeCost); 
    console.log(upgradeCost.update);
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //ADD ANIMAL BUTTON
    /////////////////////////////////////////////////
    animalImage = new Button(add_animal);
    animalImage.setSrc(ui_values.animalStaticAry[1], "image_resources/EventLog.png");
    animalImage.setSpriteAttributes(261, 245, 200, 200, "animal_image");
    animalImage.setTooltip("Pressing this calls the selected animal.");
    interface.buttonArray.push(animalImage);
    
    animalImage.hasTextValue = true;
    animalImage.fontSize = '38px';
    animalImage.update = function() {
        if (this.anim) {
            this.tickCount++; 
            if (this.tickCount > this.ticksPerFrame) {
                this.frameIndex++;
                if (this.frameIndex > this.frameTotal) {this.frameIndex = 0;}
                this.tickCount = 0; 
            }
        }
        if (ui_values.selected == "base") {
            var name = ui_values.currentAnimal;
            var charNum = numberLen(name);  
            this.setText([name], -15 - (9 * charNum), -40);
        } else {
            //This line gave me cancer
            if (controller.animals[ui_values.partyIndex] == undefined) {
                ui_values.selected = "base";
                return;
            }
            var type = ui_values.animalAry[aniToNum(controller.animals[ui_values.partyIndex].type)];
            var name = controller.animals[ui_values.partyIndex].name;
            var charNum = numberLen(name);  
            this.setText([type+" "+name], -50 - (9 * charNum), -40);
        }
    }
    
    animalImageCost = new Button(add_animal);
    animalImageCost.setSrc("image_resources/ClearSquare.png");
    animalImageCost.setSpriteAttributes(261, 245, 0, 0, "animal_image");
    interface.buttonArray.push(animalImageCost);
    
    animalImageCost.hasTextValue = true;
    animalImageCost.fontSize = '28px';
    animalImageCost.update = function() {
        animalImageCost.setText([2000 + 500*controller.animals.length + " Steps"], 0 + (5.5 * charNum), 160);
    }
    

    /////////////////////////////////////////////////

    //Mute Button
    function mB() {soundMan.mute_music()}

    muteButton = new Button(mB);
    muteButton.setSrc("image_resources/Sound0.png", "image_resources/Sound.png");
    muteButton.setSpriteAttributes(40,40,30,30, "mute_music");
    muteButton.isToggleButton = true;
    interface.buttonArray.push(muteButton);
    
    /////////////////////////////////////////////////
    //ANIMAL ANIMATIONS
    /////////////////////////////////////////////////
    for (i = 0; i < 4; i++) {
        var animalAnimation = new Button();
        animalAnimation.setSrc(ui_values.animalWalkAry[i],                              ui_values.animalWalkAry[i], true);
        animalAnimation.setSpriteAttributes(597 - (20*i), (40*i)+340, 100, 100, "animalAnimation");
        
        if (i==0) {
            animalAnimation.setupAnim(4, 3, 3);
        } else if (i==1) {
            animalAnimation.setupAnim(16, 4, 5);
        } else if (i==2) {
            animalAnimation.setupAnim(21, 5, 5);
        } else if (i==3) {
            animalAnimation.setupAnim(6, 3, 3);
        }
        (function(i) {
            animalAnimation.update = function() { 
               var testRef = controller.getAnimalCount(ui_values.animalAry[i].toLowerCase());
                if (testRef === 0) {
                    this.setSrc("image_resources/ClearSquare.png", "image_resources/ClearSquare.png", false);
                } else {
                    this.setSrc(ui_values.animalWalkAry[i],                              ui_values.animalWalkAry[i], true);
                }
                if (this.anim) {
                    this.tickCount++; 
                    if (this.tickCount > this.ticksPerFrame) {
                        this.frameIndex++;
                        if (this.frameIndex > this.frameTotal) {this.frameIndex = 0;}
                        this.tickCount = 0; 
                    }
                }
            }
        })(i);
        interface.buttonArray.push(animalAnimation); 
    }
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //EVENT ANIMATIONS
    /////////////////////////////////////////////////
    var eventAnimation = new Button();
    eventAnimation.setSrc("image_resources/ClearSquare.png");
    //eventAnimation.setSrc("image_resources/PredatorEvent1s.png", "image_resources/PredatorEvent1s.png", true);
    eventAnimation.setSpriteAttributes(865, 380, 150, 100, "eventAnimation");
    
    //eventAnimation.setupAnim(12, 4, 4);
    interface.buttonArray.push(eventAnimation); 
    /////////////////////////////////////////////////

    /////////////////////////////////////////////////
    //WEATHER EVENT ANIMATIONS
    /////////////////////////////////////////////////
    var weatherAnimation = new Button();
    weatherAnimation.setSrc("image_resources/ClearSquare.png");
    //weatherAnimation.setSrc("image_resources/Event_Snow.png", "image_resources/Event_Snow.png", true);
    weatherAnimation.setSpriteAttributes(515, 220, 480, 330, "weatherAnimation");
    
    //weatherAnimation.setupAnim(22, 5, 5);
    interface.buttonArray.push(weatherAnimation); 
    /////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    //AREA CONTROLS
    /////////////////////////////////////////////////
    areaText = new Button(function () {});
    areaText.setSrc("image_resources/StepPaper.png");
    areaText.setSpriteAttributes(600, 235, 300, 50, "areaText");
    areaText.hasTextValue = true;
    areaText.fontSize = '22px';
    areaText.update = function() {
        var text = "Area "+controller.getAreaLevel()+" " + toCapitalize(controller.areaSeason);
        this.setText([text], (areaText.width / 2) - (5 * text.length), 10);
        //this.setText(text, (areaText.width / 2) - (5 * text.length), 10);
    }
    interface.buttonArray.push(areaText);

    areaPrev = new Button(function() {
        if(controller.getAreaLevel >= 1) {
            controller.areaLevelDown();
        }
    });

    areaPrev.update = function() {
        if (controller.getAreaLevel() <= 1) {
            areaPrev.setSrc("image_resources/ClearSquare.png","image_resources/ClearSquare.png");
        } else {
            areaPrev.setSrc("image_resources/left25x25.png","image_resources/ClearSquare.png");
        }
    }

    areaPrev.setSrc("image_resources/left25x25.png","image_resources/ClearSquare.png");
    areaPrev.setSpriteAttributes(625, 245, 25, 25, "areaPrev");
    interface.buttonArray.push(areaPrev);

    //areaNext = new Button(controller.areaLevelUp);
    areaNext = new Button(function() {
            if (areaEligible()) {controller.areaLevelUp()}
        });

    areaNext.update = function() {
        if (!areaEligible()) {
            areaNext.setSrc("image_resources/ClearSquare.png","image_resources/ClearSquare.png");
        } else {
            areaNext.setSrc("image_resources/right25x25.png","image_resources/ClearSquare.png");
        }
    }

    areaNext.setSrc("image_resources/right25x25.png","image_resources/ClearSquare.png");

    areaNext.setSpriteAttributes(850, 245, 25, 25, "areaNext");

    interface.buttonArray.push(areaNext);

    /////////////////////////////////////////////////
    //EVENT LOG
    /////////////////////////////////////////////////

    var eventLogPane = new Button();
    eventLogPane.setSrc("image_resources/EventLog.png");
    eventLogPane.setSpriteAttributes(527, 30, 452, 204, "eventLog");
    interface.buttonArray.push(eventLogPane);

        
    for (i = 0; i < 5; i++) {
        var eventLogEntry = new Button();
        eventLogEntry.setSrc("image_resources/ClearSquare.png");
        eventLogEntry.setSpriteAttributes(567, (35*i)+50, 452, 54, "eventLog");
        interface.buttonArray.push(eventLogEntry);

        eventLogEntry.hasTextValue = true;
        eventLogEntry.fontSize = '18px';

        (function(i) {
            var testRef = eventLogAry[i];
            //console.log(testRef);
            eventLogEntry.update = function() {
                if (eventLogAry[i]) {
                    this.updateText([eventLogAry[i]]);
                } else {this.updateText([""]);}
            }
        })(i);
        
        (function(i) {
            eventLogEntry.draw = function() {
                if ((this.hovered && this.text !== undefined) || this.hasTextValue){
                    if (this.text === undefined) {
            //console.log(this.name);
                    } else {
                        drawWrappedText(this.text, this.x + this.textOffsetX, this.y + this.textOffsetY, this.fontSize, 400, 20);
        }
    }
            }
        })(i);
    }
    /////////////////////////////////////////////////

    /////////////////////////////////////////////////
    //Selected Party Animal Indicator
    /////////////////////////////////////////////////
    var selectedAnimal = new Button();
    selectedAnimal.setSrc("image_resources/ClearSquare.png","image_resources/ClearSquare.png");
    selectedAnimal.setSpriteAttributes(101,455,40,40, "selected animal")
    selectedAnimal.draw = function () {
        if (partyButtons == undefined || partyButtons.length < 1 || ui_values.selected != "party") return;
        ctx.save();
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x+this.width/2,this.y+this.width/2,this.width/2,0,2*Math.PI);
        ctx.stroke();
        ctx.restore();
        ctx.rect(517, 0, 475, 578);
    }
    selectedAnimal.update = function() {
        if (controller.animals[ui_values.partyIndex] == undefined) {
            ui_values.selected = "base";
            return;
        }
        this.x = partyButtons[ui_values.partyIndex].x;
        this.y = partyButtons[ui_values.partyIndex].y;
    }
    interface.buttonArray.push(selectedAnimal);
}

/* select_base() - For changing the spawn button image and the unlockables connected to it. . 
 * Params:
 *    animal_index - index of the animal being selected.
 * Returns - None. 
*/
function select_base(animal_index) {
    ui_values.selected = "base";
    var ani_imgRef;
    var aniSrc = ui_values.animalStaticAry;
    
    interface.buttonArray.forEach(function (elem) {
        if (elem.name === "animal_image") {
            switch (animal_index) {
                case 0:
                    elem.setSrc(aniSrc[animal_index], aniSrc[4], false);
                    break;
                case 1:
                    elem.setSrc(aniSrc[animal_index], aniSrc[4], false);
                    break;
                case 2:
                    elem.setSrc(aniSrc[animal_index], aniSrc[4], true);
                    elem.setupAnim(44, 7, 7);
                    break;
                case 3:
                    elem.setSrc(aniSrc[animal_index], aniSrc[4], true);
                    elem.setupAnim(15, 4, 4);
                    
            }
        }
            //DEBUG: console.log(aniSrc[animal_index]);
            /*
            if (aniSrc[animal_index] === "image_resources/FrogSpriteSheet200_1400x1400.png") {
                elem.setSrc(aniSrc[animal_index], aniSrc[4], true);
                elem.setupAnim(44, 7, 7);
            } 
            else {
                elem.setSrc(aniSrc[animal_index], aniSrc[4], false);
            }  
        }
        */
            
    });
    
    //Setting current animal so we all know what we're referencing. 
    ui_values.currentAnimal = ui_values.animalAry[animal_index];
    soundMan.click.play();
}

function select_animal(animal_index) {
    ui_values.selected = "party";
    ui_values.partyIndex = animal_index;
    var aniSrc = ui_values.animalStaticAry;

    console.log("Animal "+controller.animals[animal_index].type)
    var ani_imgRef = aniToNum(controller.animals[animal_index].type);
    console.log("ani_imgRef "+ani_imgRef)
    interface.buttonArray.forEach(function (elem) {
        if (elem.name === "animal_image") {
            //DEBUG: console.log(aniSrc[animal_index]);
            if (aniSrc[animal_index] === "image_resources/FrogSpriteSheet_200x200.png") {
                elem.setSrc(aniSrc[ani_imgRef], aniSrc[4], true);
                elem.setupAnim(44, 7, 7);
            } 
            else {
                elem.setSrc(aniSrc[ani_imgRef], aniSrc[4], false);
            }  
        }
    })

    ui_values.partyIndex = animal_index;
    soundMan.click.play();
}

/* add_animal() - For adding animals to the party. 
 * Params: None
 * Returns: None. 
*/
function add_animal() {
    if (stepCount - (2000 + (500*controller.getNumAnimals())) < 0) {
        return;
    }
    var status = controller.addAnimal(ui_values.currentAnimal.toLowerCase());
    console.log(status)
    console.log("party: "+controller.getNumAnimals())

    if (status === true){
        soundMan.click.play()
        stepCount -= (2000 + (500*(controller.getNumAnimals() - 1)));
        updateParty()
        dataObj.partySize = controller.getNumAnimals()
    }
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
    
}

/////////////////////////////////////////////////
//PARTY ICONS
/////////////////////////////////////////////////
/*    
for (i = 0; i < 2; i++) {
    for (j = 0; j < 6; j++) {
        subAttPane = new Sprite();
        //Sets the source of each pane to be the same as the animal icon. 
        subAttPane.setSrc(ui_values.animalSrcAry[1]);
        subAttPane.setSpriteAttributes((101 + 60 * j), (455 + 50 * i), 40, 40, "unlockable");
        panes.push(subAttPane);
    }
}*/

var partyButtons = []

/* updateParty() - Updates the party buttons. 
 * Params: None
 * Returns: None. 
*/
function updateParty() {
	console.log("updating party")
    //Remove all of the partyButtons from the engine
    for (var b=0; b<partyButtons.length; b++) {
		for (var i in interface.buttonArray) {
            if (interface.buttonArray[i] == partyButtons[b]) {
                interface.buttonArray.splice(i,1);
            }
        }
        interface.remove(partyButtons[b]);
	}

    //Reset partyButtons and add update
	partyButtons = []

	var animals = controller.animals;
	var partyIcon = new Button();
	for (var i = 0; i < animals.length;i++) {
		var num = aniToNum(animals[i].type);
		console.log("animal number: "+num)
		partyIcon = new Button(select_animal,[i]);
		partyIcon.setSrc(ui_values.animalSrcAry[num],ui_values.animalSrcAry[4]);
		//@fix: Only does one row
		partyIcon.setSpriteAttributes((101 + 60*i), (455), 40, 40, "party animal "+i);
		partyButtons.push(partyIcon);
    }

    console.log(partyButtons);
    for (var b=0; b<partyButtons.length; b++) {
    	interface.buttonArray.push(partyButtons[b]);
        interface.push(partyButtons[b]);
    }
}


/* upgrade_baseAnimal() - For increasing the level of animals. 
 * Params: None
 * Returns: None. 
*/
function upgrade_baseAnimal() {
    var level = controller.getAnimalBaseLevel((ui_values.currentAnimal).toLowerCase());
    if (dataObj.animalTracks - (level * 100) < 0) {
        return;
    } else {
        dataObj.animalTracks -= (level * 100);
        controller.baseLevelUp(ui_values.currentAnimal.toLowerCase());
    }
    soundMan.up1.play();
}

function upgrade_animal() {
    var level = controller.animals[ui_values.partyIndex].level;
    if (dataObj.animalTracks - (level * 100) < 0) {
        return;
    } else {
        dataObj.animalTracks -= (level * 100);
        controller.levelUpAnimal(ui_values.partyIndex);
    }
    soundMan.up1.play();
}

/* upgrade_baseAnimalMax() - For increasing the level of animals will all tracks. 
 * Params: None
 * Returns: None. 
*/
function upgrade_baseAnimalMax() {
    var level = controller.getAnimalBaseLevel((ui_values.currentAnimal).toLowerCase());
    while (dataObj.animalTracks - (level * 100) > 0) {
        dataObj.animalTracks -= (level * 100);
        controller.baseLevelUp(ui_values.currentAnimal.toLowerCase());
        controller.getAnimalBaseLevel((ui_values.currentAnimal).toLowerCase());
        level = controller.getAnimalBaseLevel((ui_values.currentAnimal).toLowerCase());
        soundMan.up1.play();
    }
}

function upgrade_animalMax() {
    var level = controller.animals[ui_values.partyIndex].level;
    while (dataObj.animalTracks - (level * 100) > 0) {
        dataObj.animalTracks -= (level * 100);
        controller.levelUpAnimal(ui_values.partyIndex);
        level = controller.animals[ui_values.partyIndex].level;
        soundMan.up1.play();
    }
}

//Get the animal number from the animal type
function aniToNum(animal) {
	for(i=0;i<4;i++){
		if (animal == ui_values.animalAry[i].toLowerCase()) return i;
	}
	return "Not a valid animal";
}

//Small utility function that converts a number to a string and returns the length. 
//Good for text alignment, but not perfect. 
function numberLen(num) {
    return num.toString().length;
}

function numberConversion(num) {
    var suffixes = ['', 'k', 'M', 'B', 'T']
    var conNum = num.toString();
    var len = conNum.length;
    var i = Math.floor(len/3);
    var j = len%3;
    //console.log();
    if (j === 0) {
        return conNum.slice(0, 3) + " " + suffixes[i-1];
    } else if (j === 1 && i > 0) {
        return conNum.slice(0, 1) + "." + conNum.slice(1, 3) + " " +  suffixes[i];
    } else if (j === 2 && i > 0) {
        return conNum.slice(0, 2) + "." + conNum.slice(2, 3) + " " + suffixes[i];
    }
    else {
        return conNum.slice(0, j) + " " + suffixes[i];
    }
}