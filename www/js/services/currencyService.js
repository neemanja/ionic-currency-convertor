app.factory('currencyService', function($http, $q, currencyValue){


    var currencyService = {
        getCurrencyApi: function(){
            var url = '';

            if(ionic.Platform.isAndroid()){
                url = 'http://api.kursna-lista.info/b7b80a59415046c33449b6a2a96bd4d8/kursna_lista';
            }
            else{
               url = 'https://cors-anywhere.herokuapp.com/http://api.kursna-lista.info/b7b80a59415046c33449b6a2a96bd4d8/kursna_lista';
                //url = '/curr';
            }

            return $http({
                method: 'GET',
                url: url
            })
        },
        CurrencyListFilter: function(currencyList){
            delete currencyList.date;
            return currencyList;
        },
        getApi: function(){
            var url = '';

            if(ionic.Platform.isAndroid()){
                url = 'http://api.kursna-lista.info/b7b80a59415046c33449b6a2a96bd4d8/kursna_lista';

            }
            else{
                url = 'https://cors-anywhere.herokuapp.com/http://api.kursna-lista.info/b7b80a59415046c33449b6a2a96bd4d8/kursna_lista';
                //url = '/curr';
            }
            if(currencyValue.getCurrencyList()=== null){
                 return $http({
                    method: 'GET',
                    url: url
                });

            }
            else
                return null;
        },
    }

    return currencyService;
});