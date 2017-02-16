var ui_values = {
    animalAry: ["Bird", "Deer", "Frog", "Bunny"],
    animalSrcAry: [("image_resources/Icon_Bird.png"),
                  ("image_resources/Icon_Deer.png"),
                  ("image_resources/frogpng_1024_noAlpha.png"),
                  ("image_resources/Icon_Rabbit.jpeg"),
                  ("images/nwalk1.jpg")],
    currentAnimal: "Bird",
    attributes: ["armor", "speed", "capacity", "lifespan"]
};

function backgroundSetup() {
    "use strict";
    var panes = [], i, j, attributesPane, subAttPane;
    
    //Pane that holds all of the attribute data.
    attributesPane = new Sprite();
    attributesPane.setSrc("http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=33784063");
    attributesPane.setSpriteAttributes(76, 200, 400, 350, "attributesPane");
    panes.push(attributesPane);
    
    //Unlockables
    for (i = 0; i < 2; i++) {
        for (j = 0; j < 6; j++) {
            subAttPane = new Sprite();
            subAttPane.setSrc(ui_values.animalSrcAry[1]);
            subAttPane.setSpriteAttributes((101 + 60 * j), (435 + 50 * i), 40, 40, "unlockable");
            panes.push(subAttPane);
        }
    }
    
    //Map Pane
    var mapPane = new Sprite();
    mapPane.setSrc("http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=33784063");
    mapPane.setSpriteAttributes(542, 30, 452, 514, "mapPane");
    panes.push(mapPane);
    
    
    return panes;
}


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
    var devAttributes = new Button(dataTracker.openDevWindow);
    devAttributes.setSrc("image_resources/Icon_Rabbit.jpeg", "http://pngimg.com/upload/star_PNG1595.png");
    devAttributes.setSpriteAttributes(20, 530, 30, 30, "devWindow");
    game.buttonArray.push(devAttributes);
    ////////////////////////////////////////////////////////////
    
    ////////////////////////////////////////////////////////////
    //STEP PANE
    var stepPane = new Button();
    stepPane.setSrc("http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=33784063");
    stepPane.setSpriteAttributes(76, 30, 400, 50, "stepPane");
    stepPane.tooltip = true;
    
    if (stepCount === undefined) { stepCount = 10; }
    
    var charNum = (stepCount + " Steps").toString().length;
    stepPane.setText(stepCount + " Steps", (stepPane.width / 2) - 5 * charNum, stepPane.height / 4);
    stepPane.update = function() {
        this.text = stepCount + " Steps";
    };
    game.buttonArray.push(stepPane);
    ////////////////////////////////////////////////////////////
    
    ////////////////////////////////////////////////////////////
    //ANIMAL ICONS
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
        attValue = new Button(function () {});
        attValue.setSrc("http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=33784063");
        
        attValue.setSpriteAttributes(166, (220 + 50 * i), 80, 40, "attribute_value" + i);
        
        attValue.tooltip = true;
        
        var attSelect = animal_data[ui_values.currentAnimal.toLowerCase() + "_" + ui_values.attributes[i]];
        charNum = attSelect.toString().length;
        attValue.setText(attSelect, (attValue.width / 2) - (5 * charNum), 0);
        game.buttonArray.push(attValue);
        ////////////////////////////////////////////////////////////
        
        ////////////////////////////////////////////////////////////
        //UP ARROW
        attButton = new Button(change_attribute, [i, "pos", attValue]);
        attButton.setSrc("image_resources/arrowUp.png");
        
        attButton.setSpriteAttributes(96, (240 + 50 * i), 25, 25, "attribute" + i);
        attButton.tooltip = true;
        
        var att;
        switch (i) {
        case 0:
            att = "VITA";
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
        attButton.setSrc("image_resources/arrowDown.png");
        
        attButton.setSpriteAttributes(126, (240 + 50 * i), 25, 25, "attribute" + i);
        attValue.addChild(attButton);
        ////////////////////////////////////////////////////////////
    }
    
    ////////////////////////////////////////////////////////////
    //ANIMAL IMAGE
    animalImage = new Button(spawn_animal);
    animalImage.setSrc(ui_values.animalSrcAry[0]);
    animalImage.setSpriteAttributes(266, 220, 190, 190, "animal_image");
    game.buttonArray.push(animalImage);
    ////////////////////////////////////////////////////////////
}

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
}

function change_image(animal_index) {
    var ani_imgRef;
    aniSrc = ui_values.animalSrcAry;
    game.buttonArray.forEach(function (elem) {
        if (elem.name === "animal_image") {
            elem.setSrc(aniSrc[animal_index], aniSrc[4]);
        }
    });
    panes.forEach(function (elem) {
        if (elem.name === "unlockable") {
            elem.setSrc(aniSrc[animal_index], aniSrc[4]);
        }
    });
    //ani_imgRef.setSrc(aniSrc[animal_index], aniSrc[4]);
    ui_values.currentAnimal = ui_values.animalAry[animal_index];
}

function spawn_animal() {
    var animal, mapPane;
    panes.forEach(function (elem) {
        if (elem.name === "mapPane") {
            mapPane = elem;
        }
    });
    switch (ui_values.currentAnimal) {
    case "Bird":
        animal = new bird(600, 300);
        setupAnimal(animal);
        game.push(animal);
        break;
    }
}