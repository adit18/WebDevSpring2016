// load q promise library
var q = require("q");

module.exports = function(db, mongoose) {

    // load user schema
    var ReviewSchema = require("./review.schema.server.js")(mongoose);

    // create user model from schema
    var ReviewModel = mongoose.model('Review', ReviewSchema);

    var reviewService = {
        createReview: createReview,
        updateReviewByID: updateReviewByID,
        deleteReviewById: deleteReviewById,
        findReviewById: findReviewById,
        findReviewsByIds: findReviewsByIds,
        findReviewsByYelpId: findReviewsByYelpId,
        findReviewsByUserId: findReviewsByUserId,
        findReviewsByUserIds: findReviewsByUserIds
    };
    return reviewService;

    function findReviewById(reviewId) {
        var deferred = q.defer();

        ReviewModel
            .findById(reviewId,
                function (err, review) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        console.log("Review: "+JSON.stringify(review));
                        deferred.resolve(review);
                    }
                });
        return deferred.promise;
    }

    function findReviewsByIds (reviewIds) {
        var deferred = q.defer();

        ReviewModel
            .find({_id: {$in: reviewIds}},
                function (err, reviews) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(reviews);
                    }
                });
        return deferred.promise;
    }

    function findReviewsByYelpId (yelpID) {
        var deferred = q.defer();

        ReviewModel
            .find({yelpID: yelpID},
                function (err, reviews) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(reviews);
                    }
                });
        return deferred.promise;
    }

    function findReviewsByUserId (userID) {
        var deferred = q.defer();

        ReviewModel
            .find({userID: userID},
                function (err, reviews) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(reviews);
                    }
                });
        return deferred.promise;
    }

    function findReviewsByUserIds (userIds) {
        var deferred = q.defer();

        ReviewModel
            .find({userID: {$in: userIds}},
                function (err, reviews) {
                    if (err) {
                        console.log("CALLED ERR!");
                        deferred.reject(err);
                    } else {
                        console.log("CALLED!");
                        deferred.resolve(reviews);
                    }
                });
        return deferred.promise;
    }

    function createReview(review) {
        var deferred = q.defer();
        ReviewModel
            .create(review, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateReviewByID(revId, reviewObj) {
        var deferred = q.defer();

        var reviewId = reviewObj._id;
        console.log("Inside before update : "+reviewId);

        ReviewModel
            .findById(reviewId,
                function (err, review) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        console.log("Inside Update Review: ");
                        console.log(JSON.stringify(review));
                        review.comment = reviewObj.comment;
                        review.ratval = reviewObj.ratval;
                        review.updated = reviewObj.updated;
                        review.save(function (err, updReview) {
                            if (err) {
                                deferred.reject(err);
                            }
                            else {
                                deferred.resolve(updReview);
                            }
                        });
                        console.log("Resolved!");
                    }
                }
            );
        return deferred.promise;
    }

    function deleteReviewById(reviewId) {
        var deferred = q.defer();
        ReviewModel.remove(
            {_id: reviewId},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }
}