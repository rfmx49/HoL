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
		
	
	Crafty.e('gameloop')
		.attr({countdown: 10})
		.bind("EnterFrame", function() {
			//frame done
		});
});

function generateRoom(){
	//Rooms are 12x8 rows 1 and 12 and cols 1 and 8 will never bee floor peices
	//floors are effectivly 10x6
	var maxHeight = 12;
	var maxWidth = 8;
	Math.seedrandom('hello.');
	Math.floor((Math.random() * 10) + 1)
}
