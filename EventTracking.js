//////////////////////////////////////////////////////
// ADDED BY THEOREN
// vars to track how many animals succeed and fail each event
var bunnyNumDead = 0, 
    birdNumDead = 0, 
    deerNumDead = 0, 
    frogNumDead = 0,
    bunnyNumTripped = 0, 
    birdNumTripped = 0, 
    deerNumTripped = 0, 
    frogNumTripped = 0,
	bunnyNumSafe = 0, 
    birdNumSafe = 0, 
    deerNumSafe = 0, 
    frogNumSafe = 0;

// vars for event difficulty, animal rolls, number of rolling animals, and how many total animals failed or succeeded each event	
var eventDiff = 0;
var animalRoll = 0;
//var numAnimalsRolled = 0;
var numAnimalsDead = 0;
var numAnimalsSafe = 0;
var numAnimalsTrip = 0;

// grammar vars
var birdDeadGrammar = "bird";
var bunnyDeadGrammar = "bunny";
var frogDeadGrammar = "frog";

var birdTripGrammar = "bird";
var bunnyTripGrammar = "bunny";
var frogTripGrammar = "frog";

var birdSafeGrammar = "bird";
var bunnySafeGrammar = "bunny";
var frogSafeGrammar = "frog";

/////////////////////////////////////////////////////

//List of bad events. 


//List of good events. 
var goodEvents = [
    "stepmulti", "extratracks", "clickable", "fountain", 
    "meadow", "preservation"
];

//Array that is referenced by the journal above the game map. 
var eventLogAry = [];
console.log(eventLogAry);

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

//Handles good events, takes in a new roll from the eventChooser.
function goodEventHandler(evtRoll) {
    switch (true) {
        //Multiplier
        case evtRoll < 30:
            //console.log(goodEvents[0]);
            eventLogAry.push("You picked up a step multiplier.");
            break;
        //Extra Tracks
        case evtRoll >= 30 && evtRoll < 55:
            //console.log(goodEvents[1]);
            eventLogAry.push("You find some animal tracks!");
			dataObj.animalTracks += 2500;
            break;
        //Fountain of Youth
        case evtRoll >= 55 && evtRoll < 60:
            //console.log(goodEvents[2]);
            //eventLogAry.push("Your animals drink from the fountain of youth!");
            break;
        //Restful Meadow
        case evtRoll >= 60 && evtRoll < 75:
            //console.log(goodEvents[3]);
            eventLogAry.push("This meadow looks like a good place to rest.");
            break;
        //Mating Season
        case evtRoll >= 75 && evtRoll < 85:
            //console.log(goodEvents[4]);
            
            break;
        //Wildlife Preservation Attempts
        case evtRoll >= 85 && evtRoll <= 100:
            //console.log(goodEvents[5]);
            //eventLogAry.push("Wildlife preservationists are nearby.");
            break;
    }
}

//Handles good events, takes in a new roll from the eventChooser.
function goodEventHandler(evtRoll) {
    switch (true) {
        //Multiplier
        case evtRoll < 30:
            //console.log(goodEvents[0]);
            eventLogAry.push("You picked up a step multiplier.");
            break;
        //Extra Tracks
        case evtRoll >= 30 && evtRoll < 55:
            //console.log(goodEvents[1]);
            eventLogAry.push("You find some animal tracks!");
			dataObj.animalTracks += 2500;
            break;
        //Fountain of Youth
        case evtRoll >= 55 && evtRoll < 60:
            //console.log(goodEvents[2]);
            eventLogAry.push("Your animals drink from the fountain of youth!");
            break;
        //Restful Meadow
        case evtRoll >= 60 && evtRoll < 75:
            //console.log(goodEvents[3]);
            eventLogAry.push("This meadow looks like a good place to rest.");
            break;
        //Mating Season
        case evtRoll >= 75 && evtRoll < 85:
            //console.log(goodEvents[4]);
            
            break;
        //Wildlife Preservation Attempts
        case evtRoll >= 85 && evtRoll <= 100:
            //console.log(goodEvents[5]);
            eventLogAry.push("Wildlife preservationists are nearby.");
            break;
    }
}

