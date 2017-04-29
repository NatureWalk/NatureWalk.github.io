/**
 * @author Duunko
 */



temp_storage = [];
temp_storage['frog'] = 1;
temp_storage['bunny'] = 1;
temp_storage['bird'] = 1;
temp_storage['deer'] = 1;
animal_types = ['bird', 'deer', 'frog', 'bunny'];

template_storage = temp_storage;
for(var i = 0; i < animal_types.length; i++){
	template_storage[animal_types[i]] = 0;
}

/* ANIMAL PROGRESSION MULTIPLIERS
 * 
 * Ordering: Speed, Evasion, Strength
 * 
 * CURRENT VERSION: Only three stats, but each animal type has hard coded bonuses
 * 
 * BONUS IDEAS: Frogs have advantage on all events that require Speed, and get double steps on MARSH
 *              Deer have advantage on all events that require Strength, get double steps on Forest
 *              Birds have advantage on all events that require Evasion, get double steps on Plains
 *              Bunnies get double steps always but they have no other bonus
 * 
 */

animal_data = [];
animal_data['frog'] = [1.6, 1.4, 1.2];
animal_data['bunny'] = [1.4, 1.4, 1.2];
animal_data['deer'] = [1.4, 1.2, 1.6];
animal_data['bird'] = [1.4, 1.6, 1.2];

lifetime = 8;



function animalClass(type){
	this.type = type;
	this.level = 0;
	this.canDie = true;
	this.deathTime = Date.now() + (lifetime*60*60*1000);
	this.name = type;
	
	this.setLevel = function(lv){
		this.level = lv;
	}
	
	this.levelUp = function(){
		this.level += 1;
	}
}


badEvents = [
    ["predator", 'evasion'], ["river", 'strength'], ["ravine", 'strength'],['Snow storm', 'speed'],
    ["treefall", 'evasion'], ["mudslide", 'speed'], ["lightning", 'speed'], 
    ["tornado", 'speed'], ["sinkhole", 'strength'], ["forestfire", 'speed'], ["drought", 'strength'], 
    ["heatwave", 'strength'], ["flashflood", 'speed'], ["meteor", 'evasion'], 
    ["eruption", 'speed'], ["hunter", 'evasion'], ["invasive speces", 'evasion'], 
];

badEventsWinterDay = [["snow storm", 'speed']["scarce food", 'strength'], ["frozen lake", 'evasion']];
badEventsWinterNight = [["low temperatures", "strength"], ["snowslide", "speed"], ["snow storm", "speed"]];
//badEventsSpringDay = [["treefall", "evasion"], ["mudslide", "speed"], ["hunter", "evasion"]];
badEventsSpringDay = [["treefall", "evasion"], ["rain storm", "strength"], ["predator", "evasion"]];
badEventsSpringNight = [["river", "strength"], ["sinkhole", "strength"], ["predator", "evasion"]];
badEventsSummerDay = [["heat wave", "strength"], ["drought", "strength"], ["wildfire", "speed"]];
badEventsSummerNight = [["lightning storm", "speed"], ["flash flood", "speed"], ["invasive species", "evasion"]];
//badEventsFallDay = [["wind storm", "strength"], ["epidemic", 'strength'], ['hunter', 'evasion']];
badEventsFallDay = [["rain storm", "strength"], ["epidemic", 'strength'], ['hunter', 'evasion']];
badEventsFallNight = [["predator", 'evasion'], ['fog', 'speed'], ['rain storm', 'strength']];
badEventsCatastrophe = [["tornado", 'speed'], ['meteor', 'evasion'], ['eruption', 'speed']];


