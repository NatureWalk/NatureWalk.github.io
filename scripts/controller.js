/**
 * @author Duunko
 */



temp_storage = [];
temp_storage['frog'] = 1;
temp_storage['bunny'] =1;
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
 * BONUSES: Frogs have advantage on all events that require Speed, and get double steps on MARSH
 *          Deer have advantage on all events that require Strength, get double steps on Forest
 *          Birds have advantage on all events that require Evasion, get double steps on Plains
 *          Bunnies get double steps always but they have no other bonus
 * 
 */

animal_data = [];
animal_data['frog'] = [1.6, 1.4, 1.2];
animal_data['bunny'] = [1.4, 1.4, 1.2];
animal_data['deer'] = [1.4, 1.2, 1.6];
animal_data['bird'] = [1.4, 1.6, 1.2];



function animalClass(type){
	this.type = type;
	this.level = 0;
	
	this.setLevel = function(lv){
		this.level = lv;
	}
	
	this.levelUp = function(){
		this.level += 1;
	}
}


/* MASTER CONTROLLER OBJECT
 *
 * The master controller handles all visual aspects of the background math and
 * queries the server to ensure that the data is processed correctly.
 * 
 * FUNCTIONS:
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
	
	
	//this.lifespans = new p_queue();
	
	this.animations = [];
	
	this.query = function(){
		
	}
	
	this.baseLevelUp = function(animal){
		this.base_levels[animal] += 1;
	}
	
	this.levelUpAnimal = function(num){
		this.animals[num].levelUp();
	}
	
	this.addAnimal = function(animal){
		if(this.animals.length <= this.party_size) {
			var ani = new animalClass(animal);
			ani.setLevel(this.base_levels[animal]);
			this.animals.push(ani);
			return true;
		} else {
			return false;
		}
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
			dat.push(animals[i].type)
			for(var j = 0; j < 3; j++){
				var stat = 1;
				for(var k = 0; k < animals[i].level){
					stat = math.ciel(stat * animal_data[j]);
				}
				dat.push(stat);
			}
			data.push(dat);
		}
		return data;
	}
	
	this.getAnimalBaseLevel = function(animal){
		return this.base_levels[animal];
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
