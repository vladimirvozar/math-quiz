var UID = 0;
var roundNum = 0;
var round;
var users = [];
var expressions = [{q: '1+2=3', a: 'Yes'},
    {q: '3+4=12', a: 'No'},
    {q: '12/5=7', a: 'No'},
    {q: '10*7=50', a: 'No'},
    {q: '10-7=3', a: 'Yes'},
    {q: '14+12=26', a: 'Yes'},
    {q: '1*7=20', a: 'No'},
    {q: '16+9=25', a: 'Yes'},
    {q: '18/6=3', a: 'Yes'},
    {q: '2+12=14', a: 'Yes'}];

function User(id) {
    this.id = id;
    this.score = 0;
}

function Round(num, expression, result) {
    this.num = num;
    this.expression = expression;
    this.result = result
}

module.exports = {
    createUser: function () {
        UID++;
        var user = new User(UID, 0);
        users.push(user);
        return user;
    },
    getOnlineCount: function () {
        return users.length;
    },
    getRound: function () {
        if (typeof round === 'undefined')
            round = generateRound();
        return round;
    },
    getUsers: function () {
        return users;
    },
    removeUser: function (userId) {
        for (var i = users.length - 1; i >= 0; i--) {
            if (users[i].id == userId) users.splice(i, 1);
        }
    },
    newRound: function () {
        round = generateRound();
        return round;
    }
};

function generateRound() {
    // TODO: generate round by some algorithm
    roundNum++;
    var expression =  expressions[Math.floor(Math.random() * expressions.length)];
    return new Round(roundNum, expression.q, expression.a);
}
