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
	this.floorStyle = 1;
	this.doors = [];
	this.map = "";
	this.stairs = [];
}



//Door Constructor
function Door(toX,toY,toZ,roomX,roomY,styles) {
	this.toPos = new Position(toX,toY,toZ);
	this.roomPos = new Position(roomX,roomY,0); //position in the room.
	this.toRoomPos = new Position(0,0,0); //position in the room.
	this.style = styles;
}

//Player
//playercreation Crafty.e('PlayerCharacter').attr({y: 50, x: 50, w: 25, h: 25});
//player Tween Crafty(109).tween({x: 100, y: 100}, 200)

Crafty.c('PlayerCharacter', {
	inMotion: false,
	movementQueue: 0,
	rotation: 0,
	nodePath: [],
	init: function() {
		this.requires('2D, ' + renderEngine + ', Tween, playerSprite1_reel, SpriteAnimation');
		this.origin("center");
		this.reel('playerWalking', 400, 1, 0, 15);
		this.reel('playerIdle', 10, 0, 0, 1);
		this.bind("TweenEnd", function() {
			reCenterPlayer();
			//console.log("Ended " + playerEntity._x);
			this.inMotion = true;
			this.playerIdle();
			if (this.nodePath.length >= 1) {
				//console.log("checking next node");
				this.playTween();
			}
			else {
				mouseFunction = "movePlayer";							
				this.inMotion = false;
			}				
		});
	},
 
	// Registers a stop-movement function to be called when
	//  this entity hits an entity with the "Solid" component
		
	playTween: function() {
		//console.log(JSON.stringify(this.nodePath));
		var newPos = this.nodePath.shift();
		//get newPos tile
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
			this.nodePath = [];
			////console.log("at door open door and then generate new room based on that door info");
			//get door info first from floor map
			////console.log(newPos.x + " " + newPos.y);
			var door = floorMap[newPos.ytile][newPos.xtile].substring(2,0)
			var doorStyle = floorMap[newPos.ytile][newPos.xtile].substring(3,2)
			//create door animation at this point.
			//get the door offset.
			var doorOffset = Crafty('Tile' + (newPos.ytile) + '_' + (newPos.xtile)).offset;
			////console.log('our door offset x: ' + doorOffset.x);
			changeDoor(newPos.ytile,newPos.xtile, "open");
			//TODO only if this is player not any player character.
			//move player too door
			//wait for door to open a bit
			//Generate doors random destination if not set  already though.
			doorRandom = new Math.seedrandom(gameSeed + " . " + userPlayer.pos.x + "." + userPlayer.pos.y + "." + userPlayer.pos.z + "." + newPos.ytile + "." + newPos.xtile);
			var newDoor = {x:0,y:0};
			//check if door already exists
			var existingDoor = checkDoor(currentRoom,newPos.xtile,newPos.ytile);
			////console.log("EXISTING DOOR STATUS == " + existingDoor + " " + (existingDoor == false) + (typeof existingDoor =="boolean"));
			if (existingDoor === false) {
				//New door
				//console.log("Create new door");
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
				//create new room with doorRandom information.
				existingDoor = rooms[currentRoom].doors.push(new Door(newDoor.x,newDoor.y,0,newPos.xtile,newPos.ytile,doorStyle));
				existingDoor = existingDoor - 1;
			}
			else {
				//returning through this door.
				newDoor.x = rooms[currentRoom].doors[existingDoor].toPos.x;
				newDoor.y = rooms[currentRoom].doors[existingDoor].toPos.y;
			}
			
			
			var playerID = this[0];
			setTimeout(function() {
				Crafty(playerID).playerWalking();
				Crafty(playerID).tween({x: newPos.x, y: newPos.y, rotation: newPos.rotation, alpha: 0, z: 1}, 400);
				console.log("Rotation Value " + newPos.rotation);
				//fix Rotation
				switch (newPos.rotation) {
					case 360:
						newPos.rotation = 0;
						break;
					case -90:
						newPos.rotation = 270;
						break;
					case -180:
						newPos.rotation = 0;
						break;
					case 450:
						newPos.rotation = 90;
						break;
				}
				Crafty(playerID).rotation = newPos.rotation;
				userPlayer.rotation = newPos.rotation;
				setTimeout(function() {
					//destroy and make a new room
					Crafty(Crafty('FloorGround')[0]).destroy();
					//remember previous postions and door to refrence back to.
					lastPos = userPlayer.pos;
					lastDoor = existingDoor;
					userPlayer.pos = {x: newDoor.x, y: newDoor.y, z: 0};
					if (generateRoom() == false) {
						return;
					}
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
		//console.log("cancel moving");
		this.cancelTween();
		reCenterPlayer();
		this.nodePath = [];	
	}
});

//FLOOR OBJECT
Crafty.c('floorMap', {
	offset: {x:0,y:0},
	highlightId: 0,
	highlightEnt: 0,
	Tile: 0,
	yTile: 0,
	init: function() {
		this.requires('2D, ' + renderEngine + ', Mouse');
		this.bind("MouseUp", function(MouseEvent) { 
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
		////console.log(this._x + " " + this._y);
		var timeOut = 50;
		if (mouseFunction == "movePlayer") {
			//check if plaery is already in motion
			if (playerEntity.isPlaying()) { timeOut = 400; }
			playerEntity.cancelMove();
			var reRun = {x: this.xTile,y:this.yTile}			
			setTimeout(function(){
				//console.log("done waiting now moving to " + reRun.x + " " + reRun.y);
				mouseFunction == "findingPath"
				//increase movementQueue
				playerEntity.movementQueue = playerEntity.movementQueue + 1;
				pathFind(playerEntity[0], reRun.x, reRun.y, playerEntity.movementQueue);							
			}, timeOut, reRun);	
		}
	},
	mouseOverEvent: function() {
		if (this.highlightId == 0) {
			this.highlightEnt = Crafty.e ('2D, ' + renderEngine + ', highlightBlue')
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
	colour: 1,
	offSet: {},
	init: function() {
		this.requires('2D, ' + renderEngine + ', SpriteAnimation');
		this.origin("center");
		this.reel('doorOpening', 600, 1, 0, 6);
		this.reel('doorOpened', 10, 7, 0, 1);
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
		this.requires('2D, ' + renderEngine + ', Solid')
	}
});

