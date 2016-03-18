module.exports = function(app, formModel, userModel) {
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
        //res.json(user);
    }

    function getFieldByFieldFormId (req, res) {
        var FieldObj;
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        FieldObj = formModel.findFieldByFieldFormId(formId, fieldId);
        res.send(formFields);
        //res.json(user);
    }

    function createFieldForm (req, res) {
        var field = req.body;
        var formId = req.params.formId;
        formsRecd = formModel.createFieldForm(formId,field);
        res.send(formsRecd);
        //res.json(user);
    }

    function updateFieldForm (req, res) {
        var fieldsRecd = [];
        var formId = req.params.formId;
        var fieldId = req.params.formId;
        var field = req.body;
        fieldsRecd = formModel.updateFieldForm(formId, fieldId, field);
        res.send(fieldsRecd);
        //res.json(user);
    }

    function deleteFieldByFieldFormId (req, res) {
        var remFields = [];
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        remFields = formModel.deleteFieldByFieldFormId(formId, fieldId);
        res.send(formFields);
        //res.json(user);
    }
}