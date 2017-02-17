var music = new Howl({
  src: ['sounds/ambisynth_livedraft.mp3'],
  buffer: true,
  loop: true
});

music.play();

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