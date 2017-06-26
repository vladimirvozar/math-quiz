var socket = io();
var id;
var score;
var round;
var onlineCount;

socket.on('connect', function () {
    console.log('Connected to server...');
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
    updateRoundInTable(data.answer, 'OK');
});

socket.on('wrong', function (data) {
    updateRoundInTable(data.answer, 'FAILED');
});

socket.on('closeRound', function () {
    closeRoundInTable();
});

// function sends answer as '{ userID, answer }' object when clicked on YES/NO button
function sendAnswer(e) {
    // get element that triggered event (<button>)
    var event = e || window.event;
    var target = event.target || event.srcElement;

    if (target.value == 'Yes') {
        socket.emit('answer', {
            userId: id,
            answer: 'Yes'
        });
    } else {
        socket.emit('answer', {
            userId: id,
            answer: 'No'
        });
    }


}
