//functions to update player stats in local storage

//variable that holds the number of lifetime steps of the player, pulled from fitbit API after fitbitstart() is executed
var fitbitSteps;
var loggedIn = false;
//function that is called in loadGame() in userinterface.js
function logIn(){
        loggedIn = true;
    loginPlayer();
}

firstTimeUserFlag = false;


//initializes fitbitsteps to player's lifetime fitbit steps before stepCount is recalculated
//checks if the player is a first time user
//if yes, correct current stepCount is calculated and a first time user json is created and saved to local
//if no, correct current stepCount is calculated and a returning user json is created and saved to local
function loginPlayer(){
    fitbitSteps = stepCount;
    console.log(userID);
    console.log(isFirstTimeUser(userID));
    console.log(fitbitSteps);
    if(isFirstTimeUser(userID)){
        console.log("first timer");
        firstTimeUserSteps();
        createData(initPackage());
        firstTimeUserFlag = true;
    } else {
        console.log("returning player");
        returningUserSteps();
        returningUserTracks();
        returningBaseLevels();
        createData(returningPackage(userID));
    }
}


//takes a user id and a key and returns an int
//used to retrieve playerSteps and playerTSteps
function getJsonItem(iD, key){
    var jsonData = JSON.parse(localStorage.getItem(iD.toString()));
    console.log(key + ": " + parseInt(jsonData[key.toString()]));
    return parseInt(jsonData[key.toString()]);
}


//takes a json and saves it in localstorage with the userID as the key
function createData(localJson){
    localStorage.setItem(userID.toString(), localJson);
}


//adjusts stepCount if a first time user has over 20000 steps
function firstTimeUserSteps(){
    dataObj.steps = 4500;
    dataObj.totalSteps = 4500;
    if (fitbitSteps) {
        dataObj.priorSteps = fitbitSteps;
    } else {
        dataObj.priorSteps = 0;
    }
    
    stepCount = dataObj.steps;
    console.log("Data Object");
    console.log(dataObj);
}
//calculates stepCount using saved data
function returningUserSteps(){
    var priorSteps = parseFloat(getJsonItem(userID, "playerPSteps"));
    var totalSteps = parseFloat(getJsonItem(userID, "playerTSteps"));
    var playerSteps = parseFloat(getJsonItem(userID, "playerSteps"));
    
    console.log("Prior: " + priorSteps);
    console.log("Total: " + totalSteps);
    console.log("Player: " + playerSteps);
    
    stepCount =  (fitbitSteps - priorSteps) + playerSteps;
    //stepCount =  (fitbitSteps - priorSteps - totalSteps) + playerSteps;
    
    dataObj.priorSteps = priorSteps;
    //dataObj.totalSteps = fitbitSteps - priorSteps;
    dataObj.totalSteps = totalSteps;
    dataObj.steps = stepCount;
    console.log("returning steps ===== " + stepCount);
}

