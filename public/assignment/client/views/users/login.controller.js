(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope,$rootScope,$location,UserService){

        //event handlers declarations
        $scope.login = login;

        //event handler delarations
        function login(user){
            UserService.
                findUserByCredentials({
                    username: user.username,
                    password: user.password
                })
                .then(function(response){
                    if(response.data!=null){
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
        }
    }
})();



//console.log(retUser);
//if(typeof retUser === "undefined"){
//    console.log("UNDEF found")
//}
//$rootScope.currentUser = retUser;

//$window.location.href("#/profile");
//$location.url("#/profile");