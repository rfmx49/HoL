function createHud() {
	//Ui is divided into maxWidth = 9 + 2/maxHeight = 11+4; or 11/15 gird.
	//Each grid section is one _tileSize.

	/*Crafty.e('hud_infoBar, ui_scoresheet, 2D, ' + renderEngine + ', Mouse, Touch')
		.attr({x: centerPoint._x-(2*_tileSize) , y: centerPoint._y-(8*_tileSize), w: (400/60)*_tileSize, h: (250/70)*_tileSize, z: 15})
		.bind('Click', function(){
			console.log("Clicked on Level ui");
		});
	*/
	$( "#statusWindow" ).width(Crafty.viewport.width);
	$( "#statusWindow" ).height(Crafty.viewport.height/15);
	$( "#statusWindow" ).append("<div id='#statusWindow'><table style='width:100%'><tr style='width:100%'><td class='ui-scores'><div id='ui-score'><h2>COUNT: <span id='ui-game-score'></span></div></h2></td><td class='ui-times'><h2><div id='ui-Time'>TIME: <span id='ui-game-time'></span></div><h2></td></tr><tr style='width:100%'><td class='ui-roomname' colspan='2'><span id='ui-game-roomname'>NAME Room NAMERoom</span></td></tr></table></div>")
	
}
