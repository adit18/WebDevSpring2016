var forms = require("./form.mock.json");
var uuid = require('node-uuid');
module.exports = function() {
    var api = {
        createFormForUser : createFormForUser,
        createFieldForm : createFieldForm,
        findAllForms: findAllForms,
        findAllFormsForUser : findAllFormsForUser,
        findFormById: findFormById,
        findFormByTitle : findFormByTitle,
        findFieldsByFormId : findFieldsByFormId,
        findFieldByFieldFormId : findFieldByFieldFormId,
        deleteFieldByFieldFormId : deleteFieldByFieldFormId,
        updateFormByID : updateFormByID,
        updateFieldForm :updateFieldForm,
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
    }

    function createFieldForm(formId, field) {
        field._id = uuid.v1();
        for(var i in forms){
            if(forms[i]._id == formId){
                forms[i].fields.push(field);
                return forms[i].fields;
            }
        }
        return null;
    }

    function findAllForms() {
        return forms;
    }

    function findAllFormsForUser(userId) {
        var userForms = [];
        for(var i in forms){
            if(forms[i].userId == userId){
                userForms.push(forms[i]);
            }
        }
        return userForms;
    }

    function findFormById(formId) {
        for(var m in forms) {
            if(forms[m]._id == formId) {
                return forms[m];
            }
        }
        return null;
    }

    function findFormByTitle(title) {
        for(var m in forms) {
            if(forms[m].title == title) {
                return forms[m];
            }
        }
        return null;
    }

    function findFieldsByFormId(formId) {
        for(var i in forms){
            if(forms[i]._id == formId){
                return forms[i].fields;
            }
        }
        return null;
    }

    function findFieldByFieldFormId(formId, fieldId) {
        for(var i in forms){
            if(forms[i]._id == formId){
                var iterFields = forms[i].fields;
                for(var f in iterFields){
                    if(iterFields[f]._id == fieldId){
                        return iterFields[f];
                    }
                }
            }
        }
        return null;
    }

    function updateFormByID(formId,form) {
        for(var u in forms) {
            if( forms[u]._id == formId ) {
                forms.splice(u,1,form);
                return forms;
            }
        }
        return null;
    }

    function updateFieldForm(formId,fieldId,field) {
        for(var u in forms) {
            if(forms[u]._id == formId){
                for(var f in forms[u].fields){
                    if(forms[u].fields[f]._id == fieldId){
                        forms[u].fields.splice(f,1,field);
                        return forms[u].fields;
                    }
                }
            }
        }
        return null;
    }

    function deleteFieldByFieldFormId(formId, fieldId) {
        for(var i in forms){
            if(forms[i]._id == formId){
                for(var f in forms[i].fields){
                    if(forms[i].fields[f]._id == fieldId){
                        forms[i].fields.splice(f,1);
                        return forms[i].fields;
                    }
                }
            }
        }
        return null;
    }

    function deleteFormById(formId) {
        for(var u in forms) {
            if( forms[u]._id == formId ) {
                forms.splice(u,1);
                return forms;
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