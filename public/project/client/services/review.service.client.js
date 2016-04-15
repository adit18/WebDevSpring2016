(function(){
    angular
        .module("FoodQuotientApp")
        .factory("ReviewService", reviewService);

    function reviewService($http) {
        var api = {
            createReview: createReview,
            updateReviewById : updateReviewById,
            deleteReviewById : deleteReviewById,
            findUserReviewsByYelpId: findUserReviewsByYelpId,
            findUserReviewsByUserId: findUserReviewsByUserId,
            findFollowingReviews: findFollowingReviews
        };
        return api;

        function findUserReviewsByYelpId (yelpID) {
            return $http.get("/service/review/place/"+yelpID+"/byplace");
        }

        function findUserReviewsByUserId (userID) {
            return $http.get("/service/review/place/"+userID+"/byuser");
        }

        function findFollowingReviews (userID) {
            return $http.get("/service/review/following/"+userID);
        }

        function createReview(userId, foodplace) {
            return $http.post("/service/review/user/"+userId+"/food/"+foodplace.id,foodplace);
        }

        function updateReviewById(reviewId, review)
        {
            return $http.put("/service/review/update/"+reviewId, review);
        }

        function deleteReviewById(reviewId)
        {
            return $http.delete("/service/review/delete/"+reviewId);
        }
    }
})();