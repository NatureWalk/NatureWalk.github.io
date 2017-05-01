
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

//For buttons you don't want to halt gameplay
function pushInterface(popup) {
	interface.push(popup);
	interface.pushButton(popup);
}

function removeInterface(popup) {
	interface.remove(popup);
	interface.removeButton(popup);
}


//For buttons that will halt gameplay
function pushPopup(popup) {
	popups.push(popup);
	popups.pushButton(popup);
}

function removePopup(popup) {
	popups.remove(popup);
	popups.removeButton(popup);
}


function startTutorial() {
	screenMan.push(popups);
}

/////////////////
function popupController() {
	this.popups = [];
};

//Contains controls when popups appear
popupController.prototype.update = function() {
	//console.log("controller updating")
}

popupController.prototype.draw = function() {}

popupController.prototype.contains = function(popup) {
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

fullUpgrade.setSrc("image_resources/Button.png", "image_resources/ButtonPressed.png");
fullUpgrade.setSpriteAttributes(65,360,120,40, "fullUpgrade");
fullUpgrade.hasTextValue = true;
fullUpgrade.fontSize = '20px';
charnum = "MAX".length;
fullUpgrade.setText(["MAX"], (fullUpgrade.width / 2) - (6.3 * charnum), 5);

function p_maxUpgrade() {
	console.log("p_maxUpgrade")
	var threshold;
	if (ui_values.selected == "base") {
		var level = controller.getAnimalBaseLevel((ui_values.currentAnimal).toLowerCase());
		threshold = 1.75*1000;
	} else{
		var level = controller.animals[ui_values.partyIndex].level;
		threshold = 1.75*100;
	}	
	if (dataObj.animalTracks - ((level * threshold) + (level+1)*threshold) > 0) {
		if (interface.contains(fullUpgrade)) return;
		pushInterface(fullUpgrade);
	} else {
		console.log("removing interface")
		removeInterface(fullUpgrade);
	}
}