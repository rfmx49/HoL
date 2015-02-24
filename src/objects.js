//postion object.
function Position(x,y,z) {
	this.x = x;
	this.y = y;
	this.z = z;
}

//Player Constructor
function playerObj() {
	this.pos = new Position(0,0,0);
	this.rotation = 0;
}

//Room constructor
function Room(x,y,z) {
	this.pos = new Position(x,y,z);
	this.map = [];
	this.style = [];
	this.doors = [];
	this.stairs = [];
}



//Door Constructor
function Door(toX,toY,toZ,roomX,roomY) {
	this.toPos = new Position(toX,toY,toZ);
	this.roomPos = new Position(roomX,roomY,0); //position in the room.
	this.style = [];
}

//Player
//playercreation Crafty.e('PlayerCharacter').attr({y: 50, x: 50, w: 25, h: 25});
//player Tween Crafty(109).tween({x: 100, y: 100}, 200)

Crafty.c('PlayerCharacter', {
	inMotion: false,
	rotation: 0,
	nodePath: [],
	init: function() {
		this.requires('2D, DOM, Tween, playerSprite1_reel, SpriteAnimation');
		this.origin("center");
		this.reel('playerWalking', 400, 1, 0, 15);
		this.reel('playerIdle', 10, 0, 0, 1);
		this.bind("TweenEnd", function() { 
			this.inMotion = true;
			this.playerIdle();
			if (this.nodePath.length >= 1) {
				//console.log("checking next node");
				this.playTween();
			}
			else {
				console.log("done moving");
				mouseFunction = "movePlayer"				
				this.inMotion = false;
			}				
		});
	},
 
	// Registers a stop-movement function to be called when
	//  this entity hits an entity with the "Solid" component
		
	playTween: function() {
		var newPos = this.nodePath.shift();
		//normalize current rotation
		if (this._rotation == 360) {
			this.rotation = 0;
		}
		if (this._rotation == -90) {
			this.rotation = 270;
		}
		//smooth 180s
		if (((this.rotation - newPos.rotation) == 180) || ((this.rotation - newPos.rotation) == -180)) {
			this.rotation = newPos.rotation;
		}
		if (newPos.type == "f") {
			this.playerWalking();
			this.tween({x: newPos.x, y: newPos.y, rotation: newPos.rotation}, 400);
			if (newPos.rotation == 360) {
				this.rotation = 0;
			}
			if (newPos.Rotation == -90) {
				this.rotation = 270;
			}
		}
		else if (newPos.type == "d") {
			this.tween({rotation: newPos.rotation}, 200);
			if (newPos.rotation == 360) {
				this.rotation = 0;
			}
			if (newPos.Rotation == -90) {
				this.rotation = 270;
			}
			console.log("at door open door and then generate new room based on that door info");
			//get door info first from floor map
			console.log(newPos.x + " " + newPos.y);
			var door = floorMap[newPos.y/_tileSize][newPos.x/_tileSize]
			//create door animation at this point.
			//get the door offset.
			var doorOffset = Crafty('Tile' + (newPos.y/_tileSize) + '_' + (newPos.x/_tileSize)).offset;
			console.log('our door offset x: ' + doorOffset.x);
			changeDoor(newPos, Crafty('Tile' + (newPos.y/_tileSize) + '_' + (newPos.x/_tileSize)).offset, "open", true);
			//TODO only if this is player not any player character.
			//move player too door
			//wait for door to open a bit
			//Generate doors random destination if not set  already though.
			doorRandom = new Math.seedrandom(gameSeed + " . " + userPlayer.pos.x + "." + userPlayer.pos.y + "." + userPlayer.pos.z + "." + newPos.y/_tileSize + "." + newPos.x/_tileSize);
			var newDoor = {x:0,y:0};
			//check if door already exists
			var existingDoor = checkDoor(currentRoom,newPos.x/_tileSize,newPos.y/_tileSize);
			console.log("EXISTING DOOR STATUS == " + existingDoor + " " + (existingDoor == false) + (typeof existingDoor =="boolean"));
			if ((existingDoor == false) && (typeof existingDoor =="boolean")) {
				//New door
				console.log("Create new door");
				//check what type of door we are going through.
				switch (door) {
					case "da":
						newDoor.y = Math.round((doorRandom() * sparseness) + 1);
						newDoor.x = Math.round(((doorRandom() * sparseness) + 1)-(sparseness/2));
						break;
					case "db":
						newDoor.y = Math.round((doorRandom() * sparseness) + 1) - sparseness;
						newDoor.x = Math.round(((doorRandom() * sparseness) + 1)-(sparseness/2));
						break;
					case "dl":
						newDoor.x = Math.round((doorRandom() * sparseness) + 1);
						newDoor.y = Math.round(((doorRandom() * sparseness) + 1)-(sparseness/2));
						break;
					case "dr":
						newDoor.x = Math.round((doorRandom() * sparseness) + 1) - sparseness;
						newDoor.y = Math.round(((doorRandom() * sparseness) + 1)-(sparseness/2));
						break;
				}
				console.log("new door " + newDoor.x + " " + newDoor.y  + " " + doorRandom() + " " + sparseness + " " + ((doorRandom() * sparseness) + 1));
				rooms[currentRoom].doors.push(new Door(newDoor.x,newDoor.y,0,newPos.x/_tileSize,newPos.y/_tileSize));
			}
			else {
				//returning through this door.
				newDoor.x = rooms[currentRoom].doors[existingDoor].toPos.x;
				newDoor.y = rooms[currentRoom].doors[existingDoor].toPos.y;
			}
			
			
			var playerID = this[0];
			setTimeout(function() {
				Crafty(playerID).playerWalking();
				Crafty(playerID).tween({x: newPos.x, y: newPos.y, rotation: newPos.rotation}, 400);
				userPlayer.rotation = newPos.rotation;
				setTimeout(function() {
					//destroy and make a new room
					Crafty(Crafty('FloorGround')[0]).destroy();
					lastPos = userPlayer.pos;
					userPlayer.pos = {x: newDoor.x, y: newDoor.y, z: 0};
					generateRoom();
				}, 250);
			}, 400, newPos, playerID);			
		}			
	},
	playerWalking: function() {
		this.animate('playerWalking', 1);
	},
	playerIdle: function() {
		this.animate('playerIdle', 1);
	},
	cancelMove: function() {
		console.log("cancel moving");
		this.nodePath = [];
		mouseFunction == "movePlayer";	
	}
});

