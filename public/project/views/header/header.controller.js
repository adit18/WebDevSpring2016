(function() {
    angular
        .module("FoodQuotientApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope,$location){
        $scope.$location = $location;
        //$scope.logout = logout;
    }
})();