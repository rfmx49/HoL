Crafty.scene('Menu', function() {

	//
	//Game events (MOUSE CLICKS ECT..)
	//

	var newGameBtn = Crafty.e('btnNewGame, 2d, ' + renderEngine + ', menu_newGame, Mouse, Touch')
		.attr({x: 0, y: 0, w: _tileSize * 6, h: _tileSize * 1})
		.bind('MouseUp', function(MouseEvent){
			//create player
			//player
			playSound("menu_select");
			_tutorial = false;
			userPlayer = new playerObj;
			genGameSeed();
			Crafty.scene("Game");
		});

	var conGameBtn = Crafty.e('btnContinue, 2D, ' + renderEngine + ', Mouse, Touch, menu_continueGame')
		.attr({x: 0 , y: newGameBtn._y + newGameBtn._h + 20, w: _tileSize * 6, h: _tileSize * 1})
		.bind('MouseUp', function(MouseEvent){
			playSound("menu_select");
			_tutorial = false;
			gameSeed = localStorage.lastSeed;
			userPlayer = new playerObj;
			Crafty.scene("Game");
		});

	var statGameChallangeBtn = Crafty.e('btnChallange, 2D, ' + renderEngine + ', Mouse, Touch, menu_challange')
		.attr({x: 0 , y: conGameBtn._y + conGameBtn._h + 20, w: _tileSize * 6, h: _tileSize * 1})
		.bind('MouseUp', function(MouseEvent){
			//Move continue button up delete newgame button.
			//get new game button y
			playSound("menu_select");
			_tutorial = false;
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

			$('#' + Crafty('menuSeedText')._element.id).append('<input id="inputSeed" class="containsText inputText" type="text" />');
			$('#inputSeed').width(menuSeedEntity._w*.66);
			$('#inputSeed').height(_tileSize/2);
			$('#inputSeed').val('DailyChallange')

		
			//$( "#seedTextBox" ).css('visibility', 'visible');
		

			//change continue button to start button
			newY = statGameBtn._y;
			Crafty('btnStats').destroy();

			Crafty.e('btnStart, 2D, ' + renderEngine + ', Mouse, Touch, menu_back')
				.attr({x: 0 , y: conGameBtn._y + conGameBtn._h + 20, w: _tileSize * 6, h: _tileSize * 1})
				.bind('MouseUp', function(MouseEvent){
					//DELETE TEXT BOX TOO
					playSound("menu_select");
					Crafty.scene("Menu");
				});

			//change stat button to back button

			Crafty.e('btnStart, 2D, ' + renderEngine + ', Mouse, Touch, menu_start')
				.attr({x: 0 , y: conGameBtn._y, w: _tileSize * 6, h: _tileSize * 1})
				.bind('MouseUp', function(MouseEvent){
					//DELETE TEXT BOX TOO
					//get new seed
					playSound("menu_select");
					var newSeed = $('#inputSeed').val();
					if ((newSeed == "") || (newSeed == "DailyChallange")) {
						dailyChallange = true;
						var d = new Date();
						//var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
						//gameSeed = days[d.getDay()] + ' ' + d.getDay() + '/' + d.getMonth() + '/' + d.getFullYear();
						gameSeed = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
					}
					else {
						gameSeed = $('#inputSeed').val();
						dailyChallange = false;
					}
					userPlayer = new playerObj;
					Crafty.scene("Game");
				});
	});

	var statGameBtn = Crafty.e('btnStats, 2D, ' + renderEngine + ', Mouse, Touch, menu_helpInfo')
		.attr({x: 0 , y: statGameChallangeBtn._y + statGameChallangeBtn._h + 20, w: _tileSize * 6, h: _tileSize * 1})
		.bind('MouseUp', function(MouseEvent){
			//create player
			//player
			//optionsMenu();
			playSound("menu_select");
			_tutorial = true;
			//potential tut seeds 11245
			playSound("menu_select");
			gameSeed = 11245;
			userPlayer = new playerObj;
			Crafty.scene("Game");		
	});

	Crafty.viewport.centerOn(Crafty("btnContinue")[0],0)
	displayAccounts();
});

function optionsMenu() {
	fadeOutView(false, 300,0,0,.5);
	alert(localStorage.playerUUID);
}

function displayAccounts() {
	$('#accountsContainer').css("visibility","visible");
	$('#accountsContainer').css('top', '0px');
	$('#accountsContainer').height(Crafty.viewport.height*.25);
	$('#accountsContainer').width(Crafty.viewport.width*.8);
	$('#accountsContainer').css('left', (Crafty.viewport.width - $('#accountsContainer').width())+'px');
	//checked if logged in
	var logedin = false;
	var html;	
	if (typeof sessionStorage.roomJumeUser !== 'undefined') {
		logedin = true;
	}
	if (logedin) {
		var roomJumeUser = sessionStorage.roomJumeUser;
		html = '<div id="accountsDivs"><p>' + roomJumeUser + ' is logged in. <a id="accountsLogout" href="#">logout</a></p></div>';
	}
	else {
		html = '<a id="accountsRegister" href="#">Register/Login</a></div>';
	}
	$('#accountsContainer').html(html);
	$('#accountsContainer').height($('#accountsDivs').height());
}

function hideAccounts() {
	//destroy the accounts info.
	$('#accountsContainer').css("visibility","hidden");
	$('#accountsContainer').html("");
	$('#accountsContainer').height(0);
	$('#accountsContainer').width(0);
}

function accountsClickHandlers() {
	//END GAME POPUP

	$( "#accountsContainer" ).on('mouseup', '#accountsRegister' ,function() {
		console.log('clicked register');
		//check if username is created in localstorage
		if (typeof localStorage.username !== 'undefined'){
			popUpCreate('register',{"userName":localStorage.username});
		} else { popUpCreate('register') }	
	});

	$( "#accountsContainer" ).on('mouseup', '#accountsLogout' ,function() {
		sessionStorage.removeItem('roomJumeUser');
		displayAccounts();
	});

	
}
