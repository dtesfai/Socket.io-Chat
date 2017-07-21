var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var online = [];
var users = {};

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
  app.use(express.static(__dirname + '/'));
});


io.on('connection', function(socket){

  socket.on('connection', function(){
    // Generating a random username
    var user = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for( var i=0; i < 3; i++ )
        user += possible.charAt(Math.floor(Math.random() * possible.length));

    users[socket.id] = user;

    socket.emit('user', users[socket.id])

    socket.broadcast.emit('message', users[socket.id] + ' connected');

    online.push(users[socket.id]);
    io.emit('online', online);
  });

  socket.on('disconnect', function(){
    socket.broadcast.emit('message', users[socket.id] + ' disconnected');

    var index = online.indexOf(users[socket.id]);
    online.splice(index, 1);
    
    io.emit('online', online);
  });

  socket.on('chat message', function(msg){
    socket.broadcast.emit('message', msg);
  });

  socket.on('typing', function(){
    socket.broadcast.emit('typing', users[socket.id] + ' is typing');
  });

  socket.on('not typing', function(){
    socket.broadcast.emit('not typing');
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});