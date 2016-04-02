// load q promise library
var q = require("q");

module.exports = function(formModel) {

    var Form = formModel.getMongooseModel();

    var api = {
        createFieldForm : createFieldForm,
        findFieldsByFormId : findFieldsByFormId,
        findFieldByFieldFormId : findFieldByFieldFormId,
        deleteFieldByFieldFormId : deleteFieldByFieldFormId,
        updateFieldForm : updateFieldForm,
        reorderFieldsInForm : reorderFieldsInForm
    };
    return api;

    function createFieldForm(formId, field) {
        var deferred = q.defer();

        Form.findById(formId,
            function(err, form) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    var teObj = {};
                    teObj.label = field.label;
                    teObj.type = field.type;
                    teObj.placeholder = field.placeholder;
                    teObj.options = field.options;
                    form.fields.push(teObj);
                    form.save(function (err, updForm) {
                        if (err) {
                            deferred.reject(err);
                        }
                        else {
                            deferred.resolve(updForm);
                        }
                    });
                }
            });
        return deferred.promise;
    }

    function findFieldsByFormId(formId) {
        //return Form.findById(formId).select("fields");
        var deferred = q.defer();

        Form
            .findById(formId,
                function (err, form) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(form.fields);
                    }
                });
        return deferred.promise;
    }

    function findFieldByFieldFormId(formId, fieldId) {
        var deferred = q.defer();
        Form
            .findById(formId,
                function(err, form) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(form.fields.id(fieldId));
                    }
                });
        return deferred.promise;
    }

    function updateFieldForm(formId,fieldId,fieldObj) {
        var deferred = q.defer();
        Form
            .findById(formId,
                function(err, form) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        var field = form.fields.id(fieldId);
                        field.label = fieldObj.label;
                        field.type = fieldObj.type;
                        field.placeholder = fieldObj.placeholder;
                        field.options = fieldObj.options;
                        form.save(function (err, updForm) {
                            if (err) {
                                deferred.reject(err);
                            }
                            else {
                                deferred.resolve(updForm);
                            }
                        });
                    }
                });
        return deferred.promise;
    }

    function deleteFieldByFieldFormId(formId, fieldId) {
        var deferred = q.defer();
        Form
            .findById(formId,
                function(err, form) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        form.fields.id(fieldId).remove();
                        form.save(function (err, updForm) {
                            if (err) {
                                deferred.reject(err);
                            }
                            else {
                                deferred.resolve(updForm);
                            }
                        });
                    }
                });
        return deferred.promise;
    }

    function reorderFieldsInForm(formId, newfields) {
        var deferred = q.defer();
        Form
            .findById(formId,
                function(err, form) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        form.fields = newfields;
                        form.save(function (err, updForm) {
                            if (err) {
                                deferred.reject(err);
                            }
                            else {
                                deferred.resolve(updForm);
                            }
                        });
                    }
                });
        return deferred.promise;
    }

}