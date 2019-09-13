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

function getLogin() {
	var username = $('#inputLoginUsername').val();
    var deviceUUID = $('#inputLoginUUID').val();
	//disable fields
	$('#inputLoginForm').find(':input:not(:disabled)').prop('disabled', true);

	//simple sanitation Server takes care of reset if idiots will be idiots.

	if (username == "") {
		popUpCreateStatus({message:"User Name or Password Incorrect"});
		return 1;
	}
	if (deviceUUID == "") {
		if (typeof localStorage.uuid === 'undefined'){
			deviceUUID = uuid();
		}
		else { 	deviceUUID = localStorage.uuid }
	}

	sqlNewGameAccount(username,deviceUUID,"true");

}

function getRegister() {
	var username = $('#inputRegisterUsername').val();
	var deviceUUID = $('#inputRegisterUUID').val();

	//disable fields
	$('#inputregistrationForm').find(':input:not(:disabled)').prop('disabled', true);

	//simple sanitation Server takes care of reset if idiots will be idiots.

	if (username == "") {
		//generate random name
		username = "LostSoul" + Math.floor(Math.random() * 1000)
		
		//popUpCreateStatus({message:"Please enter a username and password."});
		//return 1;
	}
	if (deviceUUID == "") {
		if (typeof localStorage.uuid === 'undefined'){
			deviceUUID = uuid();
		}
		else { 	deviceUUID = localStorage.uuid }
	}
	sqlNewGameAccount(username,deviceUUID);	
}

function sqlNewGameAccount(userName,deviceUUID,force) {
	if (typeof force === 'undefined'){ force = "false" }
	sessionStorage.roomJumeUser = userName;
	sessionStorage.uuid = deviceUUID;
	var status;
	$.ajax({
        url: SERVERNAME,
        data: {"userName": userName, "deviceUUID": deviceUUID, "force": force},
        type: "GET",
        dataType: "json",
        timeout:4000,
        success: function(response) {
        	if (response.msgcode == "loginCreated") {
		    	popUpCreateStatus({message:"Registration Succesful! You are the " + getOrdinal(response.row -1) + " user to register"});
		        popUpDestroy();
		    	console.log(response);
		    	//save uuid to localStorage
		    	localStorage.uuid = sessionStorage.uuid;
		    	localStorage.username = userName;
		    	sessionStorage.roomJumeUser = userName;
	    	} else if (response.msgcode == "loginFound") {
	    		popUpDestroy(); 
				popUpCreate("userFound",{"username": response.userName});
		    	console.log(response);
		    	//save uuid to localStorage
		    	localStorage.uuid = sessionStorage.uuid;
		    	localStorage.username = response.userName;
		    	sessionStorage.roomJumeUser = userName;
	    	} else if (response.msgcode == "loginForced") {
				popUpCreateStatus({message:"Registration Change Succesful! You are still the " + getOrdinal(response.row -1) + " user to register"});
		        popUpDestroy();
		    	console.log(response);
		    	//save uuid to localStorage
		    	localStorage.uuid = sessionStorage.uuid;
		    	localStorage.username = userName;
		    	sessionStorage.roomJumeUser = userName;
	    	} else if (response.msgcode == "loginSuccess") {
				popUpCreateStatus({message:"Logged in as " + response.userName});
		        popUpDestroy();
		    	console.log(response);
		    	//save uuid to localStorage
		    	localStorage.uuid = sessionStorage.uuid;
		    	localStorage.username = userName;
		    	sessionStorage.roomJumeUser = userName;
	    	}
	    	displayAccounts();
        },
        error: function(xhr, textstatus, error) {
        	if (typeof xhr.responseText !== 'undefined') {
		      	console.log(xhr.responseText);
		  
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
            200: function() {
                //Success Message
                console.log("return 200");
            	//popUpDestroy();
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
