//GLOBAL VARIBLES
//Crafty.DOM.translate(Crafty.lastEvent.clientX,Crafty.lastEvent.clientY); //gets mouse location.
//Game settings.

var _tileSize = 66;
var renderEngine = "DOM"
//renderEngine = "Canvas" //
var gameSeed = Math.floor((Math.random() * 4) + 1); //TODO DEBUG Increase to 100000
//gameSeed = 1; //DEBUGING 
var roomCenter = {x: _tileSize, y: _tileSize}

//Mouse varibles
var mouseFunction = "movePlayer";
//for mouse hold timing
var holdStarter = null;
var holdStarterToolbox = null;
var holdDelay = 300; 
var holdActive = false;

//player
var firstRun = true;
var userPlayer; // = new playerObj;
var playerEntity;
var lastPos = new Position(0,0,0);
var playerRoomPos;

//Room Varibles
var maxWidth = 9;
var maxHeight = 11;
var floorMap = [];
floorMap[0] = [];
var rooms = [];
var originDoors = [];
var currentRoom;
var lastRoom;
var lastDoor;
var roomRandom;
var doorRandom;
var originDoorSuccess = true;
//TexturePack
var numOfFloorStyles = 8;
var numOfDoorStyles = 6;

//difficulty
var sparseness = 10; //lower = more chance of linked rooms.
var doorChance = 5; //(2 in doorChance) higher = less doors

$(document).ready(function() {
	console.log( "Document completed!" );
	//Start crafty
	beginCrafty();
});

function beginCrafty() {
	// Initialize and start our game
	//get width and heigt of our game screen.
	//var gameClientWidth = document.getElementById('gameviewDOM').clientWidth;
	
	setTimeout(function() { 

		var gameClientWidth = $(window).width();
		var gameClientHeight = $(window).height();
		//get new tile size
		//11 tiles wide
		var minWidth = Math.floor(gameClientWidth/(maxWidth+2));
		var minHeight = Math.floor(gameClientHeight/(maxHeight+4));
		if (minWidth >= minHeight) { 
			_tileSize = minHeight;
		}
		else { _tileSize = minWidth; }
		//minimize if required
		//if (gameClientWidth > 600) { gameClientWidth = 600; $('#gameviewDOM').width(600); }
		//if (gameClientHeight > 700) { gameClientHeight = 700; $('#gameviewDOM').height(700); }
	
		console.log(gameClientWidth + "width x height" + gameClientHeight);
		// Start crafty and set a background color so that we can see it's working.
		console.log("ready to start Crafty");
		Crafty.mobile = true;
		Crafty.init();
		//Crafty.background('#8ed2fa'); //niceblue
		Crafty.background('#790000');
		
		Crafty.viewport.init();
		//start game or loading scene
		Crafty.timer.FPS(30);
		//Crafty.viewport.clampToEntities = false;
		Crafty.scene('Loading');
		
		
	}, 300);
	
};

function toolPauseGame() {
	//check if game is 
	if ( Crafty.isPaused() ) {
		console.log("unpausing game");
		Crafty.pause();
		//$("#toolboxPlay").removeAttr("id").attr("id", "toolboxPause");
	}
	else {
		console.log("pausing game");
		Crafty.pause();
		//$("#toolboxPause").removeAttr("id").attr("id", "toolboxPlay");
	}	
};
