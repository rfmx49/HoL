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
	var sheet = atob("aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZm9ybXMvZC8xX1hIeHd6NHZtbzhTVzlnLWU3SGJOcmxOaGZHY0FDMkhXT0RLb1NQc1lXWS9mb3JtUmVzcG9uc2U=")

    $.ajax({
        url: sheet,
        data: {"entry.903661351": score},
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
	var sheet = atob("aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZm9ybXMvZC8xTXYzX2YwcS1uaDVGVC13R3RiMUprS2pqc2Jmc2E5aUszWXlPZHI1ZjVLdy9mb3JtUmVzcG9uc2U=")
	$.ajax({
        url: sheet,
        data: {"entry.24760897": userName, "entry.1853508102": emailAddress, "entry.462132499": localStorage.playerUUID},
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
