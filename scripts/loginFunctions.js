//functions to update player stats in local storage

//variable that holds the number of lifetime steps of the player, pulled from fitbit API after fitbitstart() is executed
var fitbitSteps;
var loggedIn = false;
//function that is called in loadGame() in userinterface.js
function logIn(){
        loggedIn = true;
	loginPlayer();
}


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
	} else {
console.log("returning player");
		returningUserSteps();
                returningUserTracks();
                returningUserArea();
                returningUserParty();
                returningBaseLevels();
		createData(returningPackage(userID));
	}
}


//takes a user id and a key and returns an int
//used to retrieve playerSteps and playerTSteps
function getJsonItem(iD, key){
	var jsonData = JSON.parse(localStorage.getItem(iD.toString()));
	console.log(parseInt(jsonData[key.toString()]));
	return parseInt(jsonData[key.toString()]);
}


//takes a json and saves it in localstorage with the userID as the key
function createData(localJson){
	localStorage.setItem(userID.toString(), localJson);
}


//adjusts stepCount if a first time user has over 20000 steps
function firstTimeUserSteps(){
        dataObj.totalSteps = fitbitSteps;
	if(stepCount > 20000){
		stepCount = 20000;
	} else {
		stepCount = stepCount;
	};
}

function returningBaseLevels(){
	controller.base_levels['frog'] = getJsonItem(userID, "frogBaseLevel");
	controller.base_levels['bunny'] = getJsonItem(userID, "bunnyBaseLevel");
	controller.base_levels['bird'] = getJsonItem(userID, "birdBaseLevel");
	controller.base_levels['deer'] = getJsonItem(userID, "deerBaseLevel");
}


//calculates stepCount using saved data
function returningUserSteps(){
	stepCount = ((stepCount - parseFloat(getJsonItem(userID, "playerTSteps")))) + parseFloat(getJsonItem(userID, "playerSteps"));
        dataObj.totalSteps = fitbitSteps;
	console.log("returning steps ===== " + stepCount);
}

function returningUserTracks(){
	dataObj.animalTracks = parseFloat(getJsonItem(userID, "playerTracks"));
	//console.log("returning steps ===== " + stepCount);
}

function returningUserArea(){
	//console.log("current area is " + parseInt(getJsonItem(userID, "area")));
	controller.area_level = parseInt(getJsonItem(userID, "area"));
}


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
        partySize: controller.party_limit,
        partyComp: [],
        playerSteps: stepCount,
        playerTSteps: fitbitSteps,
        playerTracks: dataObj.animalTracks,
        time: Date.now(),
    };
    
    for (var i = 0; i < controller.animals.length; i++) {
        package.partyComp.push(controller.animals[i]);
    }
    
    jsonFile = JSON.stringify(package);
    //console.log(jsonFile);
    return jsonFile;
}


//creates a login package for a returning player
function returningPackage(iD) {
	var prevLifeSteps = parseFloat(getJsonItem(iD, "playerTSteps"));
	//console.log("previous step count = " + prevLifeSteps);
	var prevDispSteps = parseFloat(getJsonItem(iD, "playerSteps"));
	//console.log("previous display = " + prevDispSteps);
    var package, jsonFile; 
    package = { 
        area: controller.getAreaLevel(),
        partySize: controller.party_limit,
        partyComp: [],
        playerSteps: stepCount, 
        playerTSteps: fitbitSteps,
        playerTracks: dataObj.animalTracks,
        time: Date.now(),
    };

    for (var i = 0; i < controller.animals.length; i++) {
        package.partyComp.push(controller.animals[i]);
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