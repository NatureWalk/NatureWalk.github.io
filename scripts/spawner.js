// get a refrence to the canvas and its context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// a count of how many objects currently exist
var spawnCount = 0;

// the time in ms between object spawns
var spawnRate = 1500;

// time since last spawn
var lastSpawn = -1;

// this array holds all spawned object
var objects = [];

// save the starting time (used to calc elapsed time)
var startTime = Date.now();

// start animating
animate();

function randomNum (min, max) {
	var num = Math.random() * (max - min) + min;
	return Math.floor(num);	
}

function spawnRandomObject() {

    // select a random type for this new object
    var t;

    if (Math.random() < 0.50) {
        t = "red";
    } else {
        t = "blue";
    }

    // create the new object
    var object = {
        // set this objects type
        type: t,
        // set x randomly but at least 15px off the canvas edges
        x: Math.random() * (canvas.width - 30) + 15,
        // set y to start on the line where objects are spawned
        y: Math.random() * (canvas.height - 30) + 15,
    }

    // add the new object to the objects[] array
    objects.push(object);
	
	spawnCount += 1;
}



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

    // clear the canvas so all objects can be 
    // redrawn in new positions
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    for (var i = 0; i < objects.length; i++) {
        var object = objects[i];
        ctx.beginPath();
        ctx.arc(object.x, object.y, 8, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = object.type;
        ctx.fill();
    }

}