function updateStatusMessage(score, onlineCount) {
    if (onlineCount == 1) {
        jQuery('#status_message').text('Your score is ' + score + '. ' +
            'You are only user currently online');
    } else {
        jQuery('#status_message').text('Your score is ' + score + '. ' +
            'There are ' + onlineCount + ' users currently online');
    }
}

function appendRound(round) {

    var table = document.getElementById('table');
    var rowCount = table.rows.length;
    var newRow = table.insertRow();

    // Create 'Round' cell
    var cellRound = newRow.insertCell(0);
    var cellRoundNumber = document.createTextNode(round.num);
    cellRound.appendChild(cellRoundNumber);

    // Create 'Expression' cell
    var cellExpression = newRow.insertCell(1);
    var cellExpressionText = document.createTextNode(round.expression);
    cellExpression.appendChild(cellExpressionText);

    // Create 'Yes' and 'No' buttons inside cell
    var cellYourAnswer = newRow.insertCell(2);
    var btnYes = document.createElement('input');
    btnYes.type = 'button';
    btnYes.className = 'btn';
    btnYes.value = 'Yes';
    btnYes.onclick = function () { };
    cellYourAnswer.appendChild(btnYes);

    var btnNo = document.createElement('input');
    btnNo.type = 'button';
    btnNo.className = 'btn';
    btnNo.value = 'No';
    btnNo.onclick = function () { };
    cellYourAnswer.appendChild(btnNo);

    // Create 'Result' (empty) cell
    var cellResult = newRow.insertCell(3);
}
