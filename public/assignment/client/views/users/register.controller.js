(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope,$rootScope,$location,UserService){

        //event handlers declarations
        $scope.register = register;

        //event handler delarations
        function register(user){
            //console.log($scope.user.username);
            UserService
                .createUser(user)
                .then(function(response){
                    $rootScope.currentUser = response.data;
                    UserService.setCurrentUser(response.data);
                });
            $location.url('/profile');
            //$window.location.href("#/profile");
            //$location.url("#/profile");
        }
    }
})();