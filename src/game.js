//Main crafty Game scene
Crafty.scene('Game', function() {

	//
	//Game events (MOUSE CLICKS ECT..)
	//
	
	Crafty.addEvent(Crafty.stage.elem, "mousedown", function (e) {
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
			/*//check if there is a floor tile under click
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
			}*/
		}
		holdActive = false;	
	});

	Crafty.e('btnRoom, 2D, DOM, Text, Color, Mouse')
		.attr({x: -200, y: -100, w: 70, h: 30, z: 5})
		.color('#FFF666')
		.text("Make Room")
		.bind('Click', function(){
			generateRoom();
		});	
	
	Crafty.e('gameloop')
		.attr({countdown: 10})
		.bind("EnterFrame", function() {
			//frame done
		});
});

function createPlayerEnt() {
	if (rooms.length == 1) { playerRoomPos = new Position(roomCenter.x,roomCenter.y,0); } //first room exceptions.
	playerEntity = Crafty.e('PlayerCharacter').attr({y: (playerRoomPos.y*_tileSize), x: (playerRoomPos.x*_tileSize), w: _tileSize, h: _tileSize});
	playerEntity.rotation = userPlayer.rotation;
	Crafty(Crafty('FloorGround')[0]).attach(Crafty(Crafty('PlayerCharacter')[0]));
	Crafty.e('RoomLight, 2D, DOM, Image')
		.image('res/blackness.png', 'no-repeat')
		.attr({y: ((roomCenter.y*_tileSize)-400), x: ((roomCenter.x*_tileSize)-600), w: 1200, h: 800, z: 10});
	Crafty(Crafty('FloorGround')[0]).attach(Crafty(Crafty('RoomLight')[0]));
	console.log("player created");
}


