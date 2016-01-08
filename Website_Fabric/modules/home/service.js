'use strict';

angular.module('Home')

.factory('HomeService', ['$http', function ($http) {
    var service = {};
    service.GetLocationType = function () {
        return $http.get('/webapi/api/admin/GetLocationType');
    };
    service.GetLocationByType = function (typeId) {
        return $http.get('/webapi/api/admin/GetLocationByType/' + typeId);
    };
    service.GetDropID = function () {
        return $http.get('/webapi/api/home/GetDropID');
    };
    service.GetCurrentLocation = function () {
        return $http.get('/webapi/api/admin/GetRecLocation');
    };
    service.GetFruitCategory = function () {
        return $http.get('/webapi/api/admin/GetFruitCategory');
    };
    service.GetFruitByCategory = function (id) {
        return $http.get('/webapi/api/admin/GetFruitByCategory/' + id);
    };
    service.GetBin = function () {
        return $http.get('/webapi/api/admin/GetBinType');
    };
    service.Submit = function (dropid, manualist, locationId, sourceId, binTotal, comments, myDate, fruitType, binType, numBin, customerBin, callback) {
        $http.post('/webapi/api/home/CreateReceivable', { dropid: dropid, manualist: manualist, locationId: locationId, sourceId: sourceId, binTotal: binTotal, comments: comments, myDate: myDate, fruitType: fruitType, binType: binType, numBin: numBin, customerBin: customerBin })
        .success(function (response) {
            callback(response);
        });
    };
    return service;
}]);