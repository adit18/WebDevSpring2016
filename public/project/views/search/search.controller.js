(function() {
    angular
        .module("FoodQuotientApp")
        .controller("SearchController",SearchController);

    function SearchController($scope,$routeParams,$http){

        //event handlers declarations
        $scope.searchFood = searchFood;

        $scope.searchValue = $routeParams.searchTerm;
        console.log("Searchterm recd: "+$scope.searchValue);
        searchFood();

        //event handler delarations
        function searchFood(){
            var searcholdTerm = $scope.searchValue;
            var searchNewTerm = searcholdTerm.replace(/ /g, "+");
            console.log("Sending: "+searchNewTerm);

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(posSuccess);
            }

            //GeoLocation
            function posSuccess(position){
                console.log(position);
                console.log("Lat: "+position.coords.latitude);
                console.log("Long: "+position.coords.longitude);
                console.log("Accuracy: "+position.coords.accuracy);

                var coordsLoc = position.coords.latitude+","+position.coords.longitude+","+position.coords.accuracy;

                console.log("Working: "+coordsLoc);

                //url: 'http://localhost:3000/searchapi?term=cream+puffs&location=San+Francisco'
                $http.get('/searchapi?term='+searchTerm+'&location=San+Francisco')
                    .then(function successCallback(response) {
                        //Sample: Object {data: Object, status: 200, config: Object, statusText: "OK"}
                        console.log(response);
                    }, function errorCallback(response) {
                        console.log("Node not working!")
                    });
            }

            function renderFoodList() {
                alert("Food List");
            }
        }
    }
})();