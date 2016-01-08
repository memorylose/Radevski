'use strict';

angular.module('Home')

.controller('HomeController',
    ['$scope', '$rootScope', 'HomeService', '$mdDialog', '$interval', '$timeout', '$location', '$route', '$filter',
    function ($scope, $rootScope, HomeService, $mdDialog, $interval, $timeout, $location, $route, $filter) {
        //get current user
        $rootScope.Username = $rootScope.globals.currentUser.username;

        //set bg color
        $rootScope.bgFlag = -1;

        //show menu
        $rootScope.ShowMenu = true;

        //second source and fruit type are not selected
        $scope.locNotSelected = true;
        $scope.fruitNotSelected = true;

        //set location default value
        $scope.locnames = [];
        $scope.locnames.unshift({ "LocationId": 0, "LocationName": "-- Select source --" });
        $scope.locName = { selected: 0 };

        //set fruit default value
        $scope.fruits = [];
        $scope.fruits.unshift({ "Id": 0, "FruitName": "-- Select fruit --" });
        $scope.fru = { selected: 0 };

        //set customer bin default value
        $scope.customerCkBox = false;

        //intialize date
        $scope.myDate = new Date();

        //get drop id
        HomeService.GetDropID().then(function (response) {
            $scope.dropid = response.data;
        });

        //get current location
        HomeService.GetCurrentLocation().then(function (response) {
            $scope.curLocation = response.data;
            $scope.curLocation.unshift({ "Id": 0, "Name": "-- Select warehouse --" });
            $scope.curLoc = { selected: response.data[0].Id };
        });

        //get source
        HomeService.GetLocationType().then(function (response) {
            $scope.locations = response.data;
            $scope.locations.unshift({ "LocationId": 0, "LocationType": "-- Select source --" });
            $scope.loc = { selected: response.data[0].LocationId };
        });

        //location changed
        $scope.locChanged = function (selectedLocationId) {
            HomeService.GetLocationByType(selectedLocationId).then(function (response) {
                if (response.data == '') {
                    $scope.locnames = [];
                    $scope.locnames.unshift({ "LocationId": 0, "LocationName": "-- Select source --" });
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
            $scope.fruitCategories.unshift({ "CategoryId": 0, "CategoryName": "-- Select fruit --" });
            $scope.fc = { selected: response.data[0].CategoryId };

        });

        //fruit changed
        $scope.fruitChanged = function (selectedFruitId) {
            HomeService.GetFruitByCategory(selectedFruitId).then(function (response) {
                if (response.data == '') {
                    $scope.fruits = [];
                    $scope.fruits.unshift({ "Id": 0, "FruitName": "-- Select fruit --" });
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
            $scope.bins.unshift({ "Id": 0, "TypeName": "-- Select bin type --" });
            $scope.bi = { selected: response.data[0].Id };
        });

        var manualBinCount = 0;

        //add to manual list
        $scope.addlist = function () {
            var fruitValue = $filter("filter")($scope.fruitCategories, { CategoryId: $scope.fc.selected });
            var fruitCateValue = $filter("filter")($scope.fruits, { Id: $scope.fru.selected });
            var binValue = $filter("filter")($scope.bins, { Id: $scope.bi.selected });
            manualBinCount += parseInt($scope.numberBin);

            if ($scope.manualList == null) {
                $scope.manualList = [
                    {
                        fruitCate: fruitValue[0].CategoryName,
                        fruitType: $scope.fru.selected,
                        fruitTypeName: fruitCateValue[0].FruitName,
                        binType: $scope.bi.selected,
                        binTypeName: binValue[0].TypeName,
                        numBin: $scope.numberBin,
                        customerBin: $scope.customerCkBox,
                    }
                ];
            }
            else {
                $scope.manualList.push({ "fruitCate": fruitValue[0].CategoryName, "fruitType": $scope.fru.selected, "fruitTypeName": fruitCateValue[0].FruitName, "binType": $scope.bi.selected, "binTypeName": binValue[0].TypeName, "numBin": $scope.numberBin, "customerBin": $scope.customerCkBox });
            }

            //clear the forms
            $scope.bi = { selected: 0 };
            $scope.fc = { selected: 0 };
            $scope.fruits = [];
            $scope.fruits.unshift({ "Id": 0, "FruitName": "-- Select location --" });
            $scope.fru = { selected: 0 };
            $scope.fruitNotSelected = true;
            $scope.numberBin = '';
            $scope.customerCkBox = false;
        };

        //remove manual list
        $scope.RemoveList = function (index, rnumBin) {
            manualBinCount -= parseInt(rnumBin);
            $scope.manualList.splice(index, 1);
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

        //submit
        $scope.showConfirm = function (ev) {
            var binFlag = true;
            var binENum = 0;
            var errorMsg = '';

            if ($scope.manualList == null || $scope.manualList == '') {
                if (parseInt($scope.bintotal) > parseInt($scope.numberBin)) {
                    binFlag = false;
                    binENum = parseInt($scope.bintotal) - parseInt($scope.numberBin);
                    errorMsg = 'Bin total is not equal to the number of bins! There are ' + binENum + ' bins that need to be allocated.';
                }
                else if (parseInt($scope.bintotal) < parseInt($scope.numberBin)) {
                    binFlag = false;
                    binENum = parseInt($scope.numberBin) - parseInt($scope.bintotal);
                    errorMsg = 'You have allocated ' + binENum + ' more bins than the Total Amount, please check your selection.';
                }
            }
            else {
                if (parseInt($scope.bintotal) > parseInt(manualBinCount)) {
                    binFlag = false;
                    binENum = parseInt($scope.bintotal) - parseInt(manualBinCount);
                    errorMsg = 'Bin total is not equal to the number of bins! There are ' + binENum + ' bins that need to be allocated.';
                }
                else if (parseInt($scope.bintotal) < parseInt(manualBinCount)) {
                    binFlag = false;
                    binENum = parseInt(manualBinCount) - parseInt($scope.bintotal);
                    errorMsg = 'You have allocated ' + binENum + ' more bins than the Total Amount, please check your selection.';
                }
            }

            if (!binFlag) {
                $mdDialog.show(
                    $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Alert')
                    .textContent(errorMsg)
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Ok')
                    //.targetEvent(ev)
                );
            }
            else {

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
                        console.log('bin select' + $scope.bi.selected);

                        HomeService.Submit($scope.dropid, $scope.manualList, $scope.curLoc.selected, $scope.locName.selected, $scope.bintotal, $scope.comments, $scope.myDate, $scope.fru.selected, $scope.bi.selected, $scope.numberBin, $scope.customerCkBox, function (response) {
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
                            else {
                                //error occurs
                                $scope.IsProcess = false;
                                $scope.IsSubmitBtn = false;

                                $mdDialog.show(
                                    $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .title('Failed!')
                                    .textContent('Submit failed, please contact administrator.')
                                    .ariaLabel('Alert Dialog Demo')
                                    .ok('Ok')
                                    //.targetEvent(ev)
                                );
                            }
                        });
                    }, 3000);
                }, function () {
                    //cancel
                });
            }
        };

        //process bar
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