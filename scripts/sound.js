//Object for manipulating sounds

var volume = 0

//Object which holds all the sound objects for the game
var soundManager = function() {
	this.muted = false
	this.music = new Howl({
	  src: ['sounds/ambisynth_livedraft.mp3'],
	  buffer: true,
	  loop: true,
	  //onend: function() {volume = 0.1}
	})

	this.click = new Howl({
		src: ['sounds/click.wav'],
		volume: 0.5,
		buffer: true
	})
	this.up1 = new Howl({
		src: ['sounds/up1.wav'],
		volume: 0.1,
		buffer:true
	})
}

soundManager.prototype.update = function() {}

soundManager.prototype.draw = function() {}

soundManager.prototype.mute_music = function() {
	if (!this.muted) {
		this.music.fade(volume,0,10)
		console.log(this.music.volume())
		this.muted = true;
	}
	else {
		this.muted = false;
		this.music.fade(0,volume,10)
		console.log(this.music.volume())
		
	}
}