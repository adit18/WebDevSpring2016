module.exports = function(app, foodModel, userModel) {
    app.post("/service/food/user/:userId/food/:yelpID", userReviewsPlace);
    app.get("/service/food/place/:yelpID/user", findUserReviews);

    function findUserReviews (req, res) {
        var yelpID = req.params.yelpID;
        console.log(yelpID);
        var place = foodModel.findPlaceByYelpID(yelpID);
        if(place) {
            var userLikesIDs = place.reviews;
            console.log(userLikesIDs);
            //var users = userModel.findUsersByIds(userLikesIDs);
            //place.userLikes = users; //Objects
        }
        res.send(place);
    }

    function userReviewsPlace(req, res) {
        var placeYelp  = req.body;
        var userId = req.params.userId;
        var yelpID = req.params.yelpID;
        var place = foodModel.findPlaceByYelpID(yelpID);
        if(!place) {
            place = foodModel.createFoodPlace(placeYelp);
        }

        var review = {};
        review.userID = userId;
        review.yelpID = yelpID;
        review.comment = placeYelp.buffer;
        //review.ratval = placeYelp.ratval;

        if(!place.reviews) {
            place.reviews = [];
        }
        place.reviews.push(review);

        var user = userModel.findUserById(userId);
        if(!user.reviews) {
            user.reviews = [];
        }

        user.reviews.push(review);

        //if(!user.likesPlaces) {
        //    user.likesPlaces = [];
        //}
        //user.likesPlaces.push(place);

        //console.log("This: "+user);
        //console.log(place);
        res.send(200);
    }
}