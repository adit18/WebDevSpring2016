var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;

module.exports = function(app, userModel) {

    var auth = authorized;
    var isAdmin = isAdmin;

    app.post("/api/assignment/login", passport.authenticate('local'), login);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);
    app.post("/api/assignment/user", register);
    app.get("/api/assignment/user", auth, getAllUsers);
    app.get("/api/assignment/user/:id", profile);
    //app.get("/api/assignment/user?username=username", profileByUsername);
    //app.get("/api/assignment/user?username=alice&password=wonderland", profileByUsernamePassword);
    app.put("/api/assignment/user/:id", auth, updateProfile);
    app.delete("/api/assignment/user/:id", auth, deleteProfile);

    app.post("/api/assignment/admin/user", isAdmin, createUserByAdmin);
    app.put("/api/assignment/admin/user/:userId", isAdmin, updateUserByAdmin);
    app.get("/api/assignment/admin/user", isAdmin, getAllUsersByAdmin);
    app.delete("/api/assignment/admin/user/:userId", isAdmin, deleteUserByIdAdmin);
    app.get("/api/assignment/admin/user/:userId", isAdmin, getUserByIDAdmin);


    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) {
                        console.log("Came to login passnot: "+user);
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['student'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        console.log("User already exists!");
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (nuser) {
                    if (nuser) {
                        res.json(nuser);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createUserByAdmin(req,res){
        var newUser = req.body;
        newUser.roles = ['student'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        console.log("In user creation by Admin, user already exists!");
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function getAllUsers(req, res) {
        if(req.query.username){
            profileByUsername(req,res);
        }
        else {
            var allUsers = [];
            //allUsers = userModel.findAllUsers();
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

    function getAllUsersByAdmin(req, res) {
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

    function profile(req, res) {
        var userId = req.params.id;

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

    function getUserByIDAdmin(req, res) {
        var userId = req.params.userId;

        // use model to find user by id
        userModel.findUserById(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                });
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
        userModel.findUserByCredentials(cred)
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
            );
    }

    function updateProfile(req, res) {
        var user = req.body;
        var userId = req.params.id;
        console.log("In User Service : "+userId);
        //user._id = userId;
        //var allUsers = [];
        userModel.updateUserByID(userId, user)
            .then(
                function (user) {
                    console.log("Came till user server ");
                    //req.session.currentUser = user;
                    res.json(user);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
        //req.session.currentUser = user;
        //res.send(allUsers);
    }

    function updateUserByAdmin(req, res) {
        var user = req.body;
        var userId = req.params.userId;
        console.log("In Admin User Service Update: "+userId);
        userModel.updateUserByIDAdmin(userId, user)
            .then(
                function (user) {
                    console.log("Came till user server ");
                    //req.session.currentUser = user;
                    res.json(user);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
        //req.session.currentUser = user;
        //res.send(allUsers);
    }

    function deleteProfile(req, res) {
        //var remUsers = [];
        var userId = req.params.id;
        userModel.deleteUserById(userId)
            .then(
                function (users) {
                    res.json(users);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );

        //res.send(remUsers);
    }

    function deleteUserByIdAdmin(req, res) {
        var userId = req.params.userId;
        console.log("In Admin User Service Delete : "+userId);
        userModel.deleteUserById(userId)
            .then(
                function (users) {
                    res.json(users);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );

        //res.send(remUsers);
    }

    function login(req, res) {
        //var credentials = req.body;
        //var user = userModel.findUserByCredentials(credentials);
        var user = req.user;
        if(user){
            console.log("User "+user.username+" logged in");
        }
        else{
            console.log("Came to login fail: "+user);
        }
        //req.session.currentUser = user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
        //res.json(req.session.currentUser);
    }

    function logout(req, res) {
        //req.session.destroy();
        req.logOut();
        res.send(200);
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.status(401).send("Authentication failed!");
            //res.send(null);
        } else {
            next();
        }
    }

    function isAdmin(req, res, next){
        if(req.isAuthenticated() && req.user.roles.indexOf('admin') > -1){
            next();
        }
        else {
            res.status(403).send("Not Admin User!");
        }
    }
}