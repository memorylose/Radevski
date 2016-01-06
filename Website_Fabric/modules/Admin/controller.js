'use strict';

angular.module('Admin')

.controller('AdminFruitController',
    ['$scope', '$rootScope', 'AdminService',
    function ($scope, $rootScope, AdminService) {
        //initialize admin page
        AdminPageInit($scope, $rootScope, AdminService);

        //add fruit
        $scope.addFruit = function (fruitModel) {
            console.log($scope.category);
            AdminService.AddFruit(fruitModel).then(function (response) {
                if (response.data == true) {
                    AdminService.GetFruit().then(function (response) {
                        $scope.FruitList = response.data;
                        $scope.AddTr = false;
                    });
                }
                else {
                    //error
                }
            });
        };

        //get fruit
        AdminService.GetFruit().then(function (response) {
            $scope.tableLoading = true;
            $scope.FruitList = response.data;
            $scope.dataLoading = false;
        });

        //delete fruit
        $scope.deleteFruit = function (id, index) {
            if (confirm('Are you sure delete this fruit?')) {
                AdminService.DeleteFruit(id).then(function (response) {
                    if (response.data == true) {
                        $scope.FruitList.splice(index, 1);
                    }
                    else {
                        //error
                    }
                });
            }
        };

        //edit fruit
        $scope.editFruit = function (model) {
            AdminService.EditFruit(model).then(function (response) {
                if (response.data == true) {
                    AdminService.GetFruit().then(function (response) {
                        $scope.FruitList = response.data;
                        $scope.AddTr = false;
                    });
                }
                else {
                    //error
                }
            });
        };

        //get category list when add
        AdminService.GetFruitCategory().then(function (response) {
            $scope.categories = response.data;
        });
    }]);

angular.module('Admin')
.controller('AdminFruitCateController',
    ['$scope', '$rootScope', 'AdminService',
    function ($scope, $rootScope, AdminService) {
        //initialize admin page
        AdminPageInit($scope, $rootScope, AdminService);

        //add fruit cate
        $scope.addFruitCategory = function (fruitModel) {
            AdminService.AddFruitCategory(fruitModel).then(function (response) {
                if (response.data == true) {
                    AdminService.GetFruitCategory().then(function (response) {
                        $scope.FruitCategoryList = response.data;
                        $scope.AddTr = false;
                    });
                }
                else {
                    //error
                }
            });
        };

        //get fruit cate
        AdminService.GetFruitCategory().then(function (response) {
            $scope.FruitCategoryList = response.data;
            $scope.tableLoading = true;
            $scope.dataLoading = false;
        });

        //edit fruit cate
        $scope.editFruitCategory = function (model) {
            AdminService.EditFruitCategory(model).then(function (response) {
                if (response.data == true) {
                    AdminService.GetFruitCategory().then(function (response) {
                        $scope.FruitCategoryList = response.data;
                        $scope.AddTr = false;
                    });
                }
                else {
                    //error
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
    }]);

angular.module('Admin')
.controller('AdminSourceTypeController',
    ['$scope', '$rootScope', 'AdminService',
    function ($scope, $rootScope, AdminService) {
        //initialize admin page
        AdminPageInit($scope, $rootScope, AdminService);

        //add source type
        $scope.addLocationType = function (locationModel) {
            AdminService.AddLocationType(locationModel).then(function (response) {
                if (response.data == true) {
                    AdminService.GetLocationType().then(function (response) {
                        $scope.LocationTypeList = response.data;
                        $scope.AddTr = false;
                    });
                }
                else {
                    //error
                }
            });
        };

        //get source type
        AdminService.GetLocationType().then(function (response) {
            $scope.LocationTypeList = response.data;
            $scope.tableLoading = true;
            $scope.dataLoading = false;
            //get category dropdown on fruit
            //$scope.locations = response;
        });

        //edit source type
        $scope.editLocationType = function (model) {
            AdminService.EditLocationType(model).then(function (response) {
                if (response.data == true) {
                    AdminService.GetLocationType().then(function (response) {
                        $scope.LocationTypeList = response.data;
                        $scope.AddTr = false;
                    });
                }
                else {
                    //error
                }
            });
        };

        //delete source type
        $scope.deleteLocationType = function (id, index) {
            if (confirm('Are you sure delete this source type?')) {
                AdminService.DeleteLocationType(id).then(function (response) {
                    if (response.data == true) {
                        $scope.LocationTypeList.splice(index, 1);
                    }
                    else {
                        //error
                    }
                });
            }
        };
    }]);

angular.module('Admin')
.controller('AdminSourceController',
    ['$scope', '$rootScope', 'AdminService',
    function ($scope, $rootScope, AdminService) {
        //initialize admin page
        AdminPageInit($scope, $rootScope, AdminService);

        //add source
        $scope.addLocation = function (model) {
            AdminService.AddLocation(model).then(function (response) {
                if (response.data == true) {
                    AdminService.GetLocation().then(function (response) {
                        $scope.LocationList = response.data;
                        $scope.AddTr = false;
                    });
                }
                else {
                    //error
                }
            });
        };

        //get source
        AdminService.GetLocation().then(function (response) {
            $scope.LocationList = response.data;
            $scope.tableLoading = true;
            $scope.dataLoading = false;

        });

        //get source type when add
        AdminService.GetLocationType().then(function (response) {
            $scope.locations = response.data;
        });

        //delete source
        $scope.deleteLocation = function (id, index) {
            if (confirm('Are you sure delete this source?')) {
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

        //edit source
        $scope.editLocation = function (model) {
            AdminService.EditLocation(model).then(function (response) {
                if (response.data == true) {
                    AdminService.GetLocation().then(function (response) {
                        $scope.LocationList = response.data;
                        $scope.AddTr = false;
                    });
                }
                else {
                    //error
                }
            });
        };
    }]);

angular.module('Admin')
.controller('AdminLocationController',
    ['$scope', '$rootScope', 'AdminService',
    function ($scope, $rootScope, AdminService) {
        //initialize admin page
        AdminPageInit($scope, $rootScope, AdminService);

        //add reeiver location
        $scope.addRecLocation = function (model) {
            AdminService.AddRecLocation(model).then(function (response) {
                //add loading
                if (response.data == true) {
                    AdminService.GetRecLocation().then(function (response) {
                        $scope.RecLocationList = response.data;
                        $scope.AddTr = false;
                    });
                }
                else {
                    //error
                }
            });
        };

        //get receiver location
        AdminService.GetRecLocation().then(function (response) {
            $scope.RecLocationList = response.data;
            $scope.tableLoading = true;
            $scope.dataLoading = false;

        });

        //delete receiver location
        $scope.deleteRecLocation = function (id, index) {
            if (confirm('Are you sure delete this receiver location?')) {
                AdminService.DeleteRecLocation(id).then(function (response) {
                    if (response.data == true) {
                        $scope.RecLocationList.splice(index, 1);
                    }
                    else {
                        //error
                    }
                });
            }
        };

        //edit receiver location
        $scope.editRecLocation = function (model) {
            AdminService.EditRecLocation(model).then(function (response) {
                if (response.data == true) {
                    AdminService.GetRecLocation().then(function (response) {
                        $scope.RecLocationList = response.data;
                        $scope.AddTr = false;
                    });
                }
                else {
                    //error
                }
            });
        };
    }]);

angular.module('Admin')
.controller('AdminUserController',
    ['$scope', '$rootScope', 'AdminService',
    function ($scope, $rootScope, AdminService) {
        //initialize admin page
        AdminPageInit($scope, $rootScope, AdminService);

        //add users
        $scope.addUser = function (model) {
            AdminService.AddUser(model).then(function (response) {
                if (response.data.success) {
                    AdminService.GetUser().then(function (response) {
                        $scope.UserList = response.data;
                        $scope.AddTr = false;
                    });
                }
                else {
                    alert(response.data.message);
                }
            });
        };

        //get user
        AdminService.GetUser().then(function (response) {
            $scope.UserList = response.data;
            $scope.tableLoading = true;
            $scope.dataLoading = false;

        });

        //delete users
        $scope.deleteUser = function (id, index) {
            if (confirm('Are you sure delete this user?')) {
                AdminService.DeleteUser(id).then(function (response) {
                    if (response.data == true) {
                        $scope.UserList.splice(index, 1);
                    }
                    else {
                        //error
                    }
                });
            }
        };
    }]);

angular.module('Admin')
.controller('AdminBinController',
    ['$scope', '$rootScope', 'AdminService',
    function ($scope, $rootScope, AdminService) {
        //initialize admin page
        AdminPageInit($scope, $rootScope, AdminService);

        //add bin
        $scope.addBin = function (model) {
            AdminService.AddBin(model).then(function (response) {
                if (response.data == true) {
                    AdminService.GetBin().then(function (response) {
                        $scope.BinList = response.data;
                        $scope.AddTr = false;
                    });
                }
                else {
                    console.log('add uesr fail');
                }
            });
        };

        //get bin
        AdminService.GetBin().then(function (response) {
            $scope.BinList = response.data;
            $scope.tableLoading = true;
            $scope.dataLoading = false;

        });

        //delete bin
        $scope.deleteBin = function (id, index) {
            if (confirm('Are you sure delete this bin type?')) {
                AdminService.DeleteBin(id).then(function (response) {
                    if (response.data == true) {
                        $scope.BinList.splice(index, 1);
                    }
                    else {
                        //error
                    }
                });
            }
        };

        //edit bin
        $scope.editBin = function (model) {
            AdminService.EditBin(model).then(function (response) {
                if (response.data == true) {
                    AdminService.GetBin().then(function (response) {
                        $scope.BinList = response.data;
                        $scope.AddTr = false;
                    });
                }
                else {
                    //error
                }
            });
        };
    }]);


function AdminPageInit($scope, $rootScope, AdminService) {
    $rootScope.BodySty = 'background-color: white;';
    $scope.dataLoading = true;
    $scope.tableLoading = false;
    $rootScope.ShowMenu = true;
    $scope.TestDisable = true;
    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    }
    $scope.Cancel = function () {
        $scope.AddTr = false;
        console.log($scope.AddTr);
    };
    $scope.ShowAdd = function () {
        $scope.AddTr = true;
    };
}