//Handles bad events, takes in a new roll from the eventChooser.
function badEventHandler(evtRoll) {
   var numAnimalsRolled = 0;
   var b = controller.getBadEvents();
   //badStuff = [# of Unharmed, # Of Trips, # of Deaths]
   var x, badStuff = [0, 0, 0];

   switch (true) {
    	case evtRoll <= 31:
    		console.log(b[0][0] + " " + b[0][1])
            //eventLogAry.push("")
    		for(var i = 0; i < controller.getNumAnimals(); i++){
				badStuffSort(badEventChecker(i,b[0][1]), badStuff);
				numAnimalsRolled++;
			}
			// Print the results of the event that occured
			if(controller.getNumAnimals() > 0){
				eventLogAry.push("A " + b[0][0] + " occured. It tested " + b[0][1] + ". Your average animal roll was " + Math.ceil(animalRoll/numAnimalsRolled) + ". The event difficulty was " + Math.ceil(eventDiff/numAnimalsRolled) + ".");
				animalDeadGrammarCheck();
				animalTripGrammarCheck();
				animalSafeGrammarCheck();
				//animalSafePrinter();
				//animalTrippedPrinter();
				//animalDeathPrinter();
				bigDeathPrinter();
				bigTrippedPrinter();
				bigSafePrinter();
			}
			eventDiff = 0;
			animalRoll = 0;
    		break;
    	case evtRoll > 31 < 63:
    		console.log(b[1][0] + " " + b[1][1])
    	    for(var i = 0; i < controller.getNumAnimals(); i++){
				badEventChecker(i,b[1][1]);
				numAnimalsRolled++;
			}
			// Print the results of the event that occured
			if(controller.getNumAnimals() > 0){
				eventLogAry.push("A " + b[1][0] + " occured. It tested " + b[1][1] + ". Your average animal roll was " + Math.ceil(animalRoll/numAnimalsRolled) + ". The event difficulty was " + Math.ceil(eventDiff/numAnimalsRolled) + ".");
				animalDeadGrammarCheck();
				animalTripGrammarCheck();
				animalSafeGrammarCheck();
				//animalSafePrinter();
				//animalTrippedPrinter();
				//animalDeathPrinter();
				bigDeathPrinter();
				bigTrippedPrinter();
				bigSafePrinter();
			}
			eventDiff = 0;
			animalRoll = 0;
    		break;
    	case evtRoll >= 63 < 94:
    		console.log(b[2][0] + " " + b[2][1])
    		for(var i = 0; i < controller.getNumAnimals(); i++){
				badEventChecker(i,b[2][1]);
				numAnimalsRolled++;
			}
			// Print the results of the event that occured
			if(controller.getNumAnimals() > 0){
				eventLogAry.push("A " + b[2][0] + " occured. It tested " + b[2][1] + ". Your average animal roll was " + Math.ceil(animalRoll/numAnimalsRolled) + ". The event difficulty was " + Math.ceil(eventDiff/numAnimalsRolled) + ".");
				animalDeadGrammarCheck();
				animalTripGrammarCheck();
				animalSafeGrammarCheck();
				//animalSafePrinter();
				//animalTrippedPrinter();
				//animalDeathPrinter();
				bigDeathPrinter();
				bigTrippedPrinter();
				bigSafePrinter();
			}
			eventDiff = 0;
			animalRoll = 0;
    		break;
    	case evtRoll >= 94:
    		console.log(b[3][0] + " " + b[3][1])
    		for(var i = 0; i < controller.getNumAnimals(); i++){
				badEventChecker(i,b[3][1],true);
				numAnimalsRolled++;
			}
			// Print the results of the event that occured
			if(controller.getNumAnimals() > 0){
				eventLogAry.push("A " + b[3][0] + " occured. It tested " + b[3][1] + ". Your average animal roll was " + Math.ceil(animalRoll/numAnimalsRolled) + ". The event difficulty was " + Math.ceil(eventDiff/numAnimalsRolled) + ".");
				animalDeadGrammarCheck();
				animalTripGrammarCheck();
				animalSafeGrammarCheck();
				//animalSafePrinter();
				//animalTrippedPrinter();
				//animalDeathPrinter();
				bigDeathPrinter();
				bigTrippedPrinter();
				bigSafePrinter();
			}
			eventDiff = 0;
			animalRoll = 0;
    		break;
    	    
	}
    controller.removeAllQueue();
    console.log(controller.getNumAnimals());
	//console.log("0 test" + bunnyNumDead + bunnyNumSafe + bunnyNumTripped + birdNumDead + birdNumSafe + birdNumTripped + frogNumDead + frogNumSafe + frogNumTripped + deerNumDead + deerNumSafe + deerNumTripped);
}

