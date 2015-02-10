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
				this.inMotion = false;
			}				
		});
	},
 
	// Registers a stop-movement function to be called when
	//  this entity hits an entity with the "Solid" component
		
	playTween: function() {
		var newPos = this.nodePath.shift();
		this.playerWalking();
		this.tween({x: newPos.x, y: newPos.y, rotation: newPos.rotation}, 400);
	},

	playerWalking: function() {
		this.animate('playerWalking', 1);
	},
	playerIdle: function() {
		this.animate('playerIdle', 1);
	}
});

//FLOOR OBJECT
Crafty.c('floorMap', {
	init: function() {
		this.requires('2D, DOM, Mouse');
		this.bind("Click", function(MouseEvent) { 
			var id = this[0];
			toConsole(Crafty(id)._x + " " + Crafty(id)._y);
			if (mouseFunction == "movePlayer") {
				//check if play is already in motion
				if (Crafty(Crafty('PlayerCharacter')[0]).inMotion == false) {
					pathFind(Crafty('PlayerCharacter')[0], Crafty(id)._x, Crafty(id)._y);
				}
			}
		});
	}
});

//WALL OBJECT
Crafty.c('wallMap', {
	init: function() {
		this.requires('2D, DOM, Solid')
	}
});

