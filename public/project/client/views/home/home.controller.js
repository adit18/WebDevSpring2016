(function() {
    angular
        .module("FoodQuotientApp")
        .controller("HomeController",HomeController);

    function HomeController($location,UserService) {
        var vm = this;

        //event handlers declarations
        vm.logout = logout;
        vm.searchRedirect = searchRedirect;

        if(UserService.getCurrentUser()) {
            UserService
                .getFollowing()
                .then(function (response) {
                    console.log("Got following ");
                    vm.followingProfiles = response.data;
                    console.log(vm.followingProfiles);
                });
        }

        function init() {
            vm.$location = $location;
            $('.carousel').carousel({
                interval: 5000
            })

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

        //function searchKeyPress (e) {
        //    e = e || window.event;
        //    if (e.keyCode == 13)
        //    {
        //        document.getElementById('searchFoodBtn').click();
        //        return false;
        //    }
        //    return true;
        //}
    }
})();