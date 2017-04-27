/* Things to work on:  
 * 1. Event future sight.
 * 2. Events based on environment.
 * 3. Events appearing on screen. 
*/
//Object that can hold all of the session and player data.
var dataObj = {
    steps: 0,
    totalSteps: 0,
    animalTracks: 0,
    timeAccelFactor: 1,
    numberOfSessions: 0,
    timePlayed: 0,
    everySecondTrig: 0,
    eventTrigger: 10,
    eventDisplayTimer: 0,
    sessionStartTime: 0,
    animalStats: ["Level", "Speed", "Evasion", "Strength"],
    devSignIn: false,
    computationReady: false,
    eventCounter: 0,
    timeAccelFactor: 1,
    partySize: 0
};

<<<<<<< HEAD
/*
=======
//////////////////////////////////////////////////////
// ADDED BY THEOREN
// vars to track how many animals succeed and fail each event
var bunnyNumDead = 0, birdNumDead = 0, deerNumDead = 0, frogNumDead = 0,
	bunnyNumTripped = 0, birdNumTripped = 0, deerNumTripped = 0, frogNumTripped = 0,
	bunnyNumSafe = 0, birdNumSafe = 0, deerNumSafe = 0, frogNumSafe = 0;

// vars for event difficulty, animal rolls, number of rolling animals, and how many total animals failed or succeeded each event	
var eventDiff = 0;
var animalRoll = 0;
//var numAnimalsRolled = 0;
var numAnimalsDead = 0;
var numAnimalsSafe = 0;
var numAnimalsTrip = 0;

/////////////////////////////////////////////////////

//List of bad events. 


>>>>>>> origin/Theoren
//List of good events. 
var goodEvents = [
    "stepmulti", "extratracks", "clickable", "fountain", 
    "meadow", "preservation"
];
*/

//Array that is referenced by the journal above the game map. 
var eventLogAry = [];

//Constructor function for the DataTracker Object.
var DataTracker = function() {
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
<<<<<<< HEAD
=======
	
	///////////////////////////////////
	// USED FOR TESTING! DELETES ALL LOCAL DATA!
	// ONLY UNCOMMENT IF YOU WANT TO DELETE LOCAL DATA!
	// localStorage.clear();
	///////////////////////////////////
	
	
    //var _tempData = queryServer();
>>>>>>> origin/Theoren
    dataObj.steps = stepCount;
    dataObj["totalSteps"] += dataObj.steps;
    dataObj["sessionStartTime"] = Date.now();
    
    //offlineCalculations(serverTime, dataObj["sessionStartTime"]);
    
    //setupPlayer(serverPlayerData);
    
    //setupParty(serverPartyComp);
}

/* getTime() - Function that calculates any time that passes. 
 * Params - None. 
 * Returns - None. 
*/
function getTime() {
    var currentTime = Date.now() * dataObj["timeAccelFactor"];
    var timeAry = readableTime(currentTime - dataObj["sessionStartTime"]);
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

    var areaMult = 2.16;
    var areaTracks = controller.area_level*areaMult;
    var animTracks = 2*controller.getNumAnimals();

    //DEBUG: console.log("Tracks: " + dataObj.animalTracks);
    //DEBUG: console.log(Math.floor(areaTracks*animTracks));
    dataObj.animalTracks += Math.floor(areaTracks*animTracks);
    
    if (--dataObj.eventDisplayTimer === 0) {
        displayEvent();
    }
    //DEBUG: console.log(seconds);
    //Decrement the event trigger timer. 
    //When it hits 0, roll an event. 
    if (dataObj.eventTrigger > 0) {
        dataObj.eventTrigger--;
    } else {
        var evtRoll = roll(100);
        ++dataObj.eventCounter;
        //DEBUG: console.log("Event "+dataObj.eventCounter);
        eventChooser(evtRoll);
        dataObj.eventTrigger = roll(5) + 12;
    }
    if (controller.animals.length != dataObj.partySize) {
        updateParty();
        dataObj.partySize = controller.animals.length;
    } 
}

//Function that is called every thirty seconds. 
function everyThirty(seconds) {
    //DEBUG: console.log("tracks = " + tracks);
    //eventLogAry.shift();
    //dataObj.animalTracks += tracks;
    if(loggedIn == true){
        createPackage();
        createData(lJson);
    };
}

