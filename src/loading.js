//LOADING SCENE
Crafty.scene('Loading', function(){
	//Draws loading message.
	Crafty.e('craftyProgress, 2D, ' + renderEngine + ', Text')
		.text('Loading...').unselectable()
		.attr({ x: Crafty.viewport._width/2, y: Crafty.viewport._height/2, w: 200 });
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
					 "door_1": [0,6],
					 "door_2": [1,6],
					 "door_3": [2,6],
					 "door_4": [3,6],
					 "door_5": [4,6],
					 "door_6": [5,6]},			 
			},
			"furniture.png": {
				"tile": 50,
				"tileh": 50,
				"map": { "junk_1": [0,0],
					 "junk_2": [1,0],
					 "junk_3": [2,0],
					 "junk_4": [3,0]},
			},
			"blackness.png": {
				"tile": 1200,
				"tileh": 600,
				"map": { "darkness": [0,0],},			 
			},
			"houseIcon.png": {
				"tile": 834,
				"tileh": 939,
				"map": { "homeIcon": [0,0],},			 
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
			"doorSprite1.png": {
				"tile": 100,
				"tileh": 100,
				"map": { "doorSprite1_reel": [0,0],},			 
			},
			"doorSprite2.png": {
				"tile": 100,
				"tileh": 100,
				"map": { "doorSprite2_reel": [0,0],},			 
			},
			"doorSprite3.png": {
				"tile": 100,
				"tileh": 100,
				"map": { "doorSprite3_reel": [0,0],},			 
			},
			"doorSprite4.png": {
				"tile": 100,
				"tileh": 100,
				"map": { "doorSprite4_reel": [0,0],},			 
			},
			"doorSprite5.png": {
				"tile": 100,
				"tileh": 100,
				"map": { "doorSprite5_reel": [0,0],},			 
			},
			"doorSprite6.png": {
				"tile": 100,
				"tileh": 100,
				"map": { "doorSprite6_reel": [0,0],},			 
			},
			"level_progress.png": {
				"tile": 345,
				"tileh": 98,
				"map": { "ui_level": [0,0],
						"ui_bar": [1,0],},			 
			},
			"hud/scoresheet.png": {
				"tile": 400,
				"tileh": 250,
				"map": { "ui_scoresheet": [0,0]},			 
			},
			"capture.png": {
				"tile": 256,
				"tileh": 256,
				"map": { "ui_Camera": [0,0],},			 
			},
		},
	};

	Crafty.load(assetsObj, // preload assets
		function() { //when loaded
			Crafty.scene("Menu"); //go to main scene
		},


		function(e) { //progress
			Crafty(Crafty('craftyProgress')[0]).text("Loading ... "+ e.percent + "%").unselectable();
		},

		function(e) { //uh oh, error loading
		
		}
	);
});
