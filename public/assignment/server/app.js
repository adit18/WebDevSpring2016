module.exports = function(app) {
    var userModel   = require("./models/user.model.server.js")();
    var foodModel   = require("./models/food.model.server.js")();

    var userService  = require("./services/user.service.server.js") (app, formModel, userModel);
    var foodService = require("./services/forms.service.server.js")(app, formModel, userModel);
}