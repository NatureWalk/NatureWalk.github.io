var ui_values = {
    animalAry: ["Bird", "Deer", "Frog", "Bunny"],
    animalSrcAry: [("image_resources/Icon_Bird.png"),
                  ("image_resources/Icon_Deer.png"),
                  ("image_resources/frogpng_1024_noAlpha.png"),
                  ("image_resources/Icon_Rabbit.jpeg"),
                  ("images/nwalk1.jpg")],
    currentAnimal: "bird",
    attributes: ["armor", "speed", "capacity", "lifespan"]
};

function backgroundSetup() {
    var panes = [];
    
    //Pane that holds all of the attribute data.
    var attributesPane = new Sprite();
    attributesPane.setSrc("http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=33784063");
    attributesPane.setSpriteAttributes(76, 200, 400, 350, "attributesPane");
    panes.push(attributesPane);
    

    //Animal Image
    var animalImage = new Sprite();
    animalImage.setSrc(ui_values.animalSrcAry[0]);
    animalImage.setSpriteAttributes(266, 220, 190, 190, "animal_image");
    panes.push(animalImage);
    
    //Unlockables
    for(var i = 0; i < 2; i++) {
        for(var j = 0; j < 6; j++) {
            subAttPane = new Sprite();
            subAttPane.setSrc(ui_values.animalSrcAry[1]);
            subAttPane.setSpriteAttributes((101 + 60*j), (435 + 50*i), 40, 40, "unlockable");
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
    
    var devAttributes = new Button(dataTracker.openDevWindow);
    devAttributes.setSrc("image_resources/Icon_Rabbit.jpeg", "http://pngimg.com/upload/star_PNG1595.png");
    devAttributes.setSpriteAttributes(20, 530, 30, 30, "devWindow");
    game.buttonArray.push(devAttributes); 
    
    //Pane that holds the steps.
    var stepPane = new Button();
    stepPane.setSrc("http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=33784063");
    stepPane.setSpriteAttributes(76, 30, 400, 50, "stepPane");
    stepPane.textSrc = stepCount;
    game.buttonArray.push(stepPane);
    //Animal selection buttons. 
    //CHANGE TO BUTTONS
    var animalIcon;
    for (var i = 0; i < 4; i++) {
        animalIcon = new Button(change_image, [i]);
        
        animalIcon.setSrc(ui_values.animalSrcAry[i], ui_values.animalSrcAry[4]);
        
        animalIcon.setSpriteAttributes((96 +(100*i)), 110, 60, 60, "animal_icon" + i);
        
        animalIcon.setText(ui_values.animalAry[i], (5-ui_values.animalAry[i].length)*5, -24)
        game.buttonArray.push(animalIcon);
    }
    
    
    
    var attButton;
    //Attribute Buttons
    for (var i = 0; i < 4; i++) {
        //START attValue
        //Value to be hooked up with the attButtons.
        var attValue = new Button(function(){});
        attValue.setSrc("http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=33784063");
        
        attValue.setSpriteAttributes(166, (220 + 50*i), 80, 40, "attribute_value" + i);
        
        attValue.tooltip = true;
        attValue.setText = ("0", (this.width/2), 0)
        
        
        //END attValue
        attButton = new Button(changeAttribute, [i, "pos", attValue]);
        attButton.setSrc("image_resources/arrowUp.png");
        
        attButton.setSpriteAttributes(96, (240 + 50*i), 25, 25, "attribute" + i);
        attButton.tooltip = true;
        var att; 
        switch(i) {
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
        attButton.children.push(attValue);
        game.buttonArray.push(attButton);
        game.buttonArray.push(attButton.children[0]);
    }
    
    for (var i = 0; i < 4; i++) {
        attButton = new Button(changeAttribute, [i, "neg", attValue]);
        attButton.setSrc("image_resources/arrowDown.png");
        
        attButton.setSpriteAttributes(126, (240 + 50*i), 25, 25, "attribute" + i);
        attButton.tooltip = true;
        game.buttonArray.push(attButton);
    }
    
    //DO ADD CHILD FOR GOD'S SAKE PLEASE. STOP WITH THE TEXT SOURCE.
    //var attValue;
    //Attribute Values
    /*
    for (var i = 0; i < 4; i++) {
        attValue = new Button(function(){});
        attValue.setSrc("http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=33784063");
        
        attValue.setSpriteAttributes(166, (220 + 50*i), 80, 40, "attribute_value" + i);
        
        attValue.tooltip = true;
        
        var txt = ui_values["currentAnimal"] + "_" + ui_values["attributes"][i];
        var charNum = animal_data[txt].toString().length;
        attValue.setText(animal_data[txt], 40 - (5*charNum), 0);
        
        var attribute = ui_values["attributes"][i]
        attValue.textSrc = [animal_data, setAttTextSrc(attribute)];
        attValue.update = function() {
            if (this.textSrc) {
                var source = this.setText(this.textSrc[0][this.textSrc[1]]);
                console.log(source);
                //var charNum = source.toString().length;
                //this.setText(source, (this.width/2) - (5*charNum), 0);
            }
        }
        game.buttonArray.push(attValue);
        console.log(attValue.textSrc);
    }
*/
}

function changeAttribute(index, sign, attValue) {
    var attributeString = ui_values.currentAnimal + "_"
    switch(index) {
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
        animal_data[attributeString]--;
    } else {
        animal_data[attributeString]++;
    }
    attValue.text = animal_data[attributeString];
    //attValue.setText = (animal_data[attributeString], (this.width/2), 0);
    console.log(attValue.tooltip);
}
/*
function findAttVal(button) {
    
    var index = 1;
    var att = "attribute_value";
    while (index < ui_values["attributes"].length) {
        if (button.name === att+index) {
            return button.name === att+index;
        }
        index++;
    } 
}
*/
function setAttTextSrc(attribute) {
    return ui_values["currentAnimal"] + "_" + attribute;
}

function change_image(animal_index) {
    panes[1].setSrc(ui_values.animalSrcAry[animal_index]);
    ui_values.currentAnimal = ui_values.animalAry[animal_index];
}