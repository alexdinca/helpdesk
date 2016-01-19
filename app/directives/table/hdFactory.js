'use strict';

app

    .factory('hdFactory',

        function ($http, $rootScope) {
            var factory = {
            	url: '',
            	items: ''
            };                       

            factory.fetchData = function(take, order, sort, page){
                return $http.get(factory.url + factory.items + "/list.php?take="+take+"&order="+order+"&sort="+sort+"&page="+page);
            };

            factory.countData = function(){
                return $http.get(factory.url + factory.items + "/list.php?count");
            };

            return factory;
        });
