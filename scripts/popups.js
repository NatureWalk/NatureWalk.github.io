//Creates a popup with default background.
function addPopup(text,x,y,name="popup") {
	var button = new Button(function() {
		removePopup(this);
	});
	button.setSrc("image_resources/Tooltip.png");
	button.setSpriteAttributes(x,y,208,150, name)
	button.hasTextValue = true;
	button.fontSize = '20px';
	charnum = text.length;
	button.setText([text], (button.width / 2) - (6.3 * charnum), 5);
	pushPopup(button);
}

//Pushes and removes the popup from the engine
function pushPopup(popup) {
	interface.push(popup);
	interface.pushButton(popup);
}

function removePopup(popup) {
	interface.remove(popup);
	interface.removeButton(popup);
}

/////////////////
var popupController = function() {
	this.popups = [];
};

//Contains controls when popups appear
popupController.update = function() {
	//console.log("controller updating")
	p_maxUpgrade();
}

popupController.draw = function() {}

popupController.contains = function(popup) {
	for (var i in this.popups) {
        if (this.popups[i] == popup) {
            return true;
        }
    }
}
/////////////////

//Button that appears when player has enough tracks to do multiple upgrades
var fullUpgrade = new Button(function() {
    console.log("pushed");
    if (ui_values.selected == "base") {
        upgrade_baseAnimalMax();
        //upgrade_baseAnimal();
    } else {
        upgrade_animalMax();
        //upgrade_animal();
    }
    removePopup(this);
});

fullUpgrade.setSrc("image_resources/buttonOut.png", "image_resources/buttonIn.png");
fullUpgrade.setSpriteAttributes(65,360,120,40, "fullUpgrade");
fullUpgrade.hasTextValue = true;
fullUpgrade.fontSize = '20px';
charnum = "MAX".length;
fullUpgrade.setText(["MAX"], (fullUpgrade.width / 2) - (6.3 * charnum), 5);

function p_maxUpgrade() {
	if (ui_values.selected == "base") {
		var level = controller.getAnimalBaseLevel((ui_values.currentAnimal).toLowerCase())
	} else{
		var level = controller.animals[ui_values.partyIndex].level
	}	
	if (interface.contains(fullUpgrade)) return;
	if (dataObj.animalTracks - ((level * 100) + (level+1)*100) > 0) {
		pushPopup(fullUpgrade);
	} else {
		removePopup(fullUpgrade);
	}
}