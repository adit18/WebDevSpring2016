(function() {
    angular
        .module("FoodQuotientApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope,$rootScope,$location,UserService){

        //event handlers declarations
        $scope.register = register;

        //event handler delarations
        function register(user){
            //console.log($scope.user.username);
            UserService.createUser(user,function(retUser){
                $rootScope.currentUser = retUser;
                UserService.setCurrentUser(retUser);
            });
            $location.url('/profile');
            //$window.location.href("#/profile");
            //$location.url("#/profile");
        }
    }
})();