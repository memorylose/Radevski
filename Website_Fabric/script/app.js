'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Home', ['ngMaterial', 'ngMessages']);
angular.module('angularTable', ['angularUtils.directives.dirPagination']);
angular.module('Admin', []);

angular.module('BasicHttpAuthExample', [
    'Authentication',
    'Home',
    'ngRoute',
    'ngCookies',
    'angularTable',
    'Admin'
])

.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'modules/login/views/Login.html'
        })

        //.when('/', {
        //    controller: 'AdminController',
        //    templateUrl: 'modules/home/views/Receivable.html'
        //})

            .when('/FruitCategory', {
                controller: 'AdminFruitCateController',
                templateUrl: 'modules/admin/views/FruitCategory.html'
            })

            .when('/Fruit', {
                controller: 'AdminFruitController',
                templateUrl: 'modules/admin/views/Fruit.html'
            })

                .when('/SourceType', {
                    controller: 'AdminSourceTypeController',
                    templateUrl: 'modules/admin/views/LocationType.html'
                })
                .when('/Source', {
                    controller: 'AdminSourceController',
                    templateUrl: 'modules/admin/views/Location.html'
                })
              .when('/Location', {
                  controller: 'AdminLocationController',
                  templateUrl: 'modules/admin/views/ReceiverLocation.html'
              })

              .when('/Receivable', {
                  controller: 'HomeController',
                  templateUrl: 'modules/home/views/Receivable.html'
              })
                  .when('/Bin', {
                      controller: 'AdminBinController',
                      templateUrl: 'modules/admin/views/Bin.html'
                  })
               .when('/User', {
                   controller: 'AdminUserController',
                   templateUrl: 'modules/admin/views/User.html'
               })

        .otherwise({ redirectTo: '/login' });
}])

.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/#/login');
            }
        });

    }]);