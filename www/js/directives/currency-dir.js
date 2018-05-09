app.directive('currencyDir', function(currencyValue, $ionicModal){
    return{
        restrict: 'E',
        scope: {
            currSelect : '=',
            currSelectTwo: '=',
            currInput: '=',
            currInputChange: '&',
            currSelectClick: '&'
        },
        templateUrl: 'html/directives/currency-dir.html',
        link: function(scope, elm, attrs){
            scope.imgStyle = function(){
                return img = 'url(img/flags/'+scope.currSelect.model+'.png)';
            };

            scope.clickModal = function(){

                scope.currSelectClick(scope.currSelect);
            };
        }
    };
});