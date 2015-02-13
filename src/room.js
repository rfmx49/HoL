function generateRoom() {
	toConsole("clear")
	Crafty('FloorGround').destroy();
	if ((typeof (Crafty('PlayerCharacter')[0]) != "undefined")) { Crafty(Crafty('PlayerCharacter')[0]).destroy();}
	var maxWidth = 14;
	var maxHeight = 12;
	if (rooms.length == 0) {
		currentRoomPos = {x:0,y:0,z:0};
	}
	roomRandom = new Math.seedrandom(gameSeed + " . " + currentRoomPos.x + "." + currentRoomPos.y + "." + currentRoomPos.z);
	currentRoom = rooms.push(new Room(currentRoomPos.x, currentRoomPos.y, currentRoomPos.z));
	/*
	var floorWidth = Math.floor(Math.random() * (maxWidth-2)) + 1;
	var floorHeight = Math.floor(Math.random() * (maxHeight-2)) + 1;
	var decider = Math.floor(Math.random() * 2) + 1;
	*/
	var floorWidth = Math.floor(roomRandom() * (maxWidth-2)) + 1;
	var floorHeight = Math.floor(roomRandom() * (maxHeight-2)) + 1;
	var decider = Math.floor(roomRandom() * 2) + 1;
	floorMap = [];
	floorMap[0] = [];
	if (decider == 2){
		if (floorWidth > 1 && floorHeight > 1) {
			//decide wether to take out corner or put in wall.
			//or is a wall even possible.
			//decider = Math.floor(Math.random() * 2) + 1;
			//if (decider == 1 || ((floorWidth <= 2) || (floorHeight <= 2))){
			if (1 == 1) {
				//make corner
				//pick a wall top/right/left/bottom
				//pick sizes
				/*
				var wallDecided = Math.floor(Math.random() * 4) + 1;
				var cornerWidth = Math.floor(Math.random() * (floorWidth-1)) + 1;
				var cornerHeight = Math.floor(Math.random() * (floorHeight-1)) + 1;
				*/
				var wallDecided = Math.floor(roomRandom() * 4) + 1;
				var cornerWidth = Math.floor(roomRandom() * (floorWidth-1)) + 1;
				var cornerHeight = Math.floor(roomRandom() * (floorHeight-1)) + 1;
				toConsole("Make room W:" + floorWidth + " H: " + floorHeight + " With corner OnWall: " + wallDecided + "  Dimensions W:" + cornerWidth + " H:" +cornerHeight);
				//drawmap
				for (var row = 1; row <= floorHeight; row++) {
					floorMap[row] = [];
					for (var col = 1; col <= floorWidth; col++) {
						floorMap[row][col] = "f";
						switch (wallDecided) {
						     case 1:
						     	//top right
						     	if ((cornerHeight-row) > (-1)) {
									//corner is on this row but also this coloumn?
									if ((col+cornerWidth) > floorWidth) {
										//yes this tile is part of the corner chunk.
										floorMap[row][col] = null;
									}
								}
						        break;
						     case 2:
						     	//bot right
						     	if ((row+cornerHeight) > floorHeight) {
									//corner is on this row but also this coloumn?
									if ((col+cornerWidth) > floorWidth) {
										//yes this tile is part of the corner chunk.
										floorMap[row][col] = null;
									}
								}
						        break;
						     case 3:
						     	//bot left
						     	if ((row+cornerHeight) > floorHeight) {
									//corner is on this row but also this coloumn?
									if ((cornerWidth-col) > (-1)) {
										//yes this tile is part of the corner chunk.
										floorMap[row][col] = null;
									}
								}
						        break;
						     case 4:
						     	//top left
						     	if ((cornerHeight-row) > (-1)) {
									//corner is on this row but also this coloumn?
									if ((cornerWidth-col) > (-1)) {
										//yes this tile is part of the corner chunk.
										floorMap[row][col] = null;
									}
								}
						        break;
 						}
					}
				}


			}
			else {
				toConsole("make room with divider wall");
				//make wall
				//pick a wall top/right/left/bottom
				//pick sizes
			}
		}
		else {
			toConsole('narrow room ' + floorWidth + 'x' + floorHeight);
			for (var row = 1; row <= floorHeight; row++) {
				floorMap[row] = [];
				for (var col = 1; col <= floorWidth; col++) {
					floorMap[row][col] = "f";
				}
			}
		}
	}
	else {
		//square Room
		toConsole("Make room W:" + floorWidth + " H: " + floorHeight);
		for (var row = 1; row <= floorHeight; row++) {
			floorMap[row] = []
			for (var col = 1; col <= floorWidth; col++) {
				floorMap[row][col] = "f"
			}
		}
	}
	toConsole("Fill blanks");
	floorMap[floorHeight+1] = []
	for (var row = 0; row <= floorHeight+1; row++) {
		for (var col = 0; col <= floorWidth+1; col++) {
			if (floorMap[row][col] != "f") {
				floorMap[row][col] = "x"
			}
		}
	}
	fillWalls();
	drawRoom();
	//get room center
	roomCenter.y = (Math.floor(floorMap.length/2));
	roomCenter.x = (Math.floor(floorMap[0].length/2));
	//Crafty.viewport.zoom(1)
	//free viewport;
	Crafty.viewport.clampToEntities = false;
	Crafty.viewport.centerOn(Crafty(Crafty('Tile' + roomCenter.y + '_' + roomCenter.x)[0]), 0);
	//free viewport;
	createPlayerEnt();
	return floorMap;
}

