var UID = 0;
var roundNum = 0;
var round;
var users = [];

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
    // generate round by some algorithm
    roundNum++;
    return new Round(roundNum, '1+2=3', 'Yes');
}
