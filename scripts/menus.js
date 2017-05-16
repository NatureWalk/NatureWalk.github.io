var menuBackground = new Sprite();
menuBackground.setSrc("image_resources/AttPane.png");
menuBackground.width = 475;
menuBackground.height = 525;
menuBackground.setSpriteAttributes(30,26,475,525);

function menuSetup() {
	gameMenu.push(menuBackground);
	function closeMenu() {
		screenMan.pop();
	}

	var menuButton = new Button(closeMenu);
    menuButton.setSrc("image_resources/menu.png","image_resources/ClearSquare.png");
    menuButton.setSpriteAttributes(40,70,30,30, "menuButton_close");
    gameMenu.buttonArray.push(menuButton);
}