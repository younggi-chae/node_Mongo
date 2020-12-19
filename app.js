
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var mongoose = require('mongoose');
var config = require('./config');
var community = require('./routes/community');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', community.index);
app.get('/community', community.index);
app.get('/community/open', community.open);
app.post('/community', community.create);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//Connect to mongoDB
mongoose.connect(config.database.url);
mongoose.connection.on('open', function(){
	console.log('MongoDB is connected %s', config.database.url);
});














