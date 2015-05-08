function createHud(centerPoint) {
	//Ui is divided into maxWidth = 9 + 2/maxHeight = 11+4; or 11/15 gird.
	//Each grid section is one _tileSize.

	var hudLevelUi = Crafty.e('hud_level_ui, ui_level, 2D, ' + renderEngine + ', Mouse, Touch')
		.attr({x: centerPoint._x-(5*_tileSize) , y: centerPoint._y-(6.5*_tileSize), w: 345/100*_tileSize, h: _tileSize*1.25, z: 15})
		.bind('Click', function(){
			console.log("Clicked on Level ui");
		});

	var hudLevel = Crafty.e('hud_level, Text, 2D, ' + renderEngine)
		.attr({x: hudLevelUi._x + (.05*hudLevelUi._w), y: hudLevelUi._y + (.45*hudLevelUi._h) , z: 16})
		.text("42")
		.textColor('white');

	Crafty.e('hud_infoBar, ui_bar, 2D, ' + renderEngine + ', Mouse, Touch')
		.attr({x: centerPoint._x-(1.5*_tileSize) , y: centerPoint._y-(6.5*_tileSize), w: 345/100*_tileSize, h: _tileSize*1.25, z: 15})
		.bind('Click', function(){
			console.log("Clicked on Level ui");
		});

	
}
