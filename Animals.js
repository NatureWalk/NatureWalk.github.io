
// ------- animal class -----------------------------------------------------------------
// Base animal class. All animal classes inherit their base attributes from the basic
// animal class, but modify what data is fetched, the update function, and the identity
// property.
// Properties: 	
// Armor - The amount of hits an animal can take before dying.
// Speed - The speed at which the animal moves across the screen.
// Capacity - The number of items the animal can pick up before being removed from the map.
// Lifespan - The amount of time that the animal survives before being removed form the map.

var animal = new function(){
	this.armor = 0;
	this.speed = 0;
	this.capacity = 0;
	this.lifespan = 0;
	this.identity = 'none';
	
}

inheritsFrom(animal, Sprite);

var frog = new function(){
	this.armor = 
}
	


// ------- animal_data -------------------------------------------------------------------
// Contains all animal data. When servers and localstorage are implemented, holds all locally
// changed values before pushing to the server, and takes in all server data on login.

animal_data = {
	frog:{
		armor:0,
		speed:1,
		lifespan: 150 //Arbitrary for testing
	},
	bunny:{
		armor:0,
		speed:1,
		lifespan: 150 //Arbitrary for testing
	},
	deer:{
		armor:0,
		speed:1,
		lifespan: 150 //Arbitrary for testing
	},
	bird:{
		armor:0,
		speed:1,
		lifespan: 150 //Arbitrary for testing
	}
}
