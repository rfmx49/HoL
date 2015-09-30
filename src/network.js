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

function postToGoogleDaily() {
	var d = new Date();
	var dateString = d.getUTCFullYear() + "/" + (d.getUTCMonth()+1) + "/" + d.getUTCDate();
	var timeString = d.getUTCHours() + ":" + (d.getUTCMinutes()+1) + ":" + d.getUTCSeconds();
	var score = JSON.stringify({
		seed: gameSeed,
		user: localStorage.playerUUID,
		score: userPlayer.score.actual,
		rank: getRank(userPlayer.score.actual).currentLevel,
		date: dateString,
		time: timeString});
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

function newNetWorkUser(userName,emailAddress) {
	var sheet = atob("aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZm9ybXMvZC8xZnV3M01JVmlMUzYxdDA5ZGJwWUMxY2pMZlpxaldkamxudklRNnQ0THR3WS9mb3JtUmVzcG9uc2U=")

    $.ajax({
        url: sheet,
        data: {"entry.2074070425": userName, "entry.497874372": emailAddress, "entry.2077210173": localStorage.playerUUID},
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