function fillWalls() {
	toConsole("Fill walls");
	var rows = floorMap.length - 1;
	var cols;
	for (var row = 0; row <= rows; row++) {
		cols = floorMap[row].length - 1;
		for (var col = 0; col <= cols; col++) {
			//check this tile
			if (floorMap[row][col] != "f") {
				//check tile above
				//protect against under/overflow
				if (!((row-1) < 0)) {
					if (floorMap[row-1][col] == "f") {
						//floor above make a wall
						if (floorMap[row][col].substring(2,3) != "i") { floorMap[row][col] = "wb"; }
						//check inside corners
						if (!((col-1) < 0)) {
							if (floorMap[row][col-1] == "f") {
								//inside corner top left
								console.log("inside corner tl");
								floorMap[row][col] = "tli";
							}
						}
						if (!((col+1) > cols)) {
							if (floorMap[row][col+1] == "f") {
								//inside corner top right
								console.log("inside corner tr");
								floorMap[row][col] = "tri";
							}
						}
					}
					else {
						if (!((row-1) < 0)) {
							if (!((col-1) < 0)) {
								if (floorMap[row-1][col-1] == "f") {
									//corner to top left
									if ((floorMap[row][col].substring(0,1) != "w")&&(floorMap[row][col-1] != "f")) { floorMap[row][col] = "tlc"; }
								}
							}
						}
						if (!((row-1) < 0)) {
							if (!((col+1) > cols)) {
								if (floorMap[row-1][col+1] == "f") {
									//corner to top right
									if ((floorMap[row][col].substring(0,1) != "w")&&(floorMap[row][col+1] != "f")) { floorMap[row][col] = "trc"; }
								}
							}
						}
					}
				}
				if (!((row+1) > rows)) {
					if (floorMap[row+1][col] == "f") {
						//floor below make a wall
						if (floorMap[row][col].substring(2,3) != "i") { floorMap[row][col] = "wa"; }
						//check inside corners
						if (!((col-1) < 0)) {
							if (floorMap[row][col-1] == "f") {
								//inside corner bot left
								console.log("inside corner bl");
								floorMap[row][col] = "bli";
							}
						}
						if (!((col+1) > cols)) {
							if (floorMap[row][col+1] == "f") {
								//inside corner bot right
								console.log("inside corner br");
								floorMap[row][col] = "bri";
							}
						}
					}
					else {
						if (!((row+1) > rows)) {
							if (!((col-1) < 0)) {
								if (floorMap[row+1][col-1] == "f") {
									//corner to bot left
									//check left else its not a corner
									if ((floorMap[row][col].substring(0,1) != "w")&&(floorMap[row][col-1] != "f")) { floorMap[row][col] = "blc"; }
								}
							}
						}
						if (!((row+1) > rows)) {
							if (!((col+1) > cols)) {
								if (floorMap[row+1][col+1] == "f") {
									//corner to bot right
									if ((floorMap[row][col].substring(0,1) != "w")&&(floorMap[row][col+1] != "f")) { floorMap[row][col] = "brc"; }
								}
							}
						}
					}
				}
				if (!((col-1) < 0)) {
					if (floorMap[row][col-1] == "f") {
						//floor to left make a wall
						if (floorMap[row][col].substring(2,3) != "i") { floorMap[row][col] = "wr"; }

					}
				}
				if (!((col+1) > cols)) {
					if (floorMap[row][col+1] == "f") {
						//floor to right make a wall
						if (floorMap[row][col].substring(2,3) != "i") { floorMap[row][col] = "wl"; }
					}
				}
			}
		}
	}
}

