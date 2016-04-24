(function() {
    angular
        .module("FoodQuotientApp")
        .controller("LoginController",LoginController);

    function LoginController($location,UserService){
        var vm = this;

        //event handlers declarations
        vm.login = login;
        vm.error = null;
        function init() {
            vm.$location = $location;
        }
        init();

        //event handler delarations
        function login(user){
            if(!user) {
                vm.error = "Please enter your credentials!";
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
                        $location.url("/");
                    }
                    else{
                        console.log("Invalid username or password incorrect!");
                        vm.error = "Invalid username or password incorrect!";
                        $location.url('/login');
                        $('#login')[0].reset();
                    }
                });
        }
    }
})();