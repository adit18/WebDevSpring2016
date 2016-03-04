(function(){
    angular
        .module("FoodQuotientApp")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams,$http,$rootScope) {
        var vm = this;
        var bizID = $routeParams.bizID;
        var currentUser = $rootScope.currentUser;
        //vm.favorite = favorite;

        function init() {
            $http.get('/businessapi?biz=' + bizID) // + '&ll=' + coordsLoc)
                .then(function successCallback(response) {
                    //Sample: Object {data: Object, status: 200, config: Object, statusText: "OK"}
                    vm.data = response.data;
                    console.log(response);
                }, function errorCallback(response) {
                    console.log("Node not working!")
                });
        }
        init();

        function favorite(movie) {
            if(currentUser) {
                MovieService
                    .userLikesMovie(currentUser._id, movie);
            } else {
                $location.url("/login");
            }
        }
    }
})();