var forms = require("./form.mock.json");
var uuid = require('node-uuid');
module.exports = function() {
    var api = {
        createFormForUser : createFormForUser,
        findAllForms: findAllForms,
        findAllFormsForUser : findAllFormsForUser,
        findFormById: findFormById,
        findFormByTitle : findFormByTitle,
        updateFormByID : updateFormByID,
        deleteFormById : deleteFormById,
        setCurrentForm : setCurrentForm,
        getCurrentForm : getCurrentForm
    };
    return api;

    function createFormForUser(userId, form) {
        //form._id = (new Date).getTime();
        form._id = uuid.v1();
        form.userId = userId;
        forms.push(form);
        return forms;
        //callback(form);
    }

    function findAllForms() {
        return forms;
        //callback(form);
    }

    function findAllFormsForUser(userId) {
        var userForms = [];
        for(var i in forms){
            if(forms[i].userId === userId){
                userForms.push(forms[i]);
            }
        }
        return userForms;
        //callback(userForms);
    }

    function findFormById(formId) {
        for(var m in forms) {
            if(forms[m]._id === formId) {
                return forms[m];
            }
        }
        return null;
    }

    function findFormByTitle(title) {
        for(var m in forms) {
            if(forms[m].title === title) {
                return forms[m];
            }
        }
        return null;
    }

    function updateFormByID(formId,form) {
        for(var u in forms) {
            if( forms[u]._id === formId ) {
                forms.splice(u,1,form);
                return forms;
            }
        }
        return null;
    }

    function deleteFormById(formId) {
        for(var u in forms) {
            if( forms[u]._id === formId ) {
                //var delForm = forms[u];
                forms.splice(u,1);
                return forms;
                //return mock[u];
            }
        }
        return null;
    }

    function setCurrentForm (form) {
        $rootScope.currentForm = form;
    }

    function getCurrentForm () {
        return $rootScope.currentForm;
    }

}