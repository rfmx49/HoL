Crafty.scene('Menu', function() {

	//
	//Game events (MOUSE CLICKS ECT..)
	//

	var newGameBtn = Crafty.e('btnNewGame, 2d, ' + renderEngine + ', menu_newGame, Mouse, Touch')
		.attr({x: 0, y: 0, w: _tileSize * 6, h: _tileSize * 1})
		.bind('MouseUp', function(MouseEvent){
			//create player
			//player
			userPlayer = new playerObj;
			Crafty.scene("Game");
		});

	var conGameBtn = Crafty.e('btnContinue, 2D, ' + renderEngine + ', Mouse, Touch, menu_continueGame')
		.attr({x: 0 , y: newGameBtn._y + newGameBtn._h + 20, w: _tileSize * 6, h: _tileSize * 1})
		.bind('MouseUp', function(MouseEvent){
			//create player
			//player
			userPlayer = new playerObj;
			Crafty.scene("Game");
		});

	var statGameBtn = Crafty.e('btnStats, 2D, ' + renderEngine + ', Mouse, Touch, menu_helpInfo')
	.attr({x: 0 , y: conGameBtn._y + conGameBtn._h + 20, w: _tileSize * 6, h: _tileSize * 1})
	.bind('MouseUp', function(MouseEvent){
		//create player
		//player
		userPlayer = new playerObj;
		Crafty.scene("Game");
	});

	Crafty.viewport.centerOn(Crafty("btnContinue")[0],0)
	
});
