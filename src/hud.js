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
	$( "#statusWindowFooter" ).html("<div id='statusFooterExpand'><center>^</center></div>")
	$( "#statusWindowFooter" ).css('visibility', 'visible');

	//postion at bottom
	//$( "#statusWindowFooter" ).position().top //for later
	var newTop = Crafty.viewport.height - $( "#statusWindowFooter" ).height();
	$( "#statusWindowFooter" ).css('top', newTop + 'px');
}

function footClickHandlers() {
	$( "#statusWindowFooter" ).on('mouseup', '#statusFooterExpand' ,function() {
		//Expand the footer
		console.log("clicked");
		//check if footer is expanded.
		
		if ($( "#statusWindowFooter" ).height() < Crafty.viewport.height/10) {
			//Footer is Down
			$( "#statusWindowFooter" ).height(Crafty.viewport.height/5);
			var newTop = Crafty.viewport.height - $( "#statusWindowFooter" ).height();
			$( "#statusWindowFooter" ).css('top', newTop + 'px');
			var textSeed = gameSeed;
			var d = new Date();
			var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
			var checkSeed = days[d.getDay()] + ' ' + d.getDay() + '/' + d.getMonth() + '/' + d.getFullYear();
			if (textSeed == checkSeed) {textSeed = 'Daily';}
			$( "#statusWindowFooter" ).html('<div id="statusFooterExpand"><center>v</center><center><table style="width:100%" class="containsTextFooter" ><tr><td><b>Seed: </b>'+ textSeed +'</td><td><b>Rank: </b>' + getRank(userPlayer.score.actual).currentLevel + '</td><td rowspan=2><img src="res/img/Home.png" style:"width: 10px,height: 10px;" id="footEndGame"><br /><b>END</b></td></tr><tr><td><b>Record: </b>'+ textSeed +'</td><td><b>New: </b>' + getRank(userPlayer.score.visible).currentLevel + '</td></tr></table><center></div>')
			$('#footEndGame').height((Crafty.viewport.height/6)/2.5)
		}
		else {
			//Footer is up
			$( "#statusWindowFooter" ).height(Crafty.viewport.height/15);
			var newTop = Crafty.viewport.height - $( "#statusWindowFooter" ).height();
			$( "#statusWindowFooter" ).css('top', newTop + 'px');
			$( "#statusWindowFooter" ).html("<div id='statusFooterExpand'><center>^</center></div>")
		}

		return false;
	});
}
