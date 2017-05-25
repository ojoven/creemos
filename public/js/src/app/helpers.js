/** HELPERS **/

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

// Speaker vs. Audience

// Speaker
function isSpeaker() {

	var $body = $('body');
	return ($body.hasClass('speaker'));
}

// Audience
function isAudience() {

	var $body = $('body');
	return ($body.hasClass('audience'));
}