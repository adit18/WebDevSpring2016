(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController($scope,$routeParams,$rootScope,$location,FieldService,FormService){

        var formId = $routeParams.formId;
        FormService
            .findFormById(formId)
            .then(function (response){
                $scope.form = response.data;
            });

        FieldService
            .getFieldsForForm(formId)
            .then(function (response){
                $scope.fields = response.data;
            });

        //event handlers declarations
        $scope.addField = addField;
        $scope.selectField = selectField;
        $scope.updateField = updateField;
        $scope.deleteField = deleteField;

        //event handler delarations
        function addField(fieldType){
            //console.log("Sending "+$scope.form.title);
            var newField = $scope.newField;
            FieldService
                .createFieldForForm($routeParams.formId, newField)
                .then(function(response){
                    console.log("Added "+response.data.title);
                    FieldService
                        .getFieldsForForm($routeParams.formId)
                        .then(function (response){
                            $scope.fields = response.data;
                        });
                });
        }

        function selectField(index){
            $rootScope.currentForm = $scope.forms[index];
            $scope.form = $rootScope.currentForm;
            console.log("Editing "+ $rootScope.currentForm.title);
        }

        function updateField(){
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

        function deleteField(index){
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