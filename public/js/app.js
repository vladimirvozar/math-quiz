var socket = io();
var id;
var score;
var round;
var onlineCount;

socket.on('connect', function () {
    console.log('Connected to server...');

    window.onbeforeunload = leaveApp;
});

socket.on('join-game', function (data) {
    id = data.user.id;
    score = data.user.score;
    onlineCount = data.onlineCount;
    round = data.round;
    updateStatusMessage(score, onlineCount);
    appendRound(round);
});

socket.on('correct', function (data) {
    score = data.score;
    updateStatusMessage(score, onlineCount);
    updateRoundInTable(data.answer, OK);
});

socket.on('wrong', function (data) {
    updateRoundInTable(data.answer, FAILED);
});

socket.on('closeRound', function (data) {
    closeRoundInTable(data);
});

socket.on('updateOnlineCount', function (data) {
    updateOnlineCount(data.onlineCount);
});

// function sends answer as '{ userID, answer }' object when clicked on YES/NO button
function sendAnswer(e) {
    // get element that triggered event (<button>)
    var event = e || window.event;
    var target = event.target || event.srcElement;

    if (target.value == YES) {
        socket.emit('answer', {
            userId: id,
            answer: YES
        });
    } else {
        socket.emit('answer', {
            userId: id,
            answer: NO
        });
    }
}

function leaveApp () {
    socket.emit('leave', { 
        id: id
    });
}