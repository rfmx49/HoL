function pathFind(id, x, y, queue) {
	var decider;
	var fireRoute = false;
	var currentPos;
	var needToMove = false;
	var loopOverfill = 0;

	//get current pos.
	if (id == "fireRoute") {
		fireRoute = true;
		var doors = getAllDoors();
		//currentPos = firstDoor infrontof
		var firstStep = getInFront("door",doors[0].y,doors[0].x);
		var currentPos = {x: firstStep.x,y: firstStep.y,rotation:firstStep.rotation,type:"f"};
		//addThis tile to our fireTable
		objectMap[firstStep.y][firstStep.x] = "FR";
	}
	else {
		var currentPos = {x: (Crafty(id)._x),y:(Crafty(id)._y),rotation:(Crafty(id)._rotation),type:"f"};
	}

	
	var endPos = {xtile:(x),ytile:(y)}; //tile where click was made
	endPos.x = Crafty('Tile' + y + '_' + x)._x
	endPos.y = Crafty('Tile' + y + '_' + x)._y
	endPos.type = "f";
	if (floorMap[endPos.ytile][(endPos.xtile)].substring(0,1) == "d"){
		endPos.inFront = getInFront("door",endPos.ytile,endPos.xtile)
		endPos.type = "d";
	}
	else {endPos.inFront = {x:endPos.xtile,y:endPos.ytile};}
	console.log(endPos);
	
	var revertPos = {};
	//set player in motion.
	var findingPath = true;
	var continueDirection = false;
	var skipNeedToMove = false;
	var cornering = false;
	var tileFound;
	//check if we are going left or right. Up or down.
	while (findingPath) {
		loopOverfill++;
		tileFound = getFloorTile(currentPos.x,currentPos.y);
		//console.log(tileFound);
		//tileFound={row: row, col: col}
		if (tileFound === false) {
			//console.log("cannot get players tile");
			return;
		}
		currentPos.xtile = tileFound.col;
		currentPos.ytile = tileFound.row;
		currentPos.type = "f";
		revertPos = currentPos;
		//console.log("move player(" + id + ") from x: " + currentPos.x + " y: " + currentPos.y + " (tile[" + currentPos.xtile + "][" + currentPos.ytile + "])" + " TO x:" + endPos.x + "y:" + endPos.y + "(tile[" + endPos.xtile + "][" + endPos.ytile + "])");
		skipNeedToMove = false;
		if (cornering) {
			if (decider == 1) { decider = 2;}
			if (decider == 2) { decider = 1;}
			cornering = false;
		}
		else if (continueDirection == false || needToMove == false) {
			decider = Math.floor(roomRandom() * 2) + 1;
			continueDirection = true;
		}
		needToMove = false;
		//1 = moving along x
		//2 = moving along y
		if (decider == 1) {
			//console.log("moving along x");
			//check direction to move negitive(left)
			//positive(right)
			if (currentPos.xtile < endPos.xtile || ((currentPos.xtile == endPos.xtile) && currentPos.xtile < endPos.inFront.x )) {
				//move right ++
				//check floor tile to right
				if ((floorMap[currentPos.ytile][(currentPos.xtile + 1)] == "f") || (floorMap[currentPos.ytile][(currentPos.xtile + 1)].substring(0,1) == "d") && (endPos.ytile == currentPos.ytile)) {
					//move player
					needToMove = true;
					//console.log("current pos: " + currentPos.x);
					currentPos.xtile = currentPos.xtile+ 1;
					if (currentPos.xtile > endPos.xtile) { cornering=true; }
					currentPos.x = Crafty('Tile' + currentPos.ytile + '_' + (currentPos.xtile))._x;
					currentPos.y = Crafty('Tile' + currentPos.ytile + '_' + (currentPos.xtile))._y;
					//console.log("current pos: " + currentPos.xtile);
					currentPos.rotation = 90;
					if (floorMap[currentPos.ytile][(currentPos.xtile)].substring(0,1) == "d"){
						if (!((currentPos.xtile == endPos.xtile) && (currentPos.ytile == endPos.ytile))) {
							currentPos = revertPos;
							needToMove = false;
						}
						else { currentPos.type = "d"; }
					}					
				}
				else {
					//console.log("no tile is not a floor" + floorMap[currentPos.ytile][(currentPos.xtile + 1)]);
					//tile to right is not a floor dont move override next decider.
					//Is destination a door move along y axis next time.
					continueDirection = true;
					skipNeedToMove = true;
					needToMove = true;
					decider = 2;
				}
			}
			else if (currentPos.xtile > endPos.xtile || ((currentPos.xtile == endPos.xtile) && currentPos.xtile > endPos.inFront.x )) {
				//move left --
				//check floor tile to left
				if ((floorMap[currentPos.ytile][(currentPos.xtile - 1)] == "f") || (floorMap[currentPos.ytile][(currentPos.xtile - 1)].substring(0,1) == "d") && (endPos.ytile == currentPos.ytile)){
					//move player
					needToMove = true;
					//console.log("current pos: " + currentPos.x);
					currentPos.xtile = currentPos.xtile - 1;
					if (currentPos.xtile < endPos.xtile) { cornering=true; }
					currentPos.x = Crafty('Tile' + currentPos.ytile + '_' + (currentPos.xtile))._x;
					currentPos.y = Crafty('Tile' + currentPos.ytile + '_' + (currentPos.xtile))._y;
					//console.log("current pos: " + currentPos.x);
					if (currentPos.rotation == 0) {
						currentPos.rotation = -90;
					}
					else { currentPos.rotation = 270; }	
					if (floorMap[currentPos.ytile][(currentPos.xtile)].substring(0,1) == "d"){						
						if (!((currentPos.xtile == endPos.xtile) && (currentPos.ytile == endPos.ytile))) {
							currentPos = revertPos;
							needToMove = false;
						}
						else { currentPos.type = "d"; }
					}			
				}
				else {
					//tile to right is not a floor dont move override next decider.
					//console.log("no tile is not a floor" + floorMap[currentPos.ytile][(currentPos.xtile - 1)]);
				}
			}
			else if (currentPos.xtile == endPos.xtile) {
				//no need to move.
				//console.log("no need to move on same x");
				needToMove = false;
				continueDirection = false;
			}
			else {
				//console.log("ERROR not equal or less or greater WTH!? " + currentPos.xtile + " " + endPos.xtile);
			}
		}
		else {
			//console.log("moving along y");
			//check direction to move negitive(up)
			//positive(down)
			if (currentPos.ytile < endPos.ytile || ((currentPos.ytile == endPos.ytile) && currentPos.ytile < endPos.inFront.y )) {
				//move down ++
				//check floor tile below
				if ((floorMap[(currentPos.ytile + 1)][currentPos.xtile] == "f") || (floorMap[(currentPos.ytile + 1)][currentPos.xtile].substring(0,1) == "d")  && (endPos.xtile == currentPos.xtile)) {
					//move player
					needToMove = true;
					currentPos.ytile = currentPos.ytile + 1;
					if (currentPos.ytile > endPos.ytile) { cornering=true; }
					currentPos.x = Crafty('Tile' + (currentPos.ytile) + '_' + (currentPos.xtile))._x;
					currentPos.y = Crafty('Tile' + (currentPos.ytile) + '_' + (currentPos.xtile))._y;
					currentPos.rotation = 180;		
					if (floorMap[(currentPos.ytile)][currentPos.xtile].substring(0,1) == "d"){
						if (!((currentPos.xtile == endPos.xtile) && (currentPos.ytile == endPos.ytile))) {
							currentPos = revertPos;
							needToMove = false;
						}
						else { currentPos.type = "d"; }
					}			
				}
				else {
					//tile to right is not a floor dont move override next decider.
					//console.log("no tile is not a floor" + floorMap[(currentPos.ytile + 1)][currentPos.xtile]);
					
					needToMove = false;
				}
			}
			else if (currentPos.ytile > endPos.ytile || ((currentPos.ytile == endPos.ytile) && currentPos.ytile > endPos.inFront.y )) {
				//move up --
				//check floor tile above
				if ((floorMap[(currentPos.ytile - 1)][currentPos.xtile] == "f") || (floorMap[(currentPos.ytile - 1)][currentPos.xtile].substring(0,1) == "d") && (endPos.xtile == currentPos.xtile)) {
					//move player
					needToMove = true;
					currentPos.ytile = currentPos.ytile - 1;
					if (currentPos.ytile < endPos.ytile) { cornering=true; }
					currentPos.x = Crafty('Tile' + (currentPos.ytile) + '_' + (currentPos.xtile))._x;
					currentPos.y = Crafty('Tile' + (currentPos.ytile) + '_' + (currentPos.xtile))._y;
					if (currentPos.rotation == 270) {
						currentPos.rotation = 360;
					}
					else { currentPos.rotation = 0; }
					if (floorMap[(currentPos.ytile)][currentPos.xtile].substring(0,1) == "d"){
						if (!((currentPos.xtile == endPos.xtile) && (currentPos.ytile == endPos.ytile))) {
							currentPos = revertPos;
							needToMove = false;
						}
						else { currentPos.type = "d"; }
					}
				}
				else {
					needToMove = false;
					//console.log("no tile is not a floor" + floorMap[(currentPos.ytile - 1)][currentPos.xtile]);
					//tile to right is not a floor dont move override next decider.
				}
			}
			else if (currentPos.ytile == endPos.ytile) {
				//no need to move.
				//console.log("no need to move on same y");
				//check if endpos is a door.
				if (floorMap[(endPos.ytile + 1)][endPos.xtile].substring(0,1) == "d"){
					//check the infront tile if it is above or below current postion.
					infront = getInFront("door",endPos.ytile,endPos.xtile)
				}
				needToMove = false;
				continueDirection = false;
			}
			else {
				//console.log("ERROR not equal or less or greater WTH?!?!" + currentPos.ytile + " " + endPos.ytile);
			}
		}
		//do we need to move player this loop?
		//Check if we are only looking for fireRoute
		if (fireRoute) {
			needToMove = false;
			objectMap[currentPos.y][currentPos.x] = "FR";
			//normalize rotaiton
			if (currentPos.rotation == 360) {
				currentPos.rotation = 0;
			}
			if (currentPos.rotation == -90) {
				currentPos.rotation = 270;
			}
		}
		if (needToMove && skipNeedToMove == false) {			
			//console.log("yes need to move player(" + id + ") to " + currentPos.x + "|" + currentPos.xtile + ":" + currentPos.y + "|" + currentPos.ytile + " Rotation:" + currentPos.rotation);
			Crafty(id).nodePath.push({x:currentPos.x,y:currentPos.y,rotation:currentPos.rotation,type:currentPos.type,xtile: currentPos.xtile, ytile: currentPos.ytile});
			if (currentPos.rotation == 360) {
				currentPos.rotation = 0;
			}
			if (currentPos.rotation == -90) {
				currentPos.rotation = 270;
			}		
		}
		else {
			//console.log("do not need to move");
		}
		if ((currentPos.xtile == endPos.xtile) && (currentPos.ytile == endPos.ytile)) {
			//play tween file.
			findingPath = false;
		}
		else { 
			//console.log("no ending " + currentPos.xtile + " " + endPos.xtile + " " + currentPos.ytile + " " + endPos.ytile); 
		}
		//check if loop is getting out of control.
		if (loopOverfill > 50) {
			Crafty(id).nodePath = [];
			findingPath = false;
			console.log("pathfinding loop maxed out.");
		}
		if (queue != Crafty(id).movementQueue) {
			//cancel pathfinding as new path has been assigned.
			findingPath = false;
		}
	}
	if (Crafty(id).nodePath.length > 0) {
		if (queue == Crafty(id).movementQueue) {
			//console.log(Crafty(id).nodePath);
			Crafty(id).playTween();
		}
	}	
};
