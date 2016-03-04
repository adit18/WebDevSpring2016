(function() {
    angular
        .module("FoodQuotientApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($location,UserService){
        var vm = this;

        //event handlers declarations
        vm.update = update;
        vm.deleteProfile = deleteProfile;

        function init() {
            vm.$location = $location;
            UserService
                .getProfile()
                .then(function (response) {
                    vm.profile = response.data;
                    //console.log(vm.profile);
                });
        }
        return init();

        //vm.currentUser = UserService.getCurrentUser();

        //event handler definitions
        function update(user){
            UserService
                .updateProfile(user)
                .then(function (response) {
                    vm.profile = response.data;
                    console.log("Updated "+response.data.username);
                    //console.log(vm.profile);
                });
        }

        function deleteProfile(){
            UserService
                .deleteProfile()
                .then(function (response) {
                    console.log("Deleted User:"+response);
                    //console.log(vm.profile);
                });
        }
    }
})();