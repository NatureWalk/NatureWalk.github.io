// ------- powerup class --------
// The multipliers that animals will be able to pick up.

var powerup = new function() {
    this.multiplier = 0;
}

inheritsFrom(powerup, Sprite);

powerup.prototype.activated = function() {
    console.log("Activated powerup:"+this.name)
}

powerup.prototype.empower = function(animal) {
    animal.empowered = true;
}

function spawnMultiplier() {

}



//The special skills unlocked from milestones
//@todo inherit from button?
var specials = [];

//Global speed boost
var sp_01;
inheritsFrom(sp_01, powerup);
sp_01.name = "global speed boost";

sp_01.activated = function() {
    //for all animals, animal.empower
}

sp_01.empower = function(animal) {
    animal.speed += 1;
}

specials.push(sp_01);

//Invincibility to one animal
var sp_02;
inheritsFrom(sp_02, powerup);
sp_02.name = "invincibility on animal";

sp_02.activated = function() {
    //this.empower(selectAnimal())
}

sp_02.empower = function(animal) {
	animal.makeInvincible()
}

