'use strict';

var apiRoot = 'http://localhost\\:8080/v0/';

angular.module('buildingApi', ['ngResource']).
    factory('Building', function($resource){
        return $resource(apiRoot + 'gebouwen/:locatieCode?computerlokaal=true', {}, {
            query: {method: 'GET', params: {locatieCode: ''}},
            get: {method: 'GET'}
        });
    });

angular.module('workspacesApi', ['ngResource']).
    factory('Workspaces', function($resource){
        return $resource(apiRoot + 'werkplekken/:locatieCode', {}, {
            get: {method: 'GET'}
        });
    });