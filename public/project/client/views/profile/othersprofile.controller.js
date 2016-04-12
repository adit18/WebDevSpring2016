(function() {
    angular
        .module("FoodQuotientApp")
        .controller("OthersprofileController",OthersprofileController);

    function OthersprofileController($scope,$rootScope,$location,$routeParams,UserService) {
        //var vm = this;

        var reqUserId = $routeParams.userId;
        var currentUser = $rootScope.currentUser;

        //event handlers declarations
        $scope.startFollow = startFollow;
        //$scope.deleteProfile = deleteProfile;

        function init() {
            $scope.$location = $location;
            UserService
                .getOthersProfile(reqUserId)
                .then(function (response) {
                    $scope.profile = response.data;
                    console.log($scope.profile);
                });
        }
        init();

        //vm.currentUser = UserService.getCurrentUser();

        //event handler definitions
        function startFollow(){
            console.log("Foll Start");
            if(currentUser) {
                UserService
                    .startFollow(reqUserId)
                    .then(function (response) {
                        console.log("Followed ");
                        $scope.profile = response.data;
                        //UserService
                        //    .getOthersProfile(reqUserId)
                        //    .then(function (response) {
                        //        $scope.profile = response.data;
                        //        console.log($scope.profile);
                        //    });
                    });
            } else {
                $location.url("/login");
            }
        }

        function update(user){
            UserService
                .updateProfile(user)
                .then(function (response) {
                    $scope.profile = response.data;
                    console.log("Updated "+response.data.username);
                    //console.log(vm.profile);
                });
        }

        function deleteProfile(){
            UserService
                .deleteProfile()
                .then(function (response) {
                    console.log("Deleted User:"+response);
                    //console.log(vm.profile);
                });
            UserService
                .logout()
                .then(function() {
                    UserService.setCurrentUser(null);
                    $location.url("/");
                })
        }
    }
})();