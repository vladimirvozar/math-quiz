var UID = 1;
var roundNum = 0;

var users = [];

function User (id){
    this.id = id;
    this.score = 0;
}

module.exports = {
    createUser: function(){
        var user = new User(UID, 0);
        UID++;
        users.push(user);
        return user;
    },
    getOnlineCount: function() {
        return users.length;
    }
};
