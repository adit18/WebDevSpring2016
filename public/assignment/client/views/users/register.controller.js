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
                    var locUser = response.data;
                    //console.log("HERE: "+ locUser);
                    if(locUser != null) {
                        UserService.setCurrentUser(response.data);
                        $('#pro').html($rootScope.currentUser.username);
                        $location.url("/profile");
                    }
                });
            $location.url('/profile');
            //$window.location.href("#/profile");
            //$location.url("#/profile");
        }
    }
})();