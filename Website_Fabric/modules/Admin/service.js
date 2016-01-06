'use strict';

angular.module('Admin')
//var service = {};
//infoApp.factory('HomeService', ['homeHttpService', '$q', function (homeHttpService, $q) {
//    //var service = {};
//    service.GetFruit = function () {
//        var defer = $q.defer();
//        homeHttpService.GetFruitService().then(function (response) {
//            defer.resolve(response);
//        });
//        return defer.promise;
//    };
//    return service;
//}]);

//call web api
.factory('AdminService', ['$http', function ($http) {
    var service = {};

    //fruit
    //service.GetFruit = function (callback) {
    //    $http.get('/webapi/api/admin/GetFruit')
    //        .success(function (response) {
    //            callback(response);
    //        });
    //};
    service.GetFruit = function () {
        return $http.get('/webapi/api/admin/GetFruit');
    };

    service.AddFruit = function (fruitModel) {
        return $http({
            method: 'POST',
            url: '/webapi/api/admin/AddFruit',
            data: fruitModel
        });
    };

    service.EditFruit = function (model) {
        return $http({
            method: 'POST',
            url: '/webapi/api/admin/EditFruit',
            data: model
        });
    };

    service.DeleteFruit = function (id) {
        return $http.get('/webapi/api/admin/DeleteFruit/' + id);
    };

    //fruit category
    service.AddFruitCategory = function (fruitModel) {
        return $http({
            method: 'POST',
            url: '/webapi/api/admin/AddFruitCategory',
            data: fruitModel
        });
    };
    service.GetFruitCategory = function () {
        return $http.get('/webapi/api/admin/GetFruitCategory');
    };
    service.EditFruitCategory = function (model) {
        return $http({
            method: 'POST',
            url: '/webapi/api/admin/EditFruitCategory',
            data: model
        });
    };
    service.DeleteFruitCategory = function (id) {
        return $http.get('/webapi/api/admin/DeleteFruitCategory/' + id);
    };

    //location type
    service.AddLocationType = function (fruitModel) {
        return $http({
            method: 'POST',
            url: '/webapi/api/admin/AddLocationType',
            data: fruitModel
        });
    };
    service.GetLocationType = function () {
        return $http.get('/webapi/api/admin/GetLocationType');
    };
    service.EditLocationType = function (model) {
        return $http({
            method: 'POST',
            url: '/webapi/api/admin/EditLocationType',
            data: model
        });
    };
    service.DeleteLocationType = function (id) {
        return $http.get('/webapi/api/admin/DeleteLocationType/' + id);
    };

    //location
    service.AddLocation = function (model) {
        return $http({
            method: 'POST',
            url: '/webapi/api/admin/AddLocation',
            data: model
        });
    };
    service.GetLocation = function () {
        return $http.get('/webapi/api/admin/GetLocation');
    };
    service.EditLocation = function (model) {
        return $http({
            method: 'POST',
            url: '/webapi/api/admin/EditLocation',
            data: model
        });
    };
    service.DeleteLocation = function (id) {
        return $http.get('/webapi/api/admin/DeleteLocation/' + id);
    };

    //Bin type
    service.AddBin = function (model) {
        return $http({
            method: 'POST',
            url: '/webapi/api/admin/AddBinType',
            data: model
        });
    };
    service.GetBin = function () {
        return $http.get('/webapi/api/admin/GetBinType');
    };
    service.EditBin = function (model) {
        return $http({
            method: 'POST',
            url: '/webapi/api/admin/EditBin',
            data: model
        });
    };
    service.DeleteBin = function (id) {
        return $http.get('/webapi/api/admin/DeleteBin/' + id);
    };

    //Users
    service.AddUser = function (model) {
        return $http({
            method: 'POST',
            url: '/webapi/api/user/CreateUser',
            data: model
        });
    };
    service.GetUser = function () {
        return $http.get('/webapi/api/user/GetUsers');
    };
    //service.EditBin = function (model) {
    //    return $http({
    //        method: 'POST',
    //        url: '/webapi/api/admin/EditBin',
    //        data: model
    //    });
    //};
    service.DeleteUser = function (id) {
        return $http.get('/webapi/api/user/DeleteUser/' + id);
    };

    //Receiver location
    service.AddRecLocation = function (model) {
        return $http({
            method: 'POST',
            url: '/webapi/api/admin/AddRecLocation',
            data: model
        });
    };
    service.GetRecLocation = function (callback) {
        return $http.get('/webapi/api/admin/GetRecLocation');
    };
    service.EditRecLocation = function (model) {
        return $http({
            method: 'POST',
            url: '/webapi/api/admin/EditRecLocation',
            data: model
        });
    };
    service.DeleteRecLocation = function (id) {
        return $http.get('/webapi/api/admin/DeleteRecLocation/' + id);
    };

    return service;
}]);