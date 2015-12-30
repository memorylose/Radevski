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
    //service.Submit = function (dropid) {
    //    console.log('drop1:' + dropid);
    //    $http({
    //        method: 'POST',
    //        url: '/webapi/api/home/CreateReceivable',
    //        data: {
    //            //'items': dataArray,
    //            'dropid': dropid
    //        }
    //    })
    //        .success(function (data, status, headers, config) {
    //            if (status === 200) {
    //                return data;
    //            }
    //        });
    //};
    service.Submit = function (dropid, manualist, locationId, sourceId, binTotal, comments) {
        console.log('drop1:' + dropid);
        console.log('location:' + locationId);
        $http.post('/webapi/api/home/CreateReceivable', { dropid: dropid, manualist: manualist, locationId: locationId, sourceId: sourceId, binTotal: binTotal, comments: comments })
        .success(function (response) {
            callback(response);
        });
    };

    return service;
}]);