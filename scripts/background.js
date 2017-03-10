
var landscape = function() {
	this.layer1 = new Sprite()
	this.layer2 = new Sprite()
	this.layer3 = new Sprite()

	this.layer1.setSrc("image_resources/layer1.png")
	this.layer2.setSrc("image_resources/layer2.png")
	this.layer3.setSrc("image_resources/layer3.png")

	this.layer1.width = this.layer2.width = this.layer3.width = 1280
	this.layer1.height = this.layer2.height = this.layer3.height =  200

	this.layer1.y = 200
	this.layer2.y = 230
	this.layer3.y = 250

	this.draw = function() {
		ctx.save()
		ctx.rect(517, 0, 475, 578);
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

/*
layer1 = new Sprite();
layer2 = new Sprite();
layer3 = new Sprite();

layer1.setSrc("image_resources/layer1.png");
layer2.setSrc("image_resources/layer2.png");
layer3.setSrc("image_resources/layer3.png");

layer1.width = layer2.width = layer3.width = 1280;
layer1.height = layer2.height = layer3.height =  200;

layer1.y = 200;
layer2.y = 230;
layer3.y = 250;

function layerFix() {
    layer1.draw = function() {drawLayerFunction(layer1)};
    layer1.update = function() {updateLayerFunction(layer1, 1)};
    game.push(layer1);
    
    layer2.draw = function() {drawLayerFunction(layer2)};
    layer2.update = function() {updateLayerFunction(layer2, 2)};
    game.push(layer2);
    
    layer3.draw = function() {drawLayerFunction(layer3)};
    layer3.update = function() {updateLayerFunction(layer3, 4)};
    game.push(layer3);
}

function drawLayerFunction(layer) {
    ctx.save()
    ctx.rect(517, 0, 475, 578);
    ctx.clip()

    //console.log("drawing: " + layer.image.src);
    var tempx = layer.x;
    ctx.drawImage(layer.image, layer.x, layer.y, layer.width, layer.height);
    layer.x = tempx - 1280;
    ctx.drawImage(layer.image, layer.x, layer.y, layer.width, layer.height);
    layer.x = tempx + 1280;
    ctx.drawImage(layer.image, layer.x, layer.y, layer.width, layer.height);
    layer.x = tempx;
    
    ctx.restore()
}

function updateLayerFunction(layer, speed) {
    layer.x = layer.x-speed;
    if (layer.x <= 512-layer.width)
        layer.x = 512;
    else if (layer.x >= 512+layer.width)
        layer.x = 512;
}
*/