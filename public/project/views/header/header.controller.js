(function() {
    angular
        .module("FoodQuotientApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope,$location,$http,UserService) {
        $scope.$location = $location;

        //event handlers declarations
        $scope.searchFood = searchFood;
        $scope.logout = logout;

        function logout() {
            UserService.setCurrentUser(null);
            $location.url("/");
        }


        function searchFood() {
            var searcholdTerm = $scope.searchTxt;
            searchTerm = searcholdTerm.replace(/ /g, "+");
            console.log("SearchText: "+ searchTerm);
            $http({
                method: 'GET',
                url: 'http://localhost:3000/searchapi?term='+$scope.searchTxt+'&location=San+Francisco'
                //url: 'http://localhost:3000/searchapi?term=cream+puffs&location=San+Francisco'
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