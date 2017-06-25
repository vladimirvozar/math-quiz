var socket = io();
var id;
var score;
var onlineCount;

// event handlers
socket.on('connect', function(){
    console.log('Connected to socket.io server');
});

socket.on('join-game', function(data){
    id = data.user.id;
    score = data.user.score;
    onlineCount = data.onlineCount;
    updateStatusMessage(score, onlineCount);
});

// functions
function updateStatusMessage(score, onlineCount){
    if(onlineCount == 1) {
        jQuery('#status_message').text('Your score is ' + score + '. ' + 'You are only user currently online');
    } else {
        jQuery('#status_message').text('Your score is ' + score + '. ' + 'There are ' + onlineCount + ' users currently online');
    }
}
