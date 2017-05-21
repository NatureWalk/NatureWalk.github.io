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
	
	//Display Achievement List in menu screen
	var achievList = new Button();
    achievList.setSrc("image_resources/ClearSquare.png");
	achievList.setSpriteAttributes(0,0,700,700);
	achievList.fontSize = "10px";
	achievList.draw = function () {
		ctx.fillText("Milestones:", 250, 70);
		for(var i = 0; i < achievText.length; i++){
			var X = 70;
			var Y = 100+60*i;
			//ctx.font = "10px Arial";
			ctx.fillText(achievements[i] + ":  " + rewardText[i], X , Y);
			ctx.fillText(achievText[i], X , Y+20 );
			if(completed[i] == 1){
				ctx.beginPath();
				ctx.moveTo(X,Y+15);
				ctx.lineTo(X+400,Y+15);
				ctx.moveTo(X,Y+35);
				ctx.lineTo(X+400,Y+35);
				ctx.stroke();
			}
		}
	}

	gameMenu.buttonArray.push(achievList);

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