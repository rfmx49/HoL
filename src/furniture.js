//get open floor space.
//object map minus fire route.
function getFreeFloorSpace() {
	var rows = floorMap.length;
	var cols;
	var tile;
	for (var row = 0; row < rows; row++) {
		cols = floorMap[row].length;
		for (var col = 0; col < cols; col++) {
			tile=floorMap[row][col];
			if (tile == "f") {
				if (objectMap[row][col] != "FR") {
					floorMap[row][col] = "o"
					objectMap[row][col] = "o"
				}
			}
			else if (tile == "w") {
				if (objectMap[row][col] != "FR") {
					objectMap[row][col] = "w"
				}
			}
			else if ((tile == "b") || (tile == "t")) {
				if (objectMap[row][col] != "FR") {
					objectMap[row][col] = "c"
				}
			}
		}
	}	
}

function placeFurniture() {
	var roomVariants = 1;
	var placementFound = false;
	var furnitureVariants = 4; //4/5 fourth will be just blank.
	var furniture1x1Variants = 10;
	var furniture1x2Variants = 6;
	var furniture2x2Variants = 7;
	var colourVariants = 5;	
	var furnitureRandom = new Math.seedrandom(gameSeed + " . " + userPlayer.pos.x + "." + userPlayer.pos.y + "." + userPlayer.pos.z);
	
	
	var roomType = Math.floor(furnitureRandom() * roomVariants) + 1;
	var roomColour = Math.floor(furnitureRandom() * colourVariants) + 1;
	var roomVariant;
	var furnitureRotation = "";
	var furnitureVariant;

	var rows = objectMap.length;
	var cols;
	var variant;
	var x;
	var offsetPlacement;

	var openPostions = [];
	//fix centering

	for (var row = 0; row < rows; row++) {
		cols = objectMap[row].length;
		for (var col = 0; col < cols; col++) {
			if (objectMap[row][col] == "o") {
				//found an empty tile
				//check next to it 
				//check below it/diagonal to it
				//Check all possible placements.
				//N above
				openPostions = [];
				if (!(typeof objectMap[row-1] === 'undefined')) {
					//N above
					if (objectMap[row-1][col] == "o") {
						openPostions.push('N');
					}
					//NW
					if (!(typeof objectMap[row-1][col-1] === 'undefined')) {	
						if (objectMap[row-1][col-1] == "o") {
							openPostions.push('NW');
						}
					}	
					//NE
					if (!(typeof objectMap[row-1][col+1] === 'undefined')) {	
						if (objectMap[row-1][col+1] == "o") {
							openPostions.push('NE');
						}
					}	
				}
				//S Below
				if (!(typeof objectMap[row+1] === 'undefined')) {
					//S above
					if (objectMap[row+1][col] == "o") {
						openPostions.push('S');
					}
					//SW
					if (!(typeof objectMap[row+1][col-1] === 'undefined')) {	
						if (objectMap[row+1][col-1] == "o") {
							openPostions.push('SW');
						}
					}	
					//SE
					if (!(typeof objectMap[row+1][col+1] === 'undefined')) {	
						if (objectMap[row+1][col+1] == "o") {
							openPostions.push('SE');
						}
					}
				}
				//E
				if (!(typeof objectMap[row][col+1] === 'undefined')) {	
					if (objectMap[row][col+1] == "o") {
						openPostions.push('E');
					}
				}
				//W
				if (!(typeof objectMap[row][col-1] === 'undefined')) {	
					if (objectMap[row][col-1] == "o") {
						openPostions.push('W');
					}
				}

				//Know open spaces now need to decide what to place.
				//choose between variants.
				placementFound = false;
				while (placementFound == false) {
					roomVariant = Math.floor(furnitureRandom() * furnitureVariants) + 1;
					//check for blank room
					if ((roomVariant == 4) || (roomVariant == 5)) {
						placementFound = true;
						//make tile walkable again. (will keep the tile open on object map but open it on floor map incase a peice of furniture can occupy this tile in next intteration.(just need to remember to do this for all tiles though.)
						objectMap[row][col] = "o";
						floorMap[row][col] = "f";
					}
					else if (roomVariant == 1) {
						placementFound = true;
						furnitureVariant = Math.floor(furnitureRandom() * furniture1x1Variants) + 1
						Crafty.e('TileOpen' + row + '_' + col + ', ' + renderEngine + ', 1_' + roomColour + '_1x1_' + furnitureVariant)
							.attr({y: Crafty('Tile' + row + '_' + col)._y, x: Crafty('Tile' + row + '_' + col)._x, w: _tileSize, h: _tileSize, xTile: col, yTile: row});
						Crafty(Crafty('FloorGround')[0]).attach(Crafty('TileOpen' + row + '_' + col));
						objectMap[row][col] = "T";
					}
					else if (roomVariant == 2) {
						placementFound = true;
						//check will this fit.
						//pop out all ordial directions
						x = openPostions.indexOf("NE");
						if (x != -1) { openPostions.splice(x,1); }
						x = openPostions.indexOf("SE");
						if (x != -1) { openPostions.splice(x,1); }
						x = openPostions.indexOf("NW");
						if (x != -1) { openPostions.splice(x,1); }
						x = openPostions.indexOf("SW");
						if (x != -1) { openPostions.splice(x,1); }

						//check the length of x = openPostions if it is 1 then that is the direcction other wise use random to find.
						if (openPostions.length == 0) {
							placementFound = false;
						}
						else if (openPostions.length == 1) {
							//get rotation going N/S or E/W (default is E/W)
							furnitureRotation = openPostions[x]
						}
						else {
							//pick randomly
							x = Math.floor(furnitureRandom() * openPostions.length)
							furnitureRotation = openPostions[x]
						}

						if (furnitureRotation != "") {
							if (furnitureRotation == "E") {
								furnitureVariant = Math.floor(furnitureRandom() * furniture1x2Variants) + 1
								Crafty.e('TileOpen' + row + '_' + col + ', ' + renderEngine + ', 1_' + roomColour + '_1x2_' + furnitureVariant)
									.attr({y: Crafty('Tile' + row + '_' + col)._y, x: Crafty('Tile' + row + '_' + col)._x, w: _tileSize*2, h: _tileSize, xTile: col, yTile: row});
								Crafty(Crafty('FloorGround')[0]).attach(Crafty('TileOpen' + row + '_' + col));
								//block off tiles
								objectMap[row][col] = "T";
								objectMap[row][col+1] = "T";
								
							}
							else if (furnitureRotation == "W") {
								furnitureVariant = Math.floor(furnitureRandom() * furniture1x2Variants) + 1
								Crafty.e('TileOpen' + row + '_' + col + ', ' + renderEngine + ', 1_' + 1 + '_1x2_' + furnitureVariant)
									.attr({y: Crafty('Tile' + row + '_' + col)._y, x: Crafty('Tile' + row + '_' + (col-1))._x, w: _tileSize*2, h: _tileSize, xTile: col, yTile: row});
								Crafty(Crafty('FloorGround')[0]).attach(Crafty('TileOpen' + row + '_' + col));
								objectMap[row][col] = "T";
								objectMap[row][col-1] = "T";
							}
							else if ((furnitureRotation == "N") || (furnitureRotation == "S")) {

							}
						}
					}

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
				variant = Math.floor(roomRandom() * 5) + 1
				Crafty.e('TileOpen' + row + '_' + col + ', ' + renderEngine + ', junk_' + variant)
					.attr({y: Crafty('Tile' + row + '_' + col)._y, x: Crafty('Tile' + row + '_' + col)._x, w: _tileSize, h: _tileSize, xTile: col, yTile: row});
				tileName = 'TileOpen' + row + '_' + col
				Crafty(Crafty('FloorGround')[0]).attach(Crafty('TileOpen' + row + '_' + col));
			}
		}
	}	
}

//furiture main loop
