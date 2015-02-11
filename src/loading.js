//LOADING SCENE
//LOADING SCENE
//LOADING SCENE

Crafty.scene('Loading', function(){

	//Draws loading message.
	Crafty.e('2D, DOM, Text')
		.text('Loading...')
		.attr({ x: 0, y: 100, w: 200 });

	var assetsObj = {
		"images": ["res/test.png"],			 
		"sprites": {
			"res/spritesheetx2.png": {
				"tile": 100,
				"tileh": 100,
				"map": { "wall_corner_out": [0,0],
					 "wall_corner_in": [1,0],
					 "wall_straight": [0,1],
					 "floor_1": [1,1],
					 "floor_2": [2,1],
					 "floor_3": [1,2],
					 "floor_4": [2,2]},			 
			},
			"res/playerSprite1.png": {
				"tile": 50,
				"tileh": 50,
				"map": { "playerSprite1_reel": [0,0],},			 
			},
			"res/lightconcept.png": {
				"tile": 200,
				"tileh": 200,
				"map": { "light_concept": [0,0],},			 
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
