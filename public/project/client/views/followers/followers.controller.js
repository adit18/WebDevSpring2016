(function() {
    angular
        .module("FoodQuotientApp")
        .controller("FollowersController",FollowersController);

    function FollowersController($scope,$rootScope,$location,UserService,ReviewService) {

        //event handlers declarations
        $scope.logout = logout;
        $scope.searchRedirect = searchRedirect;
        $scope.followersflag = false;

        if($rootScope.currentUser) {
            console.log("FOLLOWERS BASE!");
            UserService
                .getFollowers()
                .then(function (response) {
                    console.log("REALLY Got followers ");
                    $scope.followersProfiles = response.data;
                    console.log(JSON.stringify($scope.followersProfiles));
                });
        }

        function init() {
            $scope.$location = $location;
        }
        init();

        function logout() {
            UserService
                .logout()
                .then(function() {
                    UserService.setCurrentUser(null);
                    $location.url("/");
                })
        }

        function searchRedirect() {
            if($scope.searchTxt){
                var searcholdTerm = $scope.searchTxt;
                searchTerm = searcholdTerm.replace(/ /g, "+");
                console.log("SearchText: "+ searchTerm);
                $location.url("/search/"+searchTerm);
            }
            else{
                alert("Please enter a search term!");
            }

        }
    }
})();