(function() {
    angular
        .module("FoodQuotientApp")
        .controller("LoginController",LoginController);

    function LoginController($location,UserService){
        var vm = this;

        //event handlers declarations
        vm.login = login;

        function init() {
            vm.$location = $location;
        }
        init();

        //event handler delarations
        function login(user){
            if(!user) {
                alert("Please enter your credentials!");
                return;
            }
            UserService
                .login({
                    username: user.username,
                    password: user.password
                })
                .then(function(response){
                    if(response.data) {
                        console.log("Response: "+response.data);
                        UserService.setCurrentUser(response.data);
                        //console.log(UserService.getCurrentUser().username+" in login cntrl ");
                        $('#pro').html(user.username);
                        $location.url("/profile");
                    }
                    else{
                        console.log("Invalid username or password incorrect!");
                        alert("Invalid username or password incorrect!");
                        $location.url('/login');
                        $('#login')[0].reset();
                    }
                });

            //console.log(user.username);
            //UserService.findUserByCredentials(user.username, user.password, function(retUser){
            //    if(retUser!=null){
            //        UserService.setCurrentUser(retUser);
            //        $('#pro').html($rootScope.currentUser.username);
            //        $location.url('/profile');
            //    }
            //    else{
            //        console.log("Invalid username or password incorrect!");
            //        alert("Invalid username or password incorrect!");
            //        $location.url('/login');
            //        $('#login')[0].reset();
            //    }
            //
            //});
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