function drawRoom() {
	toConsole('draw room ' + floorMap);
	var rows = floorMap.length;
	var cols;
	var decider;
	var tileRotation;
	var offsetDoor = {};
	//Draw ground/parent
	Crafty.e('FloorGround, 2D, DOM')
		.attr({y: 0, x: 0, w: _tileSize, h: _tileSize});
	for (var row = 0; row < rows; row++) {
		cols = floorMap[row].length;
		for (var col = 0; col < cols; col++) {
			switch (floorMap[row][col]) {
				case "wa":
					tileRotation = 0;
					break;
				case "wb":
					tileRotation = 180;
					break;
				case "wl":
					tileRotation = 270;
					break;
				case "wr":
					tileRotation = 90;
					break;
				case "tli":
					tileRotation = 180;
					break;
				case "tri":
					tileRotation = 270;
					break;
				case "bli":
					tileRotation = 90;
					break;
				case "bri":
					tileRotation = 0;
					break;
				case "tlc":
					tileRotation = 180;
					break;
				case "trc":
					tileRotation = 270;
					break;
				case "blc":
					tileRotation = 90;
					break;
				case "brc":
					tileRotation = 0;
					break;
			}
			offsetDoor = {};
			switch (floorMap[row][col]) {
				case "f":
					Crafty.e('Tile' + row + '_' + col +', floorMap, floor_1')
						.attr({y: row*_tileSize, x: col*_tileSize, w: _tileSize, h: _tileSize});
					tileName = 'Tile' + row + '_' + col
					Crafty(Crafty('FloorGround')[0]).attach(Crafty('Tile' + row + '_' + col));
					break;
				case "x":
					break;
					Crafty.e('Tile' + row + '_' + col +', floorMap, Color')
						.attr({y: row*_tileSize, x: col*_tileSize, w: _tileSize, h: _tileSize})
						.color('#000000');
					Crafty(Crafty('FloorGround')[0]).attach(Crafty('Tile' + row + '_' + col));
					break;
				case "wa":
				case "wb":
				case "wl":
				case "wr":
					decider = Math.floor(roomRandom() * doorChance) + 1;
					if (decider <=2) {					
						Crafty.e('Tile' + row + '_' + col +', wallMap, wall_straight')
							.attr({y: row*_tileSize, x: col*_tileSize, w: _tileSize, h: _tileSize});
						Crafty(Crafty('FloorGround')[0]).attach(Crafty('Tile' + row + '_' + col));
						Crafty('Tile' + row + '_' + col).origin("center")
						Crafty('Tile' + row + '_' + col).rotation = tileRotation;
					}
					else {
						switch (floorMap[row][col].substring(2,1)) {
							case "a":
								offsetDoor.y = 25;
								offsetDoor.x = 0;
								break;
							case "b":
								offsetDoor.y = -25;
								offsetDoor.x = 0;
								break;
							case "l":
								offsetDoor.y = 0;
								offsetDoor.x = 25;
								break;
							case "r":
								offsetDoor.y = 0;
								offsetDoor.x = -25;
								break;
						}
						Crafty.e('Tile' + row + '_' + col +', floorMap, door_1')
							.attr({y: row*_tileSize, x: col*_tileSize, w: _tileSize, h: _tileSize});
						Crafty(Crafty('FloorGround')[0]).attach(Crafty('Tile' + row + '_' + col));
						Crafty('Tile' + row + '_' + col).origin("center");
						Crafty('Tile' + row + '_' + col).offset = offsetDoor;
						Crafty('Tile' + row + '_' + col).rotation = tileRotation;
						//change floor map to door instead of wall
						floorMap[row][col] = "d" + floorMap[row][col].substring(2,1);
						rooms[currentRoom-1].doors.push(new Door(Math.floor(roomRandom() * sparseness) + 1,Math.floor(roomRandom() * sparseness) + 1,0));
					}
					break;
				case "tli":
				case "tri":
				case "bli":
				case "bri":
					Crafty.e('Tile' + row + '_' + col +', wallMap, wall_corner_in')
						.attr({y: row*_tileSize, x: col*_tileSize, w: _tileSize, h: _tileSize});
					Crafty(Crafty('FloorGround')[0]).attach(Crafty('Tile' + row + '_' + col));
					Crafty('Tile' + row + '_' + col).origin("center")
					Crafty('Tile' + row + '_' + col).rotation = tileRotation;
					break;
				case "tlc":
				case "trc":
				case "blc":
				case "brc":
					Crafty.e('Tile' + row + '_' + col +', wallMap, wall_corner_out')
						.attr({y: row*_tileSize, x: col*_tileSize, w: _tileSize, h: _tileSize});
					Crafty(Crafty('FloorGround')[0]).attach(Crafty('Tile' + row + '_' + col));
					Crafty('Tile' + row + '_' + col).origin("center")
					Crafty('Tile' + row + '_' + col).rotation = tileRotation;
					break;
			}
		}


	}
}

