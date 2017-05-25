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
			$toResume = $('#to-resume' ),
			$toSendUrl = $('#to-send-url');

		$toRatings.on('click', function() {
			socket.emit('event', {type: 'view', view:'ratings'});
		});

		$toResume.on('click', function() {
			socket.emit('event', {type: 'view', view:'resume'});
		});

		$toSendUrl.on('click', function() {
			var url = $('#url').val();
			socket.emit('event', {type: 'view', view:'iframe', url: url});
		});
	}

});

// Change view functions
function updateView(view) {

	var delayLoadingNewView = 500;
	if (view === 'iframe') delayLoadingNewView = 1000;
	$('.section').fadeOut(300);
	setTimeout(function() {
		$('#' + view).fadeIn();
	}, delayLoadingNewView);

}

