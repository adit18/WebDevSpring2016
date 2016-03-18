(function()
{
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService($http, $rootScope)
    {
        var service = {
            findUserByCredentials : findUserByCredentials,
            findUserByUsername : findUserByUsername,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser,
            setCurrentUser : setCurrentUser,
            getCurrentUser : getCurrentUser
        };

        return service;

        function findUserByCredentials(tempCred)
        {
            return $http.get("/api/assignment/user?username="+tempCred.username+"&password="+tempCred.password);
        }

        function findUserByUsername (username)
        {
            return $http.get("/api/assignment/user?username="+username);
        }

        function findAllUsers()
        {
            return $http.get("/api/assignment/user");
        }

        function createUser(user)
        {
            return $http.post("/api/assignment/user", user);
        }

        function deleteUserById(userId)
        {
            return $http.delete("/api/assignment/user/"+userId);
        }

        function updateUser(userId, user)
        {
            return $http.put("/api/assignment/user/"+userId, user);
        }

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }
    }
})();