module.exports = function(app, userModel) {
    app.post("/service/user/login", login);
    app.get("/service/user/loggedin", loggedin);
    app.post("/service/user/logout", logout);
    app.post("/service/user/register", register);
    app.get("/service/user/profile/:userId", profile);
    app.post("/service/user/updateprofile", updateProfile);
    app.get("/service/user/deleteprofile/:userId", deleteProfile);

    function profile(req, res) {
        var userId = req.params.userId;
        var user = userModel.findUserById(userId);
        //var movieImdbIDs = user.likes;
        //var movies = movieModel.findMoviesByImdbIDs(movieImdbIDs);
        //user.likesMovies = movies;
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
        //var movieImdbIDs = user.likes;
        //var movies = movieModel.findMoviesByImdbIDs(movieImdbIDs);
        //user.likesMovies = movies;
        res.send(del_username);
    }

    function register(req, res) {
        var user = req.body;
        user = userModel.createUser(user);
        req.session.currentUser = user;
        res.json(user);
    }

    function login(req, res) {
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials);
        if(user){
            console.log("User "+user.username+"logged in");
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