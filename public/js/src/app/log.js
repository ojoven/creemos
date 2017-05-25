/** LOG **/
// Log on speaker view

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

	message = data.user + ' ' + message; // we add the name of the user

	// We create an additional class (for styling)
	var additionalClass = typeof (data.sound == "undefined") ? data.type : data.type + ' ' + data.sound; // We add classes to the log so we can style them

	// We add the log to the logs container
	addLogToContainer(message, additionalClass);
}

function addLogToContainer(message, additionalClass) {

	var $logs = $('#logs');
	var $userLog = '<div class="log ' + additionalClass + '">' + message + '</div>';
	$logs.prepend($userLog);
}