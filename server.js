var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	morgan = require("morgan");

// Load app configs
var config          = require('./config')();            // load configuration
//console.log("Config is ", config);

var formBuilderDb = (require('./database/mongo.js')(config.db.mongodb)).connect("form_builder");
//console.log("formBuilderDb", formBuilderDb);

//  Set the environment variables we need.
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//App usages
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());
app.use(morgan("dev"));
//JSONIFY ERROR
require("./helpers/jsonify-error.js");

//Load Routes
require("./app/routes")(app);


//Load Assignment Server App
require("./public/assignment/server/app.js")(app, formBuilderDb);

// Handle 404
/*app.use(function(req, res) {
	res.redirect(302, '/not-found.html');
	//res.send('404: Page not Found', 404);
});*/

  // Handle 500
  app.use(function(error, req, res, next) {
  	res.send('500: Internal Server Error', 500);
  });

  app.listen(port, ipaddress, function() {
  	console.log("EXPRESS server started on port "+port); 
  });