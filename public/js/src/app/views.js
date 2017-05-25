/** VIEWS **/
// Functions related to view change

$(function() {

	if (isAudience()) {

		socket.on('event', function(data){

			switch (data.type) {
				case 'view':
					updateView(data.view);
					break;
			}

		});
	}

	if (isSpeaker()) {

		var $toRatings = $('#to-ratings'),
			$toResume = $('#to-resume');

		$toRatings.on('click', function() {
			socket.emit('event', {type: 'view', view:'ratings'});
		});

		$toResume.on('click', function() {
			socket.emit('event', {type: 'view', view:'resume'});
		});
	}

});

// Change view functions
function updateView(view) {

	$('.section').fadeOut(300);
	setTimeout(function() {
		$('#' + view).fadeIn();
	}, 500);

}

