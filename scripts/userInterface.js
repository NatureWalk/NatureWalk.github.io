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
                  ("image_resources/frogpng_1024_noAlpha.png"),
                  ("image_resources/Icon_Rabbit.jpeg"),
                  ("images/nwalk1.jpg")],
    
    //For gif animations, though I didn't figure out how to make them do gif things. 
    animalGifAry: [("image_resources/Icon_Bird.png"),
                  ("image_resources/Icon_Deer.png"),
                  ("image_resources/FrogSpriteSheet200_1400x1400.png"),
                  ("image_resources/AnimBunny.gif")],

    currentAnimal: "Bird",
    attributes: ["armor", "speed", "capacity", "lifespan"]
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
    
    ////////////////////////////////////////////////////////////
    //ATTRIBUTES PANE
    ////////////////////////////////////////////////////////////
    attributesPane = new Sprite();
    attributesPane.setSrc("image_resources/Worn-Paper-Texture.png");
    attributesPane.setSpriteAttributes(76, 190, 400, 350, "attributesPane");
    panes.push(attributesPane);
    ////////////////////////////////////////////////////////////
    
    ////////////////////////////////////////////////////////////
    //UNLOCKABLES (change to buttons when we have the functionality)
    ////////////////////////////////////////////////////////////
    for (i = 0; i < 2; i++) {
        for (j = 0; j < 6; j++) {
            subAttPane = new Sprite();
            //Sets the source of each pane to be the same as the animal icon. 
            subAttPane.setSrc(ui_values.animalSrcAry[1]);
            subAttPane.setSpriteAttributes((101 + 60 * j), (435 + 50 * i), 40, 40, "unlockable");
            panes.push(subAttPane);
        }
    }
    ////////////////////////////////////////////////////////////
    
    ////////////////////////////////////////////////////////////
    //MAP PANE
    ////////////////////////////////////////////////////////////
    var mapPane = new Sprite();
    mapPane.setSrc("image_resources/Worn-Paper-Texture.png");
    mapPane.setSpriteAttributes(527, 30, 452, 514, "mapPane");
    panes.push(mapPane);
    ////////////////////////////////////////////////////////////
    
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
    
    ////////////////////////////////////////////////////////////
    //DEV ATTRIBUTES
    ////////////////////////////////////////////////////////////
    var devAttributes = new Button(dataTracker.openDevWindow);
    devAttributes.setSrc("image_resources/ClearSquare.png", "image_resources/ClearSquare.png");
    devAttributes.setSpriteAttributes(20, 530, 30, 30, "devWindow");
    game.buttonArray.push(devAttributes);
    ////////////////////////////////////////////////////////////
    
    ////////////////////////////////////////////////////////////
    //STEP PANE (but it's a button)
    ////////////////////////////////////////////////////////////
    var stepPane = new Button();
    stepPane.setSrc("image_resources/Worn-Paper-Texture.png");
    stepPane.setSpriteAttributes(76, 30, 400, 50, "stepPane");
    stepPane.tooltip = true;
    
    //Arbitrary step setup if the player does not have any steps yet. 
    if (stepCount === undefined) { stepCount = 10; }
    
    stepPane.setText(stepCount + " Steps", (stepPane.width / 2) - 5 * numberLen(stepCount), stepPane.height / 4);
    
    //Changeing the button's update function to get the step count every frame. 
    stepPane.update = function() {
        this.text = stepCount + " Steps";
    };
    game.buttonArray.push(stepPane);
    ////////////////////////////////////////////////////////////
    
    ////////////////////////////////////////////////////////////
    //ANIMAL ICONS
    ////////////////////////////////////////////////////////////
    var animalIcon, i;
    for (i = 0; i < 4; i++) {
        animalIcon = new Button(change_image, [i]);
        
        animalIcon.setSrc(ui_values.animalSrcAry[i], ui_values.animalSrcAry[4]);
        
        animalIcon.setSpriteAttributes((96 +(100*i)), 110, 60, 60, "animal_icon" + i);
        
        animalIcon.setText(ui_values.animalAry[i], (5-ui_values.animalAry[i].length)*5, -24)
        game.buttonArray.push(animalIcon);
    }
    ////////////////////////////////////////////////////////////
    
    var attButton, attValue, animalImage;
    for (i = 0; i < 4; i++) {
        ////////////////////////////////////////////////////////////
        //ATTVALUE
        ////////////////////////////////////////////////////////////
        /* The increment and decrement buttons are each children of the 
        attValue they are incrementing/decrementing. 
        This gives them access to the number they have to increment without needing a new update function. 
        */
        attValue = new Button(function () {});
        attValue.setSrc("image_resources/Worn-Paper-Texture.png");
        
        attValue.setSpriteAttributes(166, (220 + 50 * i), 80, 40, "attribute_value" + i);
        
        attValue.tooltip = true;
        
        //Using an animal from ui_values, therefore must use toLowerCase().
        var attSelect = animal_data[ui_values.currentAnimal.toLowerCase() + "_" + ui_values.attributes[i]];
        charNum = attSelect.toString().length;
        attValue.setText(attSelect, (attValue.width / 2) - (5 * charNum), 0);
        game.buttonArray.push(attValue);
        ////////////////////////////////////////////////////////////
        
        ////////////////////////////////////////////////////////////
        //UP ARROW
        ////////////////////////////////////////////////////////////
        attButton = new Button(change_attribute, [i, "pos", attValue]);
        attButton.setSrc("image_resources/up25x25.png");
        
        attButton.setSpriteAttributes(96, (240 + 50 * i), 25, 25, "attribute" + i);
        attButton.tooltip = true;
        
        //Visable stats are connected to the up arrow and not the down. 
        var att;
        switch (i) {
        case 0:
            att = "VITA"; //Changed armor to (VITA-lity)
            break;
        case 1:
            att = "SPD";
            break;
        case 2:
            att = "CAP";
            break;
        case 3:
            att = "LIFE";
            break;
        }
        attButton.setText(att, 7, -25);
        attValue.addChild(attButton);
        ////////////////////////////////////////////////////////////
        
        ////////////////////////////////////////////////////////////
        //DOWN ARROW
        attButton = new Button(change_attribute, [i, "neg", attValue]);
        attButton.setSrc("image_resources/down25x25.png");
        
        attButton.setSpriteAttributes(126, (240 + 50 * i), 25, 25, "attribute" + i);
        attValue.addChild(attButton);
        ////////////////////////////////////////////////////////////
    }
    
    ////////////////////////////////////////////////////////////
    //ANIMAL IMAGE
    ////////////////////////////////////////////////////////////
    animalImage = new Button(spawn_animal);
    animalImage.setSrc(ui_values.animalGifAry[0], "images/nwalk1.jpg");
    console.log(animalImage.anim);
    animalImage.setSpriteAttributes(261, 215, 200, 200, "animal_image");
    game.buttonArray.push(animalImage);
    ////////////////////////////////////////////////////////////

    //Mute Button
    muteButton = new Button(mute_music);
    muteButton.setSrc("images/mute.jpg")
    muteButton.setSpriteAttributes(40,40,30,30, "mute_music");
    game.buttonArray.push(muteButton);
}

