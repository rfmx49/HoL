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

	Crafty.e('btnEnterImg, 2d, ' + renderEngine + ', ui_bar, Mouse, Touch')
		.attr({x: 0, y: 0, w: _tileSize * 6, h: _tileSize * 2})
		.bind('MouseUp', function(MouseEvent){
			//create player
			//player
			userPlayer = new playerObj;
			Crafty.scene("Game");
		});

	Crafty.e('btnEnter, 2D, ' + renderEngine + ', Text, Mouse, Touch')
		.attr({x: 0, y: 0, w: 80, h: 50})
		.text("Enter")
		.bind('MouseUp', function(MouseEvent){
			//create player
			//player
			userPlayer = new playerObj;
			Crafty.scene("Game");
		});

	Crafty.viewport.centerOn(Crafty("btnEnter")[0],0)
	
});
