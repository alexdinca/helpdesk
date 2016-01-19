'use strict';

angular.module('Tickets')

    .factory('TicketsFactory',

        function ($http, $rootScope, hdFactory) {
            var extended = new hdFactory();            
            extended.items = 'tickets';
            extended.url = $rootScope.mainUrl;
            


            return extended;
        });
