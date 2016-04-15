// load q promise library
var q = require("q");

module.exports = function(db, mongoose) {

    // load user schema
    var FoodSchema = require("./foodplace.schema.server.js")(mongoose);

    // create user model from schema
    var FoodModel = mongoose.model('Food', FoodSchema);

    var foodPlaces = [];
    var api = {
        findPlaceByYelpID: findPlaceByYelpID,
        findPlacesByYelpIDs: findPlacesByYelpIDs,
        createFoodPlace: createFoodPlace,
        addReviewFoodPlace : addReviewFoodPlace,
        updateReviewByID : updateReviewByID,
        deleteReviewById: deleteReviewById
    };
    return api;

    function findPlacesByYelpIDs (yelpIDs) {
        var deferred = q.defer();

        FoodModel
            .find({yelpID: {$in: yelpIDs}},
                function (err, places) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(places);
                    }
                });
        return deferred.promise;
    }

    function findPlaceByYelpID(yelpID) {
        var deferred = q.defer();

        FoodModel
            .findOne({yelpID: yelpID},
                function (err, place) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        console.log("In findPlaceByYelpID food model: "+JSON.stringify(place));
                        deferred.resolve(place);
                    }
                });
        return deferred.promise;
    }

    function createFoodPlace(place) {
        var deferred = q.defer();

        var placeObj = {
            //_id: "ID_" + (new Date()).getTime(),
            yelpID: place.id,
            poster: place.image_url,
            title: place.name,
            reviews: [],
            categories: place.categories
        };

        FoodModel.create(placeObj, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                console.log("Place created!");
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function addReviewFoodPlace(inpPlace,user) {
        var deferred = q.defer();
        console.log("Came to addReview first");
        //var place = {};
        //findPlaceByYelpID(inpPlace.id)
        //    .then(
        //        function ( placeRecd ) {
        //            console.log("Came to addReview then");
        //            console.log("Place received!");
        //            place = placeRecd;
        //        },
        //        function ( err ) {
        //            console.log("Came to addReview then errpart");
        //            place = null;
        //            console.log("Error! ");
        //            //deferred.reject(err);
        //        }
        //    );
        //
        //if(!place) {
        //    createFoodPlace(inpPlace)
        //        .then(
        //            function ( placeRecd ) {
        //                console.log("Place received after creation!");
        //                place = placeRecd;
        //            },
        //            function ( err ) {
        //                deferred.reject(err);
        //            }
        //        );
        //}

        FoodModel.findOne({yelpID: inpPlace.id},
            function(err, foodplace) {
                if (err) {
                    console.log("Are u here?");
                    deferred.reject(err);
                }
                else {
                    console.log("Are u here2?");
                    var revObj = {};
                    revObj.userID = user._id;
                    revObj.username = user.username;
                    revObj.yelpID = inpPlace.id;
                    revObj.placeName = inpPlace.name;
                    revObj.placePoster = inpPlace.image_url;
                    revObj.comment = inpPlace.buffer;
                    revObj.ratval = inpPlace.ratval;
                    console.log("Inside food addRev: "+ revObj);
                    foodplace.reviews.push(revObj);
                    foodplace.save(function (err, updPlace) {
                        if (err) {
                            deferred.reject(err);
                        }
                        else {
                            console.log("FOodPlace revs: "+JSON.stringify(updPlace.reviews));
                            deferred.resolve(updPlace);
                        }
                    });
                }
            });
        return deferred.promise;
    }

    function updateReviewByID(reviewId,review) {
        var deferred = q.defer();

        FoodModel
            .find({yelpID: review.yelpID},
                function (err, place) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        var reviewLocal = place.reviews.id(reviewId);
                        reviewLocal.userID = review.userID;
                        reviewLocal.username = review.username;
                        reviewLocal.yelpID = review.yelpID;
                        reviewLocal.placeName = review.placeName;
                        reviewLocal.placePoster = review.placePoster;
                        reviewLocal.comment = review.comment;
                        reviewLocal.ratval = review.ratval;
                        place.save(function (err, updPlace) {
                            if (err) {
                                deferred.reject(err);
                            }
                            else {
                                deferred.resolve(updPlace.reviews.id(reviewId));
                            }
                        });
                    }
                });
        return deferred.promise;
    }

    function deleteReviewById(reviewId,yelpID) {
        var deferred = q.defer();
        FoodModel
            .find({yelpID: yelpID},
                function(err, form) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        place.reviews.id(reviewId).remove();
                        place.save(function (err, updPlace) {
                            if (err) {
                                deferred.reject(err);
                            }
                            else {
                                deferred.resolve(updPlace);
                            }
                        });
                    }
                });
        return deferred.promise;
    }
}