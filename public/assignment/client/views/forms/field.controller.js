(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController($scope,$routeParams,FieldService,FormService){

        var formId = $routeParams.formId;
        FormService
            .findFormById(formId)
            .then(function (response){
                $scope.form = response.data;
            });

        FieldService
            .getFieldsForForm(formId)
            .then(function (response){
                $scope.fields = response.data;
            });

        //event handlers declarations
        $scope.addField = addField;
        $scope.editField = editField;
        $scope.updateField = updateField;
        $scope.removeField = removeField;

        //event handler definitions
        function addField(fieldType){
            console.log("Sending "+$scope.selectedOption);
            var newField = {};

            //Handling different field types:
            switch ($scope.selectedOption) {
                case "STXT":
                    //alert("Selected Case Number is STXT");
                    newField = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    break;
                case "MTXT":
                    newField = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                    //alert("Selected Case Number is MTXT");
                    break;
                case "DATE":
                    newField = {"_id": null, "label": "New Date Field", "type": "DATE"};
                    //alert("Selected Case Number is MTXT");
                    break;
                case "DROP":
                    newField = {"_id": null, "label": "New Dropdown", "type": "DROPDOWN", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]};
                    //alert("Selected Case Number is MTXT");
                    break;
                case "CHK":
                    newField = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]};
                    //alert("Selected Case Number is MTXT");
                    break;
                case "RAD":
                    newField = {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]};
                    //alert("Selected Case Number is MTXT");
                    break;
                default:
                    //alert("Selected Case Number is others");
                    break;
            }

            FieldService
                .createFieldForForm($routeParams.formId, newField)
                .then(function(response){
                    console.log("Added "+newField.label);
                    //$scope.fields = response.data;
                    FieldService
                        .getFieldsForForm($routeParams.formId)
                        .then(function (response){
                            $scope.fields = response.data;
                        });
                });
        }

        function editField(field){
            $scope.sub = field;
            var locOptions = [];
            locOptions = field.options;

            //Handling different field types:
            if(field.type == "DROPDOWN" || field.type == "CHECKBOXES" || field.type == "RADIOS"){
                $scope.sub.options = locOptions.map(function (element){
                    return element.label+":"+element.value;
                }).join('\n');
            }
            console.log("Editing "+ field.label);
        }

        function updateField(field){
            var tempOptions = field.options;
            var regEx = /[\n,]+/ ;
            var optionLines = tempOptions.toString().split(regEx);
            var formatOptions =[];
            for(var a in optionLines){
                var obj = {};
                var keyVal = optionLines[a].toString().split(":");
                obj["label"] = keyVal[0];
                obj["value"] = keyVal[1];
                formatOptions.push(obj);
            }

            //Validation
            //console.log("ops: "+formatOptions);
            //for(var a in formatOptions){
            //    console.log(formatOptions[a].label);
            //    console.log(formatOptions[a].value);
            //}

            field.options = formatOptions;
            FieldService
                .updateField($routeParams.formId, field._id, field)
                .then(function(response){
                    console.log("Updated "+field.label);
                    $scope.fields = response.data;
                });
        }

        function removeField(field){
            FieldService
                .deleteFieldFromForm($routeParams.formId, field._id)
                .then(function(response){
                    console.log("Deleted "+field.label);
                    //$scope.fields = response.data;
                    FieldService
                        .getFieldsForForm($routeParams.formId)
                        .then(function (response){
                            $scope.fields = response.data;
                        });
                });
        }

    }
})();