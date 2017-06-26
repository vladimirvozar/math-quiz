var socket = io();
var id;
var score;
var round;
var onlineCount;

socket.on('connect', function () {
    console.log('Connected to socket.io server');
});

socket.on('join-game', function (data) {
    id = data.user.id;
    score = data.user.score;
    onlineCount = data.onlineCount;
    round = data.round;
    updateStatusMessage(score, onlineCount);
    appendRound(round);

    jQuery('.btnYes').on('click', function () {
        socket.emit('answer', {
            userId: id,
            answer: true
        });
    });

    jQuery('.btnNo').on('click', function () {
        socket.emit('answer', {
            userId: id,
            answer: false
        });
    });
});
