//GLOBAL VARIBLES
//Crafty.DOM.translate(Crafty.lastEvent.clientX,Crafty.lastEvent.clientY); //gets mouse location.
//varibles for click and hold to show an items sub menu.
var consoleLogging = true;
//var playerOffset = 12.5;
//gameDefaults
var _tileSize = 50;
var playerOffset = 0;
var roomCenter = {x: _tileSize, y: _tileSize}

//for mouse hold timing
var holdStarter = null;
var holdStarterToolbox = null;
var holdDelay = 300; 
var holdActive = false;

$(document).ready(function() {
	toConsole( "Document completed!" );
	//Start crafty
	beginCrafty();
});

function beginCrafty() {
	// Initialize and start our game
	//get width and heigt of our game screen.
	//var gameClientWidth = document.getElementById('gameviewDOM').clientWidth;
	
	setTimeout(function() { 

		var gameClientWidth = $('#gameviewDOM').width();
		var gameClientHeight = $('#gameviewDOM').height();
	
		toConsole(gameClientWidth + "width x height" + gameClientHeight);
		// Start crafty and set a background color so that we can see it's working.
		toConsole("ready to start Crafty");
		Crafty.init(gameClientWidth, gameClientHeight, "gameviewDOM");
		//Crafty.background('#8ed2fa'); //niceblue
		Crafty.background('#790000');
		
		Crafty.viewport.init(gameClientWidth, gameClientHeight, "gameviewDOM");
		//start game or loading scene
		Crafty.timer.FPS(30);
		Crafty.mobile = true;
		Crafty.scene('Loading');
		
		
	}, 300);
	
};

function toolPauseGame() {
	//check if game is 
	if ( Crafty.isPaused() ) {
		toConsole("unpausing game");
		Crafty.pause();
		//$("#toolboxPlay").removeAttr("id").attr("id", "toolboxPause");
	}
	else {
		toConsole("pausing game");
		Crafty.pause();
		//$("#toolboxPause").removeAttr("id").attr("id", "toolboxPlay");
	}	
};

function toConsole(msg) {
	if (consoleLogging) {
		console.log(msg);
	}
}
