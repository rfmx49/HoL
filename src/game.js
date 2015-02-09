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
		}
		holdActive = false;	
	});

	Crafty.e('btnRoom, 2D, DOM, Text, Color, Mouse')
		.attr({x: -100, y: -100, w: 70, h: 30})
		.color('#FFF666')
		.text("Make Room")
		.bind('Click', function(){
			generateRoom();
		});	

	Crafty.e('btnPlayer, 2D, DOM, Text, Color, Mouse')
		.attr({x: -100, y: -65, w: 70, h: 30})
		.color('#FFF666')
		.text("Make Player")
		.bind('Click', function(){
			Crafty.e('PlayerCharacter').attr({y: (62.5), x: (62.5), w: 25, h: 25});
		});	
	
	Crafty.e('gameloop')
		.attr({countdown: 10})
		.bind("EnterFrame", function() {
			//frame done
		});
});
