//functions for persistent local storage of steps and multilipers.
//All functions convert parameters to strings before storing and return floats when retrieving stored data
//uses variable stepCount created in APIcalls.js

//save a player's current stats for steps and multipliers in local storage
function saveStats(id, steps, mult, ingame){
	if(isFirstTimeUser(id)){
		createData(id, steps, mult, ingame);
	} else {
		updateMult(id, mult);
		updateSteps(id, steps);
		updateIngame(id, ingame);
	};
}

//replaces current saved multiplier for a player with newMult
function updateMult(playerID, newMult){
	updateData(playerID, "mult", newMult.toString());
}


//replaces current saved step count with newSteps
function updateSteps(playerID, newSteps){
	updateData(playerID, "steps", newSteps.toString());
}


function updateIngame(playerID, newIngame){
	updateData(playerID, "ingame", newIngame.toString());
}


//saves steps and multiplier for a player in local storage by creating a JSON object, converting it to a string and saving in local storage
function createData(playerID, steps, mult, ingame){
	var myObj = { "steps":steps.toString(), "mult":mult.toString(), "ingame":ingame.toString()};
	var myJSON = JSON.stringify(myObj);
	localStorage.setItem(playerID.toString(), myJSON);
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
function updateData(playerID, key, value){
	var item = key.toString();
	var text = localStorage.getItem(playerID.toString());
	var obj = JSON.parse(text);
	//console.log(obj);
	obj[item] = value.toString();
	var myJSON = JSON.stringify(obj);
	localStorage.setItem(playerID.toString(), myJSON);
	//console.log(obj);
}


//deletes the local storage for a user
function deleteUser(playerID){
	localStorage.removeItem(playerID.toString());
}


//checks to see if local storage exists for a player.  
//returns true for a first time user and false for a returning user.
function isFirstTimeUser(playerID){
	if(storageIsSupported()){
		if(localStorage.getItem(playerID.toString()) == null){
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