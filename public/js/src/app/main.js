$(function(){

	// connect to the socket
	var socket = io();

	// on connection to server get the id of person's room
	socket.on('connect', function(){
		console.log('connected');
	});

	socket.on('event', function(data){
		console.log(data);
	});

	// DOM OBJECTS
	var $body = $('body'),

		// Judge
		$positive = $('#positive'),
		$negative = $('#negative' ),

		// Presenter
		$applausePlayer = document.getElementById('applause-player');

	// OTHERS
	var numApplauding = 0,
		numBoohing = 0;

	// NAMES
	var names = ['Mikel', 'Fernando', 'Andoni', 'Raquel', 'Xabi', 'Antonio', 'Federico', 'Luis', 'Jon', 'Ion', 'Julen', 'Igor', 'Imanol', 'Iñigo'];
	var user = rand = names[Math.floor(Math.random() * myArray.length)];

	// Judge related events (triggers)
	if ($body.hasClass('judge')) {

		$positive.on('mousedown', function() {
			socket.emit('event', {type: 'positive-start', user: user});
		});

		$positive.on('mouseup', function() {
			socket.emit('event', {type: 'positive-end', user: user});
		});

	}

	// Presenter related events (catch)
	if ($body.hasClass('presenter')) {

		// We get an event
		socket.on('event', function(data){

			switch (data.type) {
				case 'positive-start':
					increaseApplause();
					console.log('applause start!');
					break;
				case 'positive-end':
					decreaseApplause();
					console.log('applause end!');
					break;
			}

			console.log(numApplauding);

		});

	}

	function increaseApplause() {

		numApplauding++;
		console.log(numApplauding);

		if (numApplauding == 1) {
			$applausePlayer.play(); // start
			$applausePlayer.volume = 0.1; // 1 tenth
		} else {
			$applausePlayer.volume = numApplauding * 10 / 100;
		}
	}

	function decreaseApplause() {

		numApplauding--;

		if (numApplauding == 0) {
			$applausePlayer.stop(); // start
		} else {
			$applausePlayer.volume = numApplauding * 10 / 100;
		}
	}

});
