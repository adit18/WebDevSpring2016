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
                //console.log(vm.profile);
            });


        //event handlers declarations
        $scope.update = update;

        //event handler definitions
        function update(user){
            console.log("Sending "+user.username);
            var user_id = $scope.currentUser._id;
            UserService.
                updateUser(user_id,user)
                .then(function(response){
                    console.log("Updated "+user.username);
                });
        }
    }
})();