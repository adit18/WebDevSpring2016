//var mock = require("./user.mock.json");

// load q promise library
var q = require("q");
var bcrypt = require("bcrypt-nodejs");

module.exports = function(db, mongoose) {

    // load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    // create user model from schema
    var UserModel = mongoose.model('User', UserSchema);

    var service = {
        createUser : createUser,
        findAllUsers : findAllUsers,
        findUserById : findUserById,
        findUserByUsername : findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUserByID : updateUserByID,
        updateUserByIDAdmin: updateUserByIDAdmin,
        deleteUserById : deleteUserById,
        setCurrentUser : setCurrentUser,
        getCurrentUser : getCurrentUser
    };
    return service;

    function createUser(user) {
        var deferred = q.defer();
        user.password = bcrypt.hashSync(user.password);
        UserModel.create(user, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();

        // find all users
        UserModel.find(function (err, allusers) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(allusers);
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
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();

        UserModel
            .findOne({username: username},
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        //var res = bcrypt.compareSync(credentials.password, doc.password);
        //UserModel.findOne( { username: credentials.username, password: credentials.password },
        //    function(err, doc) {
        //        if (err) {
        //            deferred.reject(err);
        //        } else {
        //            deferred.resolve(doc);
        //        }
        //
        //    });
        UserModel
            .findOne({username: credentials.username},
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        if(bcrypt.compareSync(credentials.password, doc.password)){
                            console.log("Crypt compared!");
                            deferred.resolve(doc);
                        }
                        else{
                            deferred.reject(err);
                        }
                    }
                });
        return deferred.promise;
    }

    function updateUserByID(userId,userObj) {
        var deferred = q.defer();
        console.log("Inside berfore : "+userId);

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
                        user.emails = [userObj.emails];
                        user.phones = [userObj.phones];
                        if(userObj.password != ""){
                            user.password = bcrypt.hashSync(userObj.password);
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

    function updateUserByIDAdmin(userId,userObj) {
        var deferred = q.defer();
        console.log("Inside berfore : "+userId);

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
                        user.roles = [userObj.roles];
                        if(userObj.password != ""){
                            user.password = bcrypt.hashSync(userObj.password);
                        }
                        user.save(function (err, updUser) {
                            if (err) {
                                deferred.reject(err);
                            }
                            else {
                                deferred.resolve(updUser);
                            }
                        });
                        console.log("Resolved Admin update!");
                    }
                }
            );
        return deferred.promise;
    }

    function deleteUserById(userId) {
        var deferred = q.defer();
        UserModel.remove(
            {_id: userId},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function setCurrentUser (user) {
        $rootScope.currentUser = user;
    }

    function getCurrentUser () {
        return $rootScope.currentUser;
    }
}