frogNames = ["Finn", "Finley", "Felix", "Francisco", "Finnegan", "Felipe", "Ford",
"Francis", "Franklin", "Flynn", "Forrest", "Fletcher", "Farah", "Ferris", "Fernando",
"Federico", "Foster", "Flora", "Fiona", "Fritz", "Francine", "Fabio", "Fern", "Fitzgerald",
"Fabrizio", "Florian", "Fenton", "Fergus", "Flower", "Felton", "Fenix", "Franz", "Fraser",
"Fleur", "Francois", "Finian", "Furman", "Funsho", "Matthew", "Fritzy", "Frita", "Froto",
"Frisco", "Frenchie", "Freeman", "Freemont", "Fredo", "Fabian", "Fenwick", "Freshia", "Padda", "Bretkose", "Granoto", "Kikker",
"Rana", "Baki", "Zaba", "Konn", "Rano", "Chura", "Trevor", "Kermit", "Robin", "Keroppi", "Frogger",
"Dat Boi", "HypnoToad", "Bighead", "Slippy"];
deerNames = ["Dre", "Cervol", "Osa", "Hjort",
"Dakota", "Darius", "Dash", "Deana", "Dorian", "Delilah", "Daphne", "Dell", "Delbert", "Doris",
"Derrick", "Dan", "Dax", "Dexter", "Diane", "Diana", "Dabney", "Drake", "Draco", "Dunston", "Dudley",
"Damien", "Dora", "Daedra", "Dale", "Dean", "Dolby", "Dinah", "Daeton", "Drago", "Dahkim", "Dalton",
"Dante", "Daicey", "Dione", "Dailee", "Dane", "Daisy", "Dasha", "DeShaun", "Daya", "Daken",
"Dakeem", "Dalaney", "Dalbey", "Dalek", "Dilbert", "Daliza", "Dalton", "Dalmer", "Dalsgaard",
"Daluchi", "Dalvyn", "Damani", "Damar", "DaMarco", "Buck Henry", "Doe Lewis", "Fawn Hamm",
"Alexandeer", "Bambi", "Mean Doe Greene", "Mark Buckerberg", "Fawnie Lee Miller", "Fawnathan Demme"];
bunnyNames = ["Raheem", "Ronaldo", "Ryan", "Riley", "Ripley", "Rami", "Raymond", "Ravi", "Robert", "Rob", "Robbie",
"Rebecca", "Rene", "Rey", "Ray", "Roland", "Rachel", "Rachelle", "Rochelle", "Rory", "Racen", "Racquel", "Radcliffe",
"Radford", "Randolf", "Randle", "Raina", "Rain", "Royal", "Ron", "Rip", "Reagan", "Reign",
"Rylan", "Rhys", "Raleigh", "Raley", "RaeLynn", "Raven", "Rafael", "Rafaela", "Rafah", "Raffi",
"Raffa", "Raffieli", "Rafianzie", "Raya", "Ritter", "Ritz", "Rumor", "Ritzbelle", "River", "Riverly",
"Ralphie", "Riverson", "Rivian", "Ruxton", "Rihanna", "Riyaz", "Roberto", "Bigwig", "Bunnicula", "Fiver",
"Harvey", "Max", "Ruby", "Pantoufle", "Frank", "Caerbannog"];
birdNames = ["Baara", "Barack", "Banyan", "Bill", "Billy", "Barb", "Babs", "Barbara", "Barclay", "Bardot",
"Barrington", "Banjo", "Balthazar", "Brian", "Bradley", "Bryce", "Bruce", "Brieanne", "Bianca",
"Barbie", "Banksy", "Binky", "Bitsy", "Betsy", "Betty", "Betty", "Bernie", "Bernard", "Banjo", "Bart", "Bartholemew",
"Brandon", "Brynn", "Bobby", "Bob", "Bert", "Bertrum", "Brick", "Bruce", "Bailey", "Bailor", "Brayden", "Bode",
"Benson", "Bentley", "Bennet", "Belinda", "Beau", "Beatrix", "Bea", "Belinda", "Beckham", "Bridget",
"Brinley", "Bristol", "Brett", "Brock", "Byron", "Bruno", "Broderick", "Sweet Dee", "Phoenixperson", "Joel McQuail",
"Wil Tweeton", "Stephen Squawking", "Zoidbird", "Flight Schrute", "Cyberbird", "Meryl Cheep"];



function nameFrog(){
	var num = Math.floor((Math.random() * 68) + 0);
	return frogNames[num];
}

function nameBunny(){
	var num = Math.floor((Math.random() * 68) + 0);
	return bunnyNames[num];
}

function nameBird(){
	var num = Math.floor((Math.random() * 68) + 0);
	return birdNames[num];
}

function nameDeer(){
	var num = Math.floor((Math.random() * 68) + 0);
	return deerNames[num];
}



