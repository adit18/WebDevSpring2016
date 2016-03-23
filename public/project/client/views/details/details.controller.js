(function(){
    angular
        .module("FoodQuotientApp")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams,$scope,$rootScope,$location,FoodService,YelpService) {
        //var vm = this;
        var bizID = $routeParams.bizID;
        var currentUser = $rootScope.currentUser;
        $scope.favorite = favorite;

        function init() {
            YelpService.searchBizYelp(bizID, function (response){
                $scope.data = response;
                console.log(response);
                $scope.$apply();
            });

            FoodService
                .findUserLikes (bizID)
                .then(function(response){
                    $scope.place = response.data;

                });
        }
        init();

        function favorite(place) {
            if(currentUser) {
                FoodService
                    .userLikesFood(currentUser._id, place);
            } else {
                $location.url("/login");
            }
        }
    }
})();