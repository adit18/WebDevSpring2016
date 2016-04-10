module.exports = function(app, foodModel, userModel) {
    app.post("/service/food/user/:userId/food/:yelpID", userReviewsPlace);
    app.get("/service/food/place/:yelpID/user", findUserReviews);
    app.put("/service/food/review/:reviewId", updateReviewInFood);
    app.post("/service/food/place/deletereview", deleteReviewInFood);

    function findUserReviews (req, res) {
        var yelpID = req.params.yelpID;
        console.log(yelpID);
        var place = foodModel.findPlaceByYelpID(yelpID);
        console.log("Place obj: ");
        console.log(place);
        //if(place) {
        //    reviewersIDs = [];
        //    for(rev in place.reviews){
        //        //reviewersIDs.push(rev.userID);
        //    }
        //    //console.log(reviewersIDs);
        //    //var users = userModel.findUsersByIds(reviewersIDs);
        //    //place.reviewers = users; //Objects
        //}
        res.send(place);
    }

    function userReviewsPlace(req, res) {
        var placeYelp  = req.body;
        var userId = req.params.userId;
        var yelpID = req.params.yelpID;

        //var place = foodModel.findPlaceByYelpID(yelpID);
        //if(!place) {
        //    place = foodModel.createFoodPlace(placeYelp);
        //}

        //console.log("Place recd at server: ");
        //console.log(placeYelp);

        var tempUser = userModel.findUserById(userId);

        var pushedReview = foodModel.addReviewFoodPlace(placeYelp, tempUser);

        console.log("Pushed review: "+pushedReview._id);

        var user = userModel.addReviewToUser(userId,pushedReview);

        //var user = userModel.findUserById(userId);
        //if(!user.reviews) {
        //    user.reviews = [];
        //}
        //
        //user.reviews.push(pushedReview);

        res.send(200);
    }

    function updateReviewInFood (req, res) {
        var revId = req.params.reviewId;
        var review = req.body;
        var updReview = foodModel.updateReviewByID(revId, review);
        var userReview = userModel.updateUserReviewByID(revId, review);
        res.send(updReview);
    }

    function deleteReviewInFood (req, res) {
        var allRevs = [];
        var review = req.body;
        allRevs = foodModel.deleteReviewById(review._id,review.yelpID);
        var allUserRevs = userModel.deleteUserReviewById(review._id,review.userID);
        res.send(allRevs);
    }
}