/* MASTER CONTROLLER OBJECT
 *
 * The master controller handles all visual aspects of the background math and
 * queries the server to ensure that the data is processed correctly.
 * 
 * FUNCTIONS:
 *           query: DO NOT USE, DESIGNED FOR QUERYING THE SERVER
 *           baseLevelUp: Increases the base level of an animal type by one
 *           levelUpAnimal: Levels up the animal at a particular location in the animal array
 *           addAnimal: adds a new animal of a type (string) specified to the animal array. Returns true
 *                      on success and false if adding an animal would exceed the max party size.
 *           partySizeUp: increases the max party size by one
 *           removeAnimal: removes the animal at a particular position in the array from the array
 *           getAnimalBaseLevel: returns the base level of a particular animal type
 *           getNumAnimals: returns the total number of animals
 *           getAnimalData: returns a 2D array of animal data. Organized thusly
 *                          [
 *                           [animal type, animal level, Speed, Evasion, Strength, name]
 *                           ...
 *                          ]
 *			 getBaseData: returns a 1D Array of base animal stats.
 							[Speed, Evasion, Strength]
 * 
 * 
 * 
 * 
 * 
 */
function master_controller() {
	this.base_levels = [];
	this.base_levels['frog'] = 1;
	this.base_levels['bunny'] =1;
	this.base_levels['bird'] = 1;
	this.base_levels['deer'] = 1;
	
	this.animals = [];
	
	this.party_limit = 5;
	
	
	this.timer = 0;
	
	this.area_level = 1;
	this.areaSeason = 'spring';
	
	this.usableEvents = badEventsSpringDay.slice();
	var evR = roll(2,0);
	this.usableEvents.push(badEventsCatastrophe[evR]);
	
	
	
	this.removalQ = [];
	
	//this.lifespans = new p_queue();
	
	this.animations = [];
	
	this.getAreaLevel = function(){
		return this.area_level;
	}
	
	this.areaLevelUp = function(){
		this.area_level+=1;
		if(this.area_level % 10 == 1){
			switch(this.areaSeason){
				case 'spring':
				    this.areaSeason = 'summer';
				    break;
				case 'summer':
				    this.areaSeason = 'fall';
				    break;
				case 'fall':
				    this.areaSeason = 'winter'
				    break;
				case 'winter': 
				    this.areaSeason = 'spring';
				    break;
			}
		}
		switch(this.areaSeason){
				case 'spring':
				    if(this.areaLevel % 2 == 0){
				    	this.usableEvents = badEventsSpringNight.slice();
				    } else {
				    	this.usableEvents = badEventsSpringDay.slice();
				    }
				    break;
				case 'summer':
				    if(this.areaLevel % 2 == 0){
				    	this.usableEvents = badEventsSummerNight.slice();
				    } else {
				    	this.usableEvents = badEventsSummerDay.slice();
				    }
				    break;
				case 'fall':
				    if(this.areaLevel % 2 == 0){
				    	this.usableEvents = badEventsFallNight.slice();
				    } else {
				    	this.usableEvents = badEventsFallDay.slice();
				    }
				    break;
				case 'winter': 
				    if(this.areaLevel % 2 == 0){
				    	this.usableEvents = badEventsWinterNight.slice();
				    } else {
				    	this.usableEvents = badEventsWinterDay.slice();
				    }
				    break;
		}
	var cata = roll(2,0);
	//this.usableEvents.push(badEventsCatastrophe[cata]);
	}
	
	this.areaLevelDown = function(){
		this.area_level-=1;
		if(this.area_level % 10 == 0){
			switch(this.areaSeason){
				case 'spring':
				    this.areaSeason = 'winter';
				    break;
				case 'summer':
				    this.areaSeason = 'spring';
				    break;
				case 'fall':
				    this.areaSeason = 'summer'
				    break;
				case 'winter': 
				    this.areaSeason = 'fall';
				    break;
			}
		}
		switch(this.areaSeason){
				case 'spring':
				    if(this.areaLevel % 2 == 0){
				    	this.usableEvents = badEventsSpringNight.slice();
				    } else {
				    	this.usableEvents = badEventsSpringDay.slice();
				    }
				    break;
				case 'summer':
				    if(this.areaLevel % 2 == 0){
				    	this.usableEvents = badEventsSummerNight.slice();
				    } else {
				    	this.usableEvents = badEventsSummerDay.slice();
				    }
				    break;
				case 'fall':
				    if(this.areaLevel % 2 == 0){
				    	this.usableEvents = badEventsFallNight.slice();
				    } else {
				    	this.usableEvents = badEventsFallDay.slice();
				    }
				    break;
				case 'winter': 
				    if(this.areaLevel % 2 == 0){
				    	this.usableEvents = badEventsWinterNight.slice();
				    } else {
				    	this.usableEvents = badEventsWinterDay.slice();
				    }
				    break;
		}
	var cata = roll(2,0);
	this.usableEvents.push(badEventsCatastrophe[cata]);
	}
	
	this.getBadEvents = function(){
		return this.usableEvents;
	}
	
	this.query = function(){
		for(var i = 0; i < this.animals.length; i++){
			if(this.animals[i].canDie == true){
				if(Date.now() >= this.animals[i].deathTime){
					var arr = this.animals[i].name.concat(" died peacefully of old age.")
					eventLogAry.push(arr);
					//this.removeAnimal[i];
					//i--;
					this.queueRemove(i);
				}
			}
		}
		this.removeAllQueue();
		
		
	}
	
	this.baseLevelUp = function(animal){
		this.base_levels[animal] += 1;
	}
	
	this.levelUpAnimal = function(num){
		this.animals[num].levelUp();
	}
	
	this.partySizeUp = function(){
		this.party_limit += 1;
	}
	
	this.addAnimal = function(animal){
		if(this.animals.length < this.party_limit) {
			var ani = new animalClass(animal);
			console.log(animal);
			ani.setLevel(this.base_levels[animal]);
			//taken from http://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
			//console.log("animal type = " + ani.type);
			
			var text = "";
		    /*var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		    for( var i=0; i < 5; i++ )
		        text += possible.charAt(Math.floor(Math.random() * possible.length));
		    */
		    switch(ani.type) {
    			case "frog":
        			text = nameFrog();
        			break;
    			case "bunny":
        			text = nameBunny();
        			break;
        		case "bird":
        			text = nameBird();
        			break;
        		case "deer":
        			text = nameDeer();
        			break;
    			default:
        			text = "random name";
			}
		    
		      
		    ani.name= text;
			this.animals.push(ani);
			return true;
		} else {
			return false;
		}
        
	}
	
	this.queueRemove = function(index){
		this.removalQ.push(index);
	}
	
	this.removeAllQueue = function(){
		var numInd = 0;
		for(var i = 0; i < this.removalQ.length; i++){
			this.removeAnimal(this.removalQ[i] - numInd);
			numInd++;
		}
		this.removalQ = [];
	}
	
	this.removeAnimal = function(num){
		if(num < this.animals.length){
			this.animals.splice(num,1);
			return true;
		} else {
			return false;
		}
	}
	
	this.getAnimalData = function(){
		var data = [];
		for(var i = 0; i < this.animals.length; i++){
			var dat = [];

			dat.push(this.animals[i].type)
			dat.push(this.animals[i].level)
			for(var j = 0; j < 3; j++){
				var stat = 1;
				for(var k = 0; k < this.animals[i].level; k++){
					stat = Math.ceil(stat * animal_data[this.animals[i].type][j]);
				}
				dat.push(stat);
			}
			dat.push(this.animals[i].name)
			data.push(dat);
		}
		return data;
	}

	this.getBaseData = function(animal) {
        var data = [];
        data.push(this.base_levels[animal]);
        for(var i = 0; i < 3; i++){
            var stat = 1;
            for(var k = 0; k < this.base_levels[animal]; k++){
                stat = Math.ceil(stat * animal_data[animal][i]);
            }
            data.push(stat);
        }
        return data;
    }

	
	this.getAnimalBaseLevel = function(animal){
		return this.base_levels[animal];
	}
	
	this.getNumAnimals = function(){
		return this.animals.length;
		
	}
	
	//get the amount of a certain animal
	this.getAnimalCount = function(animal) {
		var count = 0;
		for (var a=0; a < this.getNumAnimals();a++ ) {
			if (this.animals[a].type == animal) count++;
		}
		return count;
	}

	this.update = function() {
		this.timer++;
		//console.log(this.lifespans)
		if(this.timer == 15){
			this.query();
			this.timer = 0;	
		}	
		
	}
	
	this.draw = function() {

	}
}

function fact(x) {
   if(x==0) {
      return 1;
   }
   return x * fact(x-1);
}