(function(){
    angular
        .module("FoodQuotientApp")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams,$scope,$rootScope,$location,FoodService,YelpService) {
        //var vm = this;
        var bizID = $routeParams.bizID;
        var currentUser = $rootScope.currentUser;
        $scope.favorite = favorite;
        $scope.getStarCount = function(num) {
            return new Array(num);
        };

        function init() {
            YelpService.searchBizYelp(bizID, function (response){

                console.log(response);
                $scope.starCount = parseInt(response.rating);
                var img_temp = response.image_url.split("/");
                img_temp.splice(-1,1,"o.jpg");
                var trans = img_temp.join("/");
                response.image_large = trans;
                console.log(trans);
                $scope.data = response;
                $scope.$apply();
            });

            FoodService
                .findUserReviews (bizID)
                .then(function(response){
                    $scope.place = response.data;

                });
        }
        init();

        function favorite(place) {
            console.log("Buffer: "+place.buffer);
            if(currentUser) {
                FoodService
                    .userReviewsFood(currentUser._id, place);
            } else {
                $location.url("/login");
            }
        }
    }
})();