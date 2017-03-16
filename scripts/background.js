//Parallax scrolling background layers
var landscape = function() {
	this.layer1 = new Sprite()
	this.layer2 = new Sprite()
	this.layer3 = new Sprite()

	this.layer1.setSrc("image_resources/layer1.png")
	this.layer2.setSrc("image_resources/layer2.png")
	this.layer3.setSrc("image_resources/layer3.png")

	//Size of native image
	this.layer1.width = this.layer2.width = this.layer3.width = 1280
	this.layer1.height = this.layer2.height = this.layer3.height =  200

	//Change for vertical position
	this.layer1.y = 200
	this.layer2.y = 230
	this.layer3.y = 250

	//Rectangle for ctx.clip
	ctx.rect(517, 0, 475, 578);

	//Draw each layer 3 times to fill whole space
	this.draw = function() {
		ctx.save()
		ctx.clip()

		var tempx = this.layer1.x
		this.layer1.draw()
		this.layer1.x = tempx - 1280
		this.layer1.draw()
		this.layer1.x = tempx + 1280
		this.layer1.draw()
		this.layer1.x = tempx

		tempx = this.layer2.x
		this.layer2.draw()
		this.layer2.x = tempx - 1280
		this.layer2.draw()
		this.layer2.x = tempx + 1280
		this.layer2.draw()
		this.layer2.x = tempx

		tempx = this.layer3.x
		this.layer3.draw()
		this.layer3.x = tempx - 1280
		this.layer3.draw()
		this.layer3.x = tempx + 1280
		this.layer3.draw()
		this.layer3.x = tempx

		ctx.restore()
	}

	//Moves layers by hardcoded speed
	this.update = function() {
		this.layer1.x = this.layer1.x-1;
		if (this.layer1.x <= 512-this.layer1.width)
			this.layer1.x = 512;
		else if (this.layer1.x >= 512+this.layer1.width)
			this.layer1.x = 512;

		this.layer2.x = this.layer2.x-2;
		if (this.layer2.x <= 512-this.layer2.width)
			this.layer2.x = 512;
		else if (this.layer2.x >= 512+this.layer2.width)
			this.layer2.x = 512;
		
		this.layer3.x = this.layer3.x-4;
		if (this.layer3.x <= 512-this.layer3.width)
			this.layer3.x = 512;
		else if (this.layer3.x >= 512+this.layer3.width)
			this.layer3.x = 512;
	}
}
