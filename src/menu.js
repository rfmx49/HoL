Crafty.scene('Menu', function() {

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

	Crafty.e('btnEnter, 2D, DOM, Text, Color, Mouse')
		.attr({x: 0, y: 0, w: 70, h: 30})
		.color('#FFF666')
		.text("Enter")
		.bind('Click', function(MouseEvent){
			toConsole("Clicked");
			Crafty.scene("Game");
		});

	Crafty.viewport.centerOn(Crafty("btnEnter")[0],0)
	
});
