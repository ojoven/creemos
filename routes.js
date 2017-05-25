// This file is required by app.js. It sets up event listeners
// for the two main URL endpoints of the application - /create and /chat/:id
// and listens for socket.io messages.

// Export a function, so that we can pass
// the app and io instances from the app.js file:

module.exports = function(app,io){

	app.get('/', function(req, res){

		// Render views/audience.html
		res.render('audience');
	});

	app.get('/speaker', function(req,res){

		// Render views/speaker.html
		res.render('speaker');
	});
};


