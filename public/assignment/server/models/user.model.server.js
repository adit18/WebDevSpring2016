var mock = require("./user.mock.json");
module.exports = function() {
    var service = {
        createUser : createUser,
        findAllUsers : findAllUsers,
        findUserById : findUserById,
        findUserByUsername : findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUserByID : updateUserByID,
        deleteUserById : deleteUserById,
        setCurrentUser : setCurrentUser,
        getCurrentUser : getCurrentUser
    };
    return service;

    function createUser(user) {
        user._id = "ID_" + (new Date()).getTime();
        mock.push(user);
        return mock;
    }

    function findAllUsers() {
        return mock;
    }

    function findUserById(userId) {
        for(var m in mock) {
            if(mock[m]._id == userId) {
                return mock[m];
            }
        }
        return null;
    }

    function findUserByUsername(username) {
        for(var m in mock) {
            if(mock[m].username == username) {
                return mock[m];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        for(var u in mock) {
            if( mock[u].username == credentials.username &&
                mock[u].password == credentials.password) {
                return mock[u];
            }
        }
        return null;
    }

    function updateUserByID(userId,user) {
        for(var u in mock) {
            if( mock[u]._id == userId ) {
                mock.splice(u,1,user);
                return mock;
            }
        }
        return null;
    }

    function deleteUserById(userId) {
        for(var u in mock) {
            if( mock[u]._id == userId ) {
                var deluser = mock[u].username;
                mock.splice(u,1);
                return mock;
                //return mock[u];
            }
        }
        return null;
    }

    function setCurrentUser (user) {
        $rootScope.currentUser = user;
    }

    function getCurrentUser () {
        return $rootScope.currentUser;
    }
}