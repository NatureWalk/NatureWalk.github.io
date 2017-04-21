//functions to update player stats in local storage

//variable that holds the number of lifetime steps of the player, pulled from fitbit API after fitbitstart() is executed
var fitbitSteps;

//function that is called in loadGame() in userinterface.js
function logIn(){
	loginPlayer();
}


//initializes fitbitsteps to player's lifetime fitbit steps before stepCount is recalculated
//checks if the player is a first time user
//if yes, correct current stepCount is calculated and a first time user json is created and saved to local
//if no, correct current stepCount is calculated and a returning user json is created and saved to local
function loginPlayer(){
	fitbitSteps = stepCount;
	console.log(isFirstTimeUser(userID));
	console.log(fitbitSteps);
	if(isFirstTimeUser(userID)){
		firstTimeUserSteps();
		createData(initPackage());
	} else {
		returningUserSteps();
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
	if(stepCount > 20000){
		stepCount = 20000;
	} else {
		stepCount = stepCount;
	};
}


//calculates stepCount using saved data
function returningUserSteps(){
	stepCount = ((stepCount - parseFloat(getJsonItem(userID, "playerTSteps")))) + parseFloat(getJsonItem(userID, "playerSteps"));
	//console.log("returning steps ===== " + stepCount);
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