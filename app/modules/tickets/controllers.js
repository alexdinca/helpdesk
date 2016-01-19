'use strict';

angular.module("Tickets")

	.controller('TicketsController', 
		function($scope, $location, TicketsFactory, $routeParams){
            $scope.coloane = [{
                attribute: 'ID',
                name: 'Id'
            },{
                attribute: 'User',
                name: 'User'
            },{
                attribute: 'Status',
                name: 'Status'
            },{
                attribute: 'ClassSystem',
                name: 'Class System'
            },{
                attribute: 'ClassName',
                name: 'Class Name'
            }]; 

			$scope.sideMenuItems = [{
                'url': '#/tickets/list',
                'name': 'Listare tichete'
            },{
                'url': '#/tickets/add',
                'name': 'Adauga tichet nou'
            }];

});