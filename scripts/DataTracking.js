/* Things to work on:  
 * 1. Event future sight.
 * 2. Events based on environment.
 * 3. Events appearing on screen. 
*/
//Object that can hold all of the session and player data.
var dataObj = {
    animalTracks: 0,
    timeAccelFactor: 1,
    numberOfSessions: 0,
    timePlayed: 0,
    everySecondTrig: 0,
    eventTrigger: 10,
    sessionStartTime: 0,
    animalStats: ["Vitality", "Evasion", "Strength", "Athletics", "Instinct", "Lifespan"],
    devSignIn: false,
    computationReady: false,
    eventCounter: 0,
    timeAccelFactor: 1
};


//List of bad events. 
var badEvents = [
    "predator", "river", "ravine", "winter", "treefall",
    "mudslide", "lightning", "tornado", "sinkhole",
    "forestfire", "drought", "heatwave", "flashflood", "meteor", "eruption", "hunter", "pollution"
];

//List of good events. 
var goodEvents = [
    "stepmulti", "extratracks", "clickable", "fountain", 
    "meadow", "preservation"
];

//Array that is referenced by the journal above the game map. 
var eventLogAry = [];

//Constructor function for the DataTracker Object.
var DataTracker = function() {
    //this.timePlayed = 0;
    //this.sessionStartTime = 0;
    /*
    if (getData(playerID, "timePlayed") === undefined) {
        updateData(playerID, "timePlayed", 0);
    } else {
        dataObj["timePlayed"] = getData(playerID, "timePlayed");
    }
    */
    
    sessionStart();
}
DataTracker.prototype.constructor = DataTracker;
DataTracker.prototype.sessionStart = sessionStart;
DataTracker.prototype.getTime = getTime;
DataTracker.prototype.sessionEnd = sessionEnd;
DataTracker.prototype.openDevWindow = openDevWindow;

/* sessionStart() - Function to get all of the player data upon start up. Would also be used to call the function that calculates what the player earned while they were gone.
 * Params - None. 
 * Returns - None. 
*/
function sessionStart() {
    dataObj["sessionStartTime"] = Date.now();
    //console.log(dataObj["sessionStartTime"]);
    //dataObj["numberOfSessions"] = getData(playerID, "numberOfSessions");
    //console.log("Time Played: " + dataObj["timePlayed"]);
}

/* getTime() - Function that calculates any time that passes. 
 * Params - None. 
 * Returns - None. 
*/
function getTime() {
    var currentTime = Date.now() * dataObj["timeAccelFactor"];
    var timeAry = readableTime(currentTime - dataObj["sessionStartTime"]);
    //console.log("hello");
    //DEBUG: console.log(timeAry[1] + " Seconds\n" + timeAry[2] + " Minutes\n" + timeAry[3] + " Hours\n" + timeAry[4] + " Days");
    timeHandler(timeAry);
    
    return (currentTime - dataObj["sessionStartTime"]);
}

/* readableTime() - Converts milliseconds to various higher times (seconds, minutes, hours and days).
 * Params: - milliseconds: number of milliseconds that are given via Date.now(). 
 * Returns - timeArray: An array of various time measurements. 
*/
function readableTime(milliseconds) {
    var timeArray = [0, 0, 0, 0, 0];
    var timeRemainder = milliseconds;
    //Milliseconds
    timeArray[0] = timeRemainder % 1000;
    timeRemainder = Math.floor(timeRemainder/1000);
    //Seconds
    timeArray[1] = timeRemainder % 60
    timeRemainder = Math.floor(timeRemainder/60);
    //Minutes
    timeArray[2] = timeRemainder % 60
    timeRemainder = Math.floor(timeRemainder/60);
    //Hours
    timeArray[3] = timeRemainder % 24
    timeRemainder = Math.floor(timeRemainder/24);
    //Days
    timeArray[4] = timeRemainder;
    return timeArray;
}

