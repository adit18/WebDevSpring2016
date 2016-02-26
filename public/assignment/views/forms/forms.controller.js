(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($scope,$rootScope,$location,FormService,UserService){

        var locUser = UserService.getCurrentUser();
        FormService.findAllFormsForUser(locUser.userId, function (forms){
            $scope.forms = forms;
        });

        //event handlers declarations
        $scope.addForm = addForm;
        $scope.selectForm = selectForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;

        //event handler delarations
        function addForm(){
            //console.log("Sending "+$scope.form.title);
            var form = $scope.form;
            FormService.createFormForUser(locUser._id, form, function(form){
                console.log("Added "+form.title);
            });
        }

        function selectForm(index){
            $rootScope.currentForm = $scope.forms[index];
            $scope.form = $rootScope.currentForm;
            console.log("Editing"+ $rootScope.currentForm.title);
        }

        function updateForm(){
            FormService.updateFormById($rootScope.currentForm._id, $rootScope.currentForm, function (form) {
                console.log("Updated"+ form.title);
            });
        }

        function deleteForm(index){
            $rootScope.currentForm = $scope.forms[index];
            FormService.deleteFormById($rootScope.currentForm._id, function(forms){
                console.log("Deleted"+ $rootScope.currentForm.title);
            });
        }

    }
})();