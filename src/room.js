function generateRoom() {
	originDoors = [];
	console.log("clear")
	Crafty('FloorGround').destroy();
	if ((typeof (Crafty('PlayerCharacter')[0]) != "undefined")) { Crafty(Crafty('PlayerCharacter')[0]).destroy();}
	var maxWidth = 9;
	var maxHeight = 11;
	roomRandom = new Math.seedrandom(gameSeed + " . " + userPlayer.pos.x + "." + userPlayer.pos.y + "." + userPlayer.pos.z);
	var existingRoom = checkRoom(userPlayer.pos.x,userPlayer.pos.y,userPlayer.pos.z);
	//console.log("EXISTING room STATUS == " + existingRoom + " " + (existingRoom == false) + (typeof existingRoom =="boolean"));
	if (originDoorSuccess) {
		//this is not a recreation of a room
		lastRoom = currentRoom; 
	}
	else {
		//this is a recreated room
		rooms[currentRoom]="";
	}
	if (existingRoom === false) {
		currentRoom = rooms.push(new Room(userPlayer.pos.x, userPlayer.pos.y, userPlayer.pos.z)) - 1;
	}
	else { currentRoom = existingRoom; }
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
				console.log("Make room W:" + floorWidth + " H: " + floorHeight + " With corner OnWall: " + wallDecided + "  Dimensions W:" + cornerWidth + " H:" +cornerHeight);
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
				console.log("make room with divider wall");
				//make wall
				//pick a wall top/right/left/bottom
				//pick sizes
			}
		}
		else {
			console.log('narrow room ' + floorWidth + 'x' + floorHeight);
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
		console.log("Make room W:" + floorWidth + " H: " + floorHeight);
		for (var row = 1; row <= floorHeight; row++) {
			floorMap[row] = []
			for (var col = 1; col <= floorWidth; col++) {
				floorMap[row][col] = "f"
			}
		}
	}
	//console.log("Fill blanks");
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
	var doorsValid = locateOriginDoor();
	if (doorsValid) {
		//get room center
		roomCenter.y = (Math.floor(floorMap.length/2));
		roomCenter.x = (Math.floor(floorMap[0].length/2));
		//Crafty.viewport.zoom(1)
		//free viewport;
		Crafty.viewport.clampToEntities = false;
		Crafty.viewport.centerOn(Crafty(Crafty('Tile' + roomCenter.y + '_' + roomCenter.x)[0]), 0);
		//free viewport;
		createPlayerEnt();
	}
	return floorMap;
}

function setDoor(tileX, tileY){
	var createdDoor = rooms[currentRoom].doors.push(new Door(lastPos.x,lastPos.y,lastPos.z,tileX,tileY));
	rooms[currentRoom].doors[createdDoor - 1].toRoomPos = new Position(rooms[lastRoom].doors[lastDoor].roomPos.x,rooms[lastRoom].doors[lastDoor].roomPos.y,0);
	//also set this matching doors destination door info.
	rooms[lastRoom].doors[lastDoor].toRoomPos = new Position(tileX,tileY,0);
}

function positionPlayer(x,y) {
	playerRoomPos = new Position(x,y,0)
}

