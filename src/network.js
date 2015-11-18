var SERVERNAME = "http://65.94.193.108";

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
	var status;
	$.ajax({
        url: SERVERNAME + "/php/userSubmit.php",
        data: {"username": userName, "email": emailAddress, "uuid": localStorage.playerUUID, "password": password},
        type: "POST",
        dataType: "xml",
        success: function(response) {
        	console.log(response);
        },
        error: function(xhr, status, error) {
        	console.log(xhr.responseText);
        	var errorCheck = xhr.responseText.search(/SQLSTATE\[23000\]: Integrity constraint violation: 1062 Duplicate entry /);
        	if (errorCheck >= 0) {
						errorCheck = test.search(/' for key 'uuid'/);
						if (errorCheck >= 0) {
							//duplicate uuid
						}
						else {
							errorCheck = test.search(/' for key 'userName''/);
							if (errorCheck >= 0) {
								//duplicate userName
							}
							else {
								//Unknown SQL error
							}
						}
        	}
        	console.log(errorCheck);
        },
        statusCode: {
            0: function() {
                //Success message
                console.log("return 0");
                status = 0;
            },
            420: function() {
                //Success message
                console.log("return 420 - INVALID USERNAME");
                status = "Invalid Username";
                return status;
            },
            421: function() {
                //Success message
                console.log("return 421 - INVALID EMAIL");
                status = "Invalid Email";
                return status;
            },
            422: function() {
                //Success message
                console.log("return 422 - INVALID UUID");
                status = "Invalid UUID";
                return status;
            },
            423: function() {
                //Success message
                console.log("return 423 - DUPLICATE UUID");
                status = "Duplicate UUID, Regen UUID";
                return status;
            },
            429: function() {
								//Success message
                console.log("return 429 - SQL ERROR");
                status = "SQL ERROR CHECK RESPONSE TEXT";
                return status;
            },
            200: function() {
                //Success Message
                console.log("return 200");
                status = "Registration Succesful";
                return status;
            }
        }
    });
}

function sqlAccountLogin(userName,password) {
	var request = $.ajax({
        url: SERVERNAME + "/php/userLogin.php",
        data: {"username": userName, "password": password},
        type: "POST",
        dataType: "xml",
        success: function(response) {
        	console.log(response);
        },
        error: function(xhr, status, error) {
        	console.log(xhr.responseText);
        	var uuidLogin = xhr.responseText;
        	if (xhr.status == "456") {
						//login succesful
						localStorage.playerUUID = uuidLogin;
						//go to home page show user login succes.
        	}
        },
        statusCode: {
            0: function() {
                //Success message
                console.log("return 0");
            },
            450: function() {
                //Success message
                console.log("return 450 - INVALID USERNAME");
            },
            451: function() {
                //Success message
                console.log("return 451 - NO PASSWOR");
            },
            452: function() {
                //Success message
                console.log("return 452 - INVALID UUID");
            },
            456: function() {
                //Success message
                console.log("return 456 - LOGIN SUCCESS");
            },
            457: function() {
                //Success message
                console.log("return 457 - INCORRECT PASSWORD");
            },
            200: function() {
                //Success Message
                console.log("return 200");
            }
        }
    });
    request.done(function(msg) {
    	console.log(msg);
    });
    request.success(function(msg) {
    	console.log(msg);
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
        url: SERVERNAME + "/php/gameSubmit.php",
        data: {"uuid": score.user, "seed": score.seed, "score": score.score, "rank": score.rank},
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
