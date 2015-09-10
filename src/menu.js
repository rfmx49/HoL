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
			gameSeed = localStorage.lastSeed;
			userPlayer = new playerObj;
			Crafty.scene("Game");
		});

	var statGameChallangeBtn = Crafty.e('btnChallange, 2D, ' + renderEngine + ', Mouse, Touch, menu_challange')
	.attr({x: 0 , y: conGameBtn._y + conGameBtn._h + 20, w: _tileSize * 6, h: _tileSize * 1})
	.bind('MouseUp', function(MouseEvent){
		//Move continue button up delete newgame button.
			//get new game button y
			var newY = newGameBtn._y - newGameBtn._h; 
			Crafty('btnNewGame').destroy();

			//create Seed container
			var menuSeedEntity = Crafty.e('menuSeed, 2D, ' + renderEngine + ', menu_enterSeed')
				.attr({x: 0 , y: newY, w: _tileSize * 6, h: _tileSize * 2});

			//postion textbox
			newY = menuSeedEntity._y + (menuSeedEntity._h*.50)
			var newX = menuSeedEntity._x + (menuSeedEntity._w*.165);
			
			Crafty.e('menuSeedText, 2D, ' + renderEngine)
				.attr({x: newX , y: newY , w: _tileSize * 6, h: _tileSize * 2});

			$('#' + Crafty('menuSeedText')._element.id).append('<input id="inputSeed" type="text" />');
			$('#inputSeed').width(menuSeedEntity._w*.66);
			$('#inputSeed').val('DailyChallange')

			
			//$( "#seedTextBox" ).css('visibility', 'visible');
			

			//change continue button to start button
			newY = statGameBtn._y;
			Crafty('btnStats').destroy();

			Crafty.e('btnStart, 2D, ' + renderEngine + ', Mouse, Touch, menu_back')
				.attr({x: 0 , y: conGameBtn._y + conGameBtn._h + 20, w: _tileSize * 6, h: _tileSize * 1})
				.bind('MouseUp', function(MouseEvent){
					//DELETE TEXT BOX TOO
					Crafty.scene("Menu");
				});

			//change stat button to back button

			Crafty.e('btnStart, 2D, ' + renderEngine + ', Mouse, Touch, menu_start')
				.attr({x: 0 , y: conGameBtn._y, w: _tileSize * 6, h: _tileSize * 1})
				.bind('MouseUp', function(MouseEvent){
					//DELETE TEXT BOX TOO
					//get new seed
					var newSeed = $('#inputSeed').val();
					if ((newSeed == "") || (newSeed == "DailyChallange")) {
						var d = new Date();
						var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
						gameSeed = days[d.getDay()] + ' ' + d.getDay() + '/' + d.getMonth() + '/' + d.getFullYear();
					}
					else {
						gameSeed = $('#inputSeed').val();
					}
					userPlayer = new playerObj;
					Crafty.scene("Game");
				});
			
			//create player
			//player
			//userPlayer = new playerObj;
			//Crafty.scene("Game");
	});


	var statGameBtn = Crafty.e('btnStats, 2D, ' + renderEngine + ', Mouse, Touch, menu_helpInfo')
	.attr({x: 0 , y: statGameChallangeBtn._y + statGameChallangeBtn._h + 20, w: _tileSize * 6, h: _tileSize * 1})
	.bind('MouseUp', function(MouseEvent){
		//create player
		//player
		userPlayer = new playerObj;
		Crafty.scene("Game");
	});

	Crafty.viewport.centerOn(Crafty("btnContinue")[0],0)
	
});
