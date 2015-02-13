//Room constructor
function Room(x,y,z,appearance,map,doors,stairs) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.appearance = appearance;
	this.map = map;
	this.doors = doors;
	this.stairs = stairs;
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
				toConsole("checking next node");
				this.playTween();
			}
			else {
				toConsole("done moving");
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
		}
			
	},

	playerWalking: function() {
		this.animate('playerWalking', 1);
	},
	playerIdle: function() {
		this.animate('playerIdle', 1);
	},
	cancelMove: function() {
		toConsole("cancel moving");
		this.nodePath = [];
		mouseFunction == "movePlayer";	
	}
});

//FLOOR OBJECT
Crafty.c('floorMap', {
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
		toConsole(this._x + " " + this._y);
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
				toConsole("done waiting now moving to " + reRun.x + " " + reRun.y);
				pathFind(Crafty('PlayerCharacter')[0], reRun.x, reRun.y);								
			}, 500, reRun);
			
		}
	},
	mouseOverEvent: function() {
		if (this.highlightId == 0) {
			this.highlightEnt = Crafty.e ('2D, DOM, Image')
				.image('res/highlight.png', 'no-repeat')
				.attr({y: this._y, x: this._x, w: _tileSize, h: _tileSize});
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

Crafty.c('wallDoorAnimate', {
	rotation: 0,
	init: function() {
		this.requires('2D, DOM, doorSprite1_reel, SpriteAnimation');
		this.origin("center");
		this.reel('doorOpening', 800, 1, 0, 6);
		this.reel('doorOpened', 1, 1, 0, 1);
		this.reel('doorClosing', 800, 6, 0, -6);
		this.reel('doorClosed', 1, 0, 0, 1);
	},
	openDoor: function() {
		this.animate('doorOpening', 1);
		this.animate('doorOpened', -1);
	},
	openedDoor: function() {
		this.animate('doorOpened', 1);
	}, 	
	closeDoor: function() {
		this.animate('doorClosing', 1);
	},
	closedDoor: function() {
		this.animate('doorClosing', 1);
		this.animate('doorClosed', -1);		
	}	
});

//WALL OBJECT
Crafty.c('wallMap', {
	init: function() {
		this.requires('2D, DOM, Solid')
	}
});

