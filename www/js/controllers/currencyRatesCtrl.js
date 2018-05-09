app.controller('currencyRatesCtrl', function($scope, $state, currencyValue){
    $scope.onSwipeRight = function () {
		$state.go('currency-convertor');
    }

    $scope.currencyList = currencyValue.getCurrencyList();
    $scope.currencyListDate = currencyValue.getCurrencyListDate();

});