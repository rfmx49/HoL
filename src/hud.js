function createHud() {
	//Ui is divided into maxWidth = 9 + 2/maxHeight = 11+4; or 11/15 gird.
	//Each grid section is one _tileSize.

	//Header
	$( "#statusWindow" ).width(Crafty.viewport.width);
	$( "#statusWindow" ).height(Crafty.viewport.height/15);
	$( "#statusWindow" ).html("<div id='#statusWindow' class='containsText'><table style='width:100%' class='containsText'><tr style='width:100%'><td class='ui-scores'><div id='ui-score'>COUNT: <span id='ui-game-score'></span></div></td><td class='ui-Ranks'><div id='ui-Rank'>RANK: <span id='ui-game-rank'>0</span></div></td></tr><tr style='width:100%'><td class='ui-roomname' colspan='2'><span id='ui-game-roomname'></span></td></tr></table></div>")

	//Footer
	$( "#statusWindowFooter" ).width(Crafty.viewport.width);
	$( "#statusWindowFooter" ).height(Crafty.viewport.height/15); //Will expand
	$( "#statusWindowFooter" ).html("<div id='statusFooterExpand'><center>^</center></div>");
	$( "#statusWindowFooter" ).css('visibility', 'visible');

	//postion at bottom
	//$( "#statusWindowFooter" ).position().top //for later
	var newTop = Crafty.viewport.height - $( "#statusWindowFooter" ).height();
	$( "#statusWindowFooter" ).css('top', newTop + 'px');
}

function destroyHud() {
	//destory Header
	$( "#statusWindow" ).html("");
	$( "#statusWindow" ).width(0);
	$( "#statusWindow" ).height(0);
	//destory footer
	$( "#statusWindowFooter" ).html("");
	$( "#statusWindowFooter" ).width(0);
	$( "#statusWindowFooter" ).height(0);
}

function fadeInView (toggle, fadeTime, delay, restartTime) {
	Crafty('fadeOut').destroy();
	Crafty('fadeIn').destroy();
	//zoomOutFade();
	Crafty.e('fadeIn, 2D,' + renderEngine + ', Color, Tween')
		.attr({x: -10-Crafty.viewport.x, y: -10-Crafty.viewport.y, w: 10+Crafty.viewport.width, h: 10+Crafty.viewport.height, alpha: 1, z: 1000})
		.color('#000000')
		.tween({ alpha: 0}, fadeTime)
		.bind("TweenEnd", function(){ 
			//console.log("tween complete"); 
			if (toggle) {
				setTimeout(function() {
					fadeOutView(false,restartTime);
				}, delay, restartTime);				
			}
		});
}

function fadeOutView (toggle, fadeTime, delay, restartTime) {
	Crafty('fadeIn').destroy();
	Crafty('fadeOut').destroy();
	//zoomInFade();
	Crafty.e('fadeOut, 2D,' + renderEngine + ', Color, Tween')
		.attr({x: -10-Crafty.viewport.x, y: -10-Crafty.viewport.y, w: 10+Crafty.viewport.width, h: 10+Crafty.viewport.height, alpha: 0,z: 1000})
		.color('#000000')
		.tween({ alpha: 1}, fadeTime)
		.bind("TweenEnd", function(){ 
			//console.log("tween complete"); 
			if (toggle) {
				setTimeout(function() {					
					fadeInView(false,restartTime);
				}, delay, restartTime);
			}
		});
}

function zoomInFade() {
	Crafty.viewport.zoom(4,playerEntity._x + (_tileSize/2),playerEntity._y + (_tileSize/2),200);
}

function zoomOutFade() {
	Crafty.viewport.centerOn(centerPoint, 0);
	Crafty.viewport.zoom(0,centerPoint._x,centerPoint._y,250);
	
}

function loadingLoop() {
	//fadeOutView(false,1000);
	var loadingIcon = Crafty.e('loadingAnimate, loading_reel').attr({x: centerPoint._x-(_tileSize*1.5), y: centerPoint._y-_tileSize, w: 2*_tileSize, h: 2*_tileSize, alpha: 1});
	Crafty('fadeOut').attach(loadingIcon);
	Crafty('loadingAnimate').loadingForward();
}