function returningUserTracks(){
    returningUserArea();
    returningUserSeason();
    dataObj.animalTracks = parseFloat(getJsonItem(userID, "playerTracks"));
    var lastLoginTime = parseFloat(getJsonItem(userID, "time"));
    var id = userID;
    var key = "partyComp";
    var jsonData = JSON.parse(localStorage.getItem(id.toString()));
    var myarr = jsonData[key.toString()];   
    console.log(myarr);
    var currTime = Date.now();
    var timeDiff = currTime - lastLoginTime;
    console.log(timeDiff);
    
    var areaMult = 2.16;
    var areaTracks = controller.area_level*areaMult;
    
    console.log(myarr.length);
    for(var i = 0; i < myarr.length; i++){
        var deadflag = false;
        var endTime = currTime - myarr[i].deathTime;
        if(endTime < 0){
            endTime = Math.floor((timeDiff/1000)/15);
        } else {
            endTime = Math.floor(((myarr[i].deathTime - lastLoginTime)/1000)/15);
        }
        console.log(endTime);
        var spd = 1
        var eva = 1
        var str = 1
        for(var k = 0; k < myarr[i].level; k++){
            spd = Math.ceil(spd * animal_data[myarr[i].type][0]);
            eva = Math.ceil(eva * animal_data[myarr[i].type][1]);
            str = Math.ceil(str * animal_data[myarr[i].type][2]);
        }
        console.log(spd + " " + eva + " " + str);
        for(var j = 0; j < endTime; j++){
            dataObj.animalTracks += Math.floor(areaTracks*2*15);
            evtRoll = roll(100);
            console.log(evtRoll);
            //Good Event
            if (evtRoll > 70) {
                evt2 = roll(100);
                if (evt2 < 26){
                    dataObj.animalTracks += (dataObj.animalTracks/1000);
                }
            } 
            //Bad Event
            else if (evtRoll < 40) {
                evt2 = roll(100);
                switch (true) {
                    case evt2 <= 31:
                        stat = controller.usableEvents[0][1];
                        var playerRoll, gameRoll;
                        var diff = controller.getAreaLevel() * 75;
                        var diffmin = (controller.getAreaLevel() - 1) * 75;
    
                        for(var k = 0; k < controller.getAreaLevel(); k++){
                            diff = Math.ceil(diff * 1.33)
                        }
    
                        if(controller.getAreaLevel() == 1){
                            diffmin = 1;
                        } else {
                            for(var k = 0; k < controller.getAreaLevel() - 1; k++){
                                diffmin = Math.ceil(diffmin * 1.33)
                            }
                            diffmin = (diffmin * 0.85);
                        }
                        
                        playerRoll = 0;
                        gameRoll = roll(diff, diffmin);
                        
                        switch(stat){
                        case 'speed': 
                            playerRoll = roll(Math.round(spd + (25 * controller.getAreaLevel()), spd));
                            break;
                        case 'evasion': 
                            playerRoll = roll(Math.round(eva + (25 * controller.getAreaLevel()), eva));
                            break;
                        case 'strength': 
                            playerRoll = roll(Math.round(str + (25 * controller.getAreaLevel()), str));
                            break;
                        }
                        if(playerRoll < gameRoll){
                            var die = roll(100);
                            if (die < 5){
                                deadflag = true;
                            } else if(die < 50){
                                dataObj.animalTracks -= (dataObj.animalTracks/200)
                            }
                        }
                        if(deadflag == true){
                            myarr[i].deathTime = lastLoginTime + (j * 15)
                        }
                        break;  
                    case evtRoll > 31 < 63:
                        stat = controller.usableEvents[2][1];
                        var playerRoll, gameRoll;
                        var diff = controller.getAreaLevel() * 75;
                        var diffmin = (controller.getAreaLevel() - 1) * 75;
    
                        for(var k = 0; k < controller.getAreaLevel(); k++){
                            diff = Math.ceil(diff * 1.33)
                        }
    
                        if(controller.getAreaLevel() == 1){
                            diffmin = 1;
                        } else {
                            for(var k = 0; k < controller.getAreaLevel() - 1; k++){
                                diffmin = Math.ceil(diffmin * 1.33)
                            }
                            diffmin = (diffmin * 0.85);
                        }
                        
                        playerRoll = 0;
                        gameRoll = roll(diff, diffmin);
                        
                        switch(stat){
                        case 'speed': 
                            playerRoll = roll(Math.round(spd + (25 * controller.getAreaLevel()), spd));
                            break;
                        case 'evasion': 
                            playerRoll = roll(Math.round(eva + (25 * controller.getAreaLevel()), eva));
                            break;
                        case 'strength': 
                            playerRoll = roll(Math.round(str + (25 * controller.getAreaLevel()), str));
                            break;
                        }
                        if(playerRoll < gameRoll){
                            var die = roll(100);
                            if (die < 5){
                                deadflag = true;
                            } else if(die < 50){
                                dataObj.animalTracks -= (dataObj.animalTracks/200)
                            }
                        }
                        if(deadflag == true){
                            myarr[i].deathTime = lastLoginTime + (j * 15)
                        }
                        break;  
                    case evtRoll >= 63 < 95:
                        stat = controller.usableEvents[0][1];
                        var playerRoll, gameRoll;
                        var diff = controller.getAreaLevel() * 75;
                        var diffmin = (controller.getAreaLevel() - 1) * 75;
    
                        for(var k = 0; k < controller.getAreaLevel(); k++){
                            diff = Math.ceil(diff * 1.33)
                        }
    
                        if(controller.getAreaLevel() == 1){
                            diffmin = 1;
                        } else {
                            for(var k = 0; k < controller.getAreaLevel() - 1; k++){
                                diffmin = Math.ceil(diffmin * 1.33)
                            }
                            diffmin = (diffmin * 0.85);
                        }
                        
                        playerRoll = 0;
                        gameRoll = roll(diff, diffmin);
                        
                        switch(stat){
                        case 'speed': 
                            playerRoll = roll(Math.round(spd + (25 * controller.getAreaLevel()), spd));
                            break;
                        case 'evasion': 
                            playerRoll = roll(Math.round(eva + (25 * controller.getAreaLevel()), eva));
                            break;
                        case 'strength': 
                            playerRoll = roll(Math.round(str + (25 * controller.getAreaLevel()), str));
                            break;
                        }
                        if(playerRoll < gameRoll){
                            var die = roll(100);
                            if (die < 5){
                                deadflag = true;
                            } else if(die < 50){
                                dataObj.animalTracks -= (dataObj.animalTracks/200)
                            }
                        }
                        if(deadflag == true){
                            myarr[i].deathTime = lastLoginTime + (j * 15)
                        }
                        break;  
                    case evtRoll >= 95:
                        stat = controller.usableEvents[3][1];
                        var playerRoll, gameRoll;
                        var diff = controller.getAreaLevel() * 75;
                        var diffmin = (controller.getAreaLevel() - 1) * 75;
    
                        for(var k = 0; k < controller.getAreaLevel(); k++){
                            diff = Math.ceil(diff * 1.33)
                        }
    
                        if(controller.getAreaLevel() == 1){
                            diffmin = 1;
                        } else {
                            for(var k = 0; k < controller.getAreaLevel() - 1; k++){
                                diffmin = Math.ceil(diffmin * 1.33)
                            }
                            diffmin = (diffmin * 0.85);
                        }
                        
                        diff = (diff*1.5);
                        diffmin = (diffmin*1.5);
                        
                        playerRoll = 0;
                        gameRoll = roll(diff, diffmin);
                        
                        switch(stat){
                        case 'speed': 
                            playerRoll = roll(Math.round(spd + (25 * controller.getAreaLevel()), spd));
                            break;
                        case 'evasion': 
                            playerRoll = roll(Math.round(eva + (25 * controller.getAreaLevel()), eva));
                            break;
                        case 'strength': 
                            playerRoll = roll(Math.round(str + (25 * controller.getAreaLevel()), str));
                            break;
                        }
                        if(playerRoll < gameRoll){
                            var die = roll(100);
                            if (die < 5){
                                deadflag = true;
                            } else if(die < 50){
                                dataObj.animalTracks -= (dataObj.animalTracks/200)
                            }
                        }
                        if(deadflag == true){
                            myarr[i].deathTime = lastLoginTime + (j * 15)
                        }
                        break;  
                    
                }
            }
            if(deadflag == true){
                break;  
            }
        }
        if(deadflag == false && ((currTime - myarr[i].deathTime) < 0)){
            controller.animals.push(myarr[i]);
        }
    
    }
}
function returningBaseLevels(){
    controller.base_levels['frog'] = getJsonItem(userID, "frogBaseLevel");
    controller.base_levels['bunny'] = getJsonItem(userID, "bunnyBaseLevel");
    controller.base_levels['bird'] = getJsonItem(userID, "birdBaseLevel");
    controller.base_levels['deer'] = getJsonItem(userID, "deerBaseLevel");
}

