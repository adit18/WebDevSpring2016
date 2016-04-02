module.exports = function(app, formModel) {
    app.get("/api/assignment/user/:userId/form", getAllFormsByUser);
    app.get("/api/assignment/form/:formId", getFormById);
    app.post("/api/assignment/user/:userId/form", createFormUser);
    app.put("/api/assignment/form/:formId", updateForm);
    app.delete("/api/assignment/form/:formId", deleteFormById);

    function getAllFormsByUser (req, res) {
        //var allFormsByUser = [];
        var userId = req.params.userId;
        formModel.findAllFormsForUser(userId)
            .then(
                function ( forms ) {
                    res.json(forms);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
        //res.send(allFormsByUser);
    }

    function getFormById (req, res) {
        var formId = req.params.formId;
        var form = formModel.findFormById(formId)
            .then(
                function ( form ) {
                    res.json(form);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
        //res.send(form);
    }

    function createFormUser (req, res) {
        //var formsRecd = [];
        var form = req.body;
        var userId = req.params.userId;
        formModel.createFormForUser(userId,form)
            .then(
                function ( form ) {
                    res.json(form);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
        //res.send(formsRecd);
    }

    function updateForm (req, res) {
        //var formsRecd = [];
        var formId = req.params.formId;
        var form = req.body;
        formModel.updateFormByID(formId, form)
            .then(
                function ( form ) {
                    res.json(form);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
        //res.send(formsRecd);
    }

    function deleteFormById (req, res) {
        //var allForms = [];
        var formId = req.params.formId;
        formModel.deleteFormById(formId)
            .then(
                function ( form ) {
                    res.json(form);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
        //res.send(allForms);
    }
}