// These three big printers improve the display and grammar of the printed texts

function bigDeathPrinter(){
	console.log("death print");
	if(deerNumDead > 0 && bunnyNumDead == 0 && birdNumDead == 0 && frogNumDead == 0){
		eventLogAry.push(deerNumDead + " deer failed the event and unfortunately died.");
	}else if(deerNumDead > 0 && bunnyNumDead > 0 && birdNumDead == 0 && frogNumDead == 0){
		eventLogAry.push(deerNumDead + " deer and " + bunnyNumDead + " " + bunnyDeadGrammar + " failed the event and unfortunately died.");
	}else if(deerNumDead > 0 && bunnyNumDead == 0 && birdNumDead > 0 && frogNumDead == 0){
		eventLogAry.push(deerNumDead + " deer and " + birdNumDead + " " + birdDeadGrammar + " failed the event and unfortunately died.");
	}else if(deerNumDead > 0 && bunnyNumDead == 0 && birdNumDead == 0 && frogNumDead > 0){
		eventLogAry.push(deerNumDead + " deer and " + frogNumDead + " " + frogDeadGrammar + " failed the event and unfortunately died.");
	}else if(deerNumDead > 0 && bunnyNumDead > 0 && birdNumDead > 0 && frogNumDead == 0){
		eventLogAry.push(deerNumDead + " deer, " + bunnyNumDead + " " + bunnyDeadGrammar + ", and " + birdNumDead + " " + birdDeadGrammar + " failed the event and unfortunately died.");
	}else if(deerNumDead > 0 && bunnyNumDead > 0 && birdNumDead == 0 && frogNumDead > 0){
		eventLogAry.push(deerNumDead + " deer, " + bunnyNumDead + " " + bunnyDeadGrammar + ", and " + frogNumDead + " " + frogDeadGrammar + " failed the event and unfortunately died.");
	}else if(deerNumDead > 0 && bunnyNumDead == 0 && birdNumDead > 0 && frogNumDead > 0){
		eventLogAry.push(deerNumDead + " deer, " + birdNumDead + " " + birdDeadGrammar + ", and " + frogNumDead + " " + frogDeadGrammar + " failed the event and unfortunately died.");
	}else if(deerNumDead > 0 && bunnyNumDead > 0 && birdNumDead > 0 && frogNumDead > 0){
		eventLogAry.push(deerNumDead + " deer, " + bunnyNumDead + " " + bunnyDeadGrammar + ", " + birdNumDead + " " + birdDeadGrammar + ", and " + frogNumDead + " " + frogDeadGrammar + " failed the event and unfortunately died.");
	}else if(deerNumDead == 0 && bunnyNumDead > 0 && birdNumDead == 0 && frogNumDead == 0){
		eventLogAry.push(bunnyNumDead + " " + bunnyDeadGrammar + " failed the event and unfortunately died.");
	}else if(deerNumDead == 0 && bunnyNumDead > 0 && birdNumDead > 0 && frogNumDead == 0){
		eventLogAry.push(bunnyNumDead + " " + bunnyDeadGrammar + ", and " + birdNumDead + " " + birdDeadGrammar + " failed the event and unfortunately died.");
	}else if(deerNumDead == 0 && bunnyNumDead > 0 && birdNumDead == 0 && frogNumDead > 0){
		eventLogAry.push(bunnyNumDead + " " + bunnyDeadGrammar + ", and " + frogNumDead + " " + frogDeadGrammar + " failed the event and unfortunately died.");
	}else if(deerNumDead == 0 && bunnyNumDead > 0 && birdNumDead > 0 && frogNumDead > 0){
		eventLogAry.push(bunnyDeadGrammar + ", " + birdNumDead + " " + birdDeadGrammar + ", and " + frogNumDead + " " + frogDeadGrammar + " failed the event and unfortunately died.");
	}else if(deerNumDead == 0 && bunnyNumDead == 0 && birdNumDead > 0 && frogNumDead == 0){
		eventLogAry.push(birdNumDead + " " + birdDeadGrammar + " failed the event and unfortunately died.");
	}else if(deerNumDead == 0 && bunnyNumDead == 0 && birdNumDead > 0 && frogNumDead > 0){
		eventLogAry.push(birdDeadGrammar + ", and " + frogNumDead + " " + frogDeadGrammar + " failed the event and unfortunately died.");
	}else if(deerNumDead == 0 && bunnyNumDead == 0 && birdNumDead == 0 && frogNumDead > 0){
		eventLogAry.push(frogNumDead + " " + frogDeadGrammar + " failed the event and unfortunately died.");
	}else{
		console.log("none died");
	}
	
	numAnimalsDead = 0;
	bunnyNumDead = 0, birdNumDead = 0, deerNumDead = 0, frogNumDead = 0;
}