function returningUserArea(){
    //console.log("current area is " + parseInt(getJsonItem(userID, "area")));
    controller.area_level = parseInt(getJsonItem(userID, "area"));
    dataObj.areaMax = parseInt(getJsonItem(userID, "maxArea"));
    console.log("PREVAREAMAX: " + dataObj.areaMax);
}

function returningUserSeason(){
    var key = 'season';
    var jsonData = JSON.parse(localStorage.getItem(userID.toString()));
    console.log(jsonData);
    controller.areaSeason = jsonData[key].toString();
    switch(controller.areaSeason){
                case 'spring':
                    if(controller.areaLevel % 2 == 0){
                        controller.usableEvents = badEventsSpringNight.slice();
                    } else {
                        controller.usableEvents = badEventsSpringDay.slice();
                    }
                    break;
                case 'summer':
                    if(controller.areaLevel % 2 == 0){
                        controller.usableEvents = badEventsSummerNight.slice();
                    } else {
                        controller.usableEvents = badEventsSummerDay.slice();
                    }
                    break;
                case 'fall':
                    if(controller.areaLevel % 2 == 0){
                        controller.usableEvents = badEventsFallNight.slice();
                    } else {
                        controller.usableEvents = badEventsFallDay.slice();
                    }
                    break;
                case 'winter': 
                    if(controller.areaLevel % 2 == 0){
                        controller.usableEvents = badEventsWinterNight.slice();
                    } else {
                        controller.usableEvents = badEventsWinterDay.slice();
                    }
                    break;
    var cata = roll(2,0);
    controller.usableEvents.push(badEventsCatastrophe[cata]);
    }
}

// Deprecated
function returningUserParty(){
console.log("returning user party");
    var id = userID;
    var key = "partyComp";
    var jsonData = JSON.parse(localStorage.getItem(id.toString()));
    var myarr = jsonData[key.toString()];   
    //console.log(myarr[0].deathTime);
    
    //console.log(myarr[0]);
    //controller.animals.push(myarr[0]);
    if(myarr.length == 0){
    console.log("no animals in party");
    }
    for (var i = 0; i < myarr.length; i++) {
        if(myarr[i].deathTime > Date.now()){
            console.log("animal added");
            controller.animals.push(myarr[i]);
        } else {
            console.log("animal removed");
        }
    }
}

