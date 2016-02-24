(function()
{
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService()
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
            updateUser : updateUser
        };

        return service;

        function findUserByCredentials(username, password, callback)
        {
            var i;
            for(i = 0; i < users.length; i++){
                if(users[i].username == username) {
                    if (users[i].password == password) {
                        callback(username);
                    }
                    else
                        callback();
                }
            }
            callback();
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
            var i;
            for(i = 0; i < users.length; i++){
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
            var i;
            for(i = 0; i < users.length; i++){
                if(users[i].username == userId) {
                    var index = users.indexOf(userId);
                    if(index != -1){
                        users.splice(index,1,user);
                    }
                }
            }
            callback(user);
        }
    }
})();