function footClickHandlers() {
	$( "#statusWindowFooter" ).on('mouseup', '#statusFooterExpand' ,function() {
		//Expand the footer
		console.log("clicked");
		//check if footer is expanded.
		
		if ($( "#statusWindowFooter" ).height() < Crafty.viewport.height/10) {
			//Footer is Down
			footerChange(true);
		}
		else {
			footerChange(false);
		}
		return false;
	});

	$( "#statusWindowFooter" ).on('mouseup', ' #statusFooterExpand #footEndGame' ,function() {
		//Expand the footer
		console.log("clicked");		
		//footerChange(false);

		popUpCreate("endGame");
		
	});

	$( "#statusWindowFooter" ).on('mouseup', ' #statusFooterExpand #hintShowDoor' ,function() {
		//Expand the footer
		console.log("hint Cliked show Door");		
		//footerChange(false);

		hintShowDoors();
		
	});

	$( "#statusWindowFooter" ).on('mouseup', ' #statusFooterExpand #hintShowRoom' ,function() {
		//Expand the footer
		console.log("hint Cliked show room");		
		//footerChange(false);
		
		hintShowRoom();
	});
}

function footerChange(expand) {
	if (expand) {
		$( "#statusWindowFooter" ).height(Crafty.viewport.height/5);
		//Footer is Down
			var newTop = Crafty.viewport.height - $( "#statusWindowFooter" ).height();
			$( "#statusWindowFooter" ).css('top', newTop + 'px');
			var textSeed = gameSeed;
			var d = new Date();
			var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
			var checkSeed = days[d.getDay()] + ' ' + d.getDay() + '/' + d.getMonth() + '/' + d.getFullYear();
			if (textSeed == checkSeed) {textSeed = 'Daily';}
			$( "#statusWindowFooter" ).html('<div id="statusFooterExpand"><center>v</center><center><table class="statusWindowFooterTable containsTextFooter" ><tr><td rowspan=2><center><img src="res/img/hud/door.png" style:"width: 10px,height: 10px;"  id="hintShowDoor"><img src="res/img/hud/checkList.png" style:"width: 10px,height: 10px;" id="hintShowRoom"></center></td><td><b>Rank: </b>' + userPlayer.score.rank + '</td><td rowspan=2 align="center"><img src="res/img/hud/home.png" style:"width: 10px,height: 10px;" id="footEndGame"><br /><b>END</b></td></tr><tr><td><b>Next in: </b>' + getRank(userPlayer.score.visible).difference + ' rooms.</td></tr></table><center></div>')
			$('#footEndGame').height((Crafty.viewport.height/6)/2.5);
			$('#hintShowDoor').height((Crafty.viewport.height/6)/1.5);
			$('#hintShowRoom').height((Crafty.viewport.height/6)/1.5);
	}
	else {
		//Footer is up
			$( "#statusWindowFooter" ).height(Crafty.viewport.height/15);
			var newTop = Crafty.viewport.height - $( "#statusWindowFooter" ).height();
			$( "#statusWindowFooter" ).css('top', newTop + 'px');
			$( "#statusWindowFooter" ).html("<div id='statusFooterExpand'><center>^</center></div>")
	}
}

