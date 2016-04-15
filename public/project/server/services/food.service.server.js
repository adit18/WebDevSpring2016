module.exports = function(app, foodModel, userModel) {
    app.post("/service/food/user/:userId/food/:yelpID", userReviewsPlace);
    app.get("/service/food/place/:yelpID/user", findUserReviews);
    app.put("/service/food/review/:reviewId", updateReviewInFood);
    app.post("/service/food/place/deletereview", deleteReviewInFood);

    function findUserReviews (req, res) {
        var yelpID = req.params.yelpID;
        console.log("Food Server: "+yelpID);
        //var place = {};
        foodModel.findPlaceByYelpID(yelpID)
            .then(
                function ( placeRecd ) {
                    if(!placeRecd) {
                        console.log("Place received at server! reviews ignore: ");
                        //console.log(placeRecd);
                        res.json(placeRecd);
                    }
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
        //if(place) {
        //    reviewersIDs = [];
        //    for(rev in place.reviews){
        //        //reviewersIDs.push(rev.userID);
        //    }
        //    //console.log(reviewersIDs);
        //    //var users = userModel.findUsersByIds(reviewersIDs);
        //    //place.reviewers = users; //Objects
        //}
        //res.send(place);
    }

    function userReviewsPlace(req, res) {
        var placeYelp  = req.body;
        var userId = req.params.userId;
        var yelpID = req.params.yelpID;

        var tempUser;
        //userModel.findUserById(userId)
        //    .then(
        //        function (user) {
        //            console.log("Got user, now to add review!");
        //            tempUser = user;
        //            return user;
        //        },
        //        function (err) {
        //            console.log("Couldnot get user before addReview");
        //            res.status(400).send(err);
        //        })
        //    .then( function(recdUser){

        foodModel.findPlaceByYelpID(placeYelp.id)
            .then(
                function ( placeRecd ) {
                    console.log("1 Place received!: ");
                    console.log(placeRecd);
                    return placeRecd;
                },
                function ( err ) {
                    return null;
                    //create place
                })
            .then(
                function(recdPlace) {
                    if(recdPlace == null){
                        foodModel.createFoodPlace(placeYelp)
                            .then(
                                function (place) {
                                    console.log("2 Place received after creation!");
                                    return place;
                                },
                                function (err) {
                                    console.log("3 Could not create place in food model!");
                                    res.status(400).send(err);
                                })
                            .then(
                                function(localPlace) {
                                    userModel.findUserById(userId)
                                        .then(
                                            function (user) {
                                                console.log("4 Got user, now to add review!");
                                                foodModel.addReviewFoodPlace(placeYelp, user)
                                                    .then(
                                                        function (place) {
                                                            //res.json(user);
                                                            return place.reviews[place.reviews.length - 1];
                                                            //console.log("push: "+ JSON.stringify(pushedReview));
                                                            //return pushedReview;
                                                        },
                                                        function (err) {
                                                            console.log("5 Could not add review to food model!");
                                                            res.status(400).send(err);
                                                        });
                                            },
                                            function (err) {
                                                console.log("6 Couldnot get user before addReview");
                                                res.status(400).send(err);
                                            }
                                        )
                                        .then(
                                            function(review){
                                            return review;
                                        },
                                            function(err){
                                                console.log("20 Could not add review to food model!");
                                                res.status(400).send(err);
                                        });


                                },
                                function (err) {
                                    console.log("7 Could not create place in food model!");
                                    res.status(400).send(err);
                                }
                            );
                    }
                    else {
                        userModel.findUserById(userId)
                            .then(
                                function (user) {
                                    console.log("8 Got user, now to add review!");
                                    foodModel.addReviewFoodPlace(placeYelp, user)
                                        .then(
                                            function (place) {
                                                //res.json(user);
                                                var pushedReview = place.reviews[place.reviews.length - 1];
                                                console.log( "pushedRev"+ pushedReview);
                                                return pushedReview;
                                            },
                                            function (err) {
                                                console.log("9 Could not add review to food model!");
                                                res.status(400).send(err);
                                            })
                                        .then(
                                            function(review){
                                                console.log("10 Shaata: "+review);
                                                return review;
                                            },
                                            function(err){
                                                console.log("11 Could not add review to food model!");
                                                res.status(400).send(err);
                                            });

                                },
                                function (err) {
                                    console.log("10 Couldnot get user before addReview");
                                    res.status(400).send(err);
                                }
                            )
                            .then(
                                function(review){
                                    console.log("12 new Shaata: "+review);
                                    return review;
                                },
                                function(err){
                                    console.log("13 Could not add review to food model!");
                                    res.status(400).send(err);
                                });
                        //console.log("test  ++++++++++++",test);

                    }
                },
                function(err) {
                    console.log("12 Couldnot get user before addReview2");
                    res.status(400).send(err);
                });
        //        }).then(function(review){
        //            console.log("Review is "+review);
        //
        //},function(err){
        //    console.log("error");
        //    res.status(400).send(err);
        //});
            //.then(
            //    function (pReview){
            //        console.log("pRev: "+JSON.stringify(pReview));
            //        userModel.addReviewToUser(userId,pReview)
            //            .then(
            //                function (user) {
            //                    var pushedReviewLoc = user.reviews[place.reviews.length - 1];
            //                    console.log("13 Review pushed to usermodel: "+pushedReviewLoc._id);
            //                    res.send(200);
            //                },
            //                function (err) {
            //                    console.log("14 Could not add review to user model!");
            //                    res.status(400).send(err);
            //                });
            //    },
            //    function(err) {
            //        console.log("15 Couldnot get user before addReview2");
            //        res.status(400).send(err);
            //    }
            //);


        console.log("End: Pushed review to foodmodel");
    }

    function updateReviewInFood (req, res) {
        //var revId = req.params.reviewId;
        var review = req.body;
        var revId = review._id;
        var updReview;
        foodModel.updateReviewByID(revId, review)
            .then(
                function (review) {
                    updReview = review;
                },
                function (err) {
                    console.log("Could not update review to food model!");
                    res.status(400).send(err);
                });
        var userReview;
        userModel.updateUserReviewByID(revId, review)
            .then(
                function (review) {
                    userReview = review;
                    res.send(updReview);
                },
                function (err) {
                    console.log("Could not update review to user model!");
                    res.status(400).send(err);
                });
        //res.send(updReview);
    }

    function deleteReviewInFood (req, res) {
        var allRevs = [];
        var review = req.body;
        var foodUpdPlace;
        foodModel.deleteReviewById(review._id,review.yelpID)
            .then(
                function ( updPlace ) {
                    console.log("Deleted review in food model!");
                    foodUpdPlace = updPlace;
                    //res.json(updPlace);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
        var allUserRevs;
        userModel.deleteUserReviewById(review._id,review.userID)
            .then(
                function ( updPlace ) {
                    console.log("Deleted review in user model!");
                    res.json(updPlace);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
        //res.send(allRevs);
    }
}