/* eventHandler() - Uses the array from readableTime() to calculate the timings of events. Currently divided into:
 * - Events that happen every second (everySecond(seconds)).
 * - Events that happen every 30 seconds (everyThirty(seconds)).
 * - Events that happen every minute (everyMinute(minutes)).
 * - Events that happen every hour (everyHour(hours)).
 * Params: - timeAry: Array of various time measurements from readableTime(). 
 * Returns - None. 
*/
function timeHandler(timeAry) {
    if (timeAry[1] === dataObj.everySecondTrig) {
        //console.log(dataObj.everySecondTrig);
        everySecond(timeAry[1]);
        if (timeAry[1] === 59) {
            dataObj.everySecondTrig = 0;
        } else {
            dataObj.everySecondTrig++; 
        }   
    }
    
    //everyMinute(timeAry[2]);
    
    if (timeAry[1] % 30 === 0) {
        if (dataObj.computationReady) {
            //console.log("Computation Event!! " + tracks);
            everyThirty(timeAry[1]);
            dataObj.computationReady = false;
        } else {
            //console.log("Already computered.");
        }
    } else {
        if (dataObj.computationReady === false) {
            dataObj.computationReady = true;
        }
    }
}

//Function that will be called every second. 
function everySecond(seconds) {
    //Track generation code. 

    //Ten tracks per animal.
    dataObj.animalTracks += (10*controller.getAnimalTotal());
    
    //DEBUG: console.log(seconds);
    //Decrement the event trigger timer. 
    //When it hits 0, roll an event. 
    if (dataObj.eventTrigger > 0) {
        dataObj.eventTrigger--;
    } else {
        var evtRoll = roll(100);
        console.log(++dataObj.eventCounter);
        eventChooser(evtRoll);
        dataObj.eventTrigger = roll(5) + 12;
    }
}

//Function that is called every thirty seconds. 
function everyThirty(seconds) {
    var tracks = 0;
    for (var i = 0; i < 4; i++){
        tracks += (controller.getAnimalTotal() * 30);
    } 
    //DEBUG: console.log("tracks = " + tracks);
    //eventLogAry.shift();
    dataObj.animalTracks += tracks;
}

function everyMinute(minutes) {
    
}

function everyHour(hours) {
    
}

//Roll what kind of event is rolled. Good, Bad, Neutral.
function eventChooser(evtRoll) {
    for (var i = eventLogAry.length-1; i >= 0; i--) {
        eventLogAry.pop();
    }
    if (eventLogAry.length === 5) {
        eventLogAry.shift();
    }
    //Good Event
    if (evtRoll > 70) {
        goodEventHandler(roll(100));
    } 
    //Bad Event
    else if (evtRoll < 40) {
        badEventHandler(roll(100));
    }
    //No Event
    else {
        noEventHandler(roll(100));
    }
}

//Handles good events, takes in a new roll from the eventChooser.
function goodEventHandler(evtRoll) {
    switch (true) {
        //Multiplier
        case evtRoll < 30:
            //console.log(goodEvents[0]);
            eventLogAry.push("You picked up a step multiplier.");
            break;
        //Extra Tracks
        case evtRoll >= 30 && evtRoll < 55:
            //console.log(goodEvents[1]);
            eventLogAry.push("You find some animal tracks!");
			dataObj.animalTracks += 2500;
            break;
        //Fountain of Youth
        case evtRoll >= 55 && evtRoll < 60:
            //console.log(goodEvents[2]);
            eventLogAry.push("Your animals drink from the fountain of youth!");
            break;
        //Restful Meadow
        case evtRoll >= 60 && evtRoll < 75:
            //console.log(goodEvents[3]);
            eventLogAry.push("This meadow looks like a good place to rest.");
            break;
        //Mating Season
        case evtRoll >= 75 && evtRoll < 85:
            //console.log(goodEvents[4]);
            
            break;
        //Wildlife Preservation Attempts
        case evtRoll >= 85 && evtRoll <= 100:
            //console.log(goodEvents[5]);
            eventLogAry.push("Wildlife preservationists are nearby.");
            break;
    }
}

