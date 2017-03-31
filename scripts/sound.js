//Object for manipulating sounds

var volume = 1

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
		buffer: true
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