(function() {
    angular
        .module("FoodQuotientApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope,$location,$http) {
        $scope.$location = $location;

        //event handlers declarations
        $scope.searchFood = searchFood;

        function searchFood() {
            $http({
                method: 'GET',
                url: 'http://localhost:3000/searchapi?term=cream+puffs&location=San+Francisco'
            }).then(function successCallback(response) {
                //Sample: Object {data: Object, status: 200, config: Object, statusText: "OK"}
                console.log(response);
            }, function errorCallback(response) {
                console.log("Node not working!")
            });

            function renderFoodList() {
                alert("Food List");
            }
        }
    }
})();