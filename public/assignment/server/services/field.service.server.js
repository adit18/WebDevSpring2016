module.exports = function(app, formModel) {
    app.get("/api/assignment/form/:formId/field", getFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldByFieldFormId);
    app.post("/api/assignment/form/:formId/field", createFieldForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFieldFormId);
    app.put("/api/assignment/form/:formId/field", reorderFields);

    var fieldModel   = require("./../models/field.model.server.js")(formModel);

    function getFieldsByFormId (req, res) {
        //var formFields = [];
        var formId = req.params.formId;
        fieldModel.findFieldsByFormId(formId)
            .then(
                function ( fields ) {
                    res.json(fields);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
        //res.send(formFields);
    }

    function getFieldByFieldFormId (req, res) {
        //var FieldObj;
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.findFieldByFieldFormId(formId, fieldId)
            .then(
                function ( field ) {
                    res.json(field);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            )
        //res.send(FieldObj);
    }

    function createFieldForm (req, res) {
        //var formsRecd = [];
        var field = req.body;
        var formId = req.params.formId;
        fieldModel.createFieldForm(formId,field)
            .then(
                function ( form ) {
                    res.json(form.fields);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            )
        //res.send(formsRecd);
    }

    function updateFieldForm (req, res) {
        //var fieldsRecd = [];
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        console.log("Field server service :");
        console.log(field);
        fieldModel.updateFieldForm(formId, fieldId, field)
            .then(
                function ( form ) {
                    res.json(form.fields);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            )
        //res.send(fieldsRecd);
    }

    function deleteFieldByFieldFormId (req, res) {
        //var remFields = [];
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.deleteFieldByFieldFormId(formId, fieldId)
            .then(
                function ( form ) {
                    res.json(form.fields);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            )
        //res.send(remFields);
    }

    function reorderFields (req, res) {
        var formId = req.params.formId;
        var fields = req.body;
        fieldModel.reorderFieldsInForm(formId,fields)
            .then(
                function ( form ) {
                    res.json(form.fields);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }
}