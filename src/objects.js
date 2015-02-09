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
	init: function() {
		this.requires('2D, DOM, Fourway, Color, Collision, Tween')
			.fourway(4)
			.color('#FF0000')
			.stopOnSolids();
	},
 
	// Registers a stop-movement function to be called when
	//  this entity hits an entity with the "Solid" component
	stopOnSolids: function() {
		this.onHit('Solid', this.stopMovement);	 
		return this;
		},
 
  // Stops the movement
	stopMovement: function() {
		this._speed = 0;
		if (this._movement) {
			this.x -= this._movement.x;
			this.y -= this._movement.y;
		}
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
				pathFind(playerid, x, y);
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

