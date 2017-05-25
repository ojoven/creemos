/** IFRAME **/
// Functions related to the URL sent by the speaker, to be embedded in the audience's view

$(function() {

	socket.on('event', function(data){

		var $iframe = $('#iframe > iframe');

		if (data.type === 'view' && data.view === 'iframe' && data.url !== '') {
			$iframe.attr('src', data.url);
		}

	});

});

