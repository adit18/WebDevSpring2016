(function() {
    angular
        .module("FoodQuotientApp")
        .controller("SidebarController",SidebarController);

    function SidebarController($location){
        var vm = this;
        function init() {
            vm.$location = $location;
        }
        init();
    }
})();