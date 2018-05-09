// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('currencyConvertor', ['ionic','ui.router']);

app.run(function($ionicPlatform, currencyService, currencyValue) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
  if(localStorage.getItem('apiDate') != undefined && localStorage.getItem('currencyList') != undefined){
      var date = new Date();
      var hours = date.getHours();
      var day = date.getDay();
      date.setHours(0,0,0,0);
      var apiDate = localStorage.getItem('apiDate').split('.');   
      var newApiDate = new Date(apiDate[2] + ',' + apiDate[1] + ',' + apiDate[0]);
      

      if(newApiDate >= date){
          currencyValue.setCurrencyList(JSON.parse(localStorage.getItem('currencyList')));
          currencyValue.setCurrencyListDate(localStorage.getItem('apiDate'));
      }                  
      if(date > newApiDate){
          if((hours > 8 ) && (day < 6 && day != 0)){
            currencyService.getCurrencyApi().then(function(response){         
              if(response.status==200){
                currencyValue.setCurrencyListDate(response.data.result.date);
                localStorage.setItem('apiDate', currencyValue.getCurrencyListDate());
                currencyValue.setCurrencyList(currencyService.CurrencyListFilter(response.data.result));
                localStorage.setItem('currencyList', JSON.stringify(currencyValue.getCurrencyList()));
              }
            });
          }
          else{
            currencyValue.setCurrencyList(JSON.parse(localStorage.getItem('currencyList')));
            currencyValue.setCurrencyListDate(localStorage.getItem('apiDate'));
          }
              
      }
  }
  else{
      currencyService.getCurrencyApi().then(function(response){
          currencyValue.setCurrencyListDate(response.data.result.date);
          localStorage.setItem('apiDate', currencyValue.getCurrencyListDate());
          currencyValue.setCurrencyList(currencyService.CurrencyListFilter(response.data.result));
          localStorage.setItem('currencyList', JSON.stringify(currencyValue.getCurrencyList()));
        
      });
  } 
});

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('currency-convertor', {
        url: '/',
        views:{
          calculator:{
            templateUrl: './html/currencyConvertor.html',
            controller: 'currConvCtrl',
            resolve: {
              curr: function(currencyService) {
                return currencyService.getApi();
              }
            }
          }
        }
      })
      .state('currency-rates', {
        url: '/currency-rates',
        views:{
          rates:{
            templateUrl: './html/currencyRates.html',
            controller: 'currencyRatesCtrl'
          }
        }
      })
});

app.directive('myAsyncChange', function($timeout) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attr, ctrl) {
      ctrl.$viewChangeListeners.push(function() {
        $timeout(function() {
          scope.$eval(attr.myAsyncChange);
        });
      });
    }
  };
});
