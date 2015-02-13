//GLOBAL VARIBLES
//Crafty.DOM.translate(Crafty.lastEvent.clientX,Crafty.lastEvent.clientY); //gets mouse location.
var consoleLogging = true;
//Game settings.
var _tileSize = 50;
var gameSeed = Math.floor((Math.random() * 4) + 1); //TODO DEBUG Increase to 100000
//gameSeed = "debug";
var playerOffset = 0;
var roomCenter = {x: _tileSize, y: _tileSize}

//Mouse varibles
var mouseFunction = "movePlayer";
//for mouse hold timing
var holdStarter = null;
var holdStarterToolbox = null;
var holdDelay = 300; 
var holdActive = false;

//Room Varibles
var floorMap = [];
floorMap[0] = [];
var rooms = [];
var currentRoomPos = {};
var currentRoom;
var roomRandom;

//difficulty
var sparseness = 5;
var doorChance = 3; //(1 in doorChance)

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