function popUpClickHandlers() {
	$( "#gamePopUp" ).on('mouseup', '#popUpEndBtnImg' ,function() {
		//fade in view
		fadeInView(false, 500);
		//Expand the footer
		console.log("clicked endGame");
		//destroy the popup.

		//Send Score to Google.
		if (dailyChallange) { postToGoogleDaily(); }
		popUpDestroy();
		//Save userdata
		var userPlayerSaved = JSON.parse(localStorage.playerSaveData);
		//check if we are home
		if (currentRoom == 0) {
			//Are home
			userPlayerSaved.score = parseInt(userPlayerSaved.score) + userPlayer.score.actual;
			userPlayerSaved.rank = userPlayer.score.rank;
			userPlayerSaved.found = userPlayerSaved.found + 1;
		}
		else {
			userPlayerSaved.lost = userPlayerSaved.lost + 1;
			userPlayerSaved.lostScore = userPlayerSaved.lostScore + userPlayer.score.potentialLost;
		}
		userPlayerSaved.active = false;
		//Save Game Data
		userPlayerSaved.g.push(new gameSaveObj(userPlayer.score.actual, gameSeed));

		//Save PlayerData
		localStorage.playerSaveData = JSON.stringify(userPlayerSaved);
		destroyHud();
		//back to menu
		Crafty.scene("Menu");
		
	});

	$( "#gamePopUp" ).on('mouseup', '#popUpConBtnImg' ,function() {
		//Expand the footer
		fadeInView(false, 500);
		console.log("clicked Continue Game");
		//destroy the popup.
		popUpDestroy();
		
	});
}

function popUpDestroy() {
	//destroy the popup.
	$('#gamePopUp').html("")
	$('#gamePopUp').height(0);
	$('#gamePopUp').width(0);
}

