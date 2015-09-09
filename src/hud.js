function createHud() {
	//Ui is divided into maxWidth = 9 + 2/maxHeight = 11+4; or 11/15 gird.
	//Each grid section is one _tileSize.

	//Header
	$( "#statusWindow" ).width(Crafty.viewport.width);
	$( "#statusWindow" ).height(Crafty.viewport.height/15);
	$( "#statusWindow" ).append("<div id='#statusWindow'><table style='width:100%'><tr style='width:100%'><td class='ui-scores'><div id='ui-score'><h2>COUNT: <span id='ui-game-score'></span></div></h2></td><td class='ui-Ranks'><h2><div id='ui-Rank'>RANK: <span id='ui-game-rank'></span></div><h2></td></tr><tr style='width:100%'><td class='ui-roomname' colspan='2'><span id='ui-game-roomname'>NAME Room NAMERoom</span></td></tr></table></div>")

	//Footer
	$( "#statusWindowFooter" ).width(Crafty.viewport.width);
	$( "#statusWindowFooter" ).height(Crafty.viewport.height/25); //Will expand
	$( "#statusWindowFooter" ).append("<div id='statusFooterExpand'><center>^</center></div>")

	//postion at bottom
	//$( "#statusWindowFooter" ).position().top //for later
	var newTop = Crafty.viewport.height - $( "#statusWindowFooter" ).height();
	$( "#statusWindowFooter" ).css('top', newTop + 'px');

	$( "#statusWindowFooter" ).on('click', '#statusFooterExpand' ,function() {
		//Expand the footer
		console.log("clicked");
		//check if footer is expanded.
		
		if ($( "#statusWindowFooter" ).height() < Crafty.viewport.height/24) {
			//Footer is Down
			$( "#statusWindowFooter" ).height(Crafty.viewport.height/5);
			var newTop = Crafty.viewport.height - $( "#statusWindowFooter" ).height();
			$( "#statusWindowFooter" ).css('top', newTop + 'px');
			$( "#statusWindowFooter" ).html('<div id="statusFooterExpand"><center>^</center><center><table><tr><td>Seed: </td><td>'+ gameSeed +'</td><td>-</td></tr><tr><td>4</td><td>5</td><td>6</td></tr></table><center></div>')
		}
		else {
			//Footer is up
			$( "#statusWindowFooter" ).height(Crafty.viewport.height/25);
			var newTop = Crafty.viewport.height - $( "#statusWindowFooter" ).height();
			$( "#statusWindowFooter" ).css('top', newTop + 'px');
			$( "#statusWindowFooter" ).html("<div id='statusFooterExpand'><center>^</center></div>")
		}
	});
}
