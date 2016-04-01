var forms = require("./form.mock.json");
var uuid = require('node-uuid');

module.exports = function(db, mongoose) {

    // load user schema
    var FormSchema = require("./form.schema.server.js")(mongoose);

    // create user model from schema
    var FormModel = mongoose.model('Form', FormSchema);

    var api = {
        createFormForUser : createFormForUser,
        findAllForms: findAllForms,
        findAllFormsForUser : findAllFormsForUser,
        findFormById: findFormById,
        findFormByTitle : findFormByTitle,
        updateFormByID : updateFormByID,
        deleteFormById : deleteFormById,
        setCurrentForm : setCurrentForm,
        getCurrentForm : getCurrentForm,
        getMongooseModel : getMongooseModel
    };
    return api;

    function getMongooseModel(){
        return FormModel;
    }

    function createFormForUser(userId, form) {
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        FormModel.create(form, function (err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }
        });

        // return a promise
        return deferred.promise;
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

        var deferred = q.defer();
        UserModel.findOne(
            {_id: userId},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
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

    function updateFormByID(formId,form) {
        for(var u in forms) {
            if( forms[u]._id == formId ) {
                forms.splice(u,1,form);
                return forms;
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