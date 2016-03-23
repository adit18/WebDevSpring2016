(function() {
    angular
        .module("FoodQuotientApp")
        .controller("SearchController",SearchController);

    function SearchController($scope,$routeParams,$http,YelpService){

        //event handlers declarations
        $scope.searchFood = searchFood;
        $scope.searchValue = $routeParams.searchTerm;

        //console.log("Searchterm recd: "+vm.searchValue);
        searchFood();

        //event handler definitions
        function searchFood() {
            var searcholdTerm = $scope.searchValue;
            var searchNewTerm = searcholdTerm.replace(/ /g, "+");

            if (searchNewTerm) {
                console.log("Sending: " + searchNewTerm);
                YelpService.searchYelp(searchNewTerm, function (response){
                    $scope.data = response;
                    console.log(response);
                    $scope.$apply();
                });
            }
            else
            {
                alert("Please enter a search term!");
            }
        }
    }
})();