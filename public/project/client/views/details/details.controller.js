(function(){
    angular
        .module("FoodQuotientApp")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams,$http,$rootScope,$location,FoodService) {
        var vm = this;
        var bizID = $routeParams.bizID;
        var currentUser = $rootScope.currentUser;
        vm.favorite = favorite;

        function init() {
            $http.get('/businessapi?biz=' + bizID) // + '&ll=' + coordsLoc)
                .then(function successCallback(response) {
                    //Sample: Object {data: Object, status: 200, config: Object, statusText: "OK"}
                    vm.data = response.data;
                    console.log(response);
                }, function errorCallback(response) {
                    console.log("Node not working!")
                });

            FoodService
                .findUserLikes (bizID)
                .then(function(response){
                     vm.place = response.data;

                });
        }
        init();

        function favorite(place) {
            if(currentUser) {
                FoodService
                    .userLikesFood(currentUser._id, place);
            } else {
                $location.url("/login");
            }
        }
    }
})();