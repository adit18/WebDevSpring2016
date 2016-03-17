(function()
{
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($rootScope)
    {
        var forms = [];
        forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];

        var service = {
            createFormForUser : createFormForUser,
            findAllFormsForUser : findAllFormsForUser,
            deleteFormById : deleteFormById,
            updateFormById : updateFormById,
            setCurrentForm : setCurrentForm,
            getCurrentForm : getCurrentForm
        };

        return service;

        function createFormForUser(userId, form, callback)
        {
            form._id = (new Date).getTime();
            form.userId = userId;
            forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId, callback)
        {
            var userForms = [];
            for(var i in forms){
                if(forms[i].userId == userId){
                    userForms.push(forms[i]);
                }
            }
            callback(userForms);
        }

        function deleteFormById(formId, callback)
        {
            for(var i in forms){
                if(forms[i]._id == formId) {
                    forms.splice(i,1);
                    break;
                }
            }
            callback(forms);
        }

        function updateFormById(formId, form, callback)
        {
            for(var i in forms){
                if(forms[i]._id == formId) {
                    forms.splice(i,1,form);
                    break;
                }
            }
            callback(forms[i]);
        }

        function setCurrentForm (form) {
            $rootScope.currentForm = form;
        }

        function getCurrentForm () {
            return $rootScope.currentForm;
        }
    }
})();