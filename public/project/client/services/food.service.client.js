(function(){
    angular
        .module("FoodQuotientApp")
        .factory("FoodService", foodService);

    function foodService($http) {
        var api = {
            userReviewsFood: userReviewsFood,
            findUserReviews: findUserReviews
        };
        return api;

        function findUserReviews (yelpID) {
            return $http.get("/service/food/place/"+yelpID+"/user");
        }

        function userReviewsFood(userId, foodplace) {
            return $http.post("/service/food/user/"+userId+"/food/"+foodplace.id,foodplace);
        }
    }
})();