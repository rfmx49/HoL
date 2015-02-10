function pathFind(id, x, y) {
	x=x+12.5;
	y=y+12.5;
	var moving = true;
	//get current pos.
	var posX = Crafty(Crafty('PlayerCharacter')[0])._x;
	var posY = Crafty(Crafty('PlayerCharacter')[0])._y;
	toConsole("move player(" + id + ") to x:" + x + "y:" + y);
	Crafty(id).tween({x: x, y: y}, 600);
	//check if we are going left or right. Up or down.
	while (moving) {
		moving=false;	}
};
