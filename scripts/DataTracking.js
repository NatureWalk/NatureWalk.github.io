
//Object that can hold all of the session and player data.
var dataObj = {
    animalTracks: 0,
    numberOfSessions: 0,
    timePlayed: 0,
    everySecondTrig: 0,
    sessionStartTime: 0,
    animalCounter: [0, 0, 0, 0],
    timeAccelFactor: 1,
    devSignIn: false,
    computationReady: true,
}

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
    //DEBUG: console.log(timeAry[1] + " Seconds\n" + timeAry[2] + " Minutes\n" + timeAry[3] + " Hours\n" + timeAry[4] + " Days");
    eventHandler(timeAry);
    
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
function eventHandler(timeAry) {
    
    if (timeAry[1] === dataObj.everySecondTrig) {
        everySecond(timeAry[1]);
        if (timeAry[1] === 59) {
            dataObj.everySecondTrig = 0;
        } else {
            dataObj.everySecondTrig++; 
        }   
    }
    
    //everyMinute(timeAry[2]);
    
    if (timeAry[1] % 30 === 0 ) {
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

function everySecond(seconds) {
    console.log(seconds);
    //console.log(dataObj.animalCounter[2])
}

function everyThirty(seconds) {
    var tracks = 0;
    for (var i = 0; i < dataObj.animalCounter.length; i++){
        tracks += (dataObj.animalCounter[i] * 30);
    } 
    //DEBUG: console.log("tracks = " + tracks);
    dataObj.animalTracks += tracks;
}

function everyMinute(minutes) {
    
}

function everyHour(hours) {
    
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
            console.log(cmd);
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