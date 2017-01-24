

// ------- animal_data -------------------------------------------------------------------
// Contains all animal data. When servers and localstorage are implemented, holds all locally
// changed values before pushing to the server, and takes in all server data on login.

var animal_data = {
	frog_armor:0,
	frog_speed:1,
	frog_capacity:2,
	frog_lifespan:150,
	
	deer_armor:0,
	deer_speed:1,
	deer_capacity:2,
	deer_lifespan:150,
	
	bunny_armor:0,
	bunny_speed:1,
	bunny_capacity:2,
	bunny_lifespan:150,
	
	bird_armor:0,
	bird_speed:1,
	bird_capacity:2,
	bird_lifespan:150
	
	
	
}

// ------- animal class -----------------------------------------------------------------
// Base animal class. All animal classes inherit their base attributes from the basic
// animal class, but modify what data is fetched, the update function, and the identity
// property.
// Properties: 	
// Armor - The amount of hits an animal can take before dying.
// Speed - The speed at which the animal moves across the screen.
// Capacity - The number of items the animal can pick up before being removed from the map.
// Lifespan - The amount of time that the animal survives before being removed form the map.

// @todo steps?

var animal = new function(){
	this.armor = 0;
	this.speed = 0;
	this.capacity = 0;
	this.lifespan = 0;
	this.identity = 'none';
	this.empowered = false;
	
}

inheritsFrom(animal, Sprite);

var frog = new function(){
	this.armor = animal_data["frog_armor"];
	this.speed = animal_data["frog_speed"];
	this.capacity = animal_data["frog_capacity"];
	this.lifespan = animal_data["frog_lifespan"];
	this.identity = 'frog';
}

inheritsFrom(frog, animal);

var bunny = new function(){
	this.armor = animal_data["bunny_armor"];
	this.speed = animal_data["bunny_speed"];
	this.capacity = animal_data["bunny_capacity"];
	this.lifespan = animal_data["bunny_lifespan"];
	this.identity = 'bunny';
}

inheritsFrom(bunny, animal);


var deer = new function(){
	this.armor = animal_data["deer_armor"];
	this.speed = animal_data["deer_speed"];
	this.capacity = animal_data["deer_capacity"];
	this.lifespan = animal_data["deer_lifespan"];
	this.identity = 'deer';
}

inheritsFrom(deer, animal);	

var bird = new function(){
	this.armor = animal_data["bird_armor"];
	this.speed = animal_data["bird_speed"];
	this.capacity = animal_data["bird_capacity"];
	this.lifespan = animal_data["bird_lifespan"];
	this.identity = 'bird';
}

inheritsFrom(bird, animal);

