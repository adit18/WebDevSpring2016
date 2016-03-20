(function(){
    angular
        .module("customFieldSortable", [])
        .directive("customFieldSortable", customFieldSortable);

    function customFieldSortable() {
        var start = null;
        var end = null;
        function link(scope, element, attributes) {
            var customAxis = attributes.customAxis;
            $(element).sortable({
                axis: customAxis,
                start: function(event, ui) {
                    start = ui.item.index();
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    var temp = scope.users[start];
                    scope.users[start] = scope.users[end];
                    scope.users[end] = temp;
                    scope.$apply();
                }
            });
        }
        return {
            link: link
        }
    }
})();