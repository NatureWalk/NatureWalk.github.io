var dataObj = {
    timePlayed: 0,
    sessionStartTime: 0,    
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


function sessionStart() {
    dataObj["sessionStartTime"] = Date.now();
}

function getTime() {
    var currentTime = Date.now();
    console.log(currentTime - dataObj["sessionStartTime"]);
    return (currentTime - dataObj["sessionStartTime"]);
}

function sessionEnd() {
    this.timePlayed += getTime();
    //updateData(playerID, "timePlayed", dataObj["timePlayed"]);
    console.log("Time Played: " + dataObj["timePlayed"]);
}