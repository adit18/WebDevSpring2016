(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope,$rootScope,$location,UserService){

        //event handlers declarations
        $scope.register = register;
        $scope.error = null;

        //event handler delarations
        function register(user){
            if(user.password != user.vpassword || !user.password || !user.vpassword)
            {
                $scope.error = "Please enter passwords correctly";
            }

            UserService
                .createUser(user)
                .then(function(response){
                    var locUser = response.data;
                    UserService.
                        login(locUser)
                        .then(function(response){
                            if(response.data) {
                                console.log(response.data);
                                UserService.setCurrentUser(response.data);
                                $('#pro').html($rootScope.currentUser.username);
                                $location.url('/profile');
                            }
                            else{
                                console.log("Invalid username or password incorrect!");
                                alert("Invalid username or password incorrect!");
                                $location.url('/login');
                                $('#login')[0].reset();
                            }

                        });
                });

            $location.url('/profile');
            //$window.location.href("#/profile");
            //$location.url("#/profile");
        }
    }
})();