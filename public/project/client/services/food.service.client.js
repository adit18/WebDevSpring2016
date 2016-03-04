(function(){
    angular
        .module("FoodQuotientApp")
        .factory("FoodService", foodService);

    function foodService($http) {
        var api = {
            userLikesFood: userLikesFood,
            findUserLikes: findUserLikes
        };
        return api;

        function findUserLikes (yelpID) {
            return $http.get("/service/food/place/"+yelpID+"/user");
        }

        function userLikesFood(userId, foodplace) {
            return $http.post("/service/food/user/"+userId+"/food/"+foodplace.id,foodplace);
        }
    }
})();