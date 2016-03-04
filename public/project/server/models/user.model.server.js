var mock = require("./user.mock.json");
module.exports = function() {
    var service = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        updateUser: updateUser,
        deleteUserById : deleteUserById,
        findUserById: findUserById,
        findUsersByIds: findUsersByIds
    };
    return service;

    function findUsersByIds (userIds) {
        var users = [];
        for (var u in userIds) {
            var user = findUserById (userIds[u]);
            if (user) {
                users.push (user);
            }
        }
        return users;
    }

    function findUserById(userId) {
        for(var u in mock) {
            if( mock[u]._id === userId ) {
                return mock[u];
            }
        }
        return null;
    }

    function createUser(user) {
        user._id = "ID_" + (new Date()).getTime();
        mock.push(user);
        return user;
    }

    function updateUser(user) {
        for(var u in mock) {
            if( mock[u]._id === user._id ) {
                mock.splice(u,1,user);
                return mock[u];
            }
        }
        return null;
    }

    function deleteUserById(userId) {
        for(var u in mock) {
            if( mock[u]._id === userId ) {
                var deluser = mock[u].username;
                mock.splice(u,1);
                return deluser;
                //return mock[u];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        for(var u in mock) {
            if( mock[u].username === credentials.username &&
                mock[u].password === credentials.password) {
                return mock[u];
            }
        }
        return null;
    }
}