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
	sessionStorage.roomJumeUser = userName;
	var status;
	$.ajax({
        url: SERVERNAME + "/php/userSubmit.php",
        data: {"username": userName, "email": emailAddress, "uuid": localStorage.playerUUID, "password": password},
        type: "POST",
        dataType: "xml",
        timeout:4000,
        success: function(response) {
        	console.log(response);
        },
        error: function(xhr, textstatus, error) {
        	if (typeof xhr.responseText !== 'undefined') {
		      	console.log(xhr.responseText);
		      	var errorCheck = xhr.responseText.search(/SQLSTATE\[23000\]: Integrity constraint violation: 1062 Duplicate entry /);
		      	if (errorCheck >= 0) {
							errorCheck = xhr.responseText.search(/' for key 'uuid'/);
							if (errorCheck >= 0) {
								popUpCreateStatus({message:"Invalid UUID, UUID will regenerate Try again."});
								sessionStorage.removeItem('roomJumeUser');
		            localStorage.playerUUID = uuid();
		            return;
								//duplicate uuid
							}
							else {
								errorCheck = xhr.responseText.search(/' for key 'userName'/);
								if (errorCheck >= 0) {
									//duplicate userName
									popUpCreateStatus({message:"This username has already been taken."});
									sessionStorage.removeItem('roomJumeUser');
									$('#inputregistrationForm').find(':input:disabled').prop('disabled', false);
									return;
								}
								else {
									//Unknown SQL error
								}
							}
		      	}
		      	console.log(errorCheck);
        	}
        	else if(typeof textstatus !== 'undefined') {
						if (textstatus == 'timeout') {
							popUpCreateStatus({message:"Server Timeout. Try again later."});
							sessionStorage.removeItem('roomJumeUser');
							$('#inputregistrationForm').find(':input:disabled').prop('disabled', false);
						}
        	}
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
                sessionStorage.removeItem('roomJumeUser');
                popUpCreateStatus({message:"Invalid Username, try again."});
                $('#inputregistrationForm').find(':input:disabled').prop('disabled', false);
            },
            421: function() {
                //Success message
                console.log("return 421 - INVALID EMAIL");
                sessionStorage.removeItem('roomJumeUser');
                popUpCreateStatus({message:"Invalid Email, try again."});
                $('#inputregistrationForm').find(':input:disabled').prop('disabled', false);
            },
            422: function() {
                //Success message
                console.log("return 422 - INVALID UUID");
                sessionStorage.removeItem('roomJumeUser');
                popUpCreateStatus({message:"Invalid UUID, UUID will regenerate Try again."});
                $('#inputregistrationForm').find(':input:disabled').prop('disabled', false);
                localStorage.playerUUID = uuid();
            },
            423: function() {
                //Success message
                console.log("return 423 - DUPLICATE UUID");
                sessionStorage.removeItem('roomJumeUser');
                popUpCreateStatus({message:"Invalid UUID, UUID will regenerate Try again."});
                $('#inputregistrationForm').find(':input:disabled').prop('disabled', false);
                localStorage.playerUUID = uuid();
            },
            425: function() {
                //Success message
                console.log("return 425 - No Password Supplied");
                sessionStorage.removeItem('roomJumeUser');
                popUpCreateStatus({message:"No password supplied, Try again."});
                $('#inputregistrationForm').find(':input:disabled').prop('disabled', false);
                localStorage.playerUUID = uuid();
            },
            429: function() {
								//Success message
                console.log("return 429 - SQL ERROR");
                sessionStorage.removeItem('roomJumeUser');
                $('#inputregistrationForm').find(':input:disabled').prop('disabled', false);
            },
            500: function() {
								//Success message
                popUpCreateStatus({message:"Server Error. Try again later."});
                sessionStorage.removeItem('roomJumeUser');
                $('#inputregistrationForm').find(':input:disabled').prop('disabled', false);
            },
            504: function() {
								//Success message
                popUpCreateStatus({message:"Server Timeout. Try again later."});
                sessionStorage.removeItem('roomJumeUser');
                $('#inputregistrationForm').find(':input:disabled').prop('disabled', false);
            },
            200: function() {
                //Success Message
                console.log("return 200");
                popUpCreateStatus({message:"Registration Succesful!"});
                popUpDestroy();
            }
        }
    });
}

function sqlAccountLogin(userName,password) {
	sessionStorage.roomJumeUser = userName;
	var request = $.ajax({
        url: SERVERNAME + "/php/userLogin.php",
        data: {"username": userName, "password": password},
        type: "POST",
        dataType: "xml",
        timeout: 4000,
        success: function(response) {
        	console.log(response);
        },
        error: function(xhr, textstatus, error) {
        	console.log(xhr.responseText);
        	if(typeof textStatus !== 'undefined') {
		      	var uuidLogin = xhr.responseText;
		      	if (xhr.status == "456") {
							//login succesful
							localStorage.playerUUID = uuidLogin;
							//go to home page show user login succes.
							popUpDestroy();
		      	}
		      }
        	else if(typeof textstatus !== 'undefined') {
						if (textstatus == 'timeout') {
							popUpCreateStatus({message:"Server Timeout. Try again later."});
							sessionStorage.removeItem('roomJumeUser');
							$('#inputLoginForm').find(':input:disabled').prop('disabled', false);
						}
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
                popUpCreateStatus({message:"Invalid Username, try again"});
                sessionStorage.removeItem('roomJumeUser');
                $('#inputLoginForm').find(':input:disabled').prop('disabled', false);
            },
            451: function() {
                //Success message
                console.log("return 451 - NO PASSWORD");
                popUpCreateStatus({message:"Invalid Password"});
                sessionStorage.removeItem('roomJumeUser');
                $('#inputLoginForm').find(':input:disabled').prop('disabled', false);
            },
            452: function() {
                //Success message
                console.log("return 452 - INVALID UUID");
                popUpCreateStatus({message:"Invalid UUID"});
                sessionStorage.removeItem('roomJumeUser');
                $('#inputLoginForm').find(':input:disabled').prop('disabled', false);
            },
            456: function() {
                //Success message
                console.log("return 456 - LOGIN SUCCESS");
                popUpCreateStatus({message:"Login Success"});
                displayAccounts();
               	popUpDestroy();
            },
            457: function() {
                //Success message
                console.log("return 457 - INCORRECT PASSWORD");
                popUpCreateStatus({message:"Incorrect Password."});
                sessionStorage.removeItem('roomJumeUser');
                $('#inputLoginForm').find(':input:disabled').prop('disabled', false);
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
        error: function(xhr, textstatus, error) {
        	if(typeof textstatus !== 'undefined') {
						if (textstatus == 'timeout') {
							popUpCreateStatus({message:"Server Timeout. Game not uploaded."});
						}
        	}
        },
        timeout:4000,
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
