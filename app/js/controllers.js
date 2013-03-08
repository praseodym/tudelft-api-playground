'use strict';

function BuildingsListCtrl($scope, Building) {
    Building.query({}, function (data) {
            $scope.buildings = data.getLocatiesMetComputerRuimtesResponse.locatieLijst.locatie;
            angular.forEach($scope.buildings, function(building) {
               $scope.markers.push({
                   latitude: building.gpscoordinaten['@lat'],
                   longitude: building.gpscoordinaten['@lon'],
                   url: '#/buildings/' + building.locatieCode
               });
            });
            $scope.isMapElementHidden = false;
        });

    angular.extend($scope, {
        center: {
            lat: 51.999021, // initial map center latitude
            lng:  4.37317 // initial map center longitude
        },
        markers: [],
        zoom: 14, // the zoom level
        isMapElementHidden: true
    });
};

//BuildingsListCtrl.$inject = ['$scope', 'Building']

function BuildingDetailCtrl($scope, $routeParams, Workspaces) {
    Workspaces.get({locatieCode: $routeParams.locatieCode}, function (data) {
        $scope.building = data.getWerkplekBeschikbaarheidByLocatieCodeResponse.computerRuimteInformatieLijst.computerRuimteInformatie;
        var parent;
        angular.forEach($scope.building, function(workspace) {
            workspace.name = workspace.ruimte.ruimteId;
            workspace.sub = workspace.name.indexOf('$') != -1;
            if (workspace.sub) {
                workspace.name = workspace.name.substring(workspace.name.indexOf('$')+1);
                parent.subs++;
            }
            else {
                workspace.subs = 1;
                parent = workspace;
            }
            workspace.used = parseInt(workspace.computerGebruik.aantalInGebruik);
            workspace.available = parseInt(workspace.computerGebruik.aantalBeschikbaar);
            workspace.total = workspace.used + workspace.available;
            workspace.usage = 1 - workspace.used / workspace.total;
        });
    })
};

//BuildingDetailCtrl.$inject = ['$scope', '$routeParams', 'Building'];