
tutorialProgress = 0;


//Creates a popup with default background.
function addPopup(text,x,y,name="popup") {
	var button = new Button(function() {
	    switch(true){
	       case(tutorialProgress == 0):
	           addPopup("It's your first time here\nso I'm going to show\nyou around the place!",100, 40);
	           tutorialProgress++;
	           break;
	       case(tutorialProgress == 1):
	           addPopup("This is your Nature\nJournal.",150, 90);
               tutorialProgress++;
               break;
           case(tutorialProgress == 2):
               addPopup("Here on the left\npage you can\ncall animals to explore\nthe world.",150, 90);
               tutorialProgress++;
               break;
           case(tutorialProgress == 3):
               addPopup("On the right\npage you can\nsee your animals as\nthey explore.",700, 90);
               tutorialProgress++;
               break;
           case(tutorialProgress == 4):
               addPopup("Your Nature Journal\nuses two currencies,\nsteps and tracks.",150, 80);
               tutorialProgress++;
               break;
           case(tutorialProgress == 5):
               addPopup("Steps you get by \nwalking around with your\nFitbit and are used to\ncall new animals.",230, 40);
               tutorialProgress++;
               break;
           case(tutorialProgress == 6):
               addPopup("Tracks your animals\nmake as they explore\nand are used for animal\nupgrades.",80, 40);
               tutorialProgress++;
               break;
           case(tutorialProgress == 7):
               addPopup("There are four different\nanimal types you can\ncall to travel the world.",150, 200);
               tutorialProgress++;
               break;
           case(tutorialProgress == 8):
               addPopup("Each has their own\nstrengths and\nweaknesses.",150, 200);
               tutorialProgress++;
               break;
           case(tutorialProgress == 9):
               addPopup("You can add an animal\nby selecting its icon\nabove and then clicking\nits portrait.",60, 250);
               tutorialProgress++;
               break;
           case(tutorialProgress == 10):
               addPopup("Let's send out\na new animal so we\ncan continue!",60, 250);
               tutorialProgress++;
               break;
           case(tutorialProgress == 11):
               addPopup("Don't worry about the\nsteps, we gave you a \nfew to start off.",60, 250);
               tutorialProgress++;
               break;
           case(tutorialProgress == 13):
               addPopup("As your animal walks\nthrough the world they\nwill face a number\nof harrowing challenges.",300, 200);
               tutorialProgress++;
               break;
           case(tutorialProgress == 14):
               addPopup("Your animal has three\nstatistics that it will\nuse to overcome these\nchallenges.",250, 200);
               tutorialProgress++;
               break;
           case(tutorialProgress == 15):
               addPopup("Speed, Evasion, and\nStrength.",250, 200);
               tutorialProgress++;
               break;
           case(tutorialProgress == 16):
               addPopup("You can increase your \nanimal's statistics with \ntracks via the\nupgrade button.",250, 300);
               tutorialProgress++;
               break;
           case(tutorialProgress == 17):
               addPopup("Failing these challenges \ncould slow down, or even \nkill your animals, so try \nand keep them healthy.",250, 300);
               tutorialProgress++;
               break;
           case(tutorialProgress == 18):
               addPopup("You can select your\nanimals by clicking on \ntheir portraits down \nhere.",250, 400);
               tutorialProgress++;
               break;
           case(tutorialProgress == 19):
               addPopup("Try selecting your\nfirst animal.",250, 400);
               tutorialProgress++;
               break;
           case(tutorialProgress == 21):
               addPopup("You can upgrade animals\nin two ways.",250, 300);
               tutorialProgress++;
               break;
           case(tutorialProgress == 22):
               addPopup("You can upgrade\nindividual animals or the\nbase level of animals.",250, 300);
               tutorialProgress++;
               break;
           case(tutorialProgress == 23):
               addPopup("Upgrading individuals\nis cheaper, but if\nthey die you lose all of\nthose tracks.",250, 300);
               tutorialProgress++;
               break;
           case(tutorialProgress == 24):
               addPopup("Upgrading the base\nlevel changes what level\nyour animals start at,\neven through death.",250, 300);
               tutorialProgress++;
               break;
           case(tutorialProgress == 25):
               addPopup("Keeping a healthy balance\nof the two will keep your\nanimals collecting as long\nas possible.",250, 300);
               tutorialProgress++;
               break;
           
           case(tutorialProgress == 26):
               addPopup("Right now you can have\na maximum of five\nanimals, and each animal\nlives for 8 hours",300, 400);
               tutorialProgress++;
               break;
           case(tutorialProgress == 27):
               addPopup("But keep exploring and\nyou may be able to\nhave more!",300, 400);
               tutorialProgress++;
               break;
           case(tutorialProgress == 28):
               addPopup("Speaking of exploring,\nyour animals are walking\nthrough what's called\nan area.",700, 300);
               tutorialProgress++;
               break;
           case(tutorialProgress == 29):
               addPopup("If you keep collecting \nsteps you'll unlock more\nareas.",700, 300);
               tutorialProgress++;
               break;
           case(tutorialProgress == 30):
               addPopup("When your area goes up\nyour animals get more\ntracks, but the challenge\nwill also increase.",700, 300);
               tutorialProgress++;
               break;
           case(tutorialProgress == 31):
               addPopup("But never fear! If an\narea proves too hard for\nyour animals you can go\nback to an easier one.",700, 300);
               tutorialProgress++;
               break;
            case(tutorialProgress == 32):
               addPopup("That's all you need\nto know!",500, 250);
               tutorialProgress++;
               break;  
            case(tutorialProgress == 33):
               addPopup("Now get out there,\njournal in hand, and\nget to nature walking!",500, 250);
               tutorialProgress++;
               break;
                
           
        }
		removePopup(this);
	});
	button.setSrc("image_resources/Tooltip.png");
	button.setSpriteAttributes(x,y,208,150, name)
	button.hasTextValue = true;
	button.fontSize = '20px';
	charnum = text.length;
	button.setText([text], (button.width / 2) - (6.3 * charnum), 5);
	button.draw = function(){
	    ctx.globalAlpha = 0.3;
	    ctx.fillRect(0, 0, canvas.width, canvas.height, 'black');
	    ctx.globalAlpha = 1.0;
	    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	    if ((this.hovered && this.text !== undefined) || this.hasTextValue || this.hasTooltip){
            if (this.text === undefined) {
                //console.log(this.name);
            } else {
                var strArray = this.text[0].split(/\n/);
                for(var s = 0; s < strArray.length; s++){
                    drawText([strArray[s]], this.x + 3, this.y + this.textOffsetY + (32*s), this.fontSize, this.color);
                }
            }
            if (this.tooltip != undefined && cursor.x != undefined && cursor.y != undefined && this.hovered) {
                drawText(this.tooltip,cursor.x+5,cursor.y+5)
            }
        }
	}
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
    addPopup("Welcome to Nature Walk!\n\nClick on these boxes to\nmove on.",100, 40);
	screenMan.push(popups);
	
}

function startTutorialPartTwo(){
    tutorialProgress++;
    addPopup("Great job!\nThat animal will now\nstart collecting tracks\nfor you.",150, 200);
    screenMan.push(popups);
}

function startTutorialPartThree(){
    tutorialProgress++;
    addPopup("There you go!\nNow you can see your\nanimal's name and its\nindividual statistics.",250, 400);
    screenMan.push(popups);
}


/////////////////
function popupController() {
	this.popups = [];
};

//Contains controls when popups appear
popupController.prototype.update = function() {
	
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
		removeInterface(fullUpgrade);
	}
}