//Handles bad events, takes in a new roll from the eventChooser.
function badEventHandler(evtRoll) {
   switch (true) {
        //Predator
        case evtRoll < 35:
            //console.log(badEvents[0]);
            eventLogAry.push("A predator attacked your animals!");
            eventLogAry.push("To escape, the animals' evasion will be tested.");
			for(var i = 0; i < controller.getNumAnimals(); i++){
				badEventChecker(i,'evasion');
			}
            break;
        //River
        case evtRoll >=35 && evtRoll < 43:
            //console.log(badEvents[1]);
            eventLogAry.push("Your animals try to cross a river.");
            eventLogAry.push("To swim across, the animals' strength will be tested.");
			for(var i = 0; i < controller.getNumAnimals(); i++){
				badEventChecker(i,'strength');
			}
            break;
        //Ravine
        case evtRoll >=43 && evtRoll < 51:
            eventLogAry.push("There's a ravine ahead of you.");
            eventLogAry.push("To cross it, the animals' strength will be tested.");
			for(var i = 0; i < controller.getNumAnimals(); i++){
				badEventChecker(i,'strength');
			}
            break;
        //Winter
        case evtRoll >=51 && evtRoll < 57:
            //console.log(badEvents[3]);
            eventLogAry.push("It's a cold winter night.");
            eventLogAry.push("Finding shelter will test the animals' speed.");
			for(var i = 0; i < controller.getNumAnimals(); i++){
				badEventChecker(i,'speed');
			}
            break;
        //Tree
        case evtRoll >=57 && evtRoll < 63:
            //console.log(badEvents[4]);
            eventLogAry.push("You come across a fallen tree.");
            eventLogAry.push("In order to climb over, the animals' strength will be tested.");
			for(var i = 0; i < controller.getNumAnimals(); i++){
				badEventChecker(i,'strength');
			}
            break;
        //Mudslide
        case evtRoll >=63 && evtRoll < 67:
            //console.log(badEvents[5]);
            eventLogAry.push("Look out! A mudslide!");
            eventLogAry.push("The animals' evasion will be tested to get out of the way.");
			for(var i = 0; i < controller.getNumAnimals(); i++){
				badEventChecker(i,'evasion');
			}
            break;
            
        //Lightning
            /*
        case evtRoll >=66 && evtRoll < 67:
            //console.log(badEvents[6]);
            eventLogAry.push("A storm is coming.");
            break;
            */
        //Tornado
            /*
        case evtRoll >=67 && evtRoll < 68:
            //console.log(badEvents[7]);
            eventLogAry.push("A tornado approaches!");
            break;
            */
          
        //Sinkhole
        case evtRoll >=67 && evtRoll < 71:
            //console.log(badEvents[8]);
            eventLogAry.push("There's a sinkhole to avoid.");
            eventLogAry.push("Getting around it will test the animals' speed.");
			for(var i = 0; i < controller.getNumAnimals(); i++){
				badEventChecker(i,'speed');
			}
            break;
        //Forest Fire
        case evtRoll >=71 && evtRoll < 73:
            //console.log(badEvents[9]);
            eventLogAry.push("An enormous fire is burning the forest!");
            eventLogAry.push("To avoid it, the animals' speed will be tested.");
			for(var i = 0; i < controller.getNumAnimals(); i++){
				badEventChecker(i,'speed');
			}
            break;
        case evtRoll >=75 && evtRoll < 77:
            //console.log(badEvents[11]);
            eventLogAry.push("A brutal heat wave washes over you.");
            eventLogAry.push("To endure it, the animals' strength will be tested.");
			for(var i = 0; i < controller.getNumAnimals(); i++){
				badEventChecker(i,'strength');
			}
            break;
        //Flash flood
        case evtRoll >=77 && evtRoll < 81:
            //console.log(badEvents[12]);
            eventLogAry.push("A sudden rain storm causes a flood!");
            eventLogAry.push("Trudging through it will be a test of the animals' strength.");
			for(var i = 0; i < controller.getNumAnimals(); i++){
				badEventChecker(i,'strength');
			}
            break;
        //Meteor
            
        case evtRoll >=80 && evtRoll < 81:
            //console.log(badEvents[13]);
            eventLogAry.push("There's a meteor falling from the sky!");
            break;
            
        //Volcano
        
        case evtRoll >=81 && evtRoll < 82:
            //console.log(badEvents[14]);
            eventLogAry.push("A nearby volcano erupts!");
            eventLogAry.push("In order to escape it, the animals' speed will be tested.");
			for(var i = 0; i < controller.getNumAnimals(); i++){
				badEventChecker(i,'speed');
			}
            break;
        //Hunters
        case evtRoll >=82 && evtRoll < 97:
            //console.log(badEvents[15]);
            eventLogAry.push("There are some hunters nearby.");
            eventLogAry.push("Escaping will be force the animals' evasion to be tested.");
			for(var i = 0; i < controller.getNumAnimals(); i++){
				badEventChecker(i,'evasion');
			}
            break;
        //Pollution
        case evtRoll >=97 && evtRoll <= 100:
            
            break;
   } 
}

