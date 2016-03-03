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

        //event handler delarations
        function register(user){
            //console.log($scope.user.username);
            UserService.createUser(user,function(retUser){
                $rootScope.currentUser = retUser;
                UserService.setCurrentUser(retUser);
                $('#pro').html($rootScope.currentUser.username);
            });
            $location.url('/profile');
            //$window.location.href("#/profile");
            //$location.url("#/profile");
        }
    }
})();