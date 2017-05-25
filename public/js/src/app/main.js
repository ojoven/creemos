/** MAIN **/

// Connect to the socket
var socket = io();

// Create User
var names = ['Mikel', 'Ainara', 'Fernando', 'María', 'Andoni', 'Raquel', 'Xabi', 'Sara', 'Antonio', 'Luis', 'Jon', 'Miren', 'Julen', 'Ana', 'Igor', 'Imanol', 'Iñigo'];
var user = names[Math.floor(Math.random() * names.length)];
var id = guid();

// Hello!
console.log('Hello! You are ' + user + ' with id ' + id);

$(function(){

	// Log with dev purposes
	socket.on('event', function(data){
		console.log(data);
	});

});
