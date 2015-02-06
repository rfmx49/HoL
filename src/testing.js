var rooms = [];
var floorMap = [];
	floorMap[0] = [];

$(document).ready(function(){
	console.log("Ready with jquery");
	toConsole("Ready!");

	//generateRooms(10);
	//toConsole("room 3 x" + rooms[3].x + " y" + rooms[3].y + " z" + rooms[3].z);
	beginCrafty();
})

function toConsole(message) {
	if (message == "clear") {
		//$("#tdConsole").html("");
	}
	console.log(message);
	//message = "<p>" + message + "</p>";
	//$("#tdConsole").append(message);
	//window.scrollTo(0,document.body.scrollHeight);
}

function generateRooms(numberofRooms) {
	for (var i = 0; i < numberofRooms; i++) {
		rooms[i] = new Room();
		rooms[i].x = Math.floor(Math.random() * 500) + 1;
		rooms[i].y = Math.floor(Math.random() * 500) + 1;
		rooms[i].z = Math.floor(Math.random() * 10) + 1;
	}
	var roomsText = JSON.stringify(rooms);
	toConsole(roomsText);
}

function generateRoom() {
	toConsole("clear")
	var maxWidth = 12;
	var maxHeight = 8;
	var floorWidth = Math.floor(Math.random() * (maxWidth-2)) + 1;
	var floorHeight = Math.floor(Math.random() * (maxHeight-2)) + 1;
	var decider = Math.floor(Math.random() * 2) + 1;
	floorMap = [];
	floorMap[0] = [];
	if (decider = 2){
		if (floorWidth > 1 && floorHeight > 1) {
			//decide wether to take out corner or put in wall.
			//or is a wall even possible.
			//decider = Math.floor(Math.random() * 2) + 1;
			//if (decider == 1 || ((floorWidth <= 2) || (floorHeight <= 2))){
			if (1 == 1) {
				//make corner
				//pick a wall top/right/left/bottom
				//pick sizes
				var wallDecided = Math.floor(Math.random() * 4) + 1;
				var cornerWidth = Math.floor(Math.random() * (floorWidth-1)) + 1;
				var cornerHeight = Math.floor(Math.random() * (floorHeight-1)) + 1;
				toConsole("Make room W:" + floorWidth + " H: " + floorHeight + " With corner OnWall: " + wallDecided + "  Dimensions W:" + cornerWidth + " H:" +cornerHeight);
				//drawmap
				for (var row = 1; row <= floorHeight; row++) {
					floorMap[row] = []
					for (var col = 1; col <= floorWidth; col++) {
						floorMap[row][col] = "f"
						switch (wallDecided) {
						     case 1:
						     	//top right
						     	if ((cornerHeight-row) > (-1)) {
									//corner is on this row but also this coloumn?
									if ((col+cornerWidth) > floorWidth) {
										//yes this tile is part of the corner chunk.
										floorMap[row][col] = null;
									}
								}
						        break;
						     case 2:
						     	//bot right
						     	if ((row+cornerHeight) > floorHeight) {
									//corner is on this row but also this coloumn?
									if ((col+cornerWidth) > floorWidth) {
										//yes this tile is part of the corner chunk.
										floorMap[row][col] = null;
									}
								}
						        break;
						     case 3:
						     	//bot left
						     	if ((row+cornerHeight) > floorHeight) {
									//corner is on this row but also this coloumn?
									if ((cornerWidth-col) > (-1)) {
										//yes this tile is part of the corner chunk.
										floorMap[row][col] = null;
									}
								}
						        break;
						     case 4:
						     	//top left
						     	if ((cornerHeight-row) > (-1)) {
									//corner is on this row but also this coloumn?
									if ((cornerWidth-col) > (-1)) {
										//yes this tile is part of the corner chunk.
										floorMap[row][col] = null;
									}
								}
						        break;
 						}
					}
				}


			}
			else {
				toConsole("make room with divider wall");
				//make wall
				//pick a wall top/right/left/bottom
				//pick sizes
			}
		}
	}
	else {
		//square Room
		toConsole("Make room W:" + floorWidth + " H: " + floorHeight);
		for (var row = 1; row <= floorHeight; row++) {
			floorMap[row] = []
			for (var col = 1; col <= floorWidth; col++) {
				floorMap[row][col] = "f"
			}
		}
	}
	toConsole("Fill blanks");
	floorMap[floorHeight+1] = []
	for (var row = 0; row <= floorHeight +1; row++) {
		for (var col = 0; col <= floorWidth+1; col++) {
			if (floorMap[row][col] != "f") {
				floorMap[row][col] = "x"
			}
		}
	}
	fillWalls();
	drawRoom();
	return floorMap;
}

