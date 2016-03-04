module.exports = function(app) {
    var userModel   = require("./models/user.model.server.js")();
    var foodModel   = require("./models/food.model.server.js")();

    var userService  = require("./services/user.service.server.js") (app, foodModel, userModel);
    var foodService = require("./services/food.service.server.js")(app, foodModel, userModel);
}