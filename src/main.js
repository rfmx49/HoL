//GLOBAL VARIBLES
//Crafty.DOM.translate(Crafty.lastEvent.clientX,Crafty.lastEvent.clientY); //gets mouse location.
//Game settings.

//Z index
//1
//2 - Floor Tiles
//3 - Wall Tiles
//4 - Door Animations
//5 - Highlights
//6 - Player

var _tileSize = 66;
var renderEngine = "DOM"
//renderEngine = "Canvas" //
var gameSeeds = 100000;



var gameSeed;
genGameSeed();

//gameSeed = 4; //DEBUGING
//gameSeed = 23086;
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
var objectMap = [[]];
//objectMap[0] = [];
var rooms = [];
var originDoors = [];
var currentRoom;
var lastRoom;
var lastDoor;
var roomRandom;
var doorRandom;
var pathRandom;
var furnitureRandom;
var originDoorSuccess = true;
var deleteRoom = false;
//TexturePack
var numOfFloorStyles = 8;
var numOfDoorStyles = 6;

//difficulty
var sparseness = 10; //lower = more chance of linked rooms.
var doorChance = 10; //(2 in doorChance) higher = less doors

$(document).ready(function() {
	console.log( "Document completed!" );
		
	//verify gameseed
	verifySeed();
	
	//Start crafty
	beginCrafty();
});

function verifySeed() {
	//interesting seeds
	//1748(1x1 room with door, 6877(only three rooms), 92166(only 3 rooms)
	//No doors, 8696
	//Broken Seeds
	var brokenSeeds = [1814,98351,92166,8696];
	if (brokenSeeds.indexOf(gameSeed) != -1) {
		genGameSeed();
		verifySeed();
	}
}

function genGameSeed() {
		gameSeed = Math.floor((Math.random() * gameSeeds) + 1); //TODO DEBUG Increase to 100000
		verifySeed();
}

function beginCrafty() {
	// Initialize and start our game
	//get width and heigt of our game screen.
	//var gameClientWidth = document.getElementById('gameviewDOM').clientWidth;
	
	setTimeout(function() { 

		var gameClientWidth = $(window).width();
		var gameClientHeight = $(window).height();
		//get new tile size
		//11 tiles wide
		var minWidth = Math.floor(gameClientWidth/(maxWidth+1));
		var minHeight = Math.floor(gameClientHeight/(maxHeight+3));
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
		Crafty.mobile = false;
		Crafty.init();
		//Crafty.background('#8ed2fa'); //niceblue
		//Crafty.background('#FCF0AD'); //Canary yellow
		//Crafty.background('#E9E74A'); //yellowy not good on mobile
		//Crafty.background('#FFFFC0');
		
		Crafty.viewport.init(12*_tileSize,14*_tileSize);
		Crafty.background('#FFFFC0 url(res/img/hud/paper.png) center center');
		//start game or loading scene
		//Crafty.timer.FPS(30);
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
