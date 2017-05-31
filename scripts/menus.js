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
        gameState.menuPause = false;
	}

	var menuButton = new Button(closeMenu);
    menuButton.setSrc("image_resources/menu.png","image_resources/ClearSquare.png");
    menuButton.setSpriteAttributes(30,70,50,50, "menuButton_close");
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
    settingsButton.setSpriteAttributes(100,60,120,40,"settings");
    
    var charnum = "Settings".length
    settingsButton.hasTextValue = true;
    settingsButton.setText(["Settings"], (settingsButton.width / 2) - (5 * charnum), 3);
    //settingsButton.setTooltip("This upgrades the "+ui_values.selected+" animal to the next level.");
    settingsButton.update = function () {
            //console.log(gameMenu.buttonArray[1].text);
            if (this.isPressed) {
                settingsButton.setText(["Settings"], (settingsButton.width / 2) - (5 * charnum) - 5, 6); 
            } else {

                settingsButton.setText(["Settings"], (settingsButton.width / 2) - (5 * charnum), 3); 
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
    //Clear Data
    
    
        
    var clearData = new Button(function () {
        //closeMenu();
        /*
        var tooltip = new Button();
        var text = "Warning: Confirming this action will completely erase all of game data, including animal levels, and your record of total steps travelled (This has no effect on your actual Fitbit statistics)." 
        tooltip.setSrc("image_resources/Tooltip.png", "image_resources/Tooltip.png");
        tooltip.setSpriteAttributes(300, 225, 400, 200, "ToolTip");
        tooltip.hasTextValue = true;
        tooltip.fontSize = '20px';
        charnum = text.length;

        tooltip.setText([text], 5, 5);
        //console.log(offlinePopup.text);
        tooltip.draw = function() {
            ctx.globalAlpha = 0.3;
            ctx.fillRect(0, 0, canvas.width, canvas.height, 'black');
            ctx.globalAlpha = 1.0;

            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            drawWrappedText(this.text, this.x + this.textOffsetX, this.y + this.textOffsetY, this.fontSize, 395, 25);
        }
        var confirm = new Button();
        confirm.setSrc("image_resources/Button.png", "image_resources/ButtonPressed.png");
        confirm.setSpriteAttributes(310, 325, 100, 50, "Confirm");
        
        //Send reference to all elements on the confirmation note.
        var cancel = new Button(function () {
            //console.log("PRessed");
            //subSettings.buttonArray.pop();
            //subSettings.buttonArray.pop();
            screenMan.pop();
            //gameMenu.buttonArray[1]                              .setText(["Settings"], (settingsButton.width / 2) - (5 * charnum), 3); 
        });
        cancel.setSrc("image_resources/Button.png", "image_resources/ButtonPressed.png");
        cancel.setSpriteAttributes(460, 325, 100, 50, "ClearData");
        
        clearDataScreen.buttonArray.push(tooltip);
        clearDataScreen.buttonArray.push(confirm);
        clearDataScreen.buttonArray.push(cancel);
        
        console.log(clearDataScreen.buttonArray);
        
        screenMan.push(clearDataScreen);
        */
        if (subSettings.objects[subSettings.objects.length - 1].name !== "Confirm") {
            var confirm = new Button(function () {
                clearUser(userID);
                location.reload();
            });
            confirm.setSrc("image_resources/Button.png", "image_resources/ButtonPressed.png");
            confirm.setSpriteAttributes(260, 170, 200, 40, "Confirm");
            confirm.hasTextValue = true;
            //clearData.setText(["Clear Data"],30,3);
            confirm.update = function () {
                //console.log(this.image.src);
                //console.log(this.image.src);
                if (this.isPressed) {
                    confirm.setText(["Are you sure?"],40,8);
                } else {
                    confirm.setText(["Are you sure?"],45,3);
                }
            }
            subSettings.push(confirm);
            subSettings.pushButton(confirm);
        }
    });
    clearData.setSpriteAttributes(110,170,150,40,"Clear Data");
    clearData.setSrc("image_resources/Button.png", "image_resources/ButtonPressed.png");
    clearData.hasTextValue = true;
    //clearData.setText(["Clear Data"],30,3);
    clearData.update = function () {
        //console.log(this.image.src);
        //console.log(this.image.src);
        if (this.isPressed) {
            clearData.setText(["Clear Data"],25,8);
        } else {
            clearData.setText(["Clear Data"],30,3);
        }
    }
    subSettings.buttonArray.push(clearData);

    //Fitbit legal stuff

    //Privacy Policy

	/////////////////////////////////////////////////////////////////////////////////////////
	// Achievements
	/////////////////////////////////////////////////////////////////////////////////////////
    function openAchievements() {
    	screenMan.pop();
    	screenMan.push(subAchievements);
    }
    var achieveButton = new Button(openAchievements)
    achieveButton.setSrc("image_resources/Button.png","image_resources/ButtonPressed.png")
    achieveButton.setSpriteAttributes(330,60,160,40);
    var charnum = "Milestones".length
    achieveButton.hasTextValue = true;
    achieveButton.setText(["Milestones"], (achieveButton.width / 2) - (7 * charnum), 3);

    achieveButton.update = function () {
        if (this.isPressed) {
            achieveButton.setText(["Milestones"], (achieveButton.width / 2) - (7 * charnum) - 5, 6); 
        } else {
            achieveButton.setText(["Milestones"], (achieveButton.width / 2) - (7 * charnum), 3); 
        }
    }

    gameMenu.buttonArray.push(achieveButton);

    //Display Achievement List in menu screen
	var achievList = new Button();
    achievList.setSrc("image_resources/ClearSquare.png");
	achievList.setSpriteAttributes(0,0,700,700);
	achievList.fontSize = "10px";
	achievList.draw = function () {
		ctx.fillText(pageNumber, 265, 500);
		for(var i = 0; i < 7; i++){
			var X = 70;
			var Y = 120+50*i;
			var Z = i + 7*(pageNumber - 1);
			var N = i + 7;
			ctx.font = "20px handlee";
			if(completed[Z] == 1){
				ctx.fillStyle="Green";
			}
			else{
				ctx.fillStyle="Black";
				}
			ctx.fillText(achievements[Z] + "  " + rewardText[Z], X , Y);
			ctx.fillText(achievText[Z], X , Y+20 );
		}
	}

	subAchievements.buttonArray.push(achievList);
	
	//page traversal in achievement list
	var achievNext = new Button(function(){});
	achievNext.update = function () {
        if (this.isPressed && pageNumber < 2) {
            pageNumber++;
			achievNext.setSrc("image_resources/ArrowsRight.png","image_resources/ArrowsRightPressed.png");
			console.log("page number is :" + pageNumber);
        } else {
            areaNext.setSrc("image_resources/ArrowsRight.png","image_resources/ArrowsRightPressed.png"); 
        }
    }
	
	achievNext.setSrc("image_resources/ArrowsRight.png","image_resources/ArrowsRightPressed.png");
	achievNext.setSpriteAttributes(330,500,30,30);
	
	subAchievements.buttonArray.push(achievNext);
	
	var achievPrev = new Button(function(){});
	achievPrev.update = function () {
        if (this.isPressed && pageNumber >= 2) {
            pageNumber--;
			achievPrev.setSrc("image_resources/ArrowsLeft.png","image_resources/ArrowsLeftPressed.png");
			console.log("page number is :" + pageNumber);
        } else {
            areaPrev.setSrc("image_resources/ArrowsLeft.png","image_resources/ArrowsLeftPressed.png"); 
        }
    }
	
	achievPrev.setSrc("image_resources/ArrowsLeft.png","image_resources/ArrowsLeftPressed.png");
	achievPrev.setSpriteAttributes(180,500,30,30);
	
	subAchievements.buttonArray.push(achievPrev);
	
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
    historyButton.setSpriteAttributes(215,60,120,40);
    
    var charnum = "History".length
    historyButton.hasTextValue = true;
    historyButton.setText(["History"], (historyButton.width / 2) - (5 * charnum), 4);
    //settingsButton.setTooltip("This upgrades the "+ui_values.selected+" animal to the next level.");
    historyButton.update = function () {
            if (this.isPressed) {
                historyButton.setText(["History"], (historyButton.width / 2) - (5 * charnum) - 5, 6); 
            } else {
                historyButton.setText(["History"], (historyButton.width / 2) - (5 * charnum), 3); 
            }
    }

    gameMenu.buttonArray.push(historyButton);
	
	
	// History Pane 
	// Uses same code as event log
	/*var historyPane = new Button();
    historyPane.setSrc("image_resources/EventLog.png");
    historyPane.setSpriteAttributes(30, 70, 500, 200, "eventLog");
    subHistory.buttonArray.push(historyPane);*/
	
	

        
    for (i = 0; i < 5; i++) {
        var historyEntry = new Button();
        historyEntry.setSrc("image_resources/ClearSquare.png");
        historyEntry.setSpriteAttributes(100, (45*i)+115    , 452, 54, "historyLog");
        subHistory.buttonArray.push(historyEntry);

        historyEntry.hasTextValue = true;
        historyEntry.fontSize = '20px';

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
                        drawWrappedText(this.text, this.x + this.textOffsetX, this.y + this.textOffsetY, this.fontSize, 395, 20);
        }
    }
            }
        })(i);
    }

}