module.exports = function(app, foodModel, userModel) {
    app.post("/service/user/login", login);
    app.get("/service/user/loggedin", loggedin);
    app.post("/service/user/logout", logout);
    app.post("/api/assignment/user", register);
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", profile);
    app.get("/api/assignment/user?username=username", profileByUsername);
    app.get("/api/assignment/user?username=alice&password=wonderland", profileByUsernamePassword);
    app.put("/api/assignment/user/:id", updateProfile);
    app.delete("/api/assignment/user/:id", deleteProfile);

    function register(req, res) {
        var user = req.body;
        user = userModel.createUser(user);
        req.session.currentUser = user;
        var allUsers = userModel.findAllUsers();
        res.send(allUsers);
        //res.json(user);
    }

    function getAllUsers(req, res) {
        var allUsers = [];
        allUsers = userModel.findAllUsers();
        res.send(allUsers);
        //res.json(user);
    }

    function profile(req, res) {
        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.json(user);
        //if necessary res.send
    }

    function profileByUsername(req, res) {
        var userName = req.query.username;
        var user = userModel.findUserByUsername(userName);
        res.json(user);
        //if necessary res.send
    }

    function profileByUsernamePassword(req, res) {
        var cred = {};
        cred.username = req.query.username;
        cred.password = req.query.password;
        var user = userModel.findUserByCredentials(cred);
        res.json(user);
        //res.status(200).send(user);
    }

    function updateProfile(req, res) {
        var user = req.body;
        var allUsers = [];
        allUsers = userModel.updateUser(user);
        req.session.currentUser = user;
        res.send(allUsers);
        //res.json(user);
    }

    function deleteProfile(req, res) {
        var remUsers = [];
        var userId = req.params.userId;
        remUsers = userModel.deleteUserById(userId);
        res.send(allUsers);
        //res.send(del_username);
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