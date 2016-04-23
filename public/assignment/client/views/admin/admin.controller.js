(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController",AdminController);

    function AdminController($scope,$rootScope,$location,UserService){

        $scope.predicate = 'username';
        $scope.reverse = false;
        $scope.usernameRevFlag = false;
        //$scope.firstnameRevFlag = false;
        //$scope.lastnameRevFlag = false;

        $scope.order = function(predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
            if(predicate == 'username'){
                $scope.usernameRevFlag = !$scope.usernameRevFlag;
            }
            if(predicate == 'firstName'){
                $scope.firstnameRevFlag = !$scope.firstnameRevFlag;
            }
            if(predicate == 'lastName'){
                $scope.lastnameRevFlag = !$scope.lastnameRevFlag;
            }
        };

        //event handlers declarations
        $scope.addUser = addUser;
        $scope.selectUser = selectUser;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;

        function init(){
            UserService
                .findAllUsersByAdmin()
                .then(function (response){
                    console.log("Got all users");
                    console.log(response.data);
                    $scope.users = response.data;
                });
        }
        init();

            //event handler definitions
        function addUser(newUser){
            //console.log("Sending "+$scope.form.title);
            //var newUser = $scope.targetUser;
            UserService
                .createUserByAdmin(newUser)
                .then(function(response){
                    console.log("Added "+response.data.username);
                    UserService
                        .findAllUsersByAdmin()
                        .then(function (response){
                            $scope.users = response.data;
                        });
                    $scope.targetUser = null;
                });
        }

        function selectUser(index){
            $scope.targetUser = $scope.users[index];
            //$rootScope.currentForm = $scope.users[index];
            //$scope.form = $rootScope.currentForm;
            console.log("Editing "+ $scope.targetUser.username);
        }

        function updateUser(updUser){
            console.log("Updating "+updUser._id);
            UserService
                .updateUserByAdmin(updUser._id, updUser)
                .then(function (response) {
                    console.log("Updated "+ response.data.username);
                    UserService
                        .findAllUsersByAdmin()
                        .then(function (response){
                            $scope.forms = response.data;
                        });
                    $scope.targetUser = null;
                });
        }

        function deleteUser(index){
            //$rootScope.currentForm = $scope.forms[index];
            var delUser = $scope.users[index];
            UserService
                .deleteUserByIdAdmin(delUser._id)
                .then(function(response){
                    console.log("Deleted "+ delUser.username);
                    UserService
                        .findAllUsersByAdmin()
                        .then(function (response){
                            $scope.users = response.data;
                        });
                });
        }

    }
})();