module.exports = function(app, foodModel, userModel) {
    app.post("/service/food/user/:userId/food/:yelpID", userLikesPlace);
    app.get("/service/food/place/:yelpID/user", findUserLikes);

    function findUserLikes (req, res) {
        var yelpID = req.params.yelpID;
        console.log(yelpID);
        var place = foodModel.findPlaceByYelpID(yelpID);
        if(place) {
            var userLikesIDs = place.likes;
            console.log(userLikesIDs);
            var users = userModel.findUsersByIds(userLikesIDs);
            place.userLikes = users; //Objects
        }
        res.json(place);
    }

    function userLikesPlace(req, res) {
        var placeYelp  = req.body;
        var userId = req.params.userId;
        var yelpID = req.params.yelpID;
        var place = foodModel.findPlaceByYelpID(yelpID);
        if(!place) {
            place = foodModel.createFoodPlace(placeYelp);
        }
        if(!place.likes) {
            place.likes = [];
        }
        place.likes.push(userId);

        var user = userModel.findUserById(userId);
        if(!user.likes) {
            user.likes = [];
        }
        user.likes.push(yelpID);
        console.log(user);
        console.log(place);
        res.send(200);
    }
}