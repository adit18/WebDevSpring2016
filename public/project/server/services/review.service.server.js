module.exports = function(app, foodModel, userModel, reviewModel) {
    app.post("/service/review/user/:userId/food/:yelpID", createReview);
    app.get("/service/review/place/:yelpID/byplace", findUserReviewsByYelpId);
    app.get("/service/review/place/:userID/byuser", findUserReviewsByUserId);
    app.get("/service/review/following/:userID", findFollowingReviews);
    app.put("/service/review/update/:reviewId", updateReview);
    app.delete("/service/review/delete/:reviewId", deleteReview);

    function createReview(req, res) {
        var placeYelp  = req.body;
        var userId = req.params.userId;
        var yelpID = req.params.yelpID;

        var revObj = {};
        revObj.userID = userId;
        revObj.username = req.session.currentUser.username;
        revObj.yelpID = placeYelp.id;
        revObj.placeName = placeYelp.name;
        revObj.placePoster = placeYelp.image_url;
        revObj.comment = placeYelp.buffer;
        revObj.ratval = placeYelp.ratval;
        revObj.categories = placeYelp.categories;
        reviewModel.createReview(revObj)
            .then(
                function ( doc ) {
                    console.log("Review created!");
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserReviewsByYelpId (req, res) {
        var yelpID = req.params.yelpID;
        console.log("Finding user reviews by place in Review Server: "+yelpID);
        reviewModel.findReviewsByYelpId(yelpID)
            .then(
                function ( reviews ) {
                    console.log("Got reviews for place in Review server");
                    res.json(reviews);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserReviewsByUserId (req, res) {
        var userID = req.params.userID;
        console.log("Finding user reviews by user in Review Server: "+userID);
        reviewModel.findReviewsByUserId(userID)
            .then(
                function ( reviews ) {
                    console.log("Got reviews for user in Review server");
                    res.json(reviews);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function findFollowingReviews (req, res) {
        var userID = req.params.userID;
        //user._id = $rootScope.currentUser._id;
        userModel.findUserById(userID)
            .then(
                function ( userRecd ) {
                    console.log("Finding following reviews by user in Review Server: "+userID);
                    console.log("Following IDs: "+ userRecd.following);
                    reviewModel.findReviewsByUserIds(userRecd.following)
                        .then(
                            function ( followingReviews ) {
                                console.log("Got following reviews for user in Review server");
                                res.json(followingReviews);
                            },
                            function ( err ) {
                                res.status(400).send(err);
                            }
                        );
                },
                function ( err ) {
                    console.log("User not found in revSer");
                    res.status(400).send(err);
                }
            );

    }

    function updateReview (req, res) {
        //var revId = req.params.reviewId;
        var review = req.body;
        var revId = review._id;
        reviewModel.updateReviewByID(revId, review)
            .then(
                function (updReview) {
                    res.send(updReview);
                },
                function (err) {
                    console.log("Could not update review to model!");
                    res.status(400).send(err);
                });
    }
        //var userReview;
        //userModel.updateUserReviewByID(revId, review)
        //    .then(
        //        function (review) {
        //            userReview = review;
        //            res.send(updReview);
        //        },
        //        function (err) {
        //            console.log("Could not update review to user model!");
        //            res.status(400).send(err);
        //        });
        ////res.send(updReview);

    function deleteReview (req, res) {
        var allRevs = [];
        var reviewId = req.params.reviewId;
        reviewModel.deleteReviewById(reviewId)
            .then(
                function ( review ) {
                    console.log("Deleted review in model!");
                    res.json(review);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }
}