var mysql = require('mysql');
var express = require('express');
var app = express();
var url = require('url');
var httpg = require('http-get');
var db_helper = require('./db_helper');

app.configure(function() {
  app.use(express.static(__dirname + '/public/'));
});

app.all('*', function(req, res, next){
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");
  res.set('Access-Control-Allow-Headers', "content-type, accept");
  res.set('Access-Control-Allow-Max-Age', 10);
  if ('OPTIONS' === req.method) return res.send(200);
  next();
});
app.use(express.bodyParser());

app.post('/classes/:roomname', function(request, response) {
  var data = {};
  var enddata ='';

  request.on('data', function(chunk) {
    enddata += chunk;
  });
  request.on('end', function() {
    db_helper.post(enddata);
    response.end();
  });
});

app.get('/classes/messages/:roomname', function(request, response){
  response.set('content-type', 'application/JSON');
  var roomname = request.params.roomname;
  db_helper.getMessages(response, roomname);
});

app.listen(8080);
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
// var dbConnection = mysql.createConnection({
//   user: "",
//   password: "",
//   database: "chat"
// });

// dbConnection.connect();
// /* Now you can make queries to the Mysql database using the
//  * dbConnection.query() method.

