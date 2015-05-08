function pathFind(id, x, y, queue) {
	var decider;
	var fireRoute;
	var currentPos;
	var needToMove = false;
	var loopOverfill = 0;
	var endPos = {xtile:(x),ytile:(y)}; //tile where click was made
	endPos.x = Crafty('Tile' + y + '_' + x)._x
	endPos.y = Crafty('Tile' + y + '_' + x)._y
	console.log(endPos);
	//get current pos.
	if (id == "fireRoute") {
		fireRoute = true;
		getQuantity("door");
	}
	else {
		var currentPos = {x: (Crafty(id)._x),y:(Crafty(id)._y),rotation:(Crafty(id)._rotation),type:"f"};
	}
	var revertPos = {};
	//set player in motion.
	var findingPath = true;
	//check if we are going left or right. Up or down.
	while (findingPath) {
		loopOverfill++;
		var tileFound = getFloorTile(currentPos.x,currentPos.y);
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
		needToMove = false;
		//fireRoute
		decider = Math.floor(roomRandom() * 2) + 1;
		//1 = moving along x
		//2 = moving along y
		if (decider == 1) {
			//console.log("moving along x");
			//check direction to move negitive(left)
			//positive(right)
			if (currentPos.xtile == endPos.xtile) {
				//no need to move.
				//console.log("no need to move on same x");
				needToMove = false;
			}
			else if (currentPos.xtile < endPos.xtile) {
				//move right ++
				//check floor tile to right
				if ((floorMap[currentPos.ytile][(currentPos.xtile + 1)] == "f") || (floorMap[currentPos.ytile][(currentPos.xtile + 1)].substring(0,1) == "d") && (endPos.ytile == currentPos.ytile)) {
					//move player
					needToMove = true;
					//console.log("current pos: " + currentPos.x);
					currentPos.xtile = currentPos.xtile+ 1;
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
				}
			}
			else if (currentPos.xtile > endPos.xtile) {
				//move left --
				//check floor tile to left
				if ((floorMap[currentPos.ytile][(currentPos.xtile - 1)] == "f") || (floorMap[currentPos.ytile][(currentPos.xtile - 1)].substring(0,1) == "d") && (endPos.ytile == currentPos.ytile)){
					//move player
					needToMove = true;
					//console.log("current pos: " + currentPos.x);
					currentPos.xtile = currentPos.xtile - 1;
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
			else {
				//console.log("ERROR not equal or less or greater WTH!? " + currentPos.xtile + " " + endPos.xtile);
			}
		}
		else {
			//console.log("moving along y");
			//check direction to move negitive(up)
			//positive(down)
			if (currentPos.ytile == endPos.ytile) {
				//no need to move.
				//console.log("no need to move on same y");
				needToMove = false;
			}
			else if (currentPos.ytile < endPos.ytile) {
				//move down ++
				//check floor tile below
				if ((floorMap[(currentPos.ytile + 1)][currentPos.xtile] == "f") || (floorMap[(currentPos.ytile + 1)][currentPos.xtile].substring(0,1) == "d")  && (endPos.xtile == currentPos.xtile)) {
					//move player
					needToMove = true;
					currentPos.ytile = currentPos.ytile + 1;
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
			else if (currentPos.ytile > endPos.ytile) {
				//move up --
				//check floor tile above
				if ((floorMap[(currentPos.ytile - 1)][currentPos.xtile] == "f") || (floorMap[(currentPos.ytile - 1)][currentPos.xtile].substring(0,1) == "d") && (endPos.xtile == currentPos.xtile)) {
					//move player
					needToMove = true;
					currentPos.ytile = currentPos.ytile - 1;
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
			else {
				//console.log("ERROR not equal or less or greater WTH?!?!" + currentPos.ytile + " " + endPos.ytile);
			}
		}
		//do we need to move player this loop?
		if (needToMove) {
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
		if (loopOverfill > 100) {
			Crafty(id).nodePath = [];
			findingPath = false;
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
