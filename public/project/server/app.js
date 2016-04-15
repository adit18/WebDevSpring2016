module.exports = function(app, db, mongoose) {
    var userModel   = require("./models/user.model.server.js")(db, mongoose);
    var foodModel   = require("./models/food.model.server.js")(db, mongoose);
    var reviewModel   = require("./models/review.model.server.js")(db, mongoose);

    var userService  = require("./services/user.service.server.js") (app, foodModel, userModel);
    var foodService = require("./services/food.service.server.js")(app, foodModel, userModel);
    var reviewService = require("./services/review.service.server.js")(app, foodModel, userModel, reviewModel);
}