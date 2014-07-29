var express = require('express'),
  bodyParser = require('body-parser'),
  compress = require('compression'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  favicon = require('serve-favicon'),
  http = require('http'),
  path = require('path'),
  config = require('./lib/config'),
  modules = require('./modules');

var app = express();

app.set('views', __dirname + '/dist/views');
app.set('view engine', 'ejs');

app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(compress());

app.use(bodyParser());

app.use(cookieParser(config.get('env.secret')));

app.use(session({
  cookie: {
    maxAge: config.get('env.maxAge')
  }
}));

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.static(path.join(__dirname, '/dist')));

modules(app);

http.createServer(app).listen(config.get('env.port'), function() {
  console.log("Express server listening on port " + config.get('env.port'));
});