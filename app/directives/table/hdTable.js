app.directive('hdTable', function(){
    return {
        restrict: 'E',
        scope: {
            tds: '=',
            nrcrt: '=',
            actions: '=',
            factoryname: '=',
        },
        templateUrl: 'helpdesk/app/directives/table/ng-table-template.html',
        controller: function($scope, $injector){
            var factoryInstance = $injector.get($scope.factoryname);            
            
            factoryInstance.countData().then(function(results){
                $scope.count = results.data;
                init();
            },function(error){
                alert(error);
            });

            function init(){
                $scope.searchTable = '';
                $scope.currentPage = 0;
                $scope.order = 'ASC';
                $scope.sort = $scope.tds[0].attribute;                
                $scope.limitsize = 10;
                $scope.limits = [10,20,50,100];

                if($scope.count == 0){
                    $scope.items = [];
                    return false;
                }

                $scope.setPages();
                $scope.takeData();
            }

            $scope.setPages = function(){
                $scope.pages = Math.ceil($scope.count / $scope.limitsize);
                $scope.pArray = [];
                for(var i = 0; i < $scope.pages; i++){
                    $scope.pArray.push(i);
                }
            };

            $scope.takeData = function(){                
                factoryInstance.fetchData($scope.limitsize, $scope.order, $scope.sort, $scope.currentPage).then(function(results){
                    $scope.items = results.data;
                }, function(error){
                    alert(error);
                });
            };

            $scope.orderBy = function(td){
                if($scope.sort == td.attribute){
                    if($scope.order == 'ASC')
                        $scope.order = 'DESC';
                    else
                        $scope.order = 'ASC';
                }else
                    $scope.sort = td.attribute;

                $scope.currentPage = 0;                
                $scope.takeData();                
            };

            $scope.nextPage = function(){
                $scope.currentPage++;                
                $scope.takeData();
            };

            $scope.prevPage = function(){
                $scope.currentPage--;                                    
                $scope.takeData();
            };

            $scope.gotoPage = function(page){
                $scope.currentPage = page;                
                $scope.takeData();
            };

            $scope.setLimit = function(limit){
                $scope.currentPage = 0;
                $scope.limitsize = limit;                
                $scope.setPages();
                $scope.takeData();
            };

            $scope.$on('$destroy', function(){
                $scope.items = false;
                factoryInstance = false;
            });
        }
    }
});