//////////////////////////////////////////////////////
// ADDED BY THEOREN
// vars to track how many animals succeed and fail each event
var bunnyNumDead = 0, birdNumDead = 0, deerNumDead = 0, frogNumDead = 0,
	bunnyNumTripped = 0, birdNumTripped = 0, deerNumTripped = 0, frogNumTripped = 0,
	bunnyNumSafe = 0, birdNumSafe = 0, deerNumSafe = 0, frogNumSafe = 0;

// vars for event difficulty, animal rolls, number of rolling animals, and how many total animals failed or succeeded each event	
var eventDiff = 0;
var animalRoll = 0;
//var numAnimalsRolled = 0;
var numAnimalsDead = 0;
var numAnimalsSafe = 0;
var numAnimalsTrip = 0;

/////////////////////////////////////////////////////

//List of bad events. 


//List of good events. 
var goodEvents = [
    "stepmulti", "extratracks", "clickable", "fountain", 
    "meadow", "preservation"
];

//Array that is referenced by the journal above the game map. 
var eventLogAry = [];

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

//Handles bad events, takes in a new roll from the eventChooser.
function badEventHandler(evtRoll) {
   var numAnimalsRolled = 0;
   var b = controller.getBadEvents();
   //badStuff = [# of Unharmed, # Of Trips, # of Deaths]
   var x, badStuff = [0, 0, 0];
   switch (true) {
    	case evtRoll <= 31:
    		console.log(b[0][0] + " " + b[0][1])
            displayEvent(b[0][0]);
    		for(var i = 0; i < controller.getNumAnimals(); i++){
				badStuffSort(badEventChecker(i,b[0][1]), badStuff);
                numAnimalsRolled++;
			}
            // Print the results of the event that occured
			if(controller.getNumAnimals() > 0){
				eventLogAry.push("A " + b[0][0] + " occured. It tested " + b[0][1] + ". Your average animal roll was " + Math.ceil(animalRoll/numAnimalsRolled) + ". The event difficulty was " + Math.ceil(eventDiff/numAnimalsRolled) + ".");
				animalSafePrinter();
				animalTrippedPrinter();
				animalDeathPrinter();
			}
			eventDiff = 0;
			animalRoll = 0;
    		break;
    	case evtRoll > 31 < 63:
    		console.log(b[1][0] + " " + b[1][1])
            displayEvent(b[1][0]);
    	    for(var i = 0; i < controller.getNumAnimals(); i++){
				badEventChecker(i,b[1][1]);
                numAnimalsRolled++;
			}
            // Print the results of the event that occured
			if(controller.getNumAnimals() > 0){
				eventLogAry.push("A " + b[1][0] + " occured. It tested " + b[1][1] + ". Your average animal roll was " + Math.ceil(animalRoll/numAnimalsRolled) + ". The event difficulty was " + Math.ceil(eventDiff/numAnimalsRolled) + ".");
				animalSafePrinter();
				animalTrippedPrinter();
				animalDeathPrinter();
			}
			eventDiff = 0;
			animalRoll = 0;
    		break;
    	case evtRoll >= 63 < 94:
    		console.log(b[2][0] + " " + b[2][1])
            displayEvent(b[2][0]);
    		for(var i = 0; i < controller.getNumAnimals(); i++){
				badEventChecker(i,b[2][1]);
                numAnimalsRolled++;
			}
            // Print the results of the event that occured
			if(controller.getNumAnimals() > 0){
				eventLogAry.push("A " + b[2][0] + " occured. It tested " + b[2][1] + ". Your average animal roll was " + Math.ceil(animalRoll/numAnimalsRolled) + ". The event difficulty was " + Math.ceil(eventDiff/numAnimalsRolled) + ".");
				animalSafePrinter();
				animalTrippedPrinter();
				animalDeathPrinter();
			}
			eventDiff = 0;
			animalRoll = 0;
    		break;
    	case evtRoll >= 94:
    		console.log(b[3][0] + " " + b[3][1])
            displayEvent(b[3][0]);
    		for(var i = 0; i < controller.getNumAnimals(); i++){
				badEventChecker(i,b[3][1],true);
                numAnimalsRolled++;
			}
           // Print the results of the event that occured
			if(controller.getNumAnimals() > 0){
				eventLogAry.push("A " + b[3][0] + " occured. It tested " + b[3][1] + ". Your average animal roll was " + Math.ceil(animalRoll/numAnimalsRolled) + ". The event difficulty was " + Math.ceil(eventDiff/numAnimalsRolled) + ".");
				animalSafePrinter();
				animalTrippedPrinter();
				animalDeathPrinter();
			}
			eventDiff = 0;
			animalRoll = 0;
    		break;
    	    
   }
   controller.removeAllQueue();
   console.log(controller.getNumAnimals());
}

