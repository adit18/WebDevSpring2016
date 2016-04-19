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
            if(user.password !== user.vpassword){
                alert("Password mismatch!, Please re-enter");
                $location.url('/register');
                $('#register')[0].reset();
                return;
            }
            //Initializeimage
            user.profile_img = "http://richlandtree.com/Images/ProfileIcon.png";
            UserService
                .register(user)
                .then(function(response){
                    var currentUser = response.data;
                    if(currentUser != null) {
                        UserService.setCurrentUser(currentUser);
                        $('#pro').html(UserService.getCurrentUser().username);
                        $location.url("/updateprofile");
                    }
                    else{
                        console.log("Username already exists!, please try another");
                        alert("Username already exists! Please try another!");
                        $location.url('/register');
                        $('#register')[0].reset();
                    }
                });
        }
    }
})();