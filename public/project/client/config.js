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
                        templateUrl: "views/register/register.view.html",
                        controller: "RegisterController",
                        controllerAs: "model"
                    })
                .when("/login",
                    {
                        templateUrl: "views/login/login.view.html",
                        controller: "LoginController",
                        controllerAs: "model"
                    })
                .when("/profile",
                    {
                        templateUrl: "views/profile/profile.view.html",
                        controller: "ProfileController",
                        controllerAs: "model"
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