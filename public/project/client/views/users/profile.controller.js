(function() {
    angular
        .module("FoodQuotientApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($rootScope,$location,UserService){
        var vm = this;

        //event handlers declarations
        vm.update = update;

        function init() {
            vm.$location = $location;
        }
        init();

        vm.currentUser = UserService.getCurrentUser();

        //event handler delarations
        function update(user){
            console.log("Sending "+user.username);
            var user_id = $rootScope.currentUser._id;
            UserService.updateUser(user_id,user,function(user){
                console.log("Updated "+user.username);
            });
        }
    }
})();