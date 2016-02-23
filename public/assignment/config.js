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
                        //controller: "courseOverview.controller"
                    })
                .when("/login",
                    {
                        templateUrl: "views/users/login.view.html",
                        //controller: "courseOverview.controller"
                    })
                .when("/profile",
                    {
                        templateUrl: "views/users/profile.view.html",
                        //controller: "courseOverview.controller"
                    })
                .when("/admin",
                    {
                        templateUrl: "views/admin/admin.view.html",
                        //controller: "courseOverview.controller"
                    })
        });
})();