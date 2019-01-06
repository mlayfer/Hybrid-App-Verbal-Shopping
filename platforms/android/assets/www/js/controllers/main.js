'use strict';
/* App Module */

var app = angular.module('app', [
    'ngRoute',
    'appControllers',
    'appFilters'
]);

var appControllers = angular.module('appControllers', []);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/main', {
                templateUrl: 'partials/main.html',
                controller: 'mainCtrl'
            }).
            when('/inventory', {
                templateUrl: 'partials/inventory.html',
                controller: 'inventoryCtrl'
            }).
            otherwise({
                redirectTo: '/main'
            });
    }]);

app.run(function ($rootScope) {
    $rootScope.isIOS7 = function () {
        if (utilities.isIphone() && window.device && parseFloat(window.device.version) >= 7) {
            return "ios7";
        } else {
            return "";
        }
    };
    document.addEventListener('deviceready', function () {
        setTimeout(function () {
            $rootScope.$broadcast('deviceready', null);
        });

    });
});