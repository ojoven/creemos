// This file is executed in the browser, when people visit /chat/<random id>

$(function(){

	// getting the id of the room from the url
	var id = Math.random(99999);

	// connect to the socket
	var socket = io();

	// on connection to server get the id of person's room
	socket.on('connect', function(){
		console.log('connected');
	});

	socket.on('event', function(data){
		console.log(data);
	});

	$('#emitter').on('click', function(e) {

		e.preventDefault();
		socket.emit('event', {msg: 'HEY!', user: id});

	});

});
