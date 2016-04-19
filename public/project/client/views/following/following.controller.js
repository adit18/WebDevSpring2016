(function() {
    angular
        .module("FoodQuotientApp")
        .controller("FollowingController",FollowingController);

    function FollowingController($scope,$rootScope,$location,UserService,ReviewService) {

        //event handlers declarations
        $scope.logout = logout;
        $scope.searchRedirect = searchRedirect;
        $scope.followersflag = false;

        if($rootScope.currentUser) {
            console.log("FOLLOWING BASE!");
            UserService
                .getFollowing()
                .then(function (response) {
                    console.log("REALLY Got following ");
                    $scope.followingProfiles = response.data;
                    console.log(JSON.stringify($scope.followingProfiles));
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