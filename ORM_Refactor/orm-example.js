/* You'll need to
 * npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require("sequelize");
var sequelize = new Sequelize("chatterbox_try", "root", null,{
  host: "localhost", dialect: 'mysql'});
/*  this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var User = sequelize.define('users', {
  username: Sequelize.STRING
});
var Messages = sequelize.define('messages', {
  text: Sequelize.STRING
});
var Roomname = sequelize.define('roomnames', {
  roomname: Sequelize.STRING
});
Messages.belongsTo(User);
User.hasMany(Messages);
Messages.belongsTo(Roomname);
Roomname.hasMany(Messages);

var insertMessage = function(text, username, roomname) {
  var id_user = lookupID('users', username);  // TODO Make this nested
  var id_roomname = lookupID('roomname', roomname);
  var newMessage = Messages.build({userId: id_user, roomnameId: id_roomname, text: text});
  newMessage.save().success(function(){
    console.log("message successfully saved");
    console.log('congratulations');
  });
};

var lookupID = function(tableName, name) {  //refactor to make better later
  if (tableName === 'users'){
    User.find({where: {username: name}}, function(user){
      return user.id;
    });
  }
  if (tableName === 'roomname'){
    Roomname.find({where: {roomname: name}}, function(roomname){
      return roomname.id;
    });
  }
};


/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
User.sync().success(function() {
  /* This callback function is called once sync succeeds. */

  // now instantiate an object and save it:
  var newUser = User.build({username: "Jean Valjean"});
  newUser.save().success(function() {
    console.log("SCCSSFLLY SVD JN VLJN");
    /* This callback function is called once saving succeeds. */

    // Retrieve objects from the database:
    User.findAll({ where: {username: "Jean Valjean"} }).success(function(users) {
      // This function is called back with an array of matches.
      for (var i = 0; i < users.length; i++) {
        console.log(users[i].username + " exists");
      }
    });
  });
});
Messages.sync().success(function() {
  /* This callback function is called once sync succeeds. */

  // now instantiate an object and save it:
  var newUser = Messages.build({text: "heyhalsdflkj", roomnameId: 1, userId: 2});
  newUser.save().success(function() {
    console.log("SCCSSFLLY SMESSSAGED");
    /* This callback function is called once saving succeeds. */

    // Retrieve objects from the database:
    Messages.findAll({ where: {text: "heyhalsdflkj"} }).success(function(users) {
      // This function is called back with an array of matches.
      for (var i = 0; i < users.length; i++) {
        console.log(users[i].text + " exists");
      }
    });
  });
});
Roomname.sync().success(function() {
  /* This callback function is called once sync succeeds. */

  // now instantiate an object and save it:
  var newUser = Roomname.build({roomname: "Jean"});
  newUser.save().success(function() {
    console.log("SCCSSFLLY SzkTOIJN");
    /* This callback function is called once saving succeeds. */

    // Retrieve objects from the database:
    Roomname.findAll({ where: {roomname: "Jean"} }).success(function(users) {
      // This function is called back with an array of matches.
      for (var i = 0; i < users.length; i++) {
        console.log(users[i].roomname + " exists");
      }
    });
  });
});

Messages.findAll({ where: {roomnameId: 1} }).success(function(message){
  console.log('is it logging?',message[0].text);
});
