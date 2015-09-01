//get open floor space.
//object map minus fire route.
function getFreeFloorSpace() {
	var rows = floorMap.length;
	var cols;
	for (var row = 0; row < rows; row++) {
		cols = floorMap[row].length;
		for (var col = 0; col < cols; col++) {
			if (floorMap[row][col] == "f") {
				if (objectMap[row][col] != "FR") {
					floorMap[row][col] = "o"
					objectMap[row][col] = "o"
				}
			}
		}
	}	
}

function debugHideFreeFloorSpace() {
	var rows = objectMap.length;
	var cols;
	var variant;
	//fix centering
	
	for (var row = 0; row < rows; row++) {
		cols = objectMap[row].length;
		for (var col = 0; col < cols; col++) {
			if (objectMap[row][col] == "o") {
				variant = Math.floor(roomRandom() * 4) + 1
				Crafty.e('TileOpen' + row + '_' + col + ', ' + renderEngine + ', junk_' + variant)
					.attr({y: Crafty('Tile' + row + '_' + col)._y, x: Crafty('Tile' + row + '_' + col)._x, w: _tileSize, h: _tileSize, xTile: col, yTile: row});
				tileName = 'TileOpen' + row + '_' + col
				Crafty(Crafty('FloorGround')[0]).attach(Crafty('TileOpen' + row + '_' + col));
			}
		}
	}	
}

//furiture main loop