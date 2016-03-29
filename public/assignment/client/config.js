(function()
{
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration ($routeProvider) {
            $routeProvider
                .when("/",
                    {
                        templateUrl: "views/home/home.view.html",
                        //controller: "courseList.controller"
                        resolve: {
                            getLoggedIn: getLoggedIn
                        }
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
                        controller: "ProfileController",
                        resolve: {
                            checkLoggedIn: checkLoggedIn
                        }
                    })
                .when("/admin",
                    {
                        templateUrl: "views/admin/admin.view.html"
                        //controller: "courseOverview.controller"
                    })
                .when("/forms",
                    {
                        templateUrl: "views/forms/forms.view.html",
                        controller: "FormController",
                        resolve: {
                            getLoggedIn: getLoggedIn
                        }
                    })
                .when("/fields/:userId/:formId",
                    {
                        templateUrl: "views/forms/field.view.html",
                        controller: "FieldController",
                        resolve: {
                            getLoggedIn: getLoggedIn
                        }
                    })
                .otherwise({
                    redirectTo: "/"
                })
        }

    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response){
                var currentUser = response.data;
                UserService.setCurrentUser(currentUser);
                deferred.resolve();
            });

        return deferred.promise;
    }

    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response) {
                var currentUser = response.data;
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/");
                }
            });

        return deferred.promise;
    }
})();