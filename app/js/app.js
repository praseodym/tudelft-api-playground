'use strict';

angular.module('api-playground', ['buildingApi', 'workspacesApi', 'google-maps']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/buildings', {templateUrl: 'partials/buildings-list.html', controller: BuildingsListCtrl}).
            when('/buildings/:locatieCode', {templateUrl: 'partials/building-detail.html', controller: BuildingDetailCtrl}).
            otherwise({redirectTo: '/buildings'});
    }]);