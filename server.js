var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var data = require('./public/js/quizData.js');

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    socket.emit('join-game', {
        user: data.createUser(),
        onlineCount: data.getOnlineCount(),
        round: data.getRound()
    });
});

http.listen(PORT, function () {
    console.log('Server started...');
});

