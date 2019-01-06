'use strict';
app.directive('repeatDone', function () {
    return function (scope, element, attrs) {
        if (scope.$last) {
            try {
                scope.refreshListview();
            } catch (e) { };
        }
    };
});
app.directive('selectOnClick', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                this.select();
            });
        }
    };
});


/* Directives */