//Handles neutral events, takes in a new roll from the eventChooser.
function noEventHandler(evtRoll) {
    switch (true) {
        //Predator
        case evtRoll < 35:
            eventLogAry.push("It's a wonderful day!");
            break;
        case evtRoll >= 35 && evtRoll < 45:
            eventLogAry.push("Sunny and warm, perfect for nature walking.");
            break;
        case evtRoll >= 45:
            eventLogAry.push("You pass by another animal.");
            break;
    }
}

//Two String arguments animal is either: 'frog','deer','bird','bunny', and stat is either: 'vitality', 'evasion', 'strength', 'athletics', 'instincts', 'lifespan'
// rolls for all animal count of the specific animal against their specified stat
// removes the number of animals that fail the roll
function badEventChecker(animal, stat){
	
	var count= 0; 
	var playerRoll, gameRoll;
	
	var a = controller.getAnimalData(animal);
	
	var e = controller.getAnimalCount(animal);
	
	for( var i = 0; i < e; ++i){
		playerRoll = roll(10000);
		gameRoll = roll(10000);
		
		switch(stat){
        case 'vitality': playerRoll = a[0] + playerRoll;
            break;
        case 'evasion': playerRoll = a[1] + playerRoll;
            break;
        case 'strength': playerRoll = a[2] + playerRoll;
            break;
        case 'athletics': playerRoll = a[3] + playerRoll;
            break;
		case 'instincts': playerRoll = a[4] + playerRoll;
            break;
        case 'lifespan': playerRoll = a[5] + playerRoll;
            break;
		}
	
		if(playerRoll < gameRoll){
			count++;
		}

	}
    if (animal === 'frog') {
        eventLogAry.push(count + " " + animal + "s were lost.");
        controller.removeAnimal(animal, count);
    } else if (animal === 'deer') {
        eventLogAry.push(count + " " + animal + " were lost.");
    }
	console.log( animal +"s removed by event: " + count);
	
	
}

// takes, in animal string argument, adds 20% of animals
function matingSeason(animal){
	var a = Math.floor(controller.getAnimalCount(animal) * 0.2);
	
	controller.addAnimal(animal, a);
	
	console.log(animal + "s added by event : " + a);
	
}
//Rolls an integer between 1 and a number parameter. . 
function roll(num) {
    return Math.round(Math.random()*num);
}
/* sessonEnd() - Called when the window is closed (unfinished). Used to take data from dataObj{} and store it on server/local storage.
 * Params: None. 
 * Returns: None.
*/
function sessionEnd() {
    this.timePlayed += getTime();
    console.log("Time Played: " + dataObj["timePlayed"]);
    //updateData(playerID, "timePlayed", dataObj["timePlayed"]);
    console.log("Time Played: " + dataObj["timePlayed"]);
    //return "Are you sure?";
}


