(function(){
    angular
        .module("FoodQuotientApp")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams,$scope,$rootScope,$location,FoodService,YelpService) {
        //var vm = this;
        var bizID = $routeParams.bizID;
        var currentUser = $rootScope.currentUser;

        //Event Declarations
        $scope.addReview = addReview;
        $scope.selectReview = selectReview;
        $scope.updateReview = updateReview;
        $scope.deleteReview = deleteReview;

        $scope.updFlag = false;
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

        //Event Definitions
        function addReview(place) {
            console.log("Buffer: "+place.buffer);
            //place.buffer = $scope.data.buffer;
            place.ratval = $scope.rate;
            console.log("Rating: "+place.ratval);
            if(currentUser) {
                FoodService
                    .userReviewsFood(currentUser._id, place)
                    .then(function(response){
                        console.log("Review added");
                        FoodService
                            .findUserReviews (bizID)
                            .then(function(response){
                                $scope.place = response.data;
                                $scope.data.buffer = null;
                            });
                    });
                $scope.rate = 3;
            } else {
                $location.url("/login");
            }

        }

        function selectReview(review){
            $rootScope.currentReview = review;
            $scope.rate = review.ratval;
            $scope.data.buffer = review.comment;
            $scope.updFlag = true;
            console.log("Editing "+ review._id);
        }

        function updateReview(){
            var tempReview = $rootScope.currentReview ;
            tempReview.ratval = $scope.rate;
            tempReview.comment = $scope.data.buffer;
            console.log("Updating "+$rootScope.currentReview._id);
            FoodService
                .updateReviewById($rootScope.currentReview._id, tempReview)
                .then(function (response) {
                    console.log("Review updated "+ response.data._id);
                    FoodService
                        .findUserReviews (bizID)
                        .then(function(response){
                            $scope.place = response.data;
                            $scope.data.buffer = null;
                            $scope.updFlag = false;
                        });
                });

            //Update user reviews
        }

        function deleteReview(review){
            //var tempReview = $rootScope.currentReview ;
            console.log("Deleting "+review._id);
            FoodService
                .deleteReviewById(review)
                .then(function (response) {
                    console.log("Review deleted: "+review._id);
                    FoodService
                        .findUserReviews (bizID)
                        .then(function(response){
                            $scope.place = response.data;
                            $scope.data.buffer = null;
                        });
                });

            //Update user reviews
        }
    }
})();