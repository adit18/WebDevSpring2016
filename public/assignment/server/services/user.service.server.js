module.exports = function(app, userModel) {
    //app.post("/service/user/login", login);
    //app.get("/service/user/loggedin", loggedin);
    //app.post("/service/user/logout", logout);
    app.post("/api/assignment/user", register);
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", profile);
    //app.get("/api/assignment/user?username=username", profileByUsername);
    //app.get("/api/assignment/user?username=alice&password=wonderland", profileByUsernamePassword);
    app.put("/api/assignment/user/:id", updateProfile);
    app.delete("/api/assignment/user/:id", deleteProfile);

    function register(req, res) {
        var user = req.body;
        user = userModel.createUser(user);
        req.session.currentUser = user;
        var allUsers = userModel.findAllUsers();
        res.send(allUsers);
    }

    function getAllUsers(req, res) {
        if(req.query.username){
            profileByUsername(req,res);
        }
        else {
            var allUsers = [];
            allUsers = userModel.findAllUsers();
            res.send(allUsers);
        }
    }

    function profile(req, res) {
        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.json(user);
    }

    function profileByUsername(req, res) {
        if(req.query.password){
            profileByUsernamePassword(req,res);
        }
        else {
            var userName = req.query.username;
            var user = userModel.findUserByUsername(userName);
            res.json(user);
        }
    }

    function profileByUsernamePassword(req, res) {
        var cred = {};
        cred.username = req.query.username;
        cred.password = req.query.password;
        var user = userModel.findUserByCredentials(cred);
        res.json(user);
    }

    function updateProfile(req, res) {
        var user = req.body;
        var userId = req.params.userId;
        //user._id = userId;
        var allUsers = [];
        allUsers = userModel.updateUserByID(userId, user);
        req.session.currentUser = user;
        res.send(allUsers);
    }

    function deleteProfile(req, res) {
        var remUsers = [];
        var userId = req.params.userId;
        remUsers = userModel.deleteUserById(userId);
        res.send(remUsers);
    }

    function login(req, res) {
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials);
        if(user){
            console.log("User "+user.username+" logged in");
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