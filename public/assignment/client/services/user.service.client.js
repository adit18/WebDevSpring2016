(function()
{
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService($http, $rootScope)
    {
        var service = {
            login: login,
            findUserByIDAdmin: findUserByIDAdmin,
            findUserByCredentials : findUserByCredentials,
            findUserByUsername : findUserByUsername,
            findAllUsers : findAllUsers,
            findAllUsersByAdmin: findAllUsersByAdmin,
            createUser : createUser,
            createUserByAdmin: createUserByAdmin,
            logout: logout,
            deleteUserById : deleteUserById,
            deleteUserByIdAdmin : deleteUserByIdAdmin,
            updateUser : updateUser,
            updateUserByAdmin : updateUserByAdmin,
            setCurrentUser : setCurrentUser,
            getCurrentUser : getCurrentUser
        };

        return service;

        function login(user)
        {
            return $http.post("/api/assignment/login", user);
        }

        function findUserByIDAdmin (userId)
        {
            return $http.get("/api/assignment/admin/user/"+userId);
        }

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

        function findAllUsersByAdmin()
        {
            return $http.get("/api/assignment/admin/user");
        }

        function createUser(user)
        {
            return $http.post("/api/assignment/user", user);
        }

        function createUserByAdmin(user)
        {
            return $http.post("/api/assignment/admin/user", user);
        }

        function logout() {
            return $http.post("/api/assignment/logout");
        }

        function deleteUserById(userId)
        {
            return $http.delete("/api/assignment/user/"+userId);
        }

        function deleteUserByIdAdmin(userId)
        {
            return $http.delete("/api/assignment/admin/user/"+userId);
        }

        function updateUser(userId, user)
        {
            console.log("In client service : "+userId);
            return $http.put("/api/assignment/user/"+userId, user);
        }

        function updateUserByAdmin(userId, user)
        {
            console.log("In admin client service : "+userId);
            return $http.put("/api/assignment/admin/user/"+userId, user);
        }

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $http.get("/api/assignment/loggedin");
            //return $rootScope.currentUser;
        }
    }
})();