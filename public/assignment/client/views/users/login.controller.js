(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope,$rootScope,$location,UserService){

        //event handlers declarations
        $scope.login = login;

        //Older style:
        //UserService.
        //findUserByCredentials({
        //    username: user.username,
        //    password: user.password
        //})

        //event handler delarations
        function login(user){
            UserService.
                login(user)
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