//////////////////////////////////////////////////
// ADDED BY THEOREN
function animalDeathPrinter(){
	//console.log("number dead: " + numAnimalsDead);
	if(numAnimalsDead == 0){
		return;
	}else{
		eventLogAry.push(deerNumDead + " deer, " + bunnyNumDead + " bunnies, " + birdNumDead + " birds, and " + frogNumDead + " frogs were lost.")
		numAnimalsDead = 0;
		bunnyNumDead = 0, birdNumDead = 0, deerNumDead = 0, frogNumDead = 0;
	}
}

function animalTrippedPrinter(){
	//console.log("number trip: " + numAnimalsTrip);
	if(numAnimalsTrip == 0){
		return;
	}else{
		eventLogAry.push(deerNumTripped + " deer, " + bunnyNumTripped + " bunnies, " + birdNumTripped + " birds, and " + frogNumTripped + " frogs tripped and lost some tracks.")
		numAnimalsTrip = 0;
		bunnyNumTripped = 0, birdNumTripped = 0, deerNumTripped = 0, frogNumTripped = 0;
	}
}

function animalSafePrinter(){
	//console.log("number safe: " + numAnimalsSafe);
	if(numAnimalsSafe == 0){
		return;
	}else{
		eventLogAry.push(deerNumSafe + " deer, " + bunnyNumSafe + " bunnies, " + birdNumSafe + " birds, and " + frogNumSafe + " frogs failed, but managed to escape without harm.")
		numAnimalsSafe = 0;
		bunnyNumSafe = 0, birdNumSafe = 0, deerNumSafe = 0, frogNumSafe = 0;
	}
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
    
    console.log("Stat: " + stat);
    console.log(e)
	
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
        var x = toCapitalize(e[5]);
        //console.log(x);
		if (die < 5){
			//eventLogAry.push(x +" was tragically lost.");
            deadTypeCheck(e[0]);
			controller.queueRemove(index);
            return 2;
		} else if(die < 50){
            dataObj.animalTracks -= (dataObj.animalTracks/200)
			//eventLogAry.push(x +" tripped, you lost some tracks.");
            tripTypeCheck(e[0]);
            return 1;
		} else {
			//eventLogAry.push(x +" didn't succeed, but they were luckily unhurt.");
            safeTypeCheck(e[0]);
            return 0;
		}
	}
}

///////////////////////////////////////////////////
// ADDED BY THEOREN
// these three functions will increment the vars for how many animals are effected by each event

function deadTypeCheck(animal){
	if(animal == "deer"){
		deerNumDead++;
	}else if(animal == "bird"){
		birdNumDead++;
	}else if(animal == "bunny"){
		bunnyNumDead++;
	}else if(animal == "frog"){
		frogNumDead++;
	}
	numAnimalsDead++;
}

function tripTypeCheck(animal){
	if(animal == "deer"){
		deerNumTripped++;
	}else if(animal == "bird"){
		birdNumTripped++;
	}else if(animal == "bunny"){
		bunnyNumTripped++;
	}else if(animal == "frog"){
		frogNumTripped++;
	}
	numAnimalsTrip++;
    //console.log("Tripped Animals: " + numAnimalsSafe);
    //console.log("--> " + animal);
}

function safeTypeCheck(animal){
	if(animal == "deer"){
		deerNumSafe++;
	}else if(animal == "bird"){
		birdNumSafe++;
	}else if(animal == "bunny"){
		bunnyNumSafe++;
	}else if(animal == "frog"){
		frogNumSafe++;
	}
	numAnimalsSafe++;
    //console.log("Safe Animals: " + numAnimalsSafe);
    //console.log("--> " + animal);
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