function bigTrippedPrinter(){
	console.log("trip print");
	if(deerNumTripped > 0 && bunnyNumTripped == 0 && birdNumTripped == 0 && frogNumTripped == 0){
		eventLogAry.push(deerNumTripped + " deer tripped and lost some tracks.");
	}else if(deerNumTripped > 0 && bunnyNumTripped > 0 && birdNumTripped == 0 && frogNumTripped == 0){
		eventLogAry.push(deerNumTripped + " deer and " + bunnyNumTripped + " " + bunnyTripGrammar + " tripped and lost some tracks.");
	}else if(deerNumTripped > 0 && bunnyNumTripped == 0 && birdNumTripped > 0 && frogNumTripped == 0){
		eventLogAry.push(deerNumTripped + " deer and " + birdNumTripped + " " + birdTripGrammar + " tripped and lost some tracks.");
	}else if(deerNumTripped > 0 && bunnyNumTripped == 0 && birdNumTripped == 0 && frogNumTripped > 0){
		eventLogAry.push(deerNumTripped + " deer and " + frogNumTripped + " " + frogTripGrammar + " tripped and lost some tracks.");
	}else if(deerNumTripped > 0 && bunnyNumTripped > 0 && birdNumTripped > 0 && frogNumTripped == 0){
		eventLogAry.push(deerNumTripped + " deer, " + bunnyNumTripped + " " + bunnyTripGrammar + ", and " + birdNumTripped + " " + birdTripGrammar + " tripped and lost some tracks.");
	}else if(deerNumTripped > 0 && bunnyNumTripped > 0 && birdNumTripped == 0 && frogNumTripped > 0){
		eventLogAry.push(deerNumTripped + " deer, " + bunnyNumTripped + " " + bunnyTripGrammar + ", and " + frogNumTripped + " " + frogTripGrammar + " tripped and lost some tracks.");
	}else if(deerNumTripped > 0 && bunnyNumTripped == 0 && birdNumTripped > 0 && frogNumTripped > 0){
		eventLogAry.push(deerNumTripped + " deer, " + birdNumTripped + " " + birdTripGrammar + ", and " + frogNumTripped + " " + frogTripGrammar + " tripped and lost some tracks.");
	}else if(deerNumTripped > 0 && bunnyNumTripped > 0 && birdNumTripped > 0 && frogNumTripped > 0){
		eventLogAry.push(deerNumTripped + " deer, " + bunnyNumTripped + " " + bunnyTripGrammar + ", " + birdNumTripped + " " + birdTripGrammar + ", and " + frogNumTripped + " " + frogTripGrammar + " tripped and lost some tracks.");
	}else if(deerNumTripped == 0 && bunnyNumTripped > 0 && birdNumTripped == 0 && frogNumTripped == 0){
		eventLogAry.push(bunnyNumTripped + " " + bunnyTripGrammar + " tripped and lost some tracks.");
	}else if(deerNumTripped == 0 && bunnyNumTripped > 0 && birdNumTripped > 0 && frogNumTripped == 0){
		eventLogAry.push(bunnyNumTripped + " " + bunnyTripGrammar + ", and " + birdNumTripped + " " + birdTripGrammar + " tripped and lost some tracks.");
	}else if(deerNumTripped == 0 && bunnyNumTripped > 0 && birdNumTripped == 0 && frogNumTripped > 0){
		eventLogAry.push(bunnyNumTripped + " " + bunnyTripGrammar + ", and " + frogNumTripped + " " + frogTripGrammar + " tripped and lost some tracks.");
	}else if(deerNumTripped == 0 && bunnyNumTripped > 0 && birdNumTripped > 0 && frogNumTripped > 0){
		eventLogAry.push(bunnyNumTripped + " " + bunnyTripGrammar + ", " + birdNumTripped + " " + birdTripGrammar + ", and " + frogNumTripped + " " + frogTripGrammar + " failed the event and lost some tracks.");
	}else if(deerNumTripped == 0 && bunnyNumTripped == 0 && birdNumTripped > 0 && frogNumTripped == 0){
		eventLogAry.push(birdNumTripped + " " + birdTripGrammar + " tripped and lost some tracks.");
	}else if(deerNumTripped == 0 && bunnyNumTripped == 0 && birdNumTripped > 0 && frogNumTripped > 0){
		eventLogAry.push(birdNumTripped + " " + birdTripGrammar + ", and " + frogNumTripped + " " + frogTripGrammar + " failed the event and lost some tracks.");
	}else if(deerNumTripped == 0 && bunnyNumTripped == 0 && birdNumTripped == 0 && frogNumTripped > 0){
		eventLogAry.push(frogNumTripped + " " + frogTripGrammar + " failed the event and lost some tracks.");
	}else{
		console.log("none tripped");
	}
	
	numAnimalsTrip = 0;
	bunnyNumTripped = 0, birdNumTripped = 0, deerNumTripped = 0, frogNumTripped = 0;
}

