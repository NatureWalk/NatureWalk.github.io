//functions for persistent local storage of steps and multilipers.
//All functions convert parameters to strings before storing and return floats when retrieving stored data
//uses variable stepCount created in APIcalls.js

//stepCount = 1500;


/*function localSave(localJson){
	if(isFirstTimeUser(userID)){
		createData(localJson);
		console.log("first");
	} else {
		createData(localJson);
		console.log("return");
	};
}
*/
function firstTimePackage(){
	var initSteps;
	if(stepCount < 8500){
		initSteps = 8500;
	} else if(stepCount > 20000){
		initSteps = 20000;
	} else {
		initSteps = stepCount;
	};
	console.log(initSteps);
	
	var package, jsonFile; 
    package = { 
        area: controller.getAreaLevel(),
        partySize: controller.party_limit,
        partyComp: [],
        playerSteps: initSteps,
        playerTSteps: dataObj.totalSteps,
        playerTracks: dataObj.animalTracks,
        time: Date.now(),
    };
    
    for (var i = 0; i < controller.animals.length; i++) {
        package.partyComp.push(controller.animals[i]);
    }
    
    jsonFile = JSON.stringify(package);
    //console.log(jsonFile);
}

//returns player data as a JSON object for currently logged in player
function getLocalJson(){
	var localString = localStorage.getItem(userID.toString());
	return JSON.parse(localString);
}

function getLocalString(){
	return localStorage.getItem(userID.toString());
}

function onLogin(){
	var currentSteps = calcCurrentSteps();
	
}


function calcCurrentSteps(){
console.log("accurate steps === " (stepCount - getData(userID, playerSteps)));
	return (stepCount - getData(userID, playerSteps));
}
//save a player's current stats for steps and multipliers in local storage


//replaces current saved multiplier for a player with newMult
function updateMult(newMult){
	updateData(playerID, "mult", newMult.toString());
}


//function to call when a multiplier is collected by an animal
//add newly collected multiplier(newMult) to mult in storage for player and save to local storage
function multCollected(playerID, newMult){
	var multToSave = getData(playerID, mult) + newMult;
	updateMult(playerID, multToSave);
}


//replaces current saved step count with newSteps
function updateSteps(playerID, newSteps){
	updateData(playerID, "steps", newSteps.toString());
}


function updateIngame(playerID, newIngame){
	updateData(playerID, "ingame", newIngame.toString());
}


//saves steps and multiplier for a player in local storage by creating a JSON object, converting it to a string and saving in local storage
function createData(localJson){
	localStorage.setItem(userID.toString(), localJson);
}






//returns the value(as a float) associated with the key for a player
function getData(playerID, key){
	var item = key.toString()
	var text = localStorage.getItem(playerID.toString());
	var obj = JSON.parse(text);
	//console.log(key + ": " + obj[item]);
	return parseFloat(obj[item]);
}


//changes the current saved value associated with a key for a player
function updateData(localJson){
	localStorage.setItem(userID.toString(), localJson);
}


//deletes the local storage for a user
function deleteUser(){
	localStorage.removeItem(userID.toString());
}


//checks to see if local storage exists for a player.  
//returns true for a first time user and false for a returning user.
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