//creates an login package for a first time user
function initPackage() {
    var package, jsonFile; 
    package = { 
        area: controller.getAreaLevel(),
        //areaMax: dataObj.maxArea,
        partySize: controller.party_limit,
        season: controller.areaSeason,
        partyComp: [],
        birdBaseLevel: controller.getAnimalBaseLevel('bird'),
        bunnyBaseLevel: controller.getAnimalBaseLevel('bunny'),
        deerBaseLevel: controller.getAnimalBaseLevel('deer'),
        frogBaseLevel: controller.getAnimalBaseLevel('frog'),
        playerSteps: dataObj.steps,
        playerPSteps: dataObj.priorSteps,
        playerTSteps: dataObj.totalSteps,
        playerTracks: dataObj.animalTracks,
        //eventsGood: [evt1, evt2,...,evtn],
        //eventsBad: [speedEvts, evasionEvts, strengthEvts],
        //eventSuccesses: 0,
        //eventFailures: 0,
        //animalsTripped: 0,
        //animalsDied: 0,
        //animalsLeft: 0,
        time: Date.now(),
    };
    
    for (var i = 0; i < controller.animals.length; i++) {
        package.partyComp.push(controller.animals[i]);
    }
    
    jsonFile = JSON.stringify(package);
    console.log(jsonFile);
    return jsonFile;
}


//creates a login package for a returning player
function returningPackage(iD) {
    //console.log("previous display = " + prevDispSteps);
    var prevArea = parseInt(getJsonItem(iD, "area"));
    //console.log("previous pSteps = " + prevArea);
    var prevAreaMax = getJsonItem(iD, "areaMax");
    
    var prevPartySize = parseInt(getJsonItem(iD, "partySize"));
    
    var prevBirdBase = parseInt(getJsonItem(iD, "birdBaseLevel"));
    var prevBunnBase = parseInt(getJsonItem(iD, "bunnyBaseLevel"));
    var prevDeerBase = parseInt(getJsonItem(iD, "deerBaseLevel"));
    var prevFrogBase = parseInt(getJsonItem(iD, "frogBaseLevel"));
    
    var prevSteps = parseFloat(getJsonItem(iD, "playerSteps"));
    var prevPSteps = parseFloat(getJsonItem(iD, "playerPSteps"));
    var prevTSteps = parseFloat(getJsonItem(iD, "playerTSteps"));
    var prevTracks = parseFloat(getJsonItem(iD, "playerTracks"));
    var prevTime = parseFloat(getJsonItem(iD, "time"));
    //var package, jsonFile; 
    //jsonFix(jsonFixAry);
    package = {  
        animalsDied: 0,
        animalsLeft: 0,
        animalsTripped: 0,
        area: controller.getAreaLevel(),
        areaMax: dataObj.areaMax,
        baseLevelBird: prevBirdBase,
        baseLevelBunny: prevBunnBase,
        baseLevelDeer: prevDeerBase,
        baseLevelFrog: prevFrogBase,
        eventsGood: [],
        eventsBad: [],
        eventSuccesses: 0,
        eventFailures: 0,
        partyComp: [],
        partySize: controller.party_limit,
        playerSteps: prevSteps,
        playerPSteps: prevPSteps,
        playerTSteps: prevTSteps,
        playerTracks: prevTracks,
        season: controller.areaSeason,
        time: prevTime,
    };

    console.log(prevPartySize);
    for (var i = 0; i < controller.animals.length; i++) {
        controller.animals[i].setLevel = function(lv){
          this.level = lv;
        }
        controller.animals[i].levelUp = function(){
          this.level += 1;
        }
        package.partyComp.push(controller.animals[i]);
        console.log(controller.animals[i].name + ": " +
                   controller.animals[i].levelUp);
    }
    
    jsonFile = JSON.stringify(package);
    //console.log(jsonFile);
    return jsonFile;
}

function isFirstTimeUser(myID){
    if(storageIsSupported()){
        if(localStorage.getItem(myID.toString()) == null){
            return true;
        } else {
            return false;
            }
    } else {
        console.log("Browser does not support HTML5 local storage");
    }
}
/*
function jsonFix(ary) {
    var i;
    for (i = 0; i < (ary.length - 1); i++) {
        if (ary[i] > 0) {
            
        }
    }
}
*/
//checks if browser supports local storage. 
//returns true if localstorage is supported, false if it is not
function storageIsSupported(){
    // Check browser support
    if (typeof(Storage) !== "undefined") {
        return true;
    }else{
        return false;
    };
}