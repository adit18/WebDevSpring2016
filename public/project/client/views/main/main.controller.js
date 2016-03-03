(function() {
    angular
        .module("FoodQuotientApp")
        .controller("MainController",MainController);

    function MainController($scope,$location){
        $scope.$location = $location;
    }
})();