function locateOriginDoor() {
	//need to check originDoors array and remove any that are already used for passage to other rooms. 
	//Major issue will be if there is alrady a door to this room but then a new way is added but there is no room for it
	//filter origin doors if origin doors are already taken do reassign them.
	//check if this is the first room.
	//console.log(originDoors);
	var originDoorReq = true;
	originDoorSuccess = true;
	if (rooms.length != 1) {
		var filterdDoors = [];
		var existingDoor = false;
		//check if we are returning through door.
		//loop through originDoors and check to see if they match the last door information.
		if (originDoors.length >= 1) {
			positionPlayer(originDoors[0].x,originDoors[0].y);
			for (var i = 0; i < originDoors.length; i++) {
				//check if door exists in the door array
				existingDoor=checkDoor(currentRoom,originDoors[i].x,originDoors[i].y)
				if ((existingDoor != false) && (typeof existingDoor !="boolean")) {
					//compare this door to the last door infor to see if it is this doors match.
					if (rooms[currentRoom].doors[existingDoor].toRoomPos.x == rooms[lastRoom].doors[lastDoor].roomPos.x) {
						if (rooms[currentRoom].doors[existingDoor].toRoomPos.y == rooms[lastRoom].doors[lastDoor].roomPos.y) {
							//Door is a match to an already created door.
							console.log("Revisting room no need for new origin door.");
							originDoorReq = false;
							positionPlayer(originDoors[i].x,originDoors[i].y);					
						}
					}
				}			
		 	}		
		}
		else {
			console.log("NO DOORS AVAILIBLE MAKING NEW ROOM??" + originDoors);
			switch (userPlayer.rotation) {
				case 360:
				case 0:
				case -0:
					//last move was moving forward so move y+ a point.
					userPlayer.pos.y = userPlayer.pos.y + 0.01;
					break;
				case 90:
				case 450:
					//last move was moving left so move x+ a point.
					userPlayer.pos.x = userPlayer.pos.x + 0.01;
					break;
				case 180:
				case -180:
					//last move was moving down so move y- a point.
					userPlayer.pos.y = userPlayer.pos.y - 0.01;
					break;
				case 270:
				case -90:
					//last move was moving right so move x- a point.
					userPlayer.pos.x = userPlayer.pos.x - 0.01;
					break;
			}
			//create new room
			Crafty(Crafty('FloorGround')[0]).destroy();
			originDoorSuccess = false;
			generateRoom();
			originDoorReq == false;
			return false;
		}
		if (originDoorReq) {
			for (var i = 0; i < originDoors.length; i++) {
				existingDoor=checkDoor(currentRoom,originDoors[i].x,originDoors[i].y)
				if ((existingDoor == false) && (typeof existingDoor =="boolean")) {
					filterdDoors.push(originDoors[i]);
				}			
		 	}
			originDoors = filterdDoors;		
		
			if (originDoors.length == 1) {
				//just one door.
				setDoor(originDoors[0].x,originDoors[0].y);
				positionPlayer(originDoors[0].x,originDoors[0].y);
				console.log("To get back to " + lastPos.x + ":" + lastPos.y + " go through door " + originDoors[0].x + ":" + originDoors[0].y);
			}
			else if (originDoors.length >= 2) {
				//more than one door pick one.
				var decider = Math.floor(roomRandom() * originDoors.length);
				setDoor(originDoors[decider].x,originDoors[decider].y);
				positionPlayer(originDoors[decider].x,originDoors[decider].y);
				console.log("To get back to " + lastPos.x + ":" + lastPos.y + " go through door " + originDoors[decider].x + ":" + originDoors[decider].y)
			}
		}
	}
	return true;
}

