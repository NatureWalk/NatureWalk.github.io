
function addPopup(popup) {
	interface.push(popup);
	interface.pushButton(popup);
}

function removePopup(popup) {
	interface.remove(popup);
	interface.removeButton(popup);
}

function generatePopup(b) {
	var button = b;
	var buttonUpdate = button.update;
	button.update = function () {
		buttonUpdate();
		removePopup(button);
	}
	return button;
}

function popupController() {
	//Controls when popups appear
	this.update = function() {
		console.log("controller updating")
		p_maxUpgrade();
	}

	this..draw = function() {}
}

/* Popup Buttons */

var fullUpgrade = new Button(function() {
    if (ui_values.selected == "base") {
        upgrade_baseAnimalMax();
        //upgrade_baseAnimal();
    } else {
        upgrade_animalMax();
        //upgrade_animal();
    }
});

fullUpgrade.setSrc("image_resources/buttonOut.png", "image_resources/buttonIn.png");
fullUpgrade.setSpriteAttributes(65,360,120,40, "fullUpgrade");
fullUpgrade.hasTextValue = true;
fullUpgrade.fontSize = '20px';
charnum = "MAX".length;
fullUpgrade.setText(["MAX"], (fullUpgrade.width / 2) - (6.3 * charnum), 5);

fullUpgrade = generatePopup(fullUpgrade);

function p_maxUpgrade() {
	var level = controller.animals[ui_values.partyIndex].level
	if (dataObj.animalTracks - ((level) * 100) > 0) {
		addPopup(fullUpgrade);
	} else {
		removePopup(fullUpgrade);
	}
}