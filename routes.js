// This file is required by app.js. It sets up event listeners
// for the two main URL endpoints of the application - /create and /chat/:id
// and listens for socket.io messages.

// Export a function, so that we can pass
// the app and io instances from the app.js file:

module.exports = function(app,io){

	app.get('/', function(req, res){

		// Render views/judge.html
		res.render('judge');
	});

	app.get('/presenter', function(req,res){

		// Render views/presenter.html
		res.render('presenter');
	});
};


