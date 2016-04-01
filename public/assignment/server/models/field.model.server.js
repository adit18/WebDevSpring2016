module.exports = function(formModel) {

    var Form = formModel.getMongooseModel();

    var api = {
        createFieldForm : createFieldForm,
        findFieldsByFormId : findFieldsByFormId,
        findFieldByFieldFormId : findFieldByFieldFormId,
        deleteFieldByFieldFormId : deleteFieldByFieldFormId,
        updateFieldForm :updateFieldForm
    };
    return api;

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

}