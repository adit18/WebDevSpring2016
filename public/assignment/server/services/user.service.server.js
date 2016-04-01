module.exports = function(app, userModel) {
    //app.post("/service/user/login", login);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);
    app.post("/api/assignment/user", register);
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", profile);
    //app.get("/api/assignment/user?username=username", profileByUsername);
    //app.get("/api/assignment/user?username=alice&password=wonderland", profileByUsernamePassword);
    app.put("/api/assignment/user/:id", updateProfile);
    app.delete("/api/assignment/user/:id", deleteProfile);

    function register(req, res) {
        var user = req.body;
        var userR = userModel.createUser(user)
            .then(
                // login user if promise resolved
                function ( doc ) {
                    req.session.currentUser = doc;
                    //res.json(user);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );

        //var allUsers =
        userModel.findAllUsers()
            .then(
                // login user if promise resolved
                function ( doc ) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );

        //res.send(allUsers);
    }

    function getAllUsers(req, res) {
        if(req.query.username){
            profileByUsername(req,res);
        }
        else {
            var allUsers = [];
            allUsers = userModel.findAllUsers();
            userModel.findAllUsers()
                .then(
                    function ( doc ) {
                        res.json(doc);
                    },
                    function ( err ) {
                        res.status(400).send(err);
                    }
                );
        }
    }

    function profile(req, res) {
        var userId = req.params.id;
        //var user = userModel.findUserById(userId);

        // use model to find user by id
        userModel.findUserById(userId)
            .then(
                // retrieve the user by user id
                function (doc) {
                    res.json(doc);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                });
        //res.json(user);
    }

    function profileByUsername(req, res) {
        if(req.query.password){
            profileByUsernamePassword(req,res);
        }
        else {
            var userName = req.query.username;
            var user = userModel.findUserByUsername(userName)
                .then(
                    function (user) {
                        res.json(user);
                    },
                    // send error if promise rejected
                    function ( err ) {
                        res.status(400).send(err);
                    }
                )
        }
    }

    function profileByUsernamePassword(req, res) {
        var cred = {};
        cred.username = req.query.username;
        cred.password = req.query.password;
        var user = userModel.findUserByCredentials(cred)
            .then(
                function (user) {
                    if(user){
                        console.log("User "+user.username+" logged in");
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

    function updateProfile(req, res) {
        var user = req.body;
        var userId = req.params.userId;
        //user._id = userId;
        var allUsers = [];
        allUsers = userModel.updateUserByID(userId, user)
            .then(
                function (users) {
                    res.json(users);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            )
        //req.session.currentUser = user;
        //res.send(allUsers);
    }

    function deleteProfile(req, res) {
        var remUsers = [];
        var userId = req.params.userId;
        remUsers = userModel.deleteUserById(userId)
            .then(
                function (users) {
                    res.json(users);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            )

        //res.send(remUsers);
    }

    //function login(req, res) {
    //    var credentials = req.body;
    //    var user = userModel.findUserByCredentials(credentials);
    //    if(user){
    //        console.log("User "+user.username+" logged in");
    //    }
    //    req.session.currentUser = user;
    //    res.json(user);
    //}

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }
}