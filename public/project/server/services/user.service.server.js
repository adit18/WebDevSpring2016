module.exports = function(app, foodModel, userModel) {
    app.post("/service/user/login", login);
    app.get("/service/user/loggedin", loggedin);
    app.post("/service/user/logout", logout);
    app.post("/service/user/register", register);
    app.get("/service/user/profile/:userId", profile);
    app.post("/service/user/updateprofile", updateProfile);
    app.get("/service/user/deleteprofile/:userId", deleteProfile);
    app.get("/service/user/self/:selfId/follow/:toFollowUserId", followUser);
    app.get("/service/user/self/:selfId/unfollow/:toFollowUserId", unfollowUser);
    app.get("/service/user/following/:userId", getFollowing);
    app.get("/service/user/followers/:userId", getFollowers);

    function profile(req, res) {
        var userId = req.params.userId;

        userModel.findUserById(userId)
            .then(
                // retrieve the user by user id
                function (user) {
                    res.json(user);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                });
        //var yelpIDs = user.likes;
        //var places = foodModel.findPlacesByYelpIDs(yelpIDs);
        //console.log("Retrieved reviewPlaces: "+places);
        //user.likesPlaces = places;
        //res.json(user);
    }

    function updateProfile(req, res) {
        var user = req.body;
        userModel.updateUser(user)
            .then(
                function (user) {
                    console.log("Came till user server proj");
                    req.session.currentUser = user;
                    res.json(user);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteProfile(req, res) {
        var userId = req.params.userId;
        console.log("To delete serv: "+userId);
        userModel.deleteUserById(userId)
            .then(
                function (users) {
                    req.session.destroy();
                    res.json(users);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            )
    }

    function followUser(req, res) {
        var selfId = req.params.selfId;
        var toFollowUserId = req.params.toFollowUserId;

        //var follower = userModel.findUserById(selfId);
        //var master = userModel.findUserById(toFollowUserId);

        userModel.addFollowing(selfId,toFollowUserId)
            .then(
                function ( user ) {
                    console.log("Added following in user server");
                    //res.json(user);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
        userModel.addFollower(toFollowUserId,selfId)
            .then(
                function ( user ) {
                    console.log("Added follower in user server");
                    res.json(user);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );

        //res.json(updMaster);
        //res.send(200);
    }

    function unfollowUser(req, res) {
        var selfId = req.params.selfId;
        var toFollowUserId = req.params.toFollowUserId;

        //var follower = userModel.findUserById(selfId);
        //var master = userModel.findUserById(toFollowUserId);

        userModel.stopFollowing(selfId,toFollowUserId)
            .then(
                function ( user ) {
                    console.log("Stopped following in user server");
                    //res.json(user);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
        userModel.removeFollower(toFollowUserId,selfId)
            .then(
                function ( user ) {
                    console.log("Removed follower in user server");
                    res.json(user);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );



        //res.json(updMaster);
        //res.send(200);
    }

    function getFollowing(req, res) {
        var userId = req.params.userId;
        var user;

        userModel.findUserById(userId)
            .then(
                function ( userRecd ) {
                    user = userRecd;
                    userModel.findUsersByIds(userRecd.following)
                        .then(
                            function ( followingUsers ) {
                                console.log("Retrieved following ");
                                res.json(followingUsers);
                            },
                            function ( err ) {
                                res.status(400).send(err);
                            }
                        );
                },
                function ( err ) {
                    console.log("User not found");
                    res.status(400).send(err);
                }
            );

        //if(user) {
        //    var followingIDs = user.following;
        //
        //    userModel.findUsersByIds(followingIDs)
        //        .then(
        //            function ( followingUsers ) {
        //                console.log("Retrieved following ");
        //                res.json(followingUsers);
        //            },
        //            function ( err ) {
        //                res.status(400).send(err);
        //            }
        //        );
        //}
        //else {
        //    res.send(null);
        //}
    }

    function getFollowers(req, res) {
        var userId = req.params.userId;
        var user;
        userModel.findUserById(userId)
            .then(
                function ( userRecd ) {
                    console.log("Server part1");
                    user = userRecd;
                    userModel.findUsersByIds(userRecd.followers)
                        .then(
                            function ( followersUsers ) {
                                console.log("Server part2");
                                console.log("Retrieved followers ");
                                res.json(followersUsers);
                            },
                            function ( err ) {
                                res.status(400).send(err);
                            }
                        );
                },
                function ( err ) {
                    //console.log("User not found");
                    res.status(400).send(err);
                }
            );
        //if(user){
        //    var followersIDs = user.followers;
        //    console.log("Server part2");
        //    userModel.findUsersByIds(followersIDs)
        //        .then(
        //            function ( followersUsers ) {
        //                console.log("Retrieved followers ");
        //                res.json(followersUsers);
        //            },
        //            function ( err ) {
        //                res.status(400).send(err);
        //            }
        //        );
        //}
        //else {
        //    res.send(null);
        //}
    }


    function register(req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(
                function ( doc ) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function login(req, res) {
        var credentials = req.body;
        console.log("Calling cred");
        var user = userModel.findUserByCredentials(credentials)
            .then(
                function (user) {
                    if(user){
                        console.log("User "+user.username+" loggd in");
                    }
                    req.session.currentUser = user;
                    res.json(user);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            )
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }
}