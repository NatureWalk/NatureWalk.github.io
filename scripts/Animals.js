

// ------- animal_data -------------------------------------------------------------------
// Contains all animal data. When servers and localstorage are implemented, holds all locally
// changed values before pushing to the server, and takes in all server data on login.

var animal_data = {
	frog_armor:0,
	frog_speed:5,
	frog_capacity:2,
	frog_lifespan:150,
	
	deer_armor:0,
	deer_speed:5,
	deer_capacity:2,
	deer_lifespan:150,
	
	bunny_armor:0,
	bunny_speed:5,
	bunny_capacity:2,
	bunny_lifespan:150,
	
	bird_armor:0,
	bird_speed:5,
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
// @todo timer functions for multipliers and effects

var animal = new function(){
	this.armor = 0;
	this.speed = 0;
	this.capacity = 0;
	this.lifespan = 0;
	this.identity = 'none';
	this.empowered = false;
	this.effects = {}
}

inheritsFrom(animal, Sprite);



var frog = function(xpos, ypos){
	this.armor = animal_data["frog_armor"];
	this.speed = animal_data["frog_speed"];
	this.capacity = animal_data["frog_capacity"];
	this.lifespan = animal_data["frog_lifespan"];
	this.width = 50;
	this.height = 50;
	this.name = 'frog';
	this.x = xpos;
	this.y = ypos;
	this.collidablewith = ['enemy']
}

inheritsFrom(frog, animal);

frog.prototype.update = function(){
	this.y += this.speed;
	//var usable_obj = quad.getObjects(this);
	if(collisionChecker(this.x, this.y, this.width, this.height, this.collidablewith, this.name, this.location)){
		//what happens if collision comes back true
		this.speed = (-this.speed);
		if(this.y < 0) {
			this.y = 0;
		} else if((this.y + this.height) > canvas.height){
			this.y = canvas.height - this.height;
		}
	}
    if (this.lifespan >= 0 && this.armor >= 0) {
        stepCount+=Math.abs(Math.round(this.speed/4));
        this.lifespan--;
    }
    if (this.lifespan <= 0) {
        this.setSrc("image_resources/ClearSquare.png");
        //ui_values.animalCounter[2]-=1;
    }
}
frog.prototype.draw = function(){
	ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
}


var bunny = function(xpos, ypos){
	this.armor = animal_data["bunny_armor"];
	this.speed = animal_data["bunny_speed"];
	this.capacity = animal_data["bunny_capacity"];
	this.lifespan = animal_data["bunny_lifespan"];
	this.width = 50;
	this.height = 50;
	this.name = 'bunny';
	this.x = xpos;
	this.y = ypos;
	this.collidablewith = ['enemy']
}

inheritsFrom(bunny, animal);

bunny.prototype.update = function(){
	this.x += this.speed;
	//var usable_obj = quad.getObjects(this);
	if(collisionChecker(this.x, this.y, this.width, this.height, this.collidablewith, this.name, this.location)){
		//what happens if collision comes back true
		this.speed = (-this.speed);
		if(this.x < canvas.width/2) {
			this.x = canvas.width/2;
		} else if((this.x + this.width) > canvas.width){
			this.x = canvas.width - this.width;
		} else {
			
		}
	}
    if (this.lifespan >= 0 && this.armor >= 0) {
        stepCount+=Math.abs(Math.round(this.speed/4));
        this.lifespan--;
    }
    if (this.lifespan <= 0) {
        this.setSrc("image_resources/ClearSquare.png");
        ui_values.animalCounter[3]--;
    }
}
bunny.prototype.draw = function(){
	ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
}



var deer = function(xpos, ypos){
	this.armor = animal_data["deer_armor"];
	this.speed = animal_data["deer_speed"];
	this.capacity = animal_data["deer_capacity"];
	this.lifespan = animal_data["deer_lifespan"];
	this.width = 50;
	this.height = 50;
	this.name = 'deer';
	this.x = xpos;
	this.y = ypos;
	this.collidablewith = ['enemy']
}
inheritsFrom(deer, animal);	

deer.prototype.update = function(){
	//console.log(this);
}
deer.prototype.draw = function(){
	ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
}



var bird = function(xpos, ypos){
	this.armor = animal_data["bird_armor"];
	this.speed = animal_data["bird_speed"];
	this.capacity = animal_data["bird_capacity"];
	this.lifespan = animal_data["bird_lifespan"];
	this.counter = 0;
	this.angle = Math.random()*2*Math.PI
	this.xspeed = Math.sin(this.angle) * animal_data["bird_speed"];
	this.yspeed = Math.cos(this.angle) * animal_data["bird_speed"];
	this.width = 50;
	this.height = 50;
	this.name = 'bird';
	this.x = xpos;
	this.y = ypos;
	this.collidablewith = ['enemy']
}

inheritsFrom(bird, animal);

bird.prototype.update = function(){
	this.counter++;
	if(this.counter == 60){
		this.counter = 0;
		this.angle = Math.random()*2*Math.PI
		this.xspeed = Math.sin(this.angle) * this.speed;
		this.yspeed = Math.cos(this.angle) * this.speed;
	}
	this.x += this.xspeed;
	this.y += this.yspeed;
    if (this.lifespan >= 0 && this.armor >= 0) {
        stepCount+=Math.abs(Math.round(this.speed/4));
        this.lifespan--;
    }
    if (this.lifespan <= 0) {
        this.setSrc("image_resources/ClearSquare.png");
        ui_values.animalCounter[0]--;
    }
}
bird.prototype.draw = function(){
	ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
}

var setupAnimal = function(ani){
	ani.image = new Image();
	if(ani.name == 'frog'){
    	ani.setSrc('https://img.clipartfest.com/d8753347c94b1e9a3409332726861e4a_free-frog-clipart-clip-art-frog-clipart_2400-2179.jpeg');
    	collidableObjects.push(ani);
	} else if(ani.name == 'bunny'){
		ani.setSrc('http://clipart-library.com/data_images/293266.jpg');
		collidableObjects.push(ani);
	} else if(ani.name == 'deer'){
		ani.setSrc('http://images.clipartpanda.com/deer-clip-art-deer05_Clipart_Free.png');
		collidableObjects.push(ani);
	} else if(ani.name == 'bird'){
		ani.setSrc('https://s-media-cache-ak0.pinimg.com/736x/77/0a/3f/770a3fc30e148471019fe729b311d3f0.jpg');
		collidableObjects.push(ani);
	}
	
}
	

