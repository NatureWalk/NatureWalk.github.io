var menuBackground = new Sprite();
menuBackground.setSrc("image_resources/AttPane.png");
menuBackground.width = 475;
menuBackground.height = 525;
menuBackground.setSpriteAttributes(30,26,475,525);

function menuSetup() {
	gameMenu.push(menuBackground);
	/////////////////////////////////////////////////
    //CLOSEMENU BUTTON
    /////////////////////////////////////////////////
	function closeMenu() {
		screenMan.pop();
		screenMan.pop();
	}

	var menuButton = new Button(closeMenu);
    menuButton.setSrc("image_resources/menu.png","image_resources/ClearSquare.png");
    menuButton.setSpriteAttributes(40,80,30,30, "menuButton_close");
    gameMenu.buttonArray.push(menuButton);

	/////////////////////////////////////////////////
    //SETTINGS BUTTON
    /////////////////////////////////////////////////
    function openSettings() {
    	screenMan.push(subSettings);
    }

    var settingsButton = new Button(openSettings);
    settingsButton.setSrc("image_resources/Button.png","image_resources/ButtonPressed.png")
    settingsButton.setSpriteAttributes(100,60,120,40);
    
    var charnum = "Settings".length
    settingsButton.hasTextValue = true;
    settingsButton.setText(["Settings"], (settingsButton.width / 2) - (6.3 * charnum), 5);
    //settingsButton.setTooltip("This upgrades the "+ui_values.selected+" animal to the next level.");
    settingsButton.update = function () {
            if (this.isPressed) {
                settingsButton.setText(["Settings"], (settingsButton.width / 2) - (4 * charnum) - 5, 12); 
            } else {
                settingsButton.setText(["Settings"], (settingsButton.width / 2) - (4 * charnum), 7); 
            }
    }

    gameMenu.buttonArray.push(settingsButton);

    //////////////////////////////////////////////////////////////////////////////////////////
    // Settings Menu Content
    //////////////////////////////////////////////////////////////////////////////////////////

    //Master Volume

    //Music Volume

    //SFX Volume

    //Click sounds

    //Event sounds

    //Save features (download etc)?

    //Fitbit legal stuff

    //Privacy Policy

}