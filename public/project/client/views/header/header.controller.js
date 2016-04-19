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
            $('.nav a').on('click', function(){
                $('#navbar').collapse('hide');
            });

            UserService
                .getCurrentUser()
                .then(function(response) {
                    var currentUser = response.data;
                    //if(currentUser) {
                    //    $('#pro').html(currentUser.username);
                    //}
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
                var searcholdLoc = vm.searchLoc;
                if(!searcholdLoc){
                    searcholdLoc = "Boston,MA";
                }
                searchTerm = searcholdTerm.replace(/ /g, "+");
                console.log("SearchText: "+ searchTerm);
                console.log("SearchLoc: "+ searcholdLoc);
                $location.url("/search/"+searchTerm+"/location/"+searcholdLoc);
            }
            else{
                alert("Please enter a search term!");
            }

        }
    }
})();