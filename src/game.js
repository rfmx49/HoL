//Main crafty Game scene
Crafty.scene('Game', function() {

	var centerPoint = Crafty.e('centerpoint, 2D,' + renderEngine + ', Color')
		.attr({x: ((maxWidth+2)*_tileSize)/2, y: ((maxHeight+4)*_tileSize)/2, w: 1, h: 1, alpha: 0})
		.color('#FFFFFF');

	Crafty.viewport.centerOn(centerPoint, 0);

	Crafty.e('ui_level, 2D, ' + renderEngine + ', Mouse, Touch')
		.attr({x: 0-(345/250*_tileSize), y: (_tileSize*-2), w: 345/100*_tileSize, h: 98/100*_tileSize, z: 15})
		.bind('Click', function(){
			console.log("Clicked on Level ui");
		});
	
	Crafty.e('gameloop')
		.attr({countdown: 10})
		.bind("EnterFrame", function() {
			//frame done
		});

	//generate first room
	generateRoom();
	firstRun = false;
});

function createPlayerEnt() {
	if (rooms.length == 1) { playerRoomPos = new Position(roomCenter.x,roomCenter.y,0); } //first room exceptions.
	playerEntity = Crafty.e('PlayerCharacter').attr({y: (playerRoomPos.y*_tileSize), x: (playerRoomPos.x*_tileSize), w: _tileSize, h: _tileSize});
	playerEntity.origin("center");
	playerEntity.rotation = userPlayer.rotation;
	Crafty(Crafty('FloorGround')[0]).attach(Crafty(Crafty('PlayerCharacter')[0]));
	Crafty.e('RoomLight, 2D, ' + renderEngine + ', darkness')
		.attr({y: ((roomCenter.y*_tileSize)-400), x: ((roomCenter.x*_tileSize)-600), w: 1200, h: 800, z: 10});
	Crafty(Crafty('FloorGround')[0]).attach(Crafty(Crafty('RoomLight')[0]));
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


