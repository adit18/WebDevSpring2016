(function() {
    angular
        .module("FoodQuotientApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($rootScope,$location,UserService){
        var vm = this;

        //event handlers declarations
        vm.register = register;

        function init() {
            vm.$location = $location;
        }
        init();

        //event handler declarations
        function register(user){
            UserService
                .register(user)
                .then(function(response){
                    var currentUser = response.data;
                    if(currentUser != null) {
                        UserService.setCurrentUser(currentUser);
                        $('#pro').html(UserService.getCurrentUser().username);
                        $location.url("/profile");
                    }
                });
        }
    }
})();