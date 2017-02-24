//functions to update player stats when the player logs in


//saves player stats to local storage
function onLogin(playerID){
	if(isFirstTimeUser(playerID)){
		console.log("new user");
		//sets multiplier to 1 and resource to 8000
		saveStats(playerID, stepCount, 1, 8000);
	} else {
		console.log("returning user");
		var myResource = convertSteps(playerID);
		//sets multiplier to 1 and resource to current resource
		saveStats(playerID, stepCount, 1, myResource);
	}
}


//returns steps taken since player last logged in
function stepsSinceLastLogin(playerID){
	var prevSteps = getData(playerID, "steps");
	return stepCount - prevSteps;
}


//returns the players current resource count (resource from new steps times saved multiplier plus saved resource from local storage)
function convertSteps(playerID){
	var currentStep = stepsSinceLastLogin(playerID);
	var currentMult = getData(playerID, "mult");
	var newResource = currentStep * currentMult;
	var prevResource = getData(playerID, "ingame");
	return newResource + prevResource;
}


//debugging function returns saved data
/*function checking(){
		console.log("steps taken to date: " + getData(myid, "steps"));
		console.log("current multiplier: " + getData(myid, "mult"));
		console.log("current resource: " + getData(myid, "ingame"));
}*/
