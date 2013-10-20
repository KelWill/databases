var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database: 'chatterbox'
});

// connection.connect();
//TODO read more about whether or not connection.connect is necessary?
console.log("I'M CONNECTED");
module.exports.post = function(data){
  data = JSON.parse(data);
  usernameQuery(data);
};

module.exports.getMessages = function(response, roomname){
  var messages = [];
  connection.query('SELECT username, text, roomname FROM messages INNER JOIN roomname ON roomname.id = messages.id_roomname INNER JOIN users ON messages.id_user = users.id WHERE roomname = ?;', [roomname], function(error, results, fields){
    if (results){
      for (var i = 0; i < results.length; i++) {
        messages.push(results[i]);
      }
      response.end(JSON.stringify(messages));
    }
  });
};

var usernameQuery = function(data){
  connection.query('SELECT id FROM users WHERE username = ?;', [data.username], function(error, result){
    if (!result || result.length === 0){ makeNewUser(data); }
    else {
      id_user = result[0].id;
      roomnameQuery(data, id_user);
    }
  });
};

var makeNewUser = function(data) {
    connection.query('INSERT INTO users (username) VALUES (?);', [data.username], function(error, result){
      roomnameQuery(data, result.insertId);  //maybe turn roomname into a callback so that we could create a user without sending a message?
    });
};

var roomnameQuery = function(data, id_user){
  //pass id_user;
  connection.query('SELECT id FROM roomname WHERE roomname = ?;', [data.roomname], function(error, result){
    if (!result || result.length === 0){ makeNewRoom(data, id_user); }
    else {
      id_roomname = result[0].id;
      postQuery(data, id_user, id_roomname);  //maybe do the same with this one? 
    }
  });
};

var makeNewRoom = function(data, id_user) {
    connection.query('INSERT INTO roomname (roomname) VALUES (?);', [data.roomname], function(error, result){
      postQuery(data, id_user, result.insertId);
    });
};

var postQuery = function(data, id_user, id_roomname){
  connection.query('INSERT INTO messages (id_user, text, id_roomname) VALUES (?, ?, ?);', [id_user, data.text, id_roomname], function(error, info){
  });
};



