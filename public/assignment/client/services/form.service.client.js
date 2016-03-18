(function()
{
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http, $rootScope)
    {
        var service = {
            createFormForUser : createFormForUser,
            findAllFormsForUser : findAllFormsForUser,
            deleteFormById : deleteFormById,
            updateFormById : updateFormById,
            setCurrentForm : setCurrentForm,
            getCurrentForm : getCurrentForm
        };

        return service;

        function createFormForUser(userId, form)
        {
            //form.userId = userId;
            return $http.post("/api/assignment/user/"+userId+"/form", form);
        }

        function findAllFormsForUser(userId)
        {
            return $http.get("/api/assignment/user/"+userId+"/form");
        }

        function deleteFormById(formId)
        {
            return $http.delete("/api/assignment/form/"+formId);
        }

        function updateFormById(formId, form)
        {
            return $http.put("/api/assignment/form/"+formId, form);
        }

        function setCurrentForm (form) {
            $rootScope.currentForm = form;
        }

        function getCurrentForm () {
            return $rootScope.currentForm;
        }
    }
})();