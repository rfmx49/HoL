//LOADING SCENE
Crafty.scene('Loading', function(){
	//Draws loading message.
	Crafty.e('craftyProgress, 2D, ' + renderEngine + ', Text')
		.text('Loading...').unselectable()
		.attr({ x: Crafty.viewport._width/2, y: Crafty.viewport._height/2, w: 200 });
	Crafty.paths({audio: "res/audio/", images: "res/img/", sprites: "res/img/"});
	var assetsObj = {
		"images": ["ui/background.png","ui/cork.png","ui/powerUpCount.png"],
		"audio": ["doors/door_open_1.ogg","doors/door_open_2.ogg","doors/door_open_3.ogg","doors/door_open_4.ogg","doors/door_open_5.ogg","doors/door_open_6.ogg","player/walking.ogg","menu/menu_select.ogg","menu/award_hint.ogg"],		 
		"sprites": {
			"ui/menuItems.png": {
				"tile": 340,
				"tileh": 80,
				"map": { "menu_newGame": [0,0],
					 "menu_continueGame": [0,1],
					 "menu_helpInfo": [0,2],
					 "menu_back": [0,3],
					 "menu_challange": [0,5],
					 "menu_endGame": [0,6],
					 "menu_start": [0,4],
					 "menu_options": [0,7],
					 "menu_stats": [0,8]} 
			},
			"rooms/spritesheetx2.png": {
				"tile": 100,
				"tileh": 100,
				"map": { "wall_corner_out": [0,4],
					 "wall_corner_in": [1,4],
					 "wall_straight": [3,4],
					 "door_frame": [4,4],
					 "floor_1": [1,1],
					 "floor_2": [1,2],
					 "floor_3": [2,1],
					 "floor_4": [2,2],
					 "floor_5": [3,1],
					 "floor_6": [3,2],
					 "floor_7": [4,1],
					 "floor_8": [4,2]},			 
			},
			"rooms/furniture/furniture1x1.png": {
				"tile": 50,
				"tileh": 50,
				"map": { "1_1_1x1_1": [0,0],
					 "1_1_1x1_2": [1,0],
					 "1_1_1x1_3": [2,0],
					 "1_1_1x1_4": [3,0],
					 "1_1_1x1_5": [4,0],
					 "1_1_1x1_6": [5,0],
					 "1_1_1x1_7": [6,0],
					 "1_1_1x1_8": [7,0],
					 "1_1_1x1_9": [8,0],
					 "1_1_1x1_10": [9,0],
					 "1_2_1x1_1": [0,1],
					 "1_2_1x1_2": [1,1],
					 "1_2_1x1_3": [2,1],
					 "1_2_1x1_4": [3,1],
					 "1_2_1x1_5": [4,1],
					 "1_2_1x1_6": [5,1],
					 "1_2_1x1_7": [6,1],
					 "1_2_1x1_8": [7,1],
					 "1_2_1x1_9": [8,1],
					 "1_2_1x1_10": [9,1],
					 "1_3_1x1_1": [0,2],
					 "1_3_1x1_2": [1,2],
					 "1_3_1x1_3": [2,2],
					 "1_3_1x1_4": [3,2],
					 "1_3_1x1_5": [4,2],
					 "1_3_1x1_6": [5,2],
					 "1_3_1x1_7": [6,2],
					 "1_3_1x1_8": [7,2],
					 "1_3_1x1_9": [8,2],
					 "1_3_1x1_10": [9,2],
					 "1_4_1x1_1": [0,3],
					 "1_4_1x1_2": [1,3],
					 "1_4_1x1_3": [2,3],
					 "1_4_1x1_4": [3,3],
					 "1_4_1x1_5": [4,3],
					 "1_4_1x1_6": [5,3],
					 "1_4_1x1_7": [6,3],
					 "1_4_1x1_8": [7,3],
					 "1_4_1x1_9": [8,3],
					 "1_4_1x1_10": [9,3],
					 "1_5_1x1_1": [0,4],
					 "1_5_1x1_2": [1,4],
					 "1_5_1x1_3": [2,4],
					 "1_5_1x1_4": [3,4],
					 "1_5_1x1_5": [4,4],
					 "1_5_1x1_6": [5,4],
					 "1_5_1x1_7": [6,4],
					 "1_5_1x1_8": [7,4],
					 "1_5_1x1_9": [8,4],
					 "1_5_1x1_10": [9,4]},
			},
			"rooms/furniture/furniture1x2.png": {
				"tile": 100,
				"tileh": 50,
				"map": { "1_1_1x2_1": [0,0],
					 "1_1_1x2_2": [1,0],
					 "1_1_1x2_3": [2,0],
					 "1_1_1x2_4": [3,0],
					 "1_1_1x2_5": [4,0],
					 "1_1_1x2_6": [5,0],
					 "1_2_1x2_1": [0,1],
					 "1_2_1x2_2": [1,1],
					 "1_2_1x2_3": [2,1],
					 "1_2_1x2_4": [3,1],
					 "1_2_1x2_5": [4,1],
					 "1_2_1x2_6": [5,1],
					 "1_3_1x2_1": [0,2],
					 "1_3_1x2_2": [1,2],
					 "1_3_1x2_3": [2,2],
					 "1_3_1x2_4": [3,2],
					 "1_3_1x2_5": [4,2],
					 "1_3_1x2_6": [5,2],
					 "1_4_1x2_1": [0,3],
					 "1_4_1x2_2": [1,3],
					 "1_4_1x2_3": [2,3],
					 "1_4_1x2_4": [3,3],
					 "1_4_1x2_5": [4,3],
					 "1_4_1x2_6": [5,3],
					 "1_5_1x2_1": [0,4],
					 "1_5_1x2_2": [1,4],
					 "1_5_1x2_3": [2,4],
					 "1_5_1x2_4": [3,4],
					 "1_5_1x2_5": [4,4],
					 "1_5_1x2_6": [5,4]},
			},
			"rooms/furniture/furniture2x2.png": {
				"tile": 100,
				"tileh": 100,
				"map": { "1_1_2x2_1": [0,0],
					 "1_1_2x2_2": [1,0],
					 "1_1_2x2_3": [2,0],
					 "1_1_2x2_4": [3,0],
					 "1_1_2x2_5": [4,0],
					 "1_1_2x2_6": [5,0],
					 "1_1_2x2_7": [6,0],
					 "1_2_2x2_1": [0,1],
					 "1_2_2x2_2": [1,1],
					 "1_2_2x2_3": [2,1],
					 "1_2_2x2_4": [3,1],
					 "1_2_2x2_5": [4,1],
					 "1_2_2x2_6": [5,1],
					 "1_2_2x2_7": [6,1],
					 "1_3_2x2_1": [0,2],
					 "1_3_2x2_2": [1,2],
					 "1_3_2x2_3": [2,2],
					 "1_3_2x2_4": [3,2],
					 "1_3_2x2_5": [4,2],
					 "1_3_2x2_6": [5,2],
					 "1_3_2x2_7": [6,2],
					 "1_4_2x2_1": [0,3],
					 "1_4_2x2_2": [1,3],
					 "1_4_2x2_3": [2,3],
					 "1_4_2x2_4": [3,3],
					 "1_4_2x2_5": [4,3],
					 "1_4_2x2_6": [5,3],
					 "1_4_2x2_7": [6,3],
					 "1_5_2x2_1": [0,4],
					 "1_5_2x2_2": [1,4],
					 "1_5_2x2_3": [2,4],
					 "1_5_2x2_4": [3,4],
					 "1_5_2x2_5": [4,4],
					 "1_5_2x2_6": [5,4],
					 "1_5_2x2_7": [6,4]},
			},
			"rooms/furniture/computer.png": {
				"tile": 100,
				"tileh": 100,
				"map": { "furn_computer": [0,0]},
			},
			"highlight.png": {
				"tile": 50,
				"tileh": 50,
				"map": { "highlightBlue": [0,0],},			 
			},
			"playerSprite2.png": {
				"tile": 128,
				"tileh": 128,
				"map": { "playerSprite1_reel": [0,0],},			 
			},
			"rooms/doors/doorSprite1.png": {
				"tile": 100,
				"tileh": 100,
				"map": { "doorSprite1_reel": [0,0],},			 
			},
			"rooms/doors/doorSprite2.png": {
				"tile": 100,
				"tileh": 100,
				"map": { "doorSprite2_reel": [0,0],},			 
			},
			"rooms/doors/doorSprite3.png": {
				"tile": 100,
				"tileh": 100,
				"map": { "doorSprite3_reel": [0,0],},			 
			},
			"rooms/doors/doorSprite4.png": {
				"tile": 100,
				"tileh": 100,
				"map": { "doorSprite4_reel": [0,0],},			 
			},
			"rooms/doors/doorSprite5.png": {
				"tile": 100,
				"tileh": 100,
				"map": { "doorSprite5_reel": [0,0],},			 
			},
			"rooms/doors/doorSprite6.png": {
				"tile": 100,
				"tileh": 100,
				"map": { "doorSprite6_reel": [0,0],},			 
			},
			"ui/loading.png": {
				"tile": 100,
				"tileh": 100,
				"map": { "loading_reel": [0,0],},			 
			},
			"ui/tutorialMark.png": {
				"tile": 300,
				"tileh": 300,
				"map": { "tutorialMark": [0,0],},			 
			},
			"ui/buttonsSprite.png": {
				"tile": 300,
				"tileh": 300,
				"map": { "ui_hint_on": [0,0],
					 "ui_hint_off": [1,0],
					 "ui_door_on": [2,0],
					 "ui_door_off": [3,0],
					 "ui_room_on": [4,0],
					 "ui_room_off": [5,0],
					 "ui_home": [6,0],
					 "ui_home_highlight": [7,0]},
			},
			"ui/enterSeed.png": {
			"tile": 340,
				"tileh": 160,
				"map": { "menu_enterSeed": [0,0],},			 
			},
			"ui/progressBar.png": {
			"tile": 400,
				"tileh": 60,
				"map": { "score_progress": [0,0],},			 
			},
		},
	};

	Crafty.load(assetsObj, // preload assets
		function() { //when loaded
			Crafty.scene("Menu"); //go to main scene
		},


		function(e) { //progress
			Crafty(Crafty('craftyProgress')[0]).text("Loading ... " + e.src + " --- " + Math.floor(e.percent) + "%").unselectable();
		},

		function(e) { //uh oh, error loading
		
		}
	);
});
