(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope,$rootScope,$location,UserService){

        //$scope.currentUser = UserService.getCurrentUser();
        UserService
            .getCurrentUser()
            .then(function (response) {
                $scope.currentUser = response.data;
                $scope.currentUser.password = "";
                console.log("Profile Refresh: ");
                console.log(response.data);
            });


        //event handlers declarations
        $scope.update = update;

        //event handler definitions
        function update(user){
            var user_id = $scope.currentUser._id;
            console.log("Sending "+user.username+" ID: "+user_id);
            UserService.
                updateUser(user_id,user)
                .then(function(response){
                    $scope.currentUser = response.data;
                    $scope.currentUser.password = "";
                    console.log("Updated "+user.username);
                    console.log(response.data);
                });
        }
    }
})();