function fillWalls() {
	toConsole("Fill walls");
	var rows = floorMap.length - 1;
	var cols;
	for (var row = 0; row <= rows; row++) {
		cols = floorMap[row].length - 1;
		for (var col = 0; col <= cols; col++) {
			//check this tile
			if (floorMap[row][col] != "f") {
				//check tile above
				//protect against under/overflow
				if (!((row-1) < 0)) {
					if (floorMap[row-1][col] == "f") {
						//floor above make a wall
						if (floorMap[row][col].substring(2,3) != "i") { floorMap[row][col] = "w"; }
						//check inside corners
						if (!((col-1) < 0)) {
							if (floorMap[row][col-1] == "f") {
								//inside corner top left
								console.log("inside corner tl");
								floorMap[row][col] = "tli";
							}
						}
						if (!((col+1) > cols)) {
							if (floorMap[row][col+1] == "f") {
								//inside corner top right
								console.log("inside corner tr");
								floorMap[row][col] = "tri";
							}
						}
					}
					else {
						if (!((row-1) < 0)) {
							if (!((col-1) < 0)) {
								if (floorMap[row-1][col-1] == "f") {
									//corner to top left
									if ((floorMap[row][col] != "w")&&(floorMap[row][col-1] != "f")) { floorMap[row][col] = "tlc"; }
								}
							}
						}
						if (!((row-1) < 0)) {
							if (!((col+1) > cols)) {
								if (floorMap[row-1][col+1] == "f") {
									//corner to top right
									if ((floorMap[row][col] != "w")&&(floorMap[row][col+1] != "f")) { floorMap[row][col] = "trc"; }
								}
							}
						}
					}
				}
				if (!((row+1) > rows)) {
					if (floorMap[row+1][col] == "f") {
						//floor below make a wall
						if (floorMap[row][col].substring(2,3) != "i") { floorMap[row][col] = "w"; }
						//check inside corners
						if (!((col-1) < 0)) {
							if (floorMap[row][col-1] == "f") {
								//inside corner bot left
								console.log("inside corner bl");
								floorMap[row][col] = "bli";
							}
						}
						if (!((col+1) > cols)) {
							if (floorMap[row][col+1] == "f") {
								//inside corner bot right
								console.log("inside corner br");
								floorMap[row][col] = "bri";
							}
						}
					}
					else {
						if (!((row+1) > rows)) {
							if (!((col-1) < 0)) {
								if (floorMap[row+1][col-1] == "f") {
									//corner to bot left
									//check left else its not a corner
									if ((floorMap[row][col] != "w")&&(floorMap[row][col-1] != "f")) { floorMap[row][col] = "blc"; }
								}
							}
						}
						if (!((row+1) > rows)) {
							if (!((col+1) > cols)) {
								if (floorMap[row+1][col+1] == "f") {
									//corner to bot right
									if ((floorMap[row][col] != "w")&&(floorMap[row][col+1] != "f")) { floorMap[row][col] = "brc"; }
								}
							}
						}
					}
				}
				if (!((col-1) < 0)) {
					if (floorMap[row][col-1] == "f") {
						//floor to left make a wall
						if (floorMap[row][col].substring(2,3) != "i") { floorMap[row][col] = "w"; }

					}
				}
				if (!((col+1) > cols)) {
					if (floorMap[row][col+1] == "f") {
						//floor to right make a wall
						if (floorMap[row][col].substring(2,3) != "i") { floorMap[row][col] = "w"; }
					}
				}
			}
		}
	}
}

