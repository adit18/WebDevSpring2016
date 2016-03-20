module.exports = function(app, formModel) {
    app.get("/api/assignment/form/:formId/field", getFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldByFieldFormId);
    app.post("/api/assignment/form/:formId/field", createFieldForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFieldFormId);

    function getFieldsByFormId (req, res) {
        var formFields = [];
        var formId = req.params.formId;
        formFields = formModel.findFieldsByFormId(formId);
        res.send(formFields);
    }

    function getFieldByFieldFormId (req, res) {
        var FieldObj;
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        FieldObj = formModel.findFieldByFieldFormId(formId, fieldId);
        res.send(FieldObj);
    }

    function createFieldForm (req, res) {
        var formsRecd = [];
        var field = req.body;
        var formId = req.params.formId;
        formsRecd = formModel.createFieldForm(formId,field);
        res.send(formsRecd);
    }

    function updateFieldForm (req, res) {
        var fieldsRecd = [];
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        fieldsRecd = formModel.updateFieldForm(formId, fieldId, field);
        res.send(fieldsRecd);
    }

    function deleteFieldByFieldFormId (req, res) {
        var remFields = [];
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        remFields = formModel.deleteFieldByFieldFormId(formId, fieldId);
        res.send(remFields);
    }
}