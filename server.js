// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('./config/mongoose'),
  express = require('./config/express'),
  passport = require('./config/passport');


// Create a new Mongoose connection instance
var db = mongoose();

// Create a new Express application instance
var app = express();

// Configure the passport middleware
var passport = passport();

// Use the Express application instance to listen to the C9 preferred port
app.listen(process.env.PORT);

// Log the server status to the console
console.log('Server running at http://localhost:' + process.env.PORT + '/');

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;