function drawRoom() {
	toConsole('draw room ' + floorMap);
	var rows = floorMap.length;
	var cols;
	//Draw ground/parent
	Crafty.e('FloorGround, 2D, DOM, Color')
		.attr({y: 0, x: 0, w: 300, h: 300})
		.color('#FFFFFF');
	for (var row = 0; row < rows; row++) {
		cols = floorMap[row].length;
		for (var col = 0; col < cols; col++) {
			switch (floorMap[row][col]) {
				case "f":
					Crafty.e('Tile' + row + '_' + col +', 2D, DOM, Color')
						.attr({y: row*10, x: col*10, w: 10, h: 10})
						.color('#00FF00');
					tileName = 'Tile' + row + '_' + col
					Crafty(Crafty('FloorGround')[0]).attach(Crafty('Tile' + row + '_' + col));
					break;
				case "x":
					Crafty.e('Tile' + row + '_' + col +', 2D , DOM, Color')
						.attr({y: row*10, x: col*10, w: 10, h: 10})
						.color('#000000');
					Crafty(Crafty('FloorGround')[0]).attach(Crafty('Tile' + row + '_' + col));
					break;
				case "w":
					Crafty.e('Tile' + row + '_' + col +', 2D , DOM, Color')
						.attr({y: row*10, x: col*10, w: 10, h: 10})
						.color('#0000FF');
					Crafty(Crafty('FloorGround')[0]).attach(Crafty('Tile' + row + '_' + col));
					break;
				case "tli":
				case "tri":
				case "bli":
				case "bri":
					Crafty.e('Tile' + row + '_' + col +', 2D , DOM, Color')
						.attr({y: row*10, x: col*10, w: 10, h: 10})
						.color('#FF0000');
					Crafty(Crafty('FloorGround')[0]).attach(Crafty('Tile' + row + '_' + col));
					break;
				case "tlc":
				case "trc":
				case "blc":
				case "brc":
					Crafty.e('Tile' + row + '_' + col +', 2D , DOM, Color')
						.attr({y: row*10, x: col*10, w: 10, h: 10})
						.color('#6600CC');
					Crafty(Crafty('FloorGround')[0]).attach(Crafty('Tile' + row + '_' + col));
					break;
			}
		}


	}
}

function beginCrafty() {
	// Initialize and start our game
	//get width and heigt of our game screen.
	//var gameClientWidth = document.getElementById('gameviewDOM').clientWidth;

	setTimeout(function() {

		var gameClientWidth = $('#craftyArea').width();
		var gameClientHeight = $('#craftyArea').height();

		toConsole(gameClientWidth + "width x height" + gameClientHeight);
		// Start crafty and set a background color so that we can see it's working.
		Crafty.init(gameClientWidth, gameClientHeight, "craftyArea");
		Crafty.background('#8ed2fa');

		Crafty.viewport.init(gameClientWidth, gameClientHeight, "craftyArea");

		//start game or loading scene
		toConsole("ready to start crafty");
		Crafty.scene('Main');
	}, 300);
};

Crafty.scene('Main', function() {
	toConsole("gamestarted");
	Crafty.background('#8ed2f6');

});

function checkRoom(sX,sY,sZ) {
	toConsole("searching.. z: " + sZ + " x: " + sX + " y: " + sY);
	var roomFound=false;
	for (var i = 0; i < rooms.length; i++) {
		    if (rooms[i].z == sZ) {
				//toConsole('Room ' + i +' has same z:' + sZ);
				if (rooms[i].x == sX) {
					//toConsole('Room ' + i +' has same x:' + sX);
					if (rooms[i].y == sY) {
						//toConsole('Room ' + i +' has same y:' + sY);
						toConsole('<b>Room EXISTS</b>');
						roomFound=true;
					}
					else {
						//toConsole('Room ' + i +' not a match');
					}
				}
				else {
					//toConsole('Room ' + i +' not a match');
				}
			}
			else {
				//toConsole('Room ' + i +' not a match');
			}

 	}
 	if (roomFound == false) {
		toConsole('Room not Found');
	}
 	return roomFound;
}

function Room(x,y,z,appearance,map,doors,stairs) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.appearance = appearance;
  this.map = map;
  this.doors = doors;
  this.stairs = stairs;
}