/* change_attribute() - For changing attributes up or down. 
 * Params:
 *    index - index of the attribute being changed.
 *    sign  - "pos" or "neg" determine if the attribute goes up or down.
 *    attValue - A reference the the attribute that is being modified. 
               - Could possibly change it to just passing in the parent's 'text' value. 
 * Returns - None. 
*/
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
        stepCount++;
    } else {
        if (stepCount <= 0) {
            return;
        }
        animal_data[attributeString]++;
        attValue.text = animal_data[attributeString];
        stepCount--;   
    }
    attValue.text = animal_data[attributeString];

    click.play()
}

/* change_image() - For changing the spawn button image and the unlockables connected to it. . 
 * Params:
 *    animal_index - index of the animal being selected.
 * Returns - None. 
*/
function change_image(animal_index) {
    var ani_imgRef;
    //Making the source gifs for the spawn button image. 
    aniSrc = ui_values.animalGifAry;
    game.buttonArray.forEach(function (elem) {
        if (elem.name === "animal_image") {
            console.log(aniSrc[animal_index]);
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
}

/* spawn_animal() - For spawning animals on the map. 
 * Params: None
 * Returns: None. 
 * Notes: Spawn location determination should be done here, unless there's another function that can specify it. 
*/
function spawn_animal() {
    var animal, mapPane;
    //Find the map pane from the panes array. 
    panes.forEach(function (elem) {
        if (elem.name === "mapPane") {
            mapPane = elem;
        }
    });
    
    //Spawn the proper animal. 
    switch (ui_values.currentAnimal) {
    case "Bird":
        animal = new bird(600, 300);
        setupAnimal(animal);
        game.push(animal);
        break;
    case "Deer":
        animal = new deer(600, 300);
        setupAnimal(animal);
        game.push(animal);
        break;
    case "Frog":
        console.log("frog");
        animal = new frog(600, 300);
        setupAnimal(animal);
        game.push(animal);
        break;
    case "Bunny":
        animal = new bunny(600, 300);
        setupAnimal(animal);
        game.push(animal);
        break;
    }
    click.play()
}

//Small utility function that converts a number to a string and returns the length. 
//Good for text alignment, but not perfect. 
function numberLen(num) {
    return num.toString().length;
}