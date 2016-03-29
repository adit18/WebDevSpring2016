(function() {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope,$location,UserService){
        $scope.$location = $location;
        $scope.logout = logout;

        UserService
            .getCurrentUser()
            .then(function(response) {
                var currentUser = response.data;
                if(currentUser) {
                    $('#pro').html(currentUser.username);
                }
            });

        function logout() {
            //UserService.setCurrentUser(null);
            //$location.url("/");
            UserService
                .logout()
                .then(function() {
                    UserService.setCurrentUser(null);
                    $location.url("/");
                })
        }
    }
})();