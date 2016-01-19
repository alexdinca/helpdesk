'use strict';

angular.module('Authentication', []);
angular.module('Profile', []);
angular.module('Users', []);
angular.module('Tickets', []);

var app = angular.module("helpDesk", [
        'Authentication',
        'Profile',
        'Users',
        'Tickets',
        'ngRoute',
        'ngAnimate',
        'ngCookies',
        'ngSanitize',
        'chieffancypants.loadingBar'
    ])

    .config(function ($routeProvider, cfpLoadingBarProvider, $httpProvider) {
        cfpLoadingBarProvider.includeSpinner = false;

        $httpProvider.defaults.useXDomain = true;

        $routeProvider
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'helpdesk/app/modules/authentication/views/login.html'
            })
            .when('/tickets', {
                controller: 'TicketsController',
                templateUrl: 'helpdesk/app/views/tickets.html'
            })            
            .when('/', {
                controller: 'MenuController',
                templateUrl: 'helpdesk/app/views/home.html'
            })
            .when('/profile', {
                controller: 'ProfileController',
                templateUrl: 'helpdesk/app/modules/profile/views/profile.html'
            })
            .when('/profile/theme', {
                controller: 'ProfileController',
                templateUrl: 'helpdesk/app/modules/profile/views/theme.html'
            })
            .when('/users/list', {
                controller: 'UsersController',
                templateUrl: 'helpdesk/app/modules/users/views/list.html'
            })
            .when('/users/add', {
                controller: 'UsersController',
                templateUrl: 'helpdesk/app/modules/users/views/form.html'
            })
            .when('/users/edit/:id', {
                controller: 'UsersController',
                templateUrl: 'helpdesk/app/modules/users/views/form.html'
            })
            .when('/tickets/list', {
                controller: 'TicketsController',
                templateUrl: 'helpdesk/app/modules/tickets/views/list.html'
            })
            .otherwise({redirectTo: '/'});
    })

    .run(
        function ($rootScope, $location, $cookies, $http) {            
            $rootScope.mainUrl = 'http://easyorder.go.ro/helpdesk/backend/';
            $rootScope.styleSheet = $cookies.get("styleSheet") || 'css/bootstrap.min.css';
            // keep user logged in after page refresh
            $rootScope.globals = $cookies.getObject('globals') || {};
            if ($rootScope.globals.currentUser) {
                $rootScope.user = $rootScope.globals.currentUser;
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
            }

            $rootScope.$watch("styleSheet", function(){
                var d = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
                $cookies.put('styleSheet', $rootScope.styleSheet, {expires: d});
            });

            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                // redirect to login page if not logged in
                if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                    $location.path('/login');
                }
            });
        });





