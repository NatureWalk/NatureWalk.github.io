var dataObj = {
    numberOfSessions: 0,
    timePlayed: 0,
    sessionStartTime: 0,
    deerSpawnCount: 0,
    rabbitSpawnCount: 0,
    frogSpawnCount: 0,
    birdSpawnCount: 0,
    timeAccelFactor: 1
}

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


function sessionStart() {
    dataObj["sessionStartTime"] = Date.now() * dataObj["timeAccelFactor"];
    //dataObj["numberOfSessions"] = getData(playerID, "numberOfSessions");
}

function getTime() {
    var currentTime = Date.now();
    var timeAry = readableTime(currentTime - dataObj["sessionStartTime"]);
    console.log(timeAry[0] + " Milliseconds\n" + timeAry[1] + " Seconds\n" + timeAry[2] + " Minutes\n" + timeAry[3] + " Hours\n" + timeAry[4] + " Days");
    return (currentTime - dataObj["sessionStartTime"]);
}

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

function sessionEnd() {
    this.timePlayed += getTime();
    //updateData(playerID, "timePlayed", dataObj["timePlayed"]);
    console.log("Time Played: " + dataObj["timePlayed"]);
}

function openDevWindow() {
    console.log("Hello");
    var devWindow = new Screen(true, true); 
    var background = new Sprite();
    var devAuth = devAuthentication;
    background.setSrc("https://naturewalk.slack.com/files/hesi/F41C74HQC/ranimalsnw.jpg");
    background.setSpriteAttributes(25, 25, 150, 350, "devWindow");
    
    var devName = prompt("Enter dev name: ");
    if (devAuth(devName)) {
        console.log("Authentication successful.");
        //delete devWindow;
    } else {
        console.log("Authentication failed.")
        //delete devWindow;
    }
}

function devAuthentication(name){
    var AuthorizedDevelopers = ["anhouzi", "dan", "duunko", "eshi", "memuir", "theoren"];
    return AuthorizedDevelopers.includes(name);
}