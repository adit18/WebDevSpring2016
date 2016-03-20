(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($scope,$rootScope,$location,FormService,UserService){

        var locUser = $rootScope.currentUser;
        FormService
            .findAllFormsForUser(locUser._id)
            .then(function (response){
                console.log(response.data);
                $scope.forms = response.data;
            });
        $scope.user = $rootScope.currentUser;

        //event handlers declarations
        $scope.addForm = addForm;
        $scope.selectForm = selectForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;

        //event handler definitions
        function addForm(){
            //console.log("Sending "+$scope.form.title);
            var form = $scope.form;
            FormService
                .createFormForUser(locUser._id, form)
                .then(function(response){
                    console.log("Added "+response.data.title);
                    FormService
                        .findAllFormsForUser(locUser._id)
                        .then(function (response){
                            $scope.forms = response.data;
                        });
                });
        }

        function selectForm(index){
            $rootScope.currentForm = $scope.forms[index];
            $scope.form = $rootScope.currentForm;
            console.log("Editing "+ $rootScope.currentForm.title);
        }

        function updateForm(){
            console.log("Updating "+$rootScope.currentForm._id);
            FormService
                .updateFormById($rootScope.currentForm._id, $rootScope.currentForm)
                .then(function (response) {
                    console.log("Updated "+ response.data.title);
                });
            FormService
                .findAllFormsForUser(locUser._id)
                .then(function (response){
                    $scope.forms = response.data;
                });
            $scope.form = null;
            //FormService.setCurrentForm(null);
            //$location.url('/forms');;
            //$scope.inputdefault.$setPristine();
            //$('#inputdefault').reset();
        }

        function deleteForm(index){
            $rootScope.currentForm = $scope.forms[index];
            FormService
                .deleteFormById($rootScope.currentForm._id)
                .then(function(response){
                    console.log("Deleted "+ $rootScope.currentForm.title);
                });
            FormService
                .findAllFormsForUser(locUser._id)
                .then(function (response){
                    $scope.forms = response.data;
                });
        }

    }
})();