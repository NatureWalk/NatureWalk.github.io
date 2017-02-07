// a count of how many objects currently exist
var spawnCount = 0;

// the time in ms between object spawns
var spawnRate = 1500;

// time since last spawn
var lastSpawn = -1;

// this array holds all spawned objects
var objects = [];

// save the starting time (used to calc elapsed time)
var startTime = Date.now();

// start drawing
animate();

function randomNum (min, max) {
	var num = Math.random() * (max - min) + min;
	return Math.floor(num);	
}

function spawnRandomObject() {

    // select a random type (color) for this new object
    var t;

    if (Math.random() < 0.50) {
        t = "red";
    } else {
        t = "blue";
    }

    // create the new object
    var object = { //can have a variety of parameters for the objects
        // set this objects type
        type: t,
        // set x randomly but at least 15px off the canvas edges
        x: Math.random() * (canvas.width - 30) + 15,
        // set y to start on the line where objects are spawned
        y: Math.random() * (canvas.height - 30) + 15,
    }

    // add the new object to the objects[] array
	// can later be changed to use the full engine
    objects.push(object);
	
	spawnCount += 1;
}

/*function removeObject() {
	if(collision code) {
		// splice attempts to add in a new element, but you can use it to remove if you leave out parameters.
		objects.splice(0, the one that was clicked);
	}
}*/

function animate() {

    // get the elapsed time
    var time = Date.now();

    // see if its time to spawn a new object
    if ((time > (lastSpawn + spawnRate)) && spawnCount < 5) {
        lastSpawn = time;
        spawnRandomObject();
    }

    // request another animation frame
    requestAnimationFrame(animate);


    for (var i = 0; i < objects.length; i++) {
        var object = objects[i];
		ctx.beginPath();
		ctx.rect(object.x, object.y, 10, 10);
		ctx.closePath();
        ctx.fillStyle = object.type;
        ctx.fill();
    }

}