function fillWalls() {
	//console.log("Fill walls");
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
								//console.log("inside corner tl");
								floorMap[row][col] = "tli";
							}
						}
						if (!((col+1) > cols)) {
							if (floorMap[row][col+1] == "f") {
								//inside corner top right
								//console.log("inside corner tr");
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
								//console.log("inside corner bl");
								floorMap[row][col] = "bli";
							}
						}
						if (!((col+1) > cols)) {
							if (floorMap[row][col+1] == "f") {
								//inside corner bot right
								//console.log("inside corner br");
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
	//console.log('draw room ' + floorMap);
	var rows = floorMap.length;
	var cols;
	var decider;
	var oppisiteRotation;
	var tileRotation;
	var offsetDoor = {};
	//Draw ground/parent
	Crafty.e('FloorGround, 2D, DOM, Color')
		.attr({y: 0, x: 0, w: 1, h: 1, alpha:0})
		.color("#FFFFFF");
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
						//room directions major direction ++ minor direction  1/2 sparseness +/-
						switch (floorMap[row][col].substring(2,1)) {
							case "a":
								offsetDoor.y = _tileSize/2;
								offsetDoor.x = 0;
								//newDoor.y = Math.floor((roomRandom() * sparseness) + 1);
								//newDoor.x = Math.round(((roomRandom() * sparseness) + 1)-(sparseness/2));
								break;
							case "b":
								offsetDoor.y = Math.abs(_tileSize/2) * -1;
								offsetDoor.x = 0;
								//newDoor.y = Math.floor((roomRandom() * sparseness) + 1) - sparseness;
								//newDoor.x = Math.round(((roomRandom() * sparseness) + 1)-(sparseness/2));
								break;
							case "l":
								offsetDoor.y = 0;
								offsetDoor.x = _tileSize/2;
								//newDoor.x = Math.floor((roomRandom() * sparseness) + 1);
								//newDoor.y = Math.round(((roomRandom() * sparseness) + 1)-(sparseness/2));
								break;
							case "r":
								offsetDoor.y = 0;
								offsetDoor.x = Math.abs(_tileSize/2) * -1;
								//newDoor.x = Math.floor((roomRandom() * sparseness) + 1) - sparseness;
								//newDoor.y = Math.round(((roomRandom() * sparseness) + 1)-(sparseness/2));
								break;
						}
						Crafty.e('Tile' + row + '_' + col +', floorMap, door_1')
							.attr({y: row*_tileSize, x: col*_tileSize, w: _tileSize, h: _tileSize});
						Crafty(Crafty('FloorGround')[0]).attach(Crafty('Tile' + row + '_' + col));
						Crafty('Tile' + row + '_' + col).origin("center");
						Crafty('Tile' + row + '_' + col).offset = offsetDoor;
						Crafty('Tile' + row + '_' + col).rotation = tileRotation;
						//find origin door
						oppisiteRotation = tileRotation + 180
						if (oppisiteRotation == 450) { oppisiteRotation = 90; }
						if (oppisiteRotation == 360) { oppisiteRotation = 0; }
						//console.log(oppisiteRotation + " " + userPlayer.rotation);
						if ((oppisiteRotation == userPlayer.rotation) || ((oppisiteRotation == 270) && (userPlayer.rotation == -90)) || ((oppisiteRotation == 0) && (userPlayer.rotation == 360))) {
							originDoors.push({x: col,y: row});
							console.log("Door added");
						}
						/*else {
							//console.log("rotation did not match" + oppisiteRotation + "/" + userPlayer.rotation);
						}*/
						//change floor map to door instead of wall
						floorMap[row][col] = "d" + floorMap[row][col].substring(2,1);
						//rooms[currentRoom-1].doors.push(new Door(newDoor.x,newDoor.y,0)); //TODO make new currentfloor varible.
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
	//console.log("change door at " + doorPos.x + " " + doorPos.y + " rotation:" + doorPos.rotation + " offset x" + doorOffset.x + " offset y" + doorOffset.y);
	Crafty.e('Door' + (doorPos.y/_tileSize) + '_' + (doorPos.x/_tileSize) +', doorSprite1_reel, wallDoorAnimate')
		.attr({y: doorPos.y+(doorOffset.y), x: doorPos.x+(doorOffset.x), w: _tileSize, h: _tileSize});
	var thisDoor = Crafty('Door' + (doorPos.y/_tileSize) + '_' + (doorPos.x/_tileSize))[0]
	Crafty(Crafty('FloorGround')[0]).attach(Crafty(thisDoor));
	Crafty(thisDoor).origin("center");
	Crafty(thisDoor).rotation = doorPos.rotation;
	//console.log("door ID " + thisDoor);
	if (action == "open") {
		Crafty(thisDoor).openDoor();
	}
	else if (action == "clsoe") {
		Crafty(thisDoor).closeDoor();
	}
	return thisDoor;
}

function checkRoom(sX,sY,sZ) {
	console.log("searching.. z: " + sZ + " x: " + sX + " y: " + sY);
	var roomFound=false;
	for (var i = 0; i < rooms.length; i++) {
		if (rooms[i] != "") {
			if (rooms[i].pos.z == sZ) {
				//console.log('Room ' + i +' has same z:' + sZ);
				if (rooms[i].pos.x == sX) {
					//console.log('Room ' + i +' has same x:' + sX);
					if (rooms[i].pos.y == sY) {
						//console.log('Room ' + i +' has same y:' + sY);
						console.log('Room EXISTS');
						roomFound=i;
						return i;
						break;
					}
				}
			}
		}
 	}
 	if (roomFound == false) {
		console.log('Room not Found');
	}
 	return roomFound;
}

function checkDoor(sRoom,sX,sY) {
	//console.log("searching.. x: " + sX + " y: " + sY + " in Room: " + sRoom);
	var doorFound=false;
	for (var i = 0; i < rooms[sRoom].doors.length; i++) {
	    if (rooms[sRoom].doors[i].roomPos.y == sY) {
			//console.log('Room ' + i +' has same z:' + sZ);
			if (rooms[sRoom].doors[i].roomPos.x == sX) {
				console.log('Door EXISTS');
				doorFound=i;
				return i;
				break;
			}
		}
 	}
 	/*if (doorFound == false) {
		//console.log('Door not Found');
	}*/
 	return doorFound;
}
