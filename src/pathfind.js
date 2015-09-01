function pathFind(id, x, y, queue) {
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
		easyStarPathFind(id, x, y, queue);
		return;
		//var currentPos = {x: (Crafty(id)._x),y:(Crafty(id)._y),rotation:(Crafty(id)._rotation),type:"f"};	
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
		if (fireRoute == false) {
			tileFound = getFloorTile(currentPos.x,currentPos.y);
			console.log(tileFound);
			if (tileFound === false) {
				//console.log("cannot get players tile");
				return;
			}
			currentPos.xtile = tileFound.col;
			currentPos.ytile = tileFound.row;
			currentPos.type = "f";
			revertPos = currentPos;
		}
		//console.log("move player(" + id + ") from x: " + currentPos.x + " y: " + currentPos.y + " (tile[" + currentPos.xtile + "][" + currentPos.ytile + "])" + " TO x:" + endPos.x + "y:" + endPos.y + "(tile[" + endPos.xtile + "][" + endPos.ytile + "])");
		skipNeedToMove = false;
		//Cornering = 
		if (cornering) {
			if (decider == 1) { decider = 2;}
			if (decider == 2) { decider = 1;}
			cornering = false;
		}
		else if (continueDirection == false || needToMove == false) {
			decider = Math.floor(pathRandom() * 2) + 1;
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
					//tile below is not a floor dont move override next decider.
					//console.log("no tile is not a floor" + floorMap[(currentPos.ytile + 1)][currentPos.xtile]);
					//need to go down but a non floor tile is in the way go left or right?

					
					
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
					//tile above is not a floor dont move override next decider.
					//console.log("no tile is not a floor" + floorMap[(currentPos.ytile + 1)][currentPos.xtile]);
					
					needToMove = false;
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
			objectMap[currentPos.ytile][currentPos.xtile] = "FR";
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
			if (fireRoute) {
				//get next door if it is there otherwise quit.
				if (doors.length > 0) {
					currentDoor = doors.shift();
					x = currentDoor.x;
					y = currentDoor.y;
					findingPath = true;
					//reset overfill loop
					loopOverfill = 0;
				}
				else {
					//only onedoor end fireroute detection.
					return objectMap;
				}	
				endPos = {xtile:(x),ytile:(y)}; //tile where door is same as above
				endPos.x = Crafty('Tile' + y + '_' + x)._x
				endPos.y = Crafty('Tile' + y + '_' + x)._y
				endPos.type = "d";
				endPos.inFront = getInFront("door",endPos.ytile,endPos.xtile)
				console.log(endPos);
			}
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
			console.log("Last movement canceled");
		}
	}
	if (fireRoute == false) {
		if (Crafty(id).nodePath.length > 0) {
			if (queue == Crafty(id).movementQueue) {
				//console.log(Crafty(id).nodePath);
				Crafty(id).playTween();
			}
		}	
	}
};

function easyStarPathFind(id, x, y, queue) {
	var currentPos = {x: (Crafty(id)._x),y:(Crafty(id)._y),rotation:(Crafty(id)._rotation),type:"f"};
	tileFound = getFloorTile(currentPos.x,currentPos.y);
	console.log(tileFound);
	if (tileFound === false) {
		//console.log("cannot get players tile");
		return;
	}
	currentPos.xtile = tileFound.col;
	currentPos.ytile = tileFound.row;
	currentPos.type = "f";
	revertPos = currentPos;
	var starMap = [];
	//starMap = floorMap.slice();
	for (var row = 0; row < floorMap.length; row++) {
		starMap[row] = [];
		for (var col = 0; col < floorMap[0].length; col++) {
			if (floorMap[row][col].substring(0,1) == "d") {
				starMap[row][col] = "d";
			}
			else if (floorMap[row][col].substring(0,1) == "f") {
				starMap[row][col] = "f";
			}
			else {
				starMap[row][col] = "X";
			}
		}
	}
	//Start Easy Star.
	var easystar = new EasyStar.js();
	//set grid to floor map.
	easystar.setGrid(starMap);
	//set acceptable walking tiles.
	easystar.setAcceptableTiles(['f','d']);
	easystar.setTileCost('d', 4);
	easystar.findPath(currentPos.xtile, currentPos.ytile, x, y, function( path ) {
		if (path === null) {
		    alert("Path was not found.");
		} else {
		    console.log("Path was found. The first Point is " + path[0].x + " " + path[0].y);
		    for (var pathNode = 1; pathNode < path.length; pathNode++) {
				//get direction of travel by comparing previous point to the current point.
				//pathNode[current] is less than pathNode[previous]
				//Y going UP 	0 degrees
				//X going LEFT	270 degrees
				//pathNode[current] is greater than pathNode[previous]
				//Y going DOWN 	180 degrees
				//X going RIGHT	90 degrees
				if (path[pathNode].y < path[pathNode-1].y) {
					//going up as next nodes y value is less.
					currentPos.rotation = 0;
				}
				else if (path[pathNode].y > path[pathNode-1].y) {
					//going down as next nodes y value is more.
					currentPos.rotation = 180;
				}
				else if (path[pathNode].x < path[pathNode-1].x) {
					//going left as next nodes x value is less.
					currentPos.rotation = 270;
				}
				else if (path[pathNode].x > path[pathNode-1].x) {
					//going right as next nodes x value is more.
					currentPos.rotation = 90;
				}
				else { console.log('not moving at all something is up') }
				//get tile type (is it a door)
				currentPos.type = floorMap[path[pathNode].y][(path[pathNode].x)].substring(0,1)
				//get actual x/y
				currentPos.x = Crafty('Tile' + (path[pathNode].y) + '_' + (path[pathNode].x))._x;
				currentPos.y = Crafty('Tile' + (path[pathNode].y) + '_' + (path[pathNode].x))._y;
				//Add node
				Crafty(id).nodePath.push({x:currentPos.x,y:currentPos.y,rotation:currentPos.rotation,type:currentPos.type,xtile: path[pathNode].x, ytile: path[pathNode].y});
		    }
		    if (Crafty(id).nodePath.length > 0) {
				if (queue == Crafty(id).movementQueue) {
					//console.log(Crafty(id).nodePath);
					Crafty(id).playTween();
				}
			}
		    /*Crafty(id).nodePath.push({x:currentPos.x,y:currentPos.y,rotation:currentPos.rotation,type:currentPos.type,xtile: currentPos.xtile, ytile: currentPos.ytile});
			if (currentPos.rotation == 360) {
				currentPos.rotation = 0;
			}
			if (currentPos.rotation == -90) {
				currentPos.rotation = 270;
			}
			if (Crafty(id).nodePath.length > 0) {
				if (queue == Crafty(id).movementQueue) {
					//console.log(Crafty(id).nodePath);
					Crafty(id).playTween();
				}
			}
			*/	
		}
	});
	easystar.calculate();
};
