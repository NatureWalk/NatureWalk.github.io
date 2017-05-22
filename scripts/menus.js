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
    	screenMan.pop()
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
    var mVolLabel = new Button();
    mVolLabel.setSpriteAttributes(110,110,0,0);
    mVolLabel.hasTextValue = true;
    mVolLabel.setText(["Master Volume"],0,0)
    subSettings.pushButton(mVolLabel);
    
    var mVolText = new Button();
    mVolText.setSpriteAttributes(310,110,0,0);
    mVolText.hasTextValue = true;
    mVolText.setText([Howler.volume()*10], 0,0);

    mVolText.update = function() {
    	mVolText.setText([Math.floor(Howler.volume()*10)],0,0);
    }

    subSettings.buttonArray.push(mVolText);

    var mVolDown = new Button(function() {Howler.volume(Howler.volume()-.1)});
    mVolDown.setSrc("image_resources/ArrowsLeft.png","image_resources/ArrowsLeftPressed.png");
    mVolDown.setSpriteAttributes(280,110,25,25);
    subSettings.buttonArray.push(mVolDown);

    var mVolUp = new Button(function() {Howler.volume(Howler.volume()+.1)});
    mVolUp.setSrc("image_resources/ArrowsRight.png","image_resources/ArrowsRightPressed.png");
    mVolUp.setSpriteAttributes(340,110,25,25);
    subSettings.buttonArray.push(mVolUp);
    
    //Music Volume
    var musVolLabel = new Button();
    musVolLabel.setSpriteAttributes(110,140,0,0);
    musVolLabel.hasTextValue = true;
    musVolLabel.setText(["Music Volume"],0,0)
    subSettings.pushButton(musVolLabel);
    
    var musVolText = new Button();
    musVolText.setSpriteAttributes(310,140,0,0);
    musVolText.hasTextValue = true;
    musVolText.setText([soundMan.music.volume()*10], 0,0);

    musVolText.update = function() {
    	musVolText.setText([Math.floor(soundMan.music.volume()*10)],0,0);
    }

    subSettings.buttonArray.push(musVolText);

    var musVolDown = new Button(function() {soundMan.music.volume(soundMan.music.volume()-.1)});
    musVolDown.setSrc("image_resources/ArrowsLeft.png","image_resources/ArrowsLeftPressed.png");
    musVolDown.setSpriteAttributes(280,140,25,25);
    subSettings.buttonArray.push(musVolDown);

    var musVolUp = new Button(function() {soundMan.music.volume(soundMan.music.volume()+.1)});
    musVolUp.setSrc("image_resources/ArrowsRight.png","image_resources/ArrowsRightPressed.png");
    musVolUp.setSpriteAttributes(340,140,25,25);
    subSettings.buttonArray.push(musVolUp);

    //SFX Volume FUCK

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
		screenMan.pop()
    	screenMan.push(subHistory);
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
    subHistory.buttonArray.push(historyPane);
	
	

        
    for (i = 0; i < 5; i++) {
        var historyEntry = new Button();
        historyEntry.setSrc("image_resources/ClearSquare.png");
        historyEntry.setSpriteAttributes(567, (45*i)+55    , 452, 54, "eventLog");
        subHistory.buttonArray.push(historyEntry);

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