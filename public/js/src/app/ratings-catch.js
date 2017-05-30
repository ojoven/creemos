/** RATINGS CATCH **/
// Functions to ratings by catcher (speaker)

// DOM OBJECTS
var $applausePlayer = document.getElementById('applause-player'),
	$booPlayer = document.getElementById('boo-player');

// OTHERS
var ratingPositive = 0,
	ratingNegative = 0,
	ratingPositiveInterval = [],
	ratingNegativeInterval = [],
	numApplauding = 0,
	numBooing = 0;

$(function(){

	// Speaker related events (catch)
	if (isSpeaker()) {

		// We get an event
		socket.on('event', function(data){

			log(data);

			switch (data.type) {
				case 'positive-start':
					increasePositiveRatingsValue(data);
					increaseApplause(data);
					break;
				case 'positive-end':
					stopPositiveRatingsValue(data);
					decreaseApplause(data);
					break;
				case 'negative-start':
					increaseNegativeRatingsValue(data);
					increaseBoo(data);
					break;
				case 'negative-end':
					stopNegativeRatingsValue(data);
					decreaseBoo(data);
					break;
				case 'other':
					triggerSound(data.sound);
					break;
			}

		});

	}

});

// Rating value functions
function increasePositiveRatingsValue(data) {

	var $ratingPositive = $('.dashboard-rating.positive > .value');
	ratingPositiveInterval[data.id] = setInterval(function() {
		ratingPositive++;
		$ratingPositive.text(ratingPositive);
	}, 100);

}

function stopPositiveRatingsValue(data) {
	clearInterval(ratingPositiveInterval[data.id])
}

function stopNegativeRatingsValue(data) {
	clearInterval(ratingNegativeInterval[data.id])
}

// Rating value functions
function increaseNegativeRatingsValue(data) {

	var $ratingNegative = $('.dashboard-rating.negative > .value');
	ratingNegativeInterval[data.id] = setInterval(function() {
		ratingNegative++;
		$ratingNegative.text(ratingNegative);
	}, 100);

}

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