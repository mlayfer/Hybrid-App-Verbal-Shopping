'use strict';
/* Controllers */

appControllers.controller('mainCtrl', ['$scope',
    function ($scope) {
        //properties
       
        $scope.goToInventory = function () {
            location.href = "#inventory";
        }

    }]);