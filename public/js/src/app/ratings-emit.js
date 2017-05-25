/** RATINGS (EMIT) **/
// Functions to ratings by emitters (audience)

// VARS
var $positive = $('#positive'),
	$negative = $('#negative'),

	$crack = $('#crack'),
	$payaso = $('#payaso'),
	$queremos = $('#queremos'),
	$caraanchoa = $('#caraanchoa');

$(function(){

	if (isAudience()) {

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

	}

});