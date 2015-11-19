//Main crafty Game scene
Crafty.scene('Game', function() {

	centerPoint = Crafty.e('centerPoint, 2D,' + renderEngine + ', Color')
		.attr({x: ((maxWidth+2)*_tileSize)/2, y: ((maxHeight+4)*_tileSize)/2, w: 1, h: 1, alpha: 0, z: -1})
		.color('#FF0000');

	Crafty.viewport.centerOn(centerPoint, 0);
	hideAccounts();

	//createHud(centerPoint);
	
	/*Crafty.e('gameloop')
		.attr({countdown: 10})
		.bind("EnterFrame", function() {
			//frame done
		});*/

	//clearAll room varibles
	rooms = [];
	currentRoom = null;
	lastRoom = null; //The last Room number in rooms[]
	lastDoor = null;
	firstRun = true;
	lastPos = new Position(0,0,0);
	playerRoomPos = null;

	//generate first room
	generateRoom();
	createHud();
	//Draw Furniture
	//unless room 1

	//Check/create localStorage player Save Data
	if ((typeof (localStorage.playerSaveData) == "undefined")) {
		var userPlayerSaved = new playerSaveObj();
		localStorage.playerSaveData = JSON.stringify(userPlayerSaved);
		localStorage.playerUUID = uuid();
	}
	else {
		var userPlayerSaved = JSON.parse(localStorage.playerSaveData);
		if (userPlayerSaved.active) {
			userPlayerSaved.disconnected = userPlayerSaved.disconnected + 1;
			userPlayerSaved.active = true;
			localStorage.playerSaveData = JSON.stringify(userPlayerSaved);
		}
		
	}

	//reset score values
	userPlayer.score.actual = 0;
	userPlayer.score.visible = 0;
	returnedHome();
	firstRun = false;
	//save last seed used.
	localStorage.lastSeed = gameSeed;
	DEBUGinstructions = [];
	DEBUGreplay = [];

	hintRandom = new Math.seedrandom(gameSeed);
});

function gameNewRoom() {
	//When entering a new room or an old room.
	if (generateRoom() == false) {
		console.log('genroom has returned FALSE');
		return;
	}
	if (currentRoom != 0) {
		footerChange(false);
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

function returnedHome() {
	//Display proper Score	
	userPlayer.score.visible = userPlayer.score.actual;
	userPlayer.score.fluff = Math.floor(roomRandom() * 7) + 4;
	userPlayer.score.fluffCount = 0;

	displayScore(userPlayer.score.visible);

	//display level
	//ui-game-rank
	displayRank();
	
	//Display Home Graphic.
	//Display it at every door
	var doors = getAllDoors();
	if (rooms.length != 1) {
		userPlayer.score.potentialLost = userPlayer.score.actual;
		footerChange(true);
	}
	
	for (var n = 0; n < doors.length; n++) {
		//get tile infront of door
		doors[n] = getInFront('door', doors[n].y, doors[n].x);
	
		Crafty.e('TileHOME' + doors[n].y + '_' + doors[n].x + ', 2d, ' + renderEngine + ', ui_home')
			.attr({y: Crafty('Tile' + doors[n].y + '_' + doors[n].x)._y, x: Crafty('Tile' + doors[n].y + '_' + doors[n].x)._x, w: _tileSize, h: _tileSize, z:3, alpha:.5});
		Crafty(Crafty('FloorGround')[0]).attach(Crafty('TileHOME' + doors[n].y + '_' + doors[n].x));
		
	}

	/*Crafty.e('TileHOME, 2d, ' + renderEngine + ', ui_home')
			.attr({w: Crafty.viewport.width/1.5 , h: Crafty.viewport.height/1.5, z: 1});
		Crafty(Crafty('FloorGround')[0]).attach(Crafty('TileHOME'));*/
}

function createPlayerEntHome() {
	var doorZero = getAllDoors()[0];
	doorZero = getInFront('door', doorZero.y,doorZero.x)
	
	playerRoomPos = new Position(doorZero.x,doorZero.y,0);
};

function createPlayerEnt() {
	if (rooms.length == 1) { createPlayerEntHome(); }
	else { fadeView({alpha:{start:1,end:0},fadeTime:500}); }
	 //first room exceptions.
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

function awardHint() {
	var decider = Math.floor(roomRandom() * 2);
	console.log(Function.caller)
	if (decider) {
		userPlayer.hints.room++;
		console.log("Room hint awarded")
		//show hint added animation
		
	}
	else {
		userPlayer.hints.door++;
		console.log("Door hint awarded")
		//show hint added animation
	}
}

function hintShowRoom() {
	//create a popup that says if this room has been visited before.
	if (userPlayer.hints.room >= 1) {
		popUpCreate('hintRoom');
		userPlayer.hints.room--;
	}
}

function hintShowDoors() {
	//Show doors which have been used in a room.
	if (userPlayer.hints.door >= 1) {
		setTimeout(function() {
			for (var n = 0; n < rooms[currentRoom].doors.length; n++) {
				changeDoor(rooms[currentRoom].doors[n].roomPos.y,rooms[currentRoom].doors[n].roomPos.x,'open')
				Crafty("Tile" + rooms[currentRoom].doors[n].roomPos.y + "_" + rooms[currentRoom].doors[n].roomPos.x).mouseOverEvent();
			}
		}, 250);
		userPlayer.hints.door--;
	}
}
