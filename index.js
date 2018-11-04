var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//PUBLIC Files
app.get('/chat', function(req, res){
  res.sendFile(__dirname + '/public/');
});
app.get('/chat.css', function(req, res){
  res.sendFile(__dirname + '/public/chat.css');
});

//SOCKET.IO INFO
io.on('connection', function(socket){
  console.log('User Connected');

  socket.on('chat message', function(msgObj){
   //console.log(msgObj);
   io.emit('chat message', msgObj);
  });

  socket.on('disconnect', function(){
    console.log('User Disconnected');
  });

  socket.on('typing', function(data){
    //console.log(data + ' is typing...');
    io.emit('typing', data);
  });

});

//Start Listening for requests
http.listen(3000, function(){
  console.log('listening on port 3000');
});
