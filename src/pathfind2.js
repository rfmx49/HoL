function pathFind2(id, x, y, queue) {
	var decider;
	var fireRoute = false;
	var currentPos;
	var needToMove = false;
	var loopOverfill = 0;
	pathRandom = new Math.seedrandom(gameSeed + " . " + userPlayer.pos.x + "." + userPlayer.pos.y + "." + userPlayer.pos.z);
	//get current pos.
	if (id == "fireRoute") {
		fireRoute = true;
		var doors = getAllDoors();
		//currentPos = firstDoor infrontof
		var currentDoor = doors.shift();
		objectMap[currentDoor.y][currentDoor.x] = "FR";
		var firstStep = getInFront("door",currentDoor.y,currentDoor.x);
		var currentPos = {x: firstStep.x*_tileSize,y: firstStep.y*_tileSize,xtile: firstStep.x,ytile: firstStep.y,rotation:firstStep.rotation,type:"f"};
		//addThis tile to our fireTable
		objectMap[firstStep.y][firstStep.x] = "FR";
		//get next door.
		if (doors.length > 0) {
			currentDoor = doors.shift();
			x = currentDoor.x;
			y = currentDoor.y;
			//reset overfill loop
			loopOverfill = 0;
		}
		else {
			//only onedoor end fireroute detection.
			return objectMap;
		}
	}
	else {
		//Not making a fireroute so get the moving entities current postion.
		var currentPos = {x: (Crafty(id)._x),y:(Crafty(id)._y),rotation:(Crafty(id)._rotation),type:"f"};	
	}
	
};
