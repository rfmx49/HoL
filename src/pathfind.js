function pathFind(id, x, y, queue) {
	var decider;
	var needToMove = false;
	var loopOverfill = 0;
	var endPos = {x:(x+playerOffset),y:(y+playerOffset)}; //add playerOffset to center the player on the tile.
	endPos.xtile = Math.floor((x)/_tileSize);
	endPos.ytile = Math.floor((y)/_tileSize);
	//console.log(endPos);
	//get current pos.
	var currentPos = {x: (Crafty(id)._x),y:(Crafty(id)._y),rotation:(Crafty(id)._rotation),type:"f"};
	var revertPos = {};
	//set player in motion.
	var findingPath = true;
	//Crafty(id).tween({x: endPoint.x, y: endPoint.y}, 600); //how to move. need endpoint and time to move.
	//check if we are going left or right. Up or down.
	while (findingPath) {
		loopOverfill++;
		currentPos.xtile = Math.floor((currentPos.x)/_tileSize);
		currentPos.ytile = Math.floor((currentPos.y)/_tileSize);
		currentPos.type = "f";
		revertPos = currentPos;
		//console.log("move player(" + id + ") from x: " + currentPos.x + " y: " + currentPos.y + " (tile[" + currentPos.xtile + "][" + currentPos.ytile + "])" + " TO x:" + endPos.x + "y:" + endPos.y + "(tile[" + endPos.xtile + "][" + endPos.ytile + "])");
		needToMove = false;
		decider = Math.floor(Math.random() * 2) + 1;
		//1 = moving along x
		//2 = moving along y
		if (decider == 1) {
			//console.log("moving along x");
			//check direction to move negitive(left)
			//positive(right)
			if (currentPos.x == endPos.x) {
				//no need to move.
				//console.log("no need to move on same x");
				needToMove = false;
			}
			else if (currentPos.x < endPos.x) {
				//move right ++
				//check floor tile to right
				if ((floorMap[currentPos.ytile][(currentPos.xtile + 1)] == "f") || (floorMap[currentPos.ytile][(currentPos.xtile + 1)].substring(0,1) == "d") && (endPos.ytile == currentPos.ytile)) {
					//move player
					needToMove = true;
					//console.log("current pos: " + currentPos.x);
					currentPos.x = Crafty('Tile' + currentPos.ytile + '_' + (currentPos.xtile + 1))._x;
					currentPos.y = Crafty('Tile' + currentPos.ytile + '_' + (currentPos.xtile + 1))._y;
					//console.log("current pos: " + currentPos.x);
					currentPos.rotation = 90;
					if (floorMap[currentPos.ytile][(currentPos.xtile + 1)].substring(0,1) == "d"){
						if (!((currentPos.x == endPos.x) && (currentPos.y == endPos.y))) {
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
			else if (currentPos.x > endPos.x) {
				//move left --
				//check floor tile to left
				if ((floorMap[currentPos.ytile][(currentPos.xtile - 1)] == "f") || (floorMap[currentPos.ytile][(currentPos.xtile - 1)].substring(0,1) == "d") && (endPos.ytile == currentPos.ytile)){
					//move player
					needToMove = true;
					//console.log("current pos: " + currentPos.x);
					currentPos.x = Crafty('Tile' + currentPos.ytile + '_' + (currentPos.xtile - 1))._x;
					currentPos.y = Crafty('Tile' + currentPos.ytile + '_' + (currentPos.xtile - 1))._y;
					//console.log("current pos: " + currentPos.x);
					if (currentPos.rotation == 0) {
						currentPos.rotation = -90;
					}
					else { currentPos.rotation = 270; }	
					if (floorMap[currentPos.ytile][(currentPos.xtile - 1)].substring(0,1) == "d"){						
						if (!((currentPos.x == endPos.x) && (currentPos.y == endPos.y))) {
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
				//console.log("ERROR not equal or less or greater" + currentPos.x + " " + endPos.x);
			}
		}
		else {
			//console.log("moving along y");
			//check direction to move negitive(up)
			//positive(down)
			if (currentPos.y == endPos.y) {
				//no need to move.
				//console.log("no need to move on same y");
				needToMove = false;
			}
			else if (currentPos.y < endPos.y) {
				//move down ++
				//check floor tile below
				if ((floorMap[(currentPos.ytile + 1)][currentPos.xtile] == "f") || (floorMap[(currentPos.ytile + 1)][currentPos.xtile].substring(0,1) == "d")  && (endPos.xtile == currentPos.xtile)) {
					//move player
					needToMove = true;
					currentPos.x = Crafty('Tile' + (currentPos.ytile+1) + '_' + (currentPos.xtile))._x;
					currentPos.y = Crafty('Tile' + (currentPos.ytile+1) + '_' + (currentPos.xtile))._y;
					currentPos.rotation = 180;		
					if (floorMap[(currentPos.ytile + 1)][currentPos.xtile].substring(0,1) == "d"){
						if (!((currentPos.x == endPos.x) && (currentPos.y == endPos.y))) {
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
			else if (currentPos.y > endPos.y) {
				//move up --
				//check floor tile above
				if ((floorMap[(currentPos.ytile - 1)][currentPos.xtile] == "f") || (floorMap[(currentPos.ytile - 1)][currentPos.xtile].substring(0,1) == "d") && (endPos.xtile == currentPos.xtile)) {
					//move player
					needToMove = true;
					currentPos.x = Crafty('Tile' + (currentPos.ytile-1) + '_' + (currentPos.xtile))._x;
					currentPos.y = Crafty('Tile' + (currentPos.ytile-1) + '_' + (currentPos.xtile))._y;
					if (currentPos.rotation == 270) {
						currentPos.rotation = 360;
					}
					else { currentPos.rotation = 0; }
					if (floorMap[(currentPos.ytile - 1)][currentPos.xtile].substring(0,1) == "d"){
						if (!((currentPos.x == endPos.x) && (currentPos.y == endPos.y))) {
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
				//console.log("ERROR not equal or less or greater" + currentPos.y + " " + endPos.y);
			}
		}
		//do we need to move player this loop?
		if (needToMove) {
			//console.log("yes need to move player(" + id + ") to " + currentPos + " Rotation:" + currentPos.rotation);
			Crafty(id).nodePath.push({x:currentPos.x,y:currentPos.y,rotation:currentPos.rotation,type:currentPos.type});
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
		if ((currentPos.x == endPos.x) && (currentPos.y == endPos.y)) {
			//play tween file.
			findingPath = false;
		}
		else { 
			//console.log("no ending " + currentPos.x + " " + endPos.x + " " + currentPos.y + " " + endPos.y); 
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
