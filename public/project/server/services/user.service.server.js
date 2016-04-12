module.exports = function(app, foodModel, userModel) {
    app.post("/service/user/login", login);
    app.get("/service/user/loggedin", loggedin);
    app.post("/service/user/logout", logout);
    app.post("/service/user/register", register);
    app.get("/service/user/profile/:userId", profile);
    app.post("/service/user/updateprofile", updateProfile);
    app.get("/service/user/deleteprofile/:userId", deleteProfile);
    app.get("/service/user/self/:selfId/follow/:toFollowUserId", followUser);
    app.get("/service/user/following/:userId", getFollowing);
    app.get("/service/user/followers/:userId", getFollowers);

    function profile(req, res) {
        var userId = req.params.userId;
        var user = userModel.findUserById(userId);
        var yelpIDs = user.likes;
        var places = foodModel.findPlacesByYelpIDs(yelpIDs);
        console.log("Retrieved reviewPlaces: "+places);
        user.likesPlaces = places;
        res.json(user);
    }

    function updateProfile(req, res) {
        var user = req.body;
        user = userModel.updateUser(user);
        req.session.currentUser = user;
        res.json(user);
    }

    function deleteProfile(req, res) {
        var userId = req.params.userId;
        var del_username = userModel.deleteUserById(userId);
        //var yelpIDs = user.likes;
        //var movies = movieModel.findMoviesByImdbIDs(movieImdbIDs);
        //user.likesMovies = movies;
        res.send(del_username);
    }

    function followUser(req, res) {
        var selfId = req.params.selfId;
        var toFollowUserId = req.params.toFollowUserId;

        //var follower = userModel.findUserById(selfId);
        //var master = userModel.findUserById(toFollowUserId);

        var updFollower = userModel.addFollowing(selfId,toFollowUserId);
        var updMaster = userModel.addFollower(toFollowUserId,selfId);

        res.json(updMaster);
        //res.send(200);
    }

    function getFollowing(req, res) {
        var userId = req.params.userId;
        var user = userModel.findUserById(userId);
        if(user) {
            var followingIDs = user.following;

            var followingUsers = userModel.findUsersByIds(followingIDs);
            console.log("Retrieved following ");

            res.json(followingUsers);
        }
        else {
            res.send(null);
        }
    }

    function getFollowers(req, res) {
        var userId = req.params.userId;
        var user = userModel.findUserById(userId);
        var followersIDs = user.followers;

        var followersUsers = userModel.findUsersByIds(followersIDs);
        console.log("Retrieved followers ");

        res.json(followersUsers);
    }


    function register(req, res) {
        var user = req.body;
        user = userModel.createUser(user);
        req.session.currentUser = user;
        res.json(user);
    }

    function login(req, res) {
        var credentials = req.body;
        console.log("Calling cred");
        var user = userModel.findUserByCredentials(credentials);
        if(user){
            console.log("User "+user.username+" loggd in");
        }
        req.session.currentUser = user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }
}