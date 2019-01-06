'use strict';
/* Controllers */

appControllers.controller('inventoryCtrl', ['$scope',
    function ($scope) {
        //properties

        $scope.goToList = function () {
            location.href = "#main";
        }

    }]);