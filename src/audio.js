function loadSounds() {
	//door opeing sounds
	var audioDir = "res/audio/";
	Crafty.audio.add({door_open_1 : [audioDir + "doors/door_open_1.ogg"], 
door_open_2 : [audioDir + "doors/door_open_2.ogg"],
door_open_3 : [audioDir + "doors/door_open_3.ogg"],
door_open_4 : [audioDir + "doors/door_open_4.ogg"],
door_open_5 : [audioDir + "doors/door_open_5.ogg"],
door_open_6 : [audioDir + "doors/door_open_6.ogg"],
walking : [audioDir + "player/walking.ogg"]});
}

function setVolume() {
	Crafty.audio.toggleMute()
}

function setMute() {
	Crafty.audio.toggleMute()
}

function playSound(soundId,repeat,volume) {
	if (typeof repeat === 'undefined') { repeat = 1; }
	if (typeof volume === 'undefined') { volume = 1; }
	Crafty.audio.play(soundId,repeat,volume);
}