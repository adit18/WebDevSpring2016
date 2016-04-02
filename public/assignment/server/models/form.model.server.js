//var forms = require("./form.mock.json");
var uuid = require('node-uuid');
// load q promise library
var q = require("q");

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
        form["userId"] = userId;
        FormModel.create (form, function (err, form) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(form);
                }
            });
        return deferred.promise;
    }

    function findAllForms() {
        var deferred = q.defer();

        // find all users
        FormModel.find(function (err, allforms) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(allforms);
            }
        });

        return deferred.promise;
    }

    function findAllFormsForUser(userId) {
        var deferred = q.defer();
        FormModel
            .find({userId: userId},
                function (err, forms) {
                    if (err) {
                        deferred.reject (err);
                    } else {
                        deferred.resolve (forms);
                    }
                });
        return deferred.promise;
    }

    function findFormById(formId) {
        var deferred = q.defer();

        FormModel
            .findById(formId,
                function (err, form) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(form);
                    }
                });
        return deferred.promise;
    }

    function findFormByTitle(title) {
        var deferred = q.defer();
        FormModel
            .findOne({title: title},
                function (err, form) {
                    if (err) {
                        deferred.reject (err);
                    } else {
                        deferred.resolve (forms);
                    }
                });
        return deferred.promise;
    }

    function updateFormByID(formId,formObj) {
        var deferred = q.defer();
        FormModel
            .findById(formId,
            function(err, form) {
                if (err) {
                    deferred.reject(err);
                } else {
                    console.log("Inside Update Form: ");
                    console.log(JSON.stringify(form));
                    form.userId = formObj.userId;
                    form.title = formObj.title;
                    form.fields = formObj.fields;
                    form.save(function (err, updForm) {
                        if (err) {
                            deferred.reject(err);
                        }
                        else {
                            deferred.resolve(updForm);
                        }
                    });
                    console.log("Resolved Form!");
                }

            });
        return deferred.promise;
    }

    function deleteFormById(formId) {
        var deferred = q.defer();
        FormModel.remove(
            {_id: formId},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function setCurrentForm (form) {
        $rootScope.currentForm = form;
    }

    function getCurrentForm () {
        return $rootScope.currentForm;
    }

}