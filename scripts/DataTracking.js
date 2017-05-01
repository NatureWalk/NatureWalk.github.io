/* Things to work on:  
 * 1. Event future sight.
 * 2. Events based on environment.
 * 3. Events appearing on screen. 
*/
//Object that can hold all of the session and player data.
var dataObj = {
    steps: 0,
    priorSteps: 0,
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
    partySize: 0
};

//Constructor function for the DataTracker Object.
var DataTracker = function() {
    sessionStart();
};
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
	///////////////////////////////////
	// USED FOR TESTING! DELETES ALL LOCAL DATA!
	// ONLY UNCOMMENT IF YOU WANT TO DELETE LOCAL DATA!
    //localStorage.clear();
	///////////////////////////////////
	
    //var _tempData = queryServer();
    //dataObj.steps = stepCount;
    //dataObj["totalSteps"] += dataObj.steps;
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
    //console.log("Getting Time");
    var currentTime = Date.now() * dataObj["timeAccelFactor"];
    var timeAry = readableTime(currentTime - dataObj["sessionStartTime"]);
    //console.log("Time Handler");
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
    timeArray[1] = timeRemainder % 60;
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
        everySecond(timeAry[1]);
        if (timeAry[1] === 59) {
            dataObj.everySecondTrig = 0;
        } else {
            dataObj.everySecondTrig++; 
        }
    } else if (Math.abs(timeAry[1] - dataObj.everySecondTrig) >= 2) {
        dataObj.everySecondTrig = timeAry[1] + 1;
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
        dataObj.eventTrigger = roll(5);
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
        season: controller.areaSeason,
        partyComp: [],
        birdBaseLevel: 1,
        bunnyBaseLevel: 1,
        deerBaseLevel: 1,
        frogBaseLevel: 1,
        playerSteps: stepCount,
        playerPSteps: dataObj.priorSteps,
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
    
    jsonFile = JSON.stringify(package);
    console.log(jsonFile);
    lJson = jsonFile;
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

function areaEligible() {
    //
    var area = controller.getAreaLevel();
    var areaReq = 5000;
    for (var i = 1; i < area; i++) {
       areaReq = (areaReq+5000) * 1.01; 
    }
    //console.log("Steps: " + dataObj.totalSteps + ". Required: " + areaReq);
    if (dataObj.totalSteps >= areaReq) return true;
    return false;
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
            console.log("'trackerdown' - adds tracks");
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