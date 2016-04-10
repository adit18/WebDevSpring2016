var mock = require("./projuser.mock.json");
module.exports = function() {
    var service = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        updateUser: updateUser,
        deleteUserById : deleteUserById,
        findUserById: findUserById,
        findUsersByIds: findUsersByIds,
        addReviewToUser: addReviewToUser,
        updateUserReviewByID: updateUserReviewByID
    };
    return service;

    function findUsersByIds (userIds) {
        var users = [];
        for (var u in userIds) {
            var user = findUserById (userIds[u]);
            if (user) {
                users.push (user);
            }
        }
        return users;
    }

    function findUserById(userId) {
        for(var u in mock) {
            if( mock[u]._id == userId ) {
                return mock[u];
            }
        }
        return null;
    }

    function createUser(user) {
        user._id = "ID_" + (new Date()).getTime();
        mock.push(user);
        return user;
    }

    function updateUser(user) {
        for(var u in mock) {
            if( mock[u]._id === user._id ) {
                mock.splice(u,1,user);
                return mock[u];
            }
        }
        return null;
    }

    function deleteUserById(userId) {
        for(var u in mock) {
            if( mock[u]._id === userId ) {
                var deluser = mock[u].username;
                mock.splice(u,1);
                return deluser;
                //return mock[u];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        console.log("Cred called");
        for(var u in mock) {
            if( mock[u].username === credentials.username &&
                mock[u].password === credentials.password) {
                console.log("Mock ID: "+mock[u]._id);
                return mock[u];
            }
        }
        return null;
    }

    function addReviewToUser(userId,review) {
        for(var u in mock) {
            if( mock[u]._id == userId ) {
                mock[u].reviews.push(review);
                return mock[u];
            }
        }
        return null;
    }

    function updateUserReviewByID(reviewId,review) {
        for(var u in mock) {
            if(mock[u]._id == review.userID){
                for(var f in mock[u].reviews){
                    if(mock[u].reviews[f]._id == reviewId){
                        mock[u].reviews.splice(f,1,review);
                        return mock[u].reviews[f];
                    }
                }
            }
        }
        return null;
    }
}