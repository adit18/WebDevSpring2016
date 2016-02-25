(function()
{
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService($rootScope)
    {
        var users = [];
        users = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]		}
        ];

        var service = {
            findUserByCredentials : findUserByCredentials,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser,
            setCurrentUser : setCurrentUser,
            getCurrentUser : getCurrentUser
        };

        return service;

        function findUserByCredentials(username, password, callback)
        {
            for(var u in users){
                if(users[u].username == username) {
                    if (users[u].password == password) {
                        callback(users[u]);
                        return;
                    }
                    else
                        callback(null);
                }
            }
            callback(null);
        }

        function findAllUsers(callback)
        {
            callback(users);
        }

        function createUser(user, callback)
        {
            user._id = (new Date).getTime();
            users.push(user);
            callback(user);
        }

        function deleteUserById(userId, callback)
        {
            for(var i in users){
                if(users[i].username == userId) {
                    var index = users.indexOf(userId);
                    if(index != -1){
                        users.splice(index,1);
                    }
                }
            }
            callback(users);
        }

        function updateUser(userId, user, callback)
        {
            for(var i in users){
                if(users[i].username == userId) {
                    var index = users.indexOf(userId);
                    if(index != -1){
                        users.splice(index,1,user);
                    }
                }
            }
            callback(users[i]);
        }

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }
    }
})();