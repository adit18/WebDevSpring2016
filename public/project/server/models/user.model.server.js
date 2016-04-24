
// load q promise library
var q = require("q");
//var bcrypt = require("bcrypt-nodejs");

module.exports = function(db, mongoose) {

    // load user schema
    var projUserSchema = require("./projuser.schema.server.js")(mongoose);

    // create user model from schema
    var UserModel = mongoose.model('projUser', projUserSchema);

    var service = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        updateUser: updateUser,
        deleteUserById : deleteUserById,
        findUserById: findUserById,
        findUsersByIds: findUsersByIds,
        addReviewToUser: addReviewToUser,
        addReviewCount: addReviewCount,
        removeReviewCount: removeReviewCount,
        updateUserReviewByID: updateUserReviewByID,
        deleteUserReviewById: deleteUserReviewById,
        addFollowing: addFollowing,
        addFollower: addFollower,
        stopFollowing: stopFollowing,
        removeFollower: removeFollower
    };
    return service;

    function findUsersByIds (userIds) {
        var deferred = q.defer();

        UserModel
            .find({_id: {$in: userIds}},
                function (err, users) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(users);
                    }
                });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();

        UserModel
            .findById(userId,
                function (err, user) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        console.log("User found: "+JSON.stringify(user));
                        deferred.resolve(user);
                    }
                });
        return deferred.promise;
    }

    function createUser(user) {
        var deferred = q.defer();
        //userObj.password = bcrypt.hashSync(userObj.password);
        UserModel.findOne( { username: user.username },
            function(err, doc) {
                if (doc) {
                    //deferred.reject(err);
                    console.log("value found: "+doc);
                    deferred.resolve(null);
                } else {
                    UserModel.create(user, function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }

            });
        return deferred.promise;
    }

    function updateUser(userObj) {
        var deferred = q.defer();

        var userId = userObj._id;
        console.log("Inside before update : "+userId);

        UserModel
            .findById(userId,
                function (err, user) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        console.log("Inside Update User: ");
                        console.log(JSON.stringify(user));
                        user.username = userObj.username;
                        user.firstName = userObj.firstName;
                        user.lastName = userObj.lastName;
                        user.email = userObj.email;
                        user.gender = userObj.gender;
                        user.aboutMe = userObj.aboutMe;
                        user.location = userObj.location;
                        user.contact = userObj.contact;
                        user.profile_img = userObj.profile_img;
                        if(userObj.password != ""){
                            user.password = userObj.password;
                        }
                        user.save(function (err, updUser) {
                            if (err) {
                                deferred.reject(err);
                            }
                            else {
                                deferred.resolve(updUser);
                            }
                        });
                        console.log("Resolved!");
                    }
                }
            );
        return deferred.promise;
    }

    function deleteUserById(userId) {
        var deferred = q.defer();
        console.log("To delete: "+userId);
        UserModel.remove(
            {_id: userId},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    console.log("Deleted user from model!")
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        console.log("Cred called");
        var deferred = q.defer();
        //var res = bcrypt.compareSync(credentials.password, doc.password);
        UserModel.findOne( { username: credentials.username, password: credentials.password },
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }

    function addReviewToUser(userId,review) {
        var deferred = q.defer();

        UserModel.findById(userId,
            function(err, user) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    var revObj = {};
                    revObj._id = review._id;
                    revObj.userID = review.userID;
                    revObj.username = review.username;
                    revObj.yelpID = review.yelpID;
                    revObj.placeName = review.placeName;
                    revObj.placePoster = review.placePoster;
                    revObj.comment = review.comment;
                    revObj.ratval = review.ratval;
                    user.reviews.push(revObj);
                    user.save(function (err, updUser) {
                        if (err) {
                            deferred.reject(err);
                        }
                        else {
                            deferred.resolve(updUser);
                        }
                    });
                }
            });
        return deferred.promise;
    }

    function addReviewCount(userId,yelp) {
        var deferred = q.defer();

        UserModel.findById(userId,
            function(err, user) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    user.reviews.push(yelp);
                    user.save(function (err, updUser) {
                        if (err) {
                            deferred.reject(err);
                        }
                        else {
                            deferred.resolve(updUser);
                        }
                    });
                }
            });
        return deferred.promise;
    }

    function removeReviewCount(userId) {
        var deferred = q.defer();

        UserModel.findById(userId,
            function(err, user) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    user.reviews.pop();
                    user.save(function (err, updUser) {
                        if (err) {
                            deferred.reject(err);
                        }
                        else {
                            deferred.resolve(updUser);
                        }
                    });
                }
            });
        return deferred.promise;
    }

    function updateUserReviewByID(reviewId,review) {
        var deferred = q.defer();
        var userId = review.userID;
        UserModel
            .findById(userId,
                function(err, user) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        var reviewLocal = user.reviews.id(reviewId);
                        reviewLocal.userID = review.userID;
                        reviewLocal.username = review.username;
                        reviewLocal.yelpID = review.yelpID;
                        reviewLocal.placeName = review.placeName;
                        reviewLocal.placePoster = review.placePoster;
                        reviewLocal.comment = review.comment;
                        reviewLocal.ratval = review.ratval;
                        user.save(function (err, updUser) {
                            if (err) {
                                deferred.reject(err);
                            }
                            else {
                                deferred.resolve(updUser.reviews.id(reviewId));
                            }
                        });
                    }
                });
        return deferred.promise;
    }

    function deleteUserReviewById(reviewId,userID) {
        var deferred = q.defer();
        UserModel
            .findById(userID,
                function(err, user) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        user.reviews.id(reviewId).remove();
                        user.save(function (err, updUser) {
                            if (err) {
                                deferred.reject(err);
                            }
                            else {
                                deferred.resolve(updUser);
                            }
                        });
                    }
                });
        return deferred.promise;
    }

    function addFollowing(selfId,toFollowUserId){
        var deferred = q.defer();
        UserModel
            .findById(selfId,
                function(err, user) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        var followingLocal = user.following;
                        followingLocal.push(toFollowUserId);
                        user.save(function (err, updUser) {
                            if (err) {
                                deferred.reject(err);
                            }
                            else {
                                console.log("Following push!");
                                deferred.resolve(updUser);
                            }
                        });
                    }
                });
        return deferred.promise;
    }

    function addFollower(selfId,FollowerUserId){
        var deferred = q.defer();
        UserModel
            .findById(selfId,
                function(err, user) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        var followersLocal = user.followers;
                        followersLocal.push(FollowerUserId);
                        user.save(function (err, updUser) {
                            if (err) {
                                deferred.reject(err);
                            }
                            else {
                                console.log("Follower push!");
                                deferred.resolve(updUser);
                            }
                        });
                    }
                });
        return deferred.promise;
    }

    function stopFollowing(selfId,toFollowUserId){
        var deferred = q.defer();
        UserModel
            .findById(selfId,
                function(err, user) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        var followingLocal = user.following;
                        for(var f in followingLocal){
                            if(followingLocal[f] == toFollowUserId){
                                followingLocal.splice(f,1);
                            }
                        }
                        user.save(function (err, updUser) {
                            if (err) {
                                deferred.reject(err);
                            }
                            else {
                                console.log("Following removed!");
                                deferred.resolve(updUser);
                            }
                        });
                    }
                });
        return deferred.promise;
    }

    function removeFollower(selfId,toFollowUserId){
        var deferred = q.defer();
        UserModel
            .findById(selfId,
                function(err, user) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        var followersLocal = user.followers;
                        for(var f in followersLocal){
                            if(followersLocal[f] == toFollowUserId){
                                followersLocal.splice(f,1);
                            }
                        }
                        user.save(function (err, updUser) {
                            if (err) {
                                deferred.reject(err);
                            }
                            else {
                                console.log("Follower removed!");
                                deferred.resolve(updUser);
                            }
                        });
                    }
                });
        return deferred.promise;
    }

}