/* OpenDevWindow() - Developers window to use cheat codes, for testing purposes of course. ;)
 * Sign in with your name in the Slack. 
 * Params: None. 
 * Returns: None.
*/
function openDevWindow() {
    //updateData(playerID, "timePlayed", dataObj["timePlayed"]);
    //var devWindow = new Screen(true, true); 
    var background = new Sprite();
    var devAuth = devAuthentication;
  
    console.log(userID);
    background.setSrc("https://naturewalk.slack.com/files/hesi/F41C74HQC/ranimalsnw.jpg");
    background.setSpriteAttributes(25, 25, 150, 350, "devWindow");
    
    if (dataObj.devSignIn === false) {
        var devName = prompt("Enter dev name: ");
        if (devAuth(devName)) {
            console.log("Authentication successful.");
            dataObj["devSignIn"] = true;
        } else {
            //console.log("Authentication failed.")
            alert("Authentication failed.")
            return;
        }
        commandManager();
    } else {
        commandManager();
    }
}

/* devAuthentication() - Validates developers to use cheats.  
 * Params - name: Value entered into the prompt. Will be a name from our Slack group. 
 * Returns - a boolean that validates if the given name is in the array of registered devs. 
*/
function devAuthentication(name){
    var AuthorizedDevelopers = ["anhouzi", "dan", "duunko", "eshi", "memuir", "theoren"];
    return AuthorizedDevelopers.includes(name);
}

/* commandManager() - Function to handle all of the cheat commands.  
 * Params: None. 
 * Returns: None. 
*/
function commandManager() {
    var cmd = prompt("Enter command or type 'list' to see the commands.");
    
    switch (cmd.toLowerCase()) {
        case "list":
            console.log("'stepoff' - adds steps");
            console.log("'trackerdown(Not Implemented)' - adds tracks");
            console.log("'gottagofast(Not Implemented)' - increases rate at which game time flows.");
            console.log("'justaminutedeer(Not Implemented)' - time warps.");
            console.log("'pidgeyohno' - removes all animals");
            console.log("'toadallyfit(Not Implemented)' - makes animals invulnerable, not immortal");
            console.log("'badhareday(Not Implemented)' - hardreset of player data");
            break;
        //Give steps to the player.
        case "stepoff":
            console.log(cmd);
            //console.log(stepCount);
            var stepCheat = Number(prompt("Enter number of steps to add."));
            if (typeof stepCheat === "number") {
                stepCount += stepCheat;
            } else { alert("Not a number."); }
            
            break;
        //Give tracks to the player.
        case "trackerdown":
            var trackCheat = Number(prompt("Enter number of steps to add."));
            if (typeof trackCheat === "number") {
                dataObj.animalTracks += trackCheat;
            } else { alert("Not a number."); }
            
            break;
        //Increase the speed at which the game sees time passing.
        //Can go up to 3 times faster in frames speed. Cannot slow down even after speeding up. 
        case "gottagofast":
            console.log(cmd);
            var gameSpeed = Number(prompt("Enter number milliseconds per frame."));
            if (typeof gameSpeed === "number") {
                game_loop_interval = gameSpeed;
                game_loop(screenMan);
                console.log(game_loop_interval);
            } else { alert("Not a number."); }
            break;
        //Warp ahead in time. 
        case "justaminutedeer":
            console.log(cmd);
            break;
        //Remove all animals from the map. 
        case "pidgeyohno":
            console.log(cmd);
            for (var i = game.objects.length - 1; i > 0; i--) {
                if (game.objects[i].name === "frog" ||
                    game.objects[i].name === "bunny" ||
                    game.objects[i].name === "deer" ||
                    game.objects[i].name === "bird") {
                        game.objects.splice(i, 1);
                    }
            }
            break;
        //Unkillable animals. 
        case "toadallyfit":
            console.log(cmd);
            break;
        //Hard reset of all data. 
        case "badhareday":
            console.log(cmd);
            break;
    }
}