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
            getOthersProfile: getOthersProfile,
            updateProfile: updateProfile,
            deleteProfile: deleteProfile,
            startFollow: startFollow,
            getFollowing: getFollowing,
            getFollowers: getFollowers
        };

        return service;

        function getProfile() {
            //$rootScope.currentUser
            return $http.get("/service/user/profile/"+$rootScope.currentUser._id);
        }

        function getOthersProfile(userId) {
            //$rootScope.currentUser
            return $http.get("/service/user/profile/"+userId);
        }

        function updateProfile(user) {
            user._id = $rootScope.currentUser._id;
            return $http.post("/service/user/updateprofile", user);
        }

        function deleteProfile() {
            return $http.get("/service/user/deleteprofile/"+$rootScope.currentUser._id);
        }

        function startFollow(toFollowUserId) {
            //$rootScope.currentUser
            return $http.get("/service/user/self/"+$rootScope.currentUser._id+"/follow/"+toFollowUserId);
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
            console.log("Calling server")
            return $http.post("/service/user/login", credentials);
        }

        function getFollowing() {
            //$rootScope.currentUser
            return $http.get("/service/user/following/"+$rootScope.currentUser._id);
        }

        function getFollowers() {
            //$rootScope.currentUser
            return $http.get("/service/user/followers/"+$rootScope.currentUser._id);
        }
    }
})();