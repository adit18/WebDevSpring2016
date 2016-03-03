(function() {
    angular
        .module("FoodQuotientApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope,$location,UserService) {
        $scope.$location = $location;

        //event handlers declarations
        $scope.logout = logout;
        $scope.searchRedirect = searchRedirect;

        function logout() {
            UserService.setCurrentUser(null);
            $location.url("/");
        }

        function searchRedirect() {
            if($scope.searchTxt){
                var searcholdTerm = $scope.searchTxt;
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