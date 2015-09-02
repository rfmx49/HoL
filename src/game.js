//Main crafty Game scene
Crafty.scene('Game', function() {

	var centerPoint = Crafty.e('centerPoint, 2D,' + renderEngine + ', Color')
		.attr({x: ((maxWidth+2)*_tileSize)/2, y: ((maxHeight+4)*_tileSize)/2, w: 1, h: 1, alpha: 100, z: 100})
		.color('#FFFFFF');

	Crafty.viewport.centerOn(centerPoint, 0);

	createHud(centerPoint);
	
	Crafty.e('gameloop')
		.attr({countdown: 10})
		.bind("EnterFrame", function() {
			//frame done
		});

	//generate first room
	generateRoom();
	//Draw Furniture
	//unless room 1
	
	firstRun = false;
});

function gameNewRoom() {
	//When entering a new room or an old room.
	if (generateRoom() == false) {
		return;
	}
	if (currentRoom != 0) {
		pathFindFireRoute();
		//easyStarFireRoute();
		getFreeFloorSpace();
		debugHideFreeFloorSpace();
	}
};

function getRank(rooms) {
	//genereate degrees list
	//rooms = max
	var nextLvl = {};
	if (rooms == 1) {
		nextLvl = {currentLevel: 1, nextLvlRooms: 3, difference: 3 - rooms}
		return nextLvl;
	}
	else if (rooms == 3) {
		nextLvl = {currentLevel: 2, nextLvlRooms: 5, difference: 5 - rooms }
		return nextLvl;
	}
	var degree = []
	degree[1] = 1;
	degree[2] = 3;
	var max = false;
	var weight;
	var level = 3;
	while (max == false) {
		weight = 0.1*Math.pow(0.924,(level-3));
		degree[level]=degree[level-1]+((degree[level-1]-degree[level-2])*(1+weight));
		console.log("Checking Level: " + level + " rooms this level: " + degree[level] + " our rooms: " + rooms + " Weight: " + weight);
		if (Math.round(degree[level]) > rooms) {
			console.log('level is ' + level);
			nextLvl = {currentLevel: level-1, nextLvlRooms: Math.round(degree[level]), difference: Math.round(degree[level]) - rooms}
			return nextLvl;
			max = true;
		}
		level++
	}
}

function createPlayerEnt() {
	if (rooms.length == 1) { playerRoomPos = new Position(roomCenter.x,roomCenter.y,0); } //first room exceptions.
	var centerOffset = 0;
	if (Crafty('centerPoint')._x != Crafty('floorGround')._x) {
		console.log("an even lenght room");
		//centerOffset = _tileSize/2;
	}
	playerEntity = Crafty.e('PlayerCharacter').attr({y: (playerRoomPos.y*_tileSize), x: (playerRoomPos.x*_tileSize-centerOffset), w: _tileSize, h: _tileSize});
	playerEntity.origin("center");
	playerEntity.rotation = userPlayer.rotation;
	Crafty(Crafty('FloorGround')[0]).attach(Crafty(Crafty('PlayerCharacter')[0]));
	//Crafty.e('RoomLight, 2D, ' + renderEngine + ', darkness')
		//.attr({y: ((roomCenter.y*_tileSize)-400), x: ((roomCenter.x*_tileSize)-600), w: 1200, h: 800, z: 10});
	//Crafty(Crafty('FloorGround')[0]).attach(Crafty(Crafty('RoomLight')[0]));
	Crafty(Crafty('FloorGround')[0]).origin(((playerRoomPos.x*_tileSize)-(_tileSize/2)),((playerRoomPos.y*_tileSize)-(_tileSize/2)));
	console.log("player created");
}

function playerEnterRoom() {
	console.log("Player Entered Room");
	var newPos = getInFront("player");
	//play animation
	changeDoor(playerRoomPos.y,playerRoomPos.x, "opened", true);
	console.log("playerDirection = " + newPos.direction + " newX = " + newPos.x + " newY = " + newPos.y);
	Crafty('Tile' + newPos.y + '_' + newPos.x).clickEvent();
	setTimeout(function() {
		changeDoor(playerRoomPos.y,playerRoomPos.x, "close", true);
		//debugDrawFireRoute();
	}, 250, playerRoomPos);
};

function reCenterPlayer() {
	//centerX
	playerEntity.x = ((Math.round(playerEntity._x/_tileSize))*_tileSize)
	//centerY
	playerEntity.y = ((Math.round(playerEntity._y/_tileSize))*_tileSize)
}

//Get the tile infornt of an object
function getInFront(id, y, x) {
	if (id == "player") {
		var direction = playerEntity.rotation;
		var xPos = playerRoomPos.x;
		var yPos = playerRoomPos.y;
	}
	else if (id == "door") {
		var direction = floorMap[y][x].substring(2,1);
		var xPos = x;
		var yPos = y;
	}
	var newPos = {};
	switch (direction) {
		case 0:
		case "b":
			newPos.x=xPos;
			newPos.y=yPos - 1;
			newPos.rotation=0;
			break;
		case 90:
		case "l":
			newPos.x=xPos + 1;
			newPos.y=yPos;
			newPos.rotation=90;
			break;
		case 180:
		case "a":
			newPos.x=xPos;
			newPos.y=yPos + 1;
			newPos.rotation=180;
			break;
		case 270:
		case "r":
			newPos.x=xPos - 1;
			newPos.y=yPos;
			newPos.rotation=270;
			break;
		default:
			console.log("Error direction not reconized " + direction);
			break;
	}
	return newPos;
}

function debugDrawFireRoute() {
	for (var i = 0; i < objectMap.length; i++) {
		for (var n = 0; n < objectMap[i].length; n++) {
			if (objectMap[i][n] == "FR") {
				Crafty("Tile" + i + "_" + n).mouseOverEvent();
			}
		}
	}		
}
