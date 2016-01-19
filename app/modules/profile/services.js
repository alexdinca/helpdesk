'use strict';

angular.module('Profile')

    .factory('ProfileFactory',

        function ($http, $cookies, AuthenticationService, $rootScope) {
            var factory = {};
            var user = {};

            factory.getUser = function () {
                var globals = $cookies.getObject('globals');
                user.username = globals.currentUser.username;
                user.id = globals.currentUser.id;
            };

            factory.setPassword = function (pass, old) {
                factory.getUser();
                return $http.put($rootScope.mainUrl+"users/changePass", {id: user.id, pass: pass, old: old});
            };

            return factory;
        });
