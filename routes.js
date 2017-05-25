/** ROUTES **/
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