//FLOOR OBJECT
Crafty.c('floorMap', {
	offset: {x:0,y:0},
	highlightId: 0,
	highlightEnt: 0,
	init: function() {
		this.requires('2D, DOM, Mouse');
		this.bind("Click", function(MouseEvent) { 
			this.clickEvent();
		});
		this.bind("MouseOver", function(MouseEvent) { 
			this.mouseOverEvent();
		});
		this.bind("MouseOut", function(MouseEvent) { 
			this.mouseOutEvent();
		});
	},
	clickEvent: function() {
		console.log(this._x + " " + this._y);
		if (mouseFunction == "movePlayer") {
			mouseFunction = "busyMoving"
			//check if play is already in motion
			pathFind(Crafty('PlayerCharacter')[0], this._x, this._y);
		}
		else if (mouseFunction == "busyMoving") {
			//check if play is already in motion
			mouseFunction == "reallyBusy"
			Crafty(Crafty('PlayerCharacter')[0]).cancelMove();
			playerInMotion = false;
			var reRun = {x: this._x,y:this._y}			
			setTimeout(function(){
				console.log("done waiting now moving to " + reRun.x + " " + reRun.y);
				pathFind(Crafty('PlayerCharacter')[0], reRun.x, reRun.y);								
			}, 500, reRun);
			
		}
	},
	mouseOverEvent: function() {
		if (this.highlightId == 0) {
			this.highlightEnt = Crafty.e ('2D, DOM, Image')
				.image('res/highlight.png', 'no-repeat')
				.attr({y: this._y, x: this._x, w: _tileSize, h: _tileSize});
			Crafty(Crafty('FloorGround')[0]).attach(this.highlightEnt);
			this.highlightId = this.highlightEnt[0];
		}
	},
	mouseOutEvent: function() {
		if (this.highlightId != 0) {
			Crafty(this.highlightId).destroy();
			this.highlightId = 0;
		}
	}
});

//door animation
Crafty.c('wallDoorAnimate', {
	rotation: 0,
	offSet: {},
	init: function() {
		this.requires('2D, DOM, doorSprite1_reel, SpriteAnimation');
		this.origin("center");
		this.reel('doorOpening', 600, 1, 0, 6);
		this.reel('doorOpened', 10, 6, 0, 1);
		this.reel('doorClosing', 600, 6, 0, -7);
		this.reel('doorClosed', 10, 0, 0, 1);
	},
	openDoor: function() {
		this.animate('doorOpening', 1);
	},
	openedDoor: function() {
		this.animate('doorOpened', 1);
	}, 	
	closeDoor: function() {
		this.animate('doorClosing', 1);		
	},
	closedDoor: function() {
		this.animate('doorClosed', -1);		
	}	
});

//WALL OBJECT
Crafty.c('wallMap', {
	door: false,
	init: function() {
		this.requires('2D, DOM, Solid')
	}
});

