module.exports = function(mongoose) {

    var ReviewSchema = require("./review.schema.server.js")(mongoose);

    // use mongoose to declare a user schema
    var projUserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        aboutMe: String,
        location: String,
        contact: String,
        gender: String,
        profile_img: String,
        role: String,
        reviews: [String],
        following: [String],
        followers: [String]
    }, {collection: 'proj.user'});
    return projUserSchema;
};