module.exports = function(mongoose) {

    var ReviewSchema = require("./review.schema.server.js")(mongoose);

    // use mongoose to declare a user schema
    var FoodSchema = mongoose.Schema({
        yelpID: String,
        poster: String,
        title: String,
        reviews: [String],
        categories: [[String]]
    }, {collection: 'proj.foodplace'});
    return FoodSchema;
};