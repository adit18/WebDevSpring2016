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
        $scope.stopFollow = stopFollow;
        //$scope.follFlag = false;

        function init() {
            $scope.$location = $location;
            UserService
                .getOthersProfile(reqUserId)
                .then(function (response) {
                    $scope.profile = response.data;
                    console.log($scope.profile);
                    var followers = response.data.followers;
                    console.log("Called");
                    for(var f in followers){
                        console.log("Running");
                        if(followers[f] == currentUser._id){
                            $scope.follFlag = true;
                            console.log("Flag set: "+$scope.follFlag)
                        }
                    }
                });

        }
        init();

        //vm.currentUser = UserService.getCurrentUser();

        //event handler definitions
        function startFollow(){
            console.log("Foll Start");
            console.log("Flag: "+$scope.follFlag);
            if(currentUser) {
                UserService
                    .startFollow(reqUserId)
                    .then(function (response) {
                        console.log("Followed ");
                        $scope.profile = response.data;
                        $scope.follFlag = true;
                        console.log("Flag: "+$scope.follFlag);
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

        function stopFollow(){
            console.log("Foll Stop");
            if(currentUser) {
                UserService
                    .stopFollow(reqUserId)
                    .then(function (response) {
                        console.log("Unfollowed ");
                        $scope.profile = response.data;
                        $scope.follFlag = false;
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