(function() {
    angular
        .module("FoodQuotientApp")
        .controller("SearchController",SearchController);

    function SearchController($routeParams,$http){
        var vm = this;

        //event handlers declarations
        vm.searchFood = searchFood;
        vm.searchValue = $routeParams.searchTerm;

        function init() {

        }
        init();

        console.log("Searchterm recd: "+vm.searchValue);
        searchFood();

        //event handler definitions
        function searchFood() {
            var searcholdTerm = vm.searchValue;
            var searchNewTerm = searcholdTerm.replace(/ /g, "+");
            if (searchNewTerm) {
                console.log("Sending: " + searchNewTerm);

                $http.get('/searchapi?term=' + searchNewTerm) // + '&ll=' + coordsLoc)
                    .then(function successCallback(response) {
                        //Sample: Object {data: Object, status: 200, config: Object, statusText: "OK"}
                        vm.data = JSON.parse(response.data);
                        console.log(response.data);
                    }, function errorCallback(response) {
                        console.log("Node not working!");
                        console.log(response);
                    });
            }
            else
            {
                alert("Please enter a search term!");
            }
        }
    }
})();