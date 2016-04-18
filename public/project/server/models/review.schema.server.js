module.exports = function(mongoose) {

    // use mongoose to declare a review schema
    var ReviewSchema = mongoose.Schema({
        userID: String,
        username: String,
        yelpID: String,
        placeName: String,
        placePoster: String,
        comment: String,
        ratval: String,
        categories: [[String]],
        created: String,
        updated: String
    }, {collection: 'proj.review'});
    return ReviewSchema;
};