var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var user = require("./user");

var online = [];

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
  app.use(express.static(__dirname + '/public'));
});

app.get('/user.js', function(req, res) {
  res.sendFile(__dirname + '/user.js');
});


io.on('connection', function(socket){

  socket.on('connection', function(msg, user){
    socket.broadcast.emit('message', msg);

    online.push(user);
    io.emit('online', online);
  });

  socket.on('disconnect', function(){
    socket.broadcast.emit('message', 'user disconnected');

    // need to display username in message that user disconnected 
    // also remove from online list
    
    // io.emit('offline', user);
  });

  socket.on('chat message', function(msg){
    socket.broadcast.emit('message', msg);
  });

  socket.on('typing', function(msg){
    socket.broadcast.emit('typing', msg);
  });

  socket.on('not typing', function(){
    socket.broadcast.emit('not typing');
  });

});


http.listen(3000, function(){
  console.log('listening on *:3000');
});