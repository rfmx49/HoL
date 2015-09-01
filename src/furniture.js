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

//furiture main loop
