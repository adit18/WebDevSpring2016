(function() {
    angular
        .module("FoodQuotientApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope,$rootScope,$location,UserService){

        $scope.currentUser = UserService.getCurrentUser();


        //event handlers declarations
        $scope.update = update;

        //event handler delarations
        function update(user){
            console.log("Sending "+user.username);
            var user_id = $rootScope.currentUser._id;
            UserService.updateUser(user_id,user,function(user){
                console.log("Updated "+user.username);
            });
        }
    }
})();