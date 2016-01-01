'use strict';

angular.module('Home')

.controller('HomeController',
    ['$scope', '$rootScope', 'HomeService', '$mdDialog', '$interval', '$timeout', '$location', '$route',
    function ($scope, $rootScope, HomeService, $mdDialog, $interval, $timeout, $location, $route) {
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
            HomeService.Submit($scope.dropid, $scope.manualList, $scope.curLoc.selected, $scope.locName.selected, $scope.bintotal, $scope.comments, $scope.myDate, function (response) {
            });
        };

        //common alert
        $scope.showAlert = function (ev) {
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('This is an alert title')
                .textContent('You can specify some description text in here.')
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
            );
        };

        //confirm alert
        $scope.showConfirm = function (ev) {
            var confirm = $mdDialog.confirm()
                  .title('Are you sure to submit all forms?')
                  .textContent('All the information will be submited.')
                  .ariaLabel('Lucky day')
                  .targetEvent(ev)
                  .ok('Do it')
                  .cancel('Not now');
            $mdDialog.show(confirm).then(function () {
                $scope.IsProcess = true;
                $scope.IsSubmitBtn = true;

                $timeout(function () {
                    HomeService.Submit($scope.dropid, $scope.manualList, $scope.curLoc.selected, $scope.locName.selected, $scope.bintotal, $scope.comments, $scope.myDate, function (response) {
                        if (response == true) {
                            $scope.IsProcess = false;
                            $scope.IsSubmitBtn = false;

                            $mdDialog.show(
                                $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .title('Successfully!')
                                .textContent('Your information has been submited successfully.')
                                .ariaLabel('Alert Dialog Demo')
                                .ok('Ok')
                                //.targetEvent(ev)
                            ).then(function () {
                                $route.reload();
                            });
                        }
                    });
                }, 3000);
            }, function () {
                //cancel
            });
        };

        //date
        $scope.myDate = new Date();

        //process
        var self = this, j = 0, counter = 0;

        self.mode = 'query';
        self.activated = true;
        self.determinateValue = 30;
        self.determinateValue2 = 30;

        self.modes = [];

        /**
         * Turn off or on the 5 themed loaders
         */
        self.toggleActivation = function () {
            if (!self.activated) self.modes = [];
            if (self.activated) {
                j = counter = 0;
                self.determinateValue = 30;
                self.determinateValue2 = 30;
            }
        };

        $interval(function () {
            self.determinateValue += 1;
            self.determinateValue2 += 1.5;

            if (self.determinateValue > 100) self.determinateValue = 30;
            if (self.determinateValue2 > 100) self.determinateValue2 = 30;

            // Incrementally start animation the five (5) Indeterminate,
            // themed progress circular bars

            if ((j < 2) && !self.modes[j] && self.activated) {
                self.modes[j] = (j == 0) ? 'buffer' : 'query';
            }
            if (counter++ % 4 == 0) j++;

            // Show the indicator in the "Used within Containers" after 200ms delay
            if (j == 2) self.contained = "indeterminate";

        }, 100, 0, true);

        $interval(function () {
            self.mode = (self.mode == 'query' ? 'determinate' : 'query');
        }, 7200, 0, true);
    }]);