(function() {
    angular
        .module("FoodQuotientApp")
        .controller("SearchController",SearchController);

    function SearchController($scope,$routeParams,$http,YelpService){

        //event handlers declarations
        $scope.searchFood = searchFood;
        $scope.searchValue = $routeParams.searchTerm;
        $scope.searchLoc = $routeParams.searchLoc;

        //console.log("Searchterm recd: "+vm.searchValue);
        searchFood();
        //$('#register')[0].reset();

        //event handler definitions
        function searchFood() {
            var searcholdTerm = $scope.searchValue;
            var searchLocation = $scope.searchLoc;
            var searchNewTerm = searcholdTerm.replace(/ /g, "+");

            if (searchNewTerm) {
                console.log("Sending: " + searchNewTerm);
                YelpService.searchYelp(searchNewTerm,searchLocation, function (response){
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