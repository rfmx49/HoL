Crafty.scene('Menu', function() {

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
		}
		alert("Click " + e);
		holdActive = false;	
	});*/

	Crafty.e('btnEnter, 2D, DOM, Text, Color, Mouse, Touch')
		.attr({x: 0, y: 0, w: 70, h: 30})
		.color('#FFF666')
		.text("Enter")
		.bind('MouseUp', function(MouseEvent){
			//create player
			//player
			userPlayer = new playerObj;
			Crafty.scene("Game");
		});

	Crafty.viewport.centerOn(Crafty("btnEnter")[0],0)
	
});
