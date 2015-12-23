﻿'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Home', []);
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

        .when('/', {
            controller: 'AdminController',
            templateUrl: 'modules/home/views/FruitCategory.html'
        })
            //.when('/home', {
            //    controller: 'AdminController',
            //    templateUrl: 'modules/home/views/Home.html'
            //})

            .when('/FruitCategory', {
                controller: 'AdminController',
                templateUrl: 'modules/home/views/FruitCategory.html'
            })

            .when('/Fruit', {
                controller: 'AdminController',
                templateUrl: 'modules/home/views/Fruit.html'
            })

                .when('/LocationType', {
                    controller: 'AdminController',
                    templateUrl: 'modules/home/views/LocationType.html'
                })
                .when('/Location', {
                    controller: 'AdminController',
                    templateUrl: 'modules/home/views/Location.html'
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