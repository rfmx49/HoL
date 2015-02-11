var gameSeed = Math.floor((Math.random() * 10) + 1); //TODO DEBUG Increase to 100000
//toConsole("Game Seed: " + gameSeed);
var mouseFunction = "movePlayer";

Crafty.scene('Game', function() {

	//
	//Game events (MOUSE CLICKS ECT..)
	//
	
	Crafty.addEvent(Crafty.stage.elem, "mousedown", function (e) {
		holdStarter = setTimeout(function() {
			holdStarter = null;
			holdActive = true;
			// begin hold-only operation here, if desired
			toConsole('Dragging');		
		}, 299);
	});

	Crafty.addEvent(Crafty.stage.elem, "mouseup", function (e) {
		if (holdActive) {
			toConsole("hold done");
		}					
	});
		
	
	Crafty.addEvent(Crafty.stage.elem, "click", function (e) {
		clearTimeout(holdStarter);
		if (holdActive == false) {
			toConsole("click");	
			toConsole(e);
			//check if there is a floor tile under click
			if (floorMap.length > 3) {
				//get tile underneath
				var floorTile = {x: (Math.floor(e.layerX/_tileSize)), y: (Math.floor(e.layerY/_tileSize))}
				if (typeof floorMap[floorTile.y] != "undefined") { 
					toConsole('floor tile is ' + floorTile.x + " | " + floorTile.y + ' which is ' + floorMap[floorTile.y][floorTile.x])
					if (floorMap[floorTile.y][floorTile.x] == "f") {
						var tileId = Crafty('Tile' + floorTile.y + '_' + floorTile.x)[0];
						Crafty(tileId).clickEvent();					
					}
				}
			}
		}
		holdActive = false;	
	});

	Crafty.e('btnRoom, 2D, DOM, Text, Color, Mouse')
		.attr({x: -200, y: -100, w: 70, h: 30})
		.color('#FFF666')
		.text("Make Room")
		.bind('Click', function(){
			generateRoom();
		});	

	Crafty.e('btnPlayer, 2D, DOM, Text, Color, Mouse')
		.attr({x: -200, y: -65, w: 70, h: 30})
		.color('#FFF666')
		.text("Make Player")
		.bind('Click', function(){
			createPlayerEnt();
		});	
	
	Crafty.e('gameloop')
		.attr({countdown: 10})
		.bind("EnterFrame", function() {
			//frame done
		});
});

function createPlayerEnt() {
	Crafty.e('PlayerCharacter').attr({y: (_tileSize), x: (_tileSize), w: _tileSize, h: _tileSize});
	/*Crafty.e('PlayerLight, 2D, DOM, Image')
		.image('res/lightconcept.png', 'no-repeat')
		.attr({y: -325, x: -325, w: 800, h: 800});
	Crafty(Crafty('PlayerCharacter')[0]).attach(Crafty('PlayerLight'));*/
	toConsole("player created");
}
