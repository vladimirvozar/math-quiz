const YES = 'Yes';
const NO = 'No';
const OK = 'OK';
const MISSED = 'MISSED';
const FAILED = 'FAILED';

function updateStatusMessage(score, onlineCount) {
    jQuery('#score').text(score); 
    jQuery('#noOfOnlineUsers').text(onlineCount);
}

function updateOnlineCount(num) {
    jQuery('#noOfOnlineUsers').text(num);
}

function updateRoundInTable(answer, result) {
    var table = document.getElementById('table');
    var rowCount = table.rows.length;
    var row = table.rows[rowCount - 1];

    // delete current 'Your Answer' cell (with Yes/No buttons)
    row.deleteCell(2);

    // create new 'Your answer' cell 
    var cellAnswer = row.insertCell(2);
    var cellAnswerText = document.createTextNode(answer);
    cellAnswer.appendChild(cellAnswerText);

    // create 'Result' cell
    var cellResult = row.cells[3];
    var cellResultText = document.createTextNode(result);
    cellResult.appendChild(cellResultText);
}

function closeRoundInTable(data) {
    var table = document.getElementById('table');
    var rowCount = table.rows.length;
    var row = table.rows[rowCount - 1];

    if (row.cells[3].innerText === '') {
        // delete current 'Your Answer' cell (with Yes/No buttons)
        row.deleteCell(2);

        // create new 'Your answer' cell 
        var cellAnswer = row.insertCell(2);
        var cellAnswerText = document.createTextNode(MISSED);
        cellAnswer.appendChild(cellAnswerText);

        // create 'Result' cell
        var cellResult = row.cells[3];
        var cellResultText = document.createTextNode(FAILED);
        cellResult.appendChild(cellResultText);
    }

    appendRound(data.newRound);
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
    btnYes.className = 'btn btnYes';
    btnYes.value = YES;
    btnYes.onclick = sendAnswer;
    cellYourAnswer.appendChild(btnYes);

    var btnNo = document.createElement('input');
    btnNo.type = 'button';
    btnNo.className = 'btn btnNo';
    btnNo.value = NO;
    btnNo.onclick = sendAnswer;
    cellYourAnswer.appendChild(btnNo);

    // Create 'Result' (empty) cell
    var cellResult = newRow.insertCell(3);
}
