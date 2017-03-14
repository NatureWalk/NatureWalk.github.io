/**
 * @author Duunko
 */


var assoc = {
	'lv_1': 1,
	'lv_2': 2,
	'lv_3': 3,
	'lv_4': 4,
	'lv_5': 5,
}

temp_storage = [];
temp_storage['frog'] = 1;
temp_storage['bunny'] =1;
temp_storage['bird'] = 1;
temp_storage['deer'] = 1;
console.log(temp_storage);
animal_types = ['frog', 'bunny', 'bird', 'deer'];
console.log(animal_types);

template_storage = temp_storage;
for(var i = 0; i < animal_types.length; i++){
	template_storage[animal_types[i]] = 0;
}



animal_data = [];
animal_data['frog'] = [];
animal_data['frog'][1] = [1,1,1,1,1,1500];
animal_data['frog'][2] = [2,2,2,2,2,1500];
animal_data['frog'][3] = [3,3,3,3,3,1500];
animal_data['frog'][4] = [4,4,4,4,4,1500];
animal_data['frog'][5] = [5,5,5,5,5,1500];
animal_data['bunny'] = [];
animal_data['bunny'][1] = [1,1,1,1,1,1500];
animal_data['bunny'][2] = [2,2,2,2,2,1500];
animal_data['bunny'][3] = [3,3,3,3,3,1500];
animal_data['bunny'][4] = [4,4,4,4,4,1500];
animal_data['bunny'][5] = [5,5,5,5,5,1500];
animal_data['deer'] = [];
animal_data['deer'][1] = [1,1,1,1,1,1500];
animal_data['deer'][2] = [2,2,2,2,2,1500];
animal_data['deer'][3] = [3,3,3,3,3,1500];
animal_data['deer'][4] = [4,4,4,4,4,1500];
animal_data['deer'][5] = [5,5,5,5,5,1500];
animal_data['bird'] = [];
animal_data['bird'][1] = [1,1,1,1,1,1500];
animal_data['bird'][2] = [2,2,2,2,2,1500];
animal_data['bird'][3] = [3,3,3,3,3,1500];
animal_data['bird'][4] = [4,4,4,4,4,1500];
animal_data['bird'][5] = [5,5,5,5,5,1500];

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
				console.log(this.pending_loss[animal_types[i]]);
				this.animal_count[animal_types[i]] += this.pending_animals[animal_types[i]] + this.pending_loss[animal_types[i]];
				for(var j = 0; j < this.pending_animals[animal_types[i]]; j++){
					this.lifespans.push(animal_data[animal_types[i]][this.levels[animal_types[i]]][5], animal_types[i]);
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
	}
	
	this.addAnimal = function(animal){
		this.pending_animals[animal] += 1;
	}
	
	this.removeAnimal = function(animal){
		this.pending_loss[animal] -= 1;
	}
	
	this.getAnimalData = function(animal){
		return animal_data[animal][this.levels[animal]];
	}
	
	this.update = function() {
		this.timer++;
		if(this.timer == 15){
			this.query();
			this.timer = 0;	
			console.log(this.lifespans);
		}	
		
	}
	
	this.draw = function() {

	}
}