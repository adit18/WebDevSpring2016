(function()
{
    angular
        .module("FoodQuotientApp")
        .config(configuration);

    function configuration($routeProvider) {
            $routeProvider
                .when("/",
                    {
                        templateUrl: "views/home/home.view.html",
                        controller: "HomeController",
                        //controllerAs: "model",
                        resolve: {
                            getLoggedIn: getLoggedIn
                        }
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
                .when("/othersprofile/:userId",
                    {
                        templateUrl: "views/profile/othersprofile.view.html",
                        controller: "OthersprofileController",
                        //controllerAs: "model"
                        resolve: {
                            checkLoggedIn: checkLoggedIn
                        }
                    })
                .when("/updateprofile",
                    {
                        templateUrl: "views/profile/updateprofile.view.html",
                        controller: "UpdateprofileController",
                        controllerAs: "model",
                        resolve: {
                            checkLoggedIn: checkLoggedIn
                        }
                    })
                .when("/profile",
                    {
                        templateUrl: "views/profile/profile.view.html",
                        controller: "ProfileController",
                        controllerAs: "model",
                        resolve: {
                            checkLoggedIn: checkLoggedIn
                        }
                    })
                .when("/search/:searchTerm",
                    {
                        templateUrl: "views/search/search.view.html",
                        controller: "SearchController",
                        //controllerAs: "model"
                        resolve: {
                            getLoggedIn: getLoggedIn
                        }
                    })
                .when("/details/:bizID",
                    {
                        templateUrl: "views/details/details.view.html",
                        controller: "DetailsController",
                        //controllerAs: "model"
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