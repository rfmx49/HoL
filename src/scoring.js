function computeScore() {
	//player has just entered a room.
	userPlayer.score.visible ++;
	userPlayer.score.fluffCount ++;
	if (userPlayer.score.fluffCount == userPlayer.score.fluff) {
		userPlayer.score.visible = userPlayer.score.actual;
		userPlayer.score.fluff = Math.floor(roomRandom() * 7) + 4;
		userPlayer.score.fluffCount = 0;

		//upateLevel
		//ui-game-rank
		displayRank();
		
		
	}
	displayScore(userPlayer.score.visible);	
}

function displayScore(score) {
	$( "#ui-game-score" ).html(score);
}

function displayRank() {
	var rank = getRank(userPlayer.score.actual);
	$( "#ui-game-rank" ).html(rank.currentLevel);

	//check if rank has changed.
	if (userPlayer.score.rank != rank.currentLevel) {
		if (userPlayer.score.rank < 5 && rank.currentLevel >= 5) {
			awardHint();
		}
		if (userPlayer.score.rank < 9 && rank.currentLevel >= 9) {
			awardHint();
		}
		if (userPlayer.score.rank < 14 && rank.currentLevel >= 14) {
			awardHint();
		}
		if (userPlayer.score.rank < 16 && rank.currentLevel >= 16) {
			awardHint();
		}
		if (rank.currentLevel > 16) {
			if (userPlayer.score.rank <= 16) {
				userPlayer.score.rank = 16;
			}
			for (userPlayer.score.rank; userPlayer.score.rank < rank.currentLevel; userPlayer.score.rank++) {
				awardHint();
			}
		}
	}
	userPlayer.score.rank = rank.currentLevel;	
}

function getRank(rooms) {
	//genereate degrees list
	//rooms = max
	var nextLvl = {};
	if (rooms == 1) {
		nextLvl = {currentLevel: 1, nextLvlRooms: 3, difference: 3 - rooms}
		return nextLvl;
	}
	else if (rooms == 3) {
		nextLvl = {currentLevel: 2, nextLvlRooms: 5, difference: 5 - rooms }
		return nextLvl;
	}
	else if (rooms == 0) {
		nextLvl = {currentLevel: 0, nextLvlRooms: 1, difference: 1 }
		return nextLvl;
	}
	var degree = []
	degree[1] = 1;
	degree[2] = 3;
	var max = false;
	var weight;
	var level = 3;
	while (max == false) {
		weight = 0.1*Math.pow(0.924,(level-3));
		degree[level]=degree[level-1]+((degree[level-1]-degree[level-2])*(1+weight));
		console.log("Checking Level: " + level + " rooms this level: " + degree[level] + " our rooms: " + rooms + " Weight: " + weight);
		if (Math.round(degree[level]) > rooms) {
			console.log('level is ' + level);
			nextLvl = {currentLevel: level-1, nextLvlRooms: Math.round(degree[level]), difference: Math.round(degree[level]) - rooms}
			return nextLvl;
			max = true;
		}
		level++
	}
}

//HighScores
function saveHighScores() {
	var score = [];
	score.push({seed: gameSeed, score: userPlayer.score.actual,rank: getRank(userPlayer.score.actual).currentLevel, date: "date"});
	score.sort(function(a,b){return b.score-a.score});
}

function postToGoogleDaily() {

	var score = JSON.stringify({seed: gameSeed, score: userPlayer.score.actual,rank: getRank(userPlayer.score.actual).currentLevel, date: "date"});
	var sheet = atob("aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZm9ybXMvZC8xWVlpRGpRWUV4SFh4YkVFY0JRNl9VYlJIWVJqdnp3S0JBNHN5Sms0S0lxVS9mb3JtUmVzcG9uc2U=")

    $.ajax({
        url: sheet,
        data: {"entry.1364062968": score},
        type: "POST",
        dataType: "xml",
        statusCode: {
            0: function() {
                //Success message
                console.log("return 0");
            },
            200: function() {
                //Success Message
                console.log("return 200");
            }
        }
    });
}


