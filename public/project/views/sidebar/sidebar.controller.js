(function() {
    angular
        .module("FoodQuotientApp")
        .controller("SidebarController",SidebarController);

    function SidebarController($scope,$location){
        $scope.$location = $location;
    }
})();