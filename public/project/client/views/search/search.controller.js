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

        //event handler delarations
        function searchFood() {
            var searcholdTerm = vm.searchValue;
            var searchNewTerm = searcholdTerm.replace(/ /g, "+");
            if (searchNewTerm) {
                console.log("Sending: " + searchNewTerm);

                $http.get('/searchapi?term=' + searchNewTerm) // + '&ll=' + coordsLoc)
                    .then(function successCallback(response) {
                        //Sample: Object {data: Object, status: 200, config: Object, statusText: "OK"}
                        vm.data = response.data;
                        console.log(response);
                    }, function errorCallback(response) {
                        console.log("Node not working!")
                    });
            }
            else
            {
                alert("Please enter a search term!");
            }
        }
    }
})();

//Location Check:
//if (navigator.geolocation) {
//    navigator.geolocation.getCurrentPosition(posSuccess);
//}
//
////GeoLocation
//function posSuccess(position) {
//    console.log(position);
//    console.log("Lat: " + position.coords.latitude);
//    console.log("Long: " + position.coords.longitude);
//    console.log("Accuracy: " + position.coords.accuracy);
//
//    var coordsLoc = position.coords.latitude + "," + position.coords.longitude + "," + position.coords.accuracy;
//
//    console.log("Working: " + coordsLoc);
//
//    //url: 'http://localhost:3000/searchapi?term=cream+puffs&location=San+Francisco'
//    $http.get('/searchapi?term=' + searchNewTerm + '&ll=' + coordsLoc)
//        .then(function successCallback(response) {
//            //Sample: Object {data: Object, status: 200, config: Object, statusText: "OK"}
//            $scope.data = response.data;
//            console.log(response);
//        }, function errorCallback(response) {
//            console.log("Node not working!")
//        });
//}