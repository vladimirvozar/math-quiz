var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var data = require('./public/js/quizData.js');
var _ = require('underscore');

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    socket.emit('join-game', {
        user: data.createUser(),
        onlineCount: data.getOnlineCount(),
        round: data.getRound()
    });

    socket.on('leave', function (obj) {
        var users = data.removeUser(obj.id);
        
        // update status message on all clients
        io.emit('updateOnlineCount', {
            onlineCount: data.getUsers().length
        });
    });

    socket.on('answer', function (ans) {
        // 1. if correctly answered, increase users score
        // 2. send 'confirmed' event to user that sent the answer
        // 3. send 'closeRound' to all
        if (data.getRound().result == ans.answer) {
            var user = _.findWhere(data.getUsers(), { id: ans.userId });
            user.score++;

            socket.emit('correct', {
                answer: ans.answer,
                score: user.score
            });

            // socket.broadcast.emit  <- send to everybody, except the person who answered
            // io.emit  <- send to every single person, including sender
            io.emit('closeRound', {
                newRound: data.newRound()
            });
        }
        // 1. if wrong answer sent, send 'wrong' event to user that sent the answer
        else {
            socket.emit('wrong', {
                answer: ans.answer
            });
        }
    });
});

http.listen(PORT, function () {
    console.log('Server started...');
});

