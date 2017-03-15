/**
 * @author Duunko
 */



temp_storage = [];
temp_storage['frog'] = 1;
temp_storage['bunny'] =1;
temp_storage['bird'] = 1;
temp_storage['deer'] = 1;
console.log(temp_storage);
animal_types = ['bird', 'deer', 'frog', 'bunny'];
console.log(animal_types);

template_storage = temp_storage;
for(var i = 0; i < animal_types.length; i++){
	template_storage[animal_types[i]] = 0;
}

/* ANIMAL PROGRESSION MULTIPLIERS
 * 
 * Ordering: Vitality, Evasion, Strength, Athletics, Instinct, Lifespan
 * 
 */

animal_data = [];
animal_data['frog'] = [1.7, 1.2, 1.5, 1.5, 1.2, 1.5];
animal_data['bunny'] = [1.2, 1.5, 1.2, 1.7, 1.5, 1.5];
animal_data['deer'] = [1.5, 1.5, 1.5, 1.5, 1.5, 1.5];
animal_data['bird'] = [1.2, 1.7, 1.2, 1.2, 1.7, 1.3];


console.log(animal_data['bunny']);

/* MASTER CONTROLLER OBJECT
 *
 * The master controller handles all visual aspects of the background math and
 * queries the server to ensure that the data is processed correctly.
 * 
 * FUNCTIONS:
 * 
 */
function master_controller() {
	this.levels = [];
	this.levels['frog'] = 1;
	this.levels['bunny'] =1;
	this.levels['bird'] = 1;
	this.levels['deer'] = 1;
	this.animal_count = [];
	this.animal_count['frog'] = 1;
	this.animal_count['bunny'] =1;
	this.animal_count['bird'] = 1;
	this.animal_count['deer'] = 1;
	this.pending_animals = [];
	this.pending_animals['frog'] = 0;
	this.pending_animals['bunny'] =0;
	this.pending_animals['bird'] = 0;
	this.pending_animals['deer'] = 0;
	this.pending_loss = [];
	this.pending_loss['frog'] = 0;
	this.pending_loss['bunny'] =0;
	this.pending_loss['bird'] = 0;
	this.pending_loss['deer'] = 0;
	this.timer = 0;
	this.lifespans = new p_queue();
	this.lifespans.push(150, 'bird');
	this.lifespans.push(150, 'frog');
	this.lifespans.push(150, 'bunny');
	this.lifespans.push(150, 'deer');
	
	this.animations = [];
	
	this.query = function(){
		temp_storage = this.levels;
		for(var i = 0; i < this.lifespans.length; i++){
			this.lifespans.reduce(i, 15);
		}
		while(true){
			if(this.lifespans.length == 0){
				break
			}
			if(this.lifespans.head() <= 0){
				var temp = this.lifespans.pop();
				this.pending_loss[temp]--;
			} else {
				break;
			}
		}
		for(var i = 0; i < animal_types.length; i++){
			if(this.pending_animals[animal_types[i]] != 0 || this.pending_loss[animal_types[i]] != 0){
				this.animal_count[animal_types[i]] += this.pending_animals[animal_types[i]] + this.pending_loss[animal_types[i]];
				if(this.animal_count[animal_types[i]] < 0){
					this.animal_count[animal_types[i]] = 0;
				}
				for(var j = 0; j < this.pending_animals[animal_types[i]]; j++){
					var life = this.getAnimalData(animal_types[i]);
					this.lifespans.push(life[5], animal_types[i]);
				}
			}
		
		}
		this.pending_animals = template_storage;
		this.pending_loss = [];
		this.pending_animals['frog'] = 0;
		this.pending_animals['bunny'] =0;
		this.pending_animals['bird'] = 0;
		this.pending_animals['deer'] = 0;
		this.pending_loss['frog'] = 0;
		this.pending_loss['bunny'] =0;
		this.pending_loss['bird'] = 0;
		this.pending_loss['deer'] = 0;
	}
	
	this.levelUp = function(animal){
		this.levels[animal] += 1;
		console.log(this.levels);
	}
	
	this.addAnimal = function(animal){
		this.pending_animals[animal] += 1;
	}
	
	this.removeAnimal = function(animal, count){
		this.pending_loss[animal] -= count;
		for(var i = 0; i < count; i++){
		    this.lifespans.popNext(animal);
		}
	}
	
	this.getAnimalData = function(animal){
		stats = animal_data[animal].slice();
		if(this.levels[animal] == 1){
			return [1,1,1,1,1,1500];
		} else {
			for(var i = 0; i < stats.length; i++){
				if(i == 5){
					multi = 1500
				} else {
				    var multi = 1;
				}
				for(var j = 0; j < this.levels[animal] - 1; j++){
					multi = Math.ceil(multi * stats[i]);
				}
				stats[i] = multi;
			} 
		return stats;
		}
	}
	
	this.getAnimalCount = function(animal) {
		return this.animal_count[animal];
	}
	
	this.getAnimalLevel = function(animal){
		return this.levels[animal];
	}
	
	this.getAnimalTotal = function(animal){
		var val = 0;
		for(var i = 0; i < 4; i++){
			val += this.getAnimalCount(animal_types[i]);
		}
		return val;
	}
	
	this.update = function() {
		this.timer++;
		console.log(this.lifespans)
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
