(function() {
    angular
        .module("FoodQuotientApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($location,UserService) {
        var vm = this;

        //event handlers declarations
        vm.logout = logout;
        vm.searchRedirect = searchRedirect;

        function init() {
            vm.$location = $location;
            UserService
                .getCurrentUser()
                .then(function(response) {
                    var currentUser = response.data;
                    if(currentUser) {
                        $('#pro').html(currentUser.username);
                    }
            });
        }
        init();

        function logout() {
            UserService
                .logout()
                .then(function() {
                    UserService.setCurrentUser(null);
                    $location.url("/");
                })
        }

        function searchRedirect() {
            if(vm.searchTxt){
                var searcholdTerm = vm.searchTxt;
                searchTerm = searcholdTerm.replace(/ /g, "+");
                console.log("SearchText: "+ searchTerm);
                $location.url("/search/"+searchTerm);
            }
            else{
                alert("Please enter a search term!");
            }

        }
    }
})();