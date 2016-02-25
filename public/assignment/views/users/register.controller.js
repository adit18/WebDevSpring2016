(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope,$rootScope,$location,UserService){

        //event handlers declarations
        $scope.register = register;

        //event handler delarations
        function register(user){
            //console.log(user.username);
            UserService.createUser(user,function(retUser){
                $rootScope.user = retUser;
            });
            $location.url('/profile');
            //$window.location.href("#/profile");
            //$location.url("#/profile");
        }
    }
})();