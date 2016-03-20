module.exports = function(app, formModel) {
    app.get("/api/assignment/user/:userId/form", getAllFormsByUser);
    app.get("/api/assignment/form/:formId", getFormById);
    app.post("/api/assignment/user/:userId/form", createFormUser);
    app.put("/api/assignment/form/:formId", updateForm);
    app.delete("/api/assignment/form/:formId", deleteFormById);

    function getAllFormsByUser (req, res) {
        var allFormsByUser = [];
        var userId = req.params.userId;
        allFormsByUser = formModel.findAllFormsForUser(userId);
        res.send(allFormsByUser);
    }

    function getFormById (req, res) {
        var formId = req.params.formId;
        var form = formModel.findFormById(formId);
        res.send(form);
    }

    function createFormUser (req, res) {
        var formsRecd = [];
        var form = req.body;
        var userId = req.params.userId;
        formsRecd = formModel.createFormForUser(userId,form);
        res.send(formsRecd);
    }

    function updateForm (req, res) {
        var formsRecd = [];
        var formId = req.params.formId;
        var form = req.body;
        formsRecd = formModel.updateFormByID(formId, form);
        res.send(formsRecd);
    }

    function deleteFormById (req, res) {
        var allForms = [];
        var formId = req.params.formId;
        allForms = formModel.deleteFormById(formId);
        res.send(allForms);
    }
}