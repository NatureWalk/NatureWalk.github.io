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
	
	/////////////////////////////////////////////////////////////////////////////////////////
	// Event History
	/////////////////////////////////////////////////////////////////////////////////////////
	
	// History Button
	function openHistory() {
    	screenMan.push(subSettings);
    }

    var historyButton = new Button(openHistory);
    historyButton.setSrc("image_resources/Button.png","image_resources/ButtonPressed.png")
    historyButton.setSpriteAttributes(250,60,120,40);
    
    var charnum = "History".length
    historyButton.hasTextValue = true;
    historyButton.setText(["History"], (historyButton.width / 2) - (6.3 * charnum), 5);
    //settingsButton.setTooltip("This upgrades the "+ui_values.selected+" animal to the next level.");
    historyButton.update = function () {
            if (this.isPressed) {
                historyButton.setText(["History"], (historyButton.width / 2) - (4 * charnum) - 5, 12); 
            } else {
                historyButton.setText(["History"], (historyButton.width / 2) - (4 * charnum), 7); 
            }
    }

    gameMenu.buttonArray.push(historyButton);
	
	
	// History Pane 
	// Uses same code as event log
	var historyPane = new Button();
    historyPane.setSrc("image_resources/EventLog.png");
    historyPane.setSpriteAttributes(527, 30, 452, 204, "eventLog");
    interface.buttonArray.push(historyPane);
	
	

        
    for (i = 0; i < 5; i++) {
        var historyEntry = new Button();
        historyEntry.setSrc("image_resources/ClearSquare.png");
        historyEntry.setSpriteAttributes(567, (45*i)+55    , 452, 54, "eventLog");
        interface.buttonArray.push(historyEntry);

        historyEntry.hasTextValue = true;
        historyEntry.fontSize = '16px';

        (function(i) {
            var testRef = historyAry[i];
            //console.log(testRef);
            historyEntry.update = function() {
                if (historyAry[i]) {
                    this.updateText([historyAry[i]]);
                } else {this.updateText([""]);}
            }
        })(i);
        
        (function(i) {
            historyEntry.draw = function() {
                if ((this.hovered && this.text !== undefined) || this.hasTextValue){
                    if (this.text === undefined) {
            //console.log(this.name);
                    } else {
                        drawWrappedText(this.text, this.x + this.textOffsetX, this.y + this.textOffsetY, this.fontSize, 395, 16);
        }
    }
            }
        })(i);
    }

}