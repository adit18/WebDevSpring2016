var mock = require("./user.mock.json");

// load q promise library
var q = require("q");

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
        deleteUserById : deleteUserById,
        setCurrentUser : setCurrentUser,
        getCurrentUser : getCurrentUser
    };
    return service;

    function createUser(user) {
        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        UserModel.create(user, function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();

        // find all users
        UserModel.find({}, function (err, allusers) {
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
        UserModel.findOne(
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

    function findUserByUsername(username) {
        var deferred = q.defer();

        // find one retrieves one document
        UserModel.findOne(
            // first argument is predicate
            {username: username},
            // doc is unique instance matches predicate
            function(err, doc) {
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();

        // find one retrieves one document
        UserModel.findOne(
            // first argument is predicate
            { username: credentials.username,
                password: credentials.password },

            // doc is unique instance matches predicate
            function(err, doc) {
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }

    function updateUserByID(userId,user) {
        var deferred = q.defer();

        // find one retrieves one document
        UserModel.update(
            // first argument is predicate
            { _id: userId},
            {$set: user},
            // doc is unique instance matches predicate
            function(err, doc) {
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }

    function deleteUserById(userId) {
        for(var u in mock) {
            if( mock[u]._id == userId ) {
                var deluser = mock[u].username;
                mock.splice(u,1);
                return mock;
            }
        }
        return null;
    }

    function setCurrentUser (user) {
        $rootScope.currentUser = user;
    }

    function getCurrentUser () {
        return $rootScope.currentUser;
    }
}