function popUpCreate(type) {
	fadeOutView(false, 300);
	Crafty('fadeOut').addComponent('Mouse')
	Crafty('fadeOut').bind("MouseUp", function(MouseEvent) { 
		fadeInView(false, 300);
		popUpDestroy();
	});
	
	if (type == 'endGame') {
		$('#gamePopUp').css('top', (Crafty.viewport.height*.05)+'px');
		$('#gamePopUp').css('left', (Crafty.viewport.width*.05)+'px');
		$('#gamePopUp').height(Crafty.viewport.height*.8);
		$('#gamePopUp').width(Crafty.viewport.width*.9);
		if (currentRoom == 0) {
			var isHome = true;
			var lostClass = null;
			var textLost = ['Home','Safe','At Base','Known']
			textLost = textLost[Math.floor(Math.random() * textLost.length)]
			var leavingMessage = "End game now to save your achivements. Or continue to try increase them but be <strong>WARNED</strong> if you get lost your achivements are lost with you!"
		}
		else {
			var isHome = false;
			var lostClass = "endGamePopUpTableColoured"
			var textLost = ['LOST','AWOL','Missing','Lost','Unknown','Not Home','Adrift','Disoriented','Vanished','Wandering','Irrecoverable','Irretrievable','Wherabouts Unknown','Missing Presumed Dead','MIA']
			textLost = textLost[Math.floor(Math.random() * textLost.length)]
			var leavingMessage = "Lost? Cannot find your way? To many dead end corridors? Nothing looks farmilliar? Give up now!<br /><br /> <strong>CAUTION</strong> all achivements from this exploration will be lost."
		}
	
		var rank = getRank(userPlayer.score.actual);
		var userPlayerSaved = JSON.parse(localStorage.playerSaveData);
		var totalRank = getRank((parseInt(userPlayerSaved.score) + userPlayer.score.actual));
		if (isHome) {
			$('#gamePopUp').html('<table id="endGamePopUpTable"><tr><th colspan="4"><strong>Are you sure you are ready to leave?</strong></th></tr><tr><td colspan="4"></td></tr><tr><td colspan="4"><hr></td></tr><tr><td colspan="2">Current Location:</td><td colspan="1" align="center" class="popUpValue ' + lostClass + ' ">' + textLost + '</td><td></td></tr><tr><td colspan="4"><hr></td></tr><tr><td colspan="3">Total number of rooms explored:</td><td class="popUpValue">' + userPlayer.score.actual + '</td></tr><tr><td colspan="3">All time total rooms explored:</td><td class="popUpValue">' + (parseInt(userPlayerSaved.score) + userPlayer.score.actual) + '</td></tr><tr><td colspan="4"></td></tr><tr><td colspan="3">Rank achieved this exploration:</td><td class="popUpValue">' + rank.currentLevel + '</td></tr><tr><td colspan="3">Rooms required to rank up:</td><td class="popUpValue">' + rank.difference + '</td></tr><tr><td colspan="3">New overall rank:</td><td class="popUpValue">' + totalRank.currentLevel + '</td></tr><tr><td colspan="3">Rooms required to rank up:</td><td class="popUpValue">' + totalRank.difference + '</td></tr><tr><td colspan="4"></td></tr><tr><td colspan="4"></td></tr><tr><td colspan="4"><hr></td></tr><tr><td colspan="4" align="center">' + leavingMessage + '</td></tr><tr><td colspan="2" align="center" class="noBorder"><div class="popUpImgContain" id="popUpConBtnImg"></div></td><td class="noBorder"></td><td class="noBorder"><div class="popUpImgContain"  id="popUpEndBtnImg"></div></td></tr></table>');
		}
		else {
			rank = getRank(userPlayer.score.visible);
			totalRank = getRank((parseInt(userPlayerSaved.score) + userPlayer.score.visible));
			$('#gamePopUp').html('<table id="endGamePopUpTable"><tr><th colspan="4"><strong>Are you sure you are ready to leave?</strong></th></tr><b><tr><td colspan="4"></td></tr><tr><td colspan="4"><hr></td></tr><tr><td colspan="2">Current Location:</td><td colspan="1" align="center" class="popUpValue ' + lostClass + ' ">' + textLost + '</td><td></td></tr><tr><td colspan="4"><hr></td></tr><tr><td colspan="3">Total number of rooms explored:</td><td class="popUpValue">' + userPlayer.score.visible + '</td></tr><tr><td colspan="3">All time total rooms explored:</td><td class="popUpValue">' + (parseInt(userPlayerSaved.score) + userPlayer.score.visible) + '</td></tr><tr><td colspan="4"></td></tr><tr><td colspan="3">Rank achieved this exploration:</td><td class="popUpValue">' + rank.currentLevel + '</td></tr><tr><td colspan="3">Rooms required to rank up:</td><td class="popUpValue">' + rank.difference + '</td></tr><tr><td colspan="3">New overall rank:</td><td class="popUpValue">' + totalRank.currentLevel + '</td></tr><tr><td colspan="3">Rooms required to rank up:</td><td class="popUpValue">' + totalRank.difference + '</td></tr><tr><td colspan="4"></td></tr><tr><td colspan="4"></td></tr><tr><td colspan="4"><hr></td></tr><tr><td colspan="4" align="center">' + leavingMessage + '</td></tr><tr><td colspan="2" align="center" class="noBorder"><div class="popUpImgContain" id="popUpConBtnImg"></div></td><td class="noBorder"></td><td class="noBorder"><div class="popUpImgContain"  id="popUpEndBtnImg"></div></td></tr></b>></table>');
		}

		$('#popUpEndBtnImg').height(_tileSize);
		$('#popUpConBtnImg').height(_tileSize);
	}
	else if (type == 'hintRoom') {
		$('#gamePopUp').css('top', (Crafty.viewport.height*.33)+'px');
		$('#gamePopUp').css('left', (Crafty.viewport.width*.05)+'px');
		$('#gamePopUp').height(Crafty.viewport.height*.15);
		$('#gamePopUp').width(Crafty.viewport.width*.9);

		var notVisited = (rooms.length - 1) == currentRoom;

		if (notVisited) {
			$('#gamePopUp').html('<center><b>This room has NOT been visited before.</b></center>');
		}
		else {
			$('#gamePopUp').html('<center><b>This room HAS been visited before.</b></center>');
		}
		
	}
	mobileFontSize();
	
}

function mobileFontSize() {
	if (mobileCheck()) {
		$('.containsText').css({'font-size': (_tileSize*.75) + 'px'});
		$('#endGamePopUpTable td').css({'font-size': (_tileSize*.4) + 'px'});
		$('#endGamePopUpTable th').css({'font-size': (_tileSize*.45) + 'px'});
	}
	else {
		$('.containsText').css({'font-size': (_tileSize*.75) + 'px'});
		$('#endGamePopUpTable td').css({'font-size': (_tileSize*.4) + 'px'});
		$('#endGamePopUpTable th').css({'font-size': (_tileSize*.45) + 'px'});
	}
}
