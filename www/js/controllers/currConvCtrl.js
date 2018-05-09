app.controller('currConvCtrl', function($scope, $state, currencyService, currencyValue, $ionicModal, $injector){
    $scope.onSwipeLeft = function () {
		$state.go('currency-rates');
    };    
     
    var currencyList = currencyValue.getCurrencyList();
    
    
    
    $scope.selectCurr1 = {
         model: 'eur',
         availableOptions: ['aud', 'bam', 'cad', 'chf', 'cny', 'czk', 'dkk', 'eur', 'gbp', 'hrk', 'huf', 'jpy', 'kwd', 'nok', 'pln', 'rub', 'sek', 'usd']
    };
    $scope.selectCurr2 = {
         model: 'rsd',
         availableOptions: ['aud', 'bam', 'cad', 'chf', 'cny', 'czk', 'dkk', 'gbp', 'hrk', 'huf', 'jpy', 'kwd', 'nok', 'pln', 'rsd', 'rub', 'sek', 'usd']
    };   

    var changeCurrency1 = function(currency){
        $scope.selectCurr2.availableOptions = [];

        for(i in currencyList){
            if(i != currency)
                $scope.selectCurr2.availableOptions.push(i);

        }
        if(currency !== 'rsd')
            $scope.selectCurr2.availableOptions.push('rsd');    
        
        $scope.selectCurr2.availableOptions.sort();

        if($scope.inputCurr1 !== undefined)
            currencyCalculate1();
            
    }

    var changeCurrency2 = function(currency){
        $scope.selectCurr1.availableOptions = [];

        for(i in currencyList){
            if(i !=currency)
                 $scope.selectCurr1.availableOptions.push(i);
        }
        if(currency !== 'rsd')
            $scope.selectCurr1.availableOptions.push('rsd');

        $scope.selectCurr1.availableOptions.sort();
        
        if($scope.inputCurr1 !== undefined)
            currencyCalculate1();
    };

    $scope.inputCurr1Change = function(){
        if($scope.inputCurr1 === undefined)
            $scope.inputCurr2 = undefined; 
        else
            currencyCalculate1();            
    };

    $scope.inputCurr2Change = function(){
        if($scope.inputCurr2 === undefined)
            $scope.inputCurr1 = undefined;         
        else
            currencyCalculate2();
    };

    var currencyCalculate1 = function(){
        var vrednost1 = 1, 
            vrednost2 = 1;

        if($scope.selectCurr1.model !== 'rsd')
            vrednost1 = parseFloat(currencyList[$scope.selectCurr1.model].sre);
        if($scope.selectCurr2.model !== 'rsd')
            vrednost2 = parseFloat(currencyList[$scope.selectCurr2.model].sre);

        if(vrednost1 < vrednost2)
            $scope.inputCurr2 = ($scope.inputCurr1 * vrednost1 / vrednost2).toFixed(2);
        else
            $scope.inputCurr2 = ($scope.inputCurr1 / vrednost2 * vrednost1).toFixed(2);

    }

    var currencyCalculate2 = function(){
        var vrednost1 = 1,
            vrednost2 = 1;

        if($scope.selectCurr1.model !== 'rsd')
            vrednost1 = parseFloat(currencyList[$scope.selectCurr1.model].sre);
        if($scope.selectCurr2.model !== 'rsd')
            vrednost2 = parseFloat(currencyList[$scope.selectCurr2.model].sre);

        if(vrednost1 < vrednost2)
           $scope.inputCurr1 = ($scope.inputCurr2 / vrednost1 * vrednost2).toFixed(2);
        else
            $scope.inputCurr1 = ($scope.inputCurr2 * vrednost2 / vrednost1).toFixed(2);

    }

     //function for swap data
    $scope.swap = function(curr1Value, curr2Value){
        var slcCurr2 = $scope.selectCurr2.model;
        var slcCurr2AvailableOptions = $scope.selectCurr2.availableOptions;
        $scope.selectCurr2.availableOptions = $scope.selectCurr1.availableOptions;
        $scope.selectCurr1.availableOptions = slcCurr2AvailableOptions;
        $scope.selectCurr2.model = $scope.selectCurr1.model;
        $scope.selectCurr1.model = slcCurr2;

        var inpCurr2 = $scope.inputCurr2;
        $scope.inputCurr2 = $scope.inputCurr1;
        $scope.inputCurr1 = inpCurr2;
    };

     //function for reset currency form
    $scope.resetBtn = function(){
        $scope.selectCurr1 = {
         model: 'eur',
         availableOptions: ['aud', 'bam', 'cad', 'chf', 'cny', 'czk', 'dkk', 'eur', 'gbp', 'hrk', 'huf', 'jpy', 'kwd', 'nok', 'pln', 'rub', 'sek', 'usd']
        };
        $scope.selectCurr2 = {
            model: 'rsd',
            availableOptions: ['aud', 'bam', 'cad', 'chf', 'cny', 'czk', 'dkk', 'gbp', 'hrk', 'huf', 'jpy', 'kwd', 'nok', 'pln', 'rsd', 'rub', 'sek', 'usd']
        };
        $scope.inputCurr1 = '';
        $scope.inputCurr2 = '';
    };

    $ionicModal.fromTemplateUrl('html/templates/currencyList.html', {
        scope: $scope,
        animation: 'slide-in-up'
        }).then(function(modal) { 
            $scope.currModal = modal;
        });

    $scope.openModal = function(selectCurr){

        $scope.selectCurr = selectCurr;
        $scope.currModal.show();

    }

    $scope.proba = function(curr, selectCurr){

        $scope.currModal.hide();
        selectCurr.model = curr;

        if(selectCurr === $scope.selectCurr1)
            changeCurrency1(curr);
           
        if(selectCurr === $scope.selectCurr2)
            changeCurrency2(curr);
    }

    

});