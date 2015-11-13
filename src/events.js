function checkEvent(roomsExplored) {
	var eventChance = 100; //1 in 100 or 1 in (100 - rooms explored)
	var deciderSecret = Math.floor(roomRandom() * (eventChance - roomsExplored));
	var deciderEvent = Math.floor(roomRandom() * (eventChance*2));
	if (deciderSecret <= 0) {
		getSecretEvent();
	}
	if (deciderEvent < roomsExplored) {
		getEvent();
	}
}

function getSecretEvent() {
	console.log('place secret obj.');
}

function getEvent() {
	console.log('Do event.');
}

function testCheckEvent(times) {
	for (var i = 0;i < times;i++) {
		checkEvent(i);
	}
}
