//LOADING SCENE
//LOADING SCENE
//LOADING SCENE

Crafty.scene('Loading', function(){

	//Draws loading message.
	Crafty.e('2D, DOM, Text')
		.text('Loading...')
		.attr({ x: 0, y: 100, w: 200 });
	Crafty.paths({audio: "res/audio/", images: "res/img/", sprites: "res/img/"});
	var assetsObj = {
		"images": [""],			 
		"sprites": {
			"spritesheetx2.png": {
				"tile": 100,
				"tileh": 100,
				"map": { "wall_corner_out": [0,4],
					 "wall_corner_in": [1,4],
					 "wall_straight": [0,5],
					 "floor_1": [1,1],
					 "floor_2": [1,2],
					 "floor_3": [2,1],
					 "floor_4": [2,2],
					 "floor_5": [3,1],
					 "floor_6": [3,2],
					 "floor_7": [4,1],
					 "floor_8": [4,2],
					 "door_1": [0,6]},			 
			},
			"blackness.png": {
				"tile": 1200,
				"tileh": 600,
				"map": { "darkness": [0,0],},			 
			},
			"highlight.png": {
				"tile": 50,
				"tileh": 50,
				"map": { "highlightBlue": [0,0],},			 
			},
			"playerSprite1.png": {
				"tile": 50,
				"tileh": 50,
				"map": { "playerSprite1_reel": [0,0],},			 
			},
			"doorSprite.png": {
				"tile": 100,
				"tileh": 100,
				"map": { "doorSprite1_reel": [0,0],},			 
			},
		},
	};

	Crafty.load(assetsObj, // preload assets
		function() { //when loaded
			Crafty.scene("Menu"); //go to main scene
		},


		function(e) { //progress
		
		},

		function(e) { //uh oh, error loading
		
		}
	);
});
