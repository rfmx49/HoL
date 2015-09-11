//Main crafty Game scene
Crafty.scene('Game', function() {

	var centerPoint = Crafty.e('centerPoint, 2D,' + renderEngine + ', Color')
		.attr({x: ((maxWidth+2)*_tileSize)/2, y: ((maxHeight+4)*_tileSize)/2, w: 1, h: 1, alpha: 0, z: 100})
		.color('#FFFFFF');

	Crafty.viewport.centerOn(centerPoint, 0);

	//createHud(centerPoint);
	
	/*Crafty.e('gameloop')
		.attr({countdown: 10})
		.bind("EnterFrame", function() {
			//frame done
		});*/

	//generate first room
	generateRoom();
	createHud();
	//Draw Furniture
	//unless room 1

	//reset score values
	userPlayer.score.actual = 0;
	userPlayer.score.visible = 0;
	returnedHome();
	firstRun = false;
	//save last seed used.
	localStorage.lastSeed = gameSeed;
});

function gameNewRoom() {
	//When entering a new room or an old room.
	if (generateRoom() == false) {
		console.log('genroom has returned FALSE');
		return;
	}
	if (currentRoom != 0) {
		pathFindFireRoute();
		//easyStarFireRoute();
		getFreeFloorSpace();
		//debugHideFreeFloorSpace();
		placeFurniture();
		computeScore();
	}
	else {
		returnedHome();		
	}
};

function debugGoBack() {
	//destroy and make a new room
	Crafty(Crafty('FloorGround')[0]).destroy();
	//remember previous postions and door to refrence back to.
	userPlayer.pos = userPlayer.last.pos;
	lastDoor = 0;
	gameNewRoom();
}

function computeScore() {
	//player has just entered a room.
	userPlayer.score.visible ++;
	userPlayer.score.fluffCount ++;
	if (userPlayer.score.fluffCount == userPlayer.score.fluff) {
		userPlayer.score.visible = userPlayer.score.actual;
		userPlayer.score.fluff = Math.floor(roomRandom() * 7) + 4;
		userPlayer.score.fluffCount = 0;
	}
	displayScore(userPlayer.score.visible);	
}

function returnedHome() {
	//Display proper Score	
	userPlayer.score.visible = userPlayer.score.actual;
	userPlayer.score.fluff = Math.floor(roomRandom() * 7) + 4;
	userPlayer.score.fluffCount = 0;

	displayScore(userPlayer.score.visible);	
	
	//Display Home Graphic.
	//Display it at every door
	var doors = getAllDoors();
	
	for (var n = 0; n < doors.length; n++) {
		//get tile infront of door
		doors[n] = getInFront('door', doors[n].y, doors[n].x);
	
		Crafty.e('TileHOME' + doors[n].y + '_' + doors[n].x + ', 2d, ' + renderEngine + ', ui_home')
			.attr({y: Crafty('Tile' + doors[n].y + '_' + doors[n].x)._y, x: Crafty('Tile' + doors[n].y + '_' + doors[n].x)._x, w: _tileSize, h: _tileSize, z:3});
		Crafty(Crafty('FloorGround')[0]).attach(Crafty('TileHOME' + doors[n].y + '_' + doors[n].x));
		
	}

	/*Crafty.e('TileHOME, 2d, ' + renderEngine + ', ui_home')
			.attr({w: Crafty.viewport.width/1.5 , h: Crafty.viewport.height/1.5, z: 1});
		Crafty(Crafty('FloorGround')[0]).attach(Crafty('TileHOME'));*/
}

function displayScore(score) {
	$( "#ui-game-score" ).html(score);
}

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

function createPlayerEntHome() {
	var doorZero = getAllDoors()[0];
	doorZero = getInFront('door', doorZero.y,doorZero.x)
	playerRoomPos = new Position(doorZero.x,doorZero.y,0);
};

function createPlayerEnt() {
	if (rooms.length == 1) { createPlayerEntHome(); } //first room exceptions.
	var centerOffset = 0;
	/*if (Crafty('centerPoint')._x != Crafty('floorGround')._x) {
		console.log("an even lenght room");
		//centerOffset = _tileSize/2;
	}*/
	playerEntity = Crafty.e('PlayerCharacter').attr({y: (playerRoomPos.y*_tileSize), x: (playerRoomPos.x*_tileSize-centerOffset), w: _tileSize, h: _tileSize, z: 6});
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
