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
        return $http.get('/webapi/api/admin/GetLocation');
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
    service.Submit = function (dataArray) {
        $http({
            method: 'POST',
            url: '/webapi/api/home/CreateReceivable',
            data: {
                'items': dataArray
            },
            headers: {
                "Content-Type": "application/json"
            }
        })
            .success(function (data, status, headers, config) {
                if (status === 200) {
                    return data;
                }
            });
    };

    return service;
}]);