function bigSafePrinter(){
	console.log("safe print");
	if(deerNumSafe > 0 && bunnyNumSafe == 0 && birdNumSafe == 0 && frogNumSafe == 0){
		eventLogAry.push(deerNumSafe + " deer failed, but escaped unharmed.");
	}else if(deerNumSafe > 0 && bunnyNumSafe > 0 && birdNumSafe == 0 && frogNumSafe == 0){
		eventLogAry.push(deerNumSafe + " deer and " + bunnyNumSafe + " " + bunnySafeGrammar + " failed, but escaped unharmed.");
	}else if(deerNumSafe > 0 && bunnyNumSafe == 0 && birdNumSafe > 0 && frogNumSafe == 0){
		eventLogAry.push(deerNumSafe + " deer and " + birdNumSafe + " " + birdSafeGrammar + " failed, but escaped unharmed.");
	}else if(deerNumSafe > 0 && bunnyNumSafe == 0 && birdNumSafe == 0 && frogNumSafe > 0){
		eventLogAry.push(deerNumSafe + " deer and " + frogNumSafe + " " + frogSafeGrammar + " failed, but escaped unharmed.");
	}else if(deerNumSafe > 0 && bunnyNumSafe > 0 && birdNumSafe > 0 && frogNumSafe == 0){
		eventLogAry.push(deerNumSafe + " deer, " + bunnyNumSafe + " " + bunnySafeGrammar + ", and " + birdNumSafe + " " + birdSafeGrammar + " failed, but escaped unharmed.");
	}else if(deerNumSafe > 0 && bunnyNumSafe > 0 && birdNumSafe == 0 && frogNumSafe > 0){
		eventLogAry.push(deerNumSafe + " deer, " + bunnyNumSafe + " " + bunnySafeGrammar + ", and " + frogNumSafe + " " + frogSafeGrammar + " failed, but escaped unharmed.");
	}else if(deerNumSafe > 0 && bunnyNumSafe == 0 && birdNumSafe > 0 && frogNumSafe > 0){
		eventLogAry.push(deerNumSafe + " deer, " + birdNumSafe + " " + birdSafeGrammar + ", and " + frogNumSafe + " " + frogSafeGrammar + " failed, but escaped unharmed.");
	}else if(deerNumSafe > 0 && bunnyNumSafe > 0 && birdNumSafe > 0 && frogNumSafe > 0){
		eventLogAry.push(deerNumSafe + " deer, " + bunnyNumSafe + " " + bunnySafeGrammar + ", " + birdNumSafe + " " + birdSafeGrammar + ", and " + frogNumSafe + " " + frogSafeGrammar + " failed, but escaped unharmed.");
	}else if(deerNumSafe == 0 && bunnyNumSafe > 0 && birdNumSafe == 0 && frogNumSafe == 0){
		eventLogAry.push(bunnyNumSafe + " " + bunnySafeGrammar + " failed, but escaped unharmed.");
	}else if(deerNumSafe == 0 && bunnyNumSafe > 0 && birdNumSafe > 0 && frogNumSafe == 0){
		eventLogAry.push(bunnyNumSafe + " " + bunnySafeGrammar + ", and " + birdNumSafe + " " + birdSafeGrammar + " failed, but escaped unharmed.");
	}else if(deerNumSafe == 0 && bunnyNumSafe > 0 && birdNumSafe == 0 && frogNumSafe > 0){
		eventLogAry.push(bunnyNumSafe + " " + bunnySafeGrammar + ", and " + frogNumSafe + " " + frogSafeGrammar + " failed, but escaped unharmed.");
	}else if(deerNumSafe == 0 && bunnyNumSafe > 0 && birdNumSafe > 0 && frogNumSafe > 0){
		eventLogAry.push(bunnyNumSafe + " " + bunnySafeGrammar + ", " + birdNumSafe + " " + birdSafeGrammar + ", and " + frogNumSafe + " " + frogSafeGrammar + " failed, but escaped unharmed.");
	}else if(deerNumSafe == 0 && bunnyNumSafe == 0 && birdNumSafe > 0 && frogNumSafe == 0){
		eventLogAry.push(birdNumSafe + " " + birdSafeGrammar + " failed, but escaped unharmed.");
	}else if(deerNumSafe == 0 && bunnyNumSafe == 0 && birdNumSafe > 0 && frogNumSafe > 0){
		eventLogAry.push(birdNumSafe + " " + birdSafeGrammar + ", and " + frogNumSafe + " " + frogSafeGrammar + " failed, but escaped unharmed.");
	}else if(deerNumSafe == 0 && bunnyNumSafe == 0 && birdNumSafe == 0 && frogNumSafe > 0){
		eventLogAry.push(frogNumSafe + " " + frogSafeGrammar + " failed, but escaped unharmed.");
	}else{
		console.log("none safe");
	}
	
	numAnimalsSafe = 0;
	bunnyNumSafe = 0, birdNumSafe = 0, deerNumSafe = 0, frogNumSafe = 0;
}

