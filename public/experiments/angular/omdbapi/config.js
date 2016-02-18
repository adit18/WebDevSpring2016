/**
 * Created by Aditya Ramesha on 2/17/2016.
 */
(function(){
    angular
        .module("MovieApp")
        .config(configuration);
    function configuration($routeProvider) {
        $routeProvider.when("/home", {
            templateUrl: "home/home.view.html"
        })
    }
}
