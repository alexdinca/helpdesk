'use strict';

angular.module('Users')

    .factory('UsersFactory',

        function ($http, $rootScope, hdFactory) {
            var extended = angular.extend(hdFactory, {});            
            extended.url = $rootScope.mainUrl;
            extended.items = 'users';

            extended.getUser = function (id) {                
                return $http.get(extended.url + extended.items + "/list?id="+id);
            };

            extended.deleteUser = function(id){
                return $http.delete(extended.url + extended.items + "/"+id);
            };

            extended.resetPassword = function(id){
                return $http.put(extended.url + extended.items + "/resetPassword", {id: id});
            };

            extended.editUser = function(user){
                return $http.put(extended.url + extended.items ,{user:user});
            };

            extended.addUser = function(user){
                return $http.post(extended.url + extended.items ,{user:user});
            };

            return extended;
        });