function everyMinute(minutes) {
    
}

function everyHour(hours) {
    
}

var lJson;
function createPackage() {
    /* Things this needs to do. 
     * 1. Create a JSON file.
     * 2. Fill the file with the following elements:
        - Area You are On
        - Base data of animals
            - Party size.
            - Party composition.
                - Animal Type
                - Animal Name
                - Level
        - Base player data
            - Number of steps at time of save. 
            - Number of tracks
            - Player level?
        - Time of save. 
    */
    var package, jsonFile; 
    package = { 
        area: controller.getAreaLevel(),
        partySize: controller.party_limit,
        partyComp: [],
        birdBaseLevel: 1,
        bunnyBaseLevel: 1,
        deerBaseLevel: 1,
        frogBaseLevel: 1,
        playerSteps: stepCount,
        playerTSteps: dataObj.totalSteps,
        playerTracks: dataObj.animalTracks,
        time: Date.now(),
    };

    //sendData(package);
    
    for (var i = 0; i < controller.animals.length; i++) {
        package.partyComp.push(controller.animals[i]);
    }
    var anim = "frog";
    package.frogBaseLevel = controller.getAnimalBaseLevel(anim);
    var anim = "bunny";
    package.bunnyBaseLevel = controller.getAnimalBaseLevel(anim);
    var anim = "bird";
    package.birdBaseLevel = controller.getAnimalBaseLevel(anim);
    var anim = "deer";
    package.deerBaseLevel = controller.getAnimalBaseLevel(anim);
    
    var anim = "frog";
    package.frogBaseLevel = controller.getAnimalBaseLevel(anim);
    var anim = "bunny";
    package.bunnyBaseLevel = controller.getAnimalBaseLevel(anim);
    var anim = "bird";
    package.birdBaseLevel = controller.getAnimalBaseLevel(anim);
    var anim = "deer";
    package.deerBaseLevel = controller.getAnimalBaseLevel(anim);
    
    jsonFile = JSON.stringify(package);
    console.log(jsonFile);
    lJson = jsonFile;
<<<<<<< HEAD
=======
    /*////////////JSON Tests/////////////
    var myObj, obj2, myJSON, myParser;
    myObj = {hello: "world", goodbye: ["sucka", "busta"]};
    //obj2 = {hello: "sucka", goodbye: "world"};
    //myObj += obj2;
    myJSON = JSON.stringify(myObj);
    
    console.log("Object");
    console.log(myObj.hello);
    console.log("JSON");
    console.log(myJSON);
    
    
    
    myParser = JSON.parse(myJSON);
    console.log(myParser);
    */
}



