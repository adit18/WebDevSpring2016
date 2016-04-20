(function() {
    angular
        .module("FoodQuotientApp")
        .controller("HomeController",HomeController);

    function HomeController($scope,$rootScope,$location,UserService,ReviewService) {
        //var vm = this;

        //event handlers declarations
        $scope.logout = logout;
        $scope.searchRedirect = searchRedirect;
        $scope.followersflag = false;

        if($rootScope.currentUser) {
            console.log("HOME BASE!");
            UserService
                .getFollowing()
                .then(function (response) {
                    console.log("Got following ");
                    $scope.followingProfiles = response.data;
                    console.log($scope.followingProfiles);
                });
            UserService
                .getFollowers()
                .then(function (response) {
                    console.log("REALLY Got followers ");
                    $scope.followersProfiles = response.data;
                    console.log(JSON.stringify($scope.followersProfiles));
                });

            ReviewService
                .findFollowingReviews($rootScope.currentUser._id)
                .then(function (response) {
                    console.log("Got following reviews");
                    //$scope.followingReviews = response.data;
                    //console.log($scope.followingReviews);
                    var unsortedRevs = response.data;
                    unsortedRevs.sort(compareMilli);
                    $scope.followingReviews = unsortedRevs.reverse();
                });
        }

        function compareMilli(a,b) {
            var amil = moment(a.updated).valueOf();
            var bmil = moment(b.updated).valueOf();
            if(amil < bmil) return -1;
            if(amil > bmil) return 1;
            return 0;
        }

        function init() {
            $scope.$location = $location;
            $('.carousel').carousel({
                interval: 5000
            });


            //$('.nav a').on('click', function(){
            //    $('.btn-navbar').click(); //bootstrap 2.x
            //    $('.navbar-toggle').click() //bootstrap 3.x by Richard
            //});

            $("a[href='#top']").click(function() {
                $("html, body").animate({ scrollTop: 0 }, "slow");
                return false;
            });

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
                var searcholdLoc = $scope.searchLoc;
                if(!searcholdLoc){
                    searcholdLoc = "Boston,MA";
                }
                searchTerm = searcholdTerm.replace(/ /g, "+");
                console.log("SearchText: "+ searchTerm);
                console.log("SearchLoc: "+ searcholdLoc);
                $location.url("/search/"+searchTerm+"/location/"+searcholdLoc);
            }
            else{
                alert("Please enter a search term!");
            }

        }
    }
})();