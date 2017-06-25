var socket = io();
var ID;

socket.on('connect', function(){
    console.log('Connected to socket.io server');
});

socket.on('generateID', function(data){
    ID = data.userID;
});