function changeDoor(doorPos, doorOffset, action) {
	toConsole("change door at " + doorPos.x + " " + doorPos.y + " rotation:" + doorPos.rotation + " offset x" + doorOffset.x + " offset y" + doorOffset.y);
	Crafty.e('Door' + (doorPos.y/_tileSize) + '_' + (doorPos.x/_tileSize) +', doorSprite1_reel, wallDoorAnimate')
		.attr({y: doorPos.y+(doorOffset.y), x: doorPos.x+(doorOffset.x), w: _tileSize, h: _tileSize});
	var thisDoor = Crafty('Door' + (doorPos.y/_tileSize) + '_' + (doorPos.x/_tileSize))[0]
	Crafty(Crafty('FloorGround')[0]).attach(Crafty(thisDoor));
	Crafty(thisDoor).origin("center");
	Crafty(thisDoor).rotation = doorPos.rotation;
	console.log("door ID " + thisDoor);
	if (action == "open") {
		Crafty(thisDoor).openDoor();
	}
	else if (action == "clsoe") {
		Crafty(thisDoor).closeDoor();
	}
	return thisDoor;
}

function checkRoom(sX,sY,sZ) {
	toConsole("searching.. z: " + sZ + " x: " + sX + " y: " + sY);
	var roomFound=false;
	for (var i = 0; i < rooms.length; i++) {
		    if (rooms[i].z == sZ) {
				//toConsole('Room ' + i +' has same z:' + sZ);
				if (rooms[i].x == sX) {
					//toConsole('Room ' + i +' has same x:' + sX);
					if (rooms[i].y == sY) {
						//toConsole('Room ' + i +' has same y:' + sY);
						toConsole('<b>Room EXISTS</b>');
						roomFound=true;
						break;
					}
					else {
						//toConsole('Room ' + i +' not a match');
					}
				}
				else {
					//toConsole('Room ' + i +' not a match');
				}
			}
			else {
				//toConsole('Room ' + i +' not a match');
			}

 	}
 	if (roomFound == false) {
		toConsole('Room not Found');
	}
 	return roomFound;
}
