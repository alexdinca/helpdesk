'use strict';

angular.module('Profile')

.controller('ProfileController',

    function ($scope, $cookies, ProfileFactory, AuthenticationService, Base64, $rootScope) {        
        $scope.styleSheet = $rootScope.styleSheet;
        $scope.changeStyle = function(){
            $rootScope.styleSheet = $scope.styleSheet;
        };

        var globals = $cookies.getObject('globals');
        $scope.user = globals.currentUser;
        $scope.themes = [{
                path: 'css/bootstrap.min.css',
                value: 'Default'
            },{ 
                path: 'css/themes/cerulean.css',
                value: 'Cerulean'
            },{
                path: 'css/themes/cosmo.css',
                value: 'Cosmo'
            },{
                path: 'css/themes/cyborg.css',
                value: 'Cyborg'
            },{ 
                path: 'css/themes/darkly.css',
                value: 'Darkly'
            },{
                path: 'css/themes/flatly.css',
                value: 'Flatly'
            },{
                path: 'css/themes/journal.css',
                value: 'Journal'
            },{ 
                path: 'css/themes/lumen.css',
                value: 'Lumen'
            },{ 
                path: 'css/themes/paper.css',
                value: 'Paper'
            },{ 
                path: 'css/themes/readable.css',
                value: 'Readable'
            },{ 
                path: 'css/themes/sandstone.css',
                value: 'Sandstone'
            },{
                path: 'css/themes/simplex.css',
                value: 'Simplex'
            },{
                path: 'css/themes/slate.css',
                value: 'Slate'
            },{
                path: 'css/themes/spacelab.css',
                value: 'Spacelab'
            },{ 
                path: 'css/themes/superhero.css',
                value: 'Superhero'
            },{ 
                path: 'css/themes/united.css',
                value: 'United'
            },{
                path: 'css/themes/yeti.css',
                value: 'Yeti'
            }
        ];      

        $scope.checkPasswords = function(){
            if($scope.password != $scope.rpassword) {
                return true;
            }else{
                return false;
            }
        };
        
        $scope.checkOldPass = function(){
            var globals = $cookies.getObject('globals');
            var check = Base64.encode(globals.currentUser.username + ":" + $scope.oldpass);
            if(check != globals.currentUser.authdata){
                return true;
            }else{
                return false;
            }
        };
        
        $scope.changePassword = function(){
            if (!$scope.form.$invalid) {
                ProfileFactory.setPassword($scope.password, $scope.oldpass).success(function (response) {
                    if (response.result) {
                        var globals = $cookies.getObject('globals');
                        var user = {};
                        user.username = globals.currentUser.username;
                        user.id = globals.currentUser.id;
                        AuthenticationService.ClearCredentials();
                        AuthenticationService.SetCredentials(user.username, $scope.password, globals.currentUser);
                        $scope.showMessage('Password changed', 'success');
                        $scope.resetForm();
                    } else {
                        $scope.showMessage(response.message, 'danger');                        
                    }
                });
            }
        };

        $scope.resetForm = function(){            
            $scope.password = $scope.oldpass = $scope.rpassword = '';
            $scope.form.$setPristine();
        };
    });