// These three make sure that the grammar is properly chosen for the animals
function animalDeadGrammarCheck(){
	if(bunnyNumDead == 1){
		bunnyDeadGrammar = "bunny";
	}else{
		bunnyDeadGrammar = "bunnies";
	}
	
	if(birdNumDead == 1){
		birdDeadGrammar = "bird";
	}else{
		birdDeadGrammar = "birds";
	}
	
	if(frogNumDead == 1){
		frogDeadGrammar = "frog";
	}else{
		frogDeadGrammar = "frogs";
	}
	//console.log(bunnyGrammar + " " + birdGrammar + " " + frogGrammar);
}

function animalTripGrammarCheck(){
	if(bunnyNumTripped == 1){
		bunnyTripGrammar = "bunny";
	}else{
		bunnyTripGrammar = "bunnies";
	}
	
	if(birdNumTripped == 1){
		birdTripGrammar = "bird";
	}else{
		birdTripGrammar = "birds";
	}
	
	if(frogNumTripped == 1){
		frogTripGrammar = "frog";
	}else{
		frogTripGrammar = "frogs";
	}
	//console.log(bunnyGrammar + " " + birdGrammar + " " + frogGrammar);
}

function animalSafeGrammarCheck(){
	if(bunnyNumSafe == 1){
		bunnySafeGrammar = "bunny";
	}else{
		bunnySafeGrammar = "bunnies";
	}
	
	if(birdNumSafe == 1){
		birdSafeGrammar = "bird";
	}else{
		birdSafeGrammar = "birds";
	}
	
	if(frogNumSafe == 1){
		frogSafeGrammar = "frog";
	}else{
		frogSafeGrammar = "frogs";
	}
	//console.log(bunnyGrammar + " " + birdGrammar + " " + frogGrammar);
}
//////////////////////////////////////////////////


//Handles neutral events, takes in a new roll from the eventChooser.
function noEventHandler(evtRoll) {
    switch (true) {
        //Predator
        case evtRoll < 35:
            eventLogAry.push("It's a wonderful day!");
            break;
        case evtRoll >= 35 && evtRoll < 45:
            eventLogAry.push("Sunny and warm, perfect for nature walking.");
            break;
        case evtRoll >= 45:
            eventLogAry.push("You pass by another animal.");
            break;
    }
}

//Two String arguments animal is either: 'frog','deer','bird','bunny', and stat is either: 'vitality', 'evasion', 'strength', 'athletics', 'instincts', 'lifespan'
// rolls for all animal count of the specific animal against their specified stat
// removes the number of animals that fail the roll
function badEventChecker(index, stat,flag){

	var playerRoll, gameRoll;
	
	var a = controller.getAnimalData();
	
	var e = a[index];
	
	var diff = controller.getAreaLevel() * 75;
	var diffmin = (controller.getAreaLevel() - 1) * 75;
	
	for(var i = 0; i < controller.getAreaLevel(); i++){
		diff = Math.ceil(diff * 1.33)
	}
	
	if(controller.getAreaLevel() == 1){
		diffmin = 1;
	} else {
		for(var i = 0; i < controller.getAreaLevel() - 1; i++){
			diffmin = Math.ceil(diffmin * 1.33)
		}
		diffmin = (diffmin * .85);
	}
	
	if(flag == true){
		diff = (diff*1.5);
		diffmin = (diffmin*1.5);
	}
	
    playerRoll = 0;
	gameRoll = roll(diff, diffmin);
		
	switch(stat){
       	case 'speed': playerRoll = roll(Math.round(e[2] + (25 * controller.getAreaLevel()), e[2]));
            break;
        case 'evasion': playerRoll = roll(Math.round(e[2] + (25 * controller.getAreaLevel()), e[3]));
            break;
        case 'strength': playerRoll = roll(Math.round(e[2] + (25 * controller.getAreaLevel()), e[4]));
            break;
	}
	
	// add up the difficulty and player roll to get the average later
	eventDiff += gameRoll;
	animalRoll += playerRoll;

	console.log(playerRoll + " " + gameRoll);
	if(playerRoll < gameRoll){
		var die = roll(100);
        var x = toCapitalize(e[0]);
        console.log("animal: " + x);
		if (die < 5){
			//eventLogAry.push(x +" was tragically lost.");
			deadTypeCheck(x);
			controller.queueRemove(index);
            return 2;
		} else if(die < 50){
            dataObj.animalTracks -= (dataObj.animalTracks/200)
			//eventLogAry.push(x +" tripped, you lost some tracks.");
			tripTypeCheck(x);
            return 1;
		} else {
			//eventLogAry.push(x +" didn't succeed, but they were luckily unhurt.");
            console.log("Safety");
			safeTypeCheck(x);
            return 0;
		}
	}
}


///////////////////////////////////////////////////
// ADDED BY THEOREN
// these three functions will increment the vars for how many animals are effected by each event

function deadTypeCheck(animal){
	if(animal == "Deer"){
		deerNumDead++;
	}else if(animal == "Bird"){
		birdNumDead++;
	}else if(animal == "Bunny"){
		bunnyNumDead++;
	}else if(animal == "Frog"){
		frogNumDead++;
	}
	numAnimalsDead++;
}

function tripTypeCheck(animal){
	if(animal == "Deer"){
		deerNumTripped++;
	}else if(animal == "Bird"){
		birdNumTripped++;
	}else if(animal == "Bunny"){
		bunnyNumTripped++;
	}else if(animal == "Frog"){
		frogNumTripped++;
	}
	numAnimalsTrip++;
}

function safeTypeCheck(animal){
	if(animal == "Deer"){
		deerNumSafe++;
        console.log("Safe deer");
	}else if(animal == "Bird"){
		birdNumSafe++;
	}else if(animal == "Bunny"){
		bunnyNumSafe++;
	}else if(animal == "Frog"){
		frogNumSafe++;
	}
	numAnimalsSafe++;
}

////////////////////////////////////////////////

function badStuffSort(badThing, badStuff) {
    badStuff[badThing]++;
}

function displayEvent(evt) {
    if (evt === null || evt === undefined) {
        interface.buttonArray.forEach(function (elem) {
            if (elem.name === "weatherAnimation") {
                elem.setSrc("image_resources/ClearSquare.png");
                //elem.setupAnim(22, 5, 5);
            }
            if (elem.name === "eventAnimation") {
                elem.setSrc("image_resources/ClearSquare.png");
                //elem.setupAnim(22, 5, 5);
            }
        });
    }
    if (evt === "rain storm") {
        interface.buttonArray.forEach(function (elem) {
            if (elem.name === "weatherAnimation") {
                elem.setSrc("image_resources/Event_Rain.png", "image_resources/Event_Rain.png", true);
                elem.setupAnim(22, 5, 5);
            }
        });
        dataObj.eventDisplayTimer = 5;
    } else if (evt === "snow storm") {
        interface.buttonArray.forEach(function (elem) {
            if (elem.name === "weatherAnimation") {
                elem.setSrc("image_resources/Event_Snow.png", "image_resources/Event_Snow.png", true);
                elem.setupAnim(22, 5, 5);
            }
        });
        dataObj.eventDisplayTimer = 5;
    } else if (evt === "predator") {
        interface.buttonArray.forEach(function (elem) {
            if (elem.name === "eventAnimation") {
                elem.setSrc("image_resources/Event_Snow.png", "image_resources/Event_Snow.png", true);
                elem.setupAnim(22, 5, 5);
            }
        });
        dataObj.eventDisplayTimer = 5;
    }
}