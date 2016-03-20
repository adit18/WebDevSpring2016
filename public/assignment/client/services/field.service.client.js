(function()
{
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http, $rootScope)
    {
        var service = {
            createFieldForForm : createFieldForForm,
            getFieldsForForm : getFieldsForForm,
            getFieldForForm : getFieldForForm,
            deleteFieldFromForm : deleteFieldFromForm,
            updateField : updateField,
            setCurrentForm : setCurrentForm,
            getCurrentForm : getCurrentForm
        };

        return service;

        function createFieldForForm(formId, field)
        {
            //form.userId = userId;
            return $http.post("/api/assignment/form/"+formId+"/field/", field);
        }

        function getFieldsForForm(formId)
        {
            return $http.get("/api/assignment/form/"+formId+"/field");
        }

        function getFieldForForm(formId, fieldId)
        {
            return $http.get("/api/assignment/form/"+formId+"/field/"+fieldId);
        }

        function deleteFieldFromForm(formId, fieldId)
        {
            return $http.delete("/api/assignment/form/"+formId+"/field/"+fieldId);
        }

        function updateField(formId, fieldId, field)
        {
            return $http.put("/api/assignment/form/"+formId+"/field/"+fieldId, field);
        }

        function setCurrentForm (form) {
            $rootScope.currentForm = form;
        }

        function getCurrentForm () {
            return $rootScope.currentForm;
        }
    }
})();