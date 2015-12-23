'use strict';

angular.module('Admin')

.controller('AdminController',
    ['$scope', '$rootScope', 'AdminService',
    function ($scope, $rootScope, AdminService) {
        $rootScope.BodySty = 'background-color: white;';
        $scope.dataLoading = true;
        $scope.tableLoading = false;
        $rootScope.ShowMenu = true;



        $scope.sort = function (keyname) {
            $scope.sortKey = keyname;
            $scope.reverse = !$scope.reverse;
        }

        //Fruit
        $scope.addFruit = function (fruitModel) {
            console.log($scope.category);
            AdminService.AddFruit(fruitModel).then(function (response) {
                if (response.data == true) {
                    AdminService.GetFruit(function (response) {
                        $scope.FruitList = response;
                        $scope.AddTr = false;
                    });
                }
                else {
                    console.log('add uesr fail');
                }
            });
        };
        AdminService.GetFruit(function (response) {
            $scope.FruitList = response;
            $scope.tableLoading = true;
            $scope.dataLoading = false;

        });
        $scope.deleteFruit = function (id, index) {
            if (confirm('Are you sure delete this fruit?')) {
                AdminService.DeleteFruit(id).then(function (response) {
                    if (response.data == true) {
                        $scope.FruitList.splice(index, 1);
                    }
                    else {
                        console.log('delete fruit failed.');
                    }
                });
            }
        };
        $scope.editFruit = function (model) {
            AdminService.EditFruit(model).then(function (response) {
                if (response.data == true) {
                    AdminService.GetFruit(function (response) {
                        $scope.FruitList = response;
                        $scope.AddTr = false;
                    });
                }
                else {
                    console.log('Edit fruit failed.');
                }
            });
        };

        //Fruit category
        $scope.addFruitCategory = function (fruitModel) {
            AdminService.AddFruitCategory(fruitModel).then(function (response) {
                if (response.data == true) {
                    AdminService.GetFruitCategory(function (response) {
                        $scope.FruitCategoryList = response;
                        $scope.AddTr = false;
                    });
                }
                else {
                    console.log('add fruit category fail');
                }
            });
        };
        AdminService.GetFruitCategory(function (response) {
            $scope.FruitCategoryList = response;
            $scope.tableLoading = true;
            $scope.dataLoading = false;
            //get category dropdown on fruit
            $scope.categories = response;
        });
        $scope.editFruitCategory = function (model) {
            AdminService.EditFruitCategory(model).then(function (response) {
                if (response.data == true) {
                    AdminService.GetFruitCategory(function (response) {
                        $scope.FruitCategoryList = response;
                        $scope.AddTr = false;
                    });
                }
                else {
                    console.log('edit fruit category fail');
                }
            });
        };
        $scope.deleteFruitCategory = function (id, index) {
            if (confirm('Are you sure delete this fruit category?')) {
                AdminService.DeleteFruitCategory(id).then(function (response) {
                    if (response.data == true) {
                        $scope.FruitCategoryList.splice(index, 1);
                    }
                    else {
                        console.log('delete fruit failed.');
                    }
                });
            }
        };

        //Location type
        $scope.addLocationType = function (locationModel) {
            AdminService.AddLocationType(locationModel).then(function (response) {
                if (response.data == true) {
                    AdminService.GetLocationType(function (response) {
                        $scope.LocationTypeList = response;
                        $scope.AddTr = false;
                    });
                }
                else {
                    console.log('add fruit category fail');
                }
            });
        };
        AdminService.GetLocationType(function (response) {
            $scope.LocationTypeList = response;
            $scope.tableLoading = true;
            $scope.dataLoading = false;
            //get category dropdown on fruit
            $scope.locations = response;
        });
        $scope.editLocationType = function (model) {
            AdminService.EditLocationType(model).then(function (response) {
                if (response.data == true) {
                    AdminService.GetLocationType(function (response) {
                        $scope.LocationTypeList = response;
                        $scope.AddTr = false;
                    });
                }
                else {
                    console.log('edit fruit category fail');
                }
            });
        };
        $scope.deleteLocationType = function (id, index) {
            if (confirm('Are you sure delete this location type?')) {
                AdminService.DeleteLocationType(id).then(function (response) {
                    if (response.data == true) {
                        $scope.LocationTypeList.splice(index, 1);
                    }
                    else {
                        console.log('delete fruit failed.');
                    }
                });
            }
        };

        //Location
        $scope.addLocation = function (model) {
            AdminService.AddLocation(model).then(function (response) {
                if (response.data == true) {
                    AdminService.GetLocation(function (response) {
                        $scope.LocationList = response;
                        $scope.AddTr = false;
                    });
                }
                else {
                    console.log('add uesr fail');
                }
            });
        };
        AdminService.GetLocation(function (response) {
            $scope.LocationList = response;
            $scope.tableLoading = true;
            $scope.dataLoading = false;

        });
        $scope.deleteLocation = function (id, index) {
            if (confirm('Are you sure delete this location?')) {
                AdminService.DeleteLocation(id).then(function (response) {
                    if (response.data == true) {
                        $scope.LocationList.splice(index, 1);
                    }
                    else {
                        console.log('delete fruit failed.');
                    }
                });
            }
        };
        $scope.editLocation = function (model) {
            AdminService.EditLocation(model).then(function (response) {
                if (response.data == true) {
                    AdminService.GetLocation(function (response) {
                        $scope.LocationList = response;
                        $scope.AddTr = false;
                    });
                }
                else {
                    console.log('Edit fruit failed.');
                }
            });
        };

        $scope.Cancel = function () {
            $scope.AddTr = false;
            console.log($scope.AddTr);
        };

        $scope.ShowAdd = function () {
            $scope.AddTr = true;
        };
    }]);