/* Import node's http module: */
var express = require('express');
var app = module.exports = express();
var http = require("http");
var url = require('url');
var server = http.createServer(app);

var Firebase = require('firebase');
var myFireBase = new Firebase('https://chatterbox-EP.firebaseIO-demo.com/');

var messagesStore = myFireBase.child('messages');

var messageArray = {'lobby':[]};

var roomList = {};

var port = process.env.PORT || 80;

messagesStore.once('value', function(parentDS) {
  parentDS.forEach(function(childSnapshot) {
    var name = childSnapshot.name();
    roomList[name] = name;
    var childData = childSnapshot.val();
    for (var key in childData) {
      messageArray[name] ? messageArray[name].push(childData[key]) : messageArray[name] = [childData[key]];    
    }
  });
});

// var url = require('url');
//////////////////////////////////////REDIS////////////

  // var redis = require("redis"),
  //       client = redis.createClient();

  //   client.set("foo_rand000000000000", "some fantastic value!!!!!!!!!");
  //   client.get("foo_rand000000000000", function (err, reply) {
  //     console.log(err);
  //       console.log(reply.toString());
  //   });
  //   client.end();
//////////////////////////////////////REDIS////////////



app.configure(function() {
  app.use(express.static(__dirname + '/client/'));
});

app.use(express.logger());

app.all('*', function(req, res, next){
  // if (!req.get('Origin')) return next();
  // use "*" here to accept any origin
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");
  res.set('Access-Control-Allow-Headers', "content-type, accept");
  res.set('Access-Control-Allow-Max-Age', 10);
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});

app.get('/', function(request, response) {
  response.sendfile('/client/index.html');
});

// ?limit=200&order=-createAt

app.get('/1/classes/messages/:room', function(request, response) {
  var limit = url.parse(request.url, true).query[limit] || '';
  var order = url.parse(request.url, true).query[order] || '';
  response.end(JSON.stringify(messageArray[request.params.room] || []));
});

app.post('/1/classes/messages', function(request, response) {
  var postData = '';
  request.addListener('data', function(chunk) {
    postData += chunk;
  });
  request.addListener('end', function() {
    var content = JSON.parse(postData);
    content.createdAt = new Date().toString();
    if (messageArray[content.roomname] === undefined) {
      messageArray[content.roomname] = [];
    }
    messageArray[content.roomname].push(content);
    messagesStore.child(content.roomname).push(content);
    response.end();
  });
});

app.get('/1/classes/roomList', function(request, response) {
  response.end(JSON.stringify(roomList));
});

server.listen(port, function() {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

// response.writeHead(404, "Not found", {'Content-Type': 'text/html'});
// response.end('<html><head><title>404 - Not found</title></head><body><h1>Not found.</h1></body></html>');
// console.log("[404] " + request.method + " to " + request.url);
