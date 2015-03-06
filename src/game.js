//Main crafty Game scene
Crafty.scene('Game', function() {

	

	var centerPoint = Crafty.e('centerpoint, 2D,' + renderEngine + ', Color')
		.attr({x: ((maxWidth+2)*_tileSize)/2, y: ((maxHeight+4)*_tileSize)/2, w: 10, h: 10, z:100})
		.color('#FFFFFF');

	Crafty.viewport.centerOn(centerPoint, 0);

	//centerPoint.destroy();
	
	//
	//Game events (MOUSE CLICKS ECT..)
	//
	
	/*Crafty.addEvent(Crafty.stage.elem, "mousedown", function (e) {
		holdStarter = setTimeout(function() {
			holdStarter = null;
			holdActive = true;
			// begin hold-only operation here, if desired
			console.log('Dragging');		
		}, 299);
	});

	Crafty.addEvent(Crafty.stage.elem, "mouseup", function (e) {
		if (holdActive) {
			console.log("hold done");
		}					
	});
		
	
	Crafty.addEvent(Crafty.stage.elem, "click", function (e) {
		clearTimeout(holdStarter);
		if (holdActive == false) {
			//console.log("click");	
			//console.log(e);
			//check if there is a floor tile under click
			if (floorMap.length > 3) {
				//get tile underneath
				var floorTile = {x: (Math.floor(e.layerX/_tileSize)), y: (Math.floor(e.layerY/_tileSize))}
				if (typeof floorMap[floorTile.y] != "undefined") { 
					console.log('floor tile is ' + floorTile.x + " | " + floorTile.y + ' which is ' + floorMap[floorTile.y][floorTile.x])
					if (floorMap[floorTile.y][floorTile.x] == "f") {
						var tileId = Crafty('Tile' + floorTile.y + '_' + floorTile.x)[0];
						//Crafty(tileId).clickEvent();					
					}
				}
			}
		}
		holdActive = false;	
	});

	/*Crafty.e('btnRoom, 2D, DOM, Text, Color, Mouse')
		.attr({x: -200, y: -100, w: 70, h: 30, z: 5})
		.color('#FFF666')
		.text("Make Room")
		.bind('Click', function(){
			generateRoom();
		});	*/

	Crafty.e('ui_level, 2D, ' + renderEngine + ', Mouse, Touch')
		.attr({x: 0-(345/100*_tileSize), y: (_tileSize*-3), w: 345/100*_tileSize, h: 98/100*_tileSize, z: 5})
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

function reCenterPlayer() {
	//centerX
	playerEntity.x = ((Math.round(playerEntity._x/_tileSize))*_tileSize)
	//centerY
	playerEntity.y = ((Math.round(playerEntity._y/_tileSize))*_tileSize)
}


