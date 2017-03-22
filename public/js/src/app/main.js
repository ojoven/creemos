$(function(){

	// connect to the socket
	var socket = io();

	socket.on('event', function(data){
		console.log(data);
	});

	// DOM OBJECTS
	var $body = $('body'),

		// Judge
		$positive = $('#positive'),
		$negative = $('#negative'),

		$crack = $('#crack'),
		$payaso = $('#payaso'),
		$queremos = $('#queremos'),
		$caraanchoa = $('#caraanchoa'),

		// Presenter
		$applausePlayer = document.getElementById('applause-player'),
		$booPlayer = document.getElementById('boo-player');

	// OTHERS
	var numApplauding = 0,
		numBooing = 0;

	// NAMES
	var names = ['Mikel', 'Fernando', 'Andoni', 'Raquel', 'Xabi', 'Antonio', 'Federico', 'Luis', 'Jon', 'Ion', 'Julen', 'Igor', 'Imanol', 'Iñigo'];
	var user = names[Math.floor(Math.random() * names.length)];
	var id = guid();

	console.log('You are ' + user + ' with id ' + id);

	// Judge related events (triggers)
	if ($body.hasClass('judge')) {

		// Applause
		$positive.on('touchstart mousedown', function(e) {
			e.preventDefault();
			$positive.addClass('active');
			socket.emit('event', {type: 'positive-start', user: user, id: id});
			return false;
		});

		$positive.on('touchend mouseup', function(e) {
			e.preventDefault();
			$positive.removeClass('active');
			socket.emit('event', {type: 'positive-end', user: user, id: id});
			return false;
		});

		// Boooh
		$negative.on('touchstart mousedown', function(e) {
			e.preventDefault();
			$negative.addClass('active');
			socket.emit('event', {type: 'negative-start', user: user, id: id});
			return false;
		});

		$negative.on('touchend mouseup', function(e) {
			e.preventDefault();
			$negative.removeClass('active');
			socket.emit('event', {type: 'negative-end', user: user, id: id});
			return false;
		});

		// Others
		$crack.on('click', function() {
			socket.emit('event', {type: 'other', sound:'crack', user: user, id: id});
			return false;
		});

		$payaso.on('click', function() {
			socket.emit('event', {type: 'other', sound:'payaso', user: user, id: id});
			return false;
		});

		$queremos.on('click', function() {
			socket.emit('event', {type: 'other', sound:'queremos', user: user, id: id});
			return false;
		});

		$caraanchoa.on('click', function() {
			socket.emit('event', {type: 'other', sound:'caraanchoa', user: user, id: id});
			return false;
		});

		socket.on('event', function(data){

			switch (data.type) {
				case 'view':
					updateView(data.view);
					break;
			}

		});
	}

	// Presenter related events (catch)
	if ($body.hasClass('presenter')) {

		// We get an event
		socket.on('event', function(data){

			console.log('here?', data);
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

		var $toRatings = $('#to-ratings'),
			$toResume = $('#to-resume');

		$toRatings.on('click', function() {
			socket.emit('event', {type: 'view', view:'ratings'});
		});

		$toResume.on('click', function() {
			socket.emit('event', {type: 'view', view:'resume'});
		});

	}

	// Change view functions
	function updateView(view) {

		$('.section').fadeOut(300);
		setTimeout(function() {
			$('#' + view).fadeIn();
		}, 500);

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

	// LOG
	function log(data) {

		var message = '';
		switch (data.type) {
			case 'positive-start':
				message = ' ha empezado a aplaudirte';
				break;
			case 'positive-end':
				message = ' ha dejado de aplaudirte';
				break;
			case 'negative-start':
				message = ' ha empezado a abuchearte';
				break;
			case 'negative-end':
				message = ' ha dejado de abuchearte';
				break;
			case 'other':
				message = ' te ha gritado ';
				if (data.sound == 'queremos') {
					message += ' ¡queremos un hijo tuyo!'; // special case, long text with spaces
				} else {
					message += ' ¡' + data.sound + '!';
				}
				break;
		}

		console.log('hey', data, message);

		message = data.user + ' ' + message; // we add the name of the user

		var $logs = $('#logs');
		var additionalClass = typeof (data.sound == "undefined") ? data.type : data.type + ' ' + data.sound; // We add classes to the log so we can style them
		var $userLog = '<div class="log ' + additionalClass + '">' + message + '</div>';
		$logs.prepend($userLog);
	}

	// Generate unique ID
	function guid() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
	}

});
