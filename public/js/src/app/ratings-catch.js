/** RATINGS CATCH **/
// Functions to ratings by catcher (speaker)

// DOM OBJECTS
var $applausePlayer = document.getElementById('applause-player'),
	$booPlayer = document.getElementById('boo-player');

// OTHERS
var numApplauding = 0,
	numBooing = 0;

$(function(){

	// Speaker related events (catch)
	if (isSpeaker()) {

		// We get an event
		socket.on('event', function(data){

			log(data);

			switch (data.type) {
				case 'positive-start':
					increaseApplause(data);
					break;
				case 'positive-end':
					decreaseApplause(data);
					break;
				case 'negative-start':
					increaseBoo(data);
					break;
				case 'negative-end':
					decreaseBoo(data);
					break;
				case 'other':
					triggerSound(data.sound);
					break;
			}

		});

	}

});

// Sound functions

// Applause
function increaseApplause(data) {

	numApplauding++;

	console.log('numApplauding', numApplauding);

	if (numApplauding == 1) {
		$applausePlayer.play(); // start
		$applausePlayer.volume = 0.1; // 1 tenth
	} else {
		$applausePlayer.volume = numApplauding * 10 / 100;
	}
}

function decreaseApplause() {

	numApplauding--;

	console.log('decrease numApplauding', numApplauding);

	if (numApplauding == 0) {
		console.log('stop');
		$applausePlayer.pause(); // stop
	} else {
		$applausePlayer.volume = numApplauding * 10 / 100;
	}
}

// Boo
function increaseBoo(data) {

	numBooing++;

	if (numBooing == 1) {
		$booPlayer.play(); // start
		$booPlayer.volume = 0.1; // 1 tenth
	} else {
		$booPlayer.volume = numBooing * 10 / 100;
	}
}

function decreaseBoo(data) {

	numBooing--;

	if (numApplauding == 0) {
		$booPlayer.pause(); // stop
		console.log('stop');
	} else {
		$booPlayer.volume = numBooing * 10 / 100;
	}
}

// Other sounds
function triggerSound(sound) {

	console.log(sound);

	var $soundPlayer = document.getElementById(sound + '-player');
	$soundPlayer.play(); // start
	$soundPlayer.volume = 1;
	console.log($soundPlayer.volume);

}