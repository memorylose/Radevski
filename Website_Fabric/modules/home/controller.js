'use strict';

angular.module('Home')

.controller('HomeController',
    ['$scope', '$rootScope', 'HomeService',
    function ($scope, $rootScope, HomeService) {
        //set bg color and show the menu
        $rootScope.BodySty = 'background-color: white;';
        $rootScope.ShowMenu = true;

        $scope.locNotSelected = true;
        $scope.locnames = [];
        $scope.locnames.unshift({ "LocationId": 0, "LocationName": "-- Select location --" });
        $scope.locName = { selected: 0 };

        $scope.fruitNotSelected = true;
        $scope.fruits = [];
        $scope.fruits.unshift({ "Id": 0, "FruitName": "-- Select location --" });
        $scope.fru = { selected: 0 };

        $scope.CustomerList = [];

        //get drop id
        HomeService.GetDropID().then(function (response) {
            $scope.dropid = response.data;
        });

        //get current location
        HomeService.GetCurrentLocation().then(function (response) {
            $scope.curLocation = response.data;
            $scope.curLocation.unshift({ "LocationId": 0, "LocationName": "-- Select location --" });
            $scope.curLoc = { selected: response.data[0].LocationId };
        });

        //get source
        HomeService.GetLocationType().then(function (response) {
            $scope.locations = response.data;
            $scope.locations.unshift({ "LocationId": 0, "LocationType": "-- Select location --" });
            $scope.loc = { selected: response.data[0].LocationId };
        });

        $scope.locChanged = function (selectedLocationId) {
            HomeService.GetLocationByType(selectedLocationId).then(function (response) {
                if (response.data == '') {
                    $scope.locnames = [];
                    $scope.locnames.unshift({ "LocationId": 0, "LocationName": "-- Select location --" });
                    $scope.locName = { selected: 0 };
                    $scope.locNotSelected = true;
                }
                else {
                    $scope.locNotSelected = false;
                    $scope.locnames = response.data;
                    $scope.locName = { selected: response.data[0].LocationId };
                }
            });
        };

        //get fruit category
        HomeService.GetFruitCategory().then(function (response) {
            $scope.fruitCategories = response.data;
            $scope.fruitCategories.unshift({ "CategoryId": 0, "CategoryName": "-- Select location --" });
            $scope.fc = { selected: response.data[0].CategoryId };
        });

        $scope.fruitChanged = function (selectedFruitId) {
            HomeService.GetFruitByCategory(selectedFruitId).then(function (response) {
                if (response.data == '') {
                    console.log('emoty' + selectedFruitId);
                    $scope.fruits = [];
                    $scope.fruits.unshift({ "Id": 0, "FruitName": "-- Select location --" });
                    $scope.fru = { selected: 0 };
                    $scope.fruitNotSelected = true;
                }
                else {
                    $scope.fruitNotSelected = false;
                    $scope.fruits = response.data;
                    $scope.fru = { selected: response.data[0].Id };
                }
            });
        };

        //get bin
        HomeService.GetBin().then(function (response) {
            $scope.bins = response.data;
            $scope.bins.unshift({ "Id": 0, "TypeName": "-- Select location --" });
            $scope.bi = { selected: response.data[0].Id };
        });

        //add in list
        $scope.addlist = function () {
            if ($scope.manualList == null) {
                $scope.manualList = [
                    {
                        fruitCate: $scope.fc.selected,
                        fruitType: $scope.fru.selected,
                        binType: $scope.bi.selected,
                        numBin: $scope.numberBin,
                        customerBin: '0',
                    }
                ];
            }
            else {
                $scope.manualList.push({ "fruitCate": $scope.fc.selected, "fruitType": $scope.fru.selected, "binType": $scope.bi.selected, "numBin": $scope.numberBin, "customerBin": '0' });
            }
        };

        $scope.Submit = function () {
            HomeService.Submit($scope.dropid, $scope.manualList, $scope.curLoc.selected, $scope.locName.selected, $scope.bintotal, $scope.comments, function (response) {
            });
        };

    }]);