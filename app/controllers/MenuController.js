'use strict';

angular.module('helpDesk')

	.controller('MenuController', function($scope){
		$scope.items = [
			{
				name: 'Tichete', 
				url: '#/tickets/list'
			},
			
			{
				name: 'Utilizatori',
				url: '#/users/list'
			},		
			{
				name: 'Config Cont', 
				url: '#/profile'
			},
			{
				name: '<span class="glyphicon glyphicon-off"></span>', 
				url: '#/login'
			}
		];
	});