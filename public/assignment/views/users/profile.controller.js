(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope,$rootScope,$location,UserService){

        var userLoc = {};
        userLoc = $rootScope.user;
        $scope.user = {};
        $scope.user.username = $rootScope.user.username;
        $scope.user.password = $rootScope.user.password;
        $scope.user.email = $rootScope.user.email;


        //event handlers declarations
        $scope.update = update;

        //event handler delarations
        function update(user){
            console.log("Sending "+user.username);
            var user_id = $rootScope.user._id;
            UserService.updateUser(user_id,user,function(user){
                console.log("Updated "+user.username);
            });
        }
    }
})();