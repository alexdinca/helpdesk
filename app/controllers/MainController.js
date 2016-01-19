'use strict';

angular.module('helpDesk')

    .controller('MainController',
        function ($scope, $rootScope, $http, $location, $timeout, $cookies) {
            $scope.location = $location;

            $scope.styleSheet = 'css/themes/yeti.css';
            // used for side menu items
            $scope.setActiveItem = function(item){
            	var url = item.url.substring(1); // removing pesky #
            	var r = $location.path().search(url);
            	if (r != -1){
            		return 'active';
            	}
            };
            // used for main menu items
            $scope.setActiveItemPartial = function(item){
                var url = item.url.substring(1,4); // removing pesky # AND getting partial of the url
                var r = $location.path().search(url);
                if (r != -1){
                    return 'active';
                }  
            };
            // message container is located in index.html
            $scope.showMessage = function(text, className){
                $timeout.cancel($scope.messageId);
                $scope.message = {
                    text: text,
                    class: className
                };
                $scope.messageId = $timeout(function(){
                    $scope.message = false;
                }, 5000);
            };
            $scope.hideMessage = function(){
                $scope.message = false;                
                $timeout.cancel($scope.messageId);
            };
            $rootScope.$on('$locationChangeSuccess', function () {
                $scope.hideMessage();                
            });
        });