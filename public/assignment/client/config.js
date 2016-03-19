(function()
{
    angular
        .module("FormBuilderApp")
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
                .when("/admin",
                    {
                        templateUrl: "views/admin/admin.view.html",
                        //controller: "courseOverview.controller"
                    })
                .when("/forms",
                    {
                        templateUrl: "views/forms/forms.view.html",
                        controller: "FormController"
                    })
                .when("/fields/:userId/:formId",
                    {
                        templateUrl: "views/forms/field.view.html",
                        controller: "FieldController"
                    })
                .otherwise({
                    redirectTo: "/"
                })
        });
})();