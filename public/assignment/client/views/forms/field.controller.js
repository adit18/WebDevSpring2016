(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController($scope,$routeParams,$rootScope,$location,FieldService,FormService){

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

        //event handler delarations
        function addField(fieldType){
            console.log("Sending "+$scope.selectedOption);
            //console.log("Field: "+fieldType);
            //console.log("OptionVal: "+$scope.selectedOption.value);
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
            $scope.field = field;
            //Handling different field types:
            if(field.type == "DROPDOWN" || field.type == "CHECKBOXES" || field.type == "RADIOS"){
                $scope.fieldData = field.options.map(function (element){
                    return element.label+":"+element.value
                }).join('\n');
                //$scope.field.options = JSON.stringify(field.options);
            }
            console.log("Editing "+ field.label);
        }

        function updateField(field){
            console.log($scope.fieldData);
            //field.options = JSON.parse($scope.fieldData);

            var temp = $scope.fieldData;
            var re = /[\n,]+/ ;
            var arrLines = temp.toString().split(re);
            var opt =[];
            for(var a in arrLines){
                var obj = {};
                var keyVal = arrLines[a].toString().split(":");
                obj["label"] = keyVal[0];
                obj["value"] = keyVal[1];
                opt.push(obj);
            }

            field.options = opt;
            //console.log("op: "+opt);
            console.log("Field Options: "+field.options);
            //console.log("Updating "+field.label);
            //console.log("Updatingo "+field.options[0].value);
            FieldService
                .updateField($routeParams.formId, field._id, field)
                .then(function(response){
                    console.log("Updated "+field.label);
                    $scope.fields = response.data;
                    //instead of this:
                });
            FieldService
                .getFieldsForForm($routeParams.formId)
                .then(function (response){
                    $scope.fields = response.data;

                });
        }

        function removeField(field){
            //$rootScope.currentForm = $scope.forms[index];
            //alert("Selected Case Number is STXT");
            console.log("RemField: "+field.label);
            console.log("RemField ID: "+field._id);

            FieldService
                .deleteFieldFromForm($routeParams.formId, field._id)
                .then(function(response){
                    console.log("Deleted "+field.label);
                    //$scope.fields = response.data;
                    //instead of this:
                    FieldService
                        .getFieldsForForm($routeParams.formId)
                        .then(function (response){
                            $scope.fields = response.data;
                        });
                });
        }

    }
})();