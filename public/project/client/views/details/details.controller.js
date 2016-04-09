(function(){
    angular
        .module("FoodQuotientApp")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams,$scope,$rootScope,$location,FoodService,YelpService) {
        //var vm = this;
        var bizID = $routeParams.bizID;
        var currentUser = $rootScope.currentUser;
        $scope.addReview = addReview;

        //Rating
        $scope.rate = 3;
        $scope.max = 5;
        $scope.isReadonly = false;

        $scope.hoveringOver = function(value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };

        //$scope.ratingStates = [
        //    {stateOn: 'glyphicon glyphicon-star', stateOff: 'glyphicon glyphicon-star-empty'}
        //];

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

        function addReview(place) {
            console.log("Buffer: "+place.buffer);
            place.ratval = $scope.rate;
            console.log("Rating: "+place.ratval);
            if(currentUser) {
                FoodService
                    .userReviewsFood(currentUser._id, place);
            } else {
                $location.url("/login");
            }
        }
    }
})();