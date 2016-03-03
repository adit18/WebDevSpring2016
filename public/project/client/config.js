(function()
{
    angular
        .module("FoodQuotientApp")
        .config(function($routeProvider)
        {
            $routeProvider
                .when("/",
                    {
                        templateUrl: "views/home/home.view.html",
                        //controller: "courseList.controller"
                    })
                .when("/register",
                    {
                        templateUrl: "views/users/register.view.html",
                        controller: "RegisterController"
                    })
                .when("/login",
                    {
                        templateUrl: "views/users/login.view.html",
                        controller: "LoginController"
                    })
                .when("/profile",
                    {
                        templateUrl: "views/users/profile.view.html",
                        controller: "ProfileController"
                    })
                .when("/search/:searchTerm",
                    {
                        templateUrl: "views/search/search.view.html",
                        controller: "SearchController",
                        controllerAs: "model"
                    })
                //.when("/admin",
                //    {
                //        templateUrl: "views/admin/admin.view.html",
                //        //controller: "courseOverview.controller"
                //    })
                //.when("/forms",
                //    {
                //        templateUrl: "views/forms/forms.view.html",
                //        controller: "FormController"
                //    })
                //.when("/fields",
                //    {
                //        templateUrl: "views/forms/fields.view.html",
                //        //controller: "courseOverview.controller"
                //    })
                .otherwise({
                    redirectTo: "/"
                })
        });
})();