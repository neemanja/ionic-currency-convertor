app.value('currencyValue', {
    currencyList: null,
    currencyListDate:null,

    setCurrencyList: function(currencyList){
        this.currencyList = currencyList; 
    },

    getCurrencyList: function(){
        return this.currencyList;
    },

    setCurrencyListDate: function(currencyListDate){
        this.currencyListDate = currencyListDate;
    },

    getCurrencyListDate: function(){
        return this.currencyListDate;
    }

});