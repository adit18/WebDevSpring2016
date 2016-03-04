(function()
{
    angular
        .module("FoodQuotientApp")
        .factory("UserService", userService);

    function userService($http, $rootScope)
    {
        var service = {
            login: login,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            register: register,
            logout: logout,
            getProfile: getProfile,
            updateProfile: updateProfile,
            deleteProfile: deleteProfile
        };

        return service;

        function getProfile() {
            //$rootScope.currentUser
            return $http.get("/service/user/profile/"+$rootScope.currentUser._id);
        }

        function updateProfile(user) {
            user._id = $rootScope.currentUser._id;
            return $http.post("/service/user/updateprofile", user);
        }

        function deleteProfile() {
            return $http.get("/service/user/deleteprofile/"+$rootScope.currentUser._id);
        }

        function register(user) {
            return $http.post("/service/user/register", user);
        }

        function logout() {
            return $http.post("/service/user/logout");
        }

        function getCurrentUser() {
            return $http.get("/service/user/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function login(credentials) {
            return $http.post("/service/user/login", credentials);
        }
    }
})();