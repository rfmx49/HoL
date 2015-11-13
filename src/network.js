function uuid() {
    function randomDigit() {
        if (crypto && crypto.getRandomValues) {
            var rands = new Uint8Array(1);
            crypto.getRandomValues(rands);
            return (rands[0] % 16).toString(16);
        } else {
            return ((Math.random() * 16) | 0).toString(16);
        }
    }
    var crypto = window.crypto || window.msCrypto;
    return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, randomDigit);
}

function sqlNewGameAccount(userName,emailAddress,password) {
	$.ajax({
        url: "http://65.94.193.108/userSubmit.php",
        data: {"username": userName, "email": emailAddress, "uuid": localStorage.playerUUID, "password": password},
        type: "POST",
        dataType: "xml",
        statusCode: {
            0: function() {
                //Success message
                console.log("return 0");
            },
            420: function() {
                //Success message
                console.log("return 420 - INVALID USERNAME");
            },
            421: function() {
                //Success message
                console.log("return 421 - INVALID EMAIL");
            },
            422: function() {
                //Success message
                console.log("return 422 - INVALID UUID");
            },
            423: function() {
                //Success message
                console.log("return 423 - DUPLICATE UUID");
            },
            200: function() {
                //Success Message
                console.log("return 200");
            }
        }
    });
}

function sqlAccountLogin(userName,password) {
	$.ajax({
        url: "http://65.94.193.108/userLogin.php",
        data: {"username": userName, "password": password},
        type: "POST",
        dataType: "xml",
        statusCode: {
            0: function() {
                //Success message
                console.log("return 0");
            },
            420: function() {
                //Success message
                console.log("return 420 - INVALID USERNAME");
            },
            421: function() {
                //Success message
                console.log("return 421 - INVALID EMAIL");
            },
            422: function() {
                //Success message
                console.log("return 422 - INVALID UUID");
            },
            423: function() {
                //Success message
                console.log("return 423 - DUPLICATE UUID");
            },
            200: function() {
                //Success Message
                console.log("return 200");
            }
        }
    });
}

function sqlPostGame() {
	//var d = new Date();
	//var dateString = d.getUTCFullYear() + "/" + (d.getUTCMonth()+1) + "/" + d.getUTCDate();
	//var timeString = d.getUTCHours() + ":" + (d.getUTCMinutes()+1) + ":" + d.getUTCSeconds();
	var score = {
		seed: gameSeed,
		user: localStorage.playerUUID,
		score: userPlayer.score.actual,
		rank: getRank(userPlayer.score.actual).currentLevel};

    $.ajax({
        url: "http://65.94.193.108/gameSubmit.php",
        data: {"uuid": score.user, "seed": score.seed, "score": score.score, "rank": score.rank},
        {uuid: "2f8704b0-96c5-49ca-8c11-f36bd945855a", seed: "test", score: "100", rank: "23"}
        type: "POST",
        dataType: "xml",
        statusCode: {
            0: function() {
                //Success message
                console.log("return 0");
            },
            420: function() {
                //Success message
                console.log("return 440 - No score submited");
            },
            421: function() {
                //Success message
                console.log("return 441 - No Seed Submited");
            },
            422: function() {
                //Success message
                console.log("return 442 - INVALID UUID");
            },
            423: function() {
                //Success message
                console.log("return 444 - No Rank Submited");
            },
            200: function() {
                //Success Message
                console.log("return 200");
            }
        }
    });
}

function createRegistrationForm() {
	
}

function createLoginForm() {
	
}
