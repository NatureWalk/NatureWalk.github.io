//Howler object holds music, may use one Howl for all sound,
//need to figure out full structure
var music = new Howl({
  src: ['sounds/ambisynth_livedraft.mp3'],
  buffer: true,
  loop: true
});

//This should move elsewhere maybe.
music.play();


//mute_music makes a nicer fade than the native mute
var muted = false

function mute_music() {
	if (!muted) {
		music.fade(1,0,10)
		muted = true;
	}
	else {
		muted = false;
		music.fade(0,1,10)
	}
}

var click = new Howl({
	src: ['sounds/click.wav'],
	buffer: true
})