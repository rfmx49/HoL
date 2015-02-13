function pathFind(id, x, y) {
	var decider;
	var needToMove = false;
	var loopOverfill = 0;
	var endPos = {x:(x+playerOffset),y:(y+playerOffset)}; //add playerOffset to center the player on the tile.
	endPos.xtile = (x/_tileSize);
	endPos.ytile = (y/_tileSize);
	//toConsole(endPos);
	//get current pos.
	var currentPos = {x: (Crafty(Crafty('PlayerCharacter')[0])._x),y:(Crafty(Crafty('PlayerCharacter')[0])._y),rotation:(Crafty(Crafty('PlayerCharacter')[0])._rotation),type:"f"};
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
		//toConsole("move player(" + id + ") from x: " + currentPos.x + " y: (tile[" + currentPos.xtile + "][" + currentPos.ytile + "])" + currentPos.y + " TO x:" + endPos.x + "y:" + endPos.y + "(tile[" + endPos.xtile + "][" + endPos.ytile + "])");
		needToMove = false;
		decider = Math.floor(Math.random() * 2) + 1;
		//1 = moving along x
		//2 = moving along y
		if (decider == 1) {
			//toConsole("moving along x");
			//check direction to move negitive(left)
			//positive(right)
			if (currentPos.x == endPos.x) {
				//no need to move.
				//toConsole("no need to move on same x");
				needToMove = false;
			}
			else if (currentPos.x < endPos.x) {
				//move right ++
				//check floor tile to right
				if ((floorMap[currentPos.ytile][(currentPos.xtile + 1)] == "f") || (floorMap[currentPos.ytile][(currentPos.xtile + 1)].substring(0,1) == "d")) {
					//move player
					needToMove = true;
					currentPos.x = currentPos.x + _tileSize;
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
					//toConsole("no tile is not a floor" + floorMap[currentPos.ytile][(currentPos.xtile + 1)]);
					//tile to right is not a floor dont move override next decider.
				}
			}
			else if (currentPos.x > endPos.x) {
				//move left --
				//check floor tile to left
				if ((floorMap[currentPos.ytile][(currentPos.xtile - 1)] == "f") || (floorMap[currentPos.ytile][(currentPos.xtile - 1)].substring(0,1) == "d")){
					//move player
					needToMove = true;
					currentPos.x = currentPos.x - _tileSize;
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
					//toConsole("no tile is not a floor" + floorMap[currentPos.ytile][(currentPos.xtile - 1)]);
				}
			}
			else {
				//toConsole("ERROR not equal or less or greater" + currentPos.x + " " + endPos.x);
			}
		}
		else {
			//toConsole("moving along y");
			//check direction to move negitive(up)
			//positive(down)
			if (currentPos.y == endPos.y) {
				//no need to move.
				//toConsole("no need to move on same y");
				needToMove = false;
			}
			else if (currentPos.y < endPos.y) {
				//move down ++
				//check floor tile below
				if ((floorMap[(currentPos.ytile + 1)][currentPos.xtile] == "f") || (floorMap[(currentPos.ytile + 1)][currentPos.xtile].substring(0,1) == "d")) {
					//move player
					needToMove = true;
					currentPos.y = currentPos.y + _tileSize;
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
					//toConsole("no tile is not a floor" + floorMap[(currentPos.ytile + 1)][currentPos.xtile]);
					needToMove = false;
				}
			}
			else if (currentPos.y > endPos.y) {
				//move up --
				//check floor tile above
				if ((floorMap[(currentPos.ytile - 1)][currentPos.xtile] == "f") || (floorMap[(currentPos.ytile - 1)][currentPos.xtile].substring(0,1) == "d")) {
					//move player
					needToMove = true;
					currentPos.y = currentPos.y - _tileSize;
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
					//toConsole("no tile is not a floor" + floorMap[(currentPos.ytile - 1)][currentPos.xtile]);
					//tile to right is not a floor dont move override next decider.
				}
			}
			else {
				//toConsole("ERROR not equal or less or greater" + currentPos.y + " " + endPos.y);
			}
		}
		//do we need to move player this loop?
		if (needToMove) {
			//toConsole("yes need to move player(" + id + ") to " + currentPos + " Rotation:" + currentPos.rotation);
			Crafty(id).nodePath.push({x:currentPos.x,y:currentPos.y,rotation:currentPos.rotation,type:currentPos.type});
			if (currentPos.rotation == 360) {
				currentPos.rotation = 0;
			}
			if (currentPos.rotation == -90) {
				currentPos.rotation = 270;
			}				
		}
		else {
			//toConsole("do not need to move");
		}
		if ((currentPos.x == endPos.x) && (currentPos.y == endPos.y)) {
			//play tween file.
			findingPath = false;
		}
		else { 
			//toConsole(currentPos.x + " " + endPos.x + " " + currentPos.y + " " + endPos.y); 
		}
		//check if loop is getting out of control.
		if (loopOverfill > 500) {
			Crafty(id).nodePath = [];
			findingPath = false;
		}
	}
	if (Crafty(id).nodePath.length > 0) {
		//toConsole(Crafty(id).nodePath);
		Crafty(id).playTween();
	}	
};