//Roll what kind of event is rolled. Good, Bad, Neutral.
function eventChooser(evtRoll) {
    for (var i = eventLogAry.length-1; i >= 0; i--) {
        eventLogAry.pop();
    }
    if (eventLogAry.length === 6) {
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
   var numAnimalsRolled = 0;
   var b = controller.getBadEvents();
   //badStuff = [# of Unharmed, # Of Trips, # of Deaths]
   var x, badStuff = [0, 0, 0];

   switch (true) {
    	case evtRoll <= 31:
    		console.log(b[0][0] + " " + b[0][1])
            //eventLogAry.push("")
    		for(var i = 0; i < controller.getNumAnimals(); i++){
				badStuffSort(badEventChecker(i,b[0][1]), badStuff);
				numAnimalsRolled++;
			}
			// Print the results of the event that occured
			if(controller.getNumAnimals() > 0){
				eventLogAry.push("A " + b[0][0] + " occured. It tested " + b[0][1] + ". Your average animal roll was " + Math.ceil(animalRoll/numAnimalsRolled) + ". The event difficulty was " + Math.ceil(eventDiff/numAnimalsRolled) + ".");
				animalSafePrinter();
				animalTrippedPrinter();
				animalDeathPrinter();
			}
			eventDiff = 0;
			animalRoll = 0;
    		break;
    	case evtRoll > 31 < 63:
    		console.log(b[1][0] + " " + b[1][1])
    	    for(var i = 0; i < controller.getNumAnimals(); i++){
				badEventChecker(i,b[1][1]);
				numAnimalsRolled++;
			}
			// Print the results of the event that occured
			if(controller.getNumAnimals() > 0){
				eventLogAry.push("A " + b[1][0] + " occured. It tested " + b[1][1] + ". Your average animal roll was " + Math.ceil(animalRoll/numAnimalsRolled) + ". The event difficulty was " + Math.ceil(eventDiff/numAnimalsRolled) + ".");
				animalSafePrinter();
				animalTrippedPrinter();
				animalDeathPrinter();
			}
			eventDiff = 0;
			animalRoll = 0;
    		break;
    	case evtRoll >= 63 < 94:
    		console.log(b[2][0] + " " + b[2][1])
    		for(var i = 0; i < controller.getNumAnimals(); i++){
				badEventChecker(i,b[2][1]);
				numAnimalsRolled++;
			}
			// Print the results of the event that occured
			if(controller.getNumAnimals() > 0){
				eventLogAry.push("A " + b[2][0] + " occured. It tested " + b[2][1] + ". Your average animal roll was " + Math.ceil(animalRoll/numAnimalsRolled) + ". The event difficulty was " + Math.ceil(eventDiff/numAnimalsRolled) + ".");
				animalSafePrinter();
				animalTrippedPrinter();
				animalDeathPrinter();
			}
			eventDiff = 0;
			animalRoll = 0;
    		break;
    	case evtRoll >= 94:
    		console.log(b[3][0] + " " + b[3][1])
    		for(var i = 0; i < controller.getNumAnimals(); i++){
				badEventChecker(i,b[3][1],true);
				numAnimalsRolled++;
			}
			// Print the results of the event that occured
			if(controller.getNumAnimals() > 0){
				eventLogAry.push("A " + b[3][0] + " occured. It tested " + b[3][1] + ". Your average animal roll was " + Math.ceil(animalRoll/numAnimalsRolled) + ". The event difficulty was " + Math.ceil(eventDiff/numAnimalsRolled) + ".");
				animalSafePrinter();
				animalTrippedPrinter();
				animalDeathPrinter();
			}
			eventDiff = 0;
			animalRoll = 0;
    		break;
    	    
	}
    controller.removeAllQueue();
    console.log(controller.getNumAnimals());
	//console.log("0 test" + bunnyNumDead + bunnyNumSafe + bunnyNumTripped + birdNumDead + birdNumSafe + birdNumTripped + frogNumDead + frogNumSafe + frogNumTripped + deerNumDead + deerNumSafe + deerNumTripped);
}

//////////////////////////////////////////////////
// ADDED BY THEOREN
function animalDeathPrinter(){
	//console.log("number dead: " + numAnimalsDead);
	if(numAnimalsDead == 0){
		return;
	}else{
		eventLogAry.push(deerNumDead + " deer, " + bunnyNumDead + " bunnies, " + birdNumDead + " birds, and " + frogNumDead + " frogs were lost.")
		numAnimalsDead = 0;
		bunnyNumDead = 0, birdNumDead = 0, deerNumDead = 0, frogNumDead = 0;
	}
}

function animalTrippedPrinter(){
	//console.log("number trip: " + numAnimalsTrip);
	if(numAnimalsTrip == 0){
		return;
	}else{
		eventLogAry.push(deerNumTripped + " deer, " + bunnyNumTripped + " bunnies, " + birdNumTripped + " birds, and " + frogNumTripped + " frogs tripped and lost some tracks.")
		numAnimalsTrip = 0;
		bunnyNumTripped = 0, birdNumTripped = 0, deerNumTripped = 0, frogNumTripped = 0;
	}
}

function animalSafePrinter(){
	//console.log("number safe: " + numAnimalsSafe);
	if(numAnimalsSafe == 0){
		return;
	}else{
		eventLogAry.push(deerNumSafe + " deer, " + bunnyNumSafe + " bunnies, " + birdNumSafe + " birds, and " + frogNumSafe + " frogs failed, but managed to escape without harm.")
		numAnimalsSafe = 0;
		bunnyNumSafe = 0, birdNumSafe = 0, deerNumSafe = 0, frogNumSafe = 0;
	}
}
//////////////////////////////////////////////////


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
function badEventChecker(index, stat,flag){

	var playerRoll, gameRoll;
	
	var a = controller.getAnimalData();
	
	var e = a[index];
	
	var diff = controller.getAreaLevel() * 75;
	var diffmin = (controller.getAreaLevel() - 1) * 75;
	
	for(var i = 0; i < controller.getAreaLevel(); i++){
		diff = Math.ceil(diff * 1.33)
	}
	
	if(controller.getAreaLevel() == 1){
		diffmin = 1;
	} else {
		for(var i = 0; i < controller.getAreaLevel() - 1; i++){
			diffmin = Math.ceil(diffmin * 1.33)
		}
		diffmin = (diffmin * .85);
	}
	
	if(flag == true){
		diff = (diff*1.5);
		diffmin = (diffmin*1.5);
	}
	
    playerRoll = 0;
	gameRoll = roll(diff, diffmin);
		
	switch(stat){
       	case 'speed': playerRoll = roll(e[2] + (25 * controller.getAreaLevel()), e[2]);
            break;
        case 'evasion': playerRoll = roll(e[2] + (25 * controller.getAreaLevel()), e[3]);
            break;
        case 'strength': roll(Math.round(e[2] + (25 * controller.getAreaLevel()), e[4]));
            break;
	}
	
	// add up the difficulty and player roll to get the average later
	eventDiff += gameRoll;
	animalRoll += playerRoll;

	console.log(playerRoll + " " + gameRoll);
	if(playerRoll < gameRoll){
		var die = roll(100);
        var x = toCapitalize(e[5]);
        console.log("animal: " + x);
		if (die < 5){
			//eventLogAry.push(x +" was tragically lost.");
			deadTypeCheck(x);
			controller.queueRemove(index);
            return 2;
		} else if(die < 50){
            dataObj.animalTracks -= (dataObj.animalTracks/200)
			//eventLogAry.push(x +" tripped, you lost some tracks.");
			tripTypeCheck(x);
            return 1;
		} else {
			//eventLogAry.push(x +" didn't succeed, but they were luckily unhurt.");
			safeTypeCheck(x);
            return 0;
		}
	}
}


///////////////////////////////////////////////////
// ADDED BY THEOREN
// these three functions will increment the vars for how many animals are effected by each event

function deadTypeCheck(animal){
	if(animal == "Deer"){
		deerNumDead++;
	}else if(animal == "Bird"){
		birdNumDead++;
	}else if(animal == "Bunny"){
		bunnyNumDead++;
	}else if(animal == "Frog"){
		frogNumDead++;
	}
	numAnimalsDead++;
}

function tripTypeCheck(animal){
	if(animal == "Deer"){
		deerNumTripped++;
	}else if(animal == "Bird"){
		birdNumTripped++;
	}else if(animal == "Bunny"){
		bunnyNumTripped++;
	}else if(animal == "Frog"){
		frogNumTripped++;
	}
	numAnimalsTrip++;
}

function safeTypeCheck(animal){
	if(animal == "Deer"){
		deerNumSafe++;
	}else if(animal == "Bird"){
		birdNumSafe++;
	}else if(animal == "Bunny"){
		bunnyNumSafe++;
	}else if(animal == "Frog"){
		frogNumSafe++;
	}
	numAnimalsSafe++;
}

////////////////////////////////////////////////

function badStuffSort(badThing, badStuff) {
    badStuff[badThing]++;
>>>>>>> origin/Theoren
}

function areaEligible() {
    //
    var area = controller.getAreaLevel();
    var areaReq = 5000;
    for (var i = 1; i < area; i++) {
       areaReq = (areaReq+5000) * 1.01; 
    }
<<<<<<< HEAD
=======
    //console.log(dataObj.totalSteps);
>>>>>>> origin/Theoren
    if (dataObj.totalSteps >= areaReq) {return true;}
    else {return false}
}

//Rolls an integer between 1 and a number parameter. 
function roll(num, basenum) {
	if(basenum != null){
		return Math.floor(Math.random()*num) + basenum;
	}else {
    	return Math.round(Math.random()*num);
	}
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