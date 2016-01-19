'use strict';

angular.module('Users')

    .controller('UsersController',
        function ($scope, $rootScope, $location, UsersFactory, $routeParams) {
            $scope.coloane = [{
                attribute: 'ID',
                name: 'Id'
            },{
                attribute: 'Account',
                name: 'Cont'
            }];            

            $scope.sideMenuItems = [{
                'url': '#/users/list',
                'name': 'List users'
            },{
                'url': '#/users/add',
                'name': 'Add new user'
            }];

            $scope.tableActions = [{
                name: 'Edit',
                class: 'default',
                icon: 'edit',
                action: function(item){
                    $location.path("users/edit/"+item.ID);
                }
            },{
                name: 'Reset',
                class: 'warning',
                icon: 'refresh',
                action: function(item){
                    $scope.resetPassword(item);
                }
            },{
                name: 'Delete',
                class: 'danger',
                icon: 'trash',
                action: function(item){
                    $scope.deleteUser(item);
                } 
            }];

            if($routeParams.id){
                UsersFactory.getUser($routeParams.id).then(function(results){
                    $scope.user = results.data;
                },function(error){
                    console.log(error);
                });
            }

            $scope.resetPassword = function(user){
                UsersFactory.resetPassword(user.ID).then(function(results){
                    if(results.data.result)
                        $scope.showMessage(results.data.message, 'success');
                    else
                        $scope.showMessage(results.data.message, 'danger');
                },function(error){
                    $scope.showMessage(error.status+": "+error.statusText, 'danger');
                });
            };

            $scope.deleteUser = function(user){
                UsersFactory.deleteUser(user.id).then(function(results){
                    $scope.showMessage(results.data, 'success');
                },function(error){
                    $scope.showMessage("<h4>"+error.status+": "+error.statusText+"</h4>", 'danger');
                    console.log(error);
                });
            };

            $scope.submitUser = function(){
                if($scope.user.id){
                    UsersFactory.editUser($scope.user).then(function(results){
                        $scope.userForm.$setPristine();
                    },function(error){
                        console.log(error);
                    });
                }else{
                    UsersFactory.addUser($scope.user).then(function(results){
                        $scope.userForm.$setPristine();
                    },function(error){
                        console.log(error);
                    });
                }
            };
        });