
//Creates a popup with default background.
function addPopup(text,x,y,cutout,name="popup") {
	var button = new Button(function() {
	    switch(true){
	       case(dataObj.tutorialProgress == 0):
	           addPopup("It's your first time here\nso I'm going to show\nyou around the place!",100, 40);
	           dataObj.tutorialProgress++;
	           break;
	       case(dataObj.tutorialProgress == 1):
	           addPopup("This is your Nature\nJournal.",150, 90);
               dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 2):
               addPopup("Here on the left\npage you can\ncall animals to explore\nthe world.",150, 90,[0,0,514,600]);
               dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 3):
               addPopup("On the right\npage you can\nsee your animals as\nthey explore.",700, 90,[514,0,514,600]);
               dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 4):
               addPopup("Your Nature Journal\nuses two currencies,\nsteps and tracks.",150, 90,[71,25,410,60]);
               dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 5):
               addPopup("These are your Steps.\nYou get these by walking\naround with your Fitbit\nand are used to call animals.",71, 90, [71,25,160,60]);
               dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 6):
               addPopup("These are your Tracks.\nYour animals make these\n as they explore and are\nused for animal upgrades.",240, 90, [225,25,252,57]);
               dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 7):
               addPopup("There are four different\nanimal types you can\ncall to travel the world.",150, 200, [50,85,410,105]);
               dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 8):
               addPopup("Each has their own\nstrengths and\nweaknesses.",150, 200, [50,85,410,105]);
               dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 9):
               addPopup("You can add an animal\nby selecting its icon\nabove and then clicking\nthe button to the right.",60, 250, [283,400,175,47]);
               dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 10):
               addPopup("Let's send out\na new animal so we\ncan continue!",60, 250, [283,400,175,47]);
               dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 11):
               addPopup("Don't worry about the\nsteps, we gave you a \nfew to start off.",60, 250, [283,400,175,47]);
               dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 13):
               addPopup("As your animal walks\nthrough the world they\nwill face a number\nof harrowing challenges.\nWhich will be shown here.",300, 200, [533,25,445,207]);
               dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 14):
               addPopup("Your animal has three\nstatistics that it will\nuse to overcome these\nchallenges.",260, 220,[72,239,185,127]);
               dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 15):
               addPopup("Speed, Evasion, and\nStrength.",260, 215,[73,239,185,127]);
               dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 16):
               addPopup("You can increase your \nanimal's statistics with \ntracks via the\nupgrade button.",250, 300, [63,400,124,50]);
               dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 17):
               addPopup("Failing these challenges \ncould slow down, or even \nkill your animals, so try \nand keep them healthy.",250, 300);
               dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 18):
               addPopup("You can select your\nanimals by clicking on \ntheir icons down \nhere.",150, 300, [83,450,375,100]);
               dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 19):
               addPopup("Try selecting your\nfirst animal.",250, 400, [83,450,375,100]);
               dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 21):
               addPopup("You can upgrade animals\nin two ways.",250, 300);
               dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 22):
               addPopup("You can upgrade\nindividual animals or the\nbase level of animals.",250, 300);
               dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 23):
               addPopup("Upgrading individuals\nis cheaper, but if\nthey die you lose all of\nthose tracks.",250, 300, [94,450,52,52]);
               dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 24):
               addPopup("Upgrading the base\nlevel changes what level\nyour animals start at,\neven through death.",250, 150,[84,104,71,71]);
               dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 25):
               addPopup("Keeping a healthy balance\nof the two will keep your\nanimals collecting as long\nas possible.",250, 300);
               dataObj.tutorialProgress++;
               break;
           
           case(dataObj.tutorialProgress == 26):
               addPopup("Right now you can have\na maximum of five\nanimals, and each animal\nwill only walk with you\nfor 8 hours",250, 300, [83,450,320,55]);
               dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 27):
               addPopup("But keep exploring and\nyou may be able to\nhave more than five!",300, 250);
               dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 28):
               addPopup("Speaking of exploring,\nyour animals are walking\nthrough what's called\nan area.",700, 300,[600,233,301,52]);
               dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 29):
               addPopup("If you keep collecting \nsteps with your Fitbit\nyou'll unlock more areas.",700, 300, [600,233,301,52]);
               dataObj.tutorialProgress++;
               break;
           //Here are 4000 more steps to get you there. You can call more animals with these. 
           //When you get to a certain number of steps, this arrow will advance you to the next area. Click it!
           case(dataObj.tutorialProgress == 30):
               addPopup("We will give you\n4000 more steps\nto get you there.",700, 300);
               dataObj.steps += 4000;
               dataObj.totalSteps += 4000;
               dataObj.tutorialProgress++;
               areaNext.update();
               break;
           case(dataObj.tutorialProgress == 31):
               addPopup("When a new area is\navailable, click this\narrow to move there\nwith your animals.",700, 300, [843,238,42,38]);
               dataObj.tutorialProgress++;
               break;
           case(dataObj.tutorialProgress == 33):
               addPopup("But never fear! If an\narea proves too hard for\nyour animals you can go\nback to an easier one.",700, 300, [618,238,42,38]);
               dataObj.tutorialProgress++;
               break;
            case(dataObj.tutorialProgress == 34):
               addPopup("That's all you need\nto know!",500, 250);
               dataObj.tutorialProgress++;
               break;  
            case(dataObj.tutorialProgress == 35):
               addPopup("Now get out there,\njournal in hand, and\nget to nature walking!",500, 250);
               //tutorialProgress++;
               dataObj.tutorialProgress++;
               break; 
        }
		removePopup(this);
	});
	button.setSrc("image_resources/Tooltip.png");
	button.setSpriteAttributes(x,y,228,150, name)
	button.hasTextValue = true;
	button.fontSize = '20px';
	charnum = text.length;
	button.setText([text], (button.width / 2) - (6.3 * charnum), 5);
    button.cutout = function (ary) {
        //console.log(ary);
        ctx.globalAlpha = 0.3
        ctx.fillStyle="#f0c840";
        ctx.fillRect(ary[0], ary[1], ary[2], ary[3]);
        ctx.globalAlpha = 1.0
        ctx.fillStyle="black"
    }
    button.draw = function(){
	    ctx.globalAlpha = 0.3;
	    ctx.fillRect(0, 0, canvas.width, canvas.height, 'black');
	    ctx.globalAlpha = 1.0;
        //console.log(this.cutoutParams);
        if (cutout) {
            this.cutout(cutout);
        }
	    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	    if ((this.hovered && this.text !== undefined) || this.hasTextValue || this.hasTooltip){
            if (this.text === undefined) {
                //console.log(this.name);
            } else {
                var strArray = this.text[0].split(/\n/);
                //var clrIndex = this.text[0].indexOf(/\f/);
                //console.log(this.text[0].indexOf('*'));
                for(var s = 0; s < strArray.length; s++){
                    //Highlighting code here.
                    drawText([strArray[s]], this.x + 3, this.y + this.textOffsetY + (28*s), this.fontSize, this.color);
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
    addPopup("Welcome to Nature Walk!\n\nClick on \fthese notecards\f\nto move on.",100, 40);
	screenMan.push(popups);
	
}

function startTutorialPartTwo(){
    dataObj.tutorialProgress++;
    addPopup("Great job!\nThat animal will now\nstart collecting tracks\nfor you.",150, 200);
    screenMan.push(popups);
}

function startTutorialPartThree(){
    dataObj.tutorialProgress++;
    addPopup("There you go!\nNow you can see your\nanimal's name and its\nindividual statistics.",250, 400);
    screenMan.push(popups);
}

function startTutorialPartFour(){
    addPopup("When your area goes up\nyour animals get more\ntracks, but the challenge\nwill also increase.",700, 300, [728,238,22,38]);
    dataObj.tutorialProgress++;
    areaPrev.update();
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

