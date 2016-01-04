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
                controller: 'AdminController',
                templateUrl: 'modules/admin/views/FruitCategory.html'
            })

            .when('/Fruit', {
                controller: 'AdminController',
                templateUrl: 'modules/admin/views/Fruit.html'
            })

                .when('/LocationType', {
                    controller: 'AdminController',
                    templateUrl: 'modules/admin/views/LocationType.html'
                })
                .when('/Location', {
                    controller: 'AdminController',
                    templateUrl: 'modules/admin/views/Location.html'
                })

              .when('/Receivable', {
                  controller: 'HomeController',
                  templateUrl: 'modules/home/views/Receivable.html'
              })
                  .when('/Bin', {
                      controller: 'AdminController',
                      templateUrl: 'modules/admin/views/Bin.html'
                  })
               .when('/User', {
                   controller: 'AdminController',
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