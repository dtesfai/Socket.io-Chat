// (function() {

//   // Generating a random username
//   var user = "";
//   var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

//   for( var i=0; i < 3; i++ )
//       user += possible.charAt(Math.floor(Math.random() * possible.length));

//   // creating io socket
//   var socket = io();

//   // letting others know that user connected, prints you connected to localhost
//   socket.emit('connection', user + ' connected');
//   $('#messages').append($('<li>').text("you connected"));

//   // runs when user is typing
//   $('#m').on('keydown', function(e){
//     if(e.keyCode != 13){
//       socket.emit('typing', user + "is typing")
//     }
//   });

//   var typingTimer;                //timer identifier
//   var doneTypingInterval = 2000;  //time in ms (5 seconds)
  
//   // check every 1/2 second if user still typing (WIP)
//   $('#m').keyup(function(){
//       clearTimeout(typingTimer);
//       if ($('#m').val()) {
//           typingTimer = setTimeout(socket.emit('not typing'), doneTypingInterval);
//       }
//   });

//   // when message sent, stored in variable and displayed to localhost screen, sent as chat message to 
//   $('form').submit(function(){
//     var msg = user + ": " + $('#m').val();
//     $('#messages').append($('<li>').text(msg));
//     socket.emit('chat message', msg);
//     $('#m').val('');
//     return false;
//   });

//   socket.on('message', function(msg){
//     $('#messages').append($('<li>').text(msg));
//   });

//   // want to show msg when typing, hide when not
//   socket.on('typing', function(msg){
//     $('#typing').text(msg);
//     $("#typing").show();
//     // $('#messages').append($('<p>').text(msg));
//   });

//   socket.on('not typing', function(msg){
//     $("#typing").hide();
//     // $('#typing').append($('<p>').text(msg));
//   });

// })();

function makeUL(array) {
    // Create the list element:
    var list = document.createElement('ul');

    for(var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(array[i]));

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}