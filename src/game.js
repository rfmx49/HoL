var gameSeed = Math.floor((Math.random() * 10) + 1); //TODO DEBUG Increase to 100000
toConsole("Game Seed: " + gameSeed);

var rooms = [];

Crafty.scene('Game', function() {

	//
	//Game events (MOUSE CLICKS ECT..)
	//
	
	Crafty.addEvent(Crafty.stage.elem, "mousedown", function (e) {
		holdStarter = setTimeout(function() {
			holdStarter = null;
			holdActive = true;
			// begin hold-only operation here, if desired
			toConsole('Dragging');		
		}, 299);
	});

	Crafty.addEvent(Crafty.stage.elem, "mouseup", function (e) {
		if (holdActive) {
			toConsole("hold done");
		}					
	});
		
	
	Crafty.addEvent(Crafty.stage.elem, "click", function (e) {
		clearTimeout(holdStarter);
		if (holdActive == false) {
			toConsole("click");	
		}
		holdActive = false;	
	});
		
	
	Crafty.e('gameloop')
		.attr({countdown: 10})
		.bind("EnterFrame", function() {
			//frame done
		});
});

function generateRoom(){
	//Rooms are 12x8 rows 1 and 12 and cols 1 and 8 will never bee floor peices
	//floors are effectivly 10x6
	var maxHeight = 12;
	var maxWidth = 8;
	Math.seedrandom('hello.');
	Math.floor((Math.random() * 10) + 1);
}

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
						break;
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
