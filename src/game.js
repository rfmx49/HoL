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
	firstRun = false;
});

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
	var playerDirection = playerEntity.rotation;
	var newX, newY;
	switch (playerDirection) {
		case 0:
			newX=playerRoomPos.x
			newY=playerRoomPos.y - 1;
			break;
		case 90:
			newX=playerRoomPos.x + 1;
			newY=playerRoomPos.y
			break;
		case 180:
			newX=playerRoomPos.x
			newY=playerRoomPos.y + 1;
			break;
		case 270:
			newX=playerRoomPos.x - 1;
			newY=playerRoomPos.y
			break;
		default:
			console.log("Error direction not reconized " + playerDirection);
			break;
	}
	//play animation
	changeDoor(playerRoomPos.y,playerRoomPos.x, "opened", true);
	console.log("playerDirection = " + playerDirection + " newX = " + newX + " newY = " + newY);
	Crafty('Tile' + newY + '_' + newX).clickEvent();
	setTimeout(function() {
		changeDoor(playerRoomPos.y,playerRoomPos.x, "close", true);
	}, 250, playerRoomPos);
	
};

function reCenterPlayer() {
	//centerX
	playerEntity.x = ((Math.round(playerEntity._x/_tileSize))*_tileSize)
	//centerY
	playerEntity.y = ((Math.round(playerEntity